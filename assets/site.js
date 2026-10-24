(function () {
  var d = document, root = d.documentElement;
  var drawer = d.getElementById('mob-drawer'), overlay = d.getElementById('mob-overlay');
  var toggle = d.getElementById('mob-toggle'), closeBtn = d.getElementById('mob-close');
  function setMenu(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    root.style.overflow = open ? 'hidden' : '';
    if (open && closeBtn) closeBtn.focus(); else if (toggle && !open) toggle.focus({preventScroll: true});
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); d.querySelectorAll('.has-drop.is-open').forEach(function (n) { n.classList.remove('is-open'); }); }
  });
  d.querySelectorAll('.has-drop > a').forEach(function (a) {
    a.addEventListener('touchstart', function () {}, {passive: true});
  });
  d.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });
  window.addEventListener('resize', function () {
    d.querySelectorAll('.faq-item.open .faq-a').forEach(function (a) { a.style.maxHeight = a.scrollHeight + 'px'; });
    if (window.innerWidth > 768) setMenu(false);
  });
})();
