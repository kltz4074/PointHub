import os

# pip install cairosvg pillow
from PIL import Image
import cairosvg

SVG_INPUT = "IconHub.svg"
OUTPUT_DIR = "."

os.makedirs(OUTPUT_DIR, exist_ok=True)

def svg_to_png(size, out_path):
    cairosvg.svg2png(
        url=SVG_INPUT,
        write_to=out_path,
        output_width=size,
        output_height=size
    )

# 32x32.png 
svg_to_png(32, "32x32.png")

# PNG (icons)
svg_to_png(128, f"{OUTPUT_DIR}/128x128.png")
svg_to_png(256, f"{OUTPUT_DIR}/128x128@2x.png")

# .ico (Windows)
ico_sizes = [ 128, 256]
ico_images = []

for size in ico_sizes:
    png_path = f"{OUTPUT_DIR}/tmp_{size}.png"
    svg_to_png(size, png_path)
    ico_images.append(Image.open(png_path))

ico_images[0].save(
    f"{OUTPUT_DIR}/icon.ico",
    format="ICO",
    sizes=[(s, s) for s in ico_sizes]
)

# icns (macOS)
icns_sizes = {
    "icon_16x16.png": 16,
    "icon_16x16@2x.png": 32,
    "icon_32x32.png": 32,
    "icon_32x32@2x.png": 64,
    "icon_128x128.png": 128,
    "icon_128x128@2x.png": 256,
    "icon_256x256.png": 256,
    "icon_256x256@2x.png": 512,
    "icon_512x512.png": 512,
    "icon_512x512@2x.png": 1024,
}

icns_images = []
for name, size in icns_sizes.items():
    path = f"{OUTPUT_DIR}/{name}"
    svg_to_png(size, path)
    icns_images.append(Image.open(path))

icns_images[0].save(
    f"{OUTPUT_DIR}/icon.icns",
    format="ICNS",
    append_images=icns_images[1:]
)

print("icons succesfuly generated :3")
