import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as EraserIcon } from 'assets/eraser.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import Eraser from 'tools/Eraser';
import { useBoundStore } from 'store/store';

interface EraserButtonProps {
    className?: string;
}

export const EraserButton = memo((props: EraserButtonProps) => {
    const { className } = props;

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);
    const socket = useBoundStore((state) => state.socket);
    const sessionId = useBoundStore((state) => state.sessionId);

    const onEraserButtonClick = useCallback(() => {
        if (canvas && socket) {
            setTool(new Eraser(canvas, socket, sessionId));
        }
    }, [canvas, sessionId, setTool, socket]);

    return (
        <Tooltip title="Ластик">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                onClick={onEraserButtonClick}
            >
                <AppIcon Svg={EraserIcon} stroke size="50px" fill />
            </Button>
        </Tooltip>
    );
});
