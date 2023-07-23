import { memo, useCallback } from 'react';
import classNames from 'classnames';
// import cls from './BrushButton.module.scss';
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

    const onBrushButtonClick = useCallback(() => {
        if (canvas && socket) {
            setTool(new Brush(canvas, socket, sessionId));
        }
    }, [canvas, sessionId, setTool, socket]);

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
