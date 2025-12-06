// share.js

// Texto base para compartir
function getShareData() {
  const url = window.location.href;
  const title = document.title || 'Batalla de Porteros 2025 · La Atajada';

  const text =
    'Mirá mi perfil en la Batalla de Porteros 2025 de La Atajada 🧤🔥';

  return { title, text, url };
}

// Botón principal: Web Share API (si existe)
function shareProfile() {
  const { title, text, url } = getShareData();

  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .catch((err) => {
        // Si el usuario cancela, no hacemos nada
        console.log('Share cancelado o fallido:', err);
      });
  } else {
    // Si no está soportado, hacemos fallback a copiar link
    copyLink(true);
  }
}

// Botón específico de WhatsApp
function shareOnWhatsApp() {
  const { text, url } = getShareData();
  const message = encodeURIComponent(`${text}\n\n${url}`);
  const waUrl = `https://wa.me/?text=${message}`;
  window.open(waUrl, '_blank');
}

// Copiar enlace al portapapeles
function copyLink(fromShareFallback = false) {
  const { url } = getShareData();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showCopiedMessage(
          fromShareFallback
            ? 'Tu navegador no permite compartir directo, pero ya copié el link. ¡Pégalo donde quieras! ✅'
            : 'Enlace copiado. ¡Pégalo en tus historias o mándalo a tus amigos! ✅'
        );
      })
      .catch(() => {
        fallbackCopy(url);
      });
  } else {
    fallbackCopy(url);
  }
}

// Fallback manual (por si no hay clipboard API)
function fallbackCopy(text) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  try {
    document.execCommand('copy');
    showCopiedMessage(
      'Enlace copiado. ¡Pégalo en tus historias o mándalo a tus amigos! ✅'
    );
  } catch (err) {
    alert('Copia este link manualmente:\n\n' + text);
  }
  document.body.removeChild(tempInput);
}

// Mensajito simple abajo a la derecha
function showCopiedMessage(message) {
  let toast = document.getElementById('copy-toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '16px';
    toast.style.right = '16px';
    toast.style.zIndex = '9999';
    toast.style.maxWidth = '260px';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '999px';
    toast.style.fontSize = '11px';
    toast.style.background =
      'linear-gradient(135deg, rgba(34,197,94,0.95), rgba(16,185,129,0.95))';
    toast.style.color = '#022c22';
    toast.style.boxShadow = '0 14px 35px rgba(0,0,0,0.5)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '6px';

    const icon = document.createElement('span');
    icon.textContent = '✅';
    icon.style.fontSize = '14px';

    const textNode = document.createElement('span');
    textNode.id = 'copy-toast-text';

    toast.appendChild(icon);
    toast.appendChild(textNode);

    document.body.appendChild(toast);
  }

  const textSpan = document.getElementById('copy-toast-text');
  textSpan.textContent = message;

  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  toast.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
  }, 2600);
}
