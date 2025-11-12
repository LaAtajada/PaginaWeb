// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Hero glitch al cargar (300ms)
(function(){
  const el = document.getElementById('hero-glitch');
  if (!el) return;
  el.classList.add('glitch');
  setTimeout(()=> el.classList.remove('glitch'), 300);
})();


// Lightbox para galería
(function(){
  const grid = document.getElementById('gallery-grid');
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const close = document.getElementById('lightbox-close');
  if (!grid || !box || !img || !close) return;

  const open = (src, alt) => {
    img.src = src; img.alt = alt || '';
    box.classList.remove('hidden'); box.classList.add('flex');
  };
  const hide = () => {
    box.classList.add('hidden'); box.classList.remove('flex');
    img.src = ''; img.alt = '';
  };

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gal-item');
    if (!item) return;
    open(item.dataset.src, item.dataset.alt);
  });
  close.addEventListener('click', hide);
  box.addEventListener('click', (e) => { if (e.target === box) hide(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') hide(); });
})();

// FAQ: solo un <details> abierto a la vez
(function(){
  const wrap = document.getElementById('faq-accordion');
  if (!wrap) return;
  const items = Array.from(wrap.querySelectorAll('details'));
  items.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        items.forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });
})();



// Menú mobile: estado robusto, sin clases de Tailwind
(function(){
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  const iBurger = document.getElementById('iconBurger');
  const iClose  = document.getElementById('iconClose');
  if (!header || !toggle || !menu) return;

  // Estado cerrado forzado (por si el CSS/SSR lo deja “abierto”)
  function setOpen(isOpen){
    if (isOpen) {
      header.classList.add('open');
      menu.classList.remove('pointer-events-none','opacity-0','-translate-y-2');
      toggle.setAttribute('aria-expanded','true');
      if (iBurger) iBurger.classList.add('hide');
      if (iClose)  iClose.classList.remove('hide');
    } else {
      header.classList.remove('open');
      menu.classList.add('pointer-events-none','opacity-0','-translate-y-2');
      toggle.setAttribute('aria-expanded','false');
      if (iBurger) iBurger.classList.remove('hide');
      if (iClose)  iClose.classList.add('hide');
    }
  }

  // Cerrar al cargar (clave para tu caso)
  document.addEventListener('DOMContentLoaded', () => setOpen(false));

  const isOpen = () => header.classList.contains('open');
  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Cierra al hacer click en un link dentro del menú
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) setOpen(false);
  });

  // Cierra con Escape y al click fuera
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) setOpen(false);
  });
})();


// Modal brutalista para mensajes
function showModal(type, title, message) {
  const modal = document.getElementById('form-modal');
  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalContent = document.getElementById('modal-content');
  
  if (!modal || !modalIcon || !modalTitle || !modalMessage) return;
  
  // Configurar contenido según el tipo
  if (type === 'success') {
    modalIcon.innerHTML = '<i class="bi bi-check-circle-fill text-brutalist-orange"></i>';
    modalTitle.textContent = title || '¡Éxito!';
    modalContent.classList.remove('error');
  } else if (type === 'error') {
    modalIcon.innerHTML = '<i class="bi bi-x-circle-fill text-brutalist-orange"></i>';
    modalTitle.textContent = title || 'Error';
    modalContent.classList.add('error');
  } else if (type === 'warning') {
    modalIcon.innerHTML = '<i class="bi bi-exclamation-triangle-fill text-brutalist-orange"></i>';
    modalTitle.textContent = title || 'Atención';
    modalContent.classList.remove('error');
  } else {
    modalIcon.innerHTML = '<i class="bi bi-info-circle-fill text-brutalist-orange"></i>';
    modalTitle.textContent = title || 'Información';
    modalContent.classList.remove('error');
  }
  
  modalMessage.textContent = message;
  
  // Mostrar modal
  modal.style.display = 'flex';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Agregar efecto glitch si es error
  if (type === 'error') {
    setTimeout(() => {
      modalContent.classList.add('glitch');
      setTimeout(() => modalContent.classList.remove('glitch'), 300);
    }, 100);
  }
}

function closeModal() {
  const modal = document.getElementById('form-modal');
  if (!modal) return;
  
  modal.style.display = 'none';
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

// Cerrar modal al hacer clic en el botón o fuera del modal
(function() {
  const modal = document.getElementById('form-modal');
  const closeBtn = document.getElementById('modal-close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display !== 'none') {
        closeModal();
      }
    });
  }
})();

// Formulario de inscripción: manejo de vista previa de imagen
function handleFileSelect(input) {
  const file = input.files[0];
  if (!file) return;

  // Validar tamaño (5MB máximo)
  const maxSize = 5 * 1024 * 1024; // 5MB en bytes
  if (file.size > maxSize) {
    showModal('error', 'Archivo demasiado grande', 'El archivo es demasiado grande. Por favor, selecciona una imagen de máximo 5MB.');
    input.value = '';
    return;
  }

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    showModal('error', 'Tipo de archivo inválido', 'Por favor, selecciona solo archivos de imagen (PNG, JPG, JPEG).');
    input.value = '';
    return;
  }

  // Crear vista previa
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const fileLabel = document.getElementById('file-label');
    
    previewImg.src = e.target.result;
    preview.classList.remove('hidden');
    fileLabel.textContent = file.name;
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  const input = document.getElementById('boleta');
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const fileLabel = document.getElementById('file-label');
  
  input.value = '';
  preview.classList.add('hidden');
  previewImg.src = '';
  fileLabel.textContent = 'Haz clic para subir la imagen de tu boleta';
}

// Manejo del método de pago
function selectPaymentMethod(method) {
  const radio = method === 'card' ? document.getElementById('pago-tarjeta') : document.getElementById('pago-boleta');
  if (radio) {
    radio.checked = true;
    togglePaymentMethod(method);
  }
}

function togglePaymentMethod(method) {
  const tarjetaSection = document.getElementById('pago-tarjeta-section');
  const boletaSection = document.getElementById('boleta-section');
  const boletaInput = document.getElementById('boleta');
  const submitButton = document.querySelector('button[type="submit"]');
  
  if (method === 'card') {
    // Mostrar sección de pago con tarjeta, ocultar boleta
    tarjetaSection.classList.remove('hidden');
    boletaSection.classList.add('hidden');
    boletaInput.removeAttribute('required');
    // Limpiar archivo si había uno seleccionado
    if (boletaInput.files.length > 0) {
      removeImage();
    }
    // Cambiar texto del botón de envío
    if (submitButton) {
      submitButton.textContent = 'Confirmar Inscripción';
    }
  } else {
    // Mostrar sección de boleta, ocultar pago con tarjeta
    tarjetaSection.classList.add('hidden');
    boletaSection.classList.remove('hidden');
    boletaInput.setAttribute('required', 'required');
    // Restaurar texto del botón de envío
    if (submitButton) {
      submitButton.textContent = 'Enviar inscripción';
    }
  }
}

// Inicializar el estado del formulario al cargar
(function() {
  // Por defecto, "Adjuntar boleta" está seleccionado (checked)
  const boletaRadio = document.getElementById('pago-boleta');
  if (boletaRadio && boletaRadio.checked) {
    togglePaymentMethod('boleta');
  }
})();

// Manejo del envío del formulario con Formspree
(function(){
  const form = document.getElementById('registration-form');
  if (!form) return;

  // OPCIÓN 1: Formspree (Recomendado para GitHub Pages)
  // Reemplaza 'YOUR_FORMSPREE_ID' con tu ID de Formspree
  // Para obtenerlo: https://formspree.io/ - Registrate gratis y crea un formulario
  const FORMPREE_ENDPOINT = 'https://getform.io/f/bxozqmka';
  
  // OPCIÓN 2: EmailJS (Alternativa)
  // Descomenta si prefieres usar EmailJS en lugar de Formspree
  // const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  // const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  // const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validación básica
    const nombre = document.getElementById('nombre').value.trim();
    const edad = document.getElementById('edad').value;
    const talla = document.getElementById('talla').value;
    const telefono = document.getElementById('telefono').value;
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked')?.value;
    const boleta = document.getElementById('boleta').files[0];
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!nombre || !edad || !talla || !telefono) {
      showModal('error', 'Campos incompletos', 'Por favor, completa todos los campos requeridos del formulario.');
      return;
    }
    
    // Validar boleta solo si el método de pago es "boleta"
    if (metodoPago === 'boleta' && !boleta) {
      showModal('error', 'Boleta requerida', 'Por favor, adjunta la imagen de tu boleta de pago.');
      return;
    }
    
    // Si es pago con tarjeta, mostrar mensaje informativo
    if (metodoPago === 'tarjeta') {
      showModal('warning', 
        'Pago con tarjeta', 
        'Recuerda completar el pago con tarjeta en la ventana que se abrió. Una vez completado el pago, tu inscripción será procesada automáticamente.'
      );
      
      // Aquí puedes enviar también los datos básicos del formulario
      // aunque el pago se procese por separado
      try {
        await submitFormData(nombre, edad, talla, telefono, metodoPago, null);
      } catch (error) {
        console.error('Error al enviar datos:', error);
      }
      return;
    }
    
    // Si es boleta, enviar el formulario con la imagen
    try {
      // Deshabilitar botón mientras se envía
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }
      
      await submitFormData(nombre, edad, talla, telefono, metodoPago, boleta);
      
      // Mostrar mensaje de éxito
      showModal('success', 
        '¡Formulario enviado!', 
        'Tu inscripción ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto para confirmar tu participación.'
      );
      
      // Limpiar formulario después del envío
      form.reset();
      removeImage();
      togglePaymentMethod('boleta'); // Resetear método de pago
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      
      // Mensaje de error más específico
      let errorMessage = 'Hubo un problema al enviar tu formulario. ';
      
      if (error.message.includes('connection') || error.message.includes('conexión')) {
        errorMessage += 'Verifica tu conexión a internet e intenta nuevamente.';
      } else if (error.message.includes('limit') || error.message.includes('límite')) {
        errorMessage += 'Se ha alcanzado el límite de envíos. Por favor, contacta directamente.';
      } else if (error.message.includes('invalid') || error.message.includes('válido')) {
        errorMessage += 'El formulario tiene un error de configuración. Por favor, contacta al administrador.';
      } else {
        errorMessage += `Error: ${error.message}. Por favor, intenta nuevamente o contacta directamente a través de WhatsApp.`;
      }
      
      showModal('error', 
        'Error al enviar', 
        errorMessage
      );
    } finally {
      // Rehabilitar botón
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar inscripción';
      }
    }
  });

  // Función para enviar datos del formulario
  async function submitFormData(nombre, edad, talla, telefono, metodoPago, boletaFile) {
    // Crear FormData
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('edad', edad);
    formData.append('talla', talla);
    formData.append('telefono', telefono);
    formData.append('metodo-pago', metodoPago);
    
    if (boletaFile) {
      formData.append('boleta', boletaFile);
    }
    
    // Agregar campos adicionales de Formspree
    formData.append('_subject', 'Nueva inscripción - Batalla de Porteros 2025');
    formData.append('_format', 'plain');
    formData.append('_replyto', ''); // Opcional: puedes agregar un email aquí
    
    try {
      // Enviar a Formspree
      // NOTA: No incluyas Content-Type cuando envías FormData, el navegador lo hace automáticamente
      const response = await fetch(FORMPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Obtener la respuesta como texto primero para debugging
      const responseText = await response.text();
      console.log('Respuesta de Formspree (status:', response.status, '):', responseText);
      
      // Intentar parsear como JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        // Si no es JSON, podría ser un error HTML o página de verificación
        console.error('Respuesta no válida de Formspree (no es JSON):', responseText.substring(0, 200));
        
        // Si es un error 429 (demasiadas solicitudes)
        if (response.status === 429) {
          throw new Error('Límite de envíos excedido. Por favor, intenta más tarde.');
        }
        
        // Si es un error 404, el endpoint es incorrecto
        if (response.status === 404) {
          throw new Error('Endpoint de Formspree no encontrado. Verifica que el ID del formulario sea correcto.');
        }
        
        // Si es un error 403, puede ser problema de dominio o verificación
        if (response.status === 403) {
          throw new Error('Acceso denegado. Verifica que hayas confirmado el primer email de Formspree y que tu dominio esté permitido.');
        }
        
        throw new Error(`Formspree devolvió una respuesta no válida (Status: ${response.status}). Verifica la consola para más detalles.`);
      }
      
      // Formspree puede devolver diferentes formatos:
      // - { next: "..." } cuando necesita verificación
      // - { ok: true } cuando es exitoso
      // - { error: "mensaje" } cuando hay error
      // - { errors: [...] } cuando hay errores de validación
      
      // Verificar si necesita verificación
      if (result.next) {
        console.warn('Formspree requiere verificación:', result.next);
        throw new Error('El formulario necesita verificación. Revisa tu email y confirma el formulario de Formspree.');
      }
      
      // Verificar errores en la respuesta
      if (result.errors && result.errors.length > 0) {
        const errorMessages = result.errors.map(e => e.message || e).join(', ');
        console.error('Errores de Formspree:', errorMessages);
        throw new Error(errorMessages);
      }
      
      if (result.error) {
        console.error('Error de Formspree:', result.error);
        throw new Error(result.error);
      }
      
      // Verificar status HTTP
      if (!response.ok) {
        const errorMessage = result.message || result.error || `Error ${response.status}: ${response.statusText}`;
        console.error('Error HTTP de Formspree:', errorMessage);
        throw new Error(errorMessage);
      }
      
      // Si llegamos aquí, fue exitoso
      console.log('Formulario enviado exitosamente:', result);
      return result;
    } catch (error) {
      // Si es un error de red, mostrar mensaje más específico
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('Error de red:', error);
        throw new Error('Error de conexión. Verifica tu conexión a internet e intenta nuevamente.');
      }
      // Re-lanzar otros errores
      throw error;
    }
  }
})();


