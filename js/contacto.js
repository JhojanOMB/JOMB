  document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Elementos del formulario y botón
    const form = document.getElementById('contact-form');
    const msgP = document.getElementById('form-msg');
    const btn = document.getElementById('submitBtn');
    const plane = document.getElementById('planeIcon');
    const text = document.getElementById('btnText');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxONhzAPwqITYawZ4qx7cvn4w4d8XLdC-FD3L7lclTToSvIFnPa3hnJTrUPznKpdvaXsA/exec';

    // Un solo submit para animación + envío
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msgP.classList.add('hidden');

      // 🔹 Animación
      plane.style.animation = "flyAway 1s forwards";
      text.classList.add("fade-out");
      btn.disabled = true;

      // 🔹 Datos
      const datos = {
        nombre: form.nombre.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        mensaje: form.mensaje.value.trim()
      };

      try {
        const respuesta = await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(datos),
          headers: { 'Content-Type': 'application/json' }
        });

        const json = await respuesta.json();

        msgP.textContent = (json.status === 'success' ? '✅ ' : '❌ ') + json.detail;
        msgP.className = 'mt-4 text-center ' + (json.status === 'success' ? 'text-green-600' : 'text-red-600');

        if (json.status === 'success') {
          form.reset();
        }
      } catch (err) {
        msgP.textContent = '❌ Error: ' + err.message;
        msgP.className = 'mt-4 text-center text-red-600';
      }

      msgP.classList.remove('hidden');
    });
  });
