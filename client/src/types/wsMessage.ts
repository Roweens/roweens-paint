export enum MessageMethod {
    CONNECTION = 'connection',
    DRAW = 'draw',
    UNDO = 'undo',
    REDO = 'redo',
}

export enum FigureType {
    BRUSH = 'brush',
    RECTANGLE = 'rect',
    CIRCLE = 'circle',
    LINE = 'line',
    ERASER = 'eraser',
    FINISH = 'finish',
}

interface StrokeFigure {
    stroke: string;
}

interface DefaultFigure {
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}
interface BrushFigure extends DefaultFigure, StrokeFigure {
    type: FigureType.BRUSH;
}

interface EraserFigure extends DefaultFigure {
    type: FigureType.ERASER;
}

interface LineFigure extends DefaultFigure, StrokeFigure {
    type: FigureType.LINE;
    startX: number;
    startY: number;
}

interface RectFigure extends DefaultFigure, StrokeFigure {
    type: FigureType.RECTANGLE;
    width: number;
    height: number;
}

interface CircleFigure extends DefaultFigure, StrokeFigure {
    type: FigureType.CIRCLE;
    radius: number;
}

interface FinishFigure {
    type: FigureType.FINISH;
}

type Figure =
    | BrushFigure
    | RectFigure
    | FinishFigure
    | CircleFigure
    | LineFigure
    | EraserFigure;

interface DefaultMessage {
    id: string;
    method: MessageMethod;
}

interface ConnectionMessage extends DefaultMessage {
    method: MessageMethod.CONNECTION;
    username: string;
}

export interface DrawMessage extends DefaultMessage {
    method: MessageMethod.DRAW;
    figure: Figure;
}

export interface UndoRedoMessage extends DefaultMessage {
    method: MessageMethod.UNDO | MessageMethod.REDO;
    dataUrl: string;
    redoList: string[];
    undoList: string[];
}

export type wsMessage = ConnectionMessage | DrawMessage | UndoRedoMessage;
