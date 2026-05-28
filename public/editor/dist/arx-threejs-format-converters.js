import { isQuad } from 'arx-convert/utils';
import { BufferAttribute, BufferGeometry, Mesh, Vector2, Vector3 } from 'three';
import { MeshBVH } from 'three-mesh-bvh';
function arxCoordinateToThreejsCoordinate(vector) {
    return vector.clone().multiply(new Vector3(-1, -1, 1));
}
export function arxVector3toVector3({ x, y, z }) {
    return arxCoordinateToThreejsCoordinate(new Vector3(x, y, z));
}
export function arxPolygonsToMesh(polygons, material, offset) {
    const vertices = [];
    const normals = [];
    const uvs = [];
    polygons.forEach((polygonData) => {
        const [a, b, c, d] = polygonData.vertices.map(({ x, y, z }) => {
            return arxVector3toVector3({ x, y, z }).sub(offset).toArray();
        });
        const [uvA, uvB, uvC, uvD] = polygonData.vertices.map(({ u, v }) => {
            return new Vector2(u, v).toArray();
        });
        const rawNormals = polygonData.normals ?? [polygonData.norm, polygonData.norm, polygonData.norm, polygonData.norm2];
        const [nA, nB, nC, nD] = rawNormals.map((normal) => {
            return arxVector3toVector3(normal).toArray();
        });
        vertices.push(...a, ...b, ...c);
        uvs.push(...uvA, ...uvB, ...uvC);
        normals.push(...nA, ...nB, ...nC);
        if (isQuad(polygonData)) {
            vertices.push(...c, ...b, ...d);
            uvs.push(...uvC, ...uvB, ...uvD);
            normals.push(...nC, ...nB, ...nD);
        }
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geometry.boundsTree = new MeshBVH(geometry);
    return new Mesh(geometry, material);
}
export function meshToArxPolygons(mesh) {
    // TODO
    return [];
}
//# sourceMappingURL=arx-threejs-format-converters.js.map