import { Navigate } from 'react-router-dom';
import { type ReactElement } from 'react';
import { AUTH_TOKEN_KEY, USER_ROLE } from '../../services/apiConfig';
import { RoleUsuario } from '../../enums/roleUsuario';

interface ProtectedRouteProps {
    element: ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN_KEY);

    return isAuthenticated ? element : <Navigate to="/login" />;
};

const AdminProtectedRoute = ({ element }: ProtectedRouteProps) => {
    const isAuthenticated = !!localStorage.getItem(AUTH_TOKEN_KEY) && localStorage.getItem(USER_ROLE) === RoleUsuario.ADMINISTRADOR;

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export { ProtectedRoute, AdminProtectedRoute };