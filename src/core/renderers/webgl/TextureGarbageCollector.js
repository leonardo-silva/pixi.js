import { GC_MODES } from '../../const';

/**
 * TextureGarbageCollector. This class manages the GPU and ensures that it does not get clogged
 * up with textures that are no longer being used.
 *
 * @class
 * @memberof PIXI
<<<<<<< HEAD
 * @param renderer {PIXI.WebGLRenderer} The renderer this manager works for.
 */
class TextureGarbageCollector {
=======
 */
export default class TextureGarbageCollector
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
     */
>>>>>>> upstream/dev
    constructor(renderer)
    {
        this.renderer = renderer;

        this.count = 0;
        this.checkCount = 0;
        this.maxIdle = 60 * 60;
        this.checkCountMax = 60 * 10;

<<<<<<< HEAD
        this.mode = CONST.GC_MODES.DEFAULT;
=======
        this.mode = GC_MODES.DEFAULT;
>>>>>>> upstream/dev
    }

    /**
     * Checks to see when the last time a texture was used
     * if the texture has not been used for a specified amount of time it will be removed from the GPU
     */
    update()
    {
        this.count++;

<<<<<<< HEAD
        if(this.mode === CONST.GC_MODES.MANUAL)
=======
        if (this.mode === GC_MODES.MANUAL)
>>>>>>> upstream/dev
        {
            return;
        }

        this.checkCount++;

<<<<<<< HEAD

        if(this.checkCount > this.checkCountMax)
=======
        if (this.checkCount > this.checkCountMax)
>>>>>>> upstream/dev
        {
            this.checkCount = 0;

            this.run();
        }
    }

    /**
     * Checks to see when the last time a texture was used
     * if the texture has not been used for a specified amount of time it will be removed from the GPU
     */
    run()
    {
<<<<<<< HEAD
        var tm = this.renderer.textureManager;
        var managedTextures =  tm._managedTextures;
        var wasRemoved = false;
        var i,j;
=======
        const tm = this.renderer.textureManager;
        const managedTextures =  tm._managedTextures;
        let wasRemoved = false;
>>>>>>> upstream/dev

        for (let i = 0; i < managedTextures.length; i++)
        {
<<<<<<< HEAD
            var texture = managedTextures[i];
=======
            const texture = managedTextures[i];
>>>>>>> upstream/dev

            // only supports non generated textures at the moment!
            if (!texture._glRenderTargets && this.count - texture.touched > this.maxIdle)
            {
                tm.destroyTexture(texture, true);
                managedTextures[i] = null;
                wasRemoved = true;
            }
        }

        if (wasRemoved)
        {
<<<<<<< HEAD
            j = 0;

            for (i = 0; i < managedTextures.length; i++)
=======
            let j = 0;

            for (let i = 0; i < managedTextures.length; i++)
>>>>>>> upstream/dev
            {
                if (managedTextures[i] !== null)
                {
                    managedTextures[j++] = managedTextures[i];
                }
            }

            managedTextures.length = j;
        }
    }

    /**
     * Removes all the textures within the specified displayObject and its children from the GPU
     *
<<<<<<< HEAD
     * @param displayObject {PIXI.DisplayObject} the displayObject to remove the textures from.
     */
    unload( displayObject )
    {
        var tm = this.renderer.textureManager;

        if(displayObject._texture)
        {
            tm.destroyTexture(displayObject._texture, true);
        }

        for (var i = displayObject.children.length - 1; i >= 0; i--) {

            this.unload(displayObject.children[i]);

        }
    }

}

module.exports = TextureGarbageCollector;
=======
     * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
     */
    unload(displayObject)
    {
        const tm = this.renderer.textureManager;

        if (displayObject._texture)
        {
            tm.destroyTexture(displayObject._texture, true);
        }

        for (let i = displayObject.children.length - 1; i >= 0; i--)
        {
            this.unload(displayObject.children[i]);
        }
    }
}
>>>>>>> upstream/dev
