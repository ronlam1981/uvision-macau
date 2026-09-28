import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ContactFooter } from "./App";
import homeStyles from "./styles.css?inline";

const host = document.getElementById("shared-contact");
if (host) {
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = homeStyles.split(":root").join(":host").split("body{").join(":host{") + ":host{display:block;font-size:16px}img{max-width:100%}";
  const mount = document.createElement("div");
  shadow.append(style, mount);
  const category = host.dataset.category ? Number(host.dataset.category) : null;
  function Footer() {
    const [lang, setLang] = useState<"zh" | "en">(document.documentElement.lang === "en" ? "en" : "zh");
    useEffect(() => {
      const observer = new MutationObserver(() => setLang(document.documentElement.lang === "en" ? "en" : "zh"));
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
      return () => observer.disconnect();
    }, []);
    return <ContactFooter lang={lang} defaultCategory={category} />;
  }
  createRoot(mount).render(<Footer />);
}
