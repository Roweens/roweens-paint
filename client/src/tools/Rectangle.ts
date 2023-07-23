import { FigureType, MessageMethod } from 'types/wsMessage';
import Tool from './Tool';

export default class Rectangle extends Tool {
    mouseDown: boolean;

    startX: number;

    startY: number;

    saved: string;

    width: number;

    height: number;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.height = 0;
        this.width = 0;
        this.saved = '';
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHander.bind(this);
        this.canvas.onmousedown = this.mouseDownHander.bind(this);
        this.canvas.onmouseup = this.mouseUpHander.bind(this);
    }

    mouseUpHander(e: globalThis.MouseEvent) {
        this.mouseDown = false;
        this.socket.send(
            JSON.stringify({
                method: MessageMethod.DRAW,
                id: this.id,
                figure: {
                    type: FigureType.RECTANGLE,
                    x: this.startX,
                    y: this.startY,
                    width: this.width,
                    height: this.height,
                    color: this.ctx?.fillStyle,
                    stroke: this.ctx?.strokeStyle,
                    lineWidth: this.ctx?.lineWidth,
                },
            }),
        );
    }

    mouseDownHander(e: globalThis.MouseEvent) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.startX = e.pageX - (e.target as HTMLElement).offsetLeft;
        this.startY = e.pageY - (e.target as HTMLElement).offsetTop;
        this.saved = this.canvas?.toDataURL();
    }

    mouseMoveHander(e: globalThis.MouseEvent) {
        if (this.mouseDown) {
            let currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
            let currentY = e.pageY - (e.target as HTMLElement).offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas?.width, this.canvas?.height);
            this.ctx?.drawImage(
                img,
                0,
                0,
                this.canvas?.width,
                this.canvas?.height,
            );
            this.ctx?.beginPath();
            this.ctx?.rect(x, y, w, h);
            this.ctx?.fill();
            this.ctx?.stroke();
        };
    }

    static staticDraw(
        ctx: CanvasRenderingContext2D | null,
        x: number,
        y: number,
        w: number,
        h: number,
        color: string,
        stroke: string,
        lineWidth: number,
    ) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.strokeStyle = stroke;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.fill();
            ctx.stroke();
        }
    }
}
