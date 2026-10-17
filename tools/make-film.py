#!/usr/bin/env python3
"""
Cuts the guide's background film from open-licence clips (see tools/film-sources.py).

    python3 tools/make-film.py tools/films/morocco.json <folder with the sources> [portrait|landscape]

tools/films/<name>.json lists the shots, in order (morocco: the home; casablanca, marrakech,
martil: each city's own pages):
    {"name": "morocco", "fade": 0.8,   # seconds of each cross-fade
     "h264": 30, "vp9": 41,            # compression (higher = lighter files, softer picture)
     "shots": [
        {"src": "djemaa-el-fna-marrakech-morocco.mp4", "start": 3.0, "end": 6.5,
         "x": 0.5,     # where to centre the vertical (phone) crop, 0 = left edge, 1 = right edge
         "y": 0.5,     # where to centre the wide crop, 0 = top, 1 = bottom
         "speed": 0.8, # 0.8 = slowed down a little
         "landscape": {"zoom": 0.8}},  # for the wide cut only: a closer crop (also "portrait": {...})
        {"image": "le-phare-d-el-hank.jpg", "dur": 5,   # a photo, with a slow camera move:
         "from": [0.5, 0.6, 1.0],                      # centre x, centre y (0 to 1) and zoom at the start,
         "to": [0.5, 0.45, 1.15]}                      # and at the end (1 = the widest view)
    ]}
Writes assets/video/<name>-portrait.{mp4,webm,jpg} (720 × 1280, phones) and
assets/video/<name>.{mp4,webm,jpg} (1280 × 720, tablets and computers): no sound,
cross-faded, a seamless loop (the last fade lands on the first frame), the poster
being that first frame. Needs ffmpeg with libx264 and libvpx-vp9.
"""
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'video')


def run(cmd):
    subprocess.run(cmd, check=True)


def probe(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', f],
                       capture_output=True, text=True, check=True)
    s = json.loads(r.stdout)['streams'][0]
    return s['width'], s['height']


def frames(f):
    r = subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames', '-of', 'json', f],
                       capture_output=True, text=True, check=True)
    return int(json.loads(r.stdout)['streams'][0]['nb_read_frames']) / 30.0


def still(spec, src_dir, work, kind, i, tw, th):
    """A photo with a slow camera move: each frame cut from the full-size photo, so the move is smooth."""
    from PIL import Image
    im = Image.open(os.path.join(src_dir, spec['image'])).convert('RGB')
    W, H = im.size
    cw0, ch0 = (H * tw / th, H) if W / H > tw / th else (W, W * th / tw)
    a, b = spec.get('from', [0.5, 0.5, 1.0]), spec.get('to', [0.5, 0.5, 1.1])
    n = int(round(spec.get('dur', 5) * 30))
    out = os.path.join(work, '%s_%02d.mp4' % (kind, i))
    grade = spec.get('grade', 'eq=contrast=1.04:saturation=1.06')
    enc = subprocess.Popen(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (tw, th), '-r', '30',
                            '-i', '-', '-vf', grade + ',format=yuv420p', '-c:v', 'libx264', '-crf', '12', '-preset', 'veryfast', out], stdin=subprocess.PIPE)
    for f in range(n):
        k = f / max(n - 1, 1)
        cx, cy, z = [a[j] + (b[j] - a[j]) * k for j in range(3)]
        cw, ch = cw0 / z, ch0 / z
        x0 = min(max(cx * W - cw / 2, 0), W - cw)
        y0 = min(max(cy * H - ch / 2, 0), H - ch)
        enc.stdin.write(im.resize((tw, th), Image.LANCZOS, box=(x0, y0, x0 + cw, y0 + ch)).tobytes())
    enc.stdin.close()
    if enc.wait():
        raise RuntimeError('ffmpeg failed on ' + spec['image'])
    return out


def shot(spec, src_dir, work, kind, i):
    spec = dict(spec, **spec.get(kind, {}))  # "portrait": {...} or "landscape": {...} change a shot for one cut only
    if 'image' in spec:
        tw, th = (720, 1280) if kind == 'portrait' else (1280, 720)
        return still(spec, src_dir, work, kind, i, tw, th)
    src = os.path.join(src_dir, spec['src'])
    w, h = probe(src)
    tw, th = (720, 1280) if kind == 'portrait' else (1280, 720)
    # The largest crop of the target's shape (times "zoom", to leave out an edge), centred where the shot asks
    cw, ch = (h * tw / th, h) if w / h > tw / th else (w, w * th / tw)
    z = spec.get('zoom', 1.0)
    cw, ch = int(cw * z / 2) * 2, int(ch * z / 2) * 2
    cx = int(min(max(spec.get('x', 0.5) * w - cw / 2, 0), w - cw))
    cy = int(min(max(spec.get('y', 0.5) * h - ch / 2, 0), h - ch))
    speed = spec.get('speed', 1.0)
    grade = spec.get('grade', 'eq=contrast=1.04:saturation=1.06')
    vf = 'crop=%d:%d:%d:%d,scale=%d:%d:flags=lanczos,%s,setpts=PTS/%s,fps=30,format=yuv420p' % (cw, ch, cx, cy, tw, th, grade, speed)
    if speed < 0.95:  # smooth slow motion
        vf = vf.replace(',fps=30', ',minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1')
    out = os.path.join(work, '%s_%02d.mp4' % (kind, i))
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(spec['start']), '-t', '%.3f' % (spec['end'] - spec['start']),
         '-i', src, '-an', '-vf', vf, '-c:v', 'libx264', '-crf', '12', '-preset', 'veryfast', '-r', '30', out])
    return out


def build(film, src_dir, work, kind):
    fade = film.get('fade', 0.8)
    files = [shot(s, src_dir, work, kind, i) for i, s in enumerate(film['shots'])]
    ds = [frames(f) for f in files]
    inputs = []
    for f in files:
        inputs += ['-i', f]
    # The first shot's first `fade` seconds close the loop: the film ends exactly where it starts
    g = ['[0:v]split[h0][r0]', '[h0]trim=0:%s,setpts=PTS-STARTPTS[head]' % fade, '[r0]trim=%s,setpts=PTS-STARTPTS[s0]' % fade]
    seq = ['s0'] + ['%d:v' % i for i in range(1, len(files))] + ['head']
    lens = [ds[0] - fade] + ds[1:] + [fade]
    cur, t = seq[0], lens[0]
    for k in range(1, len(seq)):
        g.append('[%s][%s]xfade=transition=fade:duration=%s:offset=%.4f[x%d]' % (cur, seq[k], fade, t - fade, k))
        cur, t = 'x%d' % k, t + lens[k] - fade
    g.append('[%s]format=yuv420p[out]' % cur)
    master = os.path.join(work, 'master_%s.mp4' % kind)
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y'] + inputs + ['-filter_complex', ';'.join(g), '-map', '[out]',
         '-c:v', 'libx264', '-crf', '8', '-preset', 'veryfast', '-r', '30', master])
    print(kind, 'shots', [round(d, 2) for d in ds], 'loop', round(t, 2), 's')
    return master


def encode(master, base, work, crf_h264=30, crf_vp9=41):
    # Quality against weight: guests often open the guide on mobile data, so each file stays near 3 MB
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', master, '-an', '-c:v', 'libx264', '-preset', 'slow', '-tune', 'film', '-crf', str(crf_h264),
         '-profile:v', 'high', '-level', '4.0', '-pix_fmt', 'yuv420p', '-g', '150', '-movflags', '+faststart', os.path.join(OUT, base + '.mp4')])
    for p in (1, 2):
        run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', master, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', str(crf_vp9),
             '-row-mt', '1', '-tile-columns', '2', '-g', '150', '-deadline', 'good', '-cpu-used', '2' if p == 2 else '4', '-pass', str(p),
             '-passlogfile', os.path.join(work, base), '-pix_fmt', 'yuv420p'] + (['-f', 'null', '/dev/null'] if p == 1 else [os.path.join(OUT, base + '.webm')]))
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', master, '-frames:v', '1', '-q:v', '5', os.path.join(OUT, base + '.jpg')])


def main():
    spec_file, src_dir = sys.argv[1], sys.argv[2]
    kinds = sys.argv[3:] or ['portrait', 'landscape']
    with open(spec_file, encoding='utf-8') as f:
        film = json.load(f)
    work = os.path.join(os.environ.get('TMPDIR', '/tmp'), 'film-' + film['name'])
    os.makedirs(work, exist_ok=True)
    for kind in kinds:
        master = build(film, src_dir, work, kind)
        encode(master, film['name'] + ('-portrait' if kind == 'portrait' else ''), work, film.get('h264', 30), film.get('vp9', 41))
    for f in sorted(os.listdir(OUT)):
        if f.startswith(film['name']):
            print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, 'KB')


if __name__ == '__main__':
    main()
