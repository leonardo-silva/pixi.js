import { Point, ObservablePoint } from '../math';
import TransformBase from './TransformBase';

/**
 * Generic class to deal with traditional 2D matrix transforms
 * local transformation is calculated from position,scale,skew and rotation
 *
 * @class
 * @extends PIXI.TransformBase
 * @memberof PIXI
 */
<<<<<<< HEAD
class Transform extends TransformBase {
=======
export default class Transform extends TransformBase
{
    /**
     *
     */
>>>>>>> upstream/dev
    constructor()
    {
        super();

         /**
         * The coordinate of the object relative to the local coordinates of the parent.
         *
         * @member {PIXI.Point}
         */
<<<<<<< HEAD
        this.position = new math.Point(0,0);
=======
        this.position = new Point(0, 0);
>>>>>>> upstream/dev

        /**
         * The scale factor of the object.
         *
         * @member {PIXI.Point}
         */
<<<<<<< HEAD
        this.scale = new math.Point(1,1);
=======
        this.scale = new Point(1, 1);
>>>>>>> upstream/dev

        /**
         * The skew amount, on the x and y axis.
         *
         * @member {PIXI.ObservablePoint}
         */
<<<<<<< HEAD
        this.skew = new math.ObservablePoint(this.updateSkew, this, 0,0);
=======
        this.skew = new ObservablePoint(this.updateSkew, this, 0, 0);
>>>>>>> upstream/dev

        /**
         * The pivot point of the displayObject that it rotates around
         *
         * @member {PIXI.Point}
         */
<<<<<<< HEAD
        this.pivot = new math.Point(0,0);
=======
        this.pivot = new Point(0, 0);
>>>>>>> upstream/dev

        /**
         * The rotation value of the object, in radians
         *
         * @member {Number}
         * @private
         */
        this._rotation = 0;

        this._sr = Math.sin(0);
        this._cr = Math.cos(0);
<<<<<<< HEAD
        this._cy  = Math.cos(0);//skewY);
        this._sy  = Math.sin(0);//skewY);
        this._nsx = Math.sin(0);//skewX);
        this._cx  = Math.cos(0);//skewX);
    }

    updateSkew()
    {
        this._cy  = Math.cos(this.skew.y);
        this._sy  = Math.sin(this.skew.y);
        this._nsx = Math.sin(this.skew.x);
        this._cx  = Math.cos(this.skew.x);
    }

    /**
     * Updates only local matrix
     */
    updateLocalTransform() {
        var lt = this.localTransform;
        var a, b, c, d;

        a  =  this._cr * this.scale.x;
        b  =  this._sr * this.scale.x;
        c  = -this._sr * this.scale.y;
        d  =  this._cr * this.scale.y;

        lt.a  = this._cy * a + this._sy * c;
        lt.b  = this._cy * b + this._sy * d;
        lt.c  = this._nsx * a + this._cx * c;
        lt.d  = this._nsx * b + this._cx * d;
    }

    /**
     * Updates the values of the object and applies the parent's transform.
     * @param parentTransform {PIXI.Transform} The transform of the parent of this object
     */
    updateTransform(parentTransform)
    {

        var pt = parentTransform.worldTransform;
        var wt = this.worldTransform;
        var lt = this.localTransform;
        var a, b, c, d;

        a  =  this._cr * this.scale.x;
        b  =  this._sr * this.scale.x;
        c  = -this._sr * this.scale.y;
        d  =  this._cr * this.scale.y;

        lt.a  = this._cy * a + this._sy * c;
        lt.b  = this._cy * b + this._sy * d;
        lt.c  = this._nsx * a + this._cx * c;
        lt.d  = this._nsx * b + this._cx * d;

        lt.tx =  this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
        lt.ty =  this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);

        // concat the parent matrix with the objects transform.
        wt.a  = lt.a  * pt.a + lt.b  * pt.c;
        wt.b  = lt.a  * pt.b + lt.b  * pt.d;
        wt.c  = lt.c  * pt.a + lt.d  * pt.c;
        wt.d  = lt.c  * pt.b + lt.d  * pt.d;
        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;

        this._worldID ++;
    }

    /**
     * Decomposes a matrix and sets the transforms properties based on it.
     * @param {PIXI.Matrix} The matrix to decompose
     */
    setFromMatrix(matrix)
    {
        matrix.decompose(this);
    }

}

Object.defineProperties(Transform.prototype, {
=======
        this._cy = Math.cos(0);// skewY);
        this._sy = Math.sin(0);// skewY);
        this._nsx = Math.sin(0);// skewX);
        this._cx = Math.cos(0);// skewX);
    }

    /**
     * Updates the skew values when the skew changes.
     *
     * @private
     */
    updateSkew()
    {
        this._cy = Math.cos(this.skew.y);
        this._sy = Math.sin(this.skew.y);
        this._nsx = Math.sin(this.skew.x);
        this._cx = Math.cos(this.skew.x);
    }

    /**
     * Updates only local matrix
     */
    updateLocalTransform()
    {
        const lt = this.localTransform;
        const a  =  this._cr * this.scale.x;
        const b  =  this._sr * this.scale.x;
        const c  = -this._sr * this.scale.y;
        const d  =  this._cr * this.scale.y;

        lt.a = (this._cy * a) + (this._sy * c);
        lt.b = (this._cy * b) + (this._sy * d);
        lt.c = (this._nsx * a) + (this._cx * c);
        lt.d = (this._nsx * b) + (this._cx * d);
    }

    /**
     * Updates the values of the object and applies the parent's transform.
     *
     * @param {PIXI.Transform} parentTransform - The transform of the parent of this object
     */
    updateTransform(parentTransform)
    {
        const pt = parentTransform.worldTransform;
        const wt = this.worldTransform;
        const lt = this.localTransform;

        const a  =  this._cr * this.scale.x;
        const b  =  this._sr * this.scale.x;
        const c  = -this._sr * this.scale.y;
        const d  =  this._cr * this.scale.y;

        lt.a = (this._cy * a) + (this._sy * c);
        lt.b = (this._cy * b) + (this._sy * d);
        lt.c = (this._nsx * a) + (this._cx * c);
        lt.d = (this._nsx * b) + (this._cx * d);

        lt.tx = this.position.x - ((this.pivot.x * lt.a) + (this.pivot.y * lt.c));
        lt.ty = this.position.y - ((this.pivot.x * lt.b) + (this.pivot.y * lt.d));

        // concat the parent matrix with the objects transform.
        wt.a = (lt.a * pt.a) + (lt.b * pt.c);
        wt.b = (lt.a * pt.b) + (lt.b * pt.d);
        wt.c = (lt.c * pt.a) + (lt.d * pt.c);
        wt.d = (lt.c * pt.b) + (lt.d * pt.d);
        wt.tx = (lt.tx * pt.a) + (lt.ty * pt.c) + pt.tx;
        wt.ty = (lt.tx * pt.b) + (lt.ty * pt.d) + pt.ty;

        this._worldID ++;
    }

    /**
     * Decomposes a matrix and sets the transforms properties based on it.
     *
     * @param {PIXI.Matrix} matrix - The matrix to decompose
     */
    setFromMatrix(matrix)
    {
        matrix.decompose(this);
    }

>>>>>>> upstream/dev
    /**
     * The rotation of the object in radians.
     *
     * @member {number}
     * @memberof PIXI.Transform#
     */
    get rotation()
    {
        return this._rotation;
    }

    /**
     * Set the rotation of the transform.
     *
     * @param {number} value - The value to set to.
     */
    set rotation(value)
    {
        this._rotation = value;
        this._sr = Math.sin(value);
        this._cr = Math.cos(value);
    }
}
