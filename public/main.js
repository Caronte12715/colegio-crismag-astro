document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializa las animaciones al hacer scroll (AOS)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Lógica para el menú hamburguesa en móviles
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("nav-menu--visible");
        });
    }

    // Activa LightGallery en la página actual si encuentra un elemento con id 'lightgallery'
    const gallery = document.getElementById('lightgallery');
    if (gallery) {
        lightGallery(gallery, {
            selector: '.galeria-item',
            speed: 500,
            download: false
        });
    }

    // Lógica para el botón "Volver Arriba"
    const btnVolverArriba = document.getElementById("btn-volver-arriba");
    if (btnVolverArriba) {
        const scrollFunction = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                btnVolverArriba.classList.add("show");
            } else {
                btnVolverArriba.classList.remove("show");
            }
        };
        const backToTop = (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        window.addEventListener('scroll', scrollFunction);
        btnVolverArriba.addEventListener('click', backToTop);
    }

    // =======================================================
    // LÓGICA PARA RESALTAR EL ENLACE ACTIVO EN EL MENÚ - NUEVO
    // =======================================================
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual (ej: "contacto.html")

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Si la página es 'index.html', el path puede ser '' (vacío)
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            // Añadimos la clase al elemento <li> padre del enlace <a>
            link.parentElement.classList.add('active-link');
        }
    });
    // =======================================================
});