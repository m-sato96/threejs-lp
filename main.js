import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// シーン、カメラ、レンダラー
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 6;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

// マテリアル
const material = new THREE.MeshPhysicalMaterial({
  color: "#350075",
  metalness: 1,
  roughness: 0.37,
  clearcoat: 0.3,
  flatShading: true,
});

// メッシュ
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material);
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material);
const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material);

mesh1.position.set(2, 0, 0);
mesh2.position.set(-1, 0, 0);
mesh3.position.set(2, 0, -6);
mesh4.position.set(5, 0, 3);

scene.add(mesh1, mesh2, mesh3, mesh4);

// 光源
const directionalLight = new THREE.DirectionalLight("#fff", 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

// ブラウザリサイズ対応
function onWindowResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
}
window.addEventListener("resize", onWindowResize);

const animate = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
