"""Build bilingual service pages from approved copy and the shared layout."""
import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
pages = json.loads((ROOT / 'content/services.json').read_text())
header = (ROOT / 'scripts/templates/site-header.html').read_text()

def e(value):
    return escape(str(value), quote=True)

def paragraphs(values):
    return ''.join(f'<p>{e(value)}</p>' for value in values)

def content(page, lang):
    d = page[lang]
    zh = lang == 'zh'
    ask = '查詢我們能否協助' if zh else 'Ask whether we can help'
    parts = [f'''<div data-{lang}{'' if zh else ' hidden'}>
      <section class="hero"><div class="shell hero-inner">
        <div><p class="eyebrow">{'宇見如何協助' if zh else 'How we help'} · {e(d['title'])}</p>
          <h1>{e(d['headline'])}</h1><p class="lead">{e(d['lead'])}</p>
          <div class="hero-actions"><a class="button light" href="#cases-{lang}">{'看看常見情境' if zh else 'Explore common situations'} <span aria-hidden="true">↓</span></a><a class="button outline-light" href="#contact">{ask}</a></div>
        </div><aside class="hero-aside"><span>{'宇見可以怎樣幫' if zh else 'How U Vision can help'}</span><p>{e(d['help'])}</p></aside>
      </div></section>''']
    if d.get('intro'):
        parts.append(f'<section class="intro shell"><h2>{e(d["introTitle"])}</h2>{paragraphs(d["intro"])}</section>')
    title = ('你可能正遇到這些問題' if zh else 'You may be facing these situations') if d.get('cases') else ('十個常見問題' if zh else 'Ten common questions')
    parts.append(f'<section class="cases" id="cases-{lang}"><div class="shell"><p class="eyebrow dark">{e(d["title"])}</p><h2>{title}</h2>')
    if d.get('note'):
        parts.append(f'<p class="section-note">{e(d["note"])}</p>')
    parts.append('<div class="case-list">')
    labels = ['常見情境', '先釐清', '宇見可以協助' if page['slug'] == 'crisis' else '宇見可以怎樣幫'] if zh else ['Common situation', 'Clarify first', 'How U Vision can help']
    for i, item in enumerate(d.get('cases', []), 1):
        details = ''.join(f'<div><h4>{label}</h4><p>{e(text)}</p></div>' for label, text in zip(labels, item[1:]))
        parts.append(f'<article class="case"><span class="number">{i:02}</span><div><h3>{e(item[0])}</h3><div class="case-detail three">{details}</div></div></article>')
    for i, item in enumerate(d.get('questions', []), 1):
        parts.append(f'<article class="case question"><span class="number">{i:02}</span><div><h3>{e(item)}</h3></div></article>')
    parts.append('</div></div></section>')
    if d.get('outputs'):
        parts.append(f'<section class="intro shell"><h2>{e(d["outputsTitle"])}</h2><p>{e(d["outputsIntro"])}</p><div class="output-grid">')
        parts.extend(f'<article><h3>{e(title)}</h3><p>{e(text)}</p></article>' for title, text in d['outputs'])
        parts.append(f'</div><p>{e(d["outputsEnd"])}</p></section>')
    parts.append(f'<section class="next shell"><p class="eyebrow dark">{"下一步" if zh else "Next step"}</p><h2>{e(d["nextTitle"])}</h2>{paragraphs(d["next"])}')
    if d.get('nextList'):
        parts.append('<ol class="next-list">'+''.join(f'<li>{e(text)}</li>' for text in d['nextList'])+'</ol>')
    if d.get('nextEnd'):
        parts.append(f'<p>{e(d["nextEnd"])}</p>')
    parts.append(f'<a class="button dark-button" href="#contact">{ask} <span aria-hidden="true">→</span></a>')
    if d.get('scope'):
        parts.append(f'<p class="page-scope">{e(d["scope"])}</p>')
    parts.append('</section></div>')
    return '\n'.join(parts)

for page in pages:
    zh, en = page['zh'], page['en']
    path = ROOT / 'public' / page['slug'] / 'consult.html'
    path.parent.mkdir(parents=True, exist_ok=True)
    html = f'''<!doctype html>
<html lang="zh-Hant-MO"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(zh['title'])}｜宇見顧問有限公司</title><meta name="description" content="{e(zh['lead'])}">
<meta name="theme-color" content="#183c70"><link rel="canonical" href="https://uvisionmacau.com/{page['slug']}/consult.html">
<link rel="icon" href="/favicon.png"><link rel="stylesheet" href="/service-pages.css"><link rel="stylesheet" href="/site-nav.css">
<script src="/site-nav.js" defer></script><script src="/service-language.js" defer></script></head>
<body data-title-zh="{e(zh['title'])}" data-title-en="{e(en['title'])}">
{header}
<nav class="uv-breadcrumbs" aria-label="目前位置"><div class="uv-trail"><a href="/"><span data-zh>首頁</span><span data-en hidden>Home</span></a><span aria-hidden="true">›</span><a href="/#services"><span data-zh>我們如何協助</span><span data-en hidden>How we help</span></a><span aria-hidden="true">›</span><span aria-current="page"><span data-zh>{e(zh['title'])}</span><span data-en hidden>{e(en['title'])}</span></span></div></nav>
<main>{content(page, 'zh')}{content(page, 'en')}</main>
<div id="contact"><div id="shared-contact" data-category="{page['category']}"></div><noscript><p class="shell">聯絡宇見：<a href="https://wa.me/85366798555">WhatsApp +853 6679 8555</a> · <a href="mailto:uvisionconsulting@gmail.com">uvisionconsulting@gmail.com</a></p></noscript></div>
<script type="module" src="/assets/subpage-footer.js"></script>
</body></html>'''
    path.write_text(html)
    print(path.relative_to(ROOT))
