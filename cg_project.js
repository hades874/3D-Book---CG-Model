import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 6, 18);
camera.lookAt(0, 0, 0);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Textures
const textureLoader = new THREE.TextureLoader();

const wallTexture = textureLoader.load('texture/wall-2.jpg');
const floorTexture = textureLoader.load('texture/floor-2.jpg');
const coverTexture = textureLoader.load('texture/book-cover.jpg');
const ceilTexture = textureLoader.load('texture/ceil.jpg');

// Create room
const roomGeometry = new THREE.BoxGeometry(180, 50, 180);
const roomMaterials = [
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }),
    new THREE.MeshBasicMaterial({ map: ceilTexture, side: THREE.BackSide }),  
    new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide }), 
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), 
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide })  
];

const room = new THREE.Mesh(roomGeometry, roomMaterials);
room.position.set(0, 10, 0);
scene.add(room);

// Book model
var book = null;
const bookloader = new GLTFLoader();
bookloader.load('model/scene.gltf', function(gltf) {
    book = gltf.scene;
    book.scale.set(0.3, 0.3, 0.3);
    book.position.set(-1.2, -0.7, 3.5);
    scene.add(book);
}, undefined, function(error) {
    console.error('Error loading book model:', error);
});

// Lamp model
const lamploader = new GLTFLoader();
lamploader.load('model/lamp.glb', function(gltf) {
    const plant = gltf.scene;
    plant.scale.set(20, 20, 20); 
    plant.position.set(-10, -1, 0.5);
    scene.add(plant);
}, undefined, function(error) {
    console.error('Error loading lamp model:', error);
});

// Sofa model
const sofaloader = new GLTFLoader();
sofaloader.load('model/sofa_set.glb', function(gltf) {
    const sofa = gltf.scene;
    sofa.scale.set(15, 15, 15);
    sofa.position.set(60, -15, -60);
    sofa.rotation.y = -Math.PI/2;
    scene.add(sofa);
}, undefined, function(error) {
    console.error('Error loading sofa model:', error);
});

// tv model
const tvloader = new GLTFLoader();
tvloader.load('model/tv.glb', function(gltf) {
    const tv = gltf.scene;
    tv.scale.set(6, 6, 6);
    tv.position.set(-80, 0, -75);
    tv.rotation.y = Math.PI/2;
    scene.add(tv);
}, undefined, function(error) {
    console.error('Error loading TV model:', error);
});

// plant model
const plant1loader = new GLTFLoader();
plant1loader.load('model/plant-2.glb', function(gltf) {
    const plant1 = gltf.scene;
    plant1.scale.set(10, 12, 10);
    plant1.position.set(75, -15, -25);
    scene.add(plant1);
}, undefined, function(error) {
    console.error('Error loading plant1 model:', error);
});

const plant2loader = new GLTFLoader();
plant2loader.load('model/plant.glb', function(gltf) {
    const plant = gltf.scene;
    plant.scale.set(15, 15, 15);
    plant.position.set(-80, -15, -35);
    scene.add(plant);
}, undefined, function(error) {
    console.error('Error loading plant model:', error);
});

// vase model
const vaseloader = new GLTFLoader();
vaseloader.load('model/vase.glb', function(gltf) {
    const vase = gltf.scene;
    vase.scale.set(30, 30, 30);
    vase.position.set(22, -15, -80);
    scene.add(vase);
}, undefined, function(error) {
    console.error('Error loading vase model:', error);
});

// painting model
const paintingloader = new GLTFLoader();
paintingloader.load('model/painting.glb', function(gltf) {
    const painting = gltf.scene;
    painting.scale.set(20, 20, 20); 
    painting.position.set(-27, 10, -80);
    painting.rotation.y = -Math.PI/2;
    scene.add(painting);
}, undefined, function(error) {
    console.error('Error loading painting model:', error);
});

const loaderBookshelf = new GLTFLoader();
loaderBookshelf.load('model/bookshelf.glb', function(gltf) {
    const bookshelf = gltf.scene;
    bookshelf.scale.set(15, 15, 20);
    bookshelf.position.set(78, -15, 5); 
    bookshelf.rotation.y = Math.PI/2;
    scene.add(bookshelf);
}, undefined, function(error) {
    console.error('Error loading bookshelf model:', error);
});

// Create a book
const bookGroup = new THREE.Group();
bookGroup.position.set(0, -0.2, 0);
scene.add(bookGroup);

const coverGeometry = new THREE.BoxGeometry(8, 0.2, 10);
const coverMaterial = new THREE.MeshBasicMaterial({ map: coverTexture });

coverGeometry.translate(4, 0, 0);

const cover = new THREE.Mesh(coverGeometry, coverMaterial);
cover.position.set(0, 0.1, 0);
bookGroup.add(cover);

const pageGeometry = new THREE.BoxGeometry(8, 0.5, 10);
const mainBookTexture = textureLoader.load('texture/book-cover.jpg');
const mainBookPageTexture = textureLoader.load('texture/book_page-2.jpg');

const pageMaterial = [
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.FrontSide }), // Right face
    new THREE.MeshBasicMaterial({ map: mainBookTexture, side: THREE.FrontSide }), // Left face
    new THREE.MeshBasicMaterial({ map: mainBookPageTexture, side: THREE.FrontSide }), // Top face
    new THREE.MeshBasicMaterial({ map: mainBookTexture, side: THREE.FrontSide }), // Bottom face
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.FrontSide }), // Front face
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.FrontSide })  // Back face
];
const page = new THREE.Mesh(pageGeometry, pageMaterial);
page.position.set(4, -0.1, 0);
bookGroup.add(page);

// Book cover animation
cover.rotation.z = Math.PI/2; 
var coverRotation = cover.rotation.z;
var targetCoverRotation = 0;
var coverIsOpen = false;
var isAnimating = false;

function animateBookCover() {
    if (isAnimating) {
        if (Math.abs(coverRotation - targetCoverRotation) > 0.01) {
            coverRotation += (targetCoverRotation - coverRotation) * 0.05;
            cover.rotation.z = coverRotation;
        } else {
            cover.rotation.z = targetCoverRotation;
            isAnimating = false;
        }
    }
}

// Custom shader
const outlineShader = {
    uniforms: {
        "m": { value: new THREE.Matrix4() },
        "glowColor": { value: new THREE.Color(0xff0000) }, 
        "glowIntensity": { value: 1.0 }
    },
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        uniform float glowIntensity;
        varying vec3 vNormal;
        
        void main() {
            float intensity = pow(0.7 - dot(vNormal, normalize(vec3(0.0, 0.0, 1.0))), 3.0);
            gl_FragColor = vec4(glowColor * intensity * glowIntensity, 1.0);
        }
    `
};

// apply shaders
const outlineMaterial = new THREE.ShaderMaterial({
    vertexShader: outlineShader.vertexShader,
    fragmentShader: outlineShader.fragmentShader,
    uniforms: outlineShader.uniforms,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true
});

const bookOutline = new THREE.Mesh(coverGeometry, outlineMaterial);
bookOutline.scale.multiplyScalar(1.02);
bookGroup.add(bookOutline);

// table model
const tableLoader = new GLTFLoader();
tableLoader.load('model/table.glb', function(gltf) {
    const table = gltf.scene;
    table.scale.set(15, 15, 15);
    table.position.set(0, -15, 0);
    scene.add(table);
}, undefined, function(error) {
    console.error(error);
});

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 100, 50);
pointLight.position.set(10, 10, 10);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// window model
const windowLoader = new GLTFLoader();
windowLoader.load('model/gothic_window_with_painted_glass.glb', function(gltf) {
    const windowModel = gltf.scene;
    windowModel.scale.set(8, 4, 5);
    windowModel.position.set(-25, 3, 90);
    windowModel.rotation.y = Math.PI * 2;
    
    windowModel.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.7;
        }
    });
    scene.add(windowModel);
}, undefined, function(error) {
    console.error(error);
});

const windowLoader2 = new GLTFLoader();
windowLoader2.load('model/gothic_window_with_painted_glass.glb', function(gltf) {
    const windowModel = gltf.scene;
    windowModel.scale.set(8, 4, 5);
    windowModel.position.set(25, 3, 90);
    windowModel.rotation.y = Math.PI * 2;
    
    windowModel.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.7;
        }
    });
    scene.add(windowModel);
}, undefined, function(error) {
    console.error(error);
});

// animations
function animate() {
    requestAnimationFrame(animate);
    animateBookCover();

    const time = Date.now() * 0.002;
    pointLight.position.x = Math.cos(time) * 5;
    pointLight.position.z = Math.sin(time) * 5;
    pointLight.position.y = 3 + Math.sin(time * 2) * 1;

    renderer.render(scene, camera);
}
animate();

// Handle window size
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

var angle = 0;
const radius = 18;

function handleKeyboard(event) {
    if (event.key === 'ArrowLeft') {
        angle -= 0.05; 
    }
    if (event.key === 'ArrowRight') {
        angle += 0.05; 
    }
    if (event.key === 'ArrowUp') {
        camera.position.y += 0.5;
    }
    if (event.key === 'ArrowDown') {
        camera.position.y -= 0.5; 
    }

    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.lookAt(0, 0, 0);
}

window.addEventListener('keydown', handleKeyboard);

function handleMouseClick(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(mouseX, mouseY);
    raycaster.setFromCamera(mouseVector, camera);

    const intersects = raycaster.intersectObject(cover);

    if (intersects.length > 0 && !isAnimating) {
        targetCoverRotation = coverIsOpen ? Math.PI/2 : 0;
        coverIsOpen = !coverIsOpen;
        isAnimating = true;
    }
}

window.addEventListener('click', handleMouseClick);