import { type JSX } from "react";
import styles from "./Footer.module.css";

function Footer(): JSX.Element {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.footerBrand}>
                    <h2 className={styles.footerTitle}>Clinica veterinaria</h2>
                    <p className={styles.footerDescription}>Sistema de gestão para clínicas veterinárias.</p>
                </div>

                <p className={styles.footerCopyright}>
                    &copy; {new Date().getFullYear()} Clinica. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;