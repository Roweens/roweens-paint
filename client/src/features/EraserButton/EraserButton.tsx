import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as EraserIcon } from 'assets/eraser.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import Eraser from 'tools/Eraser';
import { useBoundStore } from 'store/store';

interface EraserButtonProps {
    className?: string;
}

export const EraserButton = memo((props: EraserButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);

    const onEraserButtonClick = useCallback(() => {
        if (canvas) {
            setTool(new Eraser(canvas));
        }
    }, [canvas, setTool]);

    return (
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            onClick={onEraserButtonClick}
        >
            <AppIcon Svg={EraserIcon} stroke size="50px" fill />
        </Button>
    );
});