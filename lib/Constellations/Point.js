'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require('../CanvasEffect/Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Point = function (_Entity) {
	_inherits(Point, _Entity);

	function Point(ctx, pos) {
		_classCallCheck(this, Point);

		var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, ctx));

		_this.pos = pos;
		_this.color = [0, 0, 0, 1];
		_this.radius = _this.getRandomArbitrary(4, 2);
		_this.speed = _this.getRandomArbitrary(0.2, 0.1);
		_this.theta = _this.getRandomTheta();
		return _this;
	}

	_createClass(Point, [{
		key: 'getRandomArbitrary',
		value: function getRandomArbitrary(max, min) {
			return Math.random() * (max - min) + min;
		}
	}, {
		key: 'getRandomTheta',
		value: function getRandomTheta() {
			return Math.random() * 2 * Math.PI;
		}
	}, {
		key: 'isValidRGBA',
		value: function isValidRGBA(array) {
			return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
		}
	}, {
		key: 'init',
		value: function init(config) {
			if (config) {
				if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
					this.color = config.color;
				}
				if (config.radius && config.radius.length == 2 && config.radius[0] > config.radius[1]) {
					this.radius = this.getRandomArbitrary(config.radius[0], config.radius[1]);
				}
				if (config.speed && config.speed.length == 2 && config.speed[0] > config.speed[1]) {
					this.speed = this.getRandomArbitrary(config.speed[0], config.speed[1]);
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.pos[0] <= 0 + this.radius || this.pos[0] >= this.cw - this.radius) {
				this.theta = Math.PI - this.theta;
			}
			if (this.pos[1] <= 0 + this.radius || this.pos[1] >= this.ch - this.radius) {
				this.theta = 2 * Math.PI - this.theta;
			}
			this.pos[0] += Math.cos(this.theta) * this.speed;
			this.pos[1] += Math.sin(this.theta) * this.speed;
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
			this.ctx.beginPath();
			this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
			this.ctx.fill();
		}
	}]);

	return Point;
}(_Entity3.default);

exports.default = Point;