import { BufferAttribute, BufferGeometry, WireframeGeometry } from 'three';
export function createTriangle(triangle) {
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
//# sourceMappingURL=createTriangle.js.map