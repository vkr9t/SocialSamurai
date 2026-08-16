import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sheetPath = path.resolve('public/mascot_sheet.jpg');
const avatarPath = path.resolve('public/mascot_avatar.jpg');
const outDir = path.resolve('public/mascot');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function inspectAndCrop() {
  const metaSheet = await sharp(sheetPath).metadata();
  const metaAvatar = await sharp(avatarPath).metadata();

  console.log('Sheet metadata:', metaSheet.width, 'x', metaSheet.height);
  console.log('Avatar metadata:', metaAvatar.width, 'x', metaAvatar.height);

  const W = metaSheet.width;
  const H = metaSheet.height;

  // Save full avatar as clean avatar.png
  await sharp(avatarPath).resize(512, 512).toFile(path.join(outDir, 'avatar.png'));

  // Define precise pixel bounding boxes [left, top, width, height] for each pose
  // mascot_sheet.jpg is 1024x1024 (or similar square ratio)
  // Left area (0..480, 0..1024): Main full character
  // Right area (480..1024): Top poses grid, Expressions grid

  const crops = {
    // Main hero posture (Left full body)
    ready: { left: Math.round(W * 0.05), top: Math.round(H * 0.12), width: Math.round(W * 0.42), height: Math.round(H * 0.52) },

    // Top Right Poses (Ready, Laptop Working, Idea)
    scanning: { left: Math.round(W * 0.65), top: Math.round(H * 0.25), width: Math.round(W * 0.18), height: Math.round(H * 0.18) },
    working: { left: Math.round(W * 0.65), top: Math.round(H * 0.25), width: Math.round(W * 0.18), height: Math.round(H * 0.18) },
    idea: { left: Math.round(W * 0.83), top: Math.round(H * 0.03), width: Math.round(W * 0.15), height: Math.round(H * 0.20) },

    // Celebration Jump (Top Right)
    celebration: { left: Math.round(W * 0.49), top: Math.round(H * 0.24), width: Math.round(W * 0.15), height: Math.round(H * 0.18) },

    // Guard (Standing Back Katana)
    guard: { left: Math.round(W * 0.84), top: Math.round(H * 0.25), width: Math.round(W * 0.14), height: Math.round(H * 0.18) },

    // Expressions Row (Focused, Happy, Thinking, Excited)
    focused: { left: Math.round(W * 0.50), top: Math.round(H * 0.45), width: Math.round(W * 0.14), height: Math.round(H * 0.14) },
    happy: { left: Math.round(W * 0.61), top: Math.round(H * 0.45), width: Math.round(W * 0.14), height: Math.round(H * 0.14) },
    thinking: { left: Math.round(W * 0.73), top: Math.round(H * 0.45), width: Math.round(W * 0.14), height: Math.round(H * 0.14) },
    excited: { left: Math.round(W * 0.85), top: Math.round(H * 0.45), width: Math.round(W * 0.14), height: Math.round(H * 0.14) },
  };

  for (const [key, rect] of Object.entries(crops)) {
    // Clamp coordinates to image bounds
    const safeLeft = Math.max(0, Math.min(W - 10, rect.left));
    const safeTop = Math.max(0, Math.min(H - 10, rect.top));
    const safeWidth = Math.min(W - safeLeft, rect.width);
    const safeHeight = Math.min(H - safeTop, rect.height);

    await sharp(sheetPath)
      .extract({ left: safeLeft, top: safeTop, width: safeWidth, height: safeHeight })
      .resize(300, 300, { fit: 'contain', background: { r: 17, g: 17, b: 17, alpha: 1 } })
      .toFile(path.join(outDir, `${key}.png`));
    console.log(`Cropped ${key}.png`);
  }
}

inspectAndCrop().catch(console.error);
