import Entity from '../CanvasEffect/Entity';

export default class Triangle extends Entity {
	constructor(ctx, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.colors = ['#A5A3A4', '#B9B9B9', '#CECCCD', '#FFFFFF'];
		this.fill;

	}
	getCrossProduct(u, v) {
		return [
			u[1]*v[2]-u[2]*v[1],
			u[2]*v[0]-u[0]*v[2],
			u[0]*v[1]-u[1]*v[0]
		];
	}
	setColor() {
		let i = (this.b[1]-this.a[1])*(this.c[2]-this.a[2])-(this.b[2]-this.a[2])*(this.c[1]-this.a[1]);
		let j = -((this.b[0]-this.a[0])*(this.c[2]-this.a[2])-((this.b[2]-this.a[2])*(this.c[0]-this.a[0])));
		if (i > 0 && j > 0) {
			this.fill = this.colors[0];
		} else if (i < 0 && j > 0) {
			this.fill = this.colors[1];
		} else if (i < 0 && j < 0) {
			this.fill = this.colors[2];
		} else if (i > 0 && j < 0) {
			this.fill = this.colors[3];
		}
	}
	init(config) {
		
	}
	update() {}
	render() {
		this.ctx.fillStyle = this.fill;
		this.ctx.strokeStyle = this.fill;
		this.ctx.lineWidth = 1;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.fill();
		this.ctx.stroke();
	}
}
