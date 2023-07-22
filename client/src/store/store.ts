import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CanvasSlice, createCanvasSlice } from './canvasSlice';
import { ToolSlice, createToolSlice } from './toolSlice';
import { UserSlice, createUserSlice } from './userSlice';

export const useBoundStore = create<CanvasSlice & ToolSlice & UserSlice>()(
    devtools(
        (...a) => ({
            ...createCanvasSlice(...a),
            ...createToolSlice(...a),
            ...createUserSlice(...a),
        }),
        {},
    ),
);
