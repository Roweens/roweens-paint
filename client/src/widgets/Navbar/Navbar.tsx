import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Typography, Col, Row } from 'antd';
import classNames from 'classnames';
import { BrushButton } from 'features/BrushButton/BrushButton';
import { SquareButton } from 'features/SquareButton/SquareButton';
import { LineButton } from 'features/LineButton/LineButton';
import { CircleButton } from 'features/CircleButton/CircleButton';
import { EraserButton } from 'features/EraserButton/EraserButton';
import { ColorPicker } from 'features/ColorPicker/ColorPicker';
import { SaveButton } from 'features/SaveButton/SaveButton';
import { UndoButton } from 'features/UndoButton/UndoButton';
import { RedoButton } from 'features/RedoButton/RedoButton';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const { Header } = Layout;
const { Title } = Typography;

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Header className={classNames(cls.navbar, {}, [className])}>
            <Row justify="space-between">
                <Col span={12}>
                    <Title level={1} className={cls.title}>
                        Roweens paint
                    </Title>
                    <BrushButton />
                    <SquareButton />
                    <LineButton />
                    <CircleButton />
                    <EraserButton />
                </Col>
                <Col span={12} className={cls.rightCol}>
                    <UndoButton />
                    <RedoButton />
                    <SaveButton />
                </Col>
            </Row>
        </Header>
    );
});
