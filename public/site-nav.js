document.querySelectorAll(".uv-header").forEach((header) => {
  const button = header.querySelector(".uv-menu");
  const menu = header.querySelector(".uv-mobile-nav");
  if (!button || !menu) return;
  const close = () => {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "開啟選單");
    button.textContent = "☰";
  };
  button.addEventListener("click", () => {
    menu.hidden = !menu.hidden;
    button.setAttribute("aria-expanded", String(!menu.hidden));
    button.setAttribute("aria-label", menu.hidden ? "開啟選單" : "關閉選單");
    button.textContent = menu.hidden ? "☰" : "×";
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  window.addEventListener("hashchange", close);
});
