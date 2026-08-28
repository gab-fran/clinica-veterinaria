import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Home() {
    return (
        <div>
            <NavBar />
            <h1>Bem-vindo à página inicial</h1>
            <p>Este é o conteúdo da página inicial.</p>
            <Footer />
        </div>
    );
}

export default Home;