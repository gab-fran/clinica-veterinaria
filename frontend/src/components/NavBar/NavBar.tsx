import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import logoImg from "../../assets/logo.svg";
import { authService } from "../../services/authService";
import { getAccessToken, getUserData } from "../../services/apiConfig";
import styles from "./NavBar.module.css";
import { RoleUsuario } from "../../enums/roleUsuario";

function NavBar(): JSX.Element {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = getAccessToken();
        return !!(token && authService.checkTokenExpiry());
    });

    const [user] = useState(() => getUserData() ?? '');

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
    };

    const items: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', url: "/" },
        { label: 'Produtos', icon: 'pi pi-box', url: "/produtos" },
        { label: 'Movimentações', icon: 'pi pi-calendar', url: "/movimentacoes" },
        ...(isAuthenticated && user.role === RoleUsuario.ADMINISTRADOR
            ? [{ label: 'Usuário', icon: 'pi pi-user', url: "/usuarios" }]
            : [])
    ];

    // Logo encapsulada para o lado esquerdo
    const startSection = (
        <div className={styles.logoContainer}>
            <img alt="Clinica veterinaria logo" src={logoImg} className={styles.logoImage} />
        </div>
    );

    // Seção de usuário para o lado direito
    const endSection = (
        <div className={styles.userSection}>
            {isAuthenticated ? (
                <>
                    <div className={styles.userInfo}>
                        <span className={styles.greetingText}>Olá,</span>
                        <span className={styles.userName}>{user.nome}</span>
                    </div>
                    <button onClick={logout} className={styles.logoutButton}>
                        Sair
                    </button>
                </>
            ) : (
                <a href="/login" className={styles.loginLink}>Entrar</a>
            )}
        </div>
    );

    return (
        <header className={styles.headerContainer}>
            <Menubar
                model={isAuthenticated ? items : [items[0]]}
                start={startSection}
                end={endSection}
            />
        </header>
    );
}

export default NavBar;
