import { FigureType, MessageMethod } from 'types/wsMessage';
import Brush from './Brush';

export default class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
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
                        color: this.ctx?.fillStyle,
                        lineWidth: this.ctx?.lineWidth,
                    },
                }),
            );
        }
    }

    draw(x: number, y: number) {
        if (this.ctx) {
            this.ctx.strokeStyle = 'white';
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }
}
