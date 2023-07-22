import { memo } from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import { Navbar } from 'widgets/Navbar/Navbar';
import { Toolbar } from 'widgets/Toolbar/Toolbar';
import { Canvas } from 'widgets/Canvas/Canvas';
import { LoginModal } from 'features/LoginModal/LoginModal';
import cls from './CanvasPage.module.scss';

const { Content } = Layout;

interface CanvasPageProps {
    className?: string;
}

export const CanvasPage = memo((props: CanvasPageProps) => {
    const { className } = props;

    return (
        <>
            <LoginModal />
            <Layout className={classNames(cls.canvasPage, {}, [className])}>
                <Navbar />
                <Toolbar />
                <Content>
                    <Canvas />
                </Content>
            </Layout>
        </>
    );
});
