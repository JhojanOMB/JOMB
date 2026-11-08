// contacto.js
function inicializarFormContacto() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const modal = document.getElementById("modal-msg");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.getElementById("closeModal");
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!modal || !modalText || !closeModal || !submitBtn) {
    console.error("El formulario de contacto no tiene todos sus controles requeridos.");
    return;
  }
  const consent = form.elements.namedItem("autorizacionDatos");
  const consentLabel = consent?.closest("label");
  let consentError = null;

  function clearConsentError() {
    consent?.removeAttribute("aria-invalid");
    consentError?.remove();
    consentError = null;
  }

  consent?.addEventListener("change", clearConsentError);

  // Validadores
  const validators = {
    nombre: v => v.trim().length >= 2 || "Ingresa un nombre válido (mínimo 2 letras).",
    correo: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(v) || "Ingresa un correo válido.",
    empresa: v => v.trim().length === 0 || v.trim().length >= 2 || "Ingresa un nombre de empresa válido (mínimo 2 letras) o déjalo vacío.",
    telefono: v => (/^[0-9]{7,15}$/).test(v) || "Ingresa un teléfono válido (7 a 15 números).",
    mensaje: v => v.trim().length >= 5 || "El mensaje debe tener al menos 5 caracteres."
  };

  // limpiar errores en un input
  function clearError(input) {
    input.classList.remove("border-red-500", "ring-red-300", "error");
    input.classList.remove("border-green-500", "ring-green-300", "success");
    const parent = input.closest(".relative") || input.parentElement;
    const err = parent.querySelector(".error-mesagge");
    if (err) err.remove();
  }

  // mostrar error
  function showError(input, message) {
    input.classList.remove("success", "border-green-500", "ring-green-300");
    input.classList.add("error", "border-red-500", "ring-red-300");

    const parent = input.closest(".relative") || input.parentElement;
    let err = parent.querySelector(".error-mesagge");
    if (!err) {
      err = document.createElement("p");
      err.className = "error-message mt-1 text-xs sm:text-sm text-red-500";
      parent.appendChild(err);
    }
    err.textContent = message;
  }

  // mostrar éxito
  function showSuccess(input) {
    input.classList.remove("error", "border-red-500", "ring-red-300");
    input.classList.add("success", "border-green-500", "ring-green-300");

    const parent = input.closest(".relative") || input.parentElement;
    const err = parent.querySelector(".error-message");
    if (err) err.remove();
  }

  // Validación en tiempo real
  form.querySelectorAll("input[name], textarea[name]").forEach(el => {
    el.addEventListener("blur", () => {
      if (!validators[el.name]) return;
      const res = validators[el.name] ? validators[el.name](el.value) : true;
      if (res === true) {
        showSuccess(el);
      } else {
        showError(el, res);
      }
    });
    el.addEventListener("input", () => clearError(el));
  });

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;
    const data = {};

    for (const name of ["nombre", "correo", "telefono", "mensaje", "empresa"]) {
      const el = form.elements[name];
      const value = el ? el.value : "";
      data[name] = value;
      const res = validators[name] ? validators[name](value) : true;
      if (res !== true) {
        valid = false;
        showError(el, res);
      } else {
        showSuccess(el);
      }
    }

    if (!valid) {
      const firstErr = form.querySelector(".error-message");
      if (firstErr) firstErr.previousElementSibling?.focus?.();
      return;
    }

    if (!consent || !consent.checked) {
      if (consent) {
        consent.setAttribute("aria-invalid", "true");
        consent.focus();
      }
      if (!consentError && consentLabel) {
        consentError = document.createElement("p");
        consentError.className = "mt-1 text-sm text-red-600";
        consentError.textContent = "Debes autorizar el tratamiento para enviar el formulario.";
        consentLabel.parentElement.appendChild(consentError);
      }
      return;
    }
    clearConsentError();

    // bloquear botón
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Enviando...';

    try {
      const formData = new FormData(form);
      const r = await fetch("https://script.google.com/macros/s/AKfycbxONhzAPwqITYawZ4qx7cvn4w4d8XLdC-FD3L7lclTToSvIFnPa3hnJTrUPznKpdvaXsA/exec", {
        method: "POST",
        body: formData
      });

      if (!r.ok) throw new Error(`El servicio respondió con HTTP ${r.status}.`);
      const json = await r.json();

      if (json.status === "success") {
        modalText.textContent = `✅ ${json.detail || "Tu mensaje fue enviado correctamente."}`;
        form.reset();
        submitBtn.innerHTML = 'Enviado ✅';
      } else {
        modalText.textContent = `❌ ${json.detail || "No fue posible enviar tu mensaje."}`;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    } catch (err) {
      console.error("No se pudo enviar el formulario de contacto:", err);
      modalText.textContent = "❌ No se pudo enviar el mensaje. Inténtalo más tarde o contáctanos por correo.";
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }

    modal.classList.remove("hidden");
    closeModal.focus();
  });

  // Cerrar modal
  function hideModal() {
    modal.classList.add("hidden");
    submitBtn.focus();
  }
  closeModal.addEventListener("click", hideModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) hideModal(); });
  modal.addEventListener("keydown", (e) => { if (e.key === "Escape") hideModal(); });
}
