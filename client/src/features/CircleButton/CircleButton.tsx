import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as CircleIcon } from 'assets/circle.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';
import Circle from 'tools/Circle';

interface CircleButtonProps {
    className?: string;
}

export const CircleButton = memo((props: CircleButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const canvas = useBoundStore((state) => state.canvas);
    const setTool = useBoundStore((state) => state.setTool);

    const onCircleButtonClick = useCallback(() => {
        if (canvas) {
            setTool(new Circle(canvas));
        }
    }, [canvas, setTool]);

    return (
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            onClick={onCircleButtonClick}
        >
            <AppIcon Svg={CircleIcon} stroke size="50px" fill />
        </Button>
    );
});
