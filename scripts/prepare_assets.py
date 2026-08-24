from __future__ import annotations

import argparse
import subprocess
import tempfile
from pathlib import Path

from PIL import Image


CROPS = {
    "lumaskin-cover.jpg": (3, (0, 0, 2480, 1120)),
    "lumaskin-hero.jpg": (3, (1120, 0, 2480, 1120)),
    "lumaskin-system.jpg": (3, (0, 990, 2480, 3515)),
    "lumaskin-ui.jpg": (4, (0, 1840, 2480, 3515)),
    "buffer-zone-cover.jpg": (2, (0, 0, 2480, 970)),
    "buffer-zone-research.jpg": (2, (0, 850, 2480, 2320)),
    "buffer-zone-workflow.jpg": (2, (0, 2180, 2480, 3515)),
    "lattice-cover.jpg": (9, (0, 0, 2480, 1050)),
    "lattice-research.jpg": (9, (0, 920, 2480, 2350)),
    "lattice-system.jpg": (9, (0, 2140, 2480, 3515)),
    "lasermorph-cover.jpg": (10, (0, 0, 2480, 1110)),
    "lasermorph-mechanism.jpg": (10, (0, 980, 2480, 3515)),
    "lasermorph-workflow.jpg": (11, (0, 0, 2480, 1800)),
    "lasermorph-design-space.jpg": (11, (0, 1660, 2480, 3515)),
    "lasermorph-tool.jpg": (12, (0, 0, 2480, 1840)),
    "lasermorph-applications.jpg": (13, (0, 0, 2480, 3515)),
    "portrait.jpg": (1, (70, 45, 390, 365)),
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--pdftoppm", default="pdftoppm")
    args = parser.parse_args()

    args.output.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="giselle-portfolio-") as temp_dir:
        prefix = Path(temp_dir) / "page"
        subprocess.run(
            [args.pdftoppm, "-jpeg", "-r", "72", str(args.pdf), str(prefix)],
            check=True,
        )

        for filename, (page, box) in CROPS.items():
            source = Path(temp_dir) / f"page-{page:02d}.jpg"
            with Image.open(source) as image:
                crop = image.crop(box)
                crop.save(args.output / filename, quality=90, optimize=True, progressive=True)


if __name__ == "__main__":
    main()
