import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook de navegação
import { DynamicForm } from '../../components/DynamicForm/DynamicForm';
import { loginSchema, loginFields, type LoginFormData } from '../../schemas/authSchema';
import { authService } from '../../services/authService';
import { ApiError } from '../../services/apiClient';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import styles from './LoginPage.module.css';

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
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.loginMain}>
                <div className={styles.loginWrapper}>
                    <h2 className={styles.loginTitle}>Acessar Conta</h2>
                    {loginError && <p className={styles.errorMessage} role="alert">{loginError}</p>}
                    <DynamicForm
                        schema={loginSchema}
                        fields={loginFields}
                        onSubmit={handleLogin}
                        submitText="Entrar"
                        className={styles.loginFormCustom}
                        fieldClassName={styles.inputWrapper}
                        submitButtonClassName={styles.btnLogin}
                    >
                    </DynamicForm>
                </div>
            </main>
            <Footer />
        </div>
    );
}
