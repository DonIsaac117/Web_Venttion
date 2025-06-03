/**
 * VENTTION - Formulario de Contacto Futurista
 * Sistema avanzado de formulario con validaciones en tiempo real y efectos visuales
 */

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularioContactoVenttion();
});

/**
 * Inicializa el formulario de contacto futurista
 */
function inicializarFormularioContactoVenttion() {
    const formulario = document.getElementById('form-contacto-venttion');
    
    if (!formulario) {
        console.log('Formulario de contacto no encontrado');
        return;
    }
    
    console.log('Inicializando formulario de contacto VENTTION...');
    
    // Configurar validaciones en tiempo real
    configurarValidacionesFormulario();
    
    // Configurar envío del formulario
    configurarEnvioFormulario();
    
    // Configurar efectos visuales
    configurarEfectosVisuales();
    
    // Configurar botones hero
    configurarBotonesHero();
}

/**
 * Configura las validaciones en tiempo real para todos los campos
 */
function configurarValidacionesFormulario() {
    const campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        empresa: document.getElementById('empresa'),
        servicio: document.getElementById('servicio'),
        mensaje: document.getElementById('mensaje')
    };
    
    // Validaciones para el campo nombre
    if (campos.nombre) {
        campos.nombre.addEventListener('input', function() {
            validarNombreCompleto(this);
        });
        
        campos.nombre.addEventListener('blur', function() {
            validarNombreCompleto(this);
        });
    }
    
    // Validaciones para el campo email
    if (campos.email) {
        campos.email.addEventListener('input', function() {
            validarEmailEmpresarial(this);
        });
        
        campos.email.addEventListener('blur', function() {
            validarEmailEmpresarial(this);
        });
    }
    
    // Validaciones para el campo empresa
    if (campos.empresa) {
        campos.empresa.addEventListener('input', function() {
            validarNombreEmpresa(this);
        });
        
        campos.empresa.addEventListener('blur', function() {
            validarNombreEmpresa(this);
        });
    }
    
    // Validaciones para el campo servicio
    if (campos.servicio) {
        campos.servicio.addEventListener('change', function() {
            validarSeleccionServicio(this);
        });
    }
    
    // Validaciones para el campo mensaje
    if (campos.mensaje) {
        campos.mensaje.addEventListener('input', function() {
            validarMensajeProyecto(this);
            actualizarContadorCaracteres(this);
        });
        
        campos.mensaje.addEventListener('blur', function() {
            validarMensajeProyecto(this);
        });
        
        // Agregar contador de caracteres
        agregarContadorCaracteresMensaje(campos.mensaje);
    }
}

/**
 * Valida el campo nombre completo
 */
function validarNombreCompleto(campo) {
    const valor = campo.value.trim();
    const formGroup = campo.closest('.form-grupo');
    
    // Limpiar errores previos
    limpiarErroresCampo(formGroup);
    
    if (valor.length < 2) {
        mostrarErrorCampo(formGroup, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (valor.length > 50) {
        mostrarErrorCampo(formGroup, 'El nombre no puede exceder 50 caracteres');
        return false;
    }
    
    // Verificar formato válido
    const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\-\.\']+$/;
    if (!regex.test(valor)) {
        mostrarErrorCampo(formGroup, 'El nombre solo puede contener letras y espacios');
        return false;
    }
    
    mostrarExitoCampo(formGroup);
    return true;
}

/**
 * Valida el campo email empresarial
 */
function validarEmailEmpresarial(campo) {
    const valor = campo.value.trim();
    const formGroup = campo.closest('.form-grupo');
    
    limpiarErroresCampo(formGroup);
    
    if (!valor) {
        mostrarErrorCampo(formGroup, 'El email empresarial es obligatorio');
        return false;
    }
    
    // Validación de formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) {
        mostrarErrorCampo(formGroup, 'Por favor ingresa un email válido');
        return false;
    }
    
    // Verificar que no sea un email gratuito para ser más empresarial
    const dominiosGratuitos = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    const dominio = valor.split('@')[1];
    
    if (dominiosGratuitos.includes(dominio)) {
        mostrarAdvertenciaCampo(formGroup, 'Se recomienda usar un email corporativo');
    } else {
        mostrarExitoCampo(formGroup);
    }
    
    return true;
}

/**
 * Valida el campo nombre de empresa
 */
function validarNombreEmpresa(campo) {
    const valor = campo.value.trim();
    const formGroup = campo.closest('.form-grupo');
    
    limpiarErroresCampo(formGroup);
    
    if (valor.length < 2) {
        mostrarErrorCampo(formGroup, 'El nombre de la empresa es obligatorio');
        return false;
    }
    
    if (valor.length > 100) {
        mostrarErrorCampo(formGroup, 'El nombre de la empresa es muy largo');
        return false;
    }
    
    mostrarExitoCampo(formGroup);
    return true;
}

/**
 * Valida la selección de servicio
 */
function validarSeleccionServicio(campo) {
    const valor = campo.value;
    const formGroup = campo.closest('.form-grupo');
    
    limpiarErroresCampo(formGroup);
    
    if (!valor) {
        mostrarErrorCampo(formGroup, 'Por favor selecciona un servicio');
        return false;
    }
    
    mostrarExitoCampo(formGroup);
    return true;
}

/**
 * Valida el mensaje del proyecto
 */
function validarMensajeProyecto(campo) {
    const valor = campo.value.trim();
    const formGroup = campo.closest('.form-grupo');
    
    limpiarErroresCampo(formGroup);
    
    if (valor.length < 20) {
        mostrarErrorCampo(formGroup, 'Por favor describe tu proyecto con más detalle (mínimo 20 caracteres)');
        return false;
    }
    
    if (valor.length > 1000) {
        mostrarErrorCampo(formGroup, 'El mensaje es muy largo (máximo 1000 caracteres)');
        return false;
    }
    
    mostrarExitoCampo(formGroup);
    return true;
}

/**
 * Muestra error en el campo
 */
function mostrarErrorCampo(formGroup, mensaje) {
    const input = formGroup.querySelector('input, select, textarea');
    const underline = formGroup.querySelector('.input-underline');
    
    // Añadir clase de error
    formGroup.classList.add('error');
    formGroup.classList.remove('success', 'warning');
    
    // Cambiar color del underline
    if (underline) {
        underline.style.background = '#ef4444';
        underline.style.width = '100%';
    }
    
    // Crear o actualizar mensaje de error
    let errorMsg = formGroup.querySelector('.mensaje-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'mensaje-error';
        formGroup.appendChild(errorMsg);
    }
    
    errorMsg.textContent = mensaje;
    errorMsg.style.cssText = `
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 0.5rem;
        display: block;
        animation: fadeInUp 0.3s ease;
    `;
    
    // Efecto visual en el input
    if (input) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
    }
}

/**
 * Muestra éxito en el campo
 */
function mostrarExitoCampo(formGroup) {
    const input = formGroup.querySelector('input, select, textarea');
    const underline = formGroup.querySelector('.input-underline');
    
    formGroup.classList.add('success');
    formGroup.classList.remove('error', 'warning');
    
    if (underline) {
        underline.style.background = '#10f77e';
        underline.style.width = '100%';
    }
    
    if (input) {
        input.style.borderColor = '#10f77e';
        input.style.boxShadow = '0 0 20px rgba(16, 247, 126, 0.3)';
    }
    
    // Remover mensaje de error si existe
    const errorMsg = formGroup.querySelector('.mensaje-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

/**
 * Muestra advertencia en el campo
 */
function mostrarAdvertenciaCampo(formGroup, mensaje) {
    const input = formGroup.querySelector('input, select, textarea');
    const underline = formGroup.querySelector('.input-underline');
    
    formGroup.classList.add('warning');
    formGroup.classList.remove('error', 'success');
    
    if (underline) {
        underline.style.background = '#fbbf24';
        underline.style.width = '100%';
    }
    
    if (input) {
        input.style.borderColor = '#fbbf24';
        input.style.boxShadow = '0 0 20px rgba(251, 191, 36, 0.3)';
    }
    
    let warningMsg = formGroup.querySelector('.mensaje-warning');
    if (!warningMsg) {
        warningMsg = document.createElement('div');
        warningMsg.className = 'mensaje-warning';
        formGroup.appendChild(warningMsg);
    }
    
    warningMsg.textContent = mensaje;
    warningMsg.style.cssText = `
        color: #fbbf24;
        font-size: 0.75rem;
        margin-top: 0.5rem;
        display: block;
    `;
}

/**
 * Limpia errores del campo
 */
function limpiarErroresCampo(formGroup) {
    const input = formGroup.querySelector('input, select, textarea');
    const underline = formGroup.querySelector('.input-underline');
    
    formGroup.classList.remove('error', 'success', 'warning');
    
    if (underline) {
        underline.style.background = '';
        underline.style.width = '0';
    }
    
    if (input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
    
    const errorMsg = formGroup.querySelector('.mensaje-error');
    const warningMsg = formGroup.querySelector('.mensaje-warning');
    
    if (errorMsg) errorMsg.remove();
    if (warningMsg) warningMsg.remove();
}

/**
 * Agrega contador de caracteres al mensaje
 */
function agregarContadorCaracteresMensaje(campo) {
    const formGroup = campo.closest('.form-grupo');
    
    const contador = document.createElement('div');
    contador.className = 'contador-caracteres';
    contador.style.cssText = `
        color: var(--color-gris-claro);
        font-size: 0.75rem;
        text-align: right;
        margin-top: 0.5rem;
        font-family: var(--font-mono);
    `;
    
    formGroup.appendChild(contador);
    actualizarContadorCaracteres(campo);
}

/**
 * Actualiza el contador de caracteres
 */
function actualizarContadorCaracteres(campo) {
    const formGroup = campo.closest('.form-grupo');
    const contador = formGroup.querySelector('.contador-caracteres');
    
    if (contador) {
        const longitud = campo.value.length;
        const maximo = 1000;
        
        contador.textContent = `${longitud}/${maximo}`;
        
        if (longitud > maximo * 0.9) {
            contador.style.color = '#fbbf24';
        } else if (longitud > maximo * 0.7) {
            contador.style.color = '#00d4ff';
        } else {
            contador.style.color = 'var(--color-gris-claro)';
        }
    }
}

/**
 * Configura el envío del formulario
 */
function configurarEnvioFormulario() {
    const formulario = document.getElementById('form-contacto-venttion');
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        if (validarFormularioCompleto()) {
            enviarFormulario();
        }
    });
}

/**
 * Valida todo el formulario antes del envío
 */
function validarFormularioCompleto() {
    const campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        empresa: document.getElementById('empresa'),
        servicio: document.getElementById('servicio'),
        mensaje: document.getElementById('mensaje')
    };
    
    let esValido = true;
    
    // Validar cada campo
    if (!validarNombreCompleto(campos.nombre)) esValido = false;
    if (!validarEmailEmpresarial(campos.email)) esValido = false;
    if (!validarNombreEmpresa(campos.empresa)) esValido = false;
    if (!validarSeleccionServicio(campos.servicio)) esValido = false;
    if (!validarMensajeProyecto(campos.mensaje)) esValido = false;
    
    return esValido;
}

/**
 * Envía el formulario con efectos visuales
 */
function enviarFormulario() {
    const botonEnvio = document.querySelector('.boton-envio-futurista');
    const spinner = botonEnvio.querySelector('.boton-loading');
    const textoBoton = botonEnvio.querySelector('span');
    const icono = botonEnvio.querySelector('i');
    
    // Mostrar estado de carga
    botonEnvio.classList.add('loading');
    botonEnvio.disabled = true;
    
    // Simular envío (aquí se integraría con el backend real)
    setTimeout(() => {
        // Éxito en el envío
        botonEnvio.classList.remove('loading');
        botonEnvio.classList.add('success');
        botonEnvio.style.background = 'var(--color-success)';
        
        if (textoBoton) textoBoton.textContent = '¡Mensaje Enviado!';
        if (icono) icono.setAttribute('data-lucide', 'check');
        
        // Reinicializar iconos de Lucide
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Mostrar notificación de éxito
        mostrarNotificacionExito();
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
            resetearFormulario();
        }, 3000);
        
    }, 2000);
}

/**
 * Muestra notificación de éxito
 */
function mostrarNotificacionExito() {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-exito';
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <div class="notificacion-icono">✅</div>
            <div class="notificacion-texto">
                <h4>¡Mensaje enviado con éxito!</h4>
                <p>Nuestro equipo se pondrá en contacto contigo en las próximas 2 horas.</p>
            </div>
            <button class="cerrar-notificacion" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(16, 247, 126, 0.3);
        z-index: 2000;
        max-width: 400px;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notificacion.remove(), 500);
        }
    }, 5000);
}

/**
 * Resetea el formulario a su estado inicial
 */
function resetearFormulario() {
    const formulario = document.getElementById('form-contacto-venttion');
    const botonEnvio = document.querySelector('.boton-envio-futurista');
    
    // Limpiar formulario
    formulario.reset();
    
    // Resetear botón
    botonEnvio.classList.remove('success', 'loading');
    botonEnvio.disabled = false;
    botonEnvio.style.background = '';
    
    const textoBoton = botonEnvio.querySelector('span');
    const icono = botonEnvio.querySelector('i');
    
    if (textoBoton) textoBoton.textContent = 'Solicitar Consulta Gratuita';
    if (icono) icono.setAttribute('data-lucide', 'arrow-right');
    
    // Limpiar estados de los campos
    const formGroups = formulario.querySelectorAll('.form-grupo');
    formGroups.forEach(group => {
        limpiarErroresCampo(group);
    });
    
    // Reinicializar iconos
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Configura efectos visuales adicionales
 */
function configurarEfectosVisuales() {
    // Efecto focus mejorado para inputs
    const inputs = document.querySelectorAll('#form-contacto-venttion input, #form-contacto-venttion select, #form-contacto-venttion textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Configura los botones del hero para abrir formulario
 */
function configurarBotonesHero() {
    const btnDemo = document.getElementById('btn-demo');
    const btnConocer = document.getElementById('btn-conocer');
    
    if (btnDemo) {
        btnDemo.addEventListener('click', function() {
            // Scroll suave hasta el formulario de contacto
            const seccionContacto = document.getElementById('contacto');
            if (seccionContacto) {
                seccionContacto.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Pre-llenar el campo servicio con "demo"
                setTimeout(() => {
                    const servicioSelect = document.getElementById('servicio');
                    if (servicioSelect) {
                        servicioSelect.value = 'consultoria';
                        servicioSelect.focus();
                    }
                }, 1000);
            }
        });
    }
    
    if (btnConocer) {
        btnConocer.addEventListener('click', function() {
            const seccionNosotros = document.getElementById('nosotros');
            if (seccionNosotros) {
                seccionNosotros.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notificacion-contenido {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notificacion-icono {
        font-size: 24px;
    }
    
    .notificacion-texto h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
        font-weight: 600;
    }
    
    .notificacion-texto p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
    }
    
    .cerrar-notificacion {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
`;

document.head.appendChild(style); 