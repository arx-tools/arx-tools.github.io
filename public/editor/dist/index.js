import { explode, implode, concatArrayBuffers, sliceArrayBufferAt } from 'node-pkware/simple';
import { getHeaderSize } from 'arx-header-size';
import { DLF, FTS, LLF } from 'arx-convert';
import { ArxPolygonFlags } from 'arx-convert/types';
import { BufferAttribute, BufferGeometry, DoubleSide, Euler, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PointLight, 
// PointLightHelper,
Scene, Timer, Vector3, WebGLRenderer, WireframeGeometry, } from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { isQuad } from 'arx-convert/utils';
import { downloadBinaryAs, zipBuffers } from './download.js';
import { cameraLightVisible, canvas, downloadBtn, isLoading, mouseLocked, mouseUnlocked, wireframeVisible, } from './ui/ui.js';
import { wait } from './functions.js';
import { Color } from './Color.js';
// --------------------
async function getFTS(level) {
    console.log(`[fts]: downloading level ${level} fts...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/fast.fts`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to download level ${level} fts: ${errorResponse}`);
    }
    console.log(`[fts]: finished downloading level ${level} fts`);
    await wait(100);
    console.log(`[fts]: unpacking level ${level} fts...`);
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
    console.log(`[fts]: finished unpacking level ${level} fts`);
    return fts;
}
async function getLLF(level) {
    console.log(`[llf]: downloading level ${level} llf...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/level${level}.llf`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to download level ${level} llf: ${errorResponse}`);
    }
    console.log(`[llf]: finished downloading level ${level} llf`);
    await wait(100);
    console.log(`[llf]: unpacking level ${level} llf...`);
    const packedLlf = await response.arrayBuffer();
    const headerSize = getHeaderSize(packedLlf, 'llf');
    await wait(100);
    const [header, body] = sliceArrayBufferAt(packedLlf, headerSize.total);
    await wait(100);
    const explodedBody = explode(body);
    await wait(100);
    const unpackedLlf = concatArrayBuffers([header, explodedBody]);
    await wait(100);
    const llf = LLF.load(unpackedLlf);
    console.log(`[llf]: finished unpacking level ${level} llf`);
    return llf;
}
async function getDLF(level) {
    console.log(`[dlf]: downloading level ${level} dlf...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/level${level}.dlf`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to download level ${level} dlf: ${errorResponse}`);
    }
    console.log(`[dlf]: finished downloading level ${level} dlf`);
    await wait(100);
    console.log(`[dlf]: unpacking level ${level} dlf...`);
    const packedDlf = await response.arrayBuffer();
    const headerSize = getHeaderSize(packedDlf, 'dlf');
    await wait(100);
    const [header, body] = sliceArrayBufferAt(packedDlf, headerSize.total);
    await wait(100);
    const explodedBody = explode(body);
    await wait(100);
    const unpackedDlf = concatArrayBuffers([header, explodedBody]);
    await wait(100);
    const dlf = DLF.load(unpackedDlf);
    console.log(`[dlf]: finished unpacking level ${level} dlf`);
    return dlf;
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
const level = Number.parseInt(new URLSearchParams(globalThis.location.search).get('level') ?? '11', 10);
function isValidArxLevelId(level) {
    if (Number.isNaN(level)) {
        return false;
    }
    const validArxLevelIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    return validArxLevelIds.includes(level);
}
if (!isValidArxLevelId(level)) {
    throw new Error(`Invalid level id "${level}"`);
}
isLoading.currentValue = true;
const [fts, llf, dlf] = await Promise.all([getFTS(level), getLLF(level), getDLF(level)]);
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
const offset = fts.sceneHeader.mScenePosition;
// --------------------
function createMesh(material, filter = () => true) {
    const vertices = [];
    const normals = [];
    fts.polygons.forEach((polygonData) => {
        if (filter(polygonData) === false) {
            return;
        }
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
            normals.push(-nA.x, -nA.y, nA.z, -nB.x, -nB.y, nB.z, -nC.x, -nC.y, nC.z, -nC.x, -nC.y, nC.z, -nB.x, -nB.y, nB.z, -nD.x, -nD.y, nD.z);
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
            normals.push(-nA.x, -nA.y, nA.z, -nB.x, -nB.y, nB.z, -nC.x, -nC.y, nC.z);
        }
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
    return new Mesh(geometry, material);
}
// --------------------
function isTransparent(flags) {
    return (flags & ArxPolygonFlags.Transparent) > 0;
}
function isDoubleSided(flags) {
    return (flags & ArxPolygonFlags.DoubleSided) > 0;
}
function isNoDraw(flags) {
    return (flags & ArxPolygonFlags.NoDraw) > 0;
}
const solidSingleSidedMaterial = new MeshLambertMaterial({ color: Color.white.getHex() });
const solidSingleSidedMesh = createMesh(solidSingleSidedMaterial, ({ flags }) => {
    return !isTransparent(flags) && !isDoubleSided(flags) && !isNoDraw(flags);
});
scene.add(solidSingleSidedMesh);
const solidDoubleSidedMaterial = new MeshLambertMaterial({ color: Color.white.getHex(), side: DoubleSide });
const solidDoubleSidedMesh = createMesh(solidDoubleSidedMaterial, ({ flags }) => {
    return !isTransparent(flags) && isDoubleSided(flags) && !isNoDraw(flags);
});
scene.add(solidDoubleSidedMesh);
const transparentMaterial = new MeshLambertMaterial({
    color: Color.white.getHex(),
    transparent: true,
    opacity: 0.5,
    side: DoubleSide,
});
const transparentMesh = createMesh(transparentMaterial, ({ flags }) => {
    return isTransparent(flags) && !isNoDraw(flags);
});
scene.add(transparentMesh);
// TODO: add noDraw polygons
// --------------------
// TODO: wireframe for the other polygons? (transparent, doublesided, etc...)
const wireframe = new WireframeGeometry(solidSingleSidedMesh.geometry);
const line = new LineSegments(wireframe, new MeshBasicMaterial({ color: Color.white.darken(50).getHex() }));
wireframeVisible.addEventListener('change', (event) => {
    if (event.detail?.currentValue === true) {
        scene.add(line);
    }
    else {
        scene.remove(line);
    }
});
if (wireframeVisible.currentValue === true) {
    scene.add(line);
}
// --------------------
const cameraLight = new PointLight(Color.white.getHex(), 10_000);
cameraLightVisible.addEventListener('change', (event) => {
    if (event.detail?.currentValue === true) {
        scene.add(cameraLight);
    }
    else {
        scene.remove(cameraLight);
    }
});
if (cameraLightVisible.currentValue === true) {
    scene.add(cameraLight);
}
// --------------------
const renderer = new WebGLRenderer({ antialias: true, canvas });
renderer.setClearColor(Color.white.darken(90).getHex());
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;
const far = 10_000;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-dlf.header.posEdit.x, -dlf.header.posEdit.y, dlf.header.posEdit.z);
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
        cameraLight.position.set(camera.position.x, camera.position.y, camera.position.z);
    }
    else {
        mouseLocked.style.display = 'none';
        mouseUnlocked.style.display = 'block';
    }
    render();
}
renderer.setAnimationLoop(animate);
cameraLight.position.set(camera.position.x, camera.position.y, camera.position.z);
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
// ------------------
for (const light of llf.lights) {
    const color = Color.fromArxColor(light.color);
    const colorIntensityMultiplier = 2000;
    const pointLight = new PointLight(color.getHex(), light.intensity * colorIntensityMultiplier, light.fallStart * colorIntensityMultiplier);
    pointLight.position.set(-light.pos.x, -light.pos.y, light.pos.z);
    scene.add(pointLight);
    // const helper = new PointLightHelper(pointLight, 10)
    // scene.add(helper)
}
// TODO: make lights toggleable
// TODO: when saving FTS data use the three.js mesh instead of the loaded FTS data
// TODO: add seedrandom package to the project + migrate "random" functions from arx-level-generator
// TODO: add gizmo - current gizmos I found seem to be not compatible with PointerLockControls
//# sourceMappingURL=index.js.map