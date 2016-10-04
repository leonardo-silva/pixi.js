import { GLTexture } from 'pixi-gl-core';
import { WRAP_MODES, SCALE_MODES } from '../../const';
import RenderTarget from './utils/RenderTarget';
import { removeItems } from '../../utils';

/**
 * Helper class to create a webGL Texture
 *
 * @class
 * @memberof PIXI
 */
<<<<<<< HEAD
class TextureManager {
=======
export default class TextureManager
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - A reference to the current renderer
     */
>>>>>>> upstream/dev
    constructor(renderer)
    {
        /**
         * A reference to the current renderer
         *
         * @member {PIXI.WebGLRenderer}
         */
        this.renderer = renderer;

        /**
         * The current WebGL rendering context
         *
         * @member {WebGLRenderingContext}
         */
<<<<<<< HEAD
	    this.gl = renderer.gl;

	    /**
=======
        this.gl = renderer.gl;

        /**
>>>>>>> upstream/dev
         * Track textures in the renderer so we can no longer listen to them on destruction.
         *
         * @member {Array<*>}
         * @private
         */
<<<<<<< HEAD
	    this._managedTextures = [];
    }

    bindTexture()
    {
    }


    getTexture()
    {
=======
        this._managedTextures = [];
    }

    /**
     * Binds a texture.
     *
     */
    bindTexture()
    {
        // empty
    }

    /**
     * Gets a texture.
     *
     */
    getTexture()
    {
        // empty
>>>>>>> upstream/dev
    }

    /**
     * Updates and/or Creates a WebGL texture for the renderer's context.
     *
<<<<<<< HEAD
     * @param texture {PIXI.BaseTexture|PIXI.Texture} the texture to update
     */
    updateTexture(texture)
    {
	    texture = texture.baseTexture || texture;

        var isRenderTexture = !!texture._glRenderTargets;

	    if (!texture.hasLoaded)
        {
            return;
        }

        var glTexture = texture._glTextures[this.renderer.CONTEXT_UID];

        if (!glTexture)
        {
            if(isRenderTexture)
            {
                var renderTarget = new RenderTarget(this.gl, texture.width, texture.height, texture.scaleMode, texture.resolution);
=======
     * @param {PIXI.BaseTexture|PIXI.Texture} texture - the texture to update
     * @return {GLTexture} The gl texture.
     */
    updateTexture(texture)
    {
        texture = texture.baseTexture || texture;

        const isRenderTexture = !!texture._glRenderTargets;

        if (!texture.hasLoaded)
        {
            return null;
        }

        let glTexture = texture._glTextures[this.renderer.CONTEXT_UID];

        if (!glTexture)
        {
            if (isRenderTexture)
            {
                const renderTarget = new RenderTarget(
                    this.gl,
                    texture.width,
                    texture.height,
                    texture.scaleMode,
                    texture.resolution
                );

>>>>>>> upstream/dev
                renderTarget.resize(texture.width, texture.height);
                texture._glRenderTargets[this.renderer.CONTEXT_UID] = renderTarget;
                glTexture = renderTarget.texture;
            }
            else
            {
                glTexture = new GLTexture(this.gl);
                glTexture.premultiplyAlpha = true;
                glTexture.upload(texture.source);
            }

            texture._glTextures[this.renderer.CONTEXT_UID] = glTexture;

            texture.on('update', this.updateTexture, this);
            texture.on('dispose', this.destroyTexture, this);

            this._managedTextures.push(texture);

<<<<<<< HEAD
            if(texture.isPowerOfTwo)
            {
                if(texture.mipmap)
=======
            if (texture.isPowerOfTwo)
            {
                if (texture.mipmap)
>>>>>>> upstream/dev
                {
                    glTexture.enableMipmap();
                }

<<<<<<< HEAD
                if(texture.wrapMode === CONST.WRAP_MODES.CLAMP)
                {
                    glTexture.enableWrapClamp();
                }
                else if(texture.wrapMode === CONST.WRAP_MODES.REPEAT)
=======
                if (texture.wrapMode === WRAP_MODES.CLAMP)
                {
                    glTexture.enableWrapClamp();
                }
                else if (texture.wrapMode === WRAP_MODES.REPEAT)
>>>>>>> upstream/dev
                {
                    glTexture.enableWrapRepeat();
                }
                else
                {
                    glTexture.enableWrapMirrorRepeat();
                }
            }
            else
            {
                glTexture.enableWrapClamp();
            }

<<<<<<< HEAD
            if(texture.scaleMode === CONST.SCALE_MODES.NEAREST)
=======
            if (texture.scaleMode === SCALE_MODES.NEAREST)
>>>>>>> upstream/dev
            {
                glTexture.enableNearestScaling();
            }
            else
            {
                glTexture.enableLinearScaling();
            }
        }
<<<<<<< HEAD
        else
        {
            // the textur ealrady exists so we only need to update it..
            if(isRenderTexture)
            {
                texture._glRenderTargets[this.renderer.CONTEXT_UID].resize(texture.width, texture.height);
            }
            else
            {
                glTexture.upload(texture.source);
            }
        }

        return  glTexture;
    }

    /**
     * Deletes the texture from WebGL
     *
     * @param texture {PIXI.BaseTexture|PIXI.Texture} the texture to destroy
     * @param [skipRemove=false] {boolean} Whether to skip removing the texture from the TextureManager.
     */
    destroyTexture(texture, skipRemove)
    {
	    texture = texture.baseTexture || texture;

        if (!texture.hasLoaded)
=======
        // the textur ealrady exists so we only need to update it..
        else if (isRenderTexture)
>>>>>>> upstream/dev
        {
            return;
        }

        if (texture._glTextures[this.renderer.CONTEXT_UID])
        {
<<<<<<< HEAD
            texture._glTextures[this.renderer.CONTEXT_UID].destroy();
            texture.off('update', this.updateTexture, this);
            texture.off('dispose', this.destroyTexture, this);


            delete texture._glTextures[this.renderer.CONTEXT_UID];

            if (!skipRemove)
            {
                var i = this._managedTextures.indexOf(texture);
                if (i !== -1) {
                    utils.removeItems(this._managedTextures, i, 1);
                }
            }
        }
    }

    /**
     * Deletes all the textures from WebGL
     */
    removeAll()
    {
	    // empty all the old gl textures as they are useless now
        for (var i = 0; i < this._managedTextures.length; ++i)
        {
            var texture = this._managedTextures[i];
            if (texture._glTextures[this.renderer.CONTEXT_UID])
            {
                delete texture._glTextures[this.renderer.CONTEXT_UID];
=======
            glTexture.upload(texture.source);
        }

        return glTexture;
    }

    /**
     * Deletes the texture from WebGL
     *
     * @param {PIXI.BaseTexture|PIXI.Texture} texture - the texture to destroy
     * @param {boolean} [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
     */
    destroyTexture(texture, skipRemove)
    {
        texture = texture.baseTexture || texture;

        if (!texture.hasLoaded)
        {
            return;
        }

        if (texture._glTextures[this.renderer.CONTEXT_UID])
        {
            texture._glTextures[this.renderer.CONTEXT_UID].destroy();
            texture.off('update', this.updateTexture, this);
            texture.off('dispose', this.destroyTexture, this);

            delete texture._glTextures[this.renderer.CONTEXT_UID];

            if (!skipRemove)
            {
                const i = this._managedTextures.indexOf(texture);

                if (i !== -1)
                {
                    removeItems(this._managedTextures, i, 1);
                }
>>>>>>> upstream/dev
            }
        }
    }

    /**
<<<<<<< HEAD
     * Destroys this manager and removes all its textures
     */
    destroy()
    {
        // destroy managed textures
        for (var i = 0; i < this._managedTextures.length; ++i)
        {
            var texture = this._managedTextures[i];
            this.destroyTexture(texture, true);
            texture.off('update', this.updateTexture, this);
            texture.off('dispose', this.destroyTexture, this);
        }

        this._managedTextures = null;
    }

}
=======
     * Deletes all the textures from WebGL
     */
    removeAll()
    {
        // empty all the old gl textures as they are useless now
        for (let i = 0; i < this._managedTextures.length; ++i)
        {
            const texture = this._managedTextures[i];

            if (texture._glTextures[this.renderer.CONTEXT_UID])
            {
                delete texture._glTextures[this.renderer.CONTEXT_UID];
            }
        }
    }

    /**
     * Destroys this manager and removes all its textures
     */
    destroy()
    {
        // destroy managed textures
        for (let i = 0; i < this._managedTextures.length; ++i)
        {
            const texture = this._managedTextures[i];

            this.destroyTexture(texture, true);
>>>>>>> upstream/dev

            texture.off('update', this.updateTexture, this);
            texture.off('dispose', this.destroyTexture, this);
        }

        this._managedTextures = null;
    }
}
