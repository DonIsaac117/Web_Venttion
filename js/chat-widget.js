/**
 * VENTTION - Chat Widget Interactivo
 * Sistema de chat para atención al cliente y generación de leads
 */

document.addEventListener('DOMContentLoaded', function() {
    inicializarChatWidget();
});

/**
 * Inicializa el widget de chat
 */
function inicializarChatWidget() {
    const chatButton = document.getElementById('chat-button');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input-field');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.querySelector('.chat-body');
    
    // Configurar eventos
    configurarEventosChat();
    configurarOpcionesRapidas();
    configurarAnimacionesChat();
    
    // Mostrar saludo automático después de 3 segundos
    setTimeout(() => {
        mostrarNotificacionChat();
    }, 3000);
}

/**
 * Configura todos los eventos del chat
 */
function configurarEventosChat() {
    const chatButton = document.getElementById('chat-button');
    const chatPanel = document.getElementById('chat-panel');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input-field');
    const chatSend = document.getElementById('chat-send');
    
    // Abrir/cerrar chat
    chatButton.addEventListener('click', () => {
        toggleChat();
    });
    
    chatClose.addEventListener('click', () => {
        cerrarChat();
    });
    
    // Enviar mensaje
    chatSend.addEventListener('click', () => {
        enviarMensaje();
    });
    
    // Enviar con Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!chatPanel.contains(e.target) && !chatButton.contains(e.target)) {
            if (chatPanel.classList.contains('active')) {
                cerrarChat();
            }
        }
    });
}

/**
 * Alterna la visibilidad del chat
 */
function toggleChat() {
    const chatPanel = document.getElementById('chat-panel');
    
    if (chatPanel.classList.contains('active')) {
        cerrarChat();
    } else {
        abrirChat();
    }
}

/**
 * Abre el panel de chat
 */
function abrirChat() {
    const chatPanel = document.getElementById('chat-panel');
    const chatButton = document.getElementById('chat-button');
    
    chatPanel.classList.add('active');
    chatButton.style.transform = 'scale(0.9)';
    
    // Animar entrada
    setTimeout(() => {
        chatPanel.style.animation = 'slideUp 0.3s ease';
    }, 10);
    
    // Focus en input
    setTimeout(() => {
        document.getElementById('chat-input-field').focus();
    }, 300);
}

/**
 * Cierra el panel de chat
 */
function cerrarChat() {
    const chatPanel = document.getElementById('chat-panel');
    const chatButton = document.getElementById('chat-button');
    
    chatPanel.classList.remove('active');
    chatButton.style.transform = 'scale(1)';
}

/**
 * Envía un mensaje del usuario
 */
function enviarMensaje() {
    const chatInput = document.getElementById('chat-input-field');
    const mensaje = chatInput.value.trim();
    
    if (mensaje) {
        agregarMensaje(mensaje, 'user');
        chatInput.value = '';
        
        // Simular respuesta del bot después de un delay
        setTimeout(() => {
            const respuesta = generarRespuestaBot(mensaje);
            agregarMensaje(respuesta, 'bot');
        }, 800);
    }
}

/**
 * Agrega un mensaje al chat
 */
function agregarMensaje(texto, tipo) {
    const chatBody = document.querySelector('.chat-body');
    
    const mensajeElement = document.createElement('div');
    mensajeElement.className = `chat-mensaje ${tipo}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'mensaje-avatar';
    avatar.textContent = tipo === 'user' ? '👤' : '🤖';
    
    const contenido = document.createElement('div');
    contenido.className = 'mensaje-contenido';
    
    const texto_p = document.createElement('p');
    texto_p.textContent = texto;
    contenido.appendChild(texto_p);
    
    mensajeElement.appendChild(avatar);
    mensajeElement.appendChild(contenido);
    
    chatBody.appendChild(mensajeElement);
    
    // Scroll al último mensaje
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Animar entrada del mensaje
    mensajeElement.style.opacity = '0';
    mensajeElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        mensajeElement.style.opacity = '1';
        mensajeElement.style.transform = 'translateY(0)';
        mensajeElement.style.transition = 'all 0.3s ease';
    }, 10);
}

/**
 * Genera respuesta automática del bot
 */
function generarRespuestaBot(mensajeUsuario) {
    const mensaje = mensajeUsuario.toLowerCase();
    
    // Respuestas basadas en palabras clave
    if (mensaje.includes('precio') || mensaje.includes('costo') || mensaje.includes('tarifa')) {
        return '💰 Nuestros precios son competitivos y se adaptan a cada proyecto. ¿Te gustaría que programemos una consulta gratuita para darte un presupuesto personalizado?';
    }
    
    if (mensaje.includes('demo') || mensaje.includes('demostración')) {
        return '🚀 ¡Excelente! Podemos programar una demo personalizada de nuestras soluciones. ¿Qué servicio te interesa más: Visión por Computadora, Software TPV o Integración de Bases de Datos?';
    }
    
    if (mensaje.includes('tiempo') || mensaje.includes('implementación') || mensaje.includes('cuánto')) {
        return '⚡ Una de nuestras ventajas clave es la rapidez de implementación. Puedes ver resultados tangibles en las primeras 24 horas. ¿Te gustaría conocer más detalles sobre nuestro proceso?';
    }
    
    if (mensaje.includes('contacto') || mensaje.includes('hablar') || mensaje.includes('reunión')) {
        return '📞 Perfecto, nuestro equipo estará encantado de hablar contigo. Puedes contactarnos directamente en info@venttion.com o programar una llamada. ¿Prefieres email o llamada telefónica?';
    }
    
    if (mensaje.includes('servicio') || mensaje.includes('qué hacen') || mensaje.includes('productos')) {
        return '🛠️ Ofrecemos tres servicios principales: 1) Visión por Computadora con IA, 2) Software TPV personalizable, 3) Integración de Bases de Datos. ¿Sobre cuál te gustaría saber más?';
    }
    
    if (mensaje.includes('tecnología') || mensaje.includes('stack') || mensaje.includes('herramientas')) {
        return '💻 Utilizamos tecnologías de vanguardia como Python, TensorFlow, OpenCV, React, PostgreSQL y más. Nuestro stack está diseñado para máxima eficiencia y escalabilidad.';
    }
    
    if (mensaje.includes('gracias') || mensaje.includes('thank you')) {
        return '😊 ¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte sobre nuestros servicios?';
    }
    
    if (mensaje.includes('hola') || mensaje.includes('hi') || mensaje.includes('hello')) {
        return '👋 ¡Hola! Soy el asistente virtual de VENTTION. Estoy aquí para ayudarte con información sobre nuestras soluciones tecnológicas. ¿En qué puedo ayudarte hoy?';
    }
    
    // Respuesta por defecto
    return `✨ Gracias por tu mensaje. Nuestro equipo de expertos puede ayudarte con eso. ¿Te gustaría que programemos una consulta gratuita para discutir tu proyecto en detalle?`;
}

/**
 * Configura las opciones rápidas del chat
 */
function configurarOpcionesRapidas() {
    const opcionesRapidas = document.querySelectorAll('.opcion-rapida');
    
    opcionesRapidas.forEach(opcion => {
        opcion.addEventListener('click', function() {
            const tipoOpcion = this.dataset.opcion;
            manejarOpcionRapida(tipoOpcion);
            
            // Remover opciones rápidas después de usar una
            const contenedorOpciones = this.parentElement;
            contenedorOpciones.style.opacity = '0';
            setTimeout(() => {
                contenedorOpciones.remove();
            }, 300);
        });
    });
}

/**
 * Maneja las opciones rápidas del chat
 */
function manejarOpcionRapida(tipo) {
    let respuesta = '';
    
    switch (tipo) {
        case 'demo':
            respuesta = '🚀 Excelente elección! Para programar tu demo personalizada, necesitamos conocer un poco más sobre tu proyecto. ¿Podrías contarme qué tipo de negocio tienes y qué desafío tecnológico quieres resolver?';
            break;
            
        case 'precios':
            respuesta = '💰 Nuestros precios se adaptan a cada proyecto y necesidad específica. Factores como el tamaño del proyecto, complejidad y personalización afectan el costo. ¿Te gustaría que programemos una consulta gratuita para darte un presupuesto exacto?';
            break;
            
        case 'contacto':
            respuesta = '📞 ¡Perfecto! Puedes contactar con nuestro equipo de varias formas:\n\n📧 Email: info@venttion.com\n📱 Teléfono: +34 900 123 456\n💬 O continúa este chat y te ayudo a conectar con un especialista';
            break;
            
        default:
            respuesta = '¡Gracias por tu interés! ¿En qué más puedo ayudarte?';
    }
    
    setTimeout(() => {
        agregarMensaje(respuesta, 'bot');
    }, 500);
}

/**
 * Muestra notificación del chat
 */
function mostrarNotificacionChat() {
    const chatButton = document.getElementById('chat-button');
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'chat-notificacion';
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <p>💬 ¡Hola! ¿Necesitas ayuda?</p>
            <button class="cerrar-notificacion">&times;</button>
        </div>
    `;
    
    // Estilos inline para la notificación
    notificacion.style.cssText = `
        position: absolute;
        bottom: 70px;
        right: 0;
        background: white;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        max-width: 200px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 1001;
    `;
    
    notificacion.querySelector('.notificacion-contenido').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    `;
    
    notificacion.querySelector('p').style.cssText = `
        margin: 0;
        font-size: 14px;
        color: #333;
        font-weight: 500;
    `;
    
    notificacion.querySelector('.cerrar-notificacion').style.cssText = `
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #999;
        padding: 0;
        line-height: 1;
    `;
    
    chatButton.parentElement.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.style.opacity = '1';
        notificacion.style.transform = 'translateY(0)';
    }, 100);
    
    // Cerrar notificación
    const cerrarBtn = notificacion.querySelector('.cerrar-notificacion');
    cerrarBtn.addEventListener('click', () => {
        cerrarNotificacion(notificacion);
    });
    
    // Auto-cerrar después de 8 segundos
    setTimeout(() => {
        if (notificacion.parentElement) {
            cerrarNotificacion(notificacion);
        }
    }, 8000);
    
    // Abrir chat al hacer clic en la notificación
    notificacion.addEventListener('click', (e) => {
        if (e.target !== cerrarBtn) {
            abrirChat();
            cerrarNotificacion(notificacion);
        }
    });
}

/**
 * Cierra la notificación del chat
 */
function cerrarNotificacion(notificacion) {
    notificacion.style.opacity = '0';
    notificacion.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 300);
}

/**
 * Configura animaciones del chat
 */
function configurarAnimacionesChat() {
    const chatButton = document.getElementById('chat-button');
    
    // Animación de pulso
    setInterval(() => {
        const pulse = chatButton.querySelector('.chat-pulse');
        if (pulse && !document.getElementById('chat-panel').classList.contains('active')) {
            pulse.style.animation = 'none';
            setTimeout(() => {
                pulse.style.animation = 'pulse-ring 2s infinite';
            }, 10);
        }
    }, 4000);
    
    // Efectos hover en botón
    chatButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    chatButton.addEventListener('mouseleave', function() {
        if (!document.getElementById('chat-panel').classList.contains('active')) {
            this.style.transform = 'scale(1)';
        }
    });
}

/**
 * Función para scroll automático suave en el chat
 */
function scrollSuaveChat() {
    const chatBody = document.querySelector('.chat-body');
    chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: 'smooth'
    });
}

/**
 * Simula escribiendo... antes de responder
 */
function mostrarEscribiendo() {
    const chatBody = document.querySelector('.chat-body');
    
    const escribiendoElement = document.createElement('div');
    escribiendoElement.className = 'chat-mensaje bot escribiendo';
    escribiendoElement.innerHTML = `
        <div class="mensaje-avatar">🤖</div>
        <div class="mensaje-contenido">
            <div class="escribiendo-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    // Estilos para animación de escribiendo
    const style = document.createElement('style');
    style.textContent = `
        .escribiendo-dots {
            display: flex;
            gap: 4px;
            padding: 8px 0;
        }
        
        .escribiendo-dots span {
            width: 6px;
            height: 6px;
            background: #00d4ff;
            border-radius: 50%;
            animation: typing-dots 1.5s infinite;
        }
        
        .escribiendo-dots span:nth-child(2) { animation-delay: 0.2s; }
        .escribiendo-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing-dots {
            0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
            30% { opacity: 1; transform: translateY(-8px); }
        }
    `;
    
    if (!document.querySelector('style[data-chat-styles]')) {
        style.setAttribute('data-chat-styles', 'true');
        document.head.appendChild(style);
    }
    
    chatBody.appendChild(escribiendoElement);
    scrollSuaveChat();
    
    return escribiendoElement;
} 