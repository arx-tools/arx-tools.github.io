import { explode, implode, concatArrayBuffers, sliceArrayBufferAt } from 'node-pkware/simple';
import { getHeaderSize } from 'arx-header-size';
import { DLF, FTS, LLF } from 'arx-convert';
import { BufferAttribute, BufferGeometry, DoubleSide, Euler, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PointLight, Raycaster, Scene, Timer, Triangle, Vector2, Vector3, WebGLRenderer, WireframeGeometry, } from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js';
import { isQuad } from 'arx-convert/utils';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import { downloadBinaryAs, zipBuffers } from './download.js';
import { cameraLightVisible, canvas, downloadBtn, isLoading, mouseLocked, mouseUnlocked, wireframeVisible, } from './ui/ui.js';
import { arxVector3toVector3, isDoubleSided, isNoDraw, isTransparent, wait } from './functions.js';
import { Color } from './Color.js';
import { isValidOriginalArxLevelId } from './constants.js';
Mesh.prototype.raycast = acceleratedRaycast;
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
    console.log(`[fts]: packing level ${level} fts...`);
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
    console.log(`[fts]: finished packing level ${level} fts`);
    return packedFts;
}
async function saveLLF(llf, level) {
    console.log(`[llf]: packing level ${level} llf...`);
    await wait(100);
    console.time('LLF.save');
    const unpackedLlf = LLF.save(llf);
    console.timeEnd('LLF.save');
    await wait(100);
    console.time('getHeaderSize');
    const headerSize = getHeaderSize(unpackedLlf, 'llf');
    console.timeEnd('getHeaderSize');
    await wait(100);
    console.time('sliceArrayBufferAt');
    const [header, body] = sliceArrayBufferAt(unpackedLlf, headerSize.total);
    console.timeEnd('sliceArrayBufferAt');
    await wait(100);
    console.time('implode');
    const implodedBody = implode(body, 'binary', 'large');
    console.timeEnd('implode');
    await wait(100);
    console.time('concatArrayBuffers');
    const packedLlf = concatArrayBuffers([header, implodedBody]);
    console.timeEnd('concatArrayBuffers');
    await wait(100);
    console.log(`[llf]: finished packing level ${level} llf`);
    return packedLlf;
}
async function saveDLF(dlf, level) {
    console.log(`[dlf]: packing level ${level} dlf...`);
    await wait(100);
    console.time('DLF.save');
    const unpackedDlf = DLF.save(dlf);
    console.timeEnd('DLF.save');
    await wait(100);
    console.time('getHeaderSize');
    const headerSize = getHeaderSize(unpackedDlf, 'dlf');
    console.timeEnd('getHeaderSize');
    await wait(100);
    console.time('sliceArrayBufferAt');
    const [header, body] = sliceArrayBufferAt(unpackedDlf, headerSize.total);
    console.timeEnd('sliceArrayBufferAt');
    await wait(100);
    console.time('implode');
    const implodedBody = implode(body, 'binary', 'large');
    console.timeEnd('implode');
    await wait(100);
    console.time('concatArrayBuffers');
    const packedDlf = concatArrayBuffers([header, implodedBody]);
    console.timeEnd('concatArrayBuffers');
    await wait(100);
    console.log(`[dlf]: finished packing level ${level} dlf`);
    return packedDlf;
}
// --------------------
const level = Number.parseInt(new URLSearchParams(globalThis.location.search).get('level') ?? '11', 10);
if (!isValidOriginalArxLevelId(level)) {
    throw new Error(`Invalid level id "${level}"`);
}
isLoading.currentValue = true;
const [fts, llf, dlf] = await Promise.all([getFTS(level), getLLF(level), getDLF(level)]);
isLoading.currentValue = false;
downloadBtn.addEventListener('click', async () => {
    isLoading.currentValue = true;
    // TODO: generate fts, llf and dlf from scene
    console.log('downloading');
    const [packedFts, packedLlf, packedDlf] = await Promise.all([
        saveFTS(fts, level),
        saveLLF(llf, level),
        saveDLF(dlf, level),
    ]);
    const zip = await zipBuffers({
        [`/game/graph/levels/level${level}/fast.fts`]: packedFts,
        [`/graph/levels/level${level}/level${level}.llf`]: packedLlf,
        [`/graph/levels/level${level}/level${level}.dlf`]: packedDlf,
    });
    downloadBinaryAs('mod.zip', zip, 'application/zip');
    isLoading.currentValue = false;
});
// --------------------
const scene = new Scene();
const timer = new Timer();
timer.connect(document);
const raycaster = new Raycaster();
// --------------------
function createMesh(material, offset, filter = () => true) {
    const vertices = [];
    const normals = [];
    const uvs = [];
    fts.polygons.forEach((polygonData) => {
        if (filter(polygonData) === false) {
            return;
        }
        if (isQuad(polygonData)) {
            const [a, b, c, d] = polygonData.vertices.map(({ x, y, z }) => {
                return new Vector3(x, y, z).sub(offset).multiply(new Vector3(-1, -1, 1));
            });
            // prettier-ignore
            vertices.push(...a.toArray(), ...b.toArray(), ...c.toArray(), ...c.toArray(), ...b.toArray(), ...d.toArray());
            const [nA, nB, nC, nD] = (polygonData.normals ?? [polygonData.norm, polygonData.norm, polygonData.norm, polygonData.norm2]).map(({ x, y, z }) => {
                return new Vector3(x, y, z).multiply(new Vector3(-1, -1, 1));
            });
            // prettier-ignore
            normals.push(...nA.toArray(), ...nB.toArray(), ...nC.toArray(), ...nC.toArray(), ...nB.toArray(), ...nD.toArray());
            const [uvA, uvB, uvC, uvD] = polygonData.vertices.map(({ u, v }) => {
                return new Vector2(u, v);
            });
            // prettier-ignore
            uvs.push(...uvA.toArray(), ...uvB.toArray(), ...uvC.toArray(), ...uvC.toArray(), ...uvB.toArray(), ...uvD.toArray());
        }
        else {
            const [a, b, c] = polygonData.vertices.map(({ x, y, z }) => {
                return new Vector3(x, y, z).sub(offset).multiply(new Vector3(-1, -1, 1));
            });
            // prettier-ignore
            vertices.push(...a.toArray(), ...b.toArray(), ...c.toArray());
            const [nA, nB, nC] = (polygonData.normals ?? [polygonData.norm, polygonData.norm, polygonData.norm]).map(({ x, y, z }) => {
                return new Vector3(x, y, z).multiply(new Vector3(-1, -1, 1));
            });
            // prettier-ignore
            normals.push(...nA.toArray(), ...nB.toArray(), ...nC.toArray());
            const [uvA, uvB, uvC] = polygonData.vertices.map(({ u, v }) => {
                return new Vector2(u, v);
            });
            // prettier-ignore
            uvs.push(...uvA.toArray(), ...uvB.toArray(), ...uvC.toArray());
        }
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.boundsTree = new MeshBVH(geometry);
    return new Mesh(geometry, material);
}
// --------------------
const offset = arxVector3toVector3(fts.sceneHeader.mScenePosition);
const meshes = [];
const solidSingleSidedMaterial = new MeshLambertMaterial({ color: Color.white.getHex() });
const solidSingleSidedMesh = createMesh(solidSingleSidedMaterial, offset, ({ flags }) => {
    return !isTransparent(flags) && !isDoubleSided(flags) && !isNoDraw(flags);
});
meshes.push(solidSingleSidedMesh);
const solidDoubleSidedMaterial = new MeshLambertMaterial({ color: Color.red.lighten(75).getHex(), side: DoubleSide });
const solidDoubleSidedMesh = createMesh(solidDoubleSidedMaterial, offset, ({ flags }) => {
    return !isTransparent(flags) && isDoubleSided(flags) && !isNoDraw(flags);
});
meshes.push(solidDoubleSidedMesh);
const transparentMaterial = new MeshLambertMaterial({
    color: Color.green.lighten(75).getHex(),
    transparent: true,
    opacity: 0.5,
    side: DoubleSide,
});
const transparentMesh = createMesh(transparentMaterial, offset, ({ flags }) => {
    return isTransparent(flags) && !isNoDraw(flags);
});
meshes.push(transparentMesh);
// TODO: add noDraw polygons
// --------------------
scene.add(...meshes);
const wireframeLines = meshes.map((mesh) => {
    return new LineSegments(new WireframeGeometry(mesh.geometry), new MeshBasicMaterial({
        color: Color.white.darken(50).getHex(),
    }));
});
wireframeVisible.addEventListener('change', (event) => {
    if (event.detail?.currentValue === true) {
        scene.add(...wireframeLines);
    }
    else {
        scene.remove(...wireframeLines);
    }
});
if (wireframeVisible.currentValue === true) {
    scene.add(...wireframeLines);
}
// --------------------
for (const light of llf.lights) {
    const color = Color.fromArxColor(light.color);
    const colorIntensityMultiplier = 2000;
    const pointLight = new PointLight(color.getHex(), light.intensity * colorIntensityMultiplier, light.fallStart * colorIntensityMultiplier);
    pointLight.position.set(-light.pos.x, -light.pos.y, light.pos.z);
    scene.add(pointLight);
}
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
renderer.autoClear = false;
const fov = 75;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;
const far = 10_000;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-dlf.header.posEdit.x, -dlf.header.posEdit.y, dlf.header.posEdit.z);
camera.rotation.y = MathUtils.degToRad(180);
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
const viewHelper = new ViewHelper(camera, document.body);
const pressedKeys = {};
function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    const delta = timer.getDelta();
    controls.update(delta);
    renderer.clear();
    renderer.render(scene, camera);
    viewHelper.render(renderer);
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
// --------------
// TODO: store selected triangle / allow adding with left click and removing with right click
function renderTriangle(triangle) {
    const geometry = new BufferGeometry();
    // prettier-ignore
    const vertices = new Float32Array([
        ...triangle.a.toArray(),
        ...triangle.b.toArray(),
        ...triangle.c.toArray()
    ]);
    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    return new WireframeGeometry(geometry);
}
const cursorTriangleMesh = new LineSegments(renderTriangle(new Triangle()), new MeshBasicMaterial({ color: Color.red.getHex() }));
scene.add(cursorTriangleMesh);
controls.addEventListener('change', () => {
    const lookingAt = new Vector3();
    controls.getDirection(lookingAt);
    raycaster.set(camera.position, lookingAt);
    const intersects = raycaster.intersectObjects(meshes, false);
    const intersectedMeshes = intersects.filter(({ object }) => object instanceof Mesh);
    if (intersectedMeshes.length === 0) {
        scene.remove(cursorTriangleMesh);
        return;
    }
    const point = intersectedMeshes[0].object.geometry.getAttribute('position');
    const face = intersectedMeshes[0].face;
    const a = new Vector3(point.getX(face.a), point.getY(face.a), point.getZ(face.a));
    const b = new Vector3(point.getX(face.b), point.getY(face.b), point.getZ(face.b));
    const c = new Vector3(point.getX(face.c), point.getY(face.c), point.getZ(face.c));
    cursorTriangleMesh.geometry = renderTriangle(new Triangle(a, b, c));
    scene.add(cursorTriangleMesh);
});
// ------------------
// TODO: when saving FTS data use the three.js mesh instead of the loaded FTS data
// TODO: add seedrandom package to the project + migrate "random" functions from arx-level-generator
// TODO: make header show something more useful then a large text of "Arx Fatalis Browser Editor"
// TODO: add crosshair
//# sourceMappingURL=index.js.map