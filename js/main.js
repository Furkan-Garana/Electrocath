document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // NAVIGATION
  // =====================================================

  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".mobile-panel");

  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");

      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const handleScroll = () => {
    if (!nav) return;

    nav.classList.toggle("scrolled", window.scrollY > 18);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  // =====================================================
  // SCROLL REVEAL ANIMATIONS
  // =====================================================

  const revealables = document.querySelectorAll(
    "[data-reveal], [data-reveal-group]"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px",
      }
    );

    revealables.forEach((element) => observer.observe(element));
  } else {
    revealables.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // =====================================================
  // FAQ ACCORDION
  // =====================================================

  document.querySelectorAll(".faq-q").forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      document
        .querySelectorAll('.faq-q[aria-expanded="true"]')
        .forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.setAttribute("aria-expanded", "false");
          }
        });

      button.setAttribute("aria-expanded", String(!isExpanded));
    });
  });

  // =====================================================
  // QUOTE FORM → WHATSAPP
  // =====================================================

  const whatsappNumber = "919825377837";

  document.querySelectorAll(".quote-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const getValue = (fieldName, fallback = "Not provided") => {
        const value = String(formData.get(fieldName) || "").trim();
        return value || fallback;
      };

      const name = getValue("name");
      const phone = getValue("phone");
      const email = getValue("email");
      const location = getValue("location");
      const customerType = getValue("customerType");
      const service = getValue("service");
      const message = getValue("message");

      const whatsappText = [
        "*New Website Enquiry*",
        "",
        `*Name:* ${name}`,
        `*Phone:* ${phone}`,
        `*Email:* ${email}`,
        `*Location:* ${location}`,
        `*Customer Type:* ${customerType}`,
        `*Service:* ${service}`,
        `*Message:* ${message}`,
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(whatsappText);

      // Open WhatsApp / WhatsApp Web with the enquiry already filled in.
      window.open(whatsappURL, "_blank", "noopener,noreferrer");

      const successMessage = form.querySelector(".form-success");

      if (successMessage) {
        successMessage.textContent =
          "Your enquiry has been prepared in WhatsApp. Review the message and press Send to complete your enquiry.";
        successMessage.style.display = "block";
      }

      form.reset();
    });
  });

  // =====================================================
  // CURRENT YEAR
  // =====================================================

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =====================================================
  // ROOFTOP SOLAR SUBSIDY CALCULATOR
  // =====================================================

  const subsidySlider = document.getElementById("subsidyKw");
  const subsidyOutput = document.getElementById("subsidyAmount");
  const subsidyLabel = document.getElementById("subsidyKwLabel");

  const updateSubsidy = () => {
    if (!subsidySlider || !subsidyOutput) return;

    const kw = Number(subsidySlider.value);
    let amount = 0;

    if (kw <= 2) {
      amount = kw * 30000;
    } else if (kw <= 3) {
      amount = 60000 + (kw - 2) * 18000;
    } else {
      amount = 78000;
    }

    if (subsidyLabel) {
      subsidyLabel.textContent = `${kw} kW`;
    }

    subsidyOutput.textContent = `₹${amount.toLocaleString("en-IN")}`;
  };

  if (subsidySlider) {
    subsidySlider.addEventListener("input", updateSubsidy);
    updateSubsidy();
  }
});
