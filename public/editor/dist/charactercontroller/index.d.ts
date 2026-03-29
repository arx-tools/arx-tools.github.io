export declare class CharacterController {
    constructor(scene: any, { walkSpeed, sprintSpeed, floorDistance, gravity, jumpPower, sensitivity, lookLimit, cameraFov, inputMappings, }: {
        walkSpeed?: number | undefined;
        sprintSpeed?: number | undefined;
        floorDistance?: number | undefined;
        gravity?: number | undefined;
        jumpPower?: number | undefined;
        sensitivity?: {
            x: number;
            y: number;
        } | undefined;
        lookLimit?: {
            down: number;
            up: number;
        } | undefined;
        cameraFov?: number | undefined;
        inputMappings?: {
            scalar: {
                horizontalAxis: {
                    inputs: string[];
                    value: number;
                }[];
                verticalAxis: {
                    inputs: string[];
                    value: number;
                }[];
            };
            discrete: {
                jump: string[];
                sprint: string[];
            };
        } | undefined;
    });
    update(): {
        elapsed: any;
        delta: any;
    };
}
