import { StateCreator } from 'zustand';

export interface UserSlice {
    username: string;
    isAuth: boolean;
    socket: WebSocket | null;
    sessionId: string;
    setUsername: (username: string) => void;
    setIsAuth: (isAuth: boolean) => void;
    setSocket: (socket: WebSocket) => void;
    setSessionId: (sessionId: string) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
    set,
) => ({
    username: '',
    isAuth: false,
    socket: null,
    sessionId: '',
    setUsername: (username) => set(() => ({ username })),
    setIsAuth: (isAuth) => set(() => ({ isAuth })),
    setSocket: (socket) => set(() => ({ socket })),
    setSessionId: (sessionId) => set(() => ({ sessionId })),
});
