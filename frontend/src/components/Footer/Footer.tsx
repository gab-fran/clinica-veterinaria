import { type JSX } from "react";

function Footer(): JSX.Element {
    return (
        <footer>
            <div>
                <h2>MedFlow</h2>
                <p>Sistema de gestão para clínicas veterinárias.</p>
            </div>

            <p>&copy; {new Date().getFullYear()} MedFlow. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;