import { FigureType, MessageMethod } from 'types/wsMessage';
import Tool from './Tool';

export default class Eraser extends Tool {
    mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.mouseDown = false;
        this.listen();
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
                    type: FigureType.FINISH,
                },
            }),
        );
    }

    mouseDownHander(e: globalThis.MouseEvent) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(
            e.pageX - (e.target as HTMLElement).offsetLeft,
            e.pageY - (e.target as HTMLElement).offsetTop,
        );
    }

    mouseMoveHander(e: globalThis.MouseEvent) {
        if (this.mouseDown) {
            this.socket.send(
                JSON.stringify({
                    method: MessageMethod.DRAW,
                    id: this.id,
                    figure: {
                        type: FigureType.ERASER,
                        x: e.pageX - (e.target as HTMLElement).offsetLeft,
                        y: e.pageY - (e.target as HTMLElement).offsetTop,
                        lineWidth: this.ctx?.lineWidth,
                    },
                }),
            );
        }
    }

    static draw(
        ctx: CanvasRenderingContext2D | null,
        x: number,
        y: number,
        lineWidth: number,
    ) {
        if (ctx) {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = lineWidth;
            ctx?.lineTo(x, y);
            ctx?.stroke();
        }
    }
}
