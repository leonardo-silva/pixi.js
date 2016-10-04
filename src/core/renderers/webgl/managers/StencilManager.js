import WebGLManager from './WebGLManager';

/**
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */
<<<<<<< HEAD
class StencilManager extends WebGLManager {
=======
export default class StencilManager extends WebGLManager
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
     */
>>>>>>> upstream/dev
    constructor(renderer)
    {
        super(renderer);
        this.stencilMaskStack = null;
    }

    /**
     * Changes the mask stack that is used by this manager.
     *
<<<<<<< HEAD
     * @param stencilMaskStack {PIXI.Graphics[]} The mask stack
     */
    setMaskStack( stencilMaskStack )
    {
        this.stencilMaskStack = stencilMaskStack;

        var gl = this.renderer.gl;
=======
     * @param {PIXI.Graphics[]} stencilMaskStack - The mask stack
     */
    setMaskStack(stencilMaskStack)
    {
        this.stencilMaskStack = stencilMaskStack;

        const gl = this.renderer.gl;
>>>>>>> upstream/dev

        if (stencilMaskStack.length === 0)
        {
            gl.disable(gl.STENCIL_TEST);
        }
        else
        {
            gl.enable(gl.STENCIL_TEST);
        }
    }

    /**
     * Applies the Mask and adds it to the current filter stack. @alvin
     *
<<<<<<< HEAD
     * @param graphics {PIXI.Graphics}
=======
     * @param {PIXI.Graphics} graphics - The mask
>>>>>>> upstream/dev
     */
    pushStencil(graphics)
    {
        this.renderer.setObjectRenderer(this.renderer.plugins.graphics);

        this.renderer._activeRenderTarget.attachStencilBuffer();

<<<<<<< HEAD
        var gl = this.renderer.gl,
            sms = this.stencilMaskStack;
=======
        const gl = this.renderer.gl;
        const sms = this.stencilMaskStack;
>>>>>>> upstream/dev

        if (sms.length === 0)
        {
            gl.enable(gl.STENCIL_TEST);
            gl.clear(gl.STENCIL_BUFFER_BIT);
<<<<<<< HEAD
            gl.stencilFunc(gl.ALWAYS,1,1);
=======
            gl.stencilFunc(gl.ALWAYS, 1, 1);
>>>>>>> upstream/dev
        }

        sms.push(graphics);

        gl.colorMask(false, false, false, false);
<<<<<<< HEAD
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
=======
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
>>>>>>> upstream/dev

        this.renderer.plugins.graphics.render(graphics);

        gl.colorMask(true, true, true, true);
<<<<<<< HEAD
        gl.stencilFunc(gl.NOTEQUAL,0, sms.length);
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
=======
        gl.stencilFunc(gl.NOTEQUAL, 0, sms.length);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
>>>>>>> upstream/dev
    }

    /**
     * TODO @alvin
     */
    popStencil()
    {
        this.renderer.setObjectRenderer(this.renderer.plugins.graphics);

<<<<<<< HEAD
        var gl = this.renderer.gl,
            sms = this.stencilMaskStack;

        var graphics = sms.pop();
=======
        const gl = this.renderer.gl;
        const sms = this.stencilMaskStack;

        const graphics = sms.pop();
>>>>>>> upstream/dev

        if (sms.length === 0)
        {
            // the stack is empty!
            gl.disable(gl.STENCIL_TEST);
        }
        else
        {
            gl.colorMask(false, false, false, false);
<<<<<<< HEAD
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);

            this.renderer.plugins.graphics.render(graphics);

            gl.colorMask(true, true, true, true);
            gl.stencilFunc(gl.NOTEQUAL, 0, sms.length);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);
        }
    }

    /**
     * Destroys the mask stack.
     *
     */
    destroy()
    {
        WebGLManager.prototype.destroy.call(this);

        this.stencilMaskStack.stencilStack = null;
    }

}

module.exports = StencilManager;
=======
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);

            this.renderer.plugins.graphics.render(graphics);

            gl.colorMask(true, true, true, true);
            gl.stencilFunc(gl.NOTEQUAL, 0, sms.length);
            gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        }
    }

    /**
     * Destroys the mask stack.
     *
     */
    destroy()
    {
        WebGLManager.prototype.destroy.call(this);

        this.stencilMaskStack.stencilStack = null;
    }
}
>>>>>>> upstream/dev
