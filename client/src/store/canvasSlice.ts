import { StateCreator } from 'zustand';

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
    setUndoList: (data: string) => void;
    setRedoList: (data: string) => void;
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
    setUndoList: (data) =>
        set((state) => ({ undoList: [...state.undoList, data] })),
    setRedoList: (data) =>
        set((state) => ({ redoList: [...state.redoList, data] })),
    undo: () => {
        const { undoList, canvas } = get();
        let ctx = canvas?.getContext('2d');

        if (undoList.length > 0 && canvas) {
            let dataUrl = undoList.pop();
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
        const { redoList, canvas } = get();
        let ctx = canvas?.getContext('2d');

        if (redoList.length > 0 && canvas) {
            let dataUrl = redoList.pop();
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
