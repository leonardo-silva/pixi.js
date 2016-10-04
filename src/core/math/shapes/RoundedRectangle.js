import { SHAPES } from '../../const';

/**
 * The Rounded Rectangle object is an area that has nice rounded corners, as indicated by its
 * top-left corner point (x, y) and by its width and its height and its radius.
 *
 * @class
 * @memberof PIXI
 */
<<<<<<< HEAD
class RoundedRectangle {
    constructor(x, y, width, height, radius)
=======
export default class RoundedRectangle
{
    /**
     * @param {number} [x=0] - The X coordinate of the upper-left corner of the rounded rectangle
     * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rounded rectangle
     * @param {number} [width=0] - The overall width of this rounded rectangle
     * @param {number} [height=0] - The overall height of this rounded rectangle
     * @param {number} [radius=20] - Controls the radius of the rounded corners
     */
    constructor(x = 0, y = 0, width = 0, height = 0, radius = 20)
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
         * @member {number}
         * @default 20
         */
<<<<<<< HEAD
        this.radius = radius || 20;
=======
        this.radius = radius;
>>>>>>> upstream/dev

        /**
         * The type of the object, mainly used to avoid `instanceof` checks
         *
         * @member {number}
         * @readonly
<<<<<<< HEAD
         * @default CONST.SHAPES.RREC
         * @see PIXI.SHAPES
         */
        this.type = CONST.SHAPES.RREC;
=======
         * @default PIXI.SHAPES.RREC
         * @see PIXI.SHAPES
         */
        this.type = SHAPES.RREC;
>>>>>>> upstream/dev
    }

    /**
     * Creates a clone of this Rounded Rectangle
     *
     * @return {PIXI.RoundedRectangle} a copy of the rounded rectangle
     */
    clone()
    {
        return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
    }

    /**
     * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
     *
<<<<<<< HEAD
     * @param x {number} The X coordinate of the point to test
     * @param y {number} The Y coordinate of the point to test
=======
     * @param {number} x - The X coordinate of the point to test
     * @param {number} y - The Y coordinate of the point to test
>>>>>>> upstream/dev
     * @return {boolean} Whether the x/y coordinates are within this Rounded Rectangle
     */
    contains(x, y)
    {
        if (this.width <= 0 || this.height <= 0)
<<<<<<< HEAD
        {
            return false;
        }

        if (x >= this.x && x <= this.x + this.width)
        {
=======
        {
            return false;
        }

        if (x >= this.x && x <= this.x + this.width)
        {
>>>>>>> upstream/dev
            if (y >= this.y && y <= this.y + this.height)
            {
                return true;
            }
        }
<<<<<<< HEAD

        return false;
    }
    
}

module.exports = RoundedRectangle;
=======

        return false;
    }
}
>>>>>>> upstream/dev
