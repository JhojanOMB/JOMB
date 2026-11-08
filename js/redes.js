const socialLinks = {
  whatsapp: "https://wa.me/573337472390",
  instagram: "https://www.instagram.com/jomb_tecnologias/",
  github: "https://github.com/JhojanOMB"
};

Object.entries(socialLinks).forEach(([name, url]) => {
  const link = document.getElementById(name);
  if (!link) return;

  if (link instanceof HTMLAnchorElement) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return;
  }

  link.addEventListener("click", () => {
    window.open(url, "_blank", "noopener,noreferrer");
  });
});