#!/usr/bin/env python3
"""
Derive web images of the season planning watercolours for the app.

Reads Saisonplanung/pflanzen/<id>.json ("bilder": frucht, beet, beet-zuschnitt)
and writes, per plant:

  frontend-vite/public/media/plants/<id>/frucht.webp   main image (square, 512 px),
                                                       cropped to the painted area
  frontend-vite/public/media/plants/<id>/beet.webp     bed from above (max. 800 px),
                                                       cropped by "beet-zuschnitt"

The media folder is not versioned: the images are data, not code. Sync it to
the server separately (see docs/docs/features/plant-images.md).

Re-run it after editing the source images (e.g. transparent backgrounds): an
alpha channel of the source is kept. Needs ImageMagick 7 (`magick`).

  scripts/plant-images.py [id ...]
"""
import json
import os
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(REPO, "Saisonplanung")
OUT = os.path.join(REPO, "frontend-vite", "public", "media", "plants")

PAPER = "#fdfaf1"     # watercolour paper; transparent sources are flattened onto it for detection
FUZZ = "16%"
SHAVE = 14            # ignore the outer pixels (paper shadow at the image edges)
MARGIN = 0.06         # margin around the painted area, relative to its larger side
ICON_SIZE = 512
BED_SIZE = 800
QUALITY = "82"


def magick(*args):
    return subprocess.run(["magick", *map(str, args)], check=True, capture_output=True, text=True).stdout.strip()


def painted_box(path):
    """Bounding box (x, y, w, h) of the painted area."""
    out = magick(path, "-background", PAPER, "-flatten", "-shave", f"{SHAVE}x{SHAVE}",
                 "-fuzz", FUZZ, "-format", "%@", "info:")
    size, x, y = out.replace("+", " ").split()
    w, h = map(int, size.split("x"))
    return int(x) + SHAVE, int(y) + SHAVE, w, h


def main_image(src, dst):
    """Square crop around the painted area; pads with transparency where the square leaves the image."""
    x, y, w, h = painted_box(src)
    side = round(max(w, h) * (1 + 2 * MARGIN))
    x0 = round(x + w / 2 - side / 2)
    y0 = round(y + h / 2 - side / 2)
    offset = f"{x0:+d}{y0:+d}"
    magick(src, "-background", "none", "-gravity", "NorthWest", "-extent", f"{side}x{side}{offset}",
           "+repage", "-resize", f"{ICON_SIZE}x{ICON_SIZE}", "-quality", QUALITY, dst)


def bed_image(src, crop, dst):
    args = [src]
    if crop:
        x0, y0, x1, y1 = crop
        args += ["-crop", f"{x1 - x0}x{y1 - y0}+{x0}+{y0}", "+repage"]
    magick(*args, "-resize", f"{BED_SIZE}x{BED_SIZE}>", "-quality", QUALITY, dst)


def kb(path):
    return f"{os.path.getsize(path) // 1024:>4} KB"


def main():
    ids = sys.argv[1:] or sorted(
        f[:-5] for f in os.listdir(os.path.join(SOURCE, "pflanzen")) if f.endswith(".json"))
    done = 0
    for cid in ids:
        card_path = os.path.join(SOURCE, "pflanzen", f"{cid}.json")
        if not os.path.exists(card_path):
            print(f"[{cid}] no card", file=sys.stderr)
            continue
        with open(card_path) as fh:
            images = json.load(fh).get("bilder") or {}
        out_dir = os.path.join(OUT, cid)
        os.makedirs(out_dir, exist_ok=True)
        report = []
        if images.get("frucht"):
            dst = os.path.join(out_dir, "frucht.webp")
            main_image(os.path.join(SOURCE, images["frucht"]), dst)
            report.append(f"frucht {kb(dst)}")
        if images.get("beet"):
            dst = os.path.join(out_dir, "beet.webp")
            bed_image(os.path.join(SOURCE, images["beet"]), images.get("beet-zuschnitt"), dst)
            report.append(f"beet {kb(dst)}")
        if report:
            done += 1
            print(f"[{cid}] " + " · ".join(report))
        else:
            print(f"[{cid}] no images on the card", file=sys.stderr)
    print(f"{done} plants → {os.path.relpath(OUT, REPO)}")


if __name__ == "__main__":
    main()
