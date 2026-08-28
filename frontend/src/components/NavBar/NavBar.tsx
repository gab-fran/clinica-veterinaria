import { type JSX, useState } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import logoImg from "../../assets/logo.svg";
import { authService } from "../../services/authService";

function NavBar(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && authService.checkTokenExpiry());
    });

    const [email] = useState(() => localStorage.getItem('email') ?? '');

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    const items: MenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', url: "/" },
        { label: 'Paciente', icon: 'pi pi-users', url: "/" },
        { label: 'Médico', icon: 'pi pi-user-plus', url: "/" },
        { label: 'Consulta', icon: 'pi pi-calendar', url: "/" }
    ];

    // Logo encapsulada para o lado esquerdo
    const startSection = (
        <div>
            <img alt="MedFlow Logo" src={logoImg} />
        </div>
    );

    // Seção de usuário para o lado direito
    const endSection = (
        <div>
            {isAuthenticated ? (
                <>
                    <div>
                        <span>Olá,</span>
                        <span>{email}</span>
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