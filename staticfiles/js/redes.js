// Define los enlaces a las redes sociales
const socialLinks = {
  whatsapp: "https://wa.me/3025934518",
  instagram: "https://www.instagram.com/jomb_tecnologias/",
  github: "https://github.com/JhojanOMB"
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