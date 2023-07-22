export enum MessageMethod {
    CONNECTION = 'connection',
    DRAW = 'draw',
}

export enum FigureType {
    BRUSH = 'brush',
    FINISH = 'finish',
}

interface Figure {
    type: FigureType;
    x: number;
    y: number;
}

export interface wsMessage {
    id: string;
    username?: string;
    method: MessageMethod;
    figure: Figure;
}
