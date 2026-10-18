#!/usr/bin/env bash
# Checks the guide's own domain, from outside, the way a guest's phone reaches it: who hosts its
# DNS, that it points to GitHub Pages, that HTTPS works, and that every other address (www, http,
# the old github.io link, the .com) answers a permanent redirect to the same page on the domain.
#     bash tools/check-domain.sh [darnacollection.ma] [darnacollection.com]
#     (GitHub → Actions → Domain check → Run workflow; needs dig and curl)
# Everything printed here is public anyway (DNS records, redirects).
DOMAIN=${1:-darnacollection.ma}
ALIAS=${2:-darnacollection.com}
OLD=https://atlasattir.github.io/airbnb-casablanca/
GH_A='185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153'
GH_AAAA='2606:50c0:8000::153 2606:50c0:8001::153 2606:50c0:8002::153 2606:50c0:8003::153'
todo=0
ok() { echo "✓ $*"; }
no() { echo "✗ $*"; todo=$((todo + 1)); }
info() { echo "· $*"; }
q() { dig +short "$2" "$1" @1.1.1.1 | grep -v '^;' | sort | tr '\n' ' ' | sed 's/ $//'; }
# Where an address answers: "status location", or "error N" when curl cannot connect (60 = certificate)
hit() {
  local out rc
  out=$(curl -sS -o /dev/null --max-time 25 -w '%{http_code} %{redirect_url}' "$1" 2>/dev/null); rc=$?
  [ "$rc" = 0 ] && echo "$out" || echo "error $rc"
}

for d in "$DOMAIN" "$ALIAS"; do
  ns=$(q "$d" NS)
  if [ -n "$ns" ]; then info "$d: DNS hosted by $ns"; else
    # What the registry itself says: the servers it sends visitors to (or none: not registered/active)
    tld=$(dig +short NS "${d##*.}." @1.1.1.1 | head -1)
    deleg=$(dig +norecurse NS "$d" "@$tld" 2>/dev/null)
    status=$(echo "$deleg" | sed -n 's/.*status: \([A-Z]*\).*/\1/p' | head -1)
    servers=$(echo "$deleg" | awk '$4 == "NS" { print $5 }' | sort -u | tr '\n' ' ')
    if [ "$status" = NXDOMAIN ]; then no "$d: the registry does not know it (not registered, or not activated yet)"
    elif [ -n "$servers" ]; then no "$d: the registry sends visitors to ${servers}but they do not answer (set up the DNS zone at the registrar)"
    else no "$d: no DNS servers found (registry answer: ${status:-none})"; fi
  fi
  # The registration's public facts only (registrar, status, servers, dates), never the owner's details
  whois "$d" 2>/dev/null | grep -iE '^ *(registrar|domain status|status|name server|nserver|creat|expir|registry expiry)[^:]*:' |
    grep -viE 'registrant|admin|tech|bill|email|phone|fax|street|city|postal|abuse|url|whois server|iana' | sed 's/^ */    /' | sort -u | head -12
done

echo
echo "— $DOMAIN (the guide)"
a=$(q "$DOMAIN" A)
[ "$a" = "$GH_A" ] && ok "$DOMAIN points to GitHub Pages (4 A records)" || no "$DOMAIN A records: ${a:-none} (should be exactly $GH_A)"
aaaa=$(q "$DOMAIN" AAAA)
[ "$aaaa" = "$GH_AAAA" ] && ok "$DOMAIN IPv6 points to GitHub Pages (4 AAAA records)" ||
  { [ -z "$aaaa" ] && info "$DOMAIN has no AAAA (IPv6) records: optional, add GitHub's four if the DNS panel allows" || no "$DOMAIN AAAA records: $aaaa (should be $GH_AAAA, or none)"; }
www=$(q "www.$DOMAIN" CNAME)
[ "$www" = "atlasattir.github.io." ] && ok "www.$DOMAIN points to atlasattir.github.io" || no "www.$DOMAIN: ${www:-no CNAME} (should be a CNAME to atlasattir.github.io)"
caa=$(q "$DOMAIN" CAA)
[ -z "$caa" ] || echo "$caa" | grep -q letsencrypt.org && ok "no CAA record blocks GitHub's certificate" || no "CAA records $caa do not allow letsencrypt.org"
txt=$(q "_github-pages-challenge-atlasattir.$DOMAIN" TXT)
[ -n "$txt" ] && ok "GitHub verification record present" || info "no GitHub verification TXT record yet (_github-pages-challenge-atlasattir.$DOMAIN)"

r=$(hit "https://$DOMAIN/bourgogne/")
case "$r" in
  200*) ok "https://$DOMAIN/bourgogne/ opens (HTTPS certificate valid)" ;;
  "error 60"*) no "https://$DOMAIN/: the HTTPS certificate is not ready yet" ;;
  *) no "https://$DOMAIN/bourgogne/ answers $r" ;;
esac
body=$(curl -sS --max-time 25 "https://$DOMAIN/" 2>/dev/null)
echo "$body" | grep -q 'Darna Collection' && ok "it is the guide" || no "https://$DOMAIN/ does not show the guide"

# Every other address: a 301 to the same page on the domain (path and query kept)
expect() { # address, expected location
  local r; r=$(hit "$1")
  if [ "${r%% *}" = 301 ] && [ "${r#* }" = "$2" ]; then ok "$1 → 301 → $2"; else no "$1 answers $r (should be 301 → $2)"; fi
}
echo
echo "— redirects"
expect "http://$DOMAIN/bourgogne/?from=qr" "https://$DOMAIN/bourgogne/?from=qr"
expect "https://www.$DOMAIN/bourgogne/" "https://$DOMAIN/bourgogne/"
expect "${OLD}bourgogne/?from=qr" "https://$DOMAIN/bourgogne/?from=qr"
expect "https://$ALIAS/bourgogne/?from=qr" "https://$DOMAIN/bourgogne/?from=qr"
expect "http://$ALIAS/bourgogne/" "https://$DOMAIN/bourgogne/"
expect "https://www.$ALIAS/" "https://$DOMAIN/"

echo
[ "$todo" = 0 ] && echo "The domain is ready: https://$DOMAIN/" || echo "$todo thing(s) still to set up"
exit $((todo > 0))
