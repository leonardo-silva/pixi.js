import WebGLManager from './WebGLManager';
import RenderTarget from '../utils/RenderTarget';
import Quad from '../utils/Quad';
import { Rectangle } from '../../../math';
import Shader from '../../../Shader';
import * as filterTransforms from '../filters/filterTransforms';
import bitTwiddle from 'bit-twiddle';

<<<<<<< HEAD
var WebGLManager = require('./WebGLManager'),
    RenderTarget = require('../utils/RenderTarget'),
    Quad = require('../utils/Quad'),
    math =  require('../../../math'),
    Shader = require('../../../Shader'),
    filterTransforms = require('../filters/filterTransforms'),
    bitTwiddle = require('bit-twiddle');

class FilterState {
    constructor()
    {
        this.renderTarget = null;
        this.sourceFrame = new math.Rectangle();
        this.destinationFrame = new math.Rectangle();
=======
/**
 * @ignore
 * @class
 */
class FilterState
{
    /**
     *
     */
    constructor()
    {
        this.renderTarget = null;
        this.sourceFrame = new Rectangle();
        this.destinationFrame = new Rectangle();
>>>>>>> upstream/dev
        this.filters = [];
        this.target = null;
        this.resolution = 1;
    }
}

/**
 * @class
 * @memberof PIXI
 * @extends PIXI.WebGLManager
 */
<<<<<<< HEAD
class FilterManager extends WebGLManager {
=======
export default class FilterManager extends WebGLManager
{
    /**
     * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
     */
>>>>>>> upstream/dev
    constructor(renderer)
    {
        super(renderer);

        this.gl = this.renderer.gl;
        // know about sprites!
        this.quad = new Quad(this.gl, renderer.state.attribState);

        this.shaderCache = {};
        // todo add default!
        this.pool = {};

        this.filterData = null;
    }

<<<<<<< HEAD
    pushFilter(target, filters)
    {
        var renderer = this.renderer;

        var filterData = this.filterData;

        if(!filterData)
=======
    /**
     * Adds a new filter to the manager.
     *
     * @param {PIXI.DisplayObject} target - The target of the filter to render.
     * @param {PIXI.Filter[]} filters - The filters to apply.
     */
    pushFilter(target, filters)
    {
        const renderer = this.renderer;

        let filterData = this.filterData;

        if (!filterData)
>>>>>>> upstream/dev
        {
            filterData = this.renderer._activeRenderTarget.filterStack;

            // add new stack
<<<<<<< HEAD
            var filterState = new FilterState();
            filterState.sourceFrame = filterState.destinationFrame = this.renderer._activeRenderTarget.size;
            filterState.renderTarget = renderer._activeRenderTarget;

            this.renderer._activeRenderTarget.filterData = filterData = {
                index:0,
                stack:[filterState]
            };

            this.filterData = filterData;
        }

        // get the current filter state..
        var currentState = filterData.stack[++filterData.index];
        if(!currentState)
        {
            currentState = filterData.stack[filterData.index] = new FilterState();
        }

        // for now we go off the filter of the first resolution..
        var resolution = filters[0].resolution;
        var padding = filters[0].padding;
        var targetBounds = target.filterArea || target.getBounds(true);
        var sourceFrame = currentState.sourceFrame;
        var destinationFrame = currentState.destinationFrame;

        sourceFrame.x = ((targetBounds.x * resolution) | 0) / resolution;
        sourceFrame.y = ((targetBounds.y * resolution) | 0) / resolution;
        sourceFrame.width = ((targetBounds.width * resolution) | 0) / resolution;
        sourceFrame.height = ((targetBounds.height * resolution) | 0) / resolution;

        if(filterData.stack[0].renderTarget.transform)
        {//jshint ignore:line

            // TODO we should fit the rect around the transform..
        }
        else
        {

            sourceFrame.fit(filterData.stack[0].destinationFrame);
        }


        destinationFrame.width = sourceFrame.width;
        destinationFrame.height = sourceFrame.height;


        // lets pplay the padding After we fit the element to the screen.
        // this should stop the strange side effects that can occour when cropping to the edges
        sourceFrame.pad(padding);

        var renderTarget = this.getPotRenderTarget(renderer.gl, sourceFrame.width, sourceFrame.height, resolution);
=======
            const filterState = new FilterState();

            filterState.sourceFrame = filterState.destinationFrame = this.renderer._activeRenderTarget.size;
            filterState.renderTarget = renderer._activeRenderTarget;

            this.renderer._activeRenderTarget.filterData = filterData = {
                index: 0,
                stack: [filterState],
            };

            this.filterData = filterData;
        }

        // get the current filter state..
        let currentState = filterData.stack[++filterData.index];

        if (!currentState)
        {
            currentState = filterData.stack[filterData.index] = new FilterState();
        }

        // for now we go off the filter of the first resolution..
        const resolution = filters[0].resolution;
        const padding = filters[0].padding | 0;
        const targetBounds = target.filterArea || target.getBounds(true);
        const sourceFrame = currentState.sourceFrame;
        const destinationFrame = currentState.destinationFrame;

        sourceFrame.x = ((targetBounds.x * resolution) | 0) / resolution;
        sourceFrame.y = ((targetBounds.y * resolution) | 0) / resolution;
        sourceFrame.width = ((targetBounds.width * resolution) | 0) / resolution;
        sourceFrame.height = ((targetBounds.height * resolution) | 0) / resolution;

        if (filterData.stack[0].renderTarget.transform)
        { //

            // TODO we should fit the rect around the transform..
        }
        else
        {
            sourceFrame.fit(filterData.stack[0].destinationFrame);
        }

         // lets pplay the padding After we fit the element to the screen.
        // this should stop the strange side effects that can occour when cropping to the edges
        sourceFrame.pad(padding);

        destinationFrame.width = sourceFrame.width;
        destinationFrame.height = sourceFrame.height;

        // lets play the padding after we fit the element to the screen.
        // this should stop the strange side effects that can occour when cropping to the edges

        const renderTarget = this.getPotRenderTarget(renderer.gl, sourceFrame.width, sourceFrame.height, resolution);
>>>>>>> upstream/dev

        currentState.target = target;
        currentState.filters = filters;
        currentState.resolution = resolution;
        currentState.renderTarget = renderTarget;

        // bind the render taget to draw the shape in the top corner..

        renderTarget.setFrame(destinationFrame, sourceFrame);
        // bind the render target
        renderer.bindRenderTarget(renderTarget);

        // clear the renderTarget
<<<<<<< HEAD
        renderer.clear();//[0.5,0.5,0.5, 1.0]);
    }

    popFilter()
    {
        var filterData = this.filterData;

        var lastState = filterData.stack[filterData.index-1];
        var currentState = filterData.stack[filterData.index];

        this.quad.map(currentState.renderTarget.size, currentState.sourceFrame).upload();

        var filters = currentState.filters;

        if(filters.length === 1)
=======
        renderer.clear();// [0.5,0.5,0.5, 1.0]);
    }

    /**
     * Pops off the filter and applies it.
     *
     */
    popFilter()
    {
        const filterData = this.filterData;

        const lastState = filterData.stack[filterData.index - 1];
        const currentState = filterData.stack[filterData.index];

        this.quad.map(currentState.renderTarget.size, currentState.sourceFrame).upload();

        const filters = currentState.filters;

        if (filters.length === 1)
>>>>>>> upstream/dev
        {
            filters[0].apply(this, currentState.renderTarget, lastState.renderTarget, false);
            this.freePotRenderTarget(currentState.renderTarget);
        }
        else
        {
<<<<<<< HEAD
            var flip = currentState.renderTarget;
            var flop = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, 1);
            flop.setFrame(currentState.destinationFrame, currentState.sourceFrame);

            for (var i = 0; i < filters.length-1; i++)
            {
                filters[i].apply(this, flip, flop, true);

                var t = flip;
                flip = flop;
                flop = t;
            }

            filters[i].apply(this, flip, lastState.renderTarget, false);

            this.freePotRenderTarget(flip);
            this.freePotRenderTarget(flop);
        }

        filterData.index--;

        if(filterData.index === 0)
        {
            this.filterData = null;
        }
    }

    applyFilter(filter, input, output, clear)
    {
        var renderer = this.renderer;
        var shader = filter.glShaders[renderer.CONTEXT_UID];

        // cacheing..
        if(!shader)
        {
            if(filter.glShaderKey)
            {
                shader = this.shaderCache[filter.glShaderKey];

                if(!shader)
                {
                    shader = filter.glShaders[renderer.CONTEXT_UID] = this.shaderCache[filter.glShaderKey] = new Shader(this.gl, filter.vertexSrc, filter.fragmentSrc);
=======
            let flip = currentState.renderTarget;
            let flop = this.getPotRenderTarget(
                this.renderer.gl,
                currentState.sourceFrame.width,
                currentState.sourceFrame.height,
                currentState.resolution
            );

            flop.setFrame(currentState.destinationFrame, currentState.sourceFrame);

            let i = 0;

            for (i = 0; i < filters.length - 1; ++i)
            {
                filters[i].apply(this, flip, flop, true);

                const t = flip;

                flip = flop;
                flop = t;
            }

            filters[i].apply(this, flip, lastState.renderTarget, false);

            this.freePotRenderTarget(flip);
            this.freePotRenderTarget(flop);
        }

        filterData.index--;

        if (filterData.index === 0)
        {
            this.filterData = null;
        }
    }

    /**
     * Draws a filter.
     *
     * @param {PIXI.Filter} filter - The filter to draw.
     * @param {PIXI.RenderTarget} input - The input render target.
     * @param {PIXI.RenderTarget} output - The target to output to.
     * @param {boolean} clear - Should the output be cleared before rendering to it
     */
    applyFilter(filter, input, output, clear)
    {
        const renderer = this.renderer;
        let shader = filter.glShaders[renderer.CONTEXT_UID];

        // cacheing..
        if (!shader)
        {
            if (filter.glShaderKey)
            {
                shader = this.shaderCache[filter.glShaderKey];

                if (!shader)
                {
                    shader = new Shader(this.gl, filter.vertexSrc, filter.fragmentSrc);

                    filter.glShaders[renderer.CONTEXT_UID] = this.shaderCache[filter.glShaderKey] = shader;
>>>>>>> upstream/dev
                }
            }
            else
            {
                shader = filter.glShaders[renderer.CONTEXT_UID] = new Shader(this.gl, filter.vertexSrc, filter.fragmentSrc);
            }
<<<<<<< HEAD

            //TODO - this only needs to be done once?
            this.quad.initVao(shader);
        }

        renderer.bindRenderTarget(output);
=======

            // TODO - this only needs to be done once?
            this.quad.initVao(shader);
        }

        renderer.bindRenderTarget(output);

        if (clear)
        {
            const gl = renderer.gl;

            gl.disable(gl.SCISSOR_TEST);
            renderer.clear();// [1, 1, 1, 1]);
            gl.enable(gl.SCISSOR_TEST);
        }

        // in case the render target is being masked using a scissor rect
        if (output === renderer.maskManager.scissorRenderTarget)
        {
            renderer.maskManager.pushScissorMask(null, renderer.maskManager.scissorData);
        }

        renderer.bindShader(shader);
>>>>>>> upstream/dev

        // this syncs the pixi filters  uniforms with glsl uniforms
        this.syncUniforms(shader, filter);

        // bind the input texture..
        input.texture.bind(0);
        // when you manually bind a texture, please switch active texture location to it
        renderer._activeTextureLocation = 0;

<<<<<<< HEAD
        if(clear)
        {
            var gl = renderer.gl;

            gl.disable(gl.SCISSOR_TEST);
            renderer.clear();//[1, 1, 1, 1]);
            gl.enable(gl.SCISSOR_TEST);
        }

        // in case the render target is being masked using a scissor rect
        if(output === renderer.maskManager.scissorRenderTarget)
        {
            renderer.maskManager.pushScissorMask(null, renderer.maskManager.scissorData);
        }

        renderer.bindShader(shader);

        // this syncs the pixi filters  uniforms with glsl uniforms
        this.syncUniforms(shader, filter);

        // bind the input texture..
        input.texture.bind(0);
        // when you manually bind a texture, please switch active texture location to it
        renderer._activeTextureLocation = 0;

        renderer.state.setBlendMode( filter.blendMode );

        this.quad.draw();
    }

    // this returns a matrix that will normalise map filter cords in the filter to screen space
    syncUniforms(shader, filter)
    {
        var uniformData = filter.uniformData;
        var uniforms = filter.uniforms;

        // 0 is reserverd for the pixi texture so we start at 1!
        var textureCount = 1;
        var currentState;

        if(shader.uniforms.data.filterArea)
        {
            currentState = this.filterData.stack[this.filterData.index];
            var filterArea = shader.uniforms.filterArea;

            filterArea[0] = currentState.renderTarget.size.width;
            filterArea[1] = currentState.renderTarget.size.height;
            filterArea[2] = currentState.sourceFrame.x;
            filterArea[3] = currentState.sourceFrame.y;

            shader.uniforms.filterArea = filterArea;
        }

        // use this to clamp displaced texture coords so they belong to filterArea
        // see displacementFilter fragment shader for an example
        if(shader.uniforms.data.filterClamp)
        {
            currentState = this.filterData.stack[this.filterData.index];
            var filterClamp = shader.uniforms.filterClamp;

            filterClamp[0] = 0.5 / currentState.renderTarget.size.width;
            filterClamp[1] = 0.5 / currentState.renderTarget.size.height;
            filterClamp[2] = (currentState.sourceFrame.width - 0.5) / currentState.renderTarget.size.width;
            filterClamp[3] = (currentState.sourceFrame.height - 0.5) / currentState.renderTarget.size.height;
=======
        renderer.state.setBlendMode(filter.blendMode);

        this.quad.draw();
    }

    /**
     * Uploads the uniforms of the filter.
     *
     * @param {GLShader} shader - The underlying gl shader.
     * @param {PIXI.Filter} filter - The filter we are synchronizing.
     */
    syncUniforms(shader, filter)
    {
        const uniformData = filter.uniformData;
        const uniforms = filter.uniforms;

        // 0 is reserverd for the pixi texture so we start at 1!
        let textureCount = 1;
        let currentState;

        if (shader.uniforms.data.filterArea)
        {
            currentState = this.filterData.stack[this.filterData.index];
            const filterArea = shader.uniforms.filterArea;

            filterArea[0] = currentState.renderTarget.size.width;
            filterArea[1] = currentState.renderTarget.size.height;
            filterArea[2] = currentState.sourceFrame.x;
            filterArea[3] = currentState.sourceFrame.y;

            shader.uniforms.filterArea = filterArea;
        }

        // use this to clamp displaced texture coords so they belong to filterArea
        // see displacementFilter fragment shader for an example
        if (shader.uniforms.data.filterClamp)
        {
            currentState = this.filterData.stack[this.filterData.index];

            const filterClamp = shader.uniforms.filterClamp;

            filterClamp[0] = 0;
            filterClamp[1] = 0;
            filterClamp[2] = (currentState.sourceFrame.width - 1) / currentState.renderTarget.size.width;
            filterClamp[3] = (currentState.sourceFrame.height - 1) / currentState.renderTarget.size.height;
>>>>>>> upstream/dev

            shader.uniforms.filterClamp = filterClamp;
        }

<<<<<<< HEAD
        var val;
        //TODO Cacheing layer..
        for(var i in uniformData)
        {
            if(uniformData[i].type === 'sampler2D')
            {
                shader.uniforms[i] = textureCount;

                if(uniforms[i].baseTexture)
=======
        // TODO Cacheing layer..
        for (const i in uniformData)
        {
            if (uniformData[i].type === 'sampler2D')
            {
                shader.uniforms[i] = textureCount;

                if (uniforms[i].baseTexture)
>>>>>>> upstream/dev
                {
                    this.renderer.bindTexture(uniforms[i].baseTexture, textureCount);
                }
                else
                {
                    // this is helpful as renderTargets can also be set.
                    // Although thinking about it, we could probably
                    // make the filter texture cache return a RenderTexture
                    // rather than a renderTarget
<<<<<<< HEAD
                    var gl = this.renderer.gl;
                    this.renderer._activeTextureLocation = gl.TEXTURE0 + textureCount;
                    gl.activeTexture(gl.TEXTURE0 + textureCount );
=======
                    const gl = this.renderer.gl;

                    this.renderer._activeTextureLocation = gl.TEXTURE0 + textureCount;

                    gl.activeTexture(gl.TEXTURE0 + textureCount);
>>>>>>> upstream/dev
                    uniforms[i].texture.bind();
                }

                textureCount++;
            }
<<<<<<< HEAD
            else if(uniformData[i].type === 'mat3')
            {
                // check if its pixi matrix..
                if(uniforms[i].a !== undefined)
=======
            else if (uniformData[i].type === 'mat3')
            {
                // check if its pixi matrix..
                if (uniforms[i].a !== undefined)
>>>>>>> upstream/dev
                {
                    shader.uniforms[i] = uniforms[i].toArray(true);
                }
                else
                {
                    shader.uniforms[i] = uniforms[i];
                }
            }
<<<<<<< HEAD
            else if(uniformData[i].type === 'vec2')
            {
                //check if its a point..
               if(uniforms[i].x !== undefined)
               {
                    val = shader.uniforms[i] || new Float32Array(2);
                    val[0] = uniforms[i].x;
                    val[1] = uniforms[i].y;
                    shader.uniforms[i] = val;
               }
               else
               {
                    shader.uniforms[i] = uniforms[i];
               }
            }
            else if(uniformData[i].type === 'float')
            {
                if(shader.uniforms.data[i].value !== uniformData[i])
=======
            else if (uniformData[i].type === 'vec2')
            {
                // check if its a point..
                if (uniforms[i].x !== undefined)
               {
                    const val = shader.uniforms[i] || new Float32Array(2);

                    val[0] = uniforms[i].x;
                    val[1] = uniforms[i].y;
                    shader.uniforms[i] = val;
                }
                else
               {
                    shader.uniforms[i] = uniforms[i];
                }
            }
            else if (uniformData[i].type === 'float')
            {
                if (shader.uniforms.data[i].value !== uniformData[i])
>>>>>>> upstream/dev
                {
                    shader.uniforms[i] = uniforms[i];
                }
            }
            else
            {
                shader.uniforms[i] = uniforms[i];
            }
        }
    }

    /**
     * Gets a render target from the pool, or creates a new one.
     *
     * @param {boolean} clear - Should we clear the render texture when we get it?
     * @param {number} resolution - The resolution of the target.
     * @return {PIXI.RenderTarget} The new render target
     */
    getRenderTarget(clear, resolution)
    {
        const currentState = this.filterData.stack[this.filterData.index];
        const renderTarget = this.getPotRenderTarget(
            this.renderer.gl,
            currentState.sourceFrame.width,
            currentState.sourceFrame.height,
            resolution || currentState.resolution
        );

<<<<<<< HEAD
    getRenderTarget(clear, resolution)
    {
        var currentState = this.filterData.stack[this.filterData.index];
        var renderTarget = this.getPotRenderTarget(this.renderer.gl, currentState.sourceFrame.width, currentState.sourceFrame.height, resolution || currentState.resolution);
=======
>>>>>>> upstream/dev
        renderTarget.setFrame(currentState.destinationFrame, currentState.sourceFrame);

        return renderTarget;
    }

<<<<<<< HEAD
    returnRenderTarget(renderTarget)
    {
        return this.freePotRenderTarget(renderTarget);
    }

    /*
     * Calculates the mapped matrix
     * @param filterArea {Rectangle} The filter area
     * @param sprite {Sprite} the target sprite
     * @param outputMatrix {Matrix} @alvin
     */
    // TODO playing around here.. this is temporary - (will end up in the shader)
    // thia returns a matrix that will normalise map filter cords in the filter to screen space
    calculateScreenSpaceMatrix(outputMatrix)
    {
        var currentState = this.filterData.stack[this.filterData.index];
        return filterTransforms.calculateScreenSpaceMatrix(outputMatrix,  currentState.sourceFrame, currentState.renderTarget.size);
    }

    /**
     * Multiply vTextureCoord to this matrix to achieve (0,0,1,1) for filterArea
     *
     * @param outputMatrix {PIXI.Matrix}
     */
    calculateNormalizedScreenSpaceMatrix(outputMatrix)
    {
        var currentState = this.filterData.stack[this.filterData.index];

        return filterTransforms.calculateNormalizedScreenSpaceMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, currentState.destinationFrame);
    }

    // this will map the filter coord so that a texture can be used based on the transform of a sprite
    calculateSpriteMatrix(outputMatrix, sprite)
    {
        var currentState = this.filterData.stack[this.filterData.index];
        return filterTransforms.calculateSpriteMatrix(outputMatrix, currentState.sourceFrame, currentState.renderTarget.size, sprite);
    }

    destroy()
    {
         this.shaderCache = [];
         this.emptyPool();
=======
    /**
     * Returns a render target to the pool.
     *
     * @param {PIXI.RenderTarget} renderTarget - The render target to return.
     */
    returnRenderTarget(renderTarget)
    {
        this.freePotRenderTarget(renderTarget);
    }

    /**
     * Calculates the mapped matrix.
     *
     * TODO playing around here.. this is temporary - (will end up in the shader)
     * this returns a matrix that will normalise map filter cords in the filter to screen space
     *
     * @param {PIXI.Matrix} outputMatrix - the matrix to output to.
     * @return {PIXI.Matrix} The mapped matrix.
     */
    calculateScreenSpaceMatrix(outputMatrix)
    {
        const currentState = this.filterData.stack[this.filterData.index];

        return filterTransforms.calculateScreenSpaceMatrix(
            outputMatrix,
            currentState.sourceFrame,
            currentState.renderTarget.size
        );
    }

    /**
     * Multiply vTextureCoord to this matrix to achieve (0,0,1,1) for filterArea
     *
     * @param {PIXI.Matrix} outputMatrix - The matrix to output to.
     * @return {PIXI.Matrix} The mapped matrix.
     */
    calculateNormalizedScreenSpaceMatrix(outputMatrix)
    {
        const currentState = this.filterData.stack[this.filterData.index];

        return filterTransforms.calculateNormalizedScreenSpaceMatrix(
            outputMatrix,
            currentState.sourceFrame,
            currentState.renderTarget.size,
            currentState.destinationFrame
        );
    }

    /**
     * This will map the filter coord so that a texture can be used based on the transform of a sprite
     *
     * @param {PIXI.Matrix} outputMatrix - The matrix to output to.
     * @param {PIXI.Sprite} sprite - The sprite to map to.
     * @return {PIXI.Matrix} The mapped matrix.
     */
    calculateSpriteMatrix(outputMatrix, sprite)
    {
        const currentState = this.filterData.stack[this.filterData.index];

        return filterTransforms.calculateSpriteMatrix(
            outputMatrix,
            currentState.sourceFrame,
            currentState.renderTarget.size,
            sprite
        );
>>>>>>> upstream/dev
    }

    /**
     * Destroys this Filter Manager.
     *
     */
    destroy()
    {
        this.shaderCache = [];
        this.emptyPool();
    }

    /**
     * Gets a Power-of-Two render texture.
     *
     * TODO move to a seperate class could be on renderer?
     * also - could cause issue with multiple contexts?
     *
     * @private
     * @param {WebGLRenderingContext} gl - The webgl rendering context
     * @param {number} minWidth - The minimum width of the render target.
     * @param {number} minHeight - The minimum height of the render target.
     * @param {number} resolution - The resolution of the render target.
     * @return {PIXI.RenderTarget} The new render target.
     */
    getPotRenderTarget(gl, minWidth, minHeight, resolution)
    {
        // TODO you coud return a bigger texture if there is not one in the pool?
        minWidth = bitTwiddle.nextPow2(minWidth * resolution);
        minHeight = bitTwiddle.nextPow2(minHeight * resolution);

<<<<<<< HEAD
    //TODO move to a seperate class could be on renderer?
    //also - could cause issue with multiple contexts?
    getPotRenderTarget(gl, minWidth, minHeight, resolution)
    {
        //TODO you coud return a bigger texture if there is not one in the pool?
        minWidth = bitTwiddle.nextPow2(minWidth * resolution);
        minHeight = bitTwiddle.nextPow2(minHeight * resolution);

        var key = ((minWidth & 0xFFFF) << 16) | ( minHeight & 0xFFFF);

        if(!this.pool[key]) {
          this.pool[key] = [];
        }

        var renderTarget = this.pool[key].pop() || new RenderTarget(gl, minWidth, minHeight, null, 1);

        //manually tweak the resolution...
        //this will not modify the size of the frame buffer, just its resolution.
        renderTarget.resolution = resolution;
        renderTarget.defaultFrame.width = renderTarget.size.width = minWidth / resolution;
        renderTarget.defaultFrame.height = renderTarget.size.height = minHeight / resolution;
        return renderTarget;
    }

    emptyPool()
    {
        for (var i in this.pool)
        {
            var textures = this.pool[i];
            if(textures)
            {
                for (var j = 0; j < textures.length; j++)
=======
        const key = ((minWidth & 0xFFFF) << 16) | (minHeight & 0xFFFF);

        if (!this.pool[key])
        {
            this.pool[key] = [];
        }

        const renderTarget = this.pool[key].pop() || new RenderTarget(gl, minWidth, minHeight, null, 1);

        // manually tweak the resolution...
        // this will not modify the size of the frame buffer, just its resolution.
        renderTarget.resolution = resolution;
        renderTarget.defaultFrame.width = renderTarget.size.width = minWidth / resolution;
        renderTarget.defaultFrame.height = renderTarget.size.height = minHeight / resolution;

        return renderTarget;
    }

    /**
     * Empties the texture pool.
     *
     */
    emptyPool()
    {
        for (const i in this.pool)
        {
            const textures = this.pool[i];

            if (textures)
            {
                for (let j = 0; j < textures.length; j++)
>>>>>>> upstream/dev
                {
                    textures[j].destroy(true);
                }
            }
        }
<<<<<<< HEAD

        this.pool = {};
    }

    freePotRenderTarget(renderTarget)
    {
        var minWidth = renderTarget.size.width * renderTarget.resolution;
        var minHeight = renderTarget.size.height * renderTarget.resolution;

        var key = ((minWidth & 0xFFFF) << 16) | (minHeight & 0xFFFF);
        this.pool[key].push(renderTarget);
    }

}

module.exports = FilterManager;
=======

        this.pool = {};
    }

    /**
     * Frees a render target back into the pool.
     *
     * @param {PIXI.RenderTarget} renderTarget - The renderTarget to free
     */
    freePotRenderTarget(renderTarget)
    {
        const minWidth = renderTarget.size.width * renderTarget.resolution;
        const minHeight = renderTarget.size.height * renderTarget.resolution;
        const key = ((minWidth & 0xFFFF) << 16) | (minHeight & 0xFFFF);

        this.pool[key].push(renderTarget);
    }
}
>>>>>>> upstream/dev
