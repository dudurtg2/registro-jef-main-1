import './Entrada.css';


function Entrada() {
    return (
        <div className="entrada-wrapper">

            <div className="blur-quadrado"></div>
            <div className="entrada-gradient"></div>
            <div className="entrada-container">
                <div className="entrada-header">
                    <h1>Bem-vindo à Gym</h1>
                </div>
                <div className="entrada-content">
                    <p>Você logou com sucesso !</p>
                </div>
                <div className="entrada-footer">
                    <p>&copy; 2023 By The Dev's Awesome Happy.</p>
                </div>
            </div>
        </div>
    );
}

export default Entrada;