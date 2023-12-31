import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as BrushIcon } from 'assets/brush.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Brush from 'tools/Brush';

interface BrushButtonProps {
    className?: string;
}

export const BrushButton = memo((props: BrushButtonProps) => {
    const { className } = props;

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);
    const socket = useBoundStore((state) => state.socket);
    const sessionId = useBoundStore((state) => state.sessionId);
    const setFillColor = useBoundStore((state) => state.setFillColor);
    const setStrokeColor = useBoundStore((state) => state.setStrokeColor);

    const onBrushButtonClick = useCallback(() => {
        if (canvas && socket) {
            setTool(new Brush(canvas, socket, sessionId));
            setFillColor('black');
            setStrokeColor('black');
        }
    }, [canvas, sessionId, setFillColor, setStrokeColor, setTool, socket]);

    return (
        <Tooltip title="Кисть">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                onClick={onBrushButtonClick}
            >
                <AppIcon Svg={BrushIcon} stroke size="50px" />
            </Button>
        </Tooltip>
    );
});
