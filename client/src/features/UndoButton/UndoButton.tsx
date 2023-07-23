import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as UndoIcon } from 'assets/undo.svg';
import { Button, Tooltip } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';

interface UndoButtonProps {
    className?: string;
}

export const UndoButton = memo((props: UndoButtonProps) => {
    const { className } = props;

    const undoList = useBoundStore((state) => state.undoList);
    const isListEmpty = Boolean(!undoList.length);
    const undo = useBoundStore((state) => state.undo);

    const onUndoHandle = useCallback(() => {
        undo();
    }, [undo]);

    return (
        <Tooltip title="Отменить действие">
            <Button
                type="text"
                className={classNames('', {}, [className])}
                style={{ height: 'fit-content' }}
                disabled={isListEmpty}
                onClick={onUndoHandle}
            >
                <AppIcon
                    Svg={UndoIcon}
                    stroke
                    size="50px"
                    disabled={isListEmpty}
                />
            </Button>
        </Tooltip>
    );
});
