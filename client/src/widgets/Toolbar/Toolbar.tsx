import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { DrawingControls } from 'features/DrawingControls/DrawingControls';
import { Space } from 'antd';
import cls from './Toolbar.module.scss';

interface ToolbarProps {
    className?: string;
}

export const Toolbar = memo((props: ToolbarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Space className={classNames(cls.toolbar, {}, [className])}>
            <DrawingControls />
        </Space>
    );
});
