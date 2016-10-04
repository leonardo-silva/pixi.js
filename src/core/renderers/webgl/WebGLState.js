import mapWebGLBlendModesToPixi from './utils/mapWebGLBlendModesToPixi';

const BLEND = 0;
const DEPTH_TEST = 1;
const FRONT_FACE = 2;
const CULL_FACE = 3;
const BLEND_FUNC = 4;

var BLEND = 0,
    DEPTH_TEST = 1,
    FRONT_FACE = 2,
    CULL_FACE = 3,
    BLEND_FUNC = 4;

/**
 * A WebGL state machines
 *
 * @memberof PIXI
 * @class
 */
<<<<<<< HEAD
class WebGLState {
=======
export default class WebGLState
{
    /**
     * @param {WebGLRenderingContext} gl - The current WebGL rendering context
     */
>>>>>>> upstream/dev
    constructor(gl)
    {
        /**
         * The current active state
         *
         * @member {Uint8Array}
         */
        this.activeState = new Uint8Array(16);

        /**
         * The default state
         *
         * @member {Uint8Array}
         */
        this.defaultState = new Uint8Array(16);

        // default blend mode..
        this.defaultState[0] = 1;

        /**
         * The current state index in the stack
         *
         * @member {number}
         * @private
         */
        this.stackIndex = 0;

        /**
         * The stack holding all the different states
         *
         * @member {Array<*>}
         * @private
         */
        this.stack = [];

        /**
         * The current WebGL rendering context
         *
         * @member {WebGLRenderingContext}
         */
        this.gl = gl;

        this.maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

<<<<<<< HEAD
        this.attribState = {tempAttribState:new Array(this.maxAttribs),
            attribState:new Array(this.maxAttribs)};
=======
        this.attribState = {
            tempAttribState: new Array(this.maxAttribs),
            attribState: new Array(this.maxAttribs),
        };
>>>>>>> upstream/dev

        this.blendModes = mapWebGLBlendModesToPixi(gl);

        // check we have vao..
        this.nativeVaoExtension = (
<<<<<<< HEAD
            gl.getExtension('OES_vertex_array_object') ||
            gl.getExtension('MOZ_OES_vertex_array_object') ||
            gl.getExtension('WEBKIT_OES_vertex_array_object')
=======
            gl.getExtension('OES_vertex_array_object')
            || gl.getExtension('MOZ_OES_vertex_array_object')
            || gl.getExtension('WEBKIT_OES_vertex_array_object')
>>>>>>> upstream/dev
        );
    }

    /**
     * Pushes a new active state
     */
    push()
    {
        // next state..
<<<<<<< HEAD
        var state = this.stack[++this.stackIndex];

        if(!state)
=======
        let state = this.stack[++this.stackIndex];

        if (!state)
>>>>>>> upstream/dev
        {
            state = this.stack[this.stackIndex] = new Uint8Array(16);
        }

        // copy state..
        // set active state so we can force overrides of gl state
<<<<<<< HEAD
        for (var i = 0; i < this.activeState.length; i++)
=======
        for (let i = 0; i < this.activeState.length; i++)
>>>>>>> upstream/dev
        {
            this.activeState[i] = state[i];
        }
    }

    /**
     * Pops a state out
     */
    pop()
    {
<<<<<<< HEAD
        var state = this.stack[--this.stackIndex];
        this.setState(state);
    }

    /**
     * Sets the current state
     * @param state {number}
     */
    setState(state)
    {
        this.setBlend(state[BLEND]);
        this.setDepthTest(state[DEPTH_TEST]);
        this.setFrontFace(state[FRONT_FACE]);
        this.setCullFace(state[CULL_FACE]);
        this.setBlendMode(state[BLEND_FUNC]);
    }

    /**
     * Sets the blend mode ? @mat
     * @param value {number}
     */
    setBlend(value)
    {
        if(this.activeState[BLEND] === value|0) {
            return;
        }

        this.activeState[BLEND] = value|0;

        var gl = this.gl;

        if(value)
        {
            gl.enable(gl.BLEND);
        }
        else
        {
            gl.disable(gl.BLEND);
        }
    }

    /**
     * Sets the blend mode ? @mat
     * @param value {number}
     */
    setBlendMode(value)
    {
        if(value === this.activeState[BLEND_FUNC]) {
            return;
        }

        this.activeState[BLEND_FUNC] = value;

        this.gl.blendFunc(this.blendModes[value][0], this.blendModes[value][1]);
    }

    /**
     * Sets the depth test @mat
     * @param value {number}
     */
    setDepthTest(value)
    {
        if(this.activeState[DEPTH_TEST] === value|0) {
            return;
        }

        this.activeState[DEPTH_TEST] = value|0;

        var gl = this.gl;

        if(value)
        {
            gl.enable(gl.DEPTH_TEST);
        }
        else
        {
            gl.disable(gl.DEPTH_TEST);
        }
    }

    /**
     * Sets the depth test @mat
     * @param value {number}
     */
    setCullFace(value)
    {
        if(this.activeState[CULL_FACE] === value|0) {
            return;
        }

        this.activeState[CULL_FACE] = value|0;

        var gl = this.gl;

        if(value)
        {
            gl.enable(gl.CULL_FACE);
        }
        else
        {
            gl.disable(gl.CULL_FACE);
        }
    }

    /**
     * Sets the depth test @mat
     * @param value {number}
     */
    setFrontFace(value)
    {
        if(this.activeState[FRONT_FACE] === value|0) {
            return;
        }

        this.activeState[FRONT_FACE] = value|0;

        var gl = this.gl;

        if(value)
        {
            gl.frontFace(gl.CW);
        }
        else
        {
            gl.frontFace(gl.CCW);
        }
    }

    /**
     * Disables all the vaos in use
     */
    resetAttributes()
    {
        var i;

        for ( i = 0; i < this.attribState.tempAttribState.length; i++) {
            this.attribState.tempAttribState[i] = 0;
        }

        for ( i = 0; i < this.attribState.attribState.length; i++) {
            this.attribState.attribState[i] = 0;
        }

        var gl = this.gl;

        // im going to assume one is always active for performance reasons.
        for (i = 1; i < this.maxAttribs; i++)
        {
            gl.disableVertexAttribArray(i);
        }
    }

    //used
    /**
     * Resets all the logic and disables the vaos
     */
    resetToDefault()
    {

        // unbind any VAO if they exist..
        if(this.nativeVaoExtension)
        {
            this.nativeVaoExtension.bindVertexArrayOES(null);
        }


        // reset all attributs..
        this.resetAttributes();

        // set active state so we can force overrides of gl state
        for (var i = 0; i < this.activeState.length; i++)
        {
            this.activeState[i] = 32;
        }

        var gl = this.gl;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);


        this.setState(this.defaultState);
    }

}
=======
        const state = this.stack[--this.stackIndex];

        this.setState(state);
    }

    /**
     * Sets the current state
     *
     * @param {*} state - The state to set.
     */
    setState(state)
    {
        this.setBlend(state[BLEND]);
        this.setDepthTest(state[DEPTH_TEST]);
        this.setFrontFace(state[FRONT_FACE]);
        this.setCullFace(state[CULL_FACE]);
        this.setBlendMode(state[BLEND_FUNC]);
    }

    /**
     * Enables or disabled blending.
     *
     * @param {boolean} value - Turn on or off webgl blending.
     */
    setBlend(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[BLEND] === value)
        {
            return;
        }

        this.activeState[BLEND] = value;
        this.gl[value ? 'enable' : 'disable'](this.gl.BLEND);
    }

    /**
     * Sets the blend mode.
     *
     * @param {number} value - The blend mode to set to.
     */
    setBlendMode(value)
    {
        if (value === this.activeState[BLEND_FUNC])
        {
            return;
        }

        this.activeState[BLEND_FUNC] = value;

        this.gl.blendFunc(this.blendModes[value][0], this.blendModes[value][1]);
    }

    /**
     * Sets whether to enable or disable depth test.
     *
     * @param {boolean} value - Turn on or off webgl depth testing.
     */
    setDepthTest(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[DEPTH_TEST] === value)
        {
            return;
        }

        this.activeState[DEPTH_TEST] = value;
        this.gl[value ? 'enable' : 'disable'](this.gl.DEPTH_TEST);
    }

    /**
     * Sets whether to enable or disable cull face.
     *
     * @param {boolean} value - Turn on or off webgl cull face.
     */
    setCullFace(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[CULL_FACE] === value)
        {
            return;
        }

        this.activeState[CULL_FACE] = value;
        this.gl[value ? 'enable' : 'disable'](this.gl.CULL_FACE);
    }

    /**
     * Sets the gl front face.
     *
     * @param {boolean} value - true is clockwise and false is counter-clockwise
     */
    setFrontFace(value)
    {
        value = value ? 1 : 0;

        if (this.activeState[FRONT_FACE] === value)
        {
            return;
        }

        this.activeState[FRONT_FACE] = value;
        this.gl.frontFace(this.gl[value ? 'CW' : 'CCW']);
    }

    /**
     * Disables all the vaos in use
     *
     */
    resetAttributes()
    {
        for (let i = 0; i < this.attribState.tempAttribState.length; i++)
        {
            this.attribState.tempAttribState[i] = 0;
        }

        for (let i = 0; i < this.attribState.attribState.length; i++)
        {
            this.attribState.attribState[i] = 0;
        }

        // im going to assume one is always active for performance reasons.
        for (let i = 1; i < this.maxAttribs; i++)
        {
            this.gl.disableVertexAttribArray(i);
        }
    }

    // used
    /**
     * Resets all the logic and disables the vaos
     */
    resetToDefault()
    {
        // unbind any VAO if they exist..
        if (this.nativeVaoExtension)
        {
            this.nativeVaoExtension.bindVertexArrayOES(null);
        }

        // reset all attributs..
        this.resetAttributes();

        // set active state so we can force overrides of gl state
        for (let i = 0; i < this.activeState.length; ++i)
        {
            this.activeState[i] = 32;
        }

        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
>>>>>>> upstream/dev

        this.setState(this.defaultState);
    }
}
