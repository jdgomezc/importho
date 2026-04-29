import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

const ROOT = process.cwd();

const TARGETS = [
  { dir: "public/products", maxWidth: 1200, quality: 72 },
  { dir: "public/courses", maxWidth: 1280, quality: 72 },
  { dir: "src/assets/banner", maxWidth: 1920, quality: 74 },
  { dir: "src/assets/mouthwashers", maxWidth: 1600, quality: 74 },
  { dir: "src/assets", maxWidth: 1200, quality: 78 },
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return [fullPath];
    }),
  );
  return files.flat();
}

function toKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

async function optimizeImage(filePath, options) {
  const ext = path.extname(filePath).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) return null;

  // Keep subfolders from being reprocessed by broader parent targets.
  if (options.exclude?.some((blockedDir) => isInside(blockedDir, filePath))) {
    return null;
  }

  const sourceStats = await fs.stat(filePath);
  const outputPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");

  const transformed = sharp(filePath, { failOn: "none" }).rotate().resize({
    width: options.maxWidth,
    withoutEnlargement: true,
    fit: "inside",
  });

  await transformed.webp({ quality: options.quality }).toFile(outputPath);
  const outputStats = await fs.stat(outputPath);

  return {
    input: filePath,
    output: outputPath,
    before: sourceStats.size,
    after: outputStats.size,
  };
}

async function main() {
  const bannerDir = path.join(ROOT, "src/assets/banner");
  const mouthwashersDir = path.join(ROOT, "src/assets/mouthwashers");

  const targetOptions = TARGETS.map((target) => {
    const absDir = path.join(ROOT, target.dir);
    const exclude = target.dir === "src/assets" ? [bannerDir, mouthwashersDir] : [];
    const include = target.dir === "src/assets" ? [path.join(ROOT, "src/assets")] : [];
    return { ...target, absDir, exclude, include };
  });

  const results = [];

  for (const target of targetOptions) {
    let files = [];
    try {
      files = await walk(target.absDir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (target.include.length && !target.include.some((allowed) => isInside(allowed, file))) {
        continue;
      }
      const result = await optimizeImage(file, target);
      if (result) results.push(result);
    }
  }

  if (!results.length) {
    console.log("No PNG/JPG images found to optimize.");
    return;
  }

  const before = results.reduce((sum, file) => sum + file.before, 0);
  const after = results.reduce((sum, file) => sum + file.after, 0);
  const saved = before - after;
  const savedPct = ((saved / before) * 100).toFixed(2);

  results.forEach((file) => {
    console.log(
      `${path.relative(ROOT, file.input)} -> ${path.relative(ROOT, file.output)} | ${toKb(file.before)} -> ${toKb(file.after)}`,
    );
  });

  console.log("\nOptimization summary:");
  console.log(`- Files optimized: ${results.length}`);
  console.log(`- Total before: ${toKb(before)}`);
  console.log(`- Total after: ${toKb(after)}`);
  console.log(`- Total saved: ${toKb(saved)} (${savedPct}%)`);
}

await main();
