import { hex2rgb } from '../../utils';
import { SHAPES } from '../../const';
import ObjectRenderer from '../../renderers/webgl/utils/ObjectRenderer';
import WebGLRenderer from '../../renderers/webgl/WebGLRenderer';
import WebGLGraphicsData from './WebGLGraphicsData';
import PrimitiveShader from './shaders/PrimitiveShader';

import buildPoly from './utils/buildPoly';
import buildRectangle from './utils/buildRectangle';
import buildRoundedRectangle from './utils/buildRoundedRectangle';
import buildCircle from './utils/buildCircle';

/**
 * Renders the graphics object.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
<<<<<<< HEAD
class GraphicsRenderer extends ObjectRenderer {
    constructor(renderer)
    {
        super(renderer);

        this.graphicsDataPool = [];

        this.primitiveShader = null;

        this.gl = renderer.gl;

=======
export default class GraphicsRenderer extends ObjectRenderer
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - The renderer this object renderer works for.
     */
    constructor(renderer)
    {
        super(renderer);

        this.graphicsDataPool = [];

        this.primitiveShader = null;

        this.gl = renderer.gl;

>>>>>>> upstream/dev
        // easy access!
        this.CONTEXT_UID = 0;
    }

    /**
     * Called when there is a WebGL context change
     *
     * @private
     *
     */
    onContextChange()
    {
        this.gl = this.renderer.gl;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID;
        this.primitiveShader = new PrimitiveShader(this.gl);
    }

    /**
     * Destroys this renderer.
     *
     */
    destroy()
<<<<<<< HEAD
    {
        ObjectRenderer.prototype.destroy.call(this);

        for (var i = 0; i < this.graphicsDataPool.length; ++i) {
            this.graphicsDataPool[i].destroy();
        }

        this.graphicsDataPool = null;
    }

    /**
     * Renders a graphics object.
     *
     * @param graphics {PIXI.Graphics} The graphics object to render.
     */
    render(graphics)
    {
        var renderer = this.renderer;
        var gl = renderer.gl;

        var webGLData;

        var webGL = graphics._webGL[this.CONTEXT_UID];

        if (!webGL || graphics.dirty !== webGL.dirty )
        {

            this.updateGraphics(graphics);

            webGL = graphics._webGL[this.CONTEXT_UID];
        }



        // This  could be speeded up for sure!
        var shader = this.primitiveShader;
        renderer.bindShader(shader);
        renderer.state.setBlendMode( graphics.blendMode );

        for (var i = 0, n = webGL.data.length; i < n; i++)
        {
            webGLData = webGL.data[i];
            var shaderTemp = webGLData.shader;

            renderer.bindShader(shaderTemp);
            shaderTemp.uniforms.translationMatrix = graphics.transform.worldTransform.toArray(true);
            shaderTemp.uniforms.tint = utils.hex2rgb(graphics.tint);
            shaderTemp.uniforms.alpha = graphics.worldAlpha;

            webGLData.vao.bind()
            .draw(gl.TRIANGLE_STRIP,  webGLData.indices.length)
=======
    {
        ObjectRenderer.prototype.destroy.call(this);

        for (let i = 0; i < this.graphicsDataPool.length; ++i)
        {
            this.graphicsDataPool[i].destroy();
        }

        this.graphicsDataPool = null;
    }

    /**
     * Renders a graphics object.
     *
     * @param {PIXI.Graphics} graphics - The graphics object to render.
     */
    render(graphics)
    {
        const renderer = this.renderer;
        const gl = renderer.gl;

        let webGLData;
        let webGL = graphics._webGL[this.CONTEXT_UID];

        if (!webGL || graphics.dirty !== webGL.dirty)
        {
            this.updateGraphics(graphics);

            webGL = graphics._webGL[this.CONTEXT_UID];
        }

        // This  could be speeded up for sure!
        const shader = this.primitiveShader;

        renderer.bindShader(shader);
        renderer.state.setBlendMode(graphics.blendMode);

        for (let i = 0, n = webGL.data.length; i < n; i++)
        {
            webGLData = webGL.data[i];
            const shaderTemp = webGLData.shader;

            renderer.bindShader(shaderTemp);
            shaderTemp.uniforms.translationMatrix = graphics.transform.worldTransform.toArray(true);
            shaderTemp.uniforms.tint = hex2rgb(graphics.tint);
            shaderTemp.uniforms.alpha = graphics.worldAlpha;

            webGLData.vao.bind()
            .draw(gl.TRIANGLE_STRIP, webGLData.indices.length)
>>>>>>> upstream/dev
            .unbind();
        }
    }

    /**
     * Updates the graphics object
     *
     * @private
<<<<<<< HEAD
     * @param graphics {PIXI.Graphics} The graphics object to update
     */
    updateGraphics(graphics)
    {
        var gl = this.renderer.gl;

         // get the contexts graphics object
        var webGL = graphics._webGL[this.CONTEXT_UID];
=======
     * @param {PIXI.Graphics} graphics - The graphics object to update
     */
    updateGraphics(graphics)
    {
        const gl = this.renderer.gl;

         // get the contexts graphics object
        let webGL = graphics._webGL[this.CONTEXT_UID];
>>>>>>> upstream/dev

        // if the graphics object does not exist in the webGL context time to create it!
        if (!webGL)
        {
<<<<<<< HEAD
            webGL = graphics._webGL[this.CONTEXT_UID] = {lastIndex:0, data:[], gl:gl, clearDirty:-1, dirty:-1};

=======
            webGL = graphics._webGL[this.CONTEXT_UID] = { lastIndex: 0, data: [], gl, clearDirty: -1, dirty: -1 };
>>>>>>> upstream/dev
        }

        // flag the graphics as not dirty as we are about to update it...
        webGL.dirty = graphics.dirty;

<<<<<<< HEAD
        var i;

=======
>>>>>>> upstream/dev
        // if the user cleared the graphics object we will need to clear every object
        if (graphics.clearDirty !== webGL.clearDirty)
        {
            webGL.clearDirty = graphics.clearDirty;

            // loop through and return all the webGLDatas to the object pool so than can be reused later on
<<<<<<< HEAD
            for (i = 0; i < webGL.data.length; i++)
            {
                var graphicsData = webGL.data[i];
                this.graphicsDataPool.push( graphicsData );
            }

            // clear the array and reset the index..
            webGL.data = [];
            webGL.lastIndex = 0;
        }

        var webGLData;
=======
            for (let i = 0; i < webGL.data.length; i++)
            {
                this.graphicsDataPool.push(webGL.data[i]);
            }

            // clear the array and reset the index..
            webGL.data.length = 0;
            webGL.lastIndex = 0;
        }

        let webGLData;
>>>>>>> upstream/dev

        // loop through the graphics datas and construct each one..
        // if the object is a complex fill then the new stencil buffer technique will be used
        // other wise graphics objects will be pushed into a batch..
<<<<<<< HEAD
        for (i = webGL.lastIndex; i < graphics.graphicsData.length; i++)
        {
            var data = graphics.graphicsData[i];

            //TODO - this can be simplified
            webGLData = this.getWebGLData(webGL, 0);

            if (data.type === CONST.SHAPES.POLY)
            {
                buildPoly(data, webGLData);
            }
            if (data.type === CONST.SHAPES.RECT)
            {
                buildRectangle(data, webGLData);
            }
            else if (data.type === CONST.SHAPES.CIRC || data.type === CONST.SHAPES.ELIP)
            {
                buildCircle(data, webGLData);
            }
            else if (data.type === CONST.SHAPES.RREC)
=======
        for (let i = webGL.lastIndex; i < graphics.graphicsData.length; i++)
        {
            const data = graphics.graphicsData[i];

            // TODO - this can be simplified
            webGLData = this.getWebGLData(webGL, 0);

            if (data.type === SHAPES.POLY)
            {
                buildPoly(data, webGLData);
            }
            if (data.type === SHAPES.RECT)
            {
                buildRectangle(data, webGLData);
            }
            else if (data.type === SHAPES.CIRC || data.type === SHAPES.ELIP)
            {
                buildCircle(data, webGLData);
            }
            else if (data.type === SHAPES.RREC)
>>>>>>> upstream/dev
            {
                buildRoundedRectangle(data, webGLData);
            }

            webGL.lastIndex++;
        }

        // upload all the dirty data...
<<<<<<< HEAD
        for (i = 0; i < webGL.data.length; i++)
=======
        for (let i = 0; i < webGL.data.length; i++)
>>>>>>> upstream/dev
        {
            webGLData = webGL.data[i];

            if (webGLData.dirty)
            {
                webGLData.upload();
            }
        }
    }

    /**
     *
     * @private
<<<<<<< HEAD
     * @param webGL {WebGLRenderingContext} the current WebGL drawing context
     * @param type {number} TODO @Alvin
     */
    getWebGLData(webGL, type)
    {
        var webGLData = webGL.data[webGL.data.length-1];

        if (!webGLData || webGLData.points.length > 320000)
        {
            webGLData = this.graphicsDataPool.pop() || new WebGLGraphicsData(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState);
            webGLData.reset(type);
            webGL.data.push(webGLData);
=======
     * @param {WebGLRenderingContext} gl - the current WebGL drawing context
     * @param {number} type - TODO @Alvin
     * @return {*} TODO
     */
    getWebGLData(gl, type)
    {
        let webGLData = gl.data[gl.data.length - 1];

        if (!webGLData || webGLData.points.length > 320000)
        {
            webGLData = this.graphicsDataPool.pop()
                || new WebGLGraphicsData(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState);

            webGLData.reset(type);
            gl.data.push(webGLData);
>>>>>>> upstream/dev
        }

        webGLData.dirty = true;

        return webGLData;
    }
}

<<<<<<< HEAD
}

module.exports = GraphicsRenderer;

=======
>>>>>>> upstream/dev
WebGLRenderer.registerPlugin('graphics', GraphicsRenderer);
