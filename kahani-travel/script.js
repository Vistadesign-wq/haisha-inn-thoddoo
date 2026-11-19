/* KAHANI TRAVEL & TOURS: site behaviour */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wa = (text) => `https://wa.me/${KAHANI.whatsapp}?text=${encodeURIComponent(text)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- WhatsApp links ---------- */
  function bindWa(root = document) {
    $$("[data-wa]", root).forEach((a) => {
      a.href = wa(a.dataset.wa);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------- Social links ---------- */
  $$("[data-social]").forEach((box) => {
    box.innerHTML = KAHANI.social
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" title="${s.name}"><svg class="ic"><use href="#${s.icon}"/></svg></a>`)
      .join("");
  });
  $("#platforms").innerHTML = KAHANI.social
    .map((s) => `<a class="platform" href="${s.url}" target="_blank" rel="noopener">
        <span class="p-ic"><svg class="ic"><use href="#${s.icon}"/></svg></span>
        <span><b>${s.name}</b><small>${esc(s.handle)}</small></span>
        <svg class="ic arrow"><use href="#i-arrow"/></svg></a>`)
    .join("");

  /* ---------- Hero slideshow ---------- */
  const slidesBox = $("#heroSlides"), dotsBox = $("#heroDots");
  HERO_SLIDES.forEach((s, i) => {
    const d = document.createElement("div");
    d.className = "slide" + (i === 0 ? " on" : "");
    d.style.backgroundImage = `url('${img(s.src, 1920)}')`;
    d.innerHTML = `<span class="slide-place"><svg class="ic"><use href="#i-pin"/></svg>${esc(s.place)}</span>`;
    slidesBox.appendChild(d);
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Show " + s.place);
    if (i === 0) b.className = "on";
    b.onclick = () => go(i, true);
    dotsBox.appendChild(b);
  });
  let cur = 0, timer;
  function go(i, manual) {
    const slides = slidesBox.children, dots = dotsBox.children;
    slides[cur].classList.remove("on"); dots[cur].classList.remove("on");
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add("on"); dots[cur].classList.add("on");
    if (manual) restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(cur + 1), 6000); }
  restart();

  /* ---------- Services ---------- */
  $("#svcGrid").innerHTML = SERVICES.map((s, i) => `
    <article class="svc reveal" style="--d:${i * 60}ms">
      <span class="svc-ic"><svg class="ic"><use href="#${s.icon}"/></svg></span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
      ${s.link
        ? `<a href="${s.link}" class="more">Learn more <svg class="ic"><use href="#i-arrow"/></svg></a>`
        : `<a href="#" class="more" data-wa="Hello Kahani Travel, I need help with ${esc(s.title)}.">Enquire <svg class="ic"><use href="#i-arrow"/></svg></a>`}
    </article>`).join("") + `
    <article class="svc svc-poster reveal">
      <img src="assets/services-poster.jpg" alt="Kahani Travel & Tours services poster" loading="lazy">
    </article>`;

  /* ---------- Packages ---------- */
  const grid = $("#pkgGrid");
  function renderPackages(cat) {
    grid.innerHTML = PACKAGES.filter((p) => p.category === cat).map((p, i) => `
      <article class="pkg" style="--d:${i * 70}ms" tabindex="0" data-id="${p.id}">
        <div class="pkg-img" style="background-image:url('${img(p.image, 800)}')">
          <span class="pkg-dur"><svg class="ic"><use href="#i-cal"/></svg>${esc(p.duration)}</span>
        </div>
        <div class="pkg-body">
          <h3><span class="flag">${p.flag}</span>${esc(p.name)}</h3>
          <p class="pkg-tag">${esc(p.tagline)}</p>
          <p class="pkg-route"><svg class="ic"><use href="#i-pin"/></svg>${esc(p.route)}</p>
          <ul>${p.highlights.slice(0, 3).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          <div class="pkg-foot">
            <span class="ask">Price on request</span>
            <span class="view">View itinerary <svg class="ic"><use href="#i-arrow"/></svg></span>
          </div>
        </div>
      </article>`).join("");
    requestAnimationFrame(() => $$(".pkg", grid).forEach((el) => el.classList.add("in")));
  }
  function setTab(cat) {
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === cat));
    renderPackages(cat);
  }
  $$(".tab").forEach((t) => t.addEventListener("click", () => setTab(t.dataset.tab)));
  $$("[data-tab-link]").forEach((a) => a.addEventListener("click", () => setTab(a.dataset.tabLink)));
  grid.addEventListener("click", (e) => { const c = e.target.closest(".pkg"); if (c) openPkg(c.dataset.id); });
  grid.addEventListener("keydown", (e) => { if (e.key === "Enter") { const c = e.target.closest(".pkg"); if (c) openPkg(c.dataset.id); } });
  setTab("international");

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  let lastFocus;
  function openPkg(id) {
    const p = PACKAGES.find((x) => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    $("#mHero").style.backgroundImage = `linear-gradient(180deg,rgba(15,22,45,.05),rgba(15,22,45,.85)),url('${img(p.image, 1400)}')`;
    $("#mBadge").textContent = `${p.flag}  ${p.duration}`;
    $("#mTitle").textContent = p.name;
    $("#mRoute").textContent = p.route;
    $("#mItin").innerHTML = p.itinerary.map((d, i) => `<li><span class="day">Day ${i + 1}</span><div><b>${esc(d[0])}</b><p>${esc(d[1])}</p></div></li>`).join("");
    $("#mHigh").innerHTML = p.highlights.map((h) => `<li>${esc(h)}</li>`).join("");
    $("#mInc").innerHTML = p.includes.map((h) => `<li>${esc(h)}</li>`).join("");
    const m = $("#mWa");
    m.href = wa(`Hello Kahani Travel, I'm interested in the ${p.name} package (${p.duration}). Please share the details and price.`);
    m.target = "_blank"; m.rel = "noopener";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
    $(".modal-x", modal).focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
    if (lastFocus) lastFocus.focus();
  }
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  /* ---------- Dropdowns & footer lists ---------- */
  const destOpts = (list) => list.map((n) => `<option>${esc(n)}</option>`).join("");
  const groups = { international: "International", india: "India", kerala: "Kerala" };
  $("#quickDest").innerHTML = `<option value="" disabled selected>Where to?</option>` +
    Object.entries(groups).map(([k, label]) => `<optgroup label="${label}">${destOpts(PACKAGES.filter((p) => p.category === k).map((p) => p.name))}</optgroup>`).join("") +
    `<optgroup label="More">${destOpts(EXTRA_DESTINATIONS)}</optgroup>`;
  $("#serviceSelect").innerHTML = destOpts(["Holiday package", ...SERVICES.map((s) => s.title), "Something else"]);
  const fLink = (p) => `<a href="#packages" data-tab-link="${p.category}" data-open="${p.id}">${esc(p.name)}</a>`;
  $("#fIntl").innerHTML = PACKAGES.filter((p) => p.category === "international").map(fLink).join("");
  $("#fIndia").innerHTML = PACKAGES.filter((p) => p.category !== "international").map(fLink).join("");
  $$("footer [data-tab-link]").forEach((a) => a.addEventListener("click", () => { setTab(a.dataset.tabLink); setTimeout(() => openPkg(a.dataset.open), 500); }));

  /* ---------- Forms ---------- */
  $("#quickForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    let month = "";
    if (f.get("month")) {
      const [y, m] = f.get("month").split("-");
      month = new Date(y, m - 1).toLocaleString("en-IN", { month: "long", year: "numeric" });
    }
    const msg = `Hello Kahani Travel, I'd like a quote.\nDestination: ${f.get("dest")}\nTravel month: ${month || "Flexible"}\nTravellers: ${f.get("pax")}`;
    window.open(wa(msg), "_blank", "noopener");
  });
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const via = e.submitter ? e.submitter.value : "wa";
    const body = `Name: ${f.get("name")}\nPhone: ${f.get("phone")}\nInterested in: ${f.get("service")}\n\n${f.get("msg") || ""}`;
    if (via === "mail") {
      location.href = `mailto:${KAHANI.email}?subject=${encodeURIComponent("Enquiry: " + f.get("service"))}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(wa("Hello Kahani Travel!\n" + body), "_blank", "noopener");
    }
  });

  /* ---------- Header, menu, scroll ---------- */
  const header = $("#header"), burger = $("#burger"), nav = $("#nav"), totop = $("#totop");
  const onScroll = () => {
    header.classList.toggle("scrolled", scrollY > 40);
    totop.classList.toggle("show", scrollY > 700);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));

  // active nav link
  const sections = ["home", "about", "services", "packages", "contact"].map((id) => document.getElementById(id));
  const spy = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) $$(".nav a").forEach((a) => a.classList.toggle("current", a.getAttribute("href") === "#" + en.target.id && !a.dataset.tabLink));
  }), { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => s && spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  bindWa();
  $("#year").textContent = new Date().getFullYear();
})();
