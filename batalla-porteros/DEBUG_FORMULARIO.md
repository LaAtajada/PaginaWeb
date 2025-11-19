# Guía de Debugging del Formulario

Si estás recibiendo el error "Error al enviar", sigue estos pasos:

## 🔍 Paso 1: Verificar la Consola del Navegador

1. Abre tu página en el navegador
2. Presiona **F12** (o clic derecho → Inspeccionar)
3. Ve a la pestaña **Console**
4. Intenta enviar el formulario nuevamente
5. Busca mensajes que empiecen con "Respuesta de Formspree" o "Error de Formspree"
6. Copia el mensaje de error completo

## 🔍 Paso 2: Verificar Configuración de Formspree

### Verificar que el endpoint sea correcto:
- Abre `js/main.js`
- Verifica que la línea 293 tenga: `const FORMPREE_ENDPOINT = 'https://formspree.io/f/mjkjbkvn';`
- Verifica que `index.html` línea 574 tenga: `action="https://formspree.io/f/mjkjbkvn"`

### Verificar en Formspree:
1. Ve a https://formspree.io/forms
2. Verifica que tu formulario esté **activo** (no deshabilitado)
3. Verifica que el ID del formulario coincida: `mjkjbkvn`

## 🔍 Paso 3: Verificar Verificación del Email

**IMPORTANTE:** Cuando creas un formulario nuevo en Formspree:

1. Formspree te envía un email de verificación
2. **DEBES hacer clic en el enlace del email** para activar el formulario
3. Hasta que no verifiques, el formulario NO funcionará

**Si no verificaste el email:**
- Busca el email de Formspree en tu bandeja de entrada (o spam)
- Haz clic en el enlace de verificación
- Intenta enviar el formulario nuevamente

## 🔍 Paso 4: Verificar Dominio

Si estás probando desde **localhost** o un **dominio no verificado**:

### Opción A: Probar desde GitHub Pages
1. Sube tus cambios a GitHub
2. Prueba el formulario desde la URL de GitHub Pages
3. Formspree debería funcionar desde GitHub Pages

### Opción B: Verificar dominio en Formspree
1. Ve a la configuración de tu formulario en Formspree
2. En "Allowed Domains", agrega tu dominio de GitHub Pages
3. O marca "Allow all domains" si estás en el plan gratuito

## 🔍 Paso 5: Verificar Límites

El plan gratuito de Formspree permite:
- ✅ 50 envíos por mes
- ✅ Archivos adjuntos hasta 10MB

**Si excediste el límite:**
- Espera hasta el próximo mes, o
- Actualiza a un plan de pago

## 🔍 Paso 6: Errores Comunes y Soluciones

### Error: "Endpoint de Formspree no encontrado" (404)
- **Causa:** El ID del formulario es incorrecto
- **Solución:** Verifica que `mjkjbkvn` sea el ID correcto en tu cuenta de Formspree

### Error: "Acceso denegado" (403)
- **Causa:** Dominio no permitido o formulario no verificado
- **Solución:** 
  1. Verifica el email de Formspree
  2. Agrega tu dominio en la configuración del formulario

### Error: "Límite de envíos excedido" (429)
- **Causa:** Has excedido los 50 envíos/mes
- **Solución:** Espera hasta el próximo mes o actualiza tu plan

### Error: "El formulario necesita verificación"
- **Causa:** No has verificado el email de Formspree
- **Solución:** Busca el email y haz clic en el enlace de verificación

### Error: "Error de conexión"
- **Causa:** Problema de red o CORS
- **Solución:** 
  1. Verifica tu conexión a internet
  2. Prueba desde otro navegador
  3. Verifica que no haya un bloqueador de anuncios bloqueando las peticiones

## 🔍 Paso 7: Probar el Endpoint Directamente

Puedes probar si el endpoint funciona haciendo una petición desde la consola:

```javascript
// Pega esto en la consola del navegador (F12)
fetch('https://formspree.io/f/mjkjbkvn', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Prueba',
    edad: '25',
    talla: 'M',
    'metodo-pago': 'tarjeta',
    _subject: 'Prueba de formulario'
  })
})
.then(r => r.json())
.then(data => console.log('Éxito:', data))
.catch(err => console.error('Error:', err));
```

Si esto funciona, el problema está en el código del formulario.
Si no funciona, el problema está en la configuración de Formspree.

## 📞 Obtener Ayuda

Si después de seguir estos pasos aún tienes problemas:

1. **Copia el mensaje de error completo** de la consola
2. **Toma una captura de pantalla** de la configuración de Formspree
3. **Verifica** que hayas seguido todos los pasos anteriores

## ✅ Checklist Rápido

- [ ] Endpoint correcto en `js/main.js` (línea 293)
- [ ] Action correcto en `index.html` (línea 574)
- [ ] Email de Formspree verificado
- [ ] Formulario activo en Formspree
- [ ] No excedido el límite de 50 envíos/mes
- [ ] Dominio permitido en Formspree (si es necesario)
- [ ] Probando desde GitHub Pages o dominio verificado
- [ ] Revisado la consola del navegador para ver el error específico

---

**Nota:** El código ahora muestra mensajes de error más específicos. Siempre revisa la consola del navegador (F12) para ver el error exacto que está devolviendo Formspree.



