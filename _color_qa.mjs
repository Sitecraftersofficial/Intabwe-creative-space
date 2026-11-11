export default async function run(page) {
  await page.evaluate("localStorage.setItem('intambwe_consent','all')");
  await page.goto("http://localhost:4177", { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  // collect every distinct color used on the home page
  const colors = await page.evaluate(() => {
    const set = new Set();
    for (const el of document.querySelectorAll("*")) {
      const s = getComputedStyle(el);
      [s.backgroundColor, s.color, s.borderTopColor].forEach((c) => {
        if (c && c !== "rgba(0, 0, 0, 0)") set.add(c);
      });
    }
    return [...set];
  });
  const forbidden = colors.filter((c) =>
    /255,\s*(219|229|240)|#ff(db|e5|f0)|251,\s*230/.test(c),
  );
  await page.screenshot({ path: "_colors_home.png" });
  return { sampled: colors, yellowRemaining: forbidden };
}
