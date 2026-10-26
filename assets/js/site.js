(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    if (!header || !toggle) return;
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      header.classList.toggle("nav-open", !open);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) closeNav();
    });

    if (nav) {
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") closeNav();
      });
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -60px 0px", threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  var form = document.getElementById("quote-form");
  if (!form) return;

  var PHONE_E164 = "12368677727";
  var note = document.getElementById("form-note");

  function buildMessage() {
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var address = form.address.value.trim();
    var service = form.service.value;
    var size = form.size.value.trim();
    var notes = form.notes.value.trim();

    var lines = [
      "Quote request - Surrey Strata & Commercial Care",
      "Name: " + name,
      "Phone: " + phone,
      "Property: " + address,
      "Service: " + service
    ];
    if (size) lines.push("Size: " + size);
    if (notes) lines.push("Notes: " + notes);
    return lines.join("\n");
  }

  function validate() {
    var valid = form.checkValidity();
    if (!valid) {
      var first = form.querySelector(":invalid");
      if (first) first.focus();
      if (note) note.textContent = "Please fill in the required fields: name, phone, property, and type of clean.";
    }
    return valid;
  }

  function copyFallback(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (note) note.textContent = "Details copied. If your text app did not open, paste them into a message to (236) 867-7727.";
      }, function () {});
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var text = buildMessage();
    copyFallback(text);
    if (note) note.textContent = "Opening your text app…";
    window.location.href = "sms:+" + PHONE_E164 + "?&body=" + encodeURIComponent(text);
  });

  var waBtn = document.getElementById("send-whatsapp");
  if (waBtn) {
    waBtn.addEventListener("click", function () {
      if (!validate()) return;
      var text = buildMessage();
      if (note) note.textContent = "Opening WhatsApp…";
      window.open("https://wa.me/" + PHONE_E164 + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }
})();
