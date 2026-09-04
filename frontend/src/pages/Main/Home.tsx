import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import vetHeroImg from "../../assets/vet_hero.png";
import { authService } from "../../services/authService";
import { getAccessToken, getUserData } from "../../services/apiConfig";
import { homeService } from "../../services/homeService";
import styles from "./Home.module.css";
import { RoleUsuario } from "../../enums/roleUsuario";

function Home() {
    const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
    const [isAuthenticated] = useState(() => {
        const token = getAccessToken();
        return !!(token && authService.checkTokenExpiry());
    });

    const [user] = useState(() => getUserData());

    useEffect(() => {
        let isMounted = true;

        homeService.verificarApi()
            .then(() => {
                if (isMounted) setApiStatus('online');
            })
            .catch(() => {
                if (isMounted) setApiStatus('offline');
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className={styles.homeContainer}>
            <NavBar />

            <main className={styles.homeMain}>
                {!isAuthenticated ? (
                    /* ==========================================================================
                       DESLOGADO: PORTAL DE ACESSO INTERNO DA CLÍNICA VETERINÁRIA
                       ========================================================================== */
                    <>
                        <section className={styles.unauthHero}>
                            <div className={styles.heroContent}>
                                <span className={styles.unauthBadge}>
                                    🔒 Sistema de Gestão Interna
                                </span>
                                <h1 className={styles.unauthTitle}>
                                    Portal Restrito da <span className={styles.unauthTitleHighlight}>Clínica Veterinária</span>
                                </h1>
                                <p className={styles.unauthDescription}>
                                    Acesso exclusivo para médicos veterinários, atendentes e administradores credenciados. Faça login com suas credenciais institucionais para acessar o controle de estoque e medicamentos.
                                </p>
                                <div className={styles.unauthActions}>
                                    <Link to="/login" className={styles.loginCtaButton}>
                                        🔑 Acessar o Sistema
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.unauthImageWrapper}>
                                <img
                                    src={vetHeroImg}
                                    alt="Ambiente interno da clínica veterinária"
                                    className={styles.unauthImage}
                                />
                            </div>
                        </section>

                        <section className={styles.noticeBox}>
                            <h3 className={styles.noticeTitle}>📌 Comunicado Interno da TI</h3>
                            <p className={styles.noticeText}>
                                Por razões de segurança e em conformidade com as normas sanitárias, todas as entradas e saídas de medicamentos e insumos clínicos devem ser registradas com a conta do profissional responsável. Em caso de dúvidas ou recuperação de senha, contate a administração.
                            </p>
                        </section>
                    </>
                ) : (
                    /* ==========================================================================
                       LOGADO: PAINEL DE CONTROLE DO COLABORADOR / DASHBOARD INTERNO
                       ========================================================================== */
                    <>
                        <section className={styles.dashboardHeader}>
                            <div className={styles.welcomeWrapper}>
                                <span className={styles.systemBadge}>Painel do Colaborador</span>
                                <h1 className={styles.welcomeTitle}>
                                    Olá, {user.nome || 'Colaborador'}!
                                    {user.role && (
                                        <span className={styles.userRoleBadge}>{user.role}</span>
                                    )}
                                </h1>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', opacity: 0.8 }}>
                                    Gerencie o estoque de medicamentos, movimentações diárias e equipe da clínica.
                                </p>
                            </div>

                            <div className={styles.quickActionsGroup}>
                                <Link to="/produtos/novo" className={styles.quickActionButton}>
                                    + Criar Produto
                                </Link>
                                <Link to="/movimentacoes/novo" className={styles.quickActionButtonSecondary}>
                                    + Nova Movimentação
                                </Link>
                                {user.role === RoleUsuario.ADMINISTRADOR && (
                                    <Link to="/usuarios/novo" className={styles.quickActionButtonSecondary}>
                                        + Criar Usuário
                                    </Link>
                                )}
                            </div>
                        </section>

                        {/* Módulos Internos */}
                        <section className={styles.dashboardGrid}>
                            <div className={styles.dashboardCard}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>Produtos & Insumos</h2>
                                    <div className={styles.cardIcon}>📦</div>
                                </div>
                                <p className={styles.cardDescription}>
                                    Consulte o catálogo de vacinas, remédios e rações. Monitore quantitativo e estoque mínimo.
                                </p>
                                <Link to="/produtos" className={styles.cardFooterLink}>
                                    Acessar Produtos →
                                </Link>
                            </div>

                            <div className={styles.dashboardCard}>
                                <div className={styles.cardHeader}>
                                    <h2 className={styles.cardTitle}>Movimentações de Estoque</h2>
                                    <div className={styles.cardIcon}>🔄</div>
                                </div>
                                <p className={styles.cardDescription}>
                                    Registre relatórios de entrada e saída com rastreio por responsável e data de lançamento.
                                </p>
                                <Link to="/movimentacoes" className={styles.cardFooterLink}>
                                    Acessar Movimentações →
                                </Link>
                            </div>

                            {user.role === RoleUsuario.ADMINISTRADOR && (
                                <div className={styles.dashboardCard}>
                                    <div className={styles.cardHeader}>
                                        <h2 className={styles.cardTitle}>Gestão de Usuários</h2>
                                        <div className={styles.cardIcon}>👥</div>
                                    </div>
                                    <p className={styles.cardDescription}>
                                        Administre a lista de colaboradores, altere permissões de acesso e cadastre novos profissionais.
                                    </p>
                                    <Link to="/usuarios" className={styles.cardFooterLink}>
                                        Acessar Usuários →
                                    </Link>
                                </div>
                            )}
                        </section>

                    </>
                )}

                <section className={styles.statusBar}>
                    <div className={styles.statusItem}>
                        <span className={`${styles.statusIndicator} ${styles[apiStatus]}`}></span>
                        {apiStatus === 'checking' && 'Verificando servidor interno...'}
                        {apiStatus === 'online' && 'Servidor Interno Operacional'}
                        {apiStatus === 'offline' && 'Servidor Interno Indisponível'}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Home;