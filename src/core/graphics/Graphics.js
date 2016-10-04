import Container from '../display/Container';
import RenderTexture from '../textures/RenderTexture';
import Texture from '../textures/Texture';
import GraphicsData from './GraphicsData';
import Sprite from '../sprites/Sprite';
import { Matrix, Point, Rectangle, RoundedRectangle, Ellipse, Polygon, Circle } from '../math';
import { hex2rgb, rgb2hex } from '../utils';
import { SHAPES, BLEND_MODES } from '../const';
import Bounds from '../display/Bounds';
import bezierCurveTo from './utils/bezierCurveTo';
import CanvasRenderer from '../renderers/canvas/CanvasRenderer';

let canvasRenderer;
const tempMatrix = new Matrix();
const tempPoint = new Point();
const tempColor1 = new Float32Array(4);
const tempColor2 = new Float32Array(4);

/**
 * The Graphics class contains methods used to draw primitive shapes such as lines, circles and
 * rectangles to the display, and to color and fill them.
 *
 * @class
 * @extends PIXI.Container
 * @memberof PIXI
 */
<<<<<<< HEAD
class Graphics extends Container {
=======
export default class Graphics extends Container
{
    /**
     *
     */
>>>>>>> upstream/dev
    constructor()
    {
        super();

        /**
         * The alpha value used when filling the Graphics object.
         *
         * @member {number}
         * @default 1
         */
        this.fillAlpha = 1;

        /**
         * The width (thickness) of any lines drawn.
         *
         * @member {number}
         * @default 0
         */
        this.lineWidth = 0;

        /**
         * The color of any lines drawn.
         *
         * @member {string}
         * @default 0
         */
        this.lineColor = 0;

        /**
         * Graphics data
         *
         * @member {PIXI.GraphicsData[]}
         * @private
         */
        this.graphicsData = [];

        /**
<<<<<<< HEAD
         * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to reset the tint.
=======
         * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to
         * reset the tint.
>>>>>>> upstream/dev
         *
         * @member {number}
         * @default 0xFFFFFF
         */
        this.tint = 0xFFFFFF;

        /**
<<<<<<< HEAD
         * The previous tint applied to the graphic shape. Used to compare to the current tint and check if theres change.
=======
         * The previous tint applied to the graphic shape. Used to compare to the current tint and
         * check if theres change.
>>>>>>> upstream/dev
         *
         * @member {number}
         * @private
         * @default 0xFFFFFF
         */
        this._prevTint = 0xFFFFFF;

        /**
<<<<<<< HEAD
         * The blend mode to be applied to the graphic shape. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
=======
         * The blend mode to be applied to the graphic shape. Apply a value of
         * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
>>>>>>> upstream/dev
         *
         * @member {number}
         * @default PIXI.BLEND_MODES.NORMAL;
         * @see PIXI.BLEND_MODES
         */
<<<<<<< HEAD
        this.blendMode = CONST.BLEND_MODES.NORMAL;
=======
        this.blendMode = BLEND_MODES.NORMAL;
>>>>>>> upstream/dev

        /**
         * Current path
         *
         * @member {PIXI.GraphicsData}
         * @private
         */
        this.currentPath = null;

        /**
         * Array containing some WebGL-related properties used by the WebGL renderer.
         *
         * @member {object<number, object>}
         * @private
         */
        // TODO - _webgl should use a prototype object, not a random undocumented object...
        this._webGL = {};

        /**
         * Whether this shape is being used as a mask.
         *
         * @member {boolean}
         */
        this.isMask = false;

        /**
         * The bounds' padding used for bounds calculation.
         *
         * @member {number}
         */
        this.boundsPadding = 0;

        /**
         * A cache of the local bounds to prevent recalculation.
         *
         * @member {PIXI.Rectangle}
         * @private
         */
        this._localBounds = new Bounds();

        /**
         * Used to detect if the graphics object has changed. If this is set to true then the graphics
         * object will be recalculated.
         *
         * @member {boolean}
         * @private
         */
        this.dirty = 0;

        /**
         * Used to detect if we need to do a fast rect check using the id compare method
         * @type {Number}
         */
        this.fastRectDirty = -1;

        /**
         * Used to detect if we clear the graphics webGL data
         * @type {Number}
         */
        this.clearDirty = 0;

        /**
         * Used to detect if we we need to recalculate local bounds
         * @type {Number}
         */
        this.boundsDirty = -1;

        /**
         * Used to detect if the cached sprite object needs to be updated.
         *
         * @member {boolean}
         * @private
         */
        this.cachedSpriteDirty = false;

<<<<<<< HEAD

=======
>>>>>>> upstream/dev
        this._spriteRect = null;
        this._fastRect = false;

        /**
         * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
         * This is useful if your graphics element does not change often, as it will speed up the rendering
         * of the object in exchange for taking up texture memory. It is also useful if you need the graphics
         * object to be anti-aliased, because it will be rendered using canvas. This is not recommended if
         * you are constantly redrawing the graphics element.
         *
         * @name cacheAsBitmap
         * @member {boolean}
         * @memberof PIXI.Graphics#
         * @default false
         */
    }
<<<<<<< HEAD

    /**
     * Creates a new Graphics object with the same values as this one.
     * Note that the only the properties of the object are cloned, not its transform (position,scale,etc)
     *
     * @return {PIXI.Graphics} A clone of the graphics object
     */
    clone()
    {
        var clone = new Graphics();

        clone.renderable    = this.renderable;
        clone.fillAlpha     = this.fillAlpha;
        clone.lineWidth     = this.lineWidth;
        clone.lineColor     = this.lineColor;
        clone.tint          = this.tint;
        clone.blendMode     = this.blendMode;
        clone.isMask        = this.isMask;
        clone.boundsPadding = this.boundsPadding;
        clone.dirty         = 0;
        clone.cachedSpriteDirty = this.cachedSpriteDirty;

        // copy graphics data
        for (var i = 0; i < this.graphicsData.length; ++i)
        {
            clone.graphicsData.push(this.graphicsData[i].clone());
        }

        clone.currentPath = clone.graphicsData[clone.graphicsData.length - 1];

        clone.updateLocalBounds();

        return clone;
    }

    /**
     * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
     *
     * @param lineWidth {number} width of the line to draw, will update the objects stored style
     * @param color {number} color of the line to draw, will update the objects stored style
     * @param alpha {number} alpha of the line to draw, will update the objects stored style
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    lineStyle(lineWidth, color, alpha)
    {
        this.lineWidth = lineWidth || 0;
        this.lineColor = color || 0;
        this.lineAlpha = (alpha === undefined) ? 1 : alpha;

        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length)
            {
                // halfway through a line? start a new one!
                var shape = new math.Polygon(this.currentPath.shape.points.slice(-2));
                shape.closed = false;
                this.drawShape(shape);
            }
            else
            {
                // otherwise its empty so lets just set the line properties
                this.currentPath.lineWidth = this.lineWidth;
                this.currentPath.lineColor = this.lineColor;
                this.currentPath.lineAlpha = this.lineAlpha;
            }
        }

        return this;
    }

    /**
     * Moves the current drawing position to x, y.
     *
     * @param x {number} the X coordinate to move to
     * @param y {number} the Y coordinate to move to
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    moveTo(x, y)
    {
        var shape = new math.Polygon([x,y]);
        shape.closed = false;
        this.drawShape(shape);

        return this;
    }

    /**
     * Draws a line using the current line style from the current drawing position to (x, y);
     * The current drawing position is then set to (x, y).
     *
     * @param x {number} the X coordinate to draw to
     * @param y {number} the Y coordinate to draw to
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    lineTo(x, y)
    {
        this.currentPath.shape.points.push(x, y);
        this.dirty++;

        return this;
    }

    /**
     * Calculate the points for a quadratic bezier curve and then draws it.
     * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @param cpX {number} Control point x
     * @param cpY {number} Control point y
     * @param toX {number} Destination point x
     * @param toY {number} Destination point y
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    quadraticCurveTo(cpX, cpY, toX, toY)
    {
        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length === 0)
            {
                this.currentPath.shape.points = [0, 0];
            }
        }
        else
        {
            this.moveTo(0,0);
        }


        var xa,
            ya,
            n = 20,
            points = this.currentPath.shape.points;

        if (points.length === 0)
        {
            this.moveTo(0, 0);
        }

        var fromX = points[points.length-2];
        var fromY = points[points.length-1];

        var j = 0;
        for (var i = 1; i <= n; ++i)
        {
            j = i / n;

            xa = fromX + ( (cpX - fromX) * j );
            ya = fromY + ( (cpY - fromY) * j );

            points.push( xa + ( ((cpX + ( (toX - cpX) * j )) - xa) * j ),
                         ya + ( ((cpY + ( (toY - cpY) * j )) - ya) * j ) );
        }

        this.dirty++;

=======

    /**
     * Creates a new Graphics object with the same values as this one.
     * Note that the only the properties of the object are cloned, not its transform (position,scale,etc)
     *
     * @return {PIXI.Graphics} A clone of the graphics object
     */
    clone()
    {
        const clone = new Graphics();

        clone.renderable = this.renderable;
        clone.fillAlpha = this.fillAlpha;
        clone.lineWidth = this.lineWidth;
        clone.lineColor = this.lineColor;
        clone.tint = this.tint;
        clone.blendMode = this.blendMode;
        clone.isMask = this.isMask;
        clone.boundsPadding = this.boundsPadding;
        clone.dirty = 0;
        clone.cachedSpriteDirty = this.cachedSpriteDirty;

        // copy graphics data
        for (let i = 0; i < this.graphicsData.length; ++i)
        {
            clone.graphicsData.push(this.graphicsData[i].clone());
        }

        clone.currentPath = clone.graphicsData[clone.graphicsData.length - 1];

        clone.updateLocalBounds();

        return clone;
    }

    /**
     * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo()
     * method or the drawCircle() method.
     *
     * @param {number} [lineWidth=0] - width of the line to draw, will update the objects stored style
     * @param {number} [color=0] - color of the line to draw, will update the objects stored style
     * @param {number} [alpha=1] - alpha of the line to draw, will update the objects stored style
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    lineStyle(lineWidth = 0, color = 0, alpha = 1)
    {
        this.lineWidth = lineWidth;
        this.lineColor = color;
        this.lineAlpha = alpha;

        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length)
            {
                // halfway through a line? start a new one!
                const shape = new Polygon(this.currentPath.shape.points.slice(-2));

                shape.closed = false;

                this.drawShape(shape);
            }
            else
            {
                // otherwise its empty so lets just set the line properties
                this.currentPath.lineWidth = this.lineWidth;
                this.currentPath.lineColor = this.lineColor;
                this.currentPath.lineAlpha = this.lineAlpha;
            }
        }

        return this;
    }

    /**
     * Moves the current drawing position to x, y.
     *
     * @param {number} x - the X coordinate to move to
     * @param {number} y - the Y coordinate to move to
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    moveTo(x, y)
    {
        const shape = new Polygon([x, y]);

        shape.closed = false;
        this.drawShape(shape);

        return this;
    }

    /**
     * Draws a line using the current line style from the current drawing position to (x, y);
     * The current drawing position is then set to (x, y).
     *
     * @param {number} x - the X coordinate to draw to
     * @param {number} y - the Y coordinate to draw to
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    lineTo(x, y)
    {
        this.currentPath.shape.points.push(x, y);
        this.dirty++;

>>>>>>> upstream/dev
        return this;
    }

    /**
<<<<<<< HEAD
     * Calculate the points for a bezier curve and then draws it.
     *
     * @param cpX {number} Control point x
     * @param cpY {number} Control point y
     * @param cpX2 {number} Second Control point x
     * @param cpY2 {number} Second Control point y
     * @param toX {number} Destination point x
     * @param toY {number} Destination point y
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY)
=======
     * Calculate the points for a quadratic bezier curve and then draws it.
     * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    quadraticCurveTo(cpX, cpY, toX, toY)
>>>>>>> upstream/dev
    {
        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length === 0)
            {
                this.currentPath.shape.points = [0, 0];
            }
        }
        else
        {
<<<<<<< HEAD
            this.moveTo(0,0);
        }

        var points = this.currentPath.shape.points;

        var fromX = points[points.length-2];
        var fromY = points[points.length-1];

        points.length -= 2;

        bezierCurveTo(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, points);

        this.dirty++;

=======
            this.moveTo(0, 0);
        }

        const n = 20;
        const points = this.currentPath.shape.points;
        let xa = 0;
        let ya = 0;

        if (points.length === 0)
        {
            this.moveTo(0, 0);
        }

        const fromX = points[points.length - 2];
        const fromY = points[points.length - 1];

        for (let i = 1; i <= n; ++i)
        {
            const j = i / n;

            xa = fromX + ((cpX - fromX) * j);
            ya = fromY + ((cpY - fromY) * j);

            points.push(xa + (((cpX + ((toX - cpX) * j)) - xa) * j),
                ya + (((cpY + ((toY - cpY) * j)) - ya) * j));
        }

        this.dirty++;

>>>>>>> upstream/dev
        return this;
    }

    /**
<<<<<<< HEAD
     * The arcTo() method creates an arc/curve between two tangents on the canvas.
     *
     * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
     *
     * @param x1 {number} The x-coordinate of the beginning of the arc
     * @param y1 {number} The y-coordinate of the beginning of the arc
     * @param x2 {number} The x-coordinate of the end of the arc
     * @param y2 {number} The y-coordinate of the end of the arc
     * @param radius {number} The radius of the arc
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    arcTo(x1, y1, x2, y2, radius)
=======
     * Calculate the points for a bezier curve and then draws it.
     *
     * @param {number} cpX - Control point x
     * @param {number} cpY - Control point y
     * @param {number} cpX2 - Second Control point x
     * @param {number} cpY2 - Second Control point y
     * @param {number} toX - Destination point x
     * @param {number} toY - Destination point y
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY)
>>>>>>> upstream/dev
    {
        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length === 0)
            {
<<<<<<< HEAD
                this.currentPath.shape.points.push(x1, y1);
=======
                this.currentPath.shape.points = [0, 0];
>>>>>>> upstream/dev
            }
        }
        else
        {
<<<<<<< HEAD
            this.moveTo(x1, y1);
        }

        var points = this.currentPath.shape.points,
            fromX = points[points.length-2],
            fromY = points[points.length-1],
            a1 = fromY - y1,
            b1 = fromX - x1,
            a2 = y2   - y1,
            b2 = x2   - x1,
            mm = Math.abs(a1 * b2 - b1 * a2);

        if (mm < 1.0e-8 || radius === 0)
        {
            if (points[points.length-2] !== x1 || points[points.length-1] !== y1)
            {
                points.push(x1, y1);
            }
        }
        else
        {
            var dd = a1 * a1 + b1 * b1,
                cc = a2 * a2 + b2 * b2,
                tt = a1 * a2 + b1 * b2,
                k1 = radius * Math.sqrt(dd) / mm,
                k2 = radius * Math.sqrt(cc) / mm,
                j1 = k1 * tt / dd,
                j2 = k2 * tt / cc,
                cx = k1 * b2 + k2 * b1,
                cy = k1 * a2 + k2 * a1,
                px = b1 * (k2 + j1),
                py = a1 * (k2 + j1),
                qx = b2 * (k1 + j2),
                qy = a2 * (k1 + j2),
                startAngle = Math.atan2(py - cy, px - cx),
                endAngle   = Math.atan2(qy - cy, qx - cx);

            this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
        }
=======
            this.moveTo(0, 0);
        }

        const points = this.currentPath.shape.points;

        const fromX = points[points.length - 2];
        const fromY = points[points.length - 1];

        points.length -= 2;

        bezierCurveTo(fromX, fromY, cpX, cpY, cpX2, cpY2, toX, toY, points);

        this.dirty++;

        return this;
    }

    /**
     * The arcTo() method creates an arc/curve between two tangents on the canvas.
     *
     * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
     *
     * @param {number} x1 - The x-coordinate of the beginning of the arc
     * @param {number} y1 - The y-coordinate of the beginning of the arc
     * @param {number} x2 - The x-coordinate of the end of the arc
     * @param {number} y2 - The y-coordinate of the end of the arc
     * @param {number} radius - The radius of the arc
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    arcTo(x1, y1, x2, y2, radius)
    {
        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length === 0)
            {
                this.currentPath.shape.points.push(x1, y1);
            }
        }
        else
        {
            this.moveTo(x1, y1);
        }

        const points = this.currentPath.shape.points;
        const fromX = points[points.length - 2];
        const fromY = points[points.length - 1];
        const a1 = fromY - y1;
        const b1 = fromX - x1;
        const a2 = y2 - y1;
        const b2 = x2 - x1;
        const mm = Math.abs((a1 * b2) - (b1 * a2));

        if (mm < 1.0e-8 || radius === 0)
        {
            if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1)
            {
                points.push(x1, y1);
            }
        }
        else
        {
            const dd = (a1 * a1) + (b1 * b1);
            const cc = (a2 * a2) + (b2 * b2);
            const tt = (a1 * a2) + (b1 * b2);
            const k1 = radius * Math.sqrt(dd) / mm;
            const k2 = radius * Math.sqrt(cc) / mm;
            const j1 = k1 * tt / dd;
            const j2 = k2 * tt / cc;
            const cx = (k1 * b2) + (k2 * b1);
            const cy = (k1 * a2) + (k2 * a1);
            const px = b1 * (k2 + j1);
            const py = a1 * (k2 + j1);
            const qx = b2 * (k1 + j2);
            const qy = a2 * (k1 + j2);
            const startAngle = Math.atan2(py - cy, px - cx);
            const endAngle = Math.atan2(qy - cy, qx - cx);

            this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
        }
>>>>>>> upstream/dev

        this.dirty++;

        return this;
    }

    /**
     * The arc method creates an arc/curve (used to create circles, or parts of circles).
     *
<<<<<<< HEAD
     * @param cx {number} The x-coordinate of the center of the circle
     * @param cy {number} The y-coordinate of the center of the circle
     * @param radius {number} The radius of the circle
     * @param startAngle {number} The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
     * @param endAngle {number} The ending angle, in radians
     * @param [anticlockwise=false] {boolean} Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    arc(cx, cy, radius, startAngle, endAngle, anticlockwise)
    {
        anticlockwise = anticlockwise || false;

        if (startAngle === endAngle)
        {
            return this;
        }

        if( !anticlockwise && endAngle <= startAngle )
        {
            endAngle += Math.PI * 2;
        }
        else if( anticlockwise && startAngle <= endAngle )
        {
            startAngle += Math.PI * 2;
        }

        var sweep = anticlockwise ? (startAngle - endAngle) * -1 : (endAngle - startAngle);
        var segs =  Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * 40;

        if(sweep === 0)
        {
            return this;
        }

        var startX = cx + Math.cos(startAngle) * radius;
        var startY = cy + Math.sin(startAngle) * radius;

        if (this.currentPath)
        {
            this.currentPath.shape.points.push(startX, startY);
        }
        else
        {
            this.moveTo(startX, startY);
        }

        var points = this.currentPath.shape.points;

        var theta = sweep/(segs*2);
        var theta2 = theta*2;

        var cTheta = Math.cos(theta);
        var sTheta = Math.sin(theta);

        var segMinus = segs - 1;

        var remainder = ( segMinus % 1 ) / segMinus;

        for(var i=0; i<=segMinus; i++)
        {
            var real =  i + remainder * i;


            var angle = ((theta) + startAngle + (theta2 * real));

            var c = Math.cos(angle);
            var s = -Math.sin(angle);

            points.push(( (cTheta *  c) + (sTheta * s) ) * radius + cx,
                        ( (cTheta * -s) + (sTheta * c) ) * radius + cy);
=======
     * @param {number} cx - The x-coordinate of the center of the circle
     * @param {number} cy - The y-coordinate of the center of the circle
     * @param {number} radius - The radius of the circle
     * @param {number} startAngle - The starting angle, in radians (0 is at the 3 o'clock position
     *  of the arc's circle)
     * @param {number} endAngle - The ending angle, in radians
     * @param {boolean} [anticlockwise=false] - Specifies whether the drawing should be
     *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
     *  indicates counter-clockwise.
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    arc(cx, cy, radius, startAngle, endAngle, anticlockwise = false)
    {
        if (startAngle === endAngle)
        {
            return this;
        }

        if (!anticlockwise && endAngle <= startAngle)
        {
            endAngle += Math.PI * 2;
        }
        else if (anticlockwise && startAngle <= endAngle)
        {
            startAngle += Math.PI * 2;
        }

        const sweep = anticlockwise ? (startAngle - endAngle) * -1 : (endAngle - startAngle);
        const segs = Math.ceil(Math.abs(sweep) / (Math.PI * 2)) * 40;

        if (sweep === 0)
        {
            return this;
        }

        const startX = cx + (Math.cos(startAngle) * radius);
        const startY = cy + (Math.sin(startAngle) * radius);

        if (this.currentPath)
        {
            this.currentPath.shape.points.push(startX, startY);
        }
        else
        {
            this.moveTo(startX, startY);
        }

        const points = this.currentPath.shape.points;

        const theta = sweep / (segs * 2);
        const theta2 = theta * 2;

        const cTheta = Math.cos(theta);
        const sTheta = Math.sin(theta);

        const segMinus = segs - 1;

        const remainder = (segMinus % 1) / segMinus;

        for (let i = 0; i <= segMinus; ++i)
        {
            const real = i + (remainder * i);

            const angle = ((theta) + startAngle + (theta2 * real));

            const c = Math.cos(angle);
            const s = -Math.sin(angle);

            points.push(
                (((cTheta * c) + (sTheta * s)) * radius) + cx,
                (((cTheta * -s) + (sTheta * c)) * radius) + cy
            );
>>>>>>> upstream/dev
        }

        this.dirty++;

        return this;
    }

    /**
     * Specifies a simple one-color fill that subsequent calls to other Graphics methods
     * (such as lineTo() or drawCircle()) use when drawing.
     *
<<<<<<< HEAD
     * @param color {number} the color of the fill
     * @param alpha {number} the alpha of the fill
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    beginFill(color, alpha)
    {
        this.filling = true;
        this.fillColor = color || 0;
        this.fillAlpha = (alpha === undefined) ? 1 : alpha;
=======
     * @param {number} [color=0] - the color of the fill
     * @param {number} [alpha=1] - the alpha of the fill
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    beginFill(color = 0, alpha = 1)
    {
        this.filling = true;
        this.fillColor = color;
        this.fillAlpha = alpha;
>>>>>>> upstream/dev

        if (this.currentPath)
        {
            if (this.currentPath.shape.points.length <= 2)
            {
                this.currentPath.fill = this.filling;
                this.currentPath.fillColor = this.fillColor;
                this.currentPath.fillAlpha = this.fillAlpha;
            }
        }
<<<<<<< HEAD
=======

>>>>>>> upstream/dev
        return this;
    }

    /**
     * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
     *
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    endFill()
    {
        this.filling = false;
        this.fillColor = null;
        this.fillAlpha = 1;

        return this;
    }

    /**
     *
<<<<<<< HEAD
     * @param x {number} The X coord of the top-left of the rectangle
     * @param y {number} The Y coord of the top-left of the rectangle
     * @param width {number} The width of the rectangle
     * @param height {number} The height of the rectangle
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawRect( x, y, width, height )
    {
        this.drawShape(new math.Rectangle(x,y, width, height));
=======
     * @param {number} x - The X coord of the top-left of the rectangle
     * @param {number} y - The Y coord of the top-left of the rectangle
     * @param {number} width - The width of the rectangle
     * @param {number} height - The height of the rectangle
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawRect(x, y, width, height)
    {
        this.drawShape(new Rectangle(x, y, width, height));
>>>>>>> upstream/dev

        return this;
    }

    /**
     *
<<<<<<< HEAD
     * @param x {number} The X coord of the top-left of the rectangle
     * @param y {number} The Y coord of the top-left of the rectangle
     * @param width {number} The width of the rectangle
     * @param height {number} The height of the rectangle
     * @param radius {number} Radius of the rectangle corners
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawRoundedRect( x, y, width, height, radius )
    {
        this.drawShape(new math.RoundedRectangle(x, y, width, height, radius));
=======
     * @param {number} x - The X coord of the top-left of the rectangle
     * @param {number} y - The Y coord of the top-left of the rectangle
     * @param {number} width - The width of the rectangle
     * @param {number} height - The height of the rectangle
     * @param {number} radius - Radius of the rectangle corners
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawRoundedRect(x, y, width, height, radius)
    {
        this.drawShape(new RoundedRectangle(x, y, width, height, radius));
>>>>>>> upstream/dev

        return this;
    }

    /**
     * Draws a circle.
     *
<<<<<<< HEAD
     * @param x {number} The X coordinate of the center of the circle
     * @param y {number} The Y coordinate of the center of the circle
     * @param radius {number} The radius of the circle
=======
     * @param {number} x - The X coordinate of the center of the circle
     * @param {number} y - The Y coordinate of the center of the circle
     * @param {number} radius - The radius of the circle
>>>>>>> upstream/dev
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawCircle(x, y, radius)
    {
<<<<<<< HEAD
        this.drawShape(new math.Circle(x,y, radius));
=======
        this.drawShape(new Circle(x, y, radius));
>>>>>>> upstream/dev

        return this;
    }

    /**
     * Draws an ellipse.
     *
<<<<<<< HEAD
     * @param x {number} The X coordinate of the center of the ellipse
     * @param y {number} The Y coordinate of the center of the ellipse
     * @param width {number} The half width of the ellipse
     * @param height {number} The half height of the ellipse
=======
     * @param {number} x - The X coordinate of the center of the ellipse
     * @param {number} y - The Y coordinate of the center of the ellipse
     * @param {number} width - The half width of the ellipse
     * @param {number} height - The half height of the ellipse
>>>>>>> upstream/dev
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawEllipse(x, y, width, height)
    {
<<<<<<< HEAD
        this.drawShape(new math.Ellipse(x, y, width, height));
=======
        this.drawShape(new Ellipse(x, y, width, height));
>>>>>>> upstream/dev

        return this;
    }

    /**
     * Draws a polygon using the given path.
     *
<<<<<<< HEAD
     * @param path {number[]|PIXI.Point[]} The path data used to construct the polygon.
=======
     * @param {number[]|PIXI.Point[]} path - The path data used to construct the polygon.
>>>>>>> upstream/dev
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    drawPolygon(path)
    {
        // prevents an argument assignment deopt
        // see section 3.1: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
<<<<<<< HEAD
        var points = path;

        var closed = true;

        if (points instanceof math.Polygon)
=======
        let points = path;

        let closed = true;

        if (points instanceof Polygon)
>>>>>>> upstream/dev
        {
            closed = points.closed;
            points = points.points;
        }

        if (!Array.isArray(points))
        {
            // prevents an argument leak deopt
            // see section 3.2: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
            points = new Array(arguments.length);
<<<<<<< HEAD

            for (var i = 0; i < points.length; ++i)
            {
                points[i] = arguments[i];
            }
        }

        var shape = new math.Polygon(points);
=======

            for (let i = 0; i < points.length; ++i)
            {
                points[i] = arguments[i]; // eslint-disable-line prefer-rest-params
            }
        }

        const shape = new Polygon(points);

>>>>>>> upstream/dev
        shape.closed = closed;

        this.drawShape(shape);

        return this;
    }

    /**
     * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
     *
     * @return {PIXI.Graphics} This Graphics object. Good for chaining method calls
     */
    clear()
    {
<<<<<<< HEAD
        this.lineWidth = 0;
        this.filling = false;

        this.dirty++;
        this.clearDirty++;
        this.graphicsData = [];
=======
        if (this.lineWidth || this.filling || this.graphicsData.length > 0)
        {
            this.lineWidth = 0;
            this.filling = false;

            this.dirty++;
            this.clearDirty++;
            this.graphicsData.length = 0;
        }
>>>>>>> upstream/dev

        return this;
    }

    /**
<<<<<<< HEAD
     * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and masked with gl.scissor
     * @returns {boolean}
     */
    isFastRect() {
        return this.graphicsData.length === 1 && this.graphicsData[0].shape.type === CONST.SHAPES.RECT && !this.graphicsData[0].lineWidth;
=======
     * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
     * masked with gl.scissor.
     *
     * @returns {boolean} True if only 1 rect.
     */
    isFastRect()
    {
        return this.graphicsData.length === 1
            && this.graphicsData[0].shape.type === SHAPES.RECT
            && !this.graphicsData[0].lineWidth;
>>>>>>> upstream/dev
    }

    /**
     * Renders the object using the WebGL renderer
     *
<<<<<<< HEAD
     * @param renderer {PIXI.WebGLRenderer}
     * @private
=======
     * @private
     * @param {PIXI.WebGLRenderer} renderer - The renderer
>>>>>>> upstream/dev
     */
    _renderWebGL(renderer)
    {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
<<<<<<< HEAD
        if(this.dirty !== this.fastRectDirty)
=======
        if (this.dirty !== this.fastRectDirty)
>>>>>>> upstream/dev
        {
            this.fastRectDirty = this.dirty;
            this._fastRect = this.isFastRect();
        }

<<<<<<< HEAD
        //TODO this check can be moved to dirty?
        if(this._fastRect)
=======
        // TODO this check can be moved to dirty?
        if (this._fastRect)
>>>>>>> upstream/dev
        {
            this._renderSpriteRect(renderer);
        }
        else
        {
            renderer.setObjectRenderer(renderer.plugins.graphics);
            renderer.plugins.graphics.render(this);
        }

<<<<<<< HEAD
    }

    _renderSpriteRect(renderer)
    {
        var rect = this.graphicsData[0].shape;
        if(!this._spriteRect)
        {
            if(!Graphics._SPRITE_TEXTURE)
            {
                Graphics._SPRITE_TEXTURE = RenderTexture.create(10, 10);

                var currentRenderTarget = renderer._activeRenderTarget;
                renderer.bindRenderTexture(Graphics._SPRITE_TEXTURE);
                renderer.clear([1,1,1,1]);
                renderer.bindRenderTarget(currentRenderTarget);
            }

            this._spriteRect = new Sprite(Graphics._SPRITE_TEXTURE);
        }
        if (this.tint === 0xffffff) {
            this._spriteRect.tint = this.graphicsData[0].fillColor;
        } else {
            var t1 = tempColor1;
            var t2 = tempColor2;
            utils.hex2rgb(this.graphicsData[0].fillColor, t1);
            utils.hex2rgb(this.tint, t2);
            t1[0] *= t2[0];
            t1[1] *= t2[1];
            t1[2] *= t2[2];
            this._spriteRect.tint = utils.rgb2hex(t1);
        }
        this._spriteRect.alpha = this.graphicsData[0].fillAlpha;
        this._spriteRect.worldAlpha = this.worldAlpha * this._spriteRect.alpha;

        Graphics._SPRITE_TEXTURE._frame.width = rect.width;
        Graphics._SPRITE_TEXTURE._frame.height = rect.height;

        this._spriteRect.transform.worldTransform = this.transform.worldTransform;

        this._spriteRect.anchor.set(-rect.x / rect.width, -rect.y / rect.height);
        this._spriteRect.onAnchorUpdate();

        this._spriteRect._renderWebGL(renderer);
    }

    /**
     * Renders the object using the Canvas renderer
     *
     * @param renderer {PIXI.CanvasRenderer}
     * @private
     */
    _renderCanvas(renderer)
    {
        if (this.isMask === true)
        {
            return;
        }

        renderer.plugins.graphics.render(this);
    }

    /**
     * Retrieves the bounds of the graphic shape as a rectangle object
     *
     * @param [matrix] {PIXI.Matrix} The world transform matrix to use, defaults to this
     *  object's worldTransform.
     * @return {PIXI.Rectangle} the rectangular bounding area
     */
    _calculateBounds()
    {
        if (!this.renderable)
        {
            return;
=======
    /**
     * Renders a sprite rectangle.
     *
     * @private
     * @param {PIXI.WebGLRenderer} renderer - The renderer
     */
    _renderSpriteRect(renderer)
    {
        const rect = this.graphicsData[0].shape;

        if (!this._spriteRect)
        {
            if (!Graphics._SPRITE_TEXTURE)
            {
                Graphics._SPRITE_TEXTURE = RenderTexture.create(10, 10);

                const canvas = document.createElement('canvas');

                canvas.width = 10;
                canvas.height = 10;

                const context = canvas.getContext('2d');

                context.fillStyle = 'white';
                context.fillRect(0, 0, 10, 10);

                Graphics._SPRITE_TEXTURE = Texture.fromCanvas(canvas);
            }

            this._spriteRect = new Sprite(Graphics._SPRITE_TEXTURE);
        }
        if (this.tint === 0xffffff)
        {
            this._spriteRect.tint = this.graphicsData[0].fillColor;
>>>>>>> upstream/dev
        }
        else
        {
            const t1 = tempColor1;
            const t2 = tempColor2;

<<<<<<< HEAD
        if (this.boundsDirty !== this.dirty)
        {
            this.boundsDirty = this.dirty;
            this.updateLocalBounds();

            this.dirty++;
            this.cachedSpriteDirty = true;
        }

        var lb = this._localBounds;
        this._bounds.addFrame(this.transform, lb.minX, lb.minY, lb.maxX, lb.maxY);
    }

    /**
    * Tests if a point is inside this graphics object
    *
    * @param point {PIXI.Point} the point to test
    * @return {boolean} the result of the test
    */
    containsPoint( point )
    {
        this.worldTransform.applyInverse(point,  tempPoint);

        var graphicsData = this.graphicsData;

        for (var i = 0; i < graphicsData.length; i++)
        {
            var data = graphicsData[i];

=======
            hex2rgb(this.graphicsData[0].fillColor, t1);
            hex2rgb(this.tint, t2);

            t1[0] *= t2[0];
            t1[1] *= t2[1];
            t1[2] *= t2[2];

            this._spriteRect.tint = rgb2hex(t1);
        }
        this._spriteRect.alpha = this.graphicsData[0].fillAlpha;
        this._spriteRect.worldAlpha = this.worldAlpha * this._spriteRect.alpha;

        Graphics._SPRITE_TEXTURE._frame.width = rect.width;
        Graphics._SPRITE_TEXTURE._frame.height = rect.height;

        this._spriteRect.transform.worldTransform = this.transform.worldTransform;

        this._spriteRect.anchor.set(-rect.x / rect.width, -rect.y / rect.height);
        this._spriteRect._onAnchorUpdate();

        this._spriteRect._renderWebGL(renderer);
    }

    /**
     * Renders the object using the Canvas renderer
     *
     * @private
     * @param {PIXI.CanvasRenderer} renderer - The renderer
     */
    _renderCanvas(renderer)
    {
        if (this.isMask === true)
        {
            return;
        }

        renderer.plugins.graphics.render(this);
    }

    /**
     * Retrieves the bounds of the graphic shape as a rectangle object
     *
     * @private
     */
    _calculateBounds()
    {
        if (this.boundsDirty !== this.dirty)
        {
            this.boundsDirty = this.dirty;
            this.updateLocalBounds();

            this.dirty++;
            this.cachedSpriteDirty = true;
        }

        const lb = this._localBounds;

        this._bounds.addFrame(this.transform, lb.minX, lb.minY, lb.maxX, lb.maxY);
    }

    /**
     * Tests if a point is inside this graphics object
     *
     * @param {PIXI.Point} point - the point to test
     * @return {boolean} the result of the test
     */
    containsPoint(point)
    {
        this.worldTransform.applyInverse(point, tempPoint);

        const graphicsData = this.graphicsData;

        for (let i = 0; i < graphicsData.length; ++i)
        {
            const data = graphicsData[i];

>>>>>>> upstream/dev
            if (!data.fill)
            {
                continue;
            }

            // only deal with fills..
            if (data.shape)
            {
<<<<<<< HEAD
                if ( data.shape.contains( tempPoint.x, tempPoint.y ) )
=======
                if (data.shape.contains(tempPoint.x, tempPoint.y))
>>>>>>> upstream/dev
                {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Update the bounds of the object
     *
     */
    updateLocalBounds()
    {
<<<<<<< HEAD
        var minX = Infinity;
        var maxX = -Infinity;

        var minY = Infinity;
        var maxY = -Infinity;

        if (this.graphicsData.length)
        {
            var shape, points, x, y, w, h;

            for (var i = 0; i < this.graphicsData.length; i++)
            {
                var data = this.graphicsData[i];
                var type = data.type;
                var lineWidth = data.lineWidth;
                shape = data.shape;

                if (type === CONST.SHAPES.RECT || type === CONST.SHAPES.RREC)
                {
                    x = shape.x - lineWidth/2;
                    y = shape.y - lineWidth/2;
                    w = shape.width + lineWidth;
                    h = shape.height + lineWidth;

                    minX = x < minX ? x : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y < minY ? y : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                }
                else if (type === CONST.SHAPES.CIRC)
                {
                    x = shape.x;
                    y = shape.y;
                    w = shape.radius + lineWidth/2;
                    h = shape.radius + lineWidth/2;

                    minX = x - w < minX ? x - w : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y - h < minY ? y - h : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                }
                else if (type === CONST.SHAPES.ELIP)
                {
                    x = shape.x;
                    y = shape.y;
                    w = shape.width + lineWidth/2;
                    h = shape.height + lineWidth/2;

=======
        let minX = Infinity;
        let maxX = -Infinity;

        let minY = Infinity;
        let maxY = -Infinity;

        if (this.graphicsData.length)
        {
            let shape = 0;
            let x = 0;
            let y = 0;
            let w = 0;
            let h = 0;

            for (let i = 0; i < this.graphicsData.length; i++)
            {
                const data = this.graphicsData[i];
                const type = data.type;
                const lineWidth = data.lineWidth;

                shape = data.shape;

                if (type === SHAPES.RECT || type === SHAPES.RREC)
                {
                    x = shape.x - (lineWidth / 2);
                    y = shape.y - (lineWidth / 2);
                    w = shape.width + lineWidth;
                    h = shape.height + lineWidth;

                    minX = x < minX ? x : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y < minY ? y : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                }
                else if (type === SHAPES.CIRC)
                {
                    x = shape.x;
                    y = shape.y;
                    w = shape.radius + (lineWidth / 2);
                    h = shape.radius + (lineWidth / 2);

                    minX = x - w < minX ? x - w : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y - h < minY ? y - h : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                }
                else if (type === SHAPES.ELIP)
                {
                    x = shape.x;
                    y = shape.y;
                    w = shape.width + (lineWidth / 2);
                    h = shape.height + (lineWidth / 2);

>>>>>>> upstream/dev
                    minX = x - w < minX ? x - w : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y - h < minY ? y - h : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                }
                else
                {
                    // POLY
<<<<<<< HEAD
                    points = shape.points;

                    for (var j = 0; j < points.length; j += 2)
                    {
                        x = points[j];
                        y = points[j+1];

                        minX = x-lineWidth < minX ? x-lineWidth : minX;
                        maxX = x+lineWidth > maxX ? x+lineWidth : maxX;

                        minY = y-lineWidth < minY ? y-lineWidth : minY;
                        maxY = y+lineWidth > maxY ? y+lineWidth : maxY;
=======
                    const points = shape.points;

                    for (let j = 0; j < points.length; j += 2)
                    {
                        x = points[j];
                        y = points[j + 1];

                        minX = x - lineWidth < minX ? x - lineWidth : minX;
                        maxX = x + lineWidth > maxX ? x + lineWidth : maxX;

                        minY = y - lineWidth < minY ? y - lineWidth : minY;
                        maxY = y + lineWidth > maxY ? y + lineWidth : maxY;
>>>>>>> upstream/dev
                    }
                }
            }
        }
        else
        {
            minX = 0;
            maxX = 0;
            minY = 0;
            maxY = 0;
        }
<<<<<<< HEAD

        var padding = this.boundsPadding;

        this._localBounds.minX = minX - padding;
        this._localBounds.maxX = maxX + padding * 2;

        this._localBounds.minY = minY - padding;
        this._localBounds.maxY = maxY + padding * 2;
    }
=======

        const padding = this.boundsPadding;

        this._localBounds.minX = minX - padding;
        this._localBounds.maxX = maxX + (padding * 2);
>>>>>>> upstream/dev

        this._localBounds.minY = minY - padding;
        this._localBounds.maxY = maxY + (padding * 2);
    }

    /**
     * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
     *
<<<<<<< HEAD
     * @param shape {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} The shape object to draw.
=======
     * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
>>>>>>> upstream/dev
     * @return {PIXI.GraphicsData} The generated GraphicsData object.
     */
    drawShape(shape)
    {
        if (this.currentPath)
        {
            // check current path!
            if (this.currentPath.shape.points.length <= 2)
            {
                this.graphicsData.pop();
            }
        }

        this.currentPath = null;

<<<<<<< HEAD
        var data = new GraphicsData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, shape);

        this.graphicsData.push(data);

        if (data.type === CONST.SHAPES.POLY)
=======
        const data = new GraphicsData(
            this.lineWidth,
            this.lineColor,
            this.lineAlpha,
            this.fillColor,
            this.fillAlpha,
            this.filling,
            shape
        );

        this.graphicsData.push(data);

        if (data.type === SHAPES.POLY)
>>>>>>> upstream/dev
        {
            data.shape.closed = data.shape.closed || this.filling;
            this.currentPath = data;
        }

        this.dirty++;

        return data;
    }

<<<<<<< HEAD
    generateCanvasTexture(scaleMode, resolution)
    {
        resolution = resolution || 1;

        var bounds = this.getLocalBounds();

        var canvasBuffer = new RenderTexture.create(bounds.width * resolution, bounds.height * resolution);

        if(!canvasRenderer)
        {
            canvasRenderer = new CanvasRenderer();
        }

        tempMatrix.tx = -bounds.x;
        tempMatrix.ty = -bounds.y;

        canvasRenderer.render(this, canvasBuffer, false, tempMatrix);

        var texture = Texture.fromCanvas(canvasBuffer.baseTexture._canvasRenderTarget.canvas, scaleMode);
        texture.baseTexture.resolution = resolution;
=======
    /**
     * Generates a canvas texture.
     *
     * @param {number} scaleMode - The scale mode of the texture.
     * @param {number} resolution - The resolution of the texture.
     * @return {PIXI.Texture} The new texture.
     */
    generateCanvasTexture(scaleMode, resolution = 1)
    {
        const bounds = this.getLocalBounds();

        const canvasBuffer = RenderTexture.create(bounds.width, bounds.height, scaleMode, resolution);

        if (!canvasRenderer)
        {
            canvasRenderer = new CanvasRenderer();
        }

        tempMatrix.tx = -bounds.x;
        tempMatrix.ty = -bounds.y;

        canvasRenderer.render(this, canvasBuffer, false, tempMatrix);

        const texture = Texture.fromCanvas(canvasBuffer.baseTexture._canvasRenderTarget.canvas, scaleMode);

        texture.baseTexture.resolution = resolution;
        texture.baseTexture.update();
>>>>>>> upstream/dev

        return texture;
    }

<<<<<<< HEAD
    closePath()
    {
        // ok so close path assumes next one is a hole!
        var currentPath = this.currentPath;
        if (currentPath && currentPath.shape)
        {
            currentPath.shape.close();
        }
        return this;
    }

    addHole()
    {
        // this is a hole!
        var hole = this.graphicsData.pop();

        this.currentPath = this.graphicsData[this.graphicsData.length-1];

        this.currentPath.addHole(hole.shape);
        this.currentPath = null;

        return this;
    }

    /**
     * Destroys the Graphics object.
     */
    destroy()
    {
        super.destroy(arguments);

        // destroy each of the GraphicsData objects
        for (var i = 0; i < this.graphicsData.length; ++i) {
            this.graphicsData[i].destroy();
        }

        // for each webgl data entry, destroy the WebGLGraphicsData
        for (var id in this._webgl) {
            for (var j = 0; j < this._webgl[id].data.length; ++j) {
                this._webgl[id].data[j].destroy();
            }
        }

        if(this._spriteRect)
        {
            this._spriteRect.destroy();
        }
=======
    /**
     * Closes the current path.
     *
     * @return {PIXI.Graphics} Returns itself.
     */
    closePath()
    {
        // ok so close path assumes next one is a hole!
        const currentPath = this.currentPath;

        if (currentPath && currentPath.shape)
        {
            currentPath.shape.close();
        }

        return this;
    }

    /**
     * Adds a hole in the current path.
     *
     * @return {PIXI.Graphics} Returns itself.
     */
    addHole()
    {
        // this is a hole!
        const hole = this.graphicsData.pop();

        this.currentPath = this.graphicsData[this.graphicsData.length - 1];

        this.currentPath.addHole(hole.shape);
        this.currentPath = null;

        return this;
    }

    /**
     * Destroys the Graphics object.
     *
     * @param {object|boolean} [options] - Options parameter. A boolean will act as if all
     *  options have been set to that value
     * @param {boolean} [options.children=false] - if set to true, all the children will have
     *  their destroy method called as well. 'options' will be passed on to those calls.
     */
    destroy(options)
    {
        super.destroy(options);

        // destroy each of the GraphicsData objects
        for (let i = 0; i < this.graphicsData.length; ++i)
        {
            this.graphicsData[i].destroy();
        }

        // for each webgl data entry, destroy the WebGLGraphicsData
        for (const id in this._webgl)
        {
            for (let j = 0; j < this._webgl[id].data.length; ++j)
            {
                this._webgl[id].data[j].destroy();
            }
        }

        if (this._spriteRect)
        {
            this._spriteRect.destroy();
        }

>>>>>>> upstream/dev
        this.graphicsData = null;

        this.currentPath = null;
        this._webgl = null;
        this._localBounds = null;
    }

}

Graphics._SPRITE_TEXTURE = null;
<<<<<<< HEAD

module.exports = Graphics;
=======
>>>>>>> upstream/dev
