import type { ArxColor } from 'arx-convert/types';
import { type Color as ThreeJsColor } from 'three';
export declare enum Alpha {
    Transparent = 0,
    Opaque = 1
}
export declare class Color {
    /**
     * Parses a color string into numeric values for each channel.
     *
     * Parsing is handled internally using the `color-parse` package (via `color-rgba`),
     * so visit the homepage to see what color notations are supported.
     * For starters, everything that is available in CSS is supported.
     *
     * @see https://github.com/colorjs/color-parse
     * @throws Error when parsing fails
     */
    static fromCSS(color: string): Color;
    /**
     * Creates a Color instance from the ArxColor data
     */
    static fromArxColor({ r, g, b, a }: ArxColor): Color;
    /**
     * Creates a Color instance from three.js' Color class
     *
     * Extra infos of three.js' Color class:
     *
     * - it doesn't support transparency/alpha channel
     * - every channel is a float with values ranging between 0.0 and 1.0
     */
    static fromThreeJsColor({ r, g, b }: ThreeJsColor): Color;
    static get red(): Color;
    static get green(): Color;
    static get blue(): Color;
    static get white(): Color;
    static get black(): Color;
    static get yellow(): Color;
    static get transparent(): Color;
    /**
     * red channel, a positive integer between `0` and `255` (inclusive)
     *
     * `0` = minimum value, no amount of red in the color
     *
     * `255` = maximum value, as much red as possible
     */
    r: number;
    /**
     * green channel, a positive integer between `0` and `255` (inclusive)
     *
     * `0` = minimum value, no amount of green in the color
     *
     * `255` = maximum value, as much green as possible
     */
    g: number;
    /**
     * blue channel, a positive integer between `0` and `255` (inclusive)
     *
     * `0` = minimum value, no amount of blue in the color
     *
     * `255` = maximum value, as much blue as possible
     */
    b: number;
    /**
     * alpha channel, a floating point number between `0` and `1`
     *
     * `0` = fully transparent (`Alpha.Transparent`)
     *
     * `1` = fully opaque (`Alpha.Opaque`)
     */
    a: number;
    /**
     * @param r red channel, a positive integer between `0` and `255` (inclusive)
     * @param g green channel, a positive integer between `0` and `255` (inclusive)
     * @param b blue channel, a positive integer between `0` and `255` (inclusive)
     * @param a alpha channel, a floating point number between `0.0` (fully transparent) and `1.0` (fully opaque) - default value is `1.0`
     */
    constructor(r: number, g: number, b: number, a?: number);
    /**
     * Creates an object with rgba channels that `arx-convert` can work with.
     */
    toArxColor(): ArxColor;
    /**
     * Creates a stringified version of the color that can be used in ASL scripts.
     * ASL scripts expect the channels to be floats and the alpha channel removed.
     */
    toScriptColor(): string;
    clone(): Color;
    /**
     * Converts the color into a format that can be used by three.js.
     * Alpha channels are ignored as they are handled separately in three.js
     *
     * `{ r: 255, g: 127, b: 0 }` becomes `0xff7f00`
     *
     * @example
     *
     * ```ts
     * const material = new MeshBasicMaterial({ color: this.getHex() })
     * ```
     */
    getHex(): number;
    /**
     * Adds each channel of a color to the channels in this instance
     */
    add(color: Color): this;
    /**
     * Adds a fixed amount to every channel
     */
    addScalar(value: number): this;
    /**
     * Subtracts each channel of a color from the channels in this instance
     */
    sub(color: Color): this;
    /**
     * Subtracts a fixed amount from every channel
     */
    subScalar(value: number): this;
    /**
     * Multiplies each channel with a fixed amount
     */
    multiplyScalar(value: number): this;
    /**
     * Brightens the color by adding <percent>% of 256 to every channel
     */
    lighten(percent: number): this;
    /**
     * Darkens the color by subtracting <percent>% of 256 from every channel
     */
    darken(percent: number): this;
}
