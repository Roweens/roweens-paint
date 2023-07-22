import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as RedoIcon } from 'assets/redo.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';
import { useBoundStore } from 'store/store';

interface RedoButtonProps {
    className?: string;
}

export const RedoButton = memo((props: RedoButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const redoList = useBoundStore((state) => state.redoList);
    const isListEmpty = Boolean(!redoList.length);
    const redo = useBoundStore((state) => state.redo);
    const undoList = useBoundStore((state) => state.undoList);

    const onRedoHandle = useCallback(() => {
        redo();
    }, [redo]);

    return (
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
            disabled={isListEmpty}
            onClick={onRedoHandle}
        >
            <AppIcon Svg={RedoIcon} stroke size="50px" disabled={isListEmpty} />
        </Button>
    );
});
