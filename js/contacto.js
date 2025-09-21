// contacto.js
function inicializarFormContacto() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const modal = document.getElementById("modal-msg");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.getElementById("closeModal");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // --- VALIDACIONES ---
    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim();
    const telefono = form.telefono.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (nombre.length < 2) {
      mostrarModal("❌ Ingresa un nombre válido (mínimo 2 letras).");
      return;
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      mostrarModal("❌ Ingresa un correo válido.");
      return;
    }

    const telRegex = /^[0-9]{7,15}$/;
    if (!telRegex.test(telefono)) {
      mostrarModal("❌ Ingresa un teléfono válido (7 a 15 números).");
      return;
    }

    if (mensaje.length < 5) {
      mostrarModal("❌ El mensaje debe tener al menos 5 caracteres.");
      return;
    }

    // --- BLOQUEAR BOTÓN ---
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      const datos = new FormData(form);
      const r = await fetch(
        "https://script.google.com/macros/s/AKfycbxONhzAPwqITYawZ4qx7cvn4w4d8XLdC-FD3L7lclTToSvIFnPa3hnJTrUPznKpdvaXsA/exec",
        {
          method: "POST",
          body: datos,
        }
      );

      const json = await r.json();

      if (json.status === "success") {
        mostrarModal("✅ " + json.detail);
        form.reset();
      } else {
        mostrarModal("❌ " + json.detail);
      }
    } catch (err) {
      mostrarModal("❌ Error: " + err.message);
    }

    // --- DESBLOQUEAR BOTÓN ---
    submitBtn.disabled = false;
    submitBtn.textContent = "Enviar Mensaje";
  });

  // Función para mostrar el modal
  function mostrarModal(msg) {
    modalText.textContent = msg;
    modal.classList.remove("hidden");
  }

  // Eventos para cerrar modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}
