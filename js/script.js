document.addEventListener('DOMContentLoaded', () => {
    // Configuración básica de la escena 3D
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    // Configuración del tamaño del renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    const modelContainer = document.getElementById('model-container');
    modelContainer.appendChild(renderer.domElement);
    
    // Configuración de la cámara
    camera.position.z = 5;

    // Agregar una luz a la escena
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Cargar el modelo FBX
    const loader = new THREE.FBXLoader();
    loader.load('path/to/your/model.fbx', (object) => {
        scene.add(object);
        // Asegúrate de limpiar cualquier fondo de color gris en caso de que el modelo se cargue correctamente
        modelContainer.style.backgroundColor = 'transparent';
    }, undefined, (error) => {
        console.error('Error loading the FBX model:', error);
        // Opcional: Cambia el color de fondo si el modelo no se carga
        modelContainer.style.backgroundColor = '#808080'; // Fondo gris en caso de error
    });

    // Función de animación
    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    // Ajustar el tamaño del renderer cuando se redimensiona la ventana
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
});
