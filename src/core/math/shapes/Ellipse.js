import Rectangle from './Rectangle';
import { SHAPES } from '../../const';

/**
 * The Ellipse object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof PIXI
 */
<<<<<<< HEAD
class Ellipse {
    constructor(x, y, width, height)
=======
export default class Ellipse
{
    /**
     * @param {number} [x=0] - The X coordinate of the center of this circle
     * @param {number} [y=0] - The Y coordinate of the center of this circle
     * @param {number} [width=0] - The half width of this ellipse
     * @param {number} [height=0] - The half height of this ellipse
     */
    constructor(x = 0, y = 0, width = 0, height = 0)
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
        this.width = width || 0;
=======
        this.width = width;
>>>>>>> upstream/dev

        /**
         * @member {number}
         * @default 0
         */
<<<<<<< HEAD
        this.height = height || 0;
=======
        this.height = height;
>>>>>>> upstream/dev

        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readOnly
<<<<<<< HEAD
         * @default CONST.SHAPES.ELIP
         * @see PIXI.SHAPES
         */
        this.type = CONST.SHAPES.ELIP;
=======
         * @default PIXI.SHAPES.ELIP
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.ELIP;
>>>>>>> upstream/dev
    }

    /**
     * Creates a clone of this Ellipse instance
     *
     * @return {PIXI.Ellipse} a copy of the ellipse
     */
    clone()
    {
        return new Ellipse(this.x, this.y, this.width, this.height);
    }

    /**
     * Checks whether the x and y coordinates given are contained within this ellipse
     *
<<<<<<< HEAD
     * @param x {number} The X coordinate of the point to test
     * @param y {number} The Y coordinate of the point to test
=======
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
>>>>>>> upstream/dev
     * @return {boolean} Whether the x/y coords are within this ellipse
     */
    contains(x, y)
    {
        if (this.width <= 0 || this.height <= 0)
        {
            return false;
        }
<<<<<<< HEAD

        //normalize the coords to an ellipse with center 0,0
        var normx = ((x - this.x) / this.width),
            normy = ((y - this.y) / this.height);

        normx *= normx;
        normy *= normy;

        return (normx + normy <= 1);
    }

    /**
     * Returns the framing rectangle of the ellipse as a Rectangle object
     *
     * @return {PIXI.Rectangle} the framing rectangle
     */
    getBounds()
    {
        return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    }
}

module.exports = Ellipse;
=======

        // normalize the coords to an ellipse with center 0,0
        let normx = ((x - this.x) / this.width);
        let normy = ((y - this.y) / this.height);

        normx *= normx;
        normy *= normy;

        return (normx + normy <= 1);
    }

    /**
     * Returns the framing rectangle of the ellipse as a Rectangle object
     *
     * @return {PIXI.Rectangle} the framing rectangle
     */
    getBounds()
    {
        return new Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    }
}
>>>>>>> upstream/dev
