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
    animarEntradaNavbar();
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
            this.velocidadX = (Math.random() - 0.5) * 0.3;
            this.velocidadY = (Math.random() - 0.5) * 0.3;
            this.tamano = Math.random() * 1 + 1;
            this.opacidad = Math.random() * 0.1 + 0.1;
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
            
            // Añadir glow effect para más intensidad
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // Crear partículas
    for (let i = 0; i < 5; i++) {
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
                
                if (distancia < 180) {
                    ctx.beginPath();
                    ctx.moveTo(particulas[i].x, particulas[i].y);
                    ctx.lineTo(particulas[j].x, particulas[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.4 * (1 - distancia / 180)})`;
                    ctx.lineWidth = 1.5;
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
    const cards = document.querySelectorAll('.valor-card, .ventaja-card, .info-card');
    
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
    
    // Seguir el mouse INSTANTÁNEAMENTE
    document.addEventListener('mousemove', function(e) {
        // Posicionar la luz directamente sin interpolación (centrada en el cursor)
        cursorLuz.style.left = (e.clientX - 24) + 'px';
        cursorLuz.style.top = (e.clientY - 23) + 'px';
    });
    
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

// ============================================
// SCROLL SUAVE PARA NAVEGACIÓN - VERSIÓN SIMPLE
// ============================================

// Función que maneja el click en navegación
function manejarClickNavegacion(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    
    const destino = this.getAttribute('href');
    navegarHaciaSeccion(destino);
}

// Función específica y directa para scroll suave
function activarScrollSuave() {
    // 1. Configurar enlaces de navegación
    const enlacesNavegacion = document.querySelectorAll('.enlace-nav-moderno');
    enlacesNavegacion.forEach((enlace) => {
        enlace.removeEventListener('click', manejarClickNavegacion);
        enlace.addEventListener('click', manejarClickNavegacion);
    });
    
    // 2. Configurar todos los enlaces con href="#seccion" (footer y otros)
    const enlacesInternos = document.querySelectorAll('a[href^="#"]:not(.enlace-nav-moderno)');
    enlacesInternos.forEach((enlace) => {
        // Solo si el href apunta a una sección que existe
        const destino = enlace.getAttribute('href');
        if (destino && destino.length > 1 && document.querySelector(destino)) {
            enlace.removeEventListener('click', manejarClickNavegacion);
            enlace.addEventListener('click', manejarClickNavegacion);
        }
    });
    
    // 3. Configurar botones específicos del hero
    configurarBotonesHero();
}

// Configurar botones específicos del hero que no tienen href
function configurarBotonesHero() {
    // Botón "Solicitar Demo" → Ir a #contacto
    const btnDemo = document.getElementById('btn-demo');
    if (btnDemo) {
        btnDemo.removeEventListener('click', irAContacto);
        btnDemo.addEventListener('click', irAContacto);
    }
    
    // Botón "Conocer Más" → Ir a #nosotros
    const btnConocer = document.getElementById('btn-conocer');
    if (btnConocer) {
        btnConocer.removeEventListener('click', irANosotros);
        btnConocer.addEventListener('click', irANosotros);
    }
}

// Funciones específicas para botones del hero
function irAContacto(evento) {
    evento.preventDefault();
    navegarHaciaSeccion('#contacto');
    
    // Pre-llenar el campo servicio después del scroll
    setTimeout(() => {
        const servicioSelect = document.getElementById('servicio');
        if (servicioSelect) {
            servicioSelect.value = 'consultoria';
            servicioSelect.focus();
        }
    }, 900); // Esperar a que termine la animación de scroll
}

function irANosotros(evento) {
    evento.preventDefault();
    navegarHaciaSeccion('#nosotros');
}

// Función unificada para navegar a cualquier sección
function navegarHaciaSeccion(destino) {
    const seccion = document.querySelector(destino);
    if (seccion) {
        const posicionActual = window.scrollY;
        const posicionDestino = seccion.getBoundingClientRect().top + window.scrollY - 100;
        animarScrollHacia(posicionActual, posicionDestino, 800);
    }
}

// Función para animar el scroll manualmente
function animarScrollHacia(desde, hacia, duracion) {
    const distancia = hacia - desde;
    const tiempoInicio = performance.now();
    
    function step(tiempoActual) {
        const tiempoTranscurrido = tiempoActual - tiempoInicio;
        const progreso = Math.min(tiempoTranscurrido / duracion, 1);
        
        // Función de easing suave (ease-out)
        const progressSuave = 1 - Math.pow(1 - progreso, 3);
        
        const posicionActual = desde + (distancia * progressSuave);
        window.scrollTo(0, posicionActual);
        
        if (progreso < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Inicializar cuando esté todo listo
document.addEventListener('DOMContentLoaded', function() {
    // Pequeña pausa para asegurar que todo esté renderizado
    setTimeout(() => {
        activarScrollSuave();
    }, 200);
});

// Respaldo adicional cuando la página esté completamente cargada
window.addEventListener('load', function() {
    activarScrollSuave();
    inicializarCarruselTecnologico();
});

// ============================================
// CARRUSEL TECNOLÓGICO
// ============================================

function inicializarCarruselTecnologico() {
    const carousel = document.querySelector('.tech-carousel');
    const slides = document.querySelectorAll('.tech-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('tech-prev');
    const nextBtn = document.getElementById('tech-next');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Mover el carrusel horizontal
        const translateX = -index * 25; // Cada slide ocupa 25%
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Event listeners para botones
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-slide cada 5 segundos
    setInterval(() => {
        nextSlide();
    }, 5000);
    
    // Inicializar primera slide
    showSlide(0);
}

/**
 * Anima la entrada del navbar al cargar la página
 */
function animarEntradaNavbar() {
    const navbar = document.querySelector('.encabezado-futurista');
    
    if (!navbar) return;
    
    // Esperar un momento antes de animar para que se vea el efecto
    setTimeout(() => {
        navbar.classList.add('navbar-loaded');
        
        // Iniciar animación de letras después de que el navbar termine de desplegarse
        setTimeout(() => {
            animarLetrasLogo();
        }, 400); // Esperar 400ms después de que el navbar empiece a desplegarse
        
    }, 700); // Cambiado de 300ms a 800ms
}

/**
 * Anima las letras del logo VENTTION secuencialmente
 */
function animarLetrasLogo() {
    const letras = document.querySelectorAll('.letra-logo');
    
    if (letras.length === 0) return;
    
    console.log('Animando letras del logo:', letras.length); // Debug
    
    // Animar cada letra con un retraso secuencial
    letras.forEach((letra, index) => {
        setTimeout(() => {
            console.log(`Animando letra ${index}:`, letra.textContent); // Debug
            
            // Agregar clase de animación
            letra.classList.add('letra-animada');
            
            // Forzar visibilidad con JavaScript como respaldo
            letra.style.opacity = '1';
            letra.style.transform = 'translateY(0) rotateY(0deg)';
            
            // Agregar pequeño efecto de brillo temporal
            setTimeout(() => {
                letra.style.textShadow = '0 0 15px rgba(0, 212, 255, 0.8)';
                setTimeout(() => {
                    letra.style.textShadow = '';
                }, 300);
            }, 200);
            
        }, index * 100); // 100ms entre cada letra
    });
} 
