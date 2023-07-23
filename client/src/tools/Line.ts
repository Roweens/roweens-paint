import { FigureType, MessageMethod } from 'types/wsMessage';
import Tool from './Tool';

export default class Line extends Tool {
    mouseDown: boolean;

    startX: number;

    startY: number;

    saved: string;

    currentX: number;

    currentY: number;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.saved = '';
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHander.bind(this);
        this.canvas.onmousedown = this.mouseDownHander.bind(this);
        this.canvas.onmouseup = this.mouseUpHander.bind(this);
    }

    mouseUpHander() {
        this.mouseDown = false;
        this.socket.send(
            JSON.stringify({
                method: MessageMethod.DRAW,
                id: this.id,
                figure: {
                    type: FigureType.LINE,
                    x: this.currentX,
                    y: this.currentY,
                    startX: this.startX,
                    startY: this.startY,
                    color: this.ctx?.fillStyle,
                    stroke: this.ctx?.strokeStyle,
                    lineWidth: this.ctx?.lineWidth,
                },
            }),
        );
        this.socket.send(
            JSON.stringify({
                method: MessageMethod.DRAW,
                id: this.id,
                figure: {
                    type: FigureType.FINISH,
                },
            }),
        );
    }

    mouseDownHander(e: globalThis.MouseEvent) {
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

    mouseMoveHander(e: globalThis.MouseEvent) {
        if (this.mouseDown) {
            this.currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
            this.currentY = e.pageY - (e.target as HTMLElement).offsetTop;
            this.draw(
                e.pageX - (e.target as HTMLElement).offsetLeft,
                e.pageY - (e.target as HTMLElement).offsetTop,
            );
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

    static draw(
        ctx: CanvasRenderingContext2D | null,
        x: number,
        y: number,
        startX: number,
        startY: number,
        color: string,
        stroke: string,
        lineWidth: number,
    ) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.strokeStyle = stroke;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx?.moveTo(startX, startY);
            ctx?.lineTo(x, y);
            ctx?.stroke();
        }
    }
}
