import Brush from 'tools/Brush';
import Circle from 'tools/Circle';
import Eraser from 'tools/Eraser';
import Rectangle from 'tools/Rectangle';
import { StateCreator } from 'zustand';

export type ToolType = Brush | Rectangle | Circle | Brush | Eraser;

export interface ToolSlice {
    tool: ToolType | null;
    setTool: (tool: ToolType) => void;
    setLineWidth: (width: number) => void;
    setStrokeColor: (color: string) => void;
    setFillColor: (color: string) => void;
}

export const createToolSlice: StateCreator<ToolSlice, [], [], ToolSlice> = (
    set,
    get,
) => ({
    tool: null,
    setTool: (tool: ToolType) => set(() => ({ tool })),
    setLineWidth: (width: number) => {
        const tool = get().tool;
        if (tool) {
            tool.lineWidth = width;
        }
    },
    setStrokeColor: (color: string) => {
        const tool = get().tool;
        if (tool) {
            tool.strokeColor = color;
        }
    },
    setFillColor: (color: string) => {
        const tool = get().tool;
        if (tool) {
            tool.fillColor = color;
        }
    },
});
