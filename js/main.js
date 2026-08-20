/* ============================================================
   ELECTROCATH SOLUTIONS — SITE SCRIPT
   Vanilla JS only. No external libraries.
   ============================================================ */
(function(){
  "use strict";

  /* ---------- Sticky nav appearance on scroll ---------- */
  var nav = document.querySelector(".site-nav");
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 24){ nav.classList.add("scrolled"); }
    else{ nav.classList.remove("scrolled"); }
  }
  document.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.querySelector(".mobile-panel");
  if(toggle && panel){
    toggle.addEventListener("click", function(){
      var open = toggle.classList.toggle("open");
      panel.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    panel.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        toggle.classList.remove("open");
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded","false");
      });
    });
  }

  /* ---------- Active nav link (by current page filename) ---------- */
  var current = (window.location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a, .mobile-panel a").forEach(function(a){
    var href = a.getAttribute("href");
    if(!href) return;
    if(href === current || (current === "" && href === "index.html")){
      a.classList.add("active");
    }
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function(item){
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if(!q || !a) return;
    q.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      // close siblings within the same faq-list for a clean single-open feel
      var list = item.closest(".faq-list");
      if(list){
        list.querySelectorAll(".faq-item.open").forEach(function(sib){
          if(sib !== item){
            sib.classList.remove("open");
            sib.querySelector(".faq-a").style.maxHeight = null;
            sib.querySelector(".faq-q").setAttribute("aria-expanded","false");
          }
        });
      }
      item.classList.toggle("open", !isOpen);
      q.setAttribute("aria-expanded", !isOpen ? "true" : "false");
      a.style.maxHeight = !isOpen ? (a.scrollHeight + "px") : null;
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealTargets = document.querySelectorAll("[data-reveal], [data-reveal-group], .timeline, .flow-diagram");
  if("IntersectionObserver" in window && revealTargets.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.18, rootMargin:"0px 0px -40px 0px"});
    revealTargets.forEach(function(t){ io.observe(t); });
  }else{
    revealTargets.forEach(function(t){ t.classList.add("in"); });
  }

  /* ---------- Quote / enquiry form (frontend-only demo) ---------- */
  var form = document.getElementById("quoteForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var success = document.getElementById("formSuccess");
      if(success){
        success.classList.add("show");
        success.setAttribute("role","status");
        success.textContent = "Thanks — your enquiry details are ready. Since this site isn't wired to a server yet, please also send this via WhatsApp or Call so our team receives it directly.";
      }
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

})();
