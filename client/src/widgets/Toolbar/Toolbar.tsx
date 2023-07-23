import { memo } from 'react';
import classNames from 'classnames';
import { DrawingControls } from 'features/DrawingControls/DrawingControls';
import { Space } from 'antd';
import cls from './ToolBar.module.scss';

interface ToolbarProps {
    className?: string;
}

export const Toolbar = memo((props: ToolbarProps) => {
    const { className } = props;

    return (
        <Space className={classNames(cls.toolbar, {}, [className])}>
            <DrawingControls />
        </Space>
    );
});
