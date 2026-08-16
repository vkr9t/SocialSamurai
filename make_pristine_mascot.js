import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const avatarPath = path.resolve('public/mascot_avatar.jpg');
const outDir = path.resolve('public/mascot');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function makePristineMascotImages() {
  const meta = await sharp(avatarPath).metadata();
  console.log('Original avatar dimensions:', meta.width, 'x', meta.height);

  // 1. Full character centered (512x512)
  const fullCharBuffer = await sharp(avatarPath)
    .resize(512, 512, { fit: 'cover' })
    .toBuffer();

  // 2. Head close-up (focused on helmet & glowing eyes)
  // The head in mascot_avatar.jpg is centered at top 15% to 65% of image
  const headBuffer = await sharp(avatarPath)
    .extract({
      left: Math.round(meta.width * 0.20),
      top: Math.round(meta.height * 0.18),
      width: Math.round(meta.width * 0.60),
      height: Math.round(meta.height * 0.60),
    })
    .resize(512, 512, { fit: 'contain', background: { r: 8, g: 8, b: 8, alpha: 1 } })
    .toBuffer();

  const states = ['ready', 'working', 'scanning', 'celebration', 'guard', 'idea'];
  for (const s of states) {
    await fs.promises.writeFile(path.join(outDir, `${s}.png`), fullCharBuffer);
    console.log(`Saved pristine full body ${s}.png`);
  }

  const headStates = ['avatar', 'focused', 'happy', 'thinking', 'excited'];
  for (const s of headStates) {
    await fs.promises.writeFile(path.join(outDir, `${s}.png`), headBuffer);
    console.log(`Saved pristine head ${s}.png`);
  }
}

makePristineMascotImages().catch(console.error);
