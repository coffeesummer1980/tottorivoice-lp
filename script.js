/**
 * とっとりVOICE LP - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // ナビゲーション
    // =============================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // スクロールでナビバーにクラス追加
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    });

    // ハンバーガーメニュー
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ナビリンクをクリックしたらメニュー閉じる
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // メニュー外クリックで閉じる
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // =============================
    // スクロールアニメーション
    // =============================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素にクラスを付与
    const animateElements = [
        '.about-quote', '.about-description', '.about-image-area',
        '.stat-card', '.mission-content', '.mission-character',
        '.personality-card',
        '.service-card',
        '.business-text', '.business-use-cases', '.use-case-card',
        '.reason-card',
        '.media-card',
        '.contact-card'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('fade-in-up');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });

    // =============================
    // カウントアップアニメーション
    // =============================
    const countElements = document.querySelectorAll('.stat-number[data-count]');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCount(el, target);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));

    function animateCount(el, target) {
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * target);
            
            el.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // =============================
    // スムーススクロール
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================
    // パララックス効果（軽量版）
    // =============================
    const shapes = document.querySelectorAll('.shape');
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                shapes.forEach((shape, i) => {
                    const speed = 0.02 + (i * 0.01);
                    shape.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // =============================
    // ヒーローのキャラクターホバー
    // =============================
    const heroCharacter = document.getElementById('hero-character');
    if (heroCharacter) {
        heroCharacter.addEventListener('mouseenter', () => {
            heroCharacter.style.animation = 'none';
            heroCharacter.style.transform = 'scale(1.05) rotate(-3deg)';
        });
        heroCharacter.addEventListener('mouseleave', () => {
            heroCharacter.style.transform = '';
            setTimeout(() => {
                heroCharacter.style.animation = '';
            }, 100);
        });
    }

    // =============================
    // アクティブナビリンク
    // =============================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

});
