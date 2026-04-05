/* eslint-disable */
const sharp = require('sharp');
/* eslint-disable */
const fs = require('fs');

const files = [
  'f:\\sinha\\website\\public\\hero-pd.webp',
  'f:\\sinha\\website\\public\\hero-factory.webp',
  'f:\\sinha\\website\\public\\hero-materials.webp',
  'f:\\sinha\\website\\public\\hero-qc.webp',
  'f:\\sinha\\website\\public\\hero-logistics.webp'
];

async function check() {
  for (const file of files) {
    try {
      const metadata = await sharp(file).metadata();
      console.log(`${file}: ${metadata.width}x${metadata.height}`);
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }
}

check();
