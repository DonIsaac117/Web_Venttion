/**
 * FUNCIONES PRINCIPALES DE LA PÁGINA WEB VENTTIUN
 * Este archivo contiene todas las funciones JavaScript necesarias
 * para el funcionamiento básico de la página web.
 */

// Función que se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página web de Venttiun cargada correctamente');
    
    // Inicializar todas las funciones principales
    inicializarNavegacionSuave();
    inicializarEfectosDesplazamiento();
    inicializarMenuResponsivo();
    inicializarAnimacionesGenerales();
});

/**
 * Función para navegación suave entre secciones
 * Permite un desplazamiento suave cuando se hace clic en los enlaces del menú
 */
function inicializarNavegacionSuave() {
    // Obtener todos los enlaces de navegación
    const enlacesNavegacion = document.querySelectorAll('.enlace-navegacion');
    
    enlacesNavegacion.forEach(function(enlace) {
        enlace.addEventListener('click', function(evento) {
            const href = this.getAttribute('href');
            
            // Solo aplicar navegación suave si el enlace es a una sección de la misma página
            if (href.startsWith('#')) {
                evento.preventDefault();
                
                const seccionDestino = document.querySelector(href);
                if (seccionDestino) {
                    // Calcular la posición considerando la altura del encabezado fijo
                    const alturaEncabezado = document.querySelector('.encabezado-principal').offsetHeight;
                    const posicionDestino = seccionDestino.offsetTop - alturaEncabezado;
                    
                    // Desplazamiento suave a la sección
                    window.scrollTo({
                        top: posicionDestino,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar el enlace activo
                    actualizarEnlaceActivo(this);
                }
            }
        });
    });
}

/**
 * Función para actualizar el enlace activo en el menú de navegación
 * @param {Element} enlaceActivo - El enlace que debe marcarse como activo
 */
function actualizarEnlaceActivo(enlaceActivo) {
    // Remover la clase 'activo' de todos los enlaces
    const todosLosEnlaces = document.querySelectorAll('.enlace-navegacion');
    todosLosEnlaces.forEach(function(enlace) {
        enlace.classList.remove('activo');
    });
    
    // Agregar la clase 'activo' al enlace seleccionado
    enlaceActivo.classList.add('activo');
}

/**
 * Función para detectar la sección visible y actualizar el menú automáticamente
 * Esta función se ejecuta mientras el usuario hace scroll
 */
function inicializarEfectosDesplazamiento() {
    window.addEventListener('scroll', function() {
        // Obtener la posición actual del scroll
        const posicionScroll = window.scrollY;
        const alturaEncabezado = document.querySelector('.encabezado-principal').offsetHeight;
        
        // Obtener todas las secciones
        const secciones = document.querySelectorAll('section[id]');
        
        secciones.forEach(function(seccion) {
            const altoSeccion = seccion.offsetHeight;
            const offsetSeccion = seccion.offsetTop - alturaEncabezado - 100;
            const idSeccion = seccion.getAttribute('id');
            
            // Verificar si la sección está visible en la pantalla
            if (posicionScroll >= offsetSeccion && posicionScroll < offsetSeccion + altoSeccion) {
                // Encontrar el enlace correspondiente y marcarlo como activo
                const enlaceCorrespondiente = document.querySelector(`a[href="#${idSeccion}"]`);
                if (enlaceCorrespondiente) {
                    actualizarEnlaceActivo(enlaceCorrespondiente);
                }
            }
        });
        
        // Efecto de transparencia para el encabezado al hacer scroll
        aplicarEfectoEncabezadoScroll(posicionScroll);
    });
}

/**
 * Función para aplicar efectos visuales al encabezado según el scroll
 * @param {number} posicionScroll - Posición actual del scroll
 */
function aplicarEfectoEncabezadoScroll(posicionScroll) {
    const encabezado = document.querySelector('.encabezado-principal');
    
    if (posicionScroll > 100) {
        // Agregar una clase para estilos cuando se ha hecho scroll
        encabezado.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        encabezado.style.backdropFilter = 'blur(10px)';
    } else {
        // Restaurar el estilo original
        encabezado.style.backgroundColor = '#2c3e50';
        encabezado.style.backdropFilter = 'none';
    }
}

/**
 * Función para manejo del menú en dispositivos móviles
 * (Para futuras mejoras cuando se implemente un menú hamburguesa)
 */
function inicializarMenuResponsivo() {
    // Esta función está preparada para futuras mejoras
    // donde se pueda agregar un menú hamburguesa para móviles
    
    console.log('Menú responsivo inicializado');
    
    // Verificar el tamaño de pantalla y ajustar el menú si es necesario
    verificarTamanoPantalla();
    
    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', verificarTamanoPantalla);
}

/**
 * Función para verificar el tamaño de pantalla y hacer ajustes necesarios
 */
function verificarTamanoPantalla() {
    const anchoPantalla = window.innerWidth;
    const menuNavegacion = document.querySelector('.menu-navegacion');
    
    if (anchoPantalla <= 768) {
        // Configuración para pantallas pequeñas
        menuNavegacion.style.flexDirection = 'column';
        console.log('Modo móvil activado');
    } else {
        // Configuración para pantallas grandes
        menuNavegacion.style.flexDirection = 'row';
        console.log('Modo escritorio activado');
    }
}

/**
 * Función para inicializar animaciones generales de la página
 */
function inicializarAnimacionesGenerales() {
    // Animación de aparición suave para elementos cuando entran en vista
    const observadorAnimaciones = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Aplicar animaciones a elementos específicos
    const elementosAnimados = document.querySelectorAll('.valor-individual, .tarjeta-servicio');
    elementosAnimados.forEach(function(elemento) {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observadorAnimaciones.observe(elemento);
    });
}

/**
 * Función para mostrar mensajes de notificación al usuario
 * @param {string} mensaje - El mensaje a mostrar
 * @param {string} tipo - Tipo de mensaje: 'exito', 'error', 'info'
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos básicos para la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Colores según el tipo de notificación
    switch (tipo) {
        case 'exito':
            notificacion.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            notificacion.style.backgroundColor = '#e74c3c';
            break;
        default:
            notificacion.style.backgroundColor = '#3498db';
    }
    
    // Agregar al documento
    document.body.appendChild(notificacion);
    
    // Remover automáticamente después de 4 segundos
    setTimeout(function() {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            document.body.removeChild(notificacion);
        }, 300);
    }, 4000);
}

/**
 * Función utilitaria para validar email
 * @param {string} email - El email a validar
 * @returns {boolean} - true si el email es válido, false en caso contrario
 */
function validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
}

/**
 * Función utilitaria para validar teléfono
 * @param {string} telefono - El teléfono a validar
 * @returns {boolean} - true si el teléfono es válido, false en caso contrario
 */
function validarTelefono(telefono) {
    // Expresión regular básica para teléfonos españoles e internacionales
    const expresionRegular = /^[\+]?[0-9\s\-\(\)]{9,15}$/;
    return expresionRegular.test(telefono);
}

// Agregar estilos CSS para las animaciones desde JavaScript
const estilosAnimaciones = document.createElement('style');
estilosAnimaciones.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(estilosAnimaciones); 