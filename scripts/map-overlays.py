#!/usr/bin/env python3
"""
Put the map overlays of the Wurzelwerk garden into the local store.

Reads frontend-vite/fixtures/wurzelwerk-overlays.json. For each overlay it

  1. derives the web image frontend-vite/public/media/overlays/<file>
     from "source" (relative to the repository; skipped if there is no source,
     or if the file exists and is newer than the source), and
  2. replaces the MapOverlay in the store and links it to the garden
     (garden:mapOverlays). Other overlays and everything else stay untouched.

The media folder is not versioned (see docs/docs/features/plant-images.md).
Needs ImageMagick 7 (`magick`).

  SPARQL=http://localhost:7880 scripts/map-overlays.py [id ...]
"""
import json
import os
import subprocess
import sys
import urllib.parse
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIXTURE = os.path.join(REPO, "frontend-vite", "fixtures", "wurzelwerk-overlays.json")
OUT = os.path.join(REPO, "frontend-vite", "public", "media", "overlays")
SPARQL = os.environ.get("SPARQL", "http://localhost:7880")
G = "https://ontology.semantic-desk.top/garden#"
XSD = "http://www.w3.org/2001/XMLSchema#"
MEDIA_URL = "/media/overlays/"


def derive_image(o):
    source = o.get("source")
    if not source:
        return
    src = os.path.join(REPO, source)
    dst = os.path.join(OUT, o["file"])
    if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
        return
    os.makedirs(OUT, exist_ok=True)
    subprocess.run(["magick", src, "-auto-orient", "-resize", f"{o.get('width', 3000)}x",
                    "-quality", "82", dst], check=True)
    print(f"  image {dst}")


def lit(value, datatype=None):
    s = json.dumps(str(value), ensure_ascii=False)  # a JSON string is a valid SPARQL string
    return f"{s}^^<{XSD}{datatype}>" if datatype else s


def update(query):
    req = urllib.request.Request(f"{SPARQL}/update", data=query.encode(),
                                 headers={"Content-Type": "application/sparql-update"})
    urllib.request.urlopen(req).read()


def store_overlay(garden, o):
    iri = f"{G}MapOverlay/{o['id']}"
    # WKT is a plain string literal in the store, like GeoFeature.geo
    props = [
        ("name", lit(o["name"])),
        ("description", lit(o["description"])) if o.get("description") else None,
        ("overlayImageUrl", lit(MEDIA_URL + o["file"])),
        ("corners", lit(o["corners"])),
        ("overlayType", lit(o["type"])) if o.get("type") else None,
        ("opacity", lit(o["opacity"], "double")) if "opacity" in o else None,
        ("visible", f'"{str(o["visible"]).lower()}"^^<{XSD}boolean>') if "visible" in o else None,
        ("sortOrder", lit(o["sortOrder"], "integer")) if "sortOrder" in o else None,
        ("attribution", lit(o["attribution"])) if o.get("attribution") else None,
    ]
    triples = "".join(f"<{iri}> <{G}{p[0]}> {p[1]} .\n" for p in props if p)
    update(f"""
DELETE WHERE {{ <{iri}> ?p ?o }};
INSERT DATA {{
<{iri}> a <{G}MapOverlay> .
{triples}<{garden}> <{G}mapOverlays> <{iri}> .
}}""")
    print(f"  stored {iri}")


def main():
    with open(FIXTURE, encoding="utf-8") as f:
        data = json.load(f)
    only = set(sys.argv[1:])
    for o in data["overlays"]:
        if only and o["id"] not in only:
            continue
        print(o["id"])
        derive_image(o)
        store_overlay(data["garden"], o)


if __name__ == "__main__":
    main()
