import { type JSX, useState } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import logoImg from "../../assets/logo.svg";
import { authService } from "../../services/authService";
import { getAccessToken, getUserData } from "../../services/apiConfig";

function NavBar(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = getAccessToken();
        return !!(token && authService.checkTokenExpiry());
    });

    const [user] = useState(() => getUserData() ?? '');

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    const items: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', url: "/" },
        { label: 'Produtos', icon: 'pi pi-box', url: "/produtos" },
        { label: 'Movimentações', icon: 'pi pi-calendar', url: "/movimentacoes" },
        ...(isAuthenticated && user.role === 'ADMINISTRADOR'
            ? [{ label: 'Usuário', icon: 'pi pi-user', url: "/usuarios" }]
            : [])
    ];

    // Logo encapsulada para o lado esquerdo
    const startSection = (
        <div>
            <img alt="Clinica veterinaria logo" src={logoImg} />
        </div>
    );

    // Seção de usuário para o lado direito
    const endSection = (
        <div>
            {isAuthenticated ? (
                <>
                    <div>
                        <span>Olá,</span>
                        <span>{user.nome}</span>
                    </div>
                    <button onClick={logout}>
                        <i>Sair</i>
                    </button>
                </>
            ) : (
                <a href="/login">Entrar</a>
            )}
        </div>
    );

    return (
        <header>
            <Menubar
                model={isAuthenticated ? items : [items[0]]}
                start={startSection}
                end={endSection}
            />
        </header>
    );
}

export default NavBar;