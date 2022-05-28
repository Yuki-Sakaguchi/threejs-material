import './style.css';

import {
  Scene,
  WebGLRenderer,
  // OrthographicCamera,
  PerspectiveCamera,
  Mesh,
  SpotLight,
  BoxGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  AmbientLight
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene = new Scene();

// 通常のカメラ
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(20, 5, 20);

// 環境光を生成
const ambientLight = new AmbientLight(0xFFFFFF, 1.0);
scene.add(ambientLight);

// 証明を作成
const light = new SpotLight(0xEEEEEE, 1, 100, Math.PI / 4, 1);
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.position.set(0, 32, 0);
scene.add(light);

// レンダラー
const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
//@ts-ignore
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// カメラの視点移動
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// オブジェクト作成
const size = 4;
const geometry = new BoxGeometry(size, size, size);
const material = new MeshStandardMaterial({ color: 0xAA0000, roughness: 0.5 });
const object = new Mesh(geometry, material);
object.receiveShadow = true;
object.castShadow = true;
object.position.set(0, 0, 0);
scene.add(object);


// 床の生成
const plane = new Mesh(
  new PlaneGeometry(1000, 1000, 1, 1),
  new MeshStandardMaterial({ color: 0xEEEEEE, roughness: 0.0 })
);
plane.position.set(-5, -size, 0);
plane.rotateX(-0.5 * Math.PI);
plane.receiveShadow = true;
plane.castShadow = true;
scene.add(plane);

// アニメーション
const power = 0.01;
const animate = () => {
  requestAnimationFrame(animate);
  object.rotation.x += power;
  object.rotation.z += power;
  const t = Date.now() / 500;
  const ly = 1.5 + Math.sin(t);
  object.position.y = ly;
  renderer.render(scene, camera);
};
animate();

// リサイズ処理
const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
resize();
window.addEventListener('resize', resize);

