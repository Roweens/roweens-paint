import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as LineIcon } from 'assets/line.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Line from 'tools/Line';

interface LineButtonProps {
    className?: string;
}

export const LineButton = memo((props: LineButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);
    const socket = useBoundStore((state) => state.socket);
    const sessionId = useBoundStore((state) => state.sessionId);

    const onLineButtonClick = useCallback(() => {
        if (canvas && socket) {
            setTool(new Line(canvas, socket, sessionId));
        }
    }, [canvas, sessionId, setTool, socket]);

    return (
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            onClick={onLineButtonClick}
        >
            <AppIcon Svg={LineIcon} stroke size="50px" fill />
        </Button>
    );
});
