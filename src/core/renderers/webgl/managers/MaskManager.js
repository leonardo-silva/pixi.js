import WebGLManager from './WebGLManager';
import AlphaMaskFilter from '../filters/spriteMask/SpriteMaskFilter';

/**
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */
<<<<<<< HEAD
class MaskManager extends WebGLManager {
=======
export default class MaskManager extends WebGLManager
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
     */
>>>>>>> upstream/dev
    constructor(renderer)
    {
        super(renderer);

<<<<<<< HEAD
        //TODO - we don't need both!
=======
        // TODO - we don't need both!
>>>>>>> upstream/dev
        this.scissor = false;
        this.scissorData = null;
        this.scissorRenderTarget = null;

        this.enableScissor = true;

        this.alphaMaskPool = [];
        this.alphaMaskIndex = 0;
    }

    /**
     * Applies the Mask and adds it to the current filter stack.
     *
<<<<<<< HEAD
     * @param target {PIXI.DisplayObject} Display Object to push the mask to
     * @param maskData {PIXI.Sprite|PIXI.Graphics}
=======
     * @param {PIXI.DisplayObject} target - Display Object to push the mask to
     * @param {PIXI.Sprite|PIXI.Graphics} maskData - The masking data.
>>>>>>> upstream/dev
     */
    pushMask(target, maskData)
    {
        if (maskData.texture)
        {
            this.pushSpriteMask(target, maskData);
        }
<<<<<<< HEAD
        else
        {
            if(this.enableScissor && !this.scissor && !this.renderer.stencilManager.stencilMaskStack.length && maskData.isFastRect())
            {
                var matrix = maskData.worldTransform;

                var rot = Math.atan2(matrix.b, matrix.a);

                // use the nearest degree!
                rot = Math.round(rot * (180/Math.PI));

                if(rot % 90)
                {
                    this.pushStencilMask(maskData);
                }
                else
                {
                    this.pushScissorMask(target, maskData);
                }
=======
        else if (this.enableScissor
            && !this.scissor
            && !this.renderer.stencilManager.stencilMaskStack.length
            && maskData.isFastRect())
        {
            const matrix = maskData.worldTransform;

            let rot = Math.atan2(matrix.b, matrix.a);

            // use the nearest degree!
            rot = Math.round(rot * (180 / Math.PI));

            if (rot % 90)
            {
                this.pushStencilMask(maskData);
>>>>>>> upstream/dev
            }
            else
            {
                this.pushStencilMask(maskData);
            }
        }
    }

    /**
     * Removes the last mask from the mask stack and doesn't return it.
     *
<<<<<<< HEAD
     * @param target {PIXI.DisplayObject} Display Object to pop the mask from
     * @param maskData {Array<*>}
=======
     * @param {PIXI.DisplayObject} target - Display Object to pop the mask from
     * @param {PIXI.Sprite|PIXI.Graphics} maskData - The masking data.
>>>>>>> upstream/dev
     */
    popMask(target, maskData)
    {
        if (maskData.texture)
<<<<<<< HEAD
=======
        {
            this.popSpriteMask(target, maskData);
        }
        else if (this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length)
>>>>>>> upstream/dev
        {
            this.popSpriteMask(target, maskData);
        }
        else
        {
<<<<<<< HEAD
            if(this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length)
            {
                this.popScissorMask(target, maskData);
            }
            else
            {
                this.popStencilMask(target, maskData);
            }

=======
            this.popStencilMask(target, maskData);
>>>>>>> upstream/dev
        }
    }

    /**
     * Applies the Mask and adds it to the current filter stack.
     *
<<<<<<< HEAD
     * @param target {PIXI.RenderTarget} Display Object to push the sprite mask to
     * @param maskData {PIXI.Sprite} Sprite to be used as the mask
     */
    pushSpriteMask(target, maskData)
    {
        var alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
=======
     * @param {PIXI.RenderTarget} target - Display Object to push the sprite mask to
     * @param {PIXI.Sprite} maskData - Sprite to be used as the mask
     */
    pushSpriteMask(target, maskData)
    {
        let alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex];
>>>>>>> upstream/dev

        if (!alphaMaskFilter)
        {
            alphaMaskFilter = this.alphaMaskPool[this.alphaMaskIndex] = [new AlphaMaskFilter(maskData)];
        }

        alphaMaskFilter[0].resolution = this.renderer.resolution;
        alphaMaskFilter[0].maskSprite = maskData;

<<<<<<< HEAD
        //TODO - may cause issues!
=======
        // TODO - may cause issues!
>>>>>>> upstream/dev
        target.filterArea = maskData.getBounds(true);

        this.renderer.filterManager.pushFilter(target, alphaMaskFilter);

        this.alphaMaskIndex++;
    }

    /**
     * Removes the last filter from the filter stack and doesn't return it.
     *
     */
    popSpriteMask()
    {
        this.renderer.filterManager.popFilter();
        this.alphaMaskIndex--;
    }

<<<<<<< HEAD

    /**
     * Applies the Mask and adds it to the current filter stack.
     *
     * @param maskData {Array<*>}
     */
    pushStencilMask(maskData)
    {
        this.renderer.currentRenderer.stop();
        this.renderer.stencilManager.pushStencil(maskData);
    }

    /**
     * Removes the last filter from the filter stack and doesn't return it.
     *
     */
    popStencilMask()
    {
        this.renderer.currentRenderer.stop();
        this.renderer.stencilManager.popStencil();
    }

    /**
     *
     * @param target {PIXI.RenderTarget} Display Object to push the scissor mask to
     * @param maskData
=======
    /**
     * Applies the Mask and adds it to the current filter stack.
     *
     * @param {PIXI.Sprite|PIXI.Graphics} maskData - The masking data.
     */
    pushStencilMask(maskData)
    {
        this.renderer.currentRenderer.stop();
        this.renderer.stencilManager.pushStencil(maskData);
    }

    /**
     * Removes the last filter from the filter stack and doesn't return it.
     *
     */
    popStencilMask()
    {
        this.renderer.currentRenderer.stop();
        this.renderer.stencilManager.popStencil();
    }

    /**
     *
     * @param {PIXI.DisplayObject} target - Display Object to push the mask to
     * @param {PIXI.Graphics} maskData - The masking data.
>>>>>>> upstream/dev
     */
    pushScissorMask(target, maskData)
    {
        maskData.renderable = true;

<<<<<<< HEAD
        var renderTarget = this.renderer._activeRenderTarget;

        var bounds = maskData.getBounds();
=======
        const renderTarget = this.renderer._activeRenderTarget;

        const bounds = maskData.getBounds();
>>>>>>> upstream/dev

        bounds.fit(renderTarget.size);
        maskData.renderable = false;

        this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);

<<<<<<< HEAD
        var resolution = this.renderer.resolution;
        this.renderer.gl.scissor(bounds.x * resolution,
            (renderTarget.root ? renderTarget.size.height - bounds.y - bounds.height : bounds.y) * resolution,
                               bounds.width * resolution,
                               bounds.height * resolution);

        this.scissorRenderTarget = renderTarget;
        this.scissorData = maskData;
        this.scissor = true;
    }

=======
        const resolution = this.renderer.resolution;

        this.renderer.gl.scissor(
            bounds.x * resolution,
            (renderTarget.root ? renderTarget.size.height - bounds.y - bounds.height : bounds.y) * resolution,
            bounds.width * resolution,
            bounds.height * resolution
        );

        this.scissorRenderTarget = renderTarget;
        this.scissorData = maskData;
        this.scissor = true;
    }

>>>>>>> upstream/dev
    /**
     *
     *
     */
    popScissorMask()
    {
        this.scissorRenderTarget = null;
        this.scissorData = null;
        this.scissor = false;

        // must be scissor!
<<<<<<< HEAD
        var gl = this.renderer.gl;
        gl.disable(gl.SCISSOR_TEST);
    }

}

module.exports = MaskManager;
=======
        const gl = this.renderer.gl;

        gl.disable(gl.SCISSOR_TEST);
    }
}
>>>>>>> upstream/dev
