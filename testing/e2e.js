const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--window-size=1920,1080"],
    });
    const page = await browser.newPage();
    await page.goto("https://namastedev.com/");
    console.log("webpage loaded");
    await page.setViewport({ width: 1920, height: 1080 });

    const coursePageLink = ".px-1 > li:nth-child(2) > a";
    await page.waitForSelector(coursePageLink);
    await page.click(coursePageLink);
})();
  