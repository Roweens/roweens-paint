import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as SquareIcon } from 'assets/square.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Rectangle from 'tools/Rectangle';

interface SquareButtonProps {
    className?: string;
}

export const SquareButton = memo((props: SquareButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

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
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            onClick={onSquareButtonClick}
        >
            <AppIcon Svg={SquareIcon} stroke size="50px" />
        </Button>
    );
});
