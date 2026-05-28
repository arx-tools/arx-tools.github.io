import { Color } from '../Color.js';
import { LineSegments, MeshBasicMaterial, WireframeGeometry } from 'three';
export function createWireframe(geometry) {
    return new LineSegments(new WireframeGeometry(geometry), new MeshBasicMaterial({
        color: Color.white.darken(50).getHex(),
    }));
}
//# sourceMappingURL=createWireframe.js.map