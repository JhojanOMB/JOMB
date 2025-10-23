const viewer = document.getElementById('viewer');

function clamp(v,a=0,b=1){ return Math.max(a, Math.min(b, v)); }

window.addEventListener('scroll', () => {
  const prog = clamp(window.scrollY / (document.body.scrollHeight - window.innerHeight));
  const angle = prog * 360; // rotar 360 grados a lo largo del scroll
  // model-viewer acepta rotation en forma "xdeg ydeg zdeg"
  viewer.setAttribute('rotation', `0deg ${angle.toFixed(2)}deg 0deg`);
}, { passive: true });
