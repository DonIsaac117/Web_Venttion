/**
 * FUNCIONES ESPECÍFICAS PARA EL FORMULARIO DE CONTACTO
 * Este archivo maneja toda la lógica del formulario de contacto,
 * incluyendo validaciones, envío y mensajes de respuesta.
 */

// Esperar a que la página termine de cargar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página de contacto
    const formularioContacto = document.getElementById('formulario-contacto');
    
    if (formularioContacto) {
        console.log('Formulario de contacto encontrado, inicializando...');
        inicializarFormularioContacto();
    }
});

/**
 * Función principal para inicializar el formulario de contacto
 */
function inicializarFormularioContacto() {
    const formulario = document.getElementById('formulario-contacto');
    
    // Agregar eventos de validación en tiempo real
    agregarValidacionTiempoReal();
    
    // Manejar el envío del formulario
    formulario.addEventListener('submit', manejarEnvioFormulario);
    
    // Manejar el botón de limpiar formulario
    const botonLimpiar = formulario.querySelector('.boton-limpiar');
    if (botonLimpiar) {
        botonLimpiar.addEventListener('click', limpiarFormulario);
    }
    
    console.log('Formulario de contacto inicializado correctamente');
}

/**
 * Función para agregar validación en tiempo real a los campos
 */
function agregarValidacionTiempoReal() {
    // Obtener todos los campos del formulario
    const campoNombre = document.getElementById('nombre-completo');
    const campoEmail = document.getElementById('correo-electronico');
    const campoTelefono = document.getElementById('telefono-contacto');
    const campoAsunto = document.getElementById('asunto-mensaje');
    const campoMensaje = document.getElementById('mensaje-detallado');
    const checkboxPrivacidad = document.getElementById('acepto-privacidad');
    
    // Validar nombre al escribir
    if (campoNombre) {
        campoNombre.addEventListener('blur', function() {
            validarCampoNombre(this);
        });
        
        campoNombre.addEventListener('input', function() {
            eliminarMensajeError(this);
        });
    }
    
    // Validar email al escribir
    if (campoEmail) {
        campoEmail.addEventListener('blur', function() {
            validarCampoEmail(this);
        });
        
        campoEmail.addEventListener('input', function() {
            eliminarMensajeError(this);
        });
    }
    
    // Validar teléfono al escribir
    if (campoTelefono) {
        campoTelefono.addEventListener('blur', function() {
            validarCampoTelefono(this);
        });
        
        campoTelefono.addEventListener('input', function() {
            eliminarMensajeError(this);
        });
    }
    
    // Validar asunto
    if (campoAsunto) {
        campoAsunto.addEventListener('change', function() {
            validarCampoAsunto(this);
        });
    }
    
    // Validar mensaje
    if (campoMensaje) {
        campoMensaje.addEventListener('blur', function() {
            validarCampoMensaje(this);
        });
        
        campoMensaje.addEventListener('input', function() {
            eliminarMensajeError(this);
            actualizarContadorCaracteres(this);
        });
        
        // Agregar contador de caracteres
        agregarContadorCaracteres(campoMensaje);
    }
    
    // Validar checkbox de privacidad
    if (checkboxPrivacidad) {
        checkboxPrivacidad.addEventListener('change', function() {
            validarCheckboxPrivacidad(this);
        });
    }
}

/**
 * Función para validar el campo nombre
 * @param {Element} campo - El campo de nombre a validar
 */
function validarCampoNombre(campo) {
    const valor = campo.value.trim();
    
    if (valor.length < 2) {
        mostrarErrorCampo(campo, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (valor.length > 50) {
        mostrarErrorCampo(campo, 'El nombre no puede tener más de 50 caracteres');
        return false;
    }
    
    // Verificar que solo contenga letras, espacios y algunos caracteres especiales
    const expresionRegular = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-\.\']+$/;
    if (!expresionRegular.test(valor)) {
        mostrarErrorCampo(campo, 'El nombre solo puede contener letras, espacios y guiones');
        return false;
    }
    
    mostrarExitoCampo(campo);
    return true;
}

/**
 * Función para validar el campo email
 * @param {Element} campo - El campo de email a validar
 */
function validarCampoEmail(campo) {
    const valor = campo.value.trim();
    
    if (!valor) {
        mostrarErrorCampo(campo, 'El correo electrónico es obligatorio');
        return false;
    }
    
    if (!validarEmail(valor)) {
        mostrarErrorCampo(campo, 'Por favor ingresa un correo electrónico válido');
        return false;
    }
    
    mostrarExitoCampo(campo);
    return true;
}

/**
 * Función para validar el campo teléfono
 * @param {Element} campo - El campo de teléfono a validar
 */
function validarCampoTelefono(campo) {
    const valor = campo.value.trim();
    
    // El teléfono es opcional, pero si se ingresa debe ser válido
    if (valor && !validarTelefono(valor)) {
        mostrarErrorCampo(campo, 'Por favor ingresa un número de teléfono válido');
        return false;
    }
    
    if (valor) {
        mostrarExitoCampo(campo);
    }
    return true;
}

/**
 * Función para validar el campo asunto
 * @param {Element} campo - El campo de asunto a validar
 */
function validarCampoAsunto(campo) {
    const valor = campo.value;
    
    if (!valor) {
        mostrarErrorCampo(campo, 'Por favor selecciona un asunto');
        return false;
    }
    
    mostrarExitoCampo(campo);
    return true;
}

/**
 * Función para validar el campo mensaje
 * @param {Element} campo - El campo de mensaje a validar
 */
function validarCampoMensaje(campo) {
    const valor = campo.value.trim();
    
    if (valor.length < 10) {
        mostrarErrorCampo(campo, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    if (valor.length > 1000) {
        mostrarErrorCampo(campo, 'El mensaje no puede tener más de 1000 caracteres');
        return false;
    }
    
    mostrarExitoCampo(campo);
    return true;
}

/**
 * Función para validar el checkbox de privacidad
 * @param {Element} checkbox - El checkbox de privacidad a validar
 */
function validarCheckboxPrivacidad(checkbox) {
    if (!checkbox.checked) {
        mostrarErrorCampo(checkbox.parentElement, 'Debes aceptar la política de privacidad');
        return false;
    }
    
    eliminarMensajeError(checkbox.parentElement);
    return true;
}

/**
 * Función para mostrar error en un campo
 * @param {Element} campo - El campo donde mostrar el error
 * @param {string} mensaje - El mensaje de error
 */
function mostrarErrorCampo(campo, mensaje) {
    // Remover mensaje previo
    eliminarMensajeError(campo);
    
    // Agregar clase de error
    campo.classList.add('campo-error');
    
    // Crear mensaje de error
    const mensajeError = document.createElement('div');
    mensajeError.className = 'mensaje-error';
    mensajeError.textContent = mensaje;
    mensajeError.style.cssText = `
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 5px;
        animation: fadeIn 0.3s ease;
    `;
    
    // Insertar después del campo
    const grupoCampo = campo.closest('.grupo-campo, .grupo-campo-checkbox');
    if (grupoCampo) {
        grupoCampo.appendChild(mensajeError);
    }
}

/**
 * Función para mostrar éxito en un campo
 * @param {Element} campo - El campo donde mostrar el éxito
 */
function mostrarExitoCampo(campo) {
    eliminarMensajeError(campo);
    campo.classList.remove('campo-error');
    campo.classList.add('campo-exito');
}

/**
 * Función para eliminar mensajes de error de un campo
 * @param {Element} campo - El campo del cual eliminar el error
 */
function eliminarMensajeError(campo) {
    campo.classList.remove('campo-error', 'campo-exito');
    
    const grupoCampo = campo.closest('.grupo-campo, .grupo-campo-checkbox');
    if (grupoCampo) {
        const mensajeError = grupoCampo.querySelector('.mensaje-error');
        if (mensajeError) {
            mensajeError.remove();
        }
    }
}

/**
 * Función para agregar contador de caracteres al campo mensaje
 * @param {Element} campo - El campo de mensaje
 */
function agregarContadorCaracteres(campo) {
    const contador = document.createElement('div');
    contador.className = 'contador-caracteres';
    contador.style.cssText = `
        text-align: right;
        font-size: 0.8rem;
        color: #666;
        margin-top: 5px;
    `;
    
    const grupoCampo = campo.closest('.grupo-campo');
    if (grupoCampo) {
        grupoCampo.appendChild(contador);
        actualizarContadorCaracteres(campo);
    }
}

/**
 * Función para actualizar el contador de caracteres
 * @param {Element} campo - El campo de mensaje
 */
function actualizarContadorCaracteres(campo) {
    const contador = campo.closest('.grupo-campo').querySelector('.contador-caracteres');
    if (contador) {
        const longitud = campo.value.length;
        const maximo = 1000;
        contador.textContent = `${longitud}/${maximo} caracteres`;
        
        if (longitud > maximo * 0.9) {
            contador.style.color = '#e74c3c';
        } else if (longitud > maximo * 0.8) {
            contador.style.color = '#f39c12';
        } else {
            contador.style.color = '#666';
        }
    }
}

/**
 * Función para manejar el envío del formulario
 * @param {Event} evento - El evento de envío del formulario
 */
function manejarEnvioFormulario(evento) {
    evento.preventDefault();
    
    console.log('Intentando enviar formulario...');
    
    // Validar todos los campos
    const esFormularioValido = validarFormularioCompleto();
    
    if (!esFormularioValido) {
        mostrarNotificacion('Por favor corrige los errores del formulario', 'error');
        return;
    }
    
    // Mostrar indicador de carga
    mostrarIndicadorCarga();
    
    // Recopilar datos del formulario
    const datosFormulario = recopilarDatosFormulario();
    
    // Simular envío del formulario (en una implementación real, aquí harías una petición al servidor)
    simularEnvioFormulario(datosFormulario);
}

/**
 * Función para validar todo el formulario
 * @returns {boolean} - true si el formulario es válido
 */
function validarFormularioCompleto() {
    const campoNombre = document.getElementById('nombre-completo');
    const campoEmail = document.getElementById('correo-electronico');
    const campoTelefono = document.getElementById('telefono-contacto');
    const campoAsunto = document.getElementById('asunto-mensaje');
    const campoMensaje = document.getElementById('mensaje-detallado');
    const checkboxPrivacidad = document.getElementById('acepto-privacidad');
    
    let esValido = true;
    
    if (!validarCampoNombre(campoNombre)) esValido = false;
    if (!validarCampoEmail(campoEmail)) esValido = false;
    if (!validarCampoTelefono(campoTelefono)) esValido = false;
    if (!validarCampoAsunto(campoAsunto)) esValido = false;
    if (!validarCampoMensaje(campoMensaje)) esValido = false;
    if (!validarCheckboxPrivacidad(checkboxPrivacidad)) esValido = false;
    
    return esValido;
}

/**
 * Función para recopilar todos los datos del formulario
 * @returns {Object} - Objeto con todos los datos del formulario
 */
function recopilarDatosFormulario() {
    return {
        nombreCompleto: document.getElementById('nombre-completo').value.trim(),
        correoElectronico: document.getElementById('correo-electronico').value.trim(),
        telefonoContacto: document.getElementById('telefono-contacto').value.trim(),
        empresaOrganizacion: document.getElementById('empresa-organizacion').value.trim(),
        asuntoMensaje: document.getElementById('asunto-mensaje').value,
        mensajeDetallado: document.getElementById('mensaje-detallado').value.trim(),
        fechaEnvio: new Date().toISOString()
    };
}

/**
 * Función para mostrar un indicador de carga
 */
function mostrarIndicadorCarga() {
    const botonEnviar = document.querySelector('.boton-enviar');
    botonEnviar.disabled = true;
    botonEnviar.textContent = 'Enviando...';
    botonEnviar.style.backgroundColor = '#95a5a6';
}

/**
 * Función para ocultar el indicador de carga
 */
function ocultarIndicadorCarga() {
    const botonEnviar = document.querySelector('.boton-enviar');
    botonEnviar.disabled = false;
    botonEnviar.textContent = 'Enviar Mensaje';
    botonEnviar.style.backgroundColor = '#27ae60';
}

/**
 * Función para simular el envío del formulario
 * @param {Object} datos - Los datos del formulario
 */
function simularEnvioFormulario(datos) {
    console.log('Datos del formulario:', datos);
    
    // Simular tiempo de respuesta del servidor (2 segundos)
    setTimeout(function() {
        ocultarIndicadorCarga();
        
        // Simular respuesta exitosa (en la vida real aquí recibirías la respuesta del servidor)
        const exitoso = Math.random() > 0.1; // 90% de probabilidad de éxito
        
        if (exitoso) {
            mostrarNotificacion('¡Mensaje enviado correctamente! Te responderemos pronto.', 'exito');
            limpiarFormulario();
        } else {
            mostrarNotificacion('Error al enviar el mensaje. Por favor inténtalo de nuevo.', 'error');
        }
    }, 2000);
}

/**
 * Función para limpiar completamente el formulario
 */
function limpiarFormulario() {
    const formulario = document.getElementById('formulario-contacto');
    if (formulario) {
        formulario.reset();
        
        // Remover todas las clases de error y éxito
        const campos = formulario.querySelectorAll('.campo-entrada, .campo-seleccion, .campo-texto-largo');
        campos.forEach(function(campo) {
            eliminarMensajeError(campo);
        });
        
        // Limpiar checkbox
        const grupoCB = formulario.querySelector('.grupo-campo-checkbox');
        if (grupoCB) {
            eliminarMensajeError(grupoCB);
        }
        
        console.log('Formulario limpiado correctamente');
        mostrarNotificacion('Formulario limpiado', 'info');
    }
}

// Agregar estilos CSS específicos para el formulario
const estilosFormulario = document.createElement('style');
estilosFormulario.textContent = `
    .campo-error {
        border-color: #e74c3c !important;
        background-color: #fdf2f2;
    }
    
    .campo-exito {
        border-color: #27ae60 !important;
        background-color: #f8fff8;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(estilosFormulario); 