import { type Scene } from 'three';
type CharacterControllerOptions = {
    walkSpeed?: number;
};
export declare class CharacterController {
    private readonly scene;
    constructor(scene: Scene, { walkSpeed, }: CharacterControllerOptions);
    update(): {
        elapsed: any;
        delta: any;
    };
}
export {};
