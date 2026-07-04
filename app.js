document.addEventListener("DOMContentLoaded", () => {

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* Intro curtain                                                        */
  /* ------------------------------------------------------------------ */
  if (prefersReduced) {
    document.body.classList.add("intro-done");
  } else {
    window.addEventListener("load", () => {
      setTimeout(() => document.body.classList.add("intro-done"), 450);
    });
    // safety net in case load already fired
    setTimeout(() => document.body.classList.add("intro-done"), 2200);
  }

  /* ------------------------------------------------------------------ */
  /* i18n                                                                 */
  /* ------------------------------------------------------------------ */
  let lang = localStorage.getItem("lang") || "ru";
  let products = [];
  let activeFilter = "all";

  const dict = {
    ru: {
      "hero.heading": "Текстиль премиального уровня в Масисе",
      "hero.eyebrow": "Мир текстиля в Масисе",
      "hero.text": "Минимализм, тактильность и качество в каждой детали вашего дома.",
      "hero.cta": "Смотреть каталог",
      "hero.cta2": "Связаться",
      "hero.scroll": "Прокрутите",
      "catalog.eyebrow": "Каталог",
      "catalog.title": "Изделия",
      "catalog.text": "Компания Ventum Textile представляет высококачественную текстильную продукцию армянского производства: постельное белье, подушки, одеяла, детская одежда. Выбирайте комфорт, качество и надежное производство.",
      "catalog.view": "Смотреть",
      "filter.all": "Все",
      "map.eyebrow": "Вентум Текстиль",
      "map.title": "Мы на карте",
      "map.addr": "г. Масис, ул. Анрапетутян 5/4",
      "map.hours": "Пн–Вс, 10:00–22:00",
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
      "hero.eyebrow": "Textile world in Masis",
      "hero.text": "Minimalism, texture and quality in every detail of your home.",
      "hero.cta": "View the catalog",
      "hero.cta2": "Get in touch",
      "hero.scroll": "Scroll",
      "catalog.eyebrow": "Catalog",
      "catalog.title": "Pieces",
      "catalog.text": "Ventum Textile presents high-quality textile products of Armenian production: bedding, pillows, blankets, children's clothing. Choose comfort, quality and reliable production.",
      "catalog.view": "View",
      "filter.all": "All",
      "map.eyebrow": "Ventum Textile",
      "map.title": "Find us",
      "map.addr": "Masis, Hanrapetutyan 5/4",
      "map.hours": "Mon–Sat, 10:00–22:00",
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
      "hero.eyebrow": "Տեքստիլների աշխարհ Մասիսում",
      "hero.text": "Մինիմալիզմ, հպման որակ և փայլուն ման­րամասներ ձեր տան համար։",
      "hero.cta": "Դիտել կատալոգը",
      "hero.cta2": "Կապ հաստատել",
      "hero.scroll": "Թերթիր ներքև",
      "catalog.eyebrow": "Կատալոգ",
      "catalog.title": "Իրեր",
      "catalog.text": "Ventum Textile-ը ներկայացնում է հայկական արտադրության բարձրորակ տեքստիլ ապրանքներ՝ անկողնային պարագաներ, բարձեր, ծածկոցներ, մանկական հագուստ ։ Ընտրեք հարմարավետություն, որակ և վստահելի արտադրություն։",
      "catalog.view": "Դիտել",
      "filter.all": "Բոլորը",
      "map.eyebrow": "Վենտւմ տեքստիլ",
      "map.title": "Մեր հասցեն քարտեզի վրա",
      "map.addr": "ք. Մասիս, Հանրապետություն փ․, 5/4",
      "map.hours": "Երկ–Կիր, 10:00–22:00",
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
  /* Kinetic type — wraps text into per-word spans for hover reaction     */
  /* ------------------------------------------------------------------ */
  function wrapWords(el) {
    const words = el.textContent.split(" ");
    el.innerHTML = words.map(w => `<span class="k-word">${w}</span>`).join(" ");
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

    document.querySelectorAll(".kinetic-type").forEach(wrapWords);

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
    await applyLang();    
    initObservers();
    // Добавляем первоначальную отрисовку:
    activeFilter = "all"; // Убедитесь, что начальный фильтр задан
    buildFilters();
    render();
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
    console.log("Массив продуктов при рендере:", products);   
    if (!products || !products.length) return;
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();

    const list = products.filter(p => {
      if (activeFilter === "all") return true;
      return (p.category[lang] || p.category.ru) === activeFilter;
    });

    console.log("2. Текущий activeFilter:", activeFilter);
  console.log("3. Сколько продуктов прошло фильтр:", list.length);

  

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

      if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
        const media = card.querySelector(".card-media");
        const img = media.querySelector("img");
        media.addEventListener("mousemove", e => {
          const r = media.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          media.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
          img.style.transform = `scale(1.09) translate(${(-px * 10).toFixed(1)}px, ${(-py * 10).toFixed(1)}px)`;
        });
        media.addEventListener("mouseleave", () => {
          media.style.transform = "";
          img.style.transform = "";
        });
      }
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
    wa.href = `https://wa.me/37477461061?text=${encodeURIComponent(t("modal.interest") + ": " + p.title[lang])}`;
    call.href = "tel:+37477461061";

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
  /* Cursor hint — follows pointer over catalog cards                     */
  /* ------------------------------------------------------------------ */
  const cursorHint = document.querySelector(".cursor-hint");
  const canHover = window.matchMedia("(hover: hover)").matches;

  if (canHover && cursorHint) {
    let hintX = 0, hintY = 0, curX = 0, curY = 0;
    let hintRAF = null;

    function animateHint() {
      curX += (hintX - curX) * 0.18;
      curY += (hintY - curY) * 0.18;
      cursorHint.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%) scale(${cursorHint.classList.contains("active") ? 1 : .8})`;
      hintRAF = requestAnimationFrame(animateHint);
    }
    animateHint();

    document.addEventListener("mousemove", e => {
      hintX = e.clientX;
      hintY = e.clientY;
    });

    grid.addEventListener("mouseover", e => {
      if (e.target.closest(".card")) cursorHint.classList.add("active");
    });
    grid.addEventListener("mouseout", e => {
      if (e.target.closest(".card") && !e.relatedTarget?.closest(".card")) {
        cursorHint.classList.remove("active");
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Chapter nav — tracks which section is active                        */
  /* ------------------------------------------------------------------ */
  const chapterNav = document.querySelector(".chapter-nav");
  if (chapterNav) {
    const chapterMap = [
      { target: document.querySelector(".hero"), dark: true },
      { target: document.getElementById("catalog"), dark: false },
      { target: document.querySelector(".map-section"), dark: false },
      { target: document.getElementById("contacts"), dark: true }
    ];
    const chapterLinks = Array.from(chapterNav.querySelectorAll("a"));

    const updateChapterNav = () => {
      const viewportCenter = window.innerHeight * 0.45;

      let activeIndex = 0;
      chapterMap.forEach((section, index) => {
        if (!section.target) return;

        const rect = section.target.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;

        if (sectionMiddle <= viewportCenter) {
          activeIndex = index;
        }
      });

      chapterLinks.forEach(l => l.classList.remove("on"));

      const linkIndex = activeIndex >= 2 ? activeIndex - 1 : activeIndex;
      chapterLinks[linkIndex]?.classList.add("on");

      chapterNav.classList.toggle("on-dark", chapterMap[activeIndex].dark);
    };

    updateChapterNav();
    window.addEventListener("scroll", updateChapterNav, { passive: true });
    window.addEventListener("resize", updateChapterNav);
  }

  /* ------------------------------------------------------------------ */
  /* Magnetic buttons                                                     */
  /* ------------------------------------------------------------------ */
  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        btn.style.transform = `translate(${(x * 14).toFixed(1)}px, ${(y * 14).toFixed(1)}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Hero ghost type — subtle scroll parallax                             */
  /* ------------------------------------------------------------------ */
  const heroGhost = document.querySelector(".hero-ghost");

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

    observeAll(document.querySelectorAll(".reveal, .reveal-stagger"));
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
    if (heroGhost && !prefersReduced) {
      heroGhost.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
    }
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
