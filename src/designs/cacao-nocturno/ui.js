try {
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll('.rv').forEach(function (n) {
    io.observe(n);
  });
  var f = document.querySelector('.fab');
  new IntersectionObserver(function (e) {
    f.classList.toggle('on', !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
  }).observe(document.querySelector('.ht .btn'));
  var h = document.querySelector('.hero');
  h.addEventListener('pointermove', function (e) {
    var r = h.getBoundingClientRect();
    h.style.setProperty('--mx', e.clientX - r.left + 'px');
    h.style.setProperty('--my', e.clientY - r.top + 'px');
  });
} catch (x) {
  document.querySelectorAll('.rv').forEach(function (n) {
    n.classList.add('in');
  });
  document.querySelector('.fab').classList.add('on');
}
