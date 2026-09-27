#!/usr/bin/env python3
"""process.py — size the raw paintings for the app (WebP, sized to how they are drawn).

  sky-*    1600 wide  — the Today banner
  splash   900 square
  empty-*, huddle  720 wide — spot illustrations, shown with mix-blend multiply
  badge-*  256 square WITH ALPHA — the medallion is found by its bounding box on
           the white ground and cut out as a circle, so a badge sits on any card.
"""
import os
from PIL import Image, ImageDraw, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
RAW, OUT = os.path.join(HERE, 'raw'), os.path.join(HERE, '..', '..', 'app', 'public', 'art')
os.makedirs(OUT, exist_ok=True)


def badge(im):
    im = im.convert('RGB')
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 38 else 0)
    x0, y0, x1, y1 = diff.getbbox()
    side = max(x1 - x0, y1 - y0)
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)
    im = im.crop(box).resize((512, 512), Image.LANCZOS)
    mask = Image.new('L', (2048, 2048), 0)
    ImageDraw.Draw(mask).ellipse((10, 10, 2038, 2038), fill=255)
    mask = mask.resize((512, 512), Image.LANCZOS)
    im.putalpha(mask)
    return im.resize((256, 256), Image.LANCZOS)


total = 0
for f in sorted(os.listdir(RAW)):
    if not f.endswith('.png'): continue
    n = f[:-4]
    im = Image.open(os.path.join(RAW, f))
    if n.startswith('badge-'):
        im = badge(im)
    else:
        im = im.convert('RGB')
        w = 1600 if n.startswith('sky-') else 900 if n == 'splash' else 720
        im = im.resize((w, round(w * im.height / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, n + '.webp')
    im.save(p, 'WEBP', quality=80, method=6)
    total += os.path.getsize(p)
    print(f'{n}: {im.width}x{im.height} {os.path.getsize(p)//1024} KB')
print(f'total {total//1024} KB')
