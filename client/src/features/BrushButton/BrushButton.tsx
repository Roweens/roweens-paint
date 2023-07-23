import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
// import cls from './BrushButton.module.scss';
import { ReactComponent as BrushIcon } from 'assets/brush.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Brush from 'tools/Brush';

interface BrushButtonProps {
    className?: string;
}

export const BrushButton = memo((props: BrushButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

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
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            onClick={onBrushButtonClick}
        >
            <AppIcon Svg={BrushIcon} stroke size="50px" />
        </Button>
    );
});
