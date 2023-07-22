import { MouseEvent } from 'react';
import Tool from './Tool';

export default class Circle extends Tool {
    mouseDown: boolean;

    startX: number;

    startY: number;

    saved: string;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.saved = '';
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHander.bind(this);
        this.canvas.onmousedown = this.mouseDownHander.bind(this);
        this.canvas.onmouseup = this.mouseUpHander.bind(this);
    }

    mouseUpHander(e: MouseEvent<HTMLCanvasElement>) {
        this.mouseDown = false;
    }

    mouseDownHander(e: MouseEvent<HTMLCanvasElement>) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
        this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHander(e: MouseEvent<HTMLCanvasElement>) {
        if (this.mouseDown) {
            let currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
            let currentY = e.pageY - (e.target as HTMLElement).offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            let radius = Math.sqrt(width ** 2 + height ** 2);
            this.draw(this.startX, this.startY, radius);
        }
    }

    draw(x: number, y: number, radius: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
            );
            this.ctx?.beginPath();
            this.ctx?.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx?.fill();
            this.ctx?.stroke();
        };
    }
}
