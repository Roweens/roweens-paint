import { useEffect } from 'react';
import { useBoundStore } from 'store/store';
import Brush from 'tools/Brush';
import Circle from 'tools/Circle';
import Line from 'tools/Line';
import Rectangle from 'tools/Rectangle';
import {
    DrawMessage,
    FigureType,
    MessageMethod,
    UndoRedoMessage,
    wsMessage,
} from 'types/wsMessage';

export const useWebsocket = (canvas: HTMLCanvasElement, id: string) => {
    const username = useBoundStore((state) => state.username);
    const isAuth = useBoundStore((state) => state.isAuth);
    const setSocket = useBoundStore((state) => state.setSocket);
    const setSessionId = useBoundStore((state) => state.setSessionId);
    const setTool = useBoundStore((state) => state.setTool);
    const setUndoList = useBoundStore((state) => state.setUndoList);
    const setRedoList = useBoundStore((state) => state.setRedoList);

    const drawHandler = (msg: DrawMessage) => {
        const { figure } = msg;
        const ctx = canvas?.getContext('2d');
        switch (figure.type) {
            case FigureType.BRUSH:
                Brush.draw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
                break;
            case FigureType.RECTANGLE:
                Rectangle.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.width,
                    figure.height,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
                break;
            case FigureType.CIRCLE:
                Circle.staticDraw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.radius,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
                break;
            case FigureType.LINE:
                Line.draw(
                    ctx,
                    figure.x,
                    figure.y,
                    figure.startX,
                    figure.startY,
                    figure.color,
                    figure.stroke,
                    figure.lineWidth,
                );
                break;
            case FigureType.ERASER:
                Brush.draw(
                    ctx,
                    figure.x,
                    figure.y,
                    'white',
                    'white',
                    figure.lineWidth,
                );
                break;
            case FigureType.FINISH:
                ctx?.beginPath();
                break;
            default:
                break;
        }
    };

    const undoRedoHandler = (msg: UndoRedoMessage) => {
        const ctx = canvas?.getContext('2d');
        const img = new Image();
        img.src = msg.dataUrl;
        img.onload = () => {
            ctx?.clearRect(
                0,
                0,
                canvas.width as number,
                canvas.height as number,
            );
            ctx?.drawImage(
                img,
                0,
                0,
                canvas.width as number,
                canvas.height as number,
            );
        };
        setRedoList(msg.redoList);
        setUndoList(msg.undoList);
    };

    useEffect(() => {
        if (isAuth && canvas) {
            const socket = new WebSocket(__WS_API_URL__);
            setSocket(socket);
            setSessionId(id);
            setTool(new Brush(canvas, socket, id));

            socket.onopen = () => {
                socket.send(
                    JSON.stringify({
                        id,
                        username,
                        method: MessageMethod.CONNECTION,
                    }),
                );
            };

            socket.onmessage = (event: MessageEvent) => {
                const msg: wsMessage = JSON.parse(event.data);
                switch (msg.method) {
                    case MessageMethod.CONNECTION:
                        break;
                    case MessageMethod.DRAW:
                        drawHandler(msg);
                        break;
                    case MessageMethod.UNDO:
                        undoRedoHandler(msg);
                        break;
                    case MessageMethod.REDO:
                        undoRedoHandler(msg);
                        break;
                    default:
                        break;
                }
            };
        }
    }, [username, isAuth]);
};
