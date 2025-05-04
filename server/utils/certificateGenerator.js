const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

function encodeImage(filePath) {
  const image = fs.readFileSync(filePath);
  return `data:image/png;base64,${image.toString("base64")}`;
}

async function generateCertificatePDF({ name, course, outputPath }) {
  let html = fs.readFileSync(path.join(__dirname, "../templates/certificate.html"), "utf8");

  html = html
    .replace("{{name}}", name)
    .replace("{{course}}", course)
    .replace("{{date}}", new Date().toLocaleDateString())
    .replace("cid:logo", encodeImage(path.join(__dirname, "../assets/logo.png")))
    .replace("cid:signature", encodeImage(path.join(__dirname, "../assets/signature.png")))
    .replace("cid:qr", encodeImage(path.join(__dirname, "../assets/qr.png")));

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({ path: outputPath, format: "A4", printBackground: true });
  await browser.close();
}

module.exports = generateCertificatePDF;
