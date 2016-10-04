import Shader from '../../core/Shader';
const glslify = require('glslify'); // eslint-disable-line no-undef

/**
 * @class
 * @extends PIXI.Shader
 * @memberof PIXI.mesh
 */
<<<<<<< HEAD
class TilingShader extends Shader {
=======
export default class TilingShader extends Shader
{
    /**
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     */
>>>>>>> upstream/dev
    constructor(gl)
    {
        super(
            gl,
            glslify('./tilingSprite.vert'),
            glslify('./tilingSprite.frag')
        );
    }
}
<<<<<<< HEAD

module.exports = TilingShader;
=======
>>>>>>> upstream/dev
