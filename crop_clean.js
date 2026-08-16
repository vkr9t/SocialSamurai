import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sheetPath = path.resolve('public/mascot_sheet.jpg');
const avatarPath = path.resolve('public/mascot_avatar.jpg');
const outDir = path.resolve('public/mascot');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function createCleanMascotImages() {
  const metaSheet = await sharp(sheetPath).metadata();
  const W = metaSheet.width;
  const H = metaSheet.height;

  // 1. Ready & Avatar: Use clean mascot_avatar.jpg (Zero sheet text!)
  await sharp(avatarPath)
    .resize(512, 512, { fit: 'cover' })
    .toFile(path.join(outDir, 'avatar.png'));

  await sharp(avatarPath)
    .resize(512, 512, { fit: 'cover' })
    .toFile(path.join(outDir, 'ready.png'));

  // Helper function to crop tight region & discard bottom text area
  async function cropTight(key, leftRatio, topRatio, widthRatio, heightRatio, trimBottomRatio = 0.22) {
    const left = Math.round(W * leftRatio);
    const top = Math.round(H * topRatio);
    const width = Math.round(W * widthRatio);
    const rawHeight = Math.round(H * heightRatio);
    // Trim bottom where label text is written
    const height = Math.round(rawHeight * (1 - trimBottomRatio));

    await sharp(sheetPath)
      .extract({ left, top, width, height })
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 17, g: 17, b: 17, alpha: 1 },
      })
      .toFile(path.join(outDir, `${key}.png`));
    console.log(`Clean cropped ${key}.png`);
  }

  // 2. Full body poses from top right of sheet
  // Celebration Jump (top right area)
  await cropTight('celebration', 0.49, 0.04, 0.22, 0.22, 0.18);
  // Working at Laptop
  await cropTight('working', 0.64, 0.25, 0.19, 0.20, 0.25);
  // Scanning
  await cropTight('scanning', 0.64, 0.25, 0.19, 0.20, 0.25);
  // Idea (Lightbulb pose)
  await cropTight('idea', 0.83, 0.04, 0.16, 0.20, 0.18);
  // Guard
  await cropTight('guard', 0.84, 0.25, 0.15, 0.20, 0.22);

  // 3. Expressions row (Focused, Happy, Thinking, Excited)
  // Focused head
  await cropTight('focused', 0.50, 0.45, 0.14, 0.13, 0.28);
  // Happy head
  await cropTight('happy', 0.61, 0.45, 0.14, 0.13, 0.28);
  // Thinking head
  await cropTight('thinking', 0.73, 0.45, 0.14, 0.13, 0.28);
  // Excited head
  await cropTight('excited', 0.85, 0.45, 0.14, 0.13, 0.28);
}

createCleanMascotImages().catch(console.error);
