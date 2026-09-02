import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook de navegação
import { DynamicForm } from '../../components/Forms/DynamicForm';
import { loginSchema, loginFields, type LoginFormData } from '../../schemas/authSchema';
import { authService } from '../../services/authService';
import { ApiError } from '../../services/apiClient';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

export function LoginPage() {
    const navigate = useNavigate(); // 2. Inicialize o hook
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (data: LoginFormData) => {
        setLoginError('');

        try {
            await authService.login({
                email: data.email,
                senha: data.password,
            });

            navigate('/');
        } catch (error) {
            if (error instanceof ApiError && [401, 403].includes(error.status)) {
                setLoginError('E-mail ou senha inválidos.');
            } else if (error instanceof ApiError && error.status === 0) {
                setLoginError(`Não foi possível conectar com o servidor. Tente novamente mais tarde. ${error}`);
            } else {
                setLoginError('Ocorreu um erro no servidor. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <>
        <NavBar />
        <div className="login-wrapper">
            <h2>Acessar Conta</h2>
            {loginError && <p className="error-message" role="alert">{loginError}</p>}
            <DynamicForm
                schema={loginSchema}
                fields={loginFields}
                onSubmit={handleLogin}
                submitText="Entrar"
                className="login-form-custom"
                fieldClassName="input-wrapper"
                submitButtonClassName="btn-login"
            >
                <div className="login-options">
                    <a href="/recuperar-senha">Esqueceu a senha?</a>
                </div>
            </DynamicForm>
        </div>
        <Footer />
        </>
    );
}