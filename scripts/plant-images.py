#!/usr/bin/env python3
"""
Derive web images of the season planning watercolours for the app.

Plants: reads Saisonplanung/pflanzen/<id>.json ("bilder": frucht, beet,
beet-zuschnitt) and writes, per plant:

  frontend-vite/public/media/plants/<id>/frucht.webp   main image (square, 512 px),
                                                       cropped to the painted area
  frontend-vite/public/media/plants/<id>/beet.webp     bed from above (max. 800 px),
                                                       cropped by "beet-zuschnitt"

Community beds: reads Saisonplanung/beete.json and the animal pictures
Saisonplanung/bilder/gemeinschaft/<id>.jpg and writes, per bed:

  frontend-vite/public/media/beds/<id>/bild.webp       main image (square, 512 px),
                                                       cropped to the painted area
  frontend-vite/public/media/beds/<id>/aquarell.webp   the whole painting without the
                                                       empty paper (max. 1024 px)

The media folder is not versioned: the images are data, not code. Sync it to
the server separately (see docs/docs/features/plant-images.md).

Re-run it after editing the source images (e.g. transparent backgrounds): an
alpha channel of the source is kept. Needs ImageMagick 7 (`magick`).

  scripts/plant-images.py [id ...]     (plant or bed ids; none: all)
"""
import json
import os
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(REPO, "Saisonplanung")
OUT = os.path.join(REPO, "frontend-vite", "public", "media", "plants")
BEDS_FILE = os.path.join(SOURCE, "beete.json")
BED_SOURCE = os.path.join(SOURCE, "bilder", "gemeinschaft")
BED_OUT = os.path.join(REPO, "frontend-vite", "public", "media", "beds")

PAPER = "#fdfaf1"     # watercolour paper; transparent sources are flattened onto it for detection
FUZZ = "16%"
SHAVE = 14            # ignore the outer pixels (paper shadow at the image edges)
MARGIN = 0.06         # margin around the painted area, relative to its larger side
ICON_SIZE = 512
BED_SIZE = 800
PAINTING_SIZE = 1024
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


def painting(src, dst):
    """The painted area with a margin, not squared, at most PAINTING_SIZE."""
    x, y, w, h = painted_box(src)
    width, height = map(int, magick(src, "-format", "%w %h", "info:").split())
    m = round(max(w, h) * MARGIN)
    x0, y0 = max(0, x - m), max(0, y - m)
    x1, y1 = min(width, x + w + m), min(height, y + h + m)
    magick(src, "-crop", f"{x1 - x0}x{y1 - y0}+{x0}+{y0}", "+repage",
           "-resize", f"{PAINTING_SIZE}x{PAINTING_SIZE}>", "-quality", QUALITY, dst)


def kb(path):
    return f"{os.path.getsize(path) // 1024:>4} KB"


def plants(ids):
    done = 0
    for cid in ids:
        with open(os.path.join(SOURCE, "pflanzen", f"{cid}.json")) as fh:
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


def community_beds(ids):
    done = 0
    for bid in ids:
        src = os.path.join(BED_SOURCE, f"{bid}.jpg")
        if not os.path.exists(src):
            print(f"[{bid}] no picture in {os.path.relpath(BED_SOURCE, REPO)}", file=sys.stderr)
            continue
        out_dir = os.path.join(BED_OUT, bid)
        os.makedirs(out_dir, exist_ok=True)
        main_dst, painting_dst = os.path.join(out_dir, "bild.webp"), os.path.join(out_dir, "aquarell.webp")
        main_image(src, main_dst)
        painting(src, painting_dst)
        done += 1
        print(f"[{bid}] bild {kb(main_dst)} · aquarell {kb(painting_dst)}")
    print(f"{done} community beds → {os.path.relpath(BED_OUT, REPO)}")


def main():
    wanted = set(sys.argv[1:])
    plant_ids = sorted(f[:-5] for f in os.listdir(os.path.join(SOURCE, "pflanzen")) if f.endswith(".json"))
    with open(BEDS_FILE) as fh:
        bed_ids = [bed["id"] for bed in json.load(fh)]
    for unknown in sorted(wanted - set(plant_ids) - set(bed_ids)):
        print(f"[{unknown}] neither a plant card nor a community bed", file=sys.stderr)
    plants([i for i in plant_ids if not wanted or i in wanted])
    community_beds([i for i in bed_ids if not wanted or i in wanted])


if __name__ == "__main__":
    main()
