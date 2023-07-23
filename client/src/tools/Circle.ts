import { FigureType, MessageMethod } from 'types/wsMessage';
import Tool from './Tool';

export default class Circle extends Tool {
    mouseDown: boolean;

    startX: number;

    startY: number;

    saved: string;

    radius: number;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.mouseDown = false;
        this.listen();
        this.startX = 0;
        this.startY = 0;
        this.saved = '';
        this.radius = 0;
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
                    type: FigureType.CIRCLE,
                    x: this.startX,
                    y: this.startY,
                    radius: this.radius,
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
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHander(e: globalThis.MouseEvent) {
        if (this.mouseDown) {
            let currentX = e.pageX - (e.target as HTMLElement).offsetLeft;
            let currentY = e.pageY - (e.target as HTMLElement).offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.radius = Math.sqrt(width ** 2 + height ** 2);
            this.draw(this.startX, this.startY, this.radius);
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

    static staticDraw(
        ctx: CanvasRenderingContext2D | null,
        x: number,
        y: number,
        radius: number,
        color: string,
        stroke: string,
        lineWidth: number,
    ) {
        if (ctx) {
            ctx.fillStyle = color;
            ctx.strokeStyle = stroke;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx?.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    }
}
