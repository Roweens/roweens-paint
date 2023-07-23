import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as SquareIcon } from 'assets/square.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Rectangle from 'tools/Rectangle';

interface SquareButtonProps {
    className?: string;
}

export const SquareButton = memo((props: SquareButtonProps) => {
    const { className } = props;

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);
    const socket = useBoundStore((state) => state.socket);
    const sessionId = useBoundStore((state) => state.sessionId);

    const onSquareButtonClick = useCallback(() => {
        if (canvas && socket) {
            setTool(new Rectangle(canvas, socket, sessionId));
        }
    }, [canvas, sessionId, setTool, socket]);

    return (
        <Tooltip title="Квадрат">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                onClick={onSquareButtonClick}
            >
                <AppIcon Svg={SquareIcon} stroke size="50px" />
            </Button>
        </Tooltip>
    );
});
