import { StateCreator } from 'zustand';
import { MessageMethod } from 'types/wsMessage';
import { useBoundStore } from './store';

// @ts-ignore
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export interface CanvasSlice {
    canvas: HTMLCanvasElement | null;
    undoList: string[];
    redoList: string[];
    setCanvas: (canvas: HTMLCanvasElement | null) => void;
    pushToUndoList: (data: string) => void;
    pushToRedoList: (data: string) => void;
    setUndoList: (data: string[]) => void;
    setRedoList: (data: string[]) => void;
    undo: () => void;
    redo: () => void;
}

export const createCanvasSlice: StateCreator<
    CanvasSlice,
    [],
    [],
    CanvasSlice
> = (set, get) => ({
    canvas: null,
    undoList: [],
    redoList: [],
    setCanvas: (canvas) => set(() => ({ canvas })),
    pushToUndoList: (data) =>
        set((state) => ({ undoList: [...state.undoList, data] })),
    pushToRedoList: (data) =>
        set((state) => ({ redoList: [...state.redoList, data] })),
    setUndoList: (data) =>
        set(() => ({
            undoList: data,
        })),
    setRedoList: (data) =>
        set(() => ({
            redoList: data,
        })),
    undo: () => {
        const { undoList, canvas, redoList } = get();
        let ctx = canvas?.getContext('2d');

        if (undoList.length > 0 && canvas) {
            let dataUrl = undoList.pop();

            const socket = useBoundStore.getState().socket;
            const sessionId = useBoundStore.getState().sessionId;

            socket?.send(
                JSON.stringify({
                    method: MessageMethod.UNDO,
                    id: sessionId,
                    dataUrl,
                    redoList: [...redoList, canvas.toDataURL()],
                    undoList: undoList.filter((url) => url !== dataUrl),
                }),
            );

            set((state) => ({
                undoList: state.undoList.filter((url) => url !== dataUrl),
            }));

            set((state) => ({
                redoList: [...state.redoList, canvas.toDataURL()],
            }));

            let img = new Image();
            img.src = dataUrl as string;
            img.onload = () => {
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
    },
    redo: () => {
        const { redoList, canvas, undoList } = get();
        let ctx = canvas?.getContext('2d');

        if (redoList.length > 0 && canvas) {
            let dataUrl = redoList.pop();

            const socket = useBoundStore.getState().socket;
            const sessionId = useBoundStore.getState().sessionId;

            socket?.send(
                JSON.stringify({
                    method: MessageMethod.REDO,
                    id: sessionId,
                    dataUrl,
                    redoList: redoList.filter((url) => url !== dataUrl),
                    undoList: [...undoList, canvas.toDataURL()],
                }),
            );

            set((state) => ({
                redoList: state.redoList.filter((url) => url !== dataUrl),
            }));

            set((state) => ({
                undoList: [...state.undoList, canvas.toDataURL()],
            }));

            let img = new Image();
            img.src = dataUrl as string;
            img.onload = () => {
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
    },
});
