import { ArxPolygonFlags } from 'arx-convert/types';
import type { Face } from 'three';
export declare function wait(delayInMs: number): Promise<void>;
export declare function randomIntBetween(a: number, b: number): number;
export declare function percentOf(percentage: number, maxValue: number): number;
export declare function isTransparent(flags: ArxPolygonFlags): boolean;
export declare function isDoubleSided(flags: ArxPolygonFlags): boolean;
export declare function isNoDraw(flags: ArxPolygonFlags): boolean;
export declare function areFacesEqual(a: Face, b: Face): boolean;
