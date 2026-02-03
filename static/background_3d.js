/**
 * 3D Background Animation - Horizontal Scrolling
 */

const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Colors
const colors = [0xe879f9, 0xa78bfa, 0x67e8f9, 0xf0abfc, 0xc084fc];

// Shapes
const shapes = [];
const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.7, 0.3, 16, 32),
    new THREE.SphereGeometry(0.8, 16, 16),
    new THREE.BoxGeometry(1, 1, 1)
];

for (let i = 0; i < 50; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.5,
        shininess: 100
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 120;
    mesh.position.y = (Math.random() - 0.5) * 50;
    mesh.position.z = (Math.random() - 0.5) * 30 - 15;
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random() * 1.5 + 0.5;
    mesh.scale.set(scale, scale, scale);

    mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.01,
        rotY: (Math.random() - 0.5) * 0.01,
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        origY: mesh.position.y
    };

    scene.add(mesh);
    shapes.push(mesh);
}

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light1 = new THREE.PointLight(0xe879f9, 1, 100);
light1.position.set(20, 20, 20);
scene.add(light1);
const light2 = new THREE.PointLight(0x67e8f9, 1, 100);
light2.position.set(-20, -20, 20);
scene.add(light2);

// Mouse
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Horizontal scroll
let scrollX = 0;
const content = document.querySelector('.content');
if (content) {
    content.addEventListener('scroll', () => { scrollX = content.scrollLeft; });
}

// Animate
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    targetX += (mouseX * 3 - targetX) * 0.05;
    targetY += (mouseY * 3 - targetY) * 0.05;

    camera.position.x = targetX + scrollX * 0.008;
    camera.position.y = targetY;
    camera.lookAt(scrollX * 0.008, 0, 0);

    shapes.forEach(s => {
        s.rotation.x += s.userData.rotX;
        s.rotation.y += s.userData.rotY;
        s.position.y = s.userData.origY + Math.sin(t * s.userData.floatSpeed + s.userData.floatOffset) * 1.5;
    });

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
