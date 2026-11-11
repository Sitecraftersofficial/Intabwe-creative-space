export default async function run(page) {
  await page.evaluate("localStorage.setItem('intambwe_consent','all')");
  await page.goto("http://localhost:4176/projects", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(700);

  const mosaic = await page.evaluate(() => {
    const items = [...document.querySelectorAll(".pj-mosaic-item")];
    const head = document.querySelector(".pj-section-head");
    const grid = document.querySelector(".pj-mosaic");
    return {
      items: items.length,
      // measured column spans (approx width fraction of grid)
      widths: items.map((el) => {
        const er = el.getBoundingClientRect();
        const gr = grid.getBoundingClientRect();
        return Math.round((er.width / gr.width) * 100) + "%";
      }),
      headToGridGap:
        head && grid
          ? Math.round(
              grid.getBoundingClientRect().top -
                head.getBoundingClientRect().bottom,
            ) + "px"
          : "n/a",
      overflowX:
        document.documentElement.scrollWidth - window.innerWidth + "px",
    };
  });

  await page.locator(".pj-mosaic").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "_mosaic.png" });

  // header logo check
  await page.goto("http://localhost:4176/", { waitUntil: "networkidle" });
  const logo = await page.evaluate(() => {
    const img = document.querySelector(".header-logo img");
    const r = img.getBoundingClientRect();
    return {
      loaded: img.complete && img.naturalWidth > 0,
      natural: img.naturalWidth + "x" + img.naturalHeight,
      rendered: Math.round(r.width) + "x" + Math.round(r.height),
    };
  });

  return { mosaic, logo };
}
