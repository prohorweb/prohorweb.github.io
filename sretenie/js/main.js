/* Храм Сретения Господня — главная. Мобильное меню и переключатель крупного шрифта (A+). Без библиотек. */
(function () {
  var root = document.documentElement;

  /* A+ — крупный шрифт; выбор сохраняется в браузере */
  var KEY = 'sretenie-big-font';
  var a11y = document.querySelectorAll('.a11y');
  function setBig(on) {
    root.classList.toggle('big', on);
    a11y.forEach(function (b) {
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.textContent = on ? 'A−' : 'A+';
      b.title = on ? 'Обычный размер шрифта' : 'Крупный шрифт';
    });
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {}
  }
  try { if (localStorage.getItem(KEY) === '1') setBig(true); } catch (e) {}
  a11y.forEach(function (b) { b.addEventListener('click', function () { setBig(!root.classList.contains('big')); }); });

  /* Полноэкранное меню */
  var menu = document.getElementById('menu');
  var burger = document.querySelector('.burger');
  if (!menu || !burger) return;
  var closeBtn = menu.querySelector('.x');
  function open() {
    menu.classList.add('open'); menu.removeAttribute('inert'); menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true'); document.body.classList.add('lock');
    closeBtn.focus();
  }
  function close(returnFocus) {
    menu.classList.remove('open'); menu.setAttribute('inert', ''); menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock');
    if (returnFocus) burger.focus();
  }
  burger.addEventListener('click', open);
  closeBtn.addEventListener('click', function () { close(true); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { close(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) close(true); });
  window.matchMedia('(min-width: 1241px)').addEventListener('change', function (m) { if (m.matches) close(false); });
})();
