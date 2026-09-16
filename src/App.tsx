

import { FormEvent, useState } from "react";
import { ArrowRight, Building2, Check, ChevronRight, FileText, Mail, Menu, MessageCircle, Phone, ShieldCheck, Users, X } from "lucide-react";

type Language = "zh" | "en";

const examples = {
  zh: {
    title: "遇到以下情況，宇見可以陪你理清下一步。",
    note: "以下為常見情境示例，並非已完成的客戶案例。",
    situation: "常見情境", help: "宇見可以怎樣幫",
    prompt: "唔肯定你嘅問題屬於邊一類？先同我哋講講。", cta: "查詢我們能否協助",
    items: [
      ["滲漏水問題", "屋企不斷滲水，樓上同管理公司各有講法，唔知應該先搵邊個。", "整理滲水紀錄及各方回覆，釐清待查問題，協助規劃檢測、溝通及跟進次序。"],
      ["樓宇管理問題", "大廈準備做大維修，報價、工程範圍同開會文件睇唔明，點樣提出疑問？", "梳理工程及會議資料，列出需要釐清的重點，協助準備提問及溝通。"],
      ["租務與合作爭議", "租客拖欠租金，承諾一拖再拖；又或者合作出現分歧，大家各執一詞。", "整理協議、付款及對話紀錄，找出爭議核心，比較協商及尋求專業協助等下一步。"],
      ["政府信件理解", "收到政府信件，要求補文件或者作出回覆，但唔清楚要做啲乜。", "解讀信件要求，整理期限、所需資料及待確認事項，協助準備回覆內容。"],
      ["企業與機構危機疑難應對", "客戶投訴放上網，員工、客戶同合作伙伴都追問，應該點回應？", "整理事實、辨識風險，規劃溝通次序及回應重點。"],
      ["政策講解與企業機構訂造培訓", "新政策同業務有關，但同事唔清楚有咩影響；前線遇到投訴，亦唔知點應對。", "按機構需要講解政策，結合工作情境，設計投訴處理、傳媒溝通或危機應對培訓。"],
    ],
  },
  en: {
    title: "Facing a situation like these? We can help clarify your next step.",
    note: "These are illustrative situations, not completed client cases.",
    situation: "Common situation", help: "How U Vision can help",
    prompt: "Not sure which category your issue fits? Tell us about it first.", cta: "Ask whether we can help",
    items: [
      ["Water seepage", "Water keeps leaking into my home. The upstairs neighbour and building manager give different accounts. Who should I speak to first?", "Organise seepage records and responses, identify unanswered questions, and plan the sequence of inspections, communication and follow-up."],
      ["Building management", "Our building is planning major repairs. I do not understand the quotations, scope or meeting papers. What questions should I ask?", "Review project and meeting information, identify points needing clarification, and help prepare questions and communications."],
      ["Tenancy and partnership disputes", "My tenant keeps delaying overdue rent payments. Or a business partnership has run into disagreements, with conflicting accounts.", "Organise agreements, payment records and conversations, identify the core dispute, and compare next steps such as negotiation or seeking professional support."],
      ["Government letters", "I received a government letter asking for more documents or a response, but I am not sure what I need to do.", "Clarify the letter’s requests, deadlines, required information and outstanding questions, and help prepare a response."],
      ["Business and organisational crisis response", "A customer has posted a complaint online. Staff, customers and partners are asking questions. How should we respond?", "Establish the facts, identify risks and plan the sequence and substance of communications."],
      ["Policy briefings and tailored training", "A new policy affects our work, but colleagues are unsure how. Frontline staff also need help handling complaints.", "Explain policies relevant to the organisation and design scenario-based training in complaint handling, media communication or crisis response."],
    ],
  },
} as const;

const copy = {
  zh: {
    nav: ["我們如何協助", "服務流程", "創辦人", "聯絡我們"], navIds: ["services", "process", "founder", "contact"], language: "EN",
    eyebrow: "實務型疑難個案與決策顧問", hero: "把複雜問題整理清楚，\n找出可以前行的下一步。",
    heroText: "宇見協助居民、企業及機構整理資料、釐清問題、辨識風險和比較選項，讓你在複雜處境中作出更清楚的決定。",
    consult: "開始查詢", learn: "了解服務方式", promiseTitle: "我們陪你看清，不替你作主",
    promise: "我們不承諾個案結果，也不以「關係」作賣點。宇見承諾的是有系統的方法、透明的判斷，以及清晰可行的下一步。",
    servicesKicker: "我們如何協助", servicesTitle: "當資料零散、說法不一，\n先把問題看清楚。",
    servicesIntro: "以下是常見的協助範圍。每個個案的情況不同，宇見會先了解事實，再說明可提供的支援。",
    serviceItems: [
      ["滲漏水與樓宇管理", "整理問題來源、持份者說法、程序及可行處理方向。"],
      ["租務與合作爭議", "釐清文件、時間線、責任主張及協商選項。"],
      ["政府信件與程序理解", "把正式文件轉化成容易理解的重點、期限及下一步。"],
      ["企業與機構危機疑難應對", "整理事實、辨識風險，規劃溝通次序及回應重點。"],
      ["政策講解與企業機構訂造培訓", "剖析公共政策，訂定針對性培訓內容。"],
      ["其他生活及營運難題", "問題未必有現成分類；先談清楚，再判斷如何處理。"],
    ],
    processKicker: "服務流程", processTitle: "從混亂，到清晰可行。",
    steps: [
      ["01", "整理資料", "把文件、說法、事件和時間線放回正確位置。"],
      ["02", "釐清核心問題", "區分已知事實、未知事項、假設與真正需要。"],
      ["03", "評估選項及風險", "比較各方案的成本、時間、代價及後續影響。"],
      ["04", "制定下一步", "形成具體次序、溝通重點、文件清單及檢查節點。"],
    ],
    waysKicker: "服務方式", waysTitle: "按問題需要，提供合適深度的支援。",
    ways: [["初步諮詢", "了解問題、整理重點，判斷下一步應由誰處理。"], ["個案分析", "根據已提供資料，拆解問題、選項、風險及行動次序。"], ["持續支援", "就複雜個案協助跟進資料、會議、溝通及進度節點。"]],
    price: "服務範圍及收費會在了解個案後說明；開始工作前，會先確認內容及安排。",
    founderKicker: "創辦人", founderTitle: "由林宇滔創立，\n把經驗化為清晰的下一步。",
    founderParas: [
      "林宇滔曾任記者、節目主持，具時事評論及專欄寫作經驗，亦曾擔任公共政策、傳媒溝通及危機管理的培訓導師。他長期關注澳門公共政策及各類民生議題，曾協助居民、機構及團體梳理、協調及解決數千個個案，對澳門問題有深入而獨到的見解。",
      "從資料梳理、事實查證、政策分析，到面對不同立場的當事人，他重視先聆聽、釐清事實，再找出問題核心。",
      "創立宇見顧問，是希望把這些經驗轉化為居民、企業及機構可使用的實務支援：整理混亂資訊、辨識風險、比較選項，讓客戶清楚選擇下一步，不用鑽牛角尖，也不用走冤枉路。",
    ],
    resourcesKicker: "實用資料", resourcesTitle: "把複雜知識，整理成隨時用得上的內容。",
    resources: [["宇見一頁", "用一頁看懂一個問題的重點與處理次序。", "籌備中"], ["宇見一本", "以簡明小冊整理常見問題、步驟與參考來源。", "籌備中"]],
    contactKicker: "聯絡我們", contactTitle: "先把問題說清楚，\n再一起找下一步。",
    contactIntro: "你可以直接聯絡我們，或填寫三項基本資料，再前往 WhatsApp 確認發送。",
    name: "姓名", namePlaceholder: "如何稱呼你", method: "聯絡方式", methodPlaceholder: "電話、WhatsApp 或電郵", category: "問題類別", select: "請選擇",
    categories: ["滲漏水／樓宇管理", "租務糾紛", "政府信件理解", "投訴／危機應對", "合作爭議", "其他"],
    privacy: "只需提供基本聯絡資料。請勿在此提交身份證、合約、相片或其他個案文件。",
    send: "前往 WhatsApp 確認發送", unsent: "資料尚未送出，請在通訊軟件內完成發送。", direct: "直接聯絡",
    address: "澳門桔仔街65號一樓（到訪請提前預約）", qr: "掃描 QR Code 開啟 WhatsApp",
    boundaryTitle: "服務界線",
    boundary: "宇見提供資料整理、問題分析、選項比較、溝通及行動規劃支援，不保證個案結果，亦不代替律師、工程師、會計師、醫療人員或其他須具專業資格人士的專業意見或法定工作。需要時，我們會建議尋求合適專業人士協助。",
    privacyTitle: "私隱提示", privacyText: "你主動提供的聯絡資料只會用於回覆查詢及安排服務。未經同意不會用作其他推廣用途。請先經聯絡確認，再以合適方式提交個案文件。",
    footerTagline: "以同理看見本質，以遠見引向未來。", rights: "宇見顧問有限公司。保留所有權利。",
  },
  en: {
    nav: ["How we help", "Our process", "Founder", "Contact"], navIds: ["services", "process", "founder", "contact"], language: "繁中",
    eyebrow: "Practical case and decision advisory", hero: "Bring clarity to complex problems.\nFind a practical way forward.",
    heroText: "U Vision helps individuals, businesses and organisations organise information, clarify issues, identify risks and compare options—so they can make clearer decisions in complex situations.",
    consult: "Start an enquiry", learn: "How we work", promiseTitle: "We help you see clearly. You remain in control.",
    promise: "We do not guarantee outcomes or sell access through connections. We commit to a structured method, transparent judgement and clear, practical next steps.",
    servicesKicker: "How we help", servicesTitle: "When facts are scattered and accounts conflict,\nclarity comes first.",
    servicesIntro: "These are common areas in which we assist. Every case is different; we first understand the facts, then explain the support we can provide.",
    serviceItems: [
      ["Water seepage & building management", "Organise possible causes, stakeholder accounts, procedures and practical paths forward."],
      ["Tenancy & partnership disputes", "Clarify documents, timelines, competing claims and negotiation options."],
      ["Government letters & procedures", "Turn formal documents into understandable priorities, deadlines and next steps."],
      ["Crisis & complex-issue response for businesses and organisations", "Establish the facts, identify risks and plan the sequence and substance of communications."],
      ["Policy briefings & tailored training for businesses and organisations", "Analyse public policy and develop targeted training content."],
      ["Other practical challenges", "Not every problem fits a category. We first clarify it, then determine the right way forward."],
    ],
    processKicker: "Our process", processTitle: "From confusion to a clear, workable plan.",
    steps: [
      ["01", "Organise information", "Put documents, accounts, events and timelines in the right order."],
      ["02", "Clarify the core issue", "Separate known facts, unknowns, assumptions and the real need."],
      ["03", "Assess options and risks", "Compare cost, time, trade-offs and downstream effects."],
      ["04", "Set the next steps", "Define priorities, key messages, document lists and review points."],
    ],
    waysKicker: "Ways to work with us", waysTitle: "The right depth of support for the issue at hand.",
    ways: [["Initial consultation", "Understand the issue, identify priorities and decide who should handle the next step."], ["Case analysis", "Review the available information and set out issues, options, risks and priorities."], ["Ongoing support", "Support complex cases through information review, meetings, communications and progress checks."]],
    price: "Scope and fees are explained after we understand the case. The work and arrangement will be confirmed before we begin.",
    founderKicker: "Founder", founderTitle: "Founded by Ron Lam,\nturning experience into clear next steps.",
    founderParas: [
      "Ron Lam is a former journalist and television presenter with experience in current-affairs commentary and column writing. He has also served as a trainer in public policy, media communication and crisis management. Having long followed public policy and community issues in Macao, he has helped residents, organisations and community groups organise, coordinate and resolve thousands of cases, developing a deep and distinctive understanding of local issues.",
      "Whether organising information, verifying facts, analysing policy or working with people who hold different positions, he begins by listening, clarifying the facts and identifying the heart of the problem.",
      "He founded U Vision to turn this experience into practical support for individuals, businesses and organisations: bringing order to complex information, identifying risks and comparing options, so clients can choose their next step clearly without getting stuck or taking avoidable detours.",
    ],
    resourcesKicker: "Practical resources", resourcesTitle: "Complex knowledge, organised for practical use.",
    resources: [["U Vision: One Page", "The essentials and action sequence for one issue, on one page.", "In preparation"], ["U Vision: One Book", "Concise guides to common issues, practical steps and reference sources.", "In preparation"]],
    contactKicker: "Contact us", contactTitle: "Clarify the issue first.\nThen find the next step together.",
    contactIntro: "Contact us directly, or provide three basic details before continuing to WhatsApp to confirm and send.",
    name: "Name", namePlaceholder: "How should we address you?", method: "Contact details", methodPlaceholder: "Phone, WhatsApp or email", category: "Type of issue", select: "Please select",
    categories: ["Water seepage / building management", "Tenancy dispute", "Government letter", "Complaint / crisis response", "Partnership dispute", "Other"],
    privacy: "Basic contact details only. Do not submit identity documents, contracts, photos or case files here.",
    send: "Continue to WhatsApp", unsent: "Nothing has been sent yet. Please complete sending in the messaging app.", direct: "Contact directly",
    address: "1/F, No. 65 Rua dos Cules, Macao (visits by appointment)", qr: "Scan to open WhatsApp",
    boundaryTitle: "Scope of service",
    boundary: "U Vision supports information organisation, issue analysis, option comparison, communication and action planning. We do not guarantee outcomes or replace the professional advice or statutory work of lawyers, engineers, accountants, medical practitioners or other licensed professionals. Where appropriate, we will recommend seeking qualified professional support.",
    privacyTitle: "Privacy notice", privacyText: "Contact details you provide are used only to respond to your enquiry and arrange services. They will not be used for other marketing without consent. Please contact us first before submitting case documents through an appropriate channel.",
    footerTagline: "See the essence with empathy. Move forward with foresight.", rights: "U Vision Consulting Limited. All rights reserved.",
  },
} as const;

export default function Home() {
  const [lang, setLang] = useState<Language>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [manualCopy, setManualCopy] = useState("");
  const t = copy[lang];
  const e = examples[lang];
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\\//, "")}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = lang === "zh"
      ? `你好，我想向宇見顧問查詢。\n姓名：${data.get("name")}\n聯絡方式：${data.get("contact")}\n問題類別：${data.get("category")}\n\n資料尚未送出，請在 WhatsApp 內按發送。`
      : `Hello, I would like to enquire with U Vision Consulting.\nName: ${data.get("name")}\nContact: ${data.get("contact")}\nIssue: ${data.get("category")}\n\nPlease press send in WhatsApp to complete your enquiry.`;
    const cleanMessage = message.split("\n\n")[0];
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.value === "copy") {
      try {
        await navigator.clipboard.writeText(cleanMessage);
        setManualCopy("");
        setCopyStatus(lang === "zh" ? "已複製。資料尚未送出，請在通訊軟件內貼上並完成發送。" : "Copied. Nothing has been sent. Paste and send in your messaging app.");
      } catch {
        setManualCopy(cleanMessage);
        setCopyStatus(lang === "zh" ? "未能自動複製，請選取下方文字手動複製。" : "Automatic copying is unavailable. Select and copy the text below.");
      }
      return;
    }
    window.open(`https://wa.me/85366798555?text=${encodeURIComponent(cleanMessage)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="U Vision home"><img src={asset("uvision-horizontal.jpeg")} alt="宇見顧問有限公司 U Vision Consulting Limited" width="920" height="324" /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {t.nav.map((item, index) => <a key={item} href={`#${t.navIds[index]}`}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="lang-button" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>{t.language}</button>
          <a href="#contact" className="header-cta">{t.consult}</a>
          <button className="menu-button" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{t.nav.map((item, index) => <a key={item} href={`#${t.navIds[index]}`} onClick={() => setMenuOpen(false)}>{item}<ChevronRight size={17}/></a>)}</nav>}
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="kicker">{t.eyebrow}</p><h1>{t.hero}</h1><p className="hero-text">{t.heroText}</p>
          <div className="hero-actions"><a className="button primary" href="#contact">{t.consult}<ArrowRight size={18}/></a><a className="button secondary" href="#process">{t.learn}</a></div>
        </div>
        <div className="official-hero-logo"><img src={asset("assets/uvision-logo.webp")} alt="宇見顧問有限公司正式標誌" width="1448" height="1086" /></div>
      </section>

      <section className="promise-strip"><div className="section-shell promise-inner"><ShieldCheck size={28}/><div><h2>{t.promiseTitle}</h2><p>{t.promise}</p></div></div></section>

      <section id="services" className="section-shell content-section">
        <div className="section-heading split-heading"><div><p className="kicker">{t.servicesKicker}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesIntro}</p></div>
        <div className="service-grid">
          {t.serviceItems.map(([title, text], index) => {
            const icons = [Building2, FileText, FileText, MessageCircle, Users, ChevronRight]; const Icon = icons[index];
            return <article className="service-item" key={title}><Icon size={24}/><div><h3>{title}</h3><p>{text}</p></div></article>;
          })}
        </div>
        <div className="service-examples">
          <h3 className="examples-heading">{e.title}</h3>
          <p className="examples-note">{e.note}</p>
          <div className="examples-grid">{e.items.map(([title, situation, help]) => (
            <article className="example-card" key={title}>
              <h4>{title}</h4><p className="example-label">{e.situation}</p>
              <blockquote>{situation}</blockquote>
              <p className="example-label">{e.help}</p><p className="example-help">{help}</p>
            </article>
          ))}</div>
          <div className="examples-contact"><p>{e.prompt}</p><a className="button primary" href="#contact">{e.cta}<ArrowRight size={18}/></a></div>
        </div>
      </section>

      <section id="process" className="process-section"><div className="section-shell">
        <div className="section-heading"><p className="kicker light">{t.processKicker}</p><h2>{t.processTitle}</h2></div>
        <div className="steps-grid">{t.steps.map(([number, title, text]) => <article className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="section-shell content-section ways-section">
        <div className="section-heading"><p className="kicker">{t.waysKicker}</p><h2>{t.waysTitle}</h2></div>
        <div className="ways-grid">{t.ways.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <p className="price-note"><Check size={18}/>{t.price}</p>
      </section>

      <section id="founder" className="founder-section"><div className="section-shell founder-grid">
        <div className="founder-title"><p className="kicker">{t.founderKicker}</p><h2>{t.founderTitle}</h2><div className="founder-initial">RL</div></div>
        <div className="founder-copy">{t.founderParas.map((p) => <p key={p}>{p}</p>)}</div>
      </div></section>

      <section className="section-shell content-section resources-section">
        <div className="section-heading split-heading"><div><p className="kicker">{t.resourcesKicker}</p><h2>{t.resourcesTitle}</h2></div></div>
        <div className="resource-grid">{t.resources.map(([title, text, status]) => <article key={title}><div><span>{status}</span><h3>{title}</h3><p>{text}</p></div><ArrowRight size={22}/></article>)}</div>
      </section>

      <section id="contact" className="contact-section"><div className="section-shell contact-grid">
        <div className="contact-info">
          <p className="kicker light">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p className="contact-intro">{t.contactIntro}</p><h3>{t.direct}</h3>
          <div className="contact-links"><a href="https://wa.me/85366798555" target="_blank" rel="noreferrer"><MessageCircle size={20}/>WhatsApp · +853 6679 8555</a><a href="tel:+85366798555"><Phone size={20}/>+853 6679 8555</a><a href="mailto:uvisionconsulting@gmail.com"><Mail size={20}/>uvisionconsulting@gmail.com</a></div>
          <p className="address">{t.address}</p><div className="social-links"><a href="https://www.facebook.com/uvisionmacau" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/uvisionmacau/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.threads.com/@uvisionmacau" target="_blank" rel="noreferrer">Threads</a></div>
        </div>
        <form className="enquiry-form" onSubmit={handleSubmit}>
          <label>{t.name}<input name="name" required placeholder={t.namePlaceholder}/></label>
          <label>{t.method}<input name="contact" required placeholder={t.methodPlaceholder}/></label>
          <label>{t.category}<select name="category" required defaultValue=""><option value="" disabled>{t.select}</option>{t.categories.map((category) => <option key={category}>{category}</option>)}<option>{lang === "zh" ? "政策講解／訂造培訓" : "Policy briefing / tailored training"}</option></select></label>
          <p className="form-privacy"><ShieldCheck size={17}/>{t.privacy}</p><button type="submit" className="button primary full">{t.send}<ArrowRight size={18}/></button><p className="unsent">{t.unsent}</p>
          <button type="submit" name="action" value="copy" className="button secondary full copy-enquiry">{lang === "zh" ? "複製查詢內容（微信／其他平台）" : "Copy enquiry for WeChat / other platforms"}</button>
          <p className="copy-status" role="status">{copyStatus}</p>
          {manualCopy && <textarea aria-label={lang === "zh" ? "手動複製查詢內容" : "Enquiry to copy manually"} readOnly rows={5} value={manualCopy} onFocus={(e) => e.currentTarget.select()} />}
          <p className="wechat-note">{lang === "zh" ? "微信查詢：複製內容後，掃描下方宇見 U Vision 的正式 QR Code，加為好友，再貼上發送。" : "For WeChat enquiries, copy your message, scan the official U Vision QR code below, add us as a friend, then paste and send."} <a href="#wechat" className="wechat-link">{lang === "zh" ? "查看微信 QR Code" : "View WeChat QR code"}</a></p>
        </form>
        <section className="platforms" aria-label={lang === "zh" ? "社交平台及 QR Code" : "Social channels and QR codes"}>
          {[
            {name:"WhatsApp",account:"+853 6679 8555",url:"https://wa.me/85366798555",icon:1,qr:8},
            {name:"Facebook",account:"@uvisionmacau",url:"https://www.facebook.com/uvisionmacau",icon:3,qr:10},
            {name:"Instagram",account:"@uvisionmacau",url:"https://www.instagram.com/uvisionmacau/",icon:4,qr:12},
            {name:"Threads",account:"@uvisionmacau",url:"https://www.threads.com/@uvisionmacau",icon:5,qr:14},
          ].map((platform) => <article className="platform-card" key={platform.name}>
            <h3><img className="platform-icon" src={asset(`card-asset-${platform.icon}.svg`)} alt="" />{platform.name}</h3>
            <p>{platform.account}</p>
            <a href={platform.url} target="_blank" rel="noreferrer" aria-label={`${platform.name} ${platform.account}`}><img className="platform-qr" src={asset(`card-asset-${platform.qr}.png`)} alt={`${platform.name} QR Code`} width="980" height="980" /></a>
            <a className="platform-open" href={platform.url} target="_blank" rel="noreferrer">{lang === "zh" ? "開啟" : "Open"} {platform.name}<ArrowRight size={16}/></a>
          </article>)}
          <article id="wechat" className="platform-card wechat-contact">
            <h3><img className="platform-icon" src={asset("card-asset-2.svg")} alt="" />WeChat {lang === "zh" ? "微信" : ""}</h3>
            <p>U Vision · {lang === "zh" ? "宇見顧問" : "U Vision Consulting"}</p>
            <a href={asset("uvision-wechat-qr.jpg")} target="_blank" rel="noreferrer" aria-label={lang === "zh" ? "放大宇見微信加好友 QR Code" : "Enlarge the U Vision WeChat add-friend QR code"}><img className="platform-qr" src={asset("uvision-wechat-qr.jpg")} alt={lang === "zh" ? "宇見 U Vision 微信正式加好友 QR Code" : "Official U Vision WeChat add-friend QR code"} width="1206" height="1536" /></a>
            <a className="platform-open" href={asset("uvision-wechat-qr.jpg")} target="_blank" rel="noreferrer">{lang === "zh" ? "放大 QR Code" : "Enlarge QR code"}<ArrowRight size={16}/></a>
            <a className="platform-open" href={asset("uvision-wechat-qr.jpg")} download="U-Vision-WeChat.jpg">{lang === "zh" ? "儲存微信 QR Code" : "Save WeChat QR code"}</a>
            <p>{lang === "zh" ? "電腦用戶可用微信掃描；手機用戶可先儲存圖片，再在微信「掃一掃」從相簿選取。加為好友後，貼上查詢內容並自行發送。" : "On a computer, scan with WeChat. On a phone, save the image and select it from your album in WeChat Scan. Add us as a friend, then paste and send your enquiry."}</p>
          </article>
        </section>
      </div></section>

      <section className="section-shell boundaries"><article><h2>{t.boundaryTitle}</h2><p>{t.boundary}</p></article><article><h2>{t.privacyTitle}</h2><p>{t.privacyText}</p></article></section>
      <footer><div className="section-shell footer-main"><img src={asset("assets/uvision-logo.webp")} alt="宇見顧問 U Vision Consulting"/><p>{t.footerTagline}</p></div><div className="section-shell footer-bottom"><span>© 2026 {t.rights}</span><span>uvisionconsulting@gmail.com</span></div></footer>
    </main>
  );
}
