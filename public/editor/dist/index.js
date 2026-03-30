import { explode, implode, concatArrayBuffers, sliceArrayBufferAt } from 'node-pkware/simple';
import { getHeaderSize } from 'arx-header-size';
import { FTS } from 'arx-convert';
import { AmbientLight, BufferAttribute, BufferGeometry, DirectionalLight, Euler, MathUtils, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, Timer, Vector3, WebGLRenderer, } from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { isQuad } from 'arx-convert/utils';
import { downloadBinaryAs, zipBuffers } from './download.js';
import { canvas, downloadBtn, isLoading, mouseLocked, mouseUnlocked } from './ui/ui.js';
// --------------------
async function wait(delayInMs) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delayInMs);
    });
}
async function getFTS(level) {
    console.log(`downloading level ${level} fts...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/fast.fts`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to load level ${level}: ${errorResponse}`);
    }
    console.log(`finished downloading level ${level} fts`);
    await wait(100);
    console.log(`unpacking level ${level} fts...`);
    const packedFts = await response.arrayBuffer();
    const headerSize = getHeaderSize(packedFts, 'fts');
    await wait(100);
    const [header, body] = sliceArrayBufferAt(packedFts, headerSize.total);
    await wait(100);
    const explodedBody = explode(body);
    await wait(100);
    const unpackedFts = concatArrayBuffers([header, explodedBody]);
    await wait(100);
    const fts = FTS.load(unpackedFts);
    console.log(`finished unpacking level ${level} fts`);
    return fts;
}
async function saveFTS(fts, level) {
    console.log(`packing level ${level} fts...`);
    await wait(100);
    console.time('FTS.save');
    const unpackedFts = FTS.save(fts); // 1739ms
    console.timeEnd('FTS.save');
    await wait(100);
    console.time('getHeaderSize');
    const headerSize = getHeaderSize(unpackedFts, 'fts'); // 0ms
    console.timeEnd('getHeaderSize');
    await wait(100);
    console.time('sliceArrayBufferAt');
    const [header, body] = sliceArrayBufferAt(unpackedFts, headerSize.total); // 5ms
    console.timeEnd('sliceArrayBufferAt');
    await wait(100);
    console.time('implode');
    const implodedBody = implode(body, 'binary', 'large'); // 14308ms in firefox, 9521ms in chrome
    console.timeEnd('implode');
    await wait(100);
    console.time('concatArrayBuffers');
    const packedFts = concatArrayBuffers([header, implodedBody]); // 3ms
    console.timeEnd('concatArrayBuffers');
    await wait(100);
    console.log(`finished packing level ${level} fts`);
    return packedFts;
}
// --------------------
const level = 11;
isLoading.currentValue = true;
const fts = await getFTS(level);
isLoading.currentValue = false;
downloadBtn.addEventListener('click', async () => {
    isLoading.currentValue = true;
    console.log('downloading');
    const packedFts = await saveFTS(fts, level);
    const zip = await zipBuffers({
        [`/game/graph/levels/level${level}/fast.fts`]: packedFts,
    });
    downloadBinaryAs('mod.zip', zip, 'application/zip');
    isLoading.currentValue = false;
});
// --------------------
const scene = new Scene();
const timer = new Timer();
timer.connect(document);
const offset = new Vector3(fts.polygons[0].vertices[0].x, fts.polygons[0].vertices[0].y, fts.polygons[0].vertices[0].z);
offset.add(new Vector3(50, 10, 50));
// --------------------
const vertices = [];
const normals = [];
fts.polygons.forEach((polygonData) => {
    if (isQuad(polygonData)) {
        const [a, b, c, d] = polygonData.vertices;
        // prettier-ignore
        vertices.push(-(a.x - offset.x), -(a.y - offset.y), a.z - offset.z, -(b.x - offset.x), -(b.y - offset.y), b.z - offset.z, -(c.x - offset.x), -(c.y - offset.y), c.z - offset.z, -(c.x - offset.x), -(c.y - offset.y), c.z - offset.z, -(b.x - offset.x), -(b.y - offset.y), b.z - offset.z, -(d.x - offset.x), -(d.y - offset.y), d.z - offset.z);
        const [nA, nB, nC, nD] = polygonData.normals ?? [
            polygonData.norm,
            polygonData.norm,
            polygonData.norm,
            polygonData.norm2,
        ];
        // prettier-ignore
        normals.push(nA.x, nA.y, nA.z, nB.x, nB.y, nB.z, nC.x, nC.y, nC.z, nC.x, nC.y, nC.z, nB.x, nB.y, nB.z, nD.x, nD.y, nD.z);
    }
    else {
        const [a, b, c] = polygonData.vertices;
        // prettier-ignore
        vertices.push(-(a.x - offset.x), -(a.y - offset.y), a.z - offset.z, -(b.x - offset.x), -(b.y - offset.y), b.z - offset.z, -(c.x - offset.x), -(c.y - offset.y), c.z - offset.z);
        // prettier-ignore
        const [nA, nB, nC] = polygonData.normals ?? [
            polygonData.norm,
            polygonData.norm,
            polygonData.norm,
        ];
        // prettier-ignore
        normals.push(nA.x, nA.y, nA.z, nB.x, nB.y, nB.z, nC.x, nC.y, nC.z);
    }
});
const geometry = new BufferGeometry();
geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
const material = new MeshPhongMaterial({ color: 0xaa_88_44 });
const polygon = new Mesh(geometry, material);
scene.add(polygon);
// --------------------
const white = 0xff_ff_ff;
const light1 = new DirectionalLight(white, 2);
light1.position.set(-1, 2, 4);
const light2 = new AmbientLight(white, 0.1);
scene.add(light1, light2);
// --------------------
const renderer = new WebGLRenderer({ antialias: true, canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;
const far = 10_000; // draw distance
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 500;
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
const controls = new PointerLockControls(camera, document.body);
const pressedKeys = {};
function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    const delta = timer.getDelta();
    controls.update(delta);
    renderer.render(scene, camera);
}
function animate() {
    timer.update();
    if (controls.isLocked) {
        mouseLocked.style.display = 'block';
        mouseUnlocked.style.display = 'none';
        const facing = new Vector3();
        camera.getWorldDirection(facing);
        const direction = new Vector3(0, 0, 0);
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
        if (pressedKeys.KeyA || pressedKeys.ArrowLeft) {
            const rotation = new Euler(0, MathUtils.degToRad(90), 0, 'XYZ');
            const sideDirection = facing.clone().applyEuler(rotation);
            sideDirection.y = 0;
            direction.add(sideDirection);
        }
        if (pressedKeys.KeyD || pressedKeys.ArrowRight) {
            const rotation = new Euler(0, MathUtils.degToRad(-90), 0, 'XYZ');
            const sideDirection = facing.clone().applyEuler(rotation);
            sideDirection.y = 0;
            direction.add(sideDirection);
        }
        if (pressedKeys.KeyW || pressedKeys.ArrowUp) {
            direction.add(facing);
        }
        if (pressedKeys.KeyS || pressedKeys.ArrowDown) {
            direction.add(facing.clone().negate());
        }
        const cameraSpeed = 10;
        direction.normalize();
        if (pressedKeys.ShiftLeft || pressedKeys.ShiftRight) {
            direction.multiplyScalar(cameraSpeed / 2);
        }
        else {
            direction.multiplyScalar(cameraSpeed);
        }
        camera.position.add(direction);
    }
    else {
        mouseLocked.style.display = 'none';
        mouseUnlocked.style.display = 'block';
    }
    render();
}
renderer.setAnimationLoop(animate);
function onKeyDown(event) {
    if (event.code === 'KeyEsc') {
        controls.unlock();
        return;
    }
    pressedKeys[event.code] = true;
}
function onKeyUp(event) {
    pressedKeys[event.code] = false;
}
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
canvas.addEventListener('click', () => {
    controls.lock();
});
window.addEventListener('blur', () => {
    controls.unlock();
});
// TODO: add point light that follows the camera
// TODO: add wireframe helper
// TODO: make movement speed adjustable
// TODO: make polygons double sided (toggleable)
// TODO: make transparent polygons look semi-transparent
// TODO: add gizmo - current gizmos I found seem to be not compatible with PointerLockControls
//# sourceMappingURL=index.js.map