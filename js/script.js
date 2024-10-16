// Define los enlaces a las redes sociales
const socialLinks = {
    whatsapp: "https://wa.me/3212692311",
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