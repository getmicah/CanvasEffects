import { requestAnimFrame, cancelAnimFrame } from './requestAnimationFrame';

export default class CanvasEffect {
	constructor(el, config) {
		this.canvas = document.querySelector(el);
		this.ctx = this.canvas.getContext('2d');
		this.config = config;
		this.requestId;
		this.timer;
		this.setCanvasSize();
		window.addEventListener('resize', this.debounce.bind(this));
	}
	setCanvasSize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	debounce() {
		if (this.requestId) {
	       cancelAnimationFrame(this.requestId);
	       this.requestId = undefined;
	    }
		clearTimeout(this.timer);
  		this.timer = setTimeout(this.resize.bind(this), 250);
	}
	resize() {
		this.setCanvasSize();
		this.init();
	}
	init() {
		if (!this.requestId) {
			this.main();
		}
	}
	main() {
		this.requestId = requestAnimFrame(this.main.bind(this));
		this.update();
		this.render();
	}
	update() {}
	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
