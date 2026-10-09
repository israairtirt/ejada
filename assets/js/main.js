/* ==========================================================================
   EJADA — site behaviour
   Shared header/footer, navigation, language toggle, motion and the contact form.
   GSAP, ScrollTrigger and Lenis are optional: everything degrades gracefully.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document.documentElement;
  var body = document.body;
  var page = body.getAttribute("data-page");
  var t = window.I18N ? window.I18N.t : function (k, f) { return f; };
  var isRTL = doc.dir === "rtl";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);

  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var SOCIALS =
    '<a class="social" href="https://www.facebook.com/Ejadaskills" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5"/></svg></a>' +
    '<a class="social" href="https://www.linkedin.com/company/ejadaskills" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.5h-3V20h3zM5 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M20.5 13.4c0-3-1.6-5.1-4.3-5.1-1.6 0-2.6.9-3 1.6V8.5h-3V20h3v-6.1c0-1.5.8-2.6 2.2-2.6 1.3 0 2 .9 2 2.6V20h3.1z"/></svg></a>' +
    '<a class="social" href="https://www.instagram.com/Ejadaskills" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>';

  var NAV = [
    { id: "home", href: "index.html", key: "nav.home", label: "Home" },
    { id: "about", href: "about.html", key: "nav.about", label: "About" },
    { id: "services", href: "services.html", key: "nav.services", label: "Services" },
    { id: "training", href: "training.html", key: "nav.training", label: "Training" },
    { id: "clients", href: "clients.html", key: "nav.clients", label: "Clients" },
    { id: "contact", href: "contact.html", key: "nav.contact", label: "Contact" }
  ];

  /* ------------------------------------------------------------------------
     Header & footer
     ------------------------------------------------------------------------ */
  function navLinks(cls) {
    return NAV.map(function (n) {
      var current = n.id === page ? ' aria-current="page"' : "";
      return '<li><a class="' + cls + '" href="' + n.href + '" data-i18n="' + n.key + '"' + current + ">" + n.label + "</a></li>";
    }).join("");
  }

  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var other = isRTL ? { code: "en", label: "English" } : { code: "ar", label: "العربية" };
    mount.outerHTML =
      '<header class="site-header" id="top">' +
        '<div class="scroll-progress" aria-hidden="true"><span></span></div>' +
        '<div class="container site-header__inner">' +
          '<a class="brand" href="index.html" aria-label="EJADA"><img src="assets/img/logo.svg" alt="EJADA — Consult. Empower. Recruit." width="129" height="48"></a>' +
          '<nav class="nav" id="site-nav" aria-label="Main">' +
            '<ul class="nav__list">' + navLinks("nav__link") + "</ul>" +
            '<a class="btn nav__cta" href="contact.html" data-i18n="header.cta">Get in touch</a>' +
          "</nav>" +
          '<div class="header-actions">' +
            '<button class="lang-toggle" type="button" data-lang="' + other.code + '">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>' +
              '<span class="lang-toggle__label" lang="' + other.code + '">' + other.label + "</span>" +
            "</button>" +
            '<a class="btn header-cta magnetic" href="contact.html"><span data-i18n="header.cta">Get in touch</span></a>' +
            '<button class="menu-btn" type="button" aria-controls="site-nav" aria-expanded="false">' +
              '<span class="visually-hidden" data-i18n="header.menu">Menu</span><span class="menu-btn__bars" aria-hidden="true"></span>' +
            "</button>" +
          "</div>" +
        "</div>" +
      "</header>";
  }

  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.outerHTML =
      '<footer class="site-footer on-dark">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<img src="assets/img/logo-full-white.svg" alt="EJADA — Consult. Empower. Recruit." width="229" height="92">' +
              '<p data-i18n="footer.tagline">Supporting your professional change and growth. Consulting, training and recruitment for people and institutions in Libya and the region.</p>' +
            "</div>" +
            "<div>" +
              '<p class="footer-title" data-i18n="footer.explore">Explore</p>' +
              '<ul class="footer-links">' + navLinks("") + "</ul>" +
            "</div>" +
            "<div>" +
              '<p class="footer-title" data-i18n="footer.contact">Contact</p>' +
              '<ul class="footer-links">' +
                '<li><a class="ltr" href="mailto:info@ejada.org">info@ejada.org</a></li>' +
                '<li><a class="ltr" href="tel:+218945865648">+218 94 586 5648</a></li>' +
                '<li data-i18n="footer.offices">Tripoli, Libya  /  Cairo, Egypt</li>' +
              "</ul>" +
              '<div class="socials">' + SOCIALS + "</div>" +
            "</div>" +
          "</div>" +
          '<div class="chevron-bar" aria-hidden="true"><span class="chevron-bar__line"></span><span class="chevron-bar__mark"></span><span class="chevron-bar__line"></span></div>' +
          '<div class="footer-bottom">' +
            '<span>© ' + new Date().getFullYear() + ' EJADA. <span data-i18n="footer.rights">All rights reserved.</span></span>' +
            '<a href="#top" data-scroll-top data-i18n="footer.top">Back to top</a>' +
          "</div>" +
        "</div>" +
        '<div class="footer-mega" aria-hidden="true">EJADA</div>' +
      "</footer>";
  }

  renderHeader();
  renderFooter();
  if (window.I18N) {
    window.I18N.apply(document.querySelector(".site-header"));
    window.I18N.apply(document.querySelector(".site-footer"));
  }

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("site-nav");
  var menuBtn = document.querySelector(".menu-btn");
  var progressBar = document.querySelector(".scroll-progress span");

  /* ------------------------------------------------------------------------
     Smooth scroll (Lenis)
     ------------------------------------------------------------------------ */
  var lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ duration: 1.1, easing: function (x) { return Math.min(1, 1.001 - Math.pow(2, -10 * x)); } });
    doc.classList.add("lenis");
    if (hasGSAP) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (time) { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollToTarget(target) {
    var offset = -(header ? header.offsetHeight : 0) - (document.querySelector(".svc-nav") ? 64 : 16);
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : offset });
    else if (target === 0) window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: reduceMotion ? "auto" : "smooth" });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (a.hasAttribute("data-scroll-top") || id === "#top") {
      e.preventDefault();
      scrollToTarget(0);
      return;
    }
    var target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
    history.replaceState(null, "", id);
  });

  // Respect deep links like services.html#training once layout has settled
  if (location.hash && document.querySelector(location.hash)) {
    window.addEventListener("load", function () {
      setTimeout(function () { scrollToTarget(document.querySelector(location.hash)); }, 80);
    });
  }

  /* ------------------------------------------------------------------------
     Header state + scroll progress
     ------------------------------------------------------------------------ */
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------------ */
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  menuBtn.addEventListener("click", function () {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });

  /* ------------------------------------------------------------------------
     Language toggle
     ------------------------------------------------------------------------ */
  document.querySelector(".lang-toggle").addEventListener("click", function () {
    if (window.I18N) window.I18N.set(this.getAttribute("data-lang"));
  });

  /* ------------------------------------------------------------------------
     Page transitions (internal links only)
     ------------------------------------------------------------------------ */
  if (!reduceMotion) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!/^[\w-]+\.html(#.*)?$/.test(href)) return;
      if (href.split("#")[0] === location.pathname.split("/").pop() && href.indexOf("#") > -1) return;
      e.preventDefault();
      body.classList.add("is-leaving");
      setTimeout(function () { location.href = href; }, 420);
    });
    window.addEventListener("pageshow", function (e) { if (e.persisted) body.classList.remove("is-leaving"); });
  }

  /* ------------------------------------------------------------------------
     Client logo marquees
     ------------------------------------------------------------------------ */
  var LOGO_NAMES = {
    "netherlands-mfa": "Ministry of Foreign Affairs of the Netherlands", spark: "SPARK", imu: "IMU", octagon: "Octagon",
    tadawul: "Tadawul Financial Group", takween: "Takween", "fl-tractors": "FL Tractors — CAT", vanex: "VANEX",
    aura: "AURA Advertising", "takween-offpost": "Takween Offpost", zeina: "Zeina", "creative-space": "Creative Space",
    "super-novae": "Super Novae", "innovation-garden": "Innovation Garden", emblem: "Partner organisation",
    hotel: "Partner hotel", "s-architects": "S Architects", "golden-buzz": "Golden Buzz", "arabic-partner": "Partner company"
  };
  document.querySelectorAll("[data-marquee]").forEach(function (m) {
    var ids = m.getAttribute("data-marquee").split(",");
    var set = function (hidden) {
      return '<div class="marquee__set"' + (hidden ? ' aria-hidden="true"' : "") + ">" + ids.map(function (id) {
        return '<img src="assets/img/clients/' + id + '.png" alt="' + (hidden ? "" : LOGO_NAMES[id] || "") + '" loading="lazy">';
      }).join("") + "</div>";
    };
    m.innerHTML = '<div class="marquee__track">' + set(false) + set(true) + "</div>";
  });

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal, .svc__list li, .step");
  document.querySelectorAll(".svc__list").forEach(function (list) {
    list.querySelectorAll("li").forEach(function (li, i) { li.style.setProperty("--i", i); });
  });
  document.querySelectorAll("[data-steps] .step").forEach(function (s, i) { s.style.setProperty("--i", i); });

  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add("is-visible");
        io.unobserve(el);
        // Once revealed, drop the stagger so hover transitions respond instantly
        setTimeout(function () {
          el.classList.remove("reveal");
          el.style.transitionDelay = "0s";
        }, 1500);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------------
     Counters
     ------------------------------------------------------------------------ */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var end = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion) { el.textContent = end; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) { c.textContent = c.getAttribute("data-count"); });
  }

  /* ------------------------------------------------------------------------
     Scroll-driven effects (GSAP)
     ------------------------------------------------------------------------ */
  if (hasGSAP && !reduceMotion) {
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    // Statement text: words light up as you scroll
    document.querySelectorAll("[data-split]").forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.setAttribute("aria-label", el.textContent.trim());
      el.innerHTML = words.map(function (w) { return '<span class="w" aria-hidden="true">' + w + "</span>"; }).join(" ");
      gsap.fromTo(el.querySelectorAll(".w"), { opacity: 0.14 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true }
      });
    });

    // Approach: progress line draws as the section scrolls
    document.querySelectorAll("[data-steps]").forEach(function (list) {
      var line = document.createElement("span");
      line.className = "steps__progress";
      line.setAttribute("aria-hidden", "true");
      list.appendChild(line);
      gsap.fromTo(line, { "--p": 0 }, {
        "--p": 1,
        ease: "none",
        scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 55%", scrub: 0.6 }
      });
    });

    // Gentle parallax on decorative orbs
    gsap.utils.toArray(".page-hero .orb, .cta .orb, .orb--corner").forEach(function (orb, i) {
      gsap.to(orb, {
        yPercent: i % 2 ? -18 : 14,
        ease: "none",
        scrollTrigger: { trigger: orb.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // Hero content drifts and fades as you leave it
    var heroContent = document.querySelector(".hero__content");
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -12, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }

    // Big footer wordmark slides in
    var mega = document.querySelector(".footer-mega");
    if (mega) {
      gsap.fromTo(mega, { yPercent: 40, opacity: 0 }, {
        yPercent: 0, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".site-footer", start: "top bottom", end: "bottom bottom", scrub: true }
      });
    }

    window.addEventListener("load", function () { window.ScrollTrigger.refresh(); });
  }

  /* ------------------------------------------------------------------------
     Pointer effects: spotlight, magnetic buttons, hero parallax
     ------------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".spotlight").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });

    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });

    var hero = document.querySelector(".hero");
    var layers = document.querySelectorAll("[data-parallax]");
    if (hero && layers.length) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5;
        var dy = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach(function (l) {
          var k = parseFloat(l.getAttribute("data-parallax")) * 30;
          l.style.translate = dx * k + "px " + dy * k + "px";
        });
      });
      hero.addEventListener("pointerleave", function () {
        layers.forEach(function (l) { l.style.translate = ""; });
      });
    }
  }

  /* ------------------------------------------------------------------------
     Services sub-navigation: highlight the section in view
     ------------------------------------------------------------------------ */
  var svcLinks = document.querySelectorAll(".svc-nav__link");
  if (svcLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    svcLinks.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        svcLinks.forEach(function (l) { l.classList.remove("is-active"); });
        var link = byId[en.target.id];
        if (link) {
          link.classList.add("is-active");
          link.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".svc[id]").forEach(function (s) { sio.observe(s); });
  }

  /* ------------------------------------------------------------------------
     Contact form — front-end only: validate, then hand off to the mail app
     ------------------------------------------------------------------------ */
  var form = document.getElementById("contact-form");
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validate = function (field) {
      var input = field.querySelector("input, select, textarea");
      if (!input || !input.required) return true;
      var v = input.value.trim();
      var ok = input.type === "email" ? emailRe.test(v) : v.length > 0;
      field.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      return ok;
    };
    form.querySelectorAll(".field").forEach(function (f) {
      var input = f.querySelector("input, select, textarea");
      var err = f.querySelector(".field__error");
      if (input && err) {
        err.id = input.id + "-err";
        input.setAttribute("aria-describedby", err.id);
      }
      if (input) input.addEventListener("blur", function () { if (f.classList.contains("has-error") || input.value) validate(f); });
      if (input) input.addEventListener("input", function () { if (f.classList.contains("has-error")) validate(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));
      var firstBad = null;
      fields.forEach(function (f) { if (!validate(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.querySelector("input, select, textarea").focus(); return; }

      var d = new FormData(form);
      var service = form.querySelector("#f-service");
      var subject = "Website enquiry — " + service.options[service.selectedIndex].text;
      var lines = [
        d.get("message"),
        "",
        "—",
        d.get("name") + (d.get("organisation") ? " · " + d.get("organisation") : ""),
        d.get("email") + (d.get("phone") ? " · " + d.get("phone") : "")
      ];
      window.location.href = "mailto:info@ejada.org?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
      document.getElementById("contact-card").classList.add("is-sent");
    });
  }
})();
