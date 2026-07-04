document.addEventListener("DOMContentLoaded", () => {

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* i18n                                                                 */
  /* ------------------------------------------------------------------ */
  let lang = localStorage.getItem("lang") || "ru";
  let products = [];
  let activeFilter = "all";

  const dict = {
    ru: {
      "hero.heading": "Текстиль премиального уровня в Масисе",
      "hero.eyebrow": "Мастерская в Масисе",
      "hero.text": "Минимализм, тактильность и качество в каждой детали вашего дома.",
      "hero.cta": "Смотреть каталог",
      "hero.cta2": "Связаться",
      "hero.scroll": "Прокрутите",
      "manifesto.eyebrow": "Философия",
      "manifesto.title": "Ткань, которая помнит прикосновение — <em>вот что мы делаем</em>.",
      "material.1.title": "Лён и хлопок",
      "material.1.text": "Натуральные волокна с местных и проверенных европейских производств.",
      "material.2.title": "Ручная отделка",
      "material.2.text": "Кромки, стежка и упаковка каждого изделия — вручную, в Масисе.",
      "material.3.title": "Медленное производство",
      "material.3.text": "Небольшие партии — чтобы контролировать качество каждой нити.",
      "catalog.eyebrow": "Каталог",
      "catalog.title": "Изделия",
      "catalog.text": "Каждая вещь — часть небольшой коллекции, собранной вокруг одного оттенка и одной фактуры.",
      "filter.all": "Все",
      "map.eyebrow": "Мастерская",
      "map.title": "Мы на карте",
      "map.addr": "г. Масис, Армения",
      "map.hours": "Пн–Сб, 10:00–19:00",
      "contacts.eyebrow": "Контакты",
      "contacts.title": "Напишите нам — ответим в течение дня.",
      "contacts.text": "Поможем подобрать ткань, оттенок и размер под вашу спальню, гостиную или проект.",
      "contacts.wa": "Написать в WhatsApp",
      "contacts.call": "Позвонить",
      "contacts.col1": "Адрес",
      "contacts.col2": "Связь",
      "contacts.col3": "Часы работы",
      "contacts.made": "Сделано с вниманием к деталям",
      "modal.call": "Позвонить",
      "modal.wa": "WhatsApp",
      "modal.interest": "Интересует"
    },
    en: {
      "hero.heading": "Premium textile, made in Masis",
      "hero.eyebrow": "A workshop in Masis",
      "hero.text": "Minimalism, texture and quality in every detail of your home.",
      "hero.cta": "View the catalog",
      "hero.cta2": "Get in touch",
      "hero.scroll": "Scroll",
      "manifesto.eyebrow": "Philosophy",
      "manifesto.title": "Fabric that remembers the touch — <em>that's what we make</em>.",
      "material.1.title": "Linen and cotton",
      "material.1.text": "Natural fibres from local and trusted European mills.",
      "material.2.title": "Finished by hand",
      "material.2.text": "Edges, stitching and packaging — done by hand, in Masis.",
      "material.3.title": "Slow production",
      "material.3.text": "Small batches, so every thread stays under control.",
      "catalog.eyebrow": "Catalog",
      "catalog.title": "Pieces",
      "catalog.text": "Every piece belongs to a small collection built around one tone and one texture.",
      "filter.all": "All",
      "map.eyebrow": "Workshop",
      "map.title": "Find us",
      "map.addr": "Masis, Armenia",
      "map.hours": "Mon–Sat, 10:00–19:00",
      "contacts.eyebrow": "Contact",
      "contacts.title": "Write to us — we reply within a day.",
      "contacts.text": "We'll help you choose the fabric, tone and size for your bedroom, living room or project.",
      "contacts.wa": "Message on WhatsApp",
      "contacts.call": "Call us",
      "contacts.col1": "Address",
      "contacts.col2": "Contact",
      "contacts.col3": "Hours",
      "contacts.made": "Made with attention to detail",
      "modal.call": "Call",
      "modal.wa": "WhatsApp",
      "modal.interest": "Interested in"
    },
    am: {
      "hero.heading": "Պրեմիում որակի տեքստիլ Մասիսում",
      "hero.eyebrow": "Արհեստանոց Մասիսում",
      "hero.text": "Մինիմալիզմ, հպման որակ և փայլուն ման­րամասներ ձեր տան համար։",
      "hero.cta": "Դիտել կատալոգը",
      "hero.cta2": "Կապ հաստատել",
      "hero.scroll": "Ոլորեք",
      "manifesto.eyebrow": "Փիլիսոփայություն",
      "manifesto.title": "Գործվածք, որը հիշում է հպումը — <em>հենց դա ենք մենք ստեղծում</em>։",
      "material.1.title": "Կտավատ և բամբակ",
      "material.1.text": "Բնական մանրաթելեր տեղական և վստահելի եվրոպական արտադրություններից։",
      "material.2.title": "Ձեռքի աշխատանք",
      "material.2.text": "Եզրագծում, կարում և փաթեթավորում — ամեն ինչ ձեռքով, Մասիսում։",
      "material.3.title": "Դանդաղ արտադրություն",
      "material.3.text": "Փոքր խմբաքանակներ՝ յուրաքանչյուր թելի որակը վերահսկելու համար։",
      "catalog.eyebrow": "Կատալոգ",
      "catalog.title": "Իրեր",
      "catalog.text": "Յուրաքանչյուր իր փոքր հավաքածուի մաս է՝ կառուցված մեկ երանգի և մեկ հյուսվածքի շուրջ։",
      "filter.all": "Բոլորը",
      "map.eyebrow": "Արհեստանոց",
      "map.title": "Մենք քարտեզի վրա",
      "map.addr": "ք. Մասիս, Հայաստան",
      "map.hours": "Երկ–Շբթ, 10:00–19:00",
      "contacts.eyebrow": "Կոնտակտներ",
      "contacts.title": "Գրեք մեզ — կպատասխանենք մեկ օրվա ընթացքում։",
      "contacts.text": "Կօգնենք ընտրել գործվածքը, երանգը և չափսը ձեր ննջասենյակի, հյուրասենյակի կամ նախագծի համար։",
      "contacts.wa": "Գրել WhatsApp-ով",
      "contacts.call": "Զանգահարել",
      "contacts.col1": "Հասցե",
      "contacts.col2": "Կապ",
      "contacts.col3": "Աշխատանքային ժամեր",
      "contacts.made": "Ստեղծված է մանրամասների նկատմամբ ուշադրությամբ",
      "modal.call": "Զանգահարել",
      "modal.wa": "WhatsApp",
      "modal.interest": "Հետաքրքրված է"
    }
  };

  function t(key) { return (dict[lang] && dict[lang][key]) || dict.ru[key] || key; }

  /* ------------------------------------------------------------------ */
  /* Hero heading — word-by-word rise-in                                  */
  /* ------------------------------------------------------------------ */
  const heroHeading = document.querySelector("[data-hero-heading]");

  function setHeroHeading(text) {
    heroHeading.innerHTML = "";
    text.split(" ").forEach((word, i) => {
      const wrap = document.createElement("span");
      wrap.className = "word";
      const inner = document.createElement("span");
      inner.textContent = word + "\u00A0";
      inner.style.animationDelay = (0.15 + i * 0.07) + "s";
      wrap.appendChild(inner);
      heroHeading.appendChild(wrap);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Apply language                                                       */
  /* ------------------------------------------------------------------ */
  function applyLang() {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    setHeroHeading(t("hero.heading"));

    document.querySelectorAll(".lang").forEach(b => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });

    buildFilters();
    render();
  }

  document.querySelectorAll(".lang").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === lang) return;
      lang = btn.dataset.lang;
      localStorage.setItem("lang", lang);
      applyLang();
    });
  });

  /* ------------------------------------------------------------------ */
  /* Products                                                             */
  /* ------------------------------------------------------------------ */
  const grid = document.querySelector(".grid");
  const filterRow = document.querySelector("[data-filters]");

  async function load() {
    const res = await fetch("./products.json");
    products = await res.json();
    applyLang();
    initObservers();
  }

  function categories() {
    const seen = new Map();
    products.forEach(p => {
      const cat = p.category[lang] || p.category.ru;
      seen.set(cat, cat);
    });
    return Array.from(seen.keys());
  }

  function buildFilters() {
    filterRow.innerHTML = "";
    const all = document.createElement("button");
    all.className = "filter-chip" + (activeFilter === "all" ? " active" : "");
    all.textContent = t("filter.all");
    all.addEventListener("click", () => { activeFilter = "all"; buildFilters(); render(); });
    filterRow.appendChild(all);

    categories().forEach(cat => {
      const chip = document.createElement("button");
      chip.className = "filter-chip" + (activeFilter === cat ? " active" : "");
      chip.textContent = cat;
      chip.addEventListener("click", () => { activeFilter = cat; buildFilters(); render(); });
      filterRow.appendChild(chip);
    });
  }

  function peekIcon() {
    return '<span class="peek"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></span>';
  }

  function render() {
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();

    const list = products.filter(p => {
      if (activeFilter === "all") return true;
      return (p.category[lang] || p.category.ru) === activeFilter;
    });

    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "card reveal";
      card.dataset.id = p.id;

      card.innerHTML = `
        <div class="card-media">
          <img src="${p.image}" alt="${p.title[lang]}" loading="lazy" />
          ${peekIcon()}
        </div>
        <div class="card-body">
          <span class="card-cat">${p.category[lang] || p.category.ru}</span>
          <h3>${p.title[lang]}</h3>
          <p>${p.description[lang]}</p>
        </div>
      `;
      frag.appendChild(card);
    });

    grid.appendChild(frag);
    observeAll(grid.querySelectorAll(".reveal"));
  }

  /* ------------------------------------------------------------------ */
  /* Modal                                                                */
  /* ------------------------------------------------------------------ */
  const modal = document.querySelector(".modal-overlay");
  const modalEyebrow = modal.querySelector(".modal-eyebrow");
  const modalTitle = modal.querySelector("h3");
  const wa = modal.querySelector(".wa-btn");
  const call = modal.querySelector(".call-btn");

  function openModal(p) {
    modalEyebrow.textContent = p.category[lang] || p.category.ru;
    modalTitle.textContent = p.title[lang];
    wa.href = `https://wa.me/374000000000?text=${encodeURIComponent(t("modal.interest") + ": " + p.title[lang])}`;
    call.href = "tel:+374000000000";

    modal.classList.add("open");
  }

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("open");
  });
  modal.querySelector(".modal-close").addEventListener("click", () => modal.classList.remove("open"));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("open");
  });

  grid.addEventListener("click", e => {
    const card = e.target.closest(".card");
    if (!card) return;
    const p = products.find(x => x.id == card.dataset.id);
    if (p) openModal(p);
  });

  /* ------------------------------------------------------------------ */
  /* Scroll reveals                                                       */
  /* ------------------------------------------------------------------ */
  let io;
  function initObservers() {
    io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    observeAll(document.querySelectorAll(".reveal, .reveal-stagger, .material"));
  }
  function observeAll(nodes) {
    nodes.forEach(n => io && io.observe(n));
  }

  /* ------------------------------------------------------------------ */
  /* Stitch line signature                                                */
  /* ------------------------------------------------------------------ */
  const stitchWrap = document.getElementById("stitch-line");
  const stitchSvg = stitchWrap.querySelector("svg");
  const stitchPath = document.getElementById("stitch-path");

  function buildStitchPath() {
    const docHeight = document.documentElement.scrollHeight;
    stitchWrap.style.height = docHeight + "px";
    stitchSvg.setAttribute("height", docHeight);
    stitchSvg.setAttribute("viewBox", `0 0 40 ${docHeight}`);

    let d = "M1 0 ";
    const knotEvery = 640;
    for (let y = knotEvery; y < docHeight; y += knotEvery) {
      d += `L1 ${y - 14} C 14 ${y - 10}, 14 ${y + 10}, 1 ${y + 14} `;
    }
    d += `L1 ${docHeight}`;
    stitchPath.setAttribute("d", d);

    if (prefersReduced) {
      stitchWrap.style.clipPath = "inset(0 0 0 0)";
    }
  }

  function updateStitchReveal() {
    if (prefersReduced) return;
    const doc = document.documentElement;
    const scrolled = doc.scrollTop || document.body.scrollTop;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, scrolled / max) : 1;
    stitchWrap.style.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateStitchReveal(); ticking = false; });
      ticking = true;
    }
  });
  window.addEventListener("resize", () => { buildStitchPath(); updateStitchReveal(); });
  window.addEventListener("load", () => { buildStitchPath(); updateStitchReveal(); });

  /* ------------------------------------------------------------------ */
  /* Init                                                                 */
  /* ------------------------------------------------------------------ */
  buildStitchPath();
  load();
});
