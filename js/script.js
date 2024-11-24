// Define los enlaces a las redes sociales
const socialLinks = {
    whatsapp: "https://wa.me/3025934518",
    instagram: "https://www.instagram.com/jhojan_mendoza_16/",
    github: "https://github.com/JhojanSweetHeart"
};

document.getElementById("whatsapp").addEventListener("click", function() {
    window.open(socialLinks.whatsapp, "_blank");
});

document.getElementById("github").addEventListener("click", function() {
    window.open(socialLinks.github, "_blank");
});

document.getElementById("instagram").addEventListener("click", function() {
    window.open(socialLinks.instagram, "_blank");
});

// Inicialización de Particles.js
particlesJS("particles-js", {
    particles: {
      number: {
        value: 310,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#fff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
        },
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    retina_detect: true,
  });
  