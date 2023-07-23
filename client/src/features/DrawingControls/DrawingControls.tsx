import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { ColorPicker } from 'features/ColorPicker/ColorPicker';
import { InputNumber, Space } from 'antd';
import { useBoundStore } from 'store/store';
import { Color } from 'antd/es/color-picker';
import { useDebounce } from 'hooks/useDebounce';
import cls from './DrawingControls.module.scss';

interface DrawingControlsProps {
    className?: string;
}

export const DrawingControls = memo((props: DrawingControlsProps) => {
    const { className } = props;

    const setLineWidth = useBoundStore((state) => state.setLineWidth);
    const setStrokeColor = useBoundStore((state) => state.setStrokeColor);
    const setFillColor = useBoundStore((state) => state.setFillColor);

    const onLineWidthChange = useCallback(
        (value: number | null) => {
            if (value) {
                setLineWidth(value);
            }
        },
        [setLineWidth],
    );

    const onStrokeColorChange = useCallback(
        (value: Color, hex: string) => {
            if (value) {
                setStrokeColor(hex);
            }
        },
        [setStrokeColor],
    );

    const onFillColorChange = useCallback(
        (value: Color, hex: string) => {
            if (value) {
                setFillColor(hex);
            }
        },
        [setFillColor],
    );

    const debouncedOnStrokeColorChange = useDebounce(onStrokeColorChange, 100);
    const debouncedOnFillColorChange = useDebounce(onFillColorChange, 100);

    return (
        <Space className={classNames(cls.drawingControls, {}, [className])}>
            <InputNumber<number>
                addonBefore="Толщина линии"
                min={1}
                max={50}
                defaultValue={1}
                onChange={onLineWidthChange}
            />
            <ColorPicker
                text="Цвет обводки"
                onChange={debouncedOnStrokeColorChange}
                defaultValue="black"
            />
            <ColorPicker
                text="Цвет заливки"
                onChange={debouncedOnFillColorChange}
                defaultValue="black"
            />
        </Space>
    );
});
