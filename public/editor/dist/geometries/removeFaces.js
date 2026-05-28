import { BufferAttribute, BufferGeometry } from 'three';
import { MeshBVH } from 'three-mesh-bvh';
/**
 * @returns a copy of the original geometry
 */
export function removeFaces(faces, geometry) {
    const vertices = geometry.getAttribute('position');
    const normals = geometry.getAttribute('normal');
    const uvs = geometry.getAttribute('uv');
    const indicesToRemove = faces
        .flatMap(({ a, b, c }) => {
        return [a, b, c];
    })
        .toSorted((a, b) => {
        return b - a;
    });
    const newVertices = [...vertices.array];
    const newNormals = [...normals.array];
    const newUVs = [...uvs.array];
    for (const indexToRemove of indicesToRemove) {
        newVertices.splice(indexToRemove * vertices.itemSize, vertices.itemSize);
        newNormals.splice(indexToRemove * normals.itemSize, normals.itemSize);
        newUVs.splice(indexToRemove * uvs.itemSize, uvs.itemSize);
    }
    const newGeometry = new BufferGeometry();
    newGeometry.setAttribute('position', new BufferAttribute(new Float32Array(newVertices), vertices.itemSize));
    newGeometry.setAttribute('normal', new BufferAttribute(new Float32Array(newNormals), normals.itemSize));
    newGeometry.setAttribute('uv', new BufferAttribute(new Float32Array(newUVs), uvs.itemSize));
    newGeometry.boundsTree = new MeshBVH(newGeometry);
    return newGeometry;
}
//# sourceMappingURL=removeFaces.js.map