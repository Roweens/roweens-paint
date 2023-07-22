import { MouseEvent } from 'react';
import Tool from './Tool';

export default class Line extends Tool {
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
        this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
        this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
        this.ctx?.beginPath();
        this.ctx?.moveTo(
            e.pageX - (e.target as HTMLElement).offsetLeft,
            e.pageY - (e.target as HTMLElement).offsetTop,
        );
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHander(e: MouseEvent<HTMLCanvasElement>) {
        if (this.mouseDown) {
            let currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
            let currentY = e.pageY - (e.target as HTMLElement).offsetTop;
            this.draw(currentX, currentY);
        }
    }

    draw(x: number, y: number) {
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
            this.ctx?.moveTo(this.startX, this.startY);
            this.ctx?.lineTo(x, y);
            this.ctx?.stroke();
        };
    }
}
