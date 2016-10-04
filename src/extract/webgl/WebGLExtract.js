import * as core from '../../core';

const TEMP_RECT = new core.Rectangle();
const BYTES_PER_PIXEL = 4;

/**
 * The extract manager provides functionality to export content from the renderers.
 *
 * @class
 * @memberof PIXI
 */
<<<<<<< HEAD
class WebGLExtract {
=======
export default class WebGLExtract
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - A reference to the current renderer
     */
>>>>>>> upstream/dev
    constructor(renderer)
    {
        this.renderer = renderer;
        renderer.extract = this;
    }
<<<<<<< HEAD

    /**
     * Will return a HTML Image of the target
     *
     * @param target {PIXI.DisplayObject|PIXI.RenderTexture} A displayObject or renderTexture to convert. If left empty will use use the main renderer
     * @return {HTMLImageElement} HTML Image of the target
     */
    image( target )
    {
	    var image = new Image();
        image.src = this.base64( target );
=======

    /**
     * Will return a HTML Image of the target
     *
     * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
     *  to convert. If left empty will use use the main renderer
     * @return {HTMLImageElement} HTML Image of the target
     */
    image(target)
    {
        const image = new Image();

        image.src = this.base64(target);

>>>>>>> upstream/dev
        return image;
    }

    /**
<<<<<<< HEAD
     * Will return a a base64 encoded string of this target. It works by calling WebGLExtract.getCanvas and then running toDataURL on that.
     * @param target {PIXI.DisplayObject|PIXI.RenderTexture} A displayObject or renderTexture to convert. If left empty will use use the main renderer
     * @return {string} A base64 encoded string of the texture.
     */
    base64( target )
    {
        return this.canvas( target ).toDataURL();
=======
     * Will return a a base64 encoded string of this target. It works by calling
     *  `WebGLExtract.getCanvas` and then running toDataURL on that.
     *
     * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
     *  to convert. If left empty will use use the main renderer
     * @return {string} A base64 encoded string of the texture.
     */
    base64(target)
    {
        return this.canvas(target).toDataURL();
>>>>>>> upstream/dev
    }

    /**
     * Creates a Canvas element, renders this target to it and then returns it.
<<<<<<< HEAD
     * @param target {PIXI.DisplayObject|PIXI.RenderTexture} A displayObject or renderTexture to convert. If left empty will use use the main renderer
     * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.
     */
    canvas( target )
    {
	    var renderer = this.renderer;
	    var textureBuffer;
	    var resolution;
        var frame;
        var flipY = false;
        var renderTexture;

        if(target)
        {
            if(target instanceof core.RenderTexture)
            {
                renderTexture = target;
            }
            else
            {
                renderTexture = this.renderer.generateTexture(target);

            }
        }

	    if(renderTexture)
	    {
		    textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID];
		    resolution = textureBuffer.resolution;
	        frame = renderTexture.frame;
            flipY = false;
        }
	    else
	    {
		    textureBuffer = this.renderer.rootRenderTarget;
		    resolution = textureBuffer.resolution;
            flipY = true;

            frame = tempRect;
            frame.width = textureBuffer.size.width;
            frame.height = textureBuffer.size.height;

	    }
=======
     *
     * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
     *  to convert. If left empty will use use the main renderer
     * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.
     */
    canvas(target)
    {
        const renderer = this.renderer;
        let textureBuffer;
        let resolution;
        let frame;
        let flipY = false;
        let renderTexture;

        if (target)
        {
            if (target instanceof core.RenderTexture)
            {
                renderTexture = target;
            }
            else
            {
                renderTexture = this.renderer.generateTexture(target);
            }
        }

        if (renderTexture)
        {
            textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID];
            resolution = textureBuffer.resolution;
            frame = renderTexture.frame;
            flipY = false;
        }
        else
        {
            textureBuffer = this.renderer.rootRenderTarget;
            resolution = textureBuffer.resolution;
            flipY = true;

            frame = TEMP_RECT;
            frame.width = textureBuffer.size.width;
            frame.height = textureBuffer.size.height;
        }

        const width = frame.width * resolution;
        const height = frame.height * resolution;
>>>>>>> upstream/dev

        const canvasBuffer = new core.CanvasRenderTarget(width, height);

        if (textureBuffer)
        {
            // bind the buffer
            renderer.bindRenderTarget(textureBuffer);

            // set up an array of pixels
            const webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);

            // read pixels to the array
            const gl = renderer.gl;

            gl.readPixels(
                frame.x * resolution,
                frame.y * resolution,
                width,
                height,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                webglPixels
            );

            // add the pixels to the canvas
            const canvasData = canvasBuffer.context.getImageData(0, 0, width, height);

            canvasData.data.set(webglPixels);

            canvasBuffer.context.putImageData(canvasData, 0, 0);

            // pulling pixels
            if (flipY)
            {
                canvasBuffer.context.scale(1, -1);
                canvasBuffer.context.drawImage(canvasBuffer.canvas, 0, -height);
            }
        }

<<<<<<< HEAD
        var width = frame.width * resolution;
        var height = frame.height * resolution;

       	var canvasBuffer = new core.CanvasRenderTarget(width, height);

        if(textureBuffer)
        {
            // bind the buffer
            renderer.bindRenderTarget(textureBuffer);

            // set up an array of pixels
            var webGLPixels = new Uint8Array(4 * width * height);

            // read pixels to the array
            var gl = renderer.gl;
            gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webGLPixels);

            // add the pixels to the canvas
            var canvasData = canvasBuffer.context.getImageData(0, 0, width, height);
            canvasData.data.set(webGLPixels);

            canvasBuffer.context.putImageData(canvasData, 0, 0);

            // pulling pixels
            if(flipY)
            {
                canvasBuffer.context.scale(1, -1);
                canvasBuffer.context.drawImage(canvasBuffer.canvas, 0,-height);
            }
        }

         // send the canvas back..
        return canvasBuffer.canvas;
    }

    /**
     * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA order, with integer values between 0 and 255 (included).
     * @param target {PIXI.DisplayObject|PIXI.RenderTexture} A displayObject or renderTexture to convert. If left empty will use use the main renderer
     * @return {Uint8ClampedArray} One-dimensional array containing the pixel data of the entire texture
     */
    pixels( target )
    {
        var renderer = this.renderer;
        var textureBuffer;
        var resolution;
        var frame;
        var renderTexture;

        if(target)
        {
            if(target instanceof core.RenderTexture)
            {
                renderTexture = target;
            }
            else
            {
                renderTexture = this.renderer.generateTexture(target);
            }
=======
         // send the canvas back..
        return canvasBuffer.canvas;
    }

    /**
     * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
     * order, with integer values between 0 and 255 (included).
     *
     * @param {PIXI.DisplayObject|PIXI.RenderTexture} target - A displayObject or renderTexture
     *  to convert. If left empty will use use the main renderer
     * @return {Uint8ClampedArray} One-dimensional array containing the pixel data of the entire texture
     */
    pixels(target)
    {
        const renderer = this.renderer;
        let textureBuffer;
        let resolution;
        let frame;
        let renderTexture;

        if (target)
        {
            if (target instanceof core.RenderTexture)
            {
                renderTexture = target;
            }
            else
            {
                renderTexture = this.renderer.generateTexture(target);
            }
        }

        if (renderTexture)
        {
            textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID];
            resolution = textureBuffer.resolution;
            frame = renderTexture.frame;
>>>>>>> upstream/dev
        }

        if(renderTexture)
        {
<<<<<<< HEAD
            textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID];
            resolution = textureBuffer.resolution;
            frame = renderTexture.frame;

        }
        else
        {
            textureBuffer = this.renderer.rootRenderTarget;
            resolution = textureBuffer.resolution;

            frame = tempRect;
=======
            textureBuffer = this.renderer.rootRenderTarget;
            resolution = textureBuffer.resolution;

            frame = TEMP_RECT;
>>>>>>> upstream/dev
            frame.width = textureBuffer.size.width;
            frame.height = textureBuffer.size.height;
        }

<<<<<<< HEAD
        var width = frame.width * resolution;
        var height = frame.height * resolution;

        var webGLPixels = new Uint8Array(4 * width * height);

        if(textureBuffer)
=======
        const width = frame.width * resolution;
        const height = frame.height * resolution;

        const webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);

        if (textureBuffer)
>>>>>>> upstream/dev
        {
            // bind the buffer
            renderer.bindRenderTarget(textureBuffer);
            // read pixels to the array
<<<<<<< HEAD
            var gl = renderer.gl;
            gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webGLPixels);
        }

        return webGLPixels;
=======
            const gl = renderer.gl;

            gl.readPixels(
                frame.x * resolution,
                frame.y * resolution,
                width,
                height,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                webglPixels
            );
        }

        return webglPixels;
>>>>>>> upstream/dev
    }

    /**
     * Destroys the extract
     *
     */
    destroy()
    {
        this.renderer.extract = null;
        this.renderer = null;
    }
<<<<<<< HEAD

}

module.exports = WebGLExtract;
=======
}
>>>>>>> upstream/dev

core.WebGLRenderer.registerPlugin('extract', WebGLExtract);
