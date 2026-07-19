/* Calvary Road Baptist Church — shared behavior for every page.
   Vanilla JS, no dependencies. Loaded with `defer` on each page. */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  function openNav()  { var m = document.getElementById('mobileNav'); if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; } }
  function closeNav() { var m = document.getElementById('mobileNav'); if (m) { m.classList.remove('open'); document.body.style.overflow = ''; } }
  var toggle = document.querySelector('.nav-toggle');
  var close  = document.querySelector('.mn-close');
  if (toggle) toggle.addEventListener('click', openNav);
  if (close)  close.addEventListener('click', closeNav);
  // close the overlay when a link inside it is tapped
  document.querySelectorAll('#mobileNav a').forEach(function (a) { a.addEventListener('click', closeNav); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ---- scroll to a section, landing flush under the sticky header ---- */
  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var header = document.querySelector('.site-header');
    var headerH = header ? header.offsetHeight : 78;
    var top = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }
  // same-page anchor links (href="#id")
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    a.addEventListener('click', function (e) {
      if (document.getElementById(id)) { e.preventDefault(); closeNav(); scrollToSection(id); }
    });
  });
  // arriving from another page with a hash (index.html#visit)
  if (location.hash && location.hash.length > 1) {
    var target = location.hash.slice(1);
    window.addEventListener('load', function () { setTimeout(function () { scrollToSection(target); }, 60); });
  }

  /* ---- expandable Scripture pills ---- */
  window.toggleVerse = function (el) {
    var next = el.nextElementSibling;
    if (next && next.classList.contains('verse-expanded')) { next.remove(); el.classList.remove('verse-active'); return; }
    var card = el.closest('.doctrine') || el.closest('.gstep') || el.closest('.verse-scope');
    if (card) {
      card.querySelectorAll('.verse-expanded').forEach(function (v) { v.remove(); });
      card.querySelectorAll('.verse-active').forEach(function (v) { v.classList.remove('verse-active'); });
    }
    var text = el.getAttribute('data-verse'); if (!text) return;
    var div = document.createElement('div');
    div.className = 'verse-expanded';
    div.innerHTML = '<strong>' + el.textContent + '</strong><br>' + text;
    el.parentNode.insertBefore(div, el.nextSibling);
    el.classList.add('verse-active');
  };

  /* ---- beliefs accordion ---- */
  document.querySelectorAll('.doctrine > button').forEach(function (btn) {
    btn.addEventListener('click', function () { btn.parentElement.classList.toggle('open'); });
  });

  /* ---- fade-up on scroll ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(function (el) { io.observe(el); });

  /* ---- current year in footer ---- */
  document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
