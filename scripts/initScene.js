// initScene.js
// Sets up the Three.js scene, renderer, camera, and OrbitControls
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function initScene(canvas) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(6, 5, 8);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.target.set(0, 0.7, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export { initScene, scene, camera, renderer, controls, onWindowResize }; 