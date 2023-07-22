import { CanvasPage } from 'pages/CanvasPage/CanvasPage';
import { Navigate, RouteProps } from 'react-router-dom';

enum AppRoutes {
    MAIN = 'main',
    ROOM = 'room',
}

const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ROOM]: '/room/',
};

export const RouteConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: (
            <>
                <CanvasPage />
                <Navigate to={`/room/f${(+new Date()).toString(16)}`} />
            </>
        ),
    },
    [AppRoutes.ROOM]: {
        path: `${RoutePath[AppRoutes.ROOM]}:id`,
        element: <CanvasPage />,
    },
};
