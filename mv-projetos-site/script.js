/* =========================================================
   MV PROJETOS — script.js
   ========================================================= */
(function () {
  'use strict';

  /* ---------- ano no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- header com sombra ao rolar ---------- */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- menu mobile ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  const closeMenu = () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  };

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

  /* ---------- link ativo conforme a seção visível ---------- */
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...nav.querySelectorAll('.nav__link')];

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.classList.toggle('is-active', l.getAttribute('href') === '#' + entry.target.id)
        );
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- animação de entrada (reveal) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          entry.target.style.transitionDelay = Math.min(i * 80, 320) + 'ms';
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => revealObs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- contadores ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const countObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => countObs.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count + (c.dataset.suffix || '')));
  }

  /* ---------- carrossel de depoimentos ---------- */
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const dotsWrap = document.getElementById('dots');

  if (track && track.children.length) {
    const slides = [...track.children];
    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
    });

    const dots = [...dotsWrap.children];

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
      restart();
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 7000);
    }

    prevBtn.addEventListener('click', () => go(index - 1));
    nextBtn.addEventListener('click', () => go(index + 1));

    /* swipe no celular */
    let startX = 0;
    track.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
    track.addEventListener(
      'touchend',
      (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
      },
      { passive: true }
    );

    document.addEventListener('visibilitychange', () => {
      document.hidden ? clearInterval(timer) : restart();
    });

    restart();
  }

  /* ---------- formulário de contato ---------- */
  const form = document.getElementById('form');
  const formMsg = document.getElementById('formMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.className = 'form-msg';
      formMsg.textContent = '';

      let valid = true;
      form.querySelectorAll('[required]').forEach((input) => {
        const field = input.closest('.field');
        const ok = input.value.trim() !== '' && input.checkValidity();
        field.classList.toggle('is-invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        formMsg.classList.add('err');
        formMsg.textContent = 'Por favor, preencha corretamente os campos obrigatórios.';
        return;
      }

      /* Integração: aqui você pode enviar para um e-mail/backend.
         Exemplo de link mailto com os dados do formulário: */
      const data = new FormData(form);
      const subject = encodeURIComponent('Solicitação de orçamento — ' + data.get('nome'));
      const body = encodeURIComponent(
        'Nome: ' + data.get('nome') +
        '\nTelefone: ' + data.get('telefone') +
        '\nE-mail: ' + data.get('email') +
        '\nServiço: ' + (data.get('servico') || 'Não informado') +
        '\n\nMensagem:\n' + data.get('mensagem')
      );

      formMsg.classList.add('ok');
      formMsg.textContent = 'Recebemos sua solicitação! Entraremos em contato em até 1 dia útil.';

      // Descomente a linha abaixo para abrir o e-mail com o conteúdo:
      // window.location.href = 'mailto:contato@mvprojetos.com.br?subject=' + subject + '&body=' + body;

      form.reset();
    });

    form.querySelectorAll('input, textarea').forEach((input) =>
      input.addEventListener('input', () => input.closest('.field').classList.remove('is-invalid'))
    );
  }

  /* ---------- ajusta links do menu ao redimensionar ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();
