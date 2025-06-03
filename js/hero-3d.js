/**
 * VENTTION - Animación Hero Futurista 2D
 * Visualización animada con canvas HTML5
 */

let canvas, ctx, animationId;
let particulas = [];
let formasGeometricas = [];
let mouse = { x: 0, y: 0 };
let tiempo = 0;

document.addEventListener('DOMContentLoaded', function() {
    inicializarAnimacionHero();
    configurarEventosInteraccion();
});

/**
 * Inicializa la animación del hero
 */
function inicializarAnimacionHero() {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    // Crear canvas
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    
    // Configurar canvas
    redimensionarCanvas();
    canvas.style.borderRadius = '1rem';
    container.appendChild(canvas);

    // Crear elementos animados
    crearParticulas();
    crearFormasGeometricas();

    // Iniciar animación
    animar();

    // Responsive
    window.addEventListener('resize', redimensionarCanvas);
}

/**
 * Crea partículas flotantes
 */
function crearParticulas() {
    particulas = [];
    const cantidadParticulas = 80;

    for (let i = 0; i < cantidadParticulas; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            velocidadX: (Math.random() - 0.5) * 0.5,
            velocidadY: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? '#00d4ff' : '#8b5cf6',
            opacity: Math.random() * 0.8 + 0.2,
            pulso: Math.random() * Math.PI * 2
        });
    }
}

/**
 * Crea formas geométricas animadas
 */
function crearFormasGeometricas() {
    formasGeometricas = [];
    
    // Círculos concéntricos centrales
    formasGeometricas.push({
        tipo: 'circulo-central',
        x: canvas.width / 2,
        y: canvas.height / 2,
        radio: 60,
        velocidadRotacion: 0.01,
        rotacion: 0,
        color: '#00d4ff',
        grosor: 2
    });

    formasGeometricas.push({
        tipo: 'circulo-central',
        x: canvas.width / 2,
        y: canvas.height / 2,
        radio: 90,
        velocidadRotacion: -0.008,
        rotacion: 0,
        color: '#8b5cf6',
        grosor: 1.5
    });

    // Hexágonos flotantes
    for (let i = 0; i < 6; i++) {
        formasGeometricas.push({
            tipo: 'hexagono',
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 15,
            velocidadRotacion: (Math.random() - 0.5) * 0.02,
            rotacion: Math.random() * Math.PI * 2,
            velocidadX: (Math.random() - 0.5) * 0.3,
            velocidadY: (Math.random() - 0.5) * 0.3,
            color: i % 2 === 0 ? '#00d4ff' : '#8b5cf6',
            opacity: 0.6
        });
    }

    // Líneas conectoras dinámicas
    for (let i = 0; i < 4; i++) {
        formasGeometricas.push({
            tipo: 'linea',
            x1: Math.random() * canvas.width,
            y1: Math.random() * canvas.height,
            x2: Math.random() * canvas.width,
            y2: Math.random() * canvas.height,
            velocidad: 0.5,
            color: '#00f7a0',
            opacity: 0.4,
            fase: Math.random() * Math.PI * 2
        });
    }
}

/**
 * Dibuja partículas
 */
function dibujarParticulas() {
    particulas.forEach(particula => {
        // Actualizar posición
        particula.x += particula.velocidadX;
        particula.y += particula.velocidadY;

        // Rebote en bordes
        if (particula.x < 0 || particula.x > canvas.width) {
            particula.velocidadX *= -1;
        }
        if (particula.y < 0 || particula.y > canvas.height) {
            particula.velocidadY *= -1;
        }

        // Efecto de pulsación
        particula.pulso += 0.05;
        const pulsacion = Math.sin(particula.pulso) * 0.5 + 0.5;
        const sizeActual = particula.size * (0.8 + pulsacion * 0.4);

        // Dibujar partícula con efecto glow
        ctx.save();
        ctx.globalAlpha = particula.opacity * (0.7 + pulsacion * 0.3);
        
        // Efecto glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = particula.color;
        
        ctx.fillStyle = particula.color;
        ctx.beginPath();
        ctx.arc(particula.x, particula.y, sizeActual, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    });
}

/**
 * Dibuja formas geométricas
 */
function dibujarFormasGeometricas() {
    formasGeometricas.forEach(forma => {
        ctx.save();

        switch (forma.tipo) {
            case 'circulo-central':
                dibujarCirculoCentral(forma);
                break;
            case 'hexagono':
                dibujarHexagono(forma);
                break;
            case 'linea':
                dibujarLineaDinamica(forma);
                break;
        }

        ctx.restore();
    });
}

/**
 * Dibuja círculo central con efectos
 */
function dibujarCirculoCentral(forma) {
    forma.rotacion += forma.velocidadRotacion;
    
    ctx.strokeStyle = forma.color;
    ctx.lineWidth = forma.grosor;
    ctx.globalAlpha = 0.8;
    
    // Efecto glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = forma.color;
    
    // Círculo principal
    ctx.beginPath();
    ctx.arc(forma.x, forma.y, forma.radio, 0, Math.PI * 2);
    ctx.stroke();
    
    // Puntos de conexión giratorios
    for (let i = 0; i < 8; i++) {
        const angulo = (i / 8) * Math.PI * 2 + forma.rotacion;
        const puntoX = forma.x + Math.cos(angulo) * forma.radio;
        const puntoY = forma.y + Math.sin(angulo) * forma.radio;
        
        ctx.fillStyle = forma.color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(puntoX, puntoY, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

/**
 * Dibuja hexágono animado
 */
function dibujarHexagono(forma) {
    // Actualizar posición
    forma.x += forma.velocidadX;
    forma.y += forma.velocidadY;
    forma.rotacion += forma.velocidadRotacion;

    // Rebote en bordes
    if (forma.x < 0 || forma.x > canvas.width) {
        forma.velocidadX *= -1;
    }
    if (forma.y < 0 || forma.y > canvas.height) {
        forma.velocidadY *= -1;
    }

    ctx.translate(forma.x, forma.y);
    ctx.rotate(forma.rotacion);
    
    ctx.strokeStyle = forma.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = forma.opacity;
    ctx.shadowBlur = 10;
    ctx.shadowColor = forma.color;
    
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angulo = (i / 6) * Math.PI * 2;
        const x = Math.cos(angulo) * forma.size;
        const y = Math.sin(angulo) * forma.size;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.stroke();
}

/**
 * Dibuja líneas dinámicas conectoras
 */
function dibujarLineaDinamica(forma) {
    forma.fase += 0.02;
    
    // Movimiento ondulatorio
    const offsetX = Math.sin(forma.fase) * 30;
    const offsetY = Math.cos(forma.fase * 1.3) * 20;
    
    ctx.strokeStyle = forma.color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = forma.opacity;
    ctx.shadowBlur = 8;
    ctx.shadowColor = forma.color;
    
    // Línea con curva
    ctx.beginPath();
    ctx.moveTo(forma.x1, forma.y1);
    
    const midX = (forma.x1 + forma.x2) / 2 + offsetX;
    const midY = (forma.y1 + forma.y2) / 2 + offsetY;
    
    ctx.quadraticCurveTo(midX, midY, forma.x2, forma.y2);
    ctx.stroke();
    
    // Puntos en los extremos
    ctx.fillStyle = forma.color;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(forma.x1, forma.y1, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(forma.x2, forma.y2, 4, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * Dibuja efecto de interacción con mouse
 */
function dibujarEfectoMouse() {
    if (mouse.x > 0 && mouse.y > 0) {
        const distanciaCentro = Math.sqrt(
            Math.pow(mouse.x - canvas.width / 2, 2) + 
            Math.pow(mouse.y - canvas.height / 2, 2)
        );
        
        if (distanciaCentro < 150) {
            ctx.save();
            
            const intensidad = 1 - (distanciaCentro / 150);
            ctx.globalAlpha = intensidad * 0.3;
            
            // Círculo de interacción
            ctx.strokeStyle = '#00f7a0';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f7a0';
            
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 30 + Math.sin(tiempo * 0.1) * 10, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.restore();
        }
    }
}

/**
 * Configura eventos de interacción
 */
function configurarEventosInteraccion() {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    // Seguimiento del mouse
    container.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    container.addEventListener('mouseleave', () => {
        mouse.x = -1;
        mouse.y = -1;
    });
}

/**
 * Loop principal de animación
 */
function animar() {
    animationId = requestAnimationFrame(animar);
    tiempo += 0.016; // ~60fps

    // Limpiar canvas con gradiente de fondo
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(10, 14, 39, 0.9)');
    gradient.addColorStop(0.5, 'rgba(26, 31, 58, 0.7)');
    gradient.addColorStop(1, 'rgba(10, 14, 39, 0.9)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar elementos
    dibujarParticulas();
    dibujarFormasGeometricas();
    dibujarEfectoMouse();
}

/**
 * Redimensiona el canvas responsivamente
 */
function redimensionarCanvas() {
    const container = document.getElementById('hero-3d-container');
    if (!container || !canvas) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // Recrear elementos con nuevas dimensiones
    if (particulas.length > 0) {
        crearParticulas();
        crearFormasGeometricas();
    }
}

/**
 * Limpia recursos al salir
 */
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}); 