import { CSSProperties, memo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useBoundStore } from 'store/store';
import { useParams } from 'react-router-dom';
import { useWebsocket } from 'hooks/useWebsocket';
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
    const setUndoList = useBoundStore((state) => state.setUndoList);

    useEffect(() => {
        setCanvas(canvasRef.current);
    }, [setCanvas]);

    const onCanvasMouseDown = useCallback(() => {
        setUndoList(canvasRef.current?.toDataURL() as string);
    }, [setUndoList]);

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
