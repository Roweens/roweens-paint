import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from './RouteConfig';

export const AppRouter = memo(() => (
    <Routes>
        {Object.values(RouteConfig).map((route) => (
            <Route path={route.path} key={route.path} element={route.element} />
        ))}
    </Routes>
));
