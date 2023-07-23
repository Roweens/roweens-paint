import { CSSProperties, memo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useBoundStore } from 'store/store';
import { useParams } from 'react-router-dom';
import { useWebsocket } from 'hooks/useWebsocket';
import { $api } from 'api/api';
import cls from './Canvas.module.scss';

interface CanvasProps {
    className?: string;
}

const canvasStyles: CSSProperties = {
    border: '1px solid black',
    borderRadius: '6px',
};

export const Canvas = memo((props: CanvasProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const setCanvas = useBoundStore((state) => state.setCanvas);
    const pushToUndoList = useBoundStore((state) => state.pushToUndoList);

    useEffect(() => {
        setCanvas(canvasRef.current);
        let ctx = canvasRef.current?.getContext('2d');
        $api.get(`/canvas/`, {
            params: {
                id,
            },
        }).then((response) => {
            const img = new Image();
            img.src = response.data;
            img.onload = () => {
                ctx?.clearRect(
                    0,
                    0,
                    canvasRef.current?.width as number,
                    canvasRef.current?.height as number,
                );
                ctx?.drawImage(
                    img,
                    0,
                    0,
                    canvasRef.current?.width as number,
                    canvasRef.current?.height as number,
                );
            };
        });
    }, [id, setCanvas]);

    const onCanvasMouseDown = useCallback(() => {
        pushToUndoList(canvasRef.current?.toDataURL() as string);
        $api.post('/canvas/', {
            img: canvasRef.current?.toDataURL(),
            id,
        });
    }, [id, pushToUndoList]);

    useWebsocket(canvasRef.current as HTMLCanvasElement, id as string);

    return (
        <div className={classNames(cls.canvas, {}, [className])}>
            <canvas
                style={canvasStyles}
                width={1600}
                height={900}
                ref={canvasRef}
                onMouseDown={onCanvasMouseDown}
            />
        </div>
    );
});
