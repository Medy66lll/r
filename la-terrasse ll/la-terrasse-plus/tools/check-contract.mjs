import fs from 'fs';

const filePath = process.argv[2] || 'index.html';
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/<script id="site-data" type="application\/json">([\s\S]*?)<\/script>/);

if (!match) {
  console.error("FAIL: #site-data script block not found in " + filePath);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(match[1]);
} catch (e) {
  console.error("FAIL: Invalid JSON in #site-data:", e.message);
  process.exit(1);
}

const errors = [];
if (data.$contract !== "maps-to-landing/site-data@1") {
  errors.push("Missing or invalid $contract: expected 'maps-to-landing/site-data@1'");
}

const requiredBuckets = ['meta', 'business', 'offerings', 'reviews', 'gallery', 'assets', 'seo', 'missing', 'content'];
for (const b of requiredBuckets) {
  if (!data[b]) errors.push(`Missing required bucket: ${b}`);
}

if (data.business) {
  if (!data.business.name) errors.push("business.name is required");
  if (!data.business.address) errors.push("business.address is required");
  if (!data.business.phone) errors.push("business.phone is required");
  if (typeof data.business.rating !== 'number') errors.push("business.rating must be numeric");
  if (typeof data.business.reviewCount !== 'number') errors.push("business.reviewCount must be numeric");
}

if (Array.isArray(data.offerings)) {
  data.offerings.forEach((item, idx) => {
    if (typeof item.price !== 'number') errors.push(`offerings[${idx}].price must be numeric`);
    if (!item.priceDisplay) errors.push(`offerings[${idx}].priceDisplay required`);
  });
} else {
  errors.push("offerings must be an array");
}

if (data.business?.hours?.schedule) {
  data.business.hours.schedule.forEach((s, idx) => {
    if (!s.day) errors.push(`hours.schedule[${idx}].day missing`);
    if (!s.label) errors.push(`hours.schedule[${idx}].label missing`);
  });
}

if (!Array.isArray(data.missing)) {
  errors.push("missing must be an array");
}

if (errors.length > 0) {
  console.error("FAIL: Contract check failed with errors:\n" + errors.map(e => " - " + e).join("\n"));
  process.exit(1);
}

console.log("PASS: Contract check passed for " + filePath + " (maps-to-landing/site-data@1)");
