import Filter from '../Filter';
import { Matrix } from '../../../../math';

// @see https://github.com/substack/brfs/issues/25
const glslify = require('glslify'); // eslint-disable-line no-undef

/**
 * The SpriteMaskFilter class
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI
 */
<<<<<<< HEAD
class SpriteMaskFilter extends Filter {
    constructor(sprite)
    {
        var maskMatrix = new math.Matrix();
=======
export default class SpriteMaskFilter extends Filter
{
    /**
     * @param {PIXI.Sprite} sprite - the target sprite
     */
    constructor(sprite)
    {
        const maskMatrix = new Matrix();
>>>>>>> upstream/dev

        super(
            glslify('./spriteMaskFilter.vert'),
            glslify('./spriteMaskFilter.frag')
        );

        sprite.renderable = false;

        this.maskSprite = sprite;
        this.maskMatrix = maskMatrix;
    }

    /**
     * Applies the filter
     *
<<<<<<< HEAD
     * @param filterManager {PIXI.FilterManager} The renderer to retrieve the filter from
     * @param input {PIXI.RenderTarget}
     * @param output {PIXI.RenderTarget}
     */
    apply(filterManager, input, output)
    {
        var maskSprite = this.maskSprite;

        this.uniforms.mask = maskSprite._texture;
        this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite );
=======
     * @param {PIXI.FilterManager} filterManager - The renderer to retrieve the filter from
     * @param {PIXI.RenderTarget} input - The input render target.
     * @param {PIXI.RenderTarget} output - The target to output to.
     */
    apply(filterManager, input, output)
    {
        const maskSprite = this.maskSprite;

        this.uniforms.mask = maskSprite._texture;
        this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite);
>>>>>>> upstream/dev
        this.uniforms.alpha = maskSprite.worldAlpha;

        filterManager.applyFilter(this, input, output);
    }
<<<<<<< HEAD

}

module.exports = SpriteMaskFilter;
=======
}
>>>>>>> upstream/dev
