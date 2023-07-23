import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as LineIcon } from 'assets/line.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Line from 'tools/Line';

interface LineButtonProps {
    className?: string;
}

export const LineButton = memo((props: LineButtonProps) => {
    const { className } = props;

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);
    const socket = useBoundStore((state) => state.socket);
    const sessionId = useBoundStore((state) => state.sessionId);
    const setFillColor = useBoundStore((state) => state.setFillColor);
    const setStrokeColor = useBoundStore((state) => state.setStrokeColor);

    const onLineButtonClick = useCallback(() => {
        if (canvas && socket) {
            setFillColor('black');
            setStrokeColor('black');
            setTool(new Line(canvas, socket, sessionId));
        }
    }, [canvas, sessionId, setFillColor, setStrokeColor, setTool, socket]);

    return (
        <Tooltip title="Линия">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                onClick={onLineButtonClick}
            >
                <AppIcon Svg={LineIcon} stroke size="50px" fill />
            </Button>
        </Tooltip>
    );
});
