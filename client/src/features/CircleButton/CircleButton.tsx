import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as CircleIcon } from 'assets/circle.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Circle from 'tools/Circle';

interface CircleButtonProps {
    className?: string;
}

export const CircleButton = memo((props: CircleButtonProps) => {
    const { className } = props;

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);
    const socket = useBoundStore((state) => state.socket);
    const sessionId = useBoundStore((state) => state.sessionId);
    const setFillColor = useBoundStore((state) => state.setFillColor);
    const setStrokeColor = useBoundStore((state) => state.setStrokeColor);

    const onCircleButtonClick = useCallback(() => {
        if (canvas && socket) {
            setFillColor('black');
            setStrokeColor('black');
            setTool(new Circle(canvas, socket, sessionId));
        }
    }, [canvas, sessionId, setFillColor, setStrokeColor, setTool, socket]);

    return (
        <Tooltip title="Окружность">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                onClick={onCircleButtonClick}
            >
                <AppIcon Svg={CircleIcon} stroke size="50px" fill />
            </Button>
        </Tooltip>
    );
});
