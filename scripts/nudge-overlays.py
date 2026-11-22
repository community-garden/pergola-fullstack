#!/usr/bin/env python3
"""
Shift the corners of the map overlays in frontend-vite/fixtures/wurzelwerk-overlays.json
by a few metres and put them into the store (scripts/map-overlays.py).

  scripts/nudge-overlays.py NORTH_M [EAST_M] [id ...]

Negative numbers move south / west. Without ids all overlays are moved, which is what
you want when the whole photo sits a little off against the drawn beds.
"""
import json
import math
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIXTURE = os.path.join(REPO, "frontend-vite", "fixtures", "wurzelwerk-overlays.json")
M_PER_DEG_LAT = 111320.0


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    north = float(args.pop(0))
    east = float(args.pop(0)) if args and re.fullmatch(r"-?\d+(\.\d+)?", args[0]) else 0.0
    only = set(args)
    with open(FIXTURE, encoding="utf-8") as f:
        data = json.load(f)
    for o in data["overlays"]:
        if only and o["id"] not in only:
            continue
        points = re.findall(r"(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)", o["corners"])
        dlat = north / M_PER_DEG_LAT
        shifted = [(float(x), float(y)) for x, y in points]
        dlng = east / (M_PER_DEG_LAT * math.cos(math.radians(shifted[0][1])))
        o["corners"] = "POLYGON ((" + ", ".join(f"{x + dlng:.7f} {y + dlat:.7f}" for x, y in shifted) + "))"
    with open(FIXTURE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    subprocess.run([sys.executable, os.path.join(REPO, "scripts", "map-overlays.py"), *only], check=True)


if __name__ == "__main__":
    main()
