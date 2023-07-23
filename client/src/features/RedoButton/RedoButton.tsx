import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as RedoIcon } from 'assets/redo.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';

interface RedoButtonProps {
    className?: string;
}

export const RedoButton = memo((props: RedoButtonProps) => {
    const { className } = props;

    const redoList = useBoundStore((state) => state.redoList);
    const isListEmpty = Boolean(!redoList.length);
    const redo = useBoundStore((state) => state.redo);
    const undoList = useBoundStore((state) => state.undoList);

    const onRedoHandle = useCallback(() => {
        redo();
    }, [redo]);

    return (
        <Tooltip title="Вернуть действие">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                disabled={isListEmpty}
                onClick={onRedoHandle}
            >
                <AppIcon
                    Svg={RedoIcon}
                    stroke
                    size="50px"
                    disabled={isListEmpty}
                />
            </Button>
        </Tooltip>
    );
});
