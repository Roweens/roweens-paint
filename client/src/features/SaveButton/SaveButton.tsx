import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as SaveIcon } from 'assets/save.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';

interface SaveButtonProps {
    className?: string;
}

export const SaveButton = memo((props: SaveButtonProps) => {
    const { className } = props;

    const canvas = useBoundStore((state) => state.canvas);
    const sessionId = useBoundStore((state) => state.sessionId);

    const onDownloadHandle = useCallback(() => {
        const dataUrl = canvas?.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl as string;
        a.download = `${sessionId}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, [canvas, sessionId]);

    return (
        <Tooltip title="Сохранить на ПК">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                onClick={onDownloadHandle}
            >
                <AppIcon Svg={SaveIcon} stroke size="40px" />
            </Button>
        </Tooltip>
    );
});
