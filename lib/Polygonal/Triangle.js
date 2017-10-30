"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = require("../CanvasEffect/validate");
// math equations: Dan Avila <daniel.avila@yale.edu>
// light intesity: https://stackoverflow.com/a/31682068/4616986
var Triangle = (function () {
    function Triangle(ctx, light, a, b, c) {
        this.ctx = ctx;
        this.light = light;
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = [255, 255, 255, 1];
        this.hue = this.color;
        this.maxShade = 0.3;
    }
    Triangle.prototype.init = function (config) {
        this.color = validate.color(config.color) ? config.color : this.color;
        this.shader();
    };
    Triangle.prototype.update = function (light) {
        this.light = light;
        this.shader();
    };
    Triangle.prototype.render = function () {
        this.ctx.fillStyle = "rgba(" + this.hue[0] + "," + this.hue[1] + "," + this.hue[2] + "," + this.hue[3] + ")";
        this.ctx.strokeStyle = "rgba(" + this.hue[0] + "," + this.hue[1] + "," + this.hue[2] + "," + this.hue[3] + ")";
        this.ctx.beginPath();
        this.ctx.moveTo(this.a[0], this.a[1]);
        this.ctx.lineTo(this.b[0], this.b[1]);
        this.ctx.lineTo(this.c[0], this.c[1]);
        this.ctx.fill();
        this.ctx.stroke();
    };
    Triangle.prototype.shader = function () {
        var v1 = this.vector(this.a, this.b);
        var v2 = this.vector(this.a, this.c);
        var n = this.cross(v1, v2);
        var un = this.normalize(n);
        var l = this.vector(this.a, this.light);
        var ul = this.normalize(l);
        var dp = this.dotProduct(un, ul);
        var power = (dp + 1) / 2;
        this.hue = this.shade(this.color, this.getIntensity(power, this.maxShade));
    };
    Triangle.prototype.vector = function (p1, p2) {
        return [
            p2[0] - p1[0],
            p2[1] - p1[1],
            p2[2] - p1[2]
        ];
    };
    Triangle.prototype.cross = function (v1, v2) {
        return [
            (v1[1] * v2[2]) - (v1[2] * v2[1]),
            (v1[2] * v2[0]) - (v1[0] * v2[2]),
            (v1[0] * v2[1]) - (v1[1] * v2[0])
        ];
    };
    Triangle.prototype.normalize = function (v) {
        var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        return [v[0] / m, v[1] / m, v[2] / m];
    };
    Triangle.prototype.shade = function (color, i) {
        return [
            Math.floor(color[0] * i),
            Math.floor(color[1] * i),
            Math.floor(color[2] * i),
            color[3]
        ];
    };
    Triangle.prototype.tint = function (color, i) {
        return [
            Math.floor((255 - color[0]) * i),
            Math.floor((255 - color[1]) * i),
            Math.floor((255 - color[2]) * i),
            color[3]
        ];
    };
    Triangle.prototype.getIntensity = function (power, max) {
        return 1 - max + max * power;
    };
    Triangle.prototype.dotProduct = function (v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    };
    Triangle.prototype.getCenteroid = function () {
        return [
            (this.a[0] + this.b[0] + this.c[0]) / 3,
            (this.a[1] + this.b[1] + this.c[1]) / 3
        ];
    };
    Triangle.prototype.isDark = function (color) {
        return (color[0] + color[1] + color[2]) / 3 > 127;
    };
    return Triangle;
}());
exports.default = Triangle;
