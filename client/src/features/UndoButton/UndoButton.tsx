import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as UndoIcon } from 'assets/undo.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';

interface UndoButtonProps {
    className?: string;
}

export const UndoButton = memo((props: UndoButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const undoList = useBoundStore((state) => state.undoList);
    const isListEmpty = Boolean(!undoList.length);
    const undo = useBoundStore((state) => state.undo);

    const onUndoHandle = useCallback(() => {
        undo();
    }, [undo]);

    return (
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            disabled={isListEmpty}
            onClick={onUndoHandle}
        >
            <AppIcon Svg={UndoIcon} stroke size="50px" disabled={isListEmpty} />
        </Button>
    );
});
