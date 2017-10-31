import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import * as validate from '../CanvasEffect/validate';
import * as Delaunator from 'delaunator';

interface Config {
	container: string;
	width: any;
	height: any;
	seed?: number;
	color?: [number, number, number, number];
	mouse?: boolean;
	max?: number;
}

export default class Polygonal extends CanvasEffect<Config> {
	complexity: number;
	light: [number, number, number];
	mouse: boolean;
	seed: number;
	triangles: Array<Triangle>;
	constructor(config: Config) {
		super(config);
		this.complexity;
		this.light = this.getLightSource();
		this.mouse = true;
		this.seed = 8000;
		this.triangles;
		this.init();
	}
	init(): void {
		if (validate.number(this.config.seed)) {
			this.complexity = this.getComplexity(this.config.seed);
		} else {
			this.complexity = this.getComplexity(this.seed);
		}
		this.mouse = validate.boolean(this.config.mouse) ? this.config.mouse : this.mouse;
		this.triangles = [];
		this.generate()
		if (this.mouse) {
			addEventListener('mousemove', this.onMouseMove.bind(this), false);
		}		
		super.init();
	}
	update(): void {
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].update(this.light);
		}
	}
	render(): void {
		super.render();
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].render();
		}
	}
	generate(): void {
		const points: Array<[number, number]> = [];
		const pad = (this.canvas.width+this.canvas.height)/10;
		const cw = this.canvas.width+pad*2;
		const ch = this.canvas.height+pad*2;
		const iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		const ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		let i = 0;
		for (let y = -pad; y < this.canvas.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas.width+pad; x+=ix) {
				points[i] = [
					this.getRandomArbitrary(x,x+ix),
					this.getRandomArbitrary(y,y+iy),
				];
				i++;
			}
		}
		const delaunay = this.triangulate(points);
		const height = (this.canvas.height+this.canvas.width)/2;
		const vertices = this.elevate(delaunay, height);
		let j = 0;
		for (let k = 0; k < vertices.length; k+=3) {
			this.triangles[j] = new Triangle(this.ctx, this.light, vertices[k], vertices[k+1], vertices[k+2]);
			this.triangles[j].init(this.config);
			j++;
		}
	}
	triangulate(p: Array<[number, number]>): Array<[number, number]> {
		const d = new Delaunator(p).triangles;
		const t = [];
		for (var i = 0; i < d.length; i ++) {
			t.push(p[d[i]]);
		}
		return t;
	}
	elevate(p: Array<[number, number]>, h: number): number[][] {
		for (let i = 0; i < p.length; i++) {
			if (typeof p[i][2] === 'undefined') {
				for (let j = i; j < p.length; j++) {
					if (p[i] == p[j]) {
						p[j][2] = h;
						switch (j % 3) {
							case 0:
								p[j+1][2] = 0;
								p[j+2][2] = 0;
								break;
							case 1:
								p[j+1][2] = 0;
								p[j-1][2] = 0;
								break;
							case 2:
								p[j-1][2] = 0;
								p[j-2][2] = 0;
								break;
						}
					}
				}
			}
		}
		return p;
	}
	getLightSource(): [number, number, number] {
		return [
			this.canvas.width/2,
			this.canvas.height/2,
			this.canvas.width
		];
	}
	getComplexity(seed: number): number {
		return Math.round(this.canvas.width*this.canvas.height/seed);
	}
	getRandomArbitrary(max: number, min: number): number {
		return Math.random()*(max-min)+min;
	}
	getMousePosition(e: MouseEvent): [number, number] {
		const rect: ClientRect = this.canvas.getBoundingClientRect();
		return [e.clientX, e.clientY];
	}
	onMouseMove(e: MouseEvent): void {
		const pos: [number, number] = this.getMousePosition(e);
		this.light = [
			(pos[0]/this.canvas.width)*this.light[2],
			(pos[1]/this.canvas.height)*this.light[2],
			this.light[2]
		];
	}
}