(() => {
  const create = (tag, props = {}, children = []) => {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'class') element.className = value;
      else if (key === 'html') element.innerHTML = value;
      else if (key === 'text') element.textContent = value;
      else element.setAttribute(key, value);
    });
    children.forEach((child) => element.appendChild(child));
    return element;
  };

  const clearChildren = (element) => element?.replaceChildren();
  const debounce = (callback, delay = 200) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), delay);
    };
  };

  window.appDom = { create, clearChildren, debounce };
})();
