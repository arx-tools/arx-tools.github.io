import type { ArxPolygon } from 'arx-convert/types';
import { type Material, Mesh, Vector3 } from 'three';
export declare function arxPolygonsToMesh(polygons: ArxPolygon[], material: Material, offset: Vector3): Mesh;
export declare function meshToArxPolygons(mesh: Mesh): ArxPolygon[];
export declare function arxVector3toVector3({ x, y, z }: ArxVector3): Vector3;
