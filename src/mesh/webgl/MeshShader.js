import Shader from '../../core/Shader';

/**
 * @class
 * @extends PIXI.Shader
 * @memberof PIXI.mesh
 */
<<<<<<< HEAD
class MeshShader extends Shader {
=======
export default class MeshShader extends Shader
{
    /**
     * @param {WebGLRenderingContext} gl - The WebGLRenderingContext.
     */
>>>>>>> upstream/dev
    constructor(gl)
    {
        super(
            gl,
            // vertex shader
            [
                'attribute vec2 aVertexPosition;',
                'attribute vec2 aTextureCoord;',

                'uniform mat3 translationMatrix;',
                'uniform mat3 projectionMatrix;',

                'varying vec2 vTextureCoord;',

                'void main(void){',
<<<<<<< HEAD
                '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
                '   vTextureCoord = aTextureCoord;',
                '}'
=======
                '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);', // eslint-disable-line max-len
                '   vTextureCoord = aTextureCoord;',
                '}',
>>>>>>> upstream/dev
            ].join('\n'),
            [
                'varying vec2 vTextureCoord;',
                'uniform float alpha;',
                'uniform vec3 tint;',

                'uniform sampler2D uSampler;',

                'void main(void){',
                '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint * alpha, alpha);',
               // '   gl_FragColor = vec4(1.0);',
<<<<<<< HEAD
                '}'
=======
                '}',
>>>>>>> upstream/dev
            ].join('\n')
        );
    }
}
<<<<<<< HEAD

module.exports = MeshShader;
=======
>>>>>>> upstream/dev
