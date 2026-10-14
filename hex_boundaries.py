#!/usr/bin/env python3
"""
Convert a list of hexes into the boundary `edges` array used by the HexMap
(.hexjson) `boundaries` section.

Usage:
    python hex_boundaries.py hexes.txt
    echo "10,12 11,12 11,13" | python hex_boundaries.py
    python hex_boundaries.py hexes.txt --name Abundance      # full boundaries entry
    python hex_boundaries.py hexes.txt -o edges.json

Input: any text containing integer pairs (q, r), e.g.
    10,13
    [[10,13],[11,12]]
    [{"q":10,"r":13},{"q":11,"r":12}]

By default sides are grouped per hex ({"q":10,"r":12,"e":"1,2,6"}); this needs the
updated drawBoundaries() in oi.hexmap.js. Use --flat for the original one-side-per-entry
format.

Conventions (deduced from providence.hexjson):
  - Flat-topped hexes, offset coordinates, layout "odd-q" (odd columns shifted down).
  - Edge numbers are 1..6, clockwise starting from the top side:
        1 = N, 2 = NE, 3 = SE, 4 = S, 5 = SW, 6 = NW

A side gets a boundary when the neighbouring hex on that side is NOT in the
input list. So contiguous hexes only get an outline on the outside of the
group, separate groups each get their own outline, and an isolated hex gets
all 6 sides.
"""
import argparse
import json
import re
import sys

# (dq, dr) of the neighbour for each edge, per column parity.
# Keys are the edge numbers used by the map.
NEIGHBORS = {
    "odd-q": {  # odd columns are shifted down
        "even": {1: (0, -1), 2: (1, -1), 3: (1, 0), 4: (0, 1), 5: (-1, 0), 6: (-1, -1)},
        "odd":  {1: (0, -1), 2: (1, 0),  3: (1, 1), 4: (0, 1), 5: (-1, 1), 6: (-1, 0)},
    },
}
# even-q is the mirror image: swap the parity roles.
NEIGHBORS["even-q"] = {"even": NEIGHBORS["odd-q"]["odd"], "odd": NEIGHBORS["odd-q"]["even"]}


def parse_hexes(text):
    nums = [int(n) for n in re.findall(r"-?\d+", text)]
    if len(nums) % 2:
        raise ValueError("Odd number of integers: every hex needs a q and an r.")
    return list(dict.fromkeys(zip(nums[0::2], nums[1::2])))  # dedupe, keep order


def boundary_edges(hexes, layout="odd-q"):
    table = NEIGHBORS[layout]
    hex_set = set(hexes)
    edges = []
    for q, r in hexes:
        offsets = table["odd" if q % 2 else "even"]
        for e, (dq, dr) in offsets.items():
            if (q + dq, r + dr) not in hex_set:
                edges.append({"q": q, "r": r, "e": e})
    return edges


def group_edges(edges):
    """Merge {q,r,e} entries into one entry per hex: {"q":..,"r":..,"e":"1,2,6"}.
    Sides are ordered so that adjacent sides stay consecutive (e.g. "5,6,1"),
    which lets the map draw them as one continuous line."""
    by_hex = {}
    for ed in edges:
        by_hex.setdefault((ed["q"], ed["r"]), set()).add(ed["e"])
    grouped = []
    for (q, r), sides in by_hex.items():
        prev = lambda e: (e - 2) % 6 + 1          # 1->6, 2->1, ...
        starts = sorted(e for e in sides if prev(e) not in sides) or [1]
        ordered = []
        for st in starts:
            e = st
            while e in sides and e not in ordered:
                ordered.append(e)
                e = e % 6 + 1                       # 6->1, ...
        grouped.append({"q": q, "r": r, "e": ",".join(map(str, ordered))})
    return grouped


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("input", nargs="?", help="input file (default: stdin)")
    ap.add_argument("-o", "--output", help="output file (default: stdout)")
    ap.add_argument("--layout", choices=list(NEIGHBORS), default="odd-q",
                    help="hexjson layout (default: odd-q)")
    ap.add_argument("--flat", action="store_true",
                    help='one entry per side ({"e": 1}) instead of grouped ({"e": "1,2,6"})')
    ap.add_argument("--name", help="output a full entry {name: {type, edges}} instead of just the array")
    ap.add_argument("--type", default="region", help='boundary type when using --name (default: "region")')
    args = ap.parse_args()

    text = open(args.input, encoding="utf-8").read() if args.input else sys.stdin.read()
    edges = boundary_edges(parse_hexes(text), args.layout)
    if not args.flat:
        edges = group_edges(edges)

    # One edge per line, like the hexjson file
    if args.name:
        body = ",\n      ".join(json.dumps(e) for e in edges)
        result = f'{json.dumps(args.name)}: {{\n    "type": {json.dumps(args.type)},\n    "edges": [\n      {body}\n    ]\n  }}'
    else:
        result = "[\n  " + ",\n  ".join(json.dumps(e) for e in edges) + "\n]"

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(result + "\n")
    else:
        print(result)


if __name__ == "__main__":
    main()
