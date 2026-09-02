import { type JSX } from "react";

function Footer(): JSX.Element {
    return (
        <footer>
            <div>
                <h2>Clinica veterinaria</h2>
                <p>Sistema de gestão para clínicas veterinárias.</p>
            </div>

            <p>&copy; {new Date().getFullYear()} Clinica. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;