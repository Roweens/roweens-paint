import { useEffect } from 'react';
import { useBoundStore } from 'store/store';
import Brush from 'tools/Brush';
import { FigureType, MessageMethod, wsMessage } from 'types/wsMessage';

export const useWebsocket = (canvas: HTMLCanvasElement, id: string) => {
    const username = useBoundStore((state) => state.username);
    const isAuth = useBoundStore((state) => state.isAuth);
    const setSocket = useBoundStore((state) => state.setSocket);
    const setSessionId = useBoundStore((state) => state.setSessionId);
    const setTool = useBoundStore((state) => state.setTool);

    const drawHandler = (msg: wsMessage) => {
        const { figure } = msg;
        const ctx = canvas?.getContext('2d');
        switch (figure.type) {
            case FigureType.BRUSH:
                Brush.draw(ctx, figure.x, figure.y);
                break;
            case FigureType.FINISH:
                ctx?.beginPath();
                break;
            default:
                break;
        }
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
                    default:
                        break;
                }
            };
        }
    }, [username, isAuth]);
};
