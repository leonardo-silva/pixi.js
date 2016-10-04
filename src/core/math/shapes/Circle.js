import Rectangle from './Rectangle';
import { SHAPES } from '../../const';

/**
 * The Circle object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof PIXI
 */
<<<<<<< HEAD
class Circle {
    constructor(x, y, radius)
=======
export default class Circle
{
    /**
     * @param {number} [x=0] - The X coordinate of the center of this circle
     * @param {number} [y=0] - The Y coordinate of the center of this circle
     * @param {number} [radius=0] - The radius of the circle
     */
    constructor(x = 0, y = 0, radius = 0)
>>>>>>> upstream/dev
    {
        /**
         * @member {number}
         * @default 0
         */
<<<<<<< HEAD
        this.x = x || 0;
=======
        this.x = x;
>>>>>>> upstream/dev

        /**
         * @member {number}
         * @default 0
         */
<<<<<<< HEAD
        this.y = y || 0;
=======
        this.y = y;
>>>>>>> upstream/dev

        /**
         * @member {number}
         * @default 0
         */
<<<<<<< HEAD
        this.radius = radius || 0;
=======
        this.radius = radius;
>>>>>>> upstream/dev

        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
<<<<<<< HEAD
         * @default CONST.SHAPES.CIRC
         * @see PIXI.SHAPES
         */
        this.type = CONST.SHAPES.CIRC;
=======
         * @default PIXI.SHAPES.CIRC
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.CIRC;
>>>>>>> upstream/dev
    }

    /**
     * Creates a clone of this Circle instance
     *
     * @return {PIXI.Circle} a copy of the Circle
     */
    clone()
    {
        return new Circle(this.x, this.y, this.radius);
    }

    /**
     * Checks whether the x and y coordinates given are contained within this circle
     *
<<<<<<< HEAD
     * @param x {number} The X coordinate of the point to test
     * @param y {number} The Y coordinate of the point to test
=======
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
>>>>>>> upstream/dev
     * @return {boolean} Whether the x/y coordinates are within this Circle
     */
    contains(x, y)
    {
        if (this.radius <= 0)
        {
            return false;
        }
<<<<<<< HEAD

        var dx = (this.x - x),
            dy = (this.y - y),
            r2 = this.radius * this.radius;

        dx *= dx;
        dy *= dy;

        return (dx + dy <= r2);
    }

    /**
    * Returns the framing rectangle of the circle as a Rectangle object
    *
    * @return {PIXI.Rectangle} the framing rectangle
    */
    getBounds()
    {
        return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

}

module.exports = Circle;
=======

        const r2 = this.radius * this.radius;
        let dx = (this.x - x);
        let dy = (this.y - y);

        dx *= dx;
        dy *= dy;

        return (dx + dy <= r2);
    }

    /**
    * Returns the framing rectangle of the circle as a Rectangle object
    *
    * @return {PIXI.Rectangle} the framing rectangle
    */
    getBounds()
    {
        return new Rectangle(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}
>>>>>>> upstream/dev
