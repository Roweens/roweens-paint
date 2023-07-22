import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ReactComponent as SaveIcon } from 'assets/save.svg';
import { Button } from 'antd';
import { AppIcon } from 'components/AppIcon';

interface SaveButtonProps {
    className?: string;
}

export const SaveButton = memo((props: SaveButtonProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Button
            type="text"
            className={classNames('', {}, [className])}
            style={{ height: 'fit-content' }}
        >
            <AppIcon Svg={SaveIcon} stroke size="40px" />
        </Button>
    );
});
