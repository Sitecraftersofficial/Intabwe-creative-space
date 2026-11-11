export default async function run(page) {
  await page.evaluate("localStorage.setItem('intambwe_consent','all')");
  await page.goto("http://localhost:4177", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const kids = [...document.querySelector("main").children];
    return kids.map((k) => ({
      tag: k.tagName,
      cls: (k.className || "").slice(0, 50),
      h: Math.round(k.getBoundingClientRect().height),
      features: k.querySelectorAll(".feature").length,
    }));
  });
  return info;
}
