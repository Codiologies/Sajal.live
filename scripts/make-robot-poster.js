/**
 * Generates a lightweight static poster shown in place of the live WebGL 3D
 * robot on mobile (where WebGL tanks performance). Rendered from an inline SVG
 * to a small webp. Run: node scripts/make-robot-poster.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svg = `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="core" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="35%" stop-color="#38bdf8"/>
      <stop offset="70%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="rgba(56,189,248,0.55)"/>
      <stop offset="60%" stop-color="rgba(59,130,246,0.15)"/>
      <stop offset="100%" stop-color="rgba(59,130,246,0)"/>
    </radialGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(125,211,252,0.9)"/>
      <stop offset="100%" stop-color="rgba(168,85,247,0.5)"/>
    </linearGradient>
  </defs>

  <!-- ambient glow -->
  <circle cx="300" cy="270" r="260" fill="url(#glow)"/>

  <!-- orbiting rings -->
  <g fill="none" stroke="url(#ring)" stroke-width="1.5" opacity="0.7">
    <ellipse cx="300" cy="270" rx="210" ry="70" transform="rotate(-18 300 270)"/>
    <ellipse cx="300" cy="270" rx="180" ry="150" transform="rotate(28 300 270)"/>
  </g>

  <!-- core sphere -->
  <circle cx="300" cy="270" r="120" fill="url(#core)"/>
  <circle cx="300" cy="270" r="120" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <!-- specular highlight -->
  <ellipse cx="258" cy="222" rx="42" ry="28" fill="rgba(255,255,255,0.35)" transform="rotate(-25 258 222)"/>

  <!-- accent nodes on the rings -->
  <g fill="#e0f2fe">
    <circle cx="110" cy="235" r="5"/>
    <circle cx="492" cy="305" r="5"/>
    <circle cx="300" cy="118" r="4"/>
    <circle cx="300" cy="422" r="4"/>
  </g>
</svg>`;

const outPath = path.join(__dirname, '..', 'public', 'robot-poster.webp');
sharp(Buffer.from(svg))
  .webp({ quality: 82 })
  .toFile(outPath)
  .then((info) => {
    console.log(`robot-poster.webp: ${(info.size / 1024).toFixed(0)}KB (${info.width}x${info.height})`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
