// Define los enlaces a las redes sociales
const socialLinks = {
    whatsapp: "https://wa.me/3212692311"
};

document.getElementById("whatsapp").addEventListener("click", function() {
    window.open(socialLinks.whatsapp, "_blank");
});
