import { explode, implode, concatArrayBuffers, sliceArrayBufferAt } from 'node-pkware/simple';
import { getHeaderSize } from 'arx-header-size';
import { DLF, FTS, LLF } from 'arx-convert';
import { BufferAttribute, BufferGeometry, DoubleSide, Euler, LineSegments, MathUtils, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PointLight, Raycaster, Scene, Timer, Triangle, Vector3, WebGLRenderer, } from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper.js';
import { acceleratedRaycast } from 'three-mesh-bvh';
import { downloadBinaryAs, zipBuffers } from './download.js';
import { cameraLightVisible, canvas, downloadBtn, isLoading, MouseButton, mouseLocked, mousePressed, mouseUnlocked, uiTitle, updateMouseButtonState, updateMouseButtonStates, wireframeVisible, } from './ui/ui.js';
import { areFacesEqual, isDoubleSided, isNoDraw, isTransparent, wait } from './functions.js';
import { Color } from './Color.js';
import { isValidOriginalArxLevelId } from './constants.js';
import { Logger } from './ui/Logger.js';
import { Exception } from './ui/Exception.js';
import { arxPolygonsToMesh, arxVector3toVector3 } from './arx-threejs-format-converters.js';
import { removeFaces } from './geometry/removeFaces.js';
import { createWireframe } from './geometry/createWireframe.js';
import { createTriangle as renderTriangle } from './geometry/renderTriangle.js';
import { getVerticesByFace } from './geometry/getVerticesByFace.js';
import { getNormalsByFace } from './geometry/getNormalByFace.js';
Mesh.prototype.raycast = acceleratedRaycast;
const logger = new Logger(document.querySelector('#logs'));
// --------------------
async function getFTS(level) {
    const line1 = logger.log(`- [fts]: loading level ${level} fts...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/fast.fts`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to download level ${level} fts: ${errorResponse}`);
    }
    logger.log('done', line1);
    await wait(100);
    const line2 = logger.log(`- [fts]: unpacking level ${level} fts...`);
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
    logger.log('done', line2);
    return fts;
}
async function getLLF(level) {
    const line1 = logger.log(`- [llf]: loading level ${level} llf...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/level${level}.llf`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to download level ${level} llf: ${errorResponse}`);
    }
    logger.log('done', line1);
    await wait(100);
    const line2 = logger.log(`- [llf]: unpacking level ${level} llf...`);
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
    logger.log('done', line2);
    return llf;
}
async function getDLF(level) {
    const line1 = logger.log(`- [dlf]: loading level ${level} dlf...`);
    const response = await fetch(`https://raw.githubusercontent.com/arx-tools/pkware-test-files/main/arx-fatalis/level${level}/level${level}.dlf`);
    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Failed to download level ${level} dlf: ${errorResponse}`);
    }
    logger.log('done', line1);
    await wait(100);
    const line2 = logger.log(`- [dlf]: unpacking level ${level} dlf...`);
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
    logger.log('done', line2);
    return dlf;
}
async function saveFTS(fts, level) {
    const line1 = logger.log(`[fts]: packing level ${level} fts...`);
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
    logger.log('done', line1);
    return packedFts;
}
async function saveLLF(llf, level) {
    const line1 = logger.log(`[llf]: packing level ${level} llf...`);
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
    logger.log('done', line1);
    return packedLlf;
}
async function saveDLF(dlf, level) {
    const line1 = logger.log(`[dlf]: packing level ${level} dlf...`);
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
    logger.log('done', line1);
    return packedDlf;
}
// --------------------
isLoading.currentValue = 'loading';
const levelId = Number.parseInt(new URLSearchParams(globalThis.location.search).get('level') ?? '11', 10);
if (!isValidOriginalArxLevelId(levelId)) {
    isLoading.currentValue = 'rejected';
    uiTitle.currentValue = `Invalid level ID "${levelId}"`;
    if (levelId === 9) {
        throw new Exception(`Invalid level ID "9", Arx Fatalis doesn't have a level 9.`, logger);
    }
    else {
        throw new Exception(`Invalid level ID "${levelId}"`, logger);
    }
}
uiTitle.currentValue = `Arx Fatalis Level ${levelId} (loading)`;
const line1 = logger.log('loading level data...');
const [fts, llf, dlf] = await Promise.all([getFTS(levelId), getLLF(levelId), getDLF(levelId)]);
logger.log('done', line1);
uiTitle.currentValue = `Arx Fatalis Level ${levelId}`;
isLoading.currentValue = 'fulfilled';
downloadBtn.addEventListener('click', async () => {
    if (isLoading.currentValue === 'loading' || isLoading.currentValue === 'rejected') {
        return;
    }
    isLoading.currentValue = 'loading';
    // TODO: generate fts, llf and dlf from scene
    const line1 = logger.log('packing level data...');
    const [packedFts, packedLlf, packedDlf] = await Promise.all([
        saveFTS(fts, levelId),
        saveLLF(llf, levelId),
        saveDLF(dlf, levelId),
    ]);
    logger.log('done', line1);
    const line2 = logger.log('zipping files...');
    const zip = await zipBuffers({
        [`/game/graph/levels/level${levelId}/fast.fts`]: packedFts,
        [`/graph/levels/level${levelId}/level${levelId}.llf`]: packedLlf,
        [`/graph/levels/level${levelId}/level${levelId}.dlf`]: packedDlf,
    });
    logger.log('done', line2);
    downloadBinaryAs('mod.zip', zip, 'application/zip');
    isLoading.currentValue = 'fulfilled';
});
// --------------------
const scene = new Scene();
const timer = new Timer();
timer.connect(document);
const raycaster = new Raycaster();
// --------------------
const offset = arxVector3toVector3(fts.header.mScenePosition);
const meshes = [];
const solidSingleSidedMaterial = new MeshLambertMaterial({ color: Color.white.getHex() });
const solidSingleSidedMesh = arxPolygonsToMesh(fts.polygons.filter(({ flags }) => {
    return !isTransparent(flags) && !isDoubleSided(flags) && !isNoDraw(flags);
}), solidSingleSidedMaterial, offset);
meshes.push(solidSingleSidedMesh);
const solidDoubleSidedMaterial = new MeshLambertMaterial({ color: Color.red.lighten(75).getHex(), side: DoubleSide });
const solidDoubleSidedMesh = arxPolygonsToMesh(fts.polygons.filter(({ flags }) => {
    return !isTransparent(flags) && isDoubleSided(flags) && !isNoDraw(flags);
}), solidDoubleSidedMaterial, offset);
meshes.push(solidDoubleSidedMesh);
const transparentMaterial = new MeshLambertMaterial({
    color: Color.green.lighten(75).getHex(),
    transparent: true,
    opacity: 0.5,
    side: DoubleSide,
});
const transparentMesh = arxPolygonsToMesh(fts.polygons.filter(({ flags }) => {
    return isTransparent(flags) && !isNoDraw(flags);
}), transparentMaterial, offset);
meshes.push(transparentMesh);
// TODO: add noDraw polygons
// --------------------
scene.add(...meshes);
let wireframeLines = meshes.map(({ geometry }) => {
    const wireframe = createWireframe(geometry);
    wireframe.renderOrder = 5;
    return wireframe;
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
    pointLight.position.copy(arxVector3toVector3(light.position));
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
camera.position.copy(arxVector3toVector3(dlf.header.player.position));
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
const selectedFaces = [];
let faceBeingLookedAt;
const cursorTriangleMaterial = new MeshBasicMaterial({ color: Color.green.getHex() });
const cursorTriangleMesh = new LineSegments(renderTriangle(new Triangle()), cursorTriangleMaterial);
let highlightOfSelectedFaces = [];
function updateHighlightOfSelectedFaces() {
    if (highlightOfSelectedFaces.length > 0) {
        scene.remove(...highlightOfSelectedFaces);
    }
    highlightOfSelectedFaces = selectedFaces.map(({ face, mesh }) => {
        const vertices = getVerticesByFace(face, mesh.geometry);
        const normals = getNormalsByFace(face, mesh.geometry);
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(
        // prettier-ignore
        new Float32Array([
            ...vertices[0].toArray(),
            ...vertices[1].toArray(),
            ...vertices[2].toArray()
        ]), 3));
        geometry.setAttribute('normal', new BufferAttribute(
        // prettier-ignore
        new Float32Array([
            ...normals[0].toArray(),
            ...normals[1].toArray(),
            ...normals[2].toArray()
        ]), 3));
        const material = new MeshBasicMaterial({
            color: Color.yellow.getHex(),
            side: DoubleSide,
            transparent: true,
            opacity: 0.35,
        });
        const triangleMesh = new Mesh(geometry, material);
        triangleMesh.renderOrder = 7; // TODO, ez legyen 5 és 10 között
        return triangleMesh;
    });
    if (highlightOfSelectedFaces.length > 0) {
        scene.add(...highlightOfSelectedFaces);
    }
}
/**
 * being relevant when new faces are to be added to or removed from the selectedFaces
 *
 * if the left mouse button is pressed with a face that is already in the selection,
 * that means the face will be removed and all subsequent faces will get removed from selectedFaces
 * otherwise all subsequent faces will be added
 *
 * until the first face is clicked the state is undefined
 */
let isAddingToSelection;
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
        if (pressedKeys.Delete && selectedFaces.length > 0) {
            const facesByMeshes = new Map();
            for (const { mesh, face } of selectedFaces) {
                if (!facesByMeshes.has(mesh)) {
                    facesByMeshes.set(mesh, []);
                }
                const facesByMesh = facesByMeshes.get(mesh);
                facesByMesh.push(face);
            }
            facesByMeshes.entries().forEach(([mesh, faces]) => {
                mesh.geometry = removeFaces(faces, mesh.geometry);
            });
            if (wireframeVisible.currentValue) {
                scene.remove(...wireframeLines);
            }
            wireframeLines = meshes.map(({ geometry }) => {
                return createWireframe(geometry);
            });
            if (wireframeVisible.currentValue) {
                scene.add(...wireframeLines);
            }
            selectedFaces.length = 0;
            updateHighlightOfSelectedFaces();
            faceBeingLookedAt = undefined;
            cursorTriangleMaterial.color.set(Color.green.getHex());
            scene.remove(cursorTriangleMesh);
        }
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
        updateMouseButtonState(MouseButton.Left, false);
        updateMouseButtonState(MouseButton.Right, false);
        updateMouseButtonState(MouseButton.Middle, false);
        return;
    }
    pressedKeys[event.code] = true;
}
function onKeyUp(event) {
    pressedKeys[event.code] = false;
}
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
function areFaceOfMeshesEqual(a, b) {
    return a.mesh === b.mesh && areFacesEqual(a.face, b.face);
}
document.addEventListener('mousedown', (event) => {
    if (!controls.isLocked) {
        return;
    }
    updateMouseButtonStates(event);
    const positionInSelection = selectedFaces.findIndex((faceOfMesh) => {
        return areFaceOfMeshesEqual(faceOfMesh, faceBeingLookedAt);
    });
    const alreadySelected = positionInSelection !== -1;
    if (alreadySelected) {
        cursorTriangleMaterial.color.set(Color.red.getHex());
    }
    else {
        cursorTriangleMaterial.color.set(Color.green.getHex());
    }
}, false);
document.addEventListener('mouseup', (event) => {
    if (!controls.isLocked) {
        return;
    }
    updateMouseButtonStates(event);
    if (faceBeingLookedAt === undefined) {
        return;
    }
    const positionInSelection = selectedFaces.findIndex((faceOfMesh) => {
        return areFaceOfMeshesEqual(faceOfMesh, faceBeingLookedAt);
    });
    const alreadySelected = positionInSelection !== -1;
    if (isAddingToSelection === undefined) {
        if (alreadySelected) {
            cursorTriangleMaterial.color.set(Color.green.getHex());
            selectedFaces.splice(positionInSelection, 1);
        }
        else {
            selectedFaces.push(faceBeingLookedAt);
            cursorTriangleMaterial.color.set(Color.red.getHex());
        }
        updateHighlightOfSelectedFaces();
    }
    else {
        isAddingToSelection = undefined;
        if (alreadySelected) {
            cursorTriangleMaterial.color.set(Color.red.getHex());
        }
        else {
            cursorTriangleMaterial.color.set(Color.green.getHex());
        }
    }
}, false);
canvas.addEventListener('click', (e) => {
    controls.lock();
});
window.addEventListener('blur', () => {
    controls.unlock();
    updateMouseButtonState(MouseButton.Left, false);
    updateMouseButtonState(MouseButton.Right, false);
    updateMouseButtonState(MouseButton.Middle, false);
});
// --------------
scene.add(cursorTriangleMesh);
cursorTriangleMesh.renderOrder = 10;
controls.addEventListener('change', () => {
    const lookingAt = new Vector3();
    controls.getDirection(lookingAt);
    raycaster.set(camera.position, lookingAt);
    const intersects = raycaster.intersectObjects(meshes, false);
    const intersectedMeshes = intersects.filter(({ object }) => object instanceof Mesh);
    if (intersectedMeshes.length === 0) {
        scene.remove(cursorTriangleMesh);
        faceBeingLookedAt = undefined;
        return;
    }
    const mesh = intersectedMeshes[0].object;
    const face = intersectedMeshes[0].face;
    const [a, b, c] = getVerticesByFace(face, mesh.geometry);
    cursorTriangleMesh.geometry = renderTriangle(new Triangle(a, b, c));
    scene.add(cursorTriangleMesh);
    faceBeingLookedAt = { mesh, face };
    const positionInSelection = selectedFaces.findIndex((faceOfMesh) => {
        return areFaceOfMeshesEqual(faceOfMesh, faceBeingLookedAt);
    });
    const alreadySelected = positionInSelection !== -1;
    if (alreadySelected) {
        cursorTriangleMaterial.color.set(Color.red.getHex());
    }
    else {
        cursorTriangleMaterial.color.set(Color.green.getHex());
    }
    if (mousePressed[MouseButton.Left].currentValue) {
        if (!mousePressed[MouseButton.Left].oldValue) {
            // left mouse button was pressed
            isAddingToSelection = !alreadySelected;
        }
        if (isAddingToSelection) {
            cursorTriangleMaterial.color.set(Color.green.getHex());
            if (!alreadySelected) {
                selectedFaces.push(faceBeingLookedAt);
                updateHighlightOfSelectedFaces();
            }
        }
        else {
            cursorTriangleMaterial.color.set(Color.red.getHex());
            if (alreadySelected) {
                selectedFaces.splice(positionInSelection, 1);
                updateHighlightOfSelectedFaces();
            }
        }
        updateMouseButtonState(MouseButton.Left, true);
    }
    else {
        if (mousePressed[MouseButton.Left].oldValue) {
            // left mouse button was released
            isAddingToSelection = undefined;
        }
        updateMouseButtonState(MouseButton.Left, false);
    }
});
// ------------------
// TODO: when saving FTS data use the three.js mesh instead of the loaded FTS data
// TODO: add seedrandom package to the project + migrate "random" functions from arx-level-generator
// TODO: make a GUI level selector (loading image + text)
// TODO: make geometry toggelable so that it would be possible to only have the wireframe rendered
// TODO: test in chrome
// TODO: create some sort of lookup for quads
// TODO: make selection semi-transparent
// TODO: override isAddingToSelection to be false by holding down the right mouse button instead of left
// TODO: add gizmo to the center of the selection
// TODO: allow moving the selected faces with gizmo
//# sourceMappingURL=index.js.map