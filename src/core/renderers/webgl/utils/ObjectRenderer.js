import WebGLManager from '../managers/WebGLManager';

/**
 * Base for a common object renderer that can be used as a system renderer plugin.
 *
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */
<<<<<<< HEAD
class ObjectRenderer extends WebGLManager {
    constructor(renderer)
    {
        super(renderer);
    }

=======
export default class ObjectRenderer extends WebGLManager
{
>>>>>>> upstream/dev
    /**
     * Starts the renderer and sets the shader
     *
     */
    start()
    {
        // set the shader..
    }

    /**
     * Stops the renderer
     *
     */
    stop()
    {
        this.flush();
    }

    /**
     * Stub method for rendering content and emptying the current batch.
     *
     */
    flush()
    {
        // flush!
    }
<<<<<<< HEAD

    /**
     * Renders an object
     *
     * @param object {PIXI.DisplayObject} The object to render.
     */
    render(object) // jshint unused:false
    {
        // render the object
    }

}

module.exports = ObjectRenderer;
=======

    /**
     * Renders an object
     *
     * @param {PIXI.DisplayObject} object - The object to render.
     */
    render(object) // eslint-disable-line no-unused-vars
    {
        // render the object
    }
}
>>>>>>> upstream/dev
