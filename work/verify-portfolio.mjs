import { chromium } from "/Users/andrewabruzzese/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const url = "http://127.0.0.1:5175/";

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, { waitUntil: "load" });

const desktop = await page.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent,
  pipelineSteps: document.querySelectorAll(".pipeline-step").length,
  carouselDots: document.querySelectorAll(".carousel-dots button").length,
  heroMetrics: document.querySelectorAll(".hero .metric-grid div").length,
  aboutPortraitLoaded: document.querySelector(".profile-summary .portrait-card img")?.complete && document.querySelector(".profile-summary .portrait-card img")?.naturalWidth > 0,
  aboutCredentials: Array.from(document.querySelectorAll(".profile-summary .credential-list span")).map((item) => item.textContent.trim()),
  heroButtons: Array.from(document.querySelectorAll(".hero-actions .button")).map((button) => ({
    text: button.textContent?.trim(),
    svgCount: button.querySelectorAll("svg").length,
    justifyContent: getComputedStyle(button).justifyContent
  })),
  imageLoaded: document.images[0]?.complete && document.images[0]?.naturalWidth > 0,
  carouselHeight: Math.round(document.querySelector(".carousel").getBoundingClientRect().height),
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  contactEmail: document.querySelector("a[href^='mailto:']")?.textContent?.trim()
}));

await page.locator(".pipeline-step").filter({ hasText: "Observability" }).hover();
const hoverDetail = await page.locator(".pipeline-detail h3").textContent();
await page.locator(".carousel").press("ArrowRight");
const carouselAfterKey = await page.locator(".photo-count").textContent();
const carouselHeightAfterKey = await page.locator(".carousel").evaluate((node) => Math.round(node.getBoundingClientRect().height));
await page.screenshot({ path: "work/desktop-check.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "load" });
const mobile = await page.evaluate(() => ({
  viewport: { width: window.innerWidth, height: window.innerHeight },
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  pipelineColumns: getComputedStyle(document.querySelector(".pipeline-track")).gridTemplateColumns,
  carouselHeight: Math.round(document.querySelector(".carousel").getBoundingClientRect().height),
  aboutPortraitLoaded: document.querySelector(".profile-summary .portrait-card img")?.complete && document.querySelector(".profile-summary .portrait-card img")?.naturalWidth > 0,
  profileSummaryColumns: getComputedStyle(document.querySelector(".profile-summary")).gridTemplateColumns,
  contactVisible: !!document.querySelector("#contact")
}));
await page.screenshot({ path: "work/mobile-check.png", fullPage: true });

await browser.close();

console.log(JSON.stringify({ desktop, hoverDetail, carouselAfterKey, carouselHeightAfterKey, mobile }, null, 2));
