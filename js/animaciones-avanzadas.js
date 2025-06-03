/**
 * VENTTION - Animaciones Avanzadas
 * Sistema de animaciones futuristas para el sitio web
 */

document.addEventListener('DOMContentLoaded', function() {
    inicializarAnimaciones();
    configurarCanvasParticulas();
    animarEstadisticasHero();
    configurarScrollEfectos();
    inicializarIconosLucide();
    configurarAnimacionesVisibilidad();
    inicializarCursorLuz();
});

/**
 * Inicializa todas las animaciones principales
 */
function inicializarAnimaciones() {
    // Configurar navegación sticky
    configurarNavegacionScroll();
    
    // Animaciones de botones
    configurarAnimacionesBotones();
    
    // Efectos hover en cards
    configurarEfectosHover();
    
    // Scroll suave para navegación
    configurarScrollSuave();
}

/**
 * Canvas de partículas animadas en el fondo
 */
function configurarCanvasParticulas() {
    const canvas = document.getElementById('canvas-particulas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particulas = [];
    
    // Ajustar tamaño del canvas
    function redimensionarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    redimensionarCanvas();
    window.addEventListener('resize', redimensionarCanvas);
    
    // Clase Partícula
    class Particula {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.velocidadX = (Math.random() - 0.5) * 0.5;
            this.velocidadY = (Math.random() - 0.5) * 0.5;
            this.tamano = Math.random() * 2 + 1;
            this.opacidad = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#00d4ff' : '#8b5cf6';
        }
        
        actualizar() {
            this.x += this.velocidadX;
            this.y += this.velocidadY;
            
            // Rebote en los bordes
            if (this.x < 0 || this.x > canvas.width) this.velocidadX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.velocidadY *= -1;
        }
        
        dibujar() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.tamano, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.floor(this.opacidad * 255).toString(16).padStart(2, '0');
            ctx.fill();
        }
    }
    
    // Crear partículas
    for (let i = 0; i < 50; i++) {
        particulas.push(new Particula());
    }
    
    // Conectar partículas cercanas
    function conectarParticulas() {
        for (let i = 0; i < particulas.length; i++) {
            for (let j = i + 1; j < particulas.length; j++) {
                const distancia = Math.sqrt(
                    Math.pow(particulas[i].x - particulas[j].x, 2) +
                    Math.pow(particulas[i].y - particulas[j].y, 2)
                );
                
                if (distancia < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particulas[i].x, particulas[i].y);
                    ctx.lineTo(particulas[j].x, particulas[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distancia / 150)})`;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Loop de animación
    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particulas.forEach(particula => {
            particula.actualizar();
            particula.dibujar();
        });
        
        conectarParticulas();
        requestAnimationFrame(animar);
    }
    
    animar();
}

/**
 * Anima los números de las estadísticas del hero
 */
function animarEstadisticasHero() {
    const numerosAnimados = document.querySelectorAll('.numero-animado');
    
    function animarNumero(elemento, valorFinal, duracion = 2000) {
        const valorInicial = 0;
        const incremento = valorFinal / (duracion / 16);
        let valorActual = valorInicial;
        
        const timer = setInterval(() => {
            valorActual += incremento;
            if (valorActual >= valorFinal) {
                valorActual = valorFinal;
                clearInterval(timer);
            }
            elemento.textContent = Math.floor(valorActual);
        }, 16);
    }
    
    // Observer para iniciar animación cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                const valor = parseInt(elemento.dataset.valor);
                animarNumero(elemento, valor);
                observer.unobserve(elemento);
            }
        });
    }, { threshold: 0.5 });
    
    numerosAnimados.forEach(numero => observer.observe(numero));
}

/**
 * Configura efectos de scroll (parallax, fade-in, etc.)
 */
function configurarScrollEfectos() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Efecto parallax en hero
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        // Animaciones basadas en scroll
        const elementosAnimados = document.querySelectorAll('.timeline-item, .valor-card, .servicio-detallado, .ventaja-card');
        
        elementosAnimados.forEach(elemento => {
            const rect = elemento.getBoundingClientRect();
            const elementTop = rect.top;
            const elementVisible = elementTop < windowHeight * 0.8;
            
            if (elementVisible) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    });
}

/**
 * Configura la navegación con efectos de scroll
 */
function configurarNavegacionScroll() {
    const header = document.querySelector('.encabezado-futurista');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu-futurista');
    
    // Efecto scroll en header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en enlace
    const enlacesNav = document.querySelectorAll('.enlace-nav-moderno');
    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
    
    // Activar enlace según sección visible
    const secciones = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let seccionActual = '';
        
        secciones.forEach(seccion => {
            const rect = seccion.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                seccionActual = seccion.getAttribute('id');
            }
        });
        
        enlacesNav.forEach(enlace => {
            enlace.classList.remove('activo');
            if (enlace.getAttribute('href') === `#${seccionActual}`) {
                enlace.classList.add('activo');
            }
        });
    });
}

/**
 * Configura animaciones de botones
 */
function configurarAnimacionesBotones() {
    const botones = document.querySelectorAll('.boton-primario-futurista, .boton-secundario-futurista');
    
    botones.forEach(boton => {
        boton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        boton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        boton.addEventListener('click', function(e) {
            // Efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Configura efectos hover en cards
 */
function configurarEfectosHover() {
    const cards = document.querySelectorAll('.valor-card, .ventaja-card, .tech-categoria, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efectos especiales para tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Configura scroll suave para la navegación
 */
function configurarScrollSuave() {
    const enlaces = document.querySelectorAll('a[href^="#"]');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Inicializa los iconos de Lucide
 */
function inicializarIconosLucide() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Configura animaciones basadas en visibilidad
 */
function configurarAnimacionesVisibilidad() {
    // Inicializar elementos con opacidad 0
    const elementosAnimados = document.querySelectorAll('.timeline-item, .valor-card, .servicio-detallado, .ventaja-card');
    
    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Observer para animaciones de entrada
    const observerOpciones = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, Math.random() * 300);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOpciones);
    
    elementosAnimados.forEach(elemento => observer.observe(elemento));
}

/**
 * Añade estilos CSS dinámicos para efectos especiales
 */
function agregarEstilosEspeciales() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .tech-item:hover .tech-tooltip {
            opacity: 1;
            transform: translateY(5px);
            visibility: visible;
        }
        
        .tech-tooltip {
            visibility: hidden;
            opacity: 0;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Agregar estilos especiales al cargar
document.addEventListener('DOMContentLoaded', agregarEstilosEspeciales);

/**
 * Inicializa el efecto de luz que sigue al cursor
 */
function inicializarCursorLuz() {
    // Crear elemento de luz del cursor
    const cursorLuz = document.createElement('div');
    cursorLuz.className = 'cursor-light';
    document.body.appendChild(cursorLuz);
    
    // Variables para suavizar el movimiento
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Seguir el mouse
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animación suave del cursor
    function animarCursorLuz() {
        // Interpolación suave para el movimiento
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        // Posicionar la luz (centrada en el cursor)
        cursorLuz.style.left = (currentX - 24) + 'px';
        cursorLuz.style.top = (currentY - 23) + 'px';
        
        requestAnimationFrame(animarCursorLuz);
    }
    
    // Iniciar animación
    animarCursorLuz();
    
    // Efecto de click
    document.addEventListener('click', function() {
        cursorLuz.classList.add('click');
        setTimeout(() => {
            cursorLuz.classList.remove('click');
        }, 300);
    });
    
    // Ocultar/mostrar según si el mouse está en la ventana
    document.addEventListener('mouseenter', function() {
        cursorLuz.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursorLuz.style.opacity = '0';
    });
    
    // Efecto especial al pasar sobre elementos interactivos
    const elementosInteractivos = 'a, button, .boton-primario-futurista, .boton-secundario-futurista, .enlace-nav-moderno, .valor-card, .ventaja-card, .tech-item';
    
    document.addEventListener('mouseover', function(e) {
        if (e.target.matches(elementosInteractivos)) {
            cursorLuz.style.transform = 'scale(1.5)';
            cursorLuz.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.matches(elementosInteractivos)) {
            cursorLuz.style.transform = 'scale(1)';
            cursorLuz.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)';
        }
    });
} 