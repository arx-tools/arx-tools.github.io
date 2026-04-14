import { ArxPolygonFlags, type ArxVector3 } from 'arx-convert/types';
import { Vector3 } from 'three';
export declare function wait(delayInMs: number): Promise<void>;
export declare function randomIntBetween(a: number, b: number): number;
export declare function percentOf(percentage: number, maxValue: number): number;
export declare function arxVector3toVector3({ x, y, z }: ArxVector3): Vector3;
export declare function isTransparent(flags: ArxPolygonFlags): boolean;
export declare function isDoubleSided(flags: ArxPolygonFlags): boolean;
export declare function isNoDraw(flags: ArxPolygonFlags): boolean;
