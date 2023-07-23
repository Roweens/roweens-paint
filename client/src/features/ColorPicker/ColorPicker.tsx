import { memo } from 'react';
import classNames from 'classnames';
import { ColorPicker as ColorPickerComponent } from 'antd';
import { Color } from 'antd/es/color-picker';

interface ColorPickerProps {
    className?: string;
    text?: string;
    onChange: (value: Color, hex: string) => void;
    defaultValue?: string | Color;
}

export const ColorPicker = memo((props: ColorPickerProps) => {
    const { className, text, onChange, defaultValue } = props;

    return (
        <ColorPickerComponent
            className={classNames('', {}, [className])}
            defaultValue={defaultValue}
            size="large"
            onChange={onChange}
            showText={
                text
                    ? (color) => (
                          <span>
                              {text} ({color.toHexString()})
                          </span>
                      )
                    : true
            }
        />
    );
});
