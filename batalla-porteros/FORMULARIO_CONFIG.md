# Configuración del Formulario de Inscripción

Este documento explica cómo configurar el formulario de inscripción para que funcione en GitHub Pages (sitio estático).

## 📋 Opciones Disponibles

### Opción 1: Formspree (Recomendado) ⭐

**Ventajas:**
- ✅ Fácil de configurar
- ✅ Plan gratuito: 50 envíos/mes
- ✅ Soporta archivos adjuntos (hasta 10MB)
- ✅ Sin necesidad de backend
- ✅ Ideal para GitHub Pages

**Pasos para configurar:**

1. Ve a [https://formspree.io/](https://formspree.io/) y crea una cuenta gratuita
2. Haz clic en "New Form"
3. Nombre tu formulario (ej: "Batalla de Porteros 2025")
4. Copia el ID del formulario (ej: `xrgpwkdj`)
5. Abre el archivo `js/main.js`
6. Busca la línea: `const FORMPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';`
7. Reemplaza `YOUR_FORMSPREE_ID` con tu ID real
8. También actualiza el `action` en `index.html` (línea 574)
9. ¡Listo! El formulario comenzará a enviar emails a tu cuenta

**Ejemplo:**
```javascript
const FORMPREE_ENDPOINT = 'https://formspree.io/f/xrgpwkdj';
```

**Configuración de email:**
- Los emails llegarán a la dirección con la que te registraste en Formspree
- Puedes configurar un email diferente en la configuración del formulario
- Puedes agregar reenvíos automáticos a otros emails

---

### Opción 2: EmailJS

**Ventajas:**
- ✅ Plan gratuito: 100 emails/mes
- ✅ Más control sobre el formato del email
- ✅ Integración con Gmail, Outlook, etc.
- ✅ Templates personalizables

**Pasos para configurar:**

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/) y crea una cuenta
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea un template de email con los campos:
   - `{{nombre}}`
   - `{{edad}}`
   - `{{talla}}`
   - `{{metodo_pago}}`
4. Obtén tu Service ID, Template ID y Public Key
5. En `js/main.js`, descomenta las líneas de EmailJS
6. Reemplaza los valores con tus IDs
7. Descomenta y modifica el código de envío de EmailJS

**Ejemplo de template:**
```
Nueva inscripción - Batalla de Porteros 2025

Nombre: {{nombre}}
Edad: {{edad}}
Talla: {{talla}}
Método de pago: {{metodo_pago}}
```

---

### Opción 3: Web3Forms

**Ventajas:**
- ✅ Plan gratuito: 250 envíos/mes
- ✅ No requiere registro (usa Access Key)
- ✅ Fácil de implementar
- ✅ Soporta archivos adjuntos

**Pasos para configurar:**

1. Ve a [https://web3forms.com/](https://web3forms.com/)
2. Ingresa tu email y obtén tu Access Key
3. Reemplaza el código de Formspree con Web3Forms
4. El endpoint es: `https://api.web3forms.com/submit`
5. Agrega el Access Key como campo oculto

---

### Opción 4: Netlify Forms (Si migras a Netlify)

**Ventajas:**
- ✅ Plan gratuito: 100 envíos/mes
- ✅ Integración nativa con Netlify
- ✅ Sin configuración adicional si usas Netlify
- ✅ Dashboard integrado

**Pasos:**

1. Migra tu sitio a Netlify
2. Agrega `data-netlify="true"` al formulario
3. Agrega un campo oculto: `<input type="hidden" name="form-name" value="registration-form">`
4. ¡Listo! Los envíos aparecerán en el dashboard de Netlify

---

## 🎨 Modal Brutalista

El formulario ahora usa un modal personalizado en lugar de alerts. El modal:
- ✅ Tiene el mismo estilo brutalista de la página
- ✅ Muestra diferentes tipos de mensajes (éxito, error, advertencia, info)
- ✅ Incluye animaciones y efectos visuales
- ✅ Se puede cerrar con el botón, clic fuera, o tecla Escape

## 🔧 Solución de Problemas

### El formulario no envía emails

1. Verifica que hayas reemplazado `YOUR_FORMSPREE_ID` con tu ID real
2. Verifica que tu cuenta de Formspree esté activa
3. Revisa la consola del navegador (F12) para ver errores
4. Verifica que no hayas excedido el límite de envíos mensuales

### Los archivos adjuntos no se envían

1. Verifica que el archivo sea menor a 5MB (o 10MB en Formspree)
2. Verifica que el formato sea una imagen (PNG, JPG, JPEG)
3. En Formspree, asegúrate de tener el plan que soporta archivos adjuntos

### El modal no aparece

1. Verifica que el archivo `js/main.js` esté cargado correctamente
2. Revisa la consola del navegador para errores de JavaScript
3. Verifica que los IDs de los elementos del modal sean correctos

## 📝 Notas Adicionales

- El formulario valida automáticamente los campos antes de enviar
- Si seleccionas "Pago con tarjeta", el formulario se envía sin archivo adjunto
- Si seleccionas "Adjuntar boleta", el archivo es obligatorio
- Todos los campos son requeridos excepto la boleta cuando se paga con tarjeta

## 🚀 Próximos Pasos

1. Configura Formspree (u otra opción) siguiendo los pasos arriba
2. Prueba el formulario en tu entorno local
3. Verifica que recibes los emails correctamente
4. Personaliza los mensajes del modal si lo deseas
5. Haz deploy a GitHub Pages

---

¿Necesitas ayuda? Contacta al desarrollador o revisa la documentación oficial de cada servicio.


