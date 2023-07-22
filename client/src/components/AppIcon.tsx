import { CSSProperties, FunctionComponent, SVGProps, memo } from 'react';
import classNames from 'classnames';
import Icon from '@ant-design/icons';
import cls from './AppIcon.module.scss';

interface AppIconProps {
    className?: string;
    Svg: FunctionComponent<SVGProps<SVGSVGElement>>;
    fill?: boolean;
    stroke?: boolean;
    disabled?: boolean;
    size?: string;
}

export const AppIcon = memo((props: AppIconProps) => {
    const {
        className,
        Svg,
        size,
        fill = false,
        stroke = false,
        disabled = false,
    } = props;

    const iconMods: Record<string, boolean> = {
        [cls.stroke]: stroke,
        [cls.fill]: fill,
        [cls.disabled]: disabled,
    };

    const styles: CSSProperties = {
        fontSize: size || '30px',
    };

    return (
        <Icon
            className={classNames(cls.appIcon, iconMods, [className])}
            component={Svg}
            style={styles}
        />
    );
});
