// script.js

document.addEventListener('DOMContentLoaded', function() {

    const searchToggle = document.querySelector('.search-btn');
    const portfolioModal = document.getElementById('portfolioModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn'); // Pastikan ini ada

    function openModal() {
        portfolioModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        portfolioModal.classList.remove('is-active');
        document.body.style.overflow = 'auto';
    }

    searchToggle.addEventListener('click', openModal);
    cancelBtn.addEventListener('click', closeModal);
    portfolioModal.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            closeModal();
        }
    });
    
    confirmBtn.addEventListener('click', function() {
        closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && portfolioModal.classList.contains('is-active')) {
            closeModal();
        }
    });

    const menuToggle = document.getElementById('menuToggle');
    const navDropdown = document.getElementById('main-nav-dropdown');
    const header = document.querySelector('.main-header');
    const navLinks = navDropdown.querySelectorAll('a');

    function toggleMenu() {
        const isActive = navDropdown.classList.contains('is-active');

        if (isActive) {
            navDropdown.classList.remove('is-active');
            header.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            navDropdown.classList.add('is-active');
            header.classList.add('menu-open');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMenu(event) {
        event.preventDefault(); 
        
        const targetId = event.currentTarget.getAttribute('href'); 
        
        navDropdown.classList.remove('is-active');
        header.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');

        setTimeout(() => {
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }, 600);
    }

    menuToggle.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

// --- FUNGSI SCROLL REVEAL MENGGUNAKAN INTERSECTION OBSERVER ---
    function setupScrollReveal() {
        const revealItems = document.querySelectorAll('.reveal-item');

        const observerOptions = {
            root: null, // Mengamati viewport
            rootMargin: '0px',
            threshold: 0.1 // Ketika 10% elemen terlihat, aktifkan
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Elemen memasuki viewport
                    entry.target.classList.add('is-visible');
                    // Hentikan pengamatan setelah muncul agar lebih efisien
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        // Mulai mengamati semua elemen yang memiliki kelas .reveal-item
        revealItems.forEach(item => {
            observer.observe(item);
        });
    }

    setupScrollReveal();

const toggleButtons = document.querySelectorAll('.detail-toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Dapatkan parent .member-row
            const memberRow = this.closest('.member-row');
            // Dapatkan detail expand
            const detailsExpand = memberRow.querySelector('.member-details-expand');
            
            // Toggle kelas is-open untuk CSS
            detailsExpand.classList.toggle('is-open');

            // Ubah teks tombol dan ikon panah
            const isExpanded = detailsExpand.classList.contains('is-open');
            this.setAttribute('aria-expanded', isExpanded);
            
            if (isExpanded) {
                this.innerHTML = 'Hide Detail'; // Panah atas
            } else {
                this.innerHTML = 'See Detail'; // Panah bawah
            }
        });
    });