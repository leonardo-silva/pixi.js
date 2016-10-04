import * as core from '../../core';

// @see https://github.com/substack/brfs/issues/25
const glslify = require('glslify'); // eslint-disable-line no-undef

/**
 * Does nothing. Very handy.
 *
 * @class
 * @extends PIXI.Filter
 * @memberof PIXI.filters
 */
<<<<<<< HEAD
class VoidFilter extends core.Filter {
=======
export default class VoidFilter extends core.Filter
{
    /**
     *
     */
>>>>>>> upstream/dev
    constructor()
    {
        super(
            // vertex shader
            glslify('../fragments/default.vert'),
            // fragment shader
            glslify('./void.frag')
        );

        this.glShaderKey = 'void';
    }
}
<<<<<<< HEAD

module.exports = VoidFilter;
=======
>>>>>>> upstream/dev
