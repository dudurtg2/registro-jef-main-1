import { useState } from 'react';
import './Register.css';
import RegisterForm from './components/personal/registerform.jsx';
import { createTheme, ThemeProvider, Button } from '@mui/material';
import Logo from '../src/assets/GYM.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8800FF',
      light: '#AA4AFF',
      dark: '#480087',
      contrastText: '#242105',
    },
    button: {
      main: '#ffffff',
      light: '#8800FF',
      dark: '#C37FFF',
      contrastText: '#8800FF',
    },
    secundary: {
      main: '#8800FF',
      light: '#AA4AFF',
      dark: '#480087',
      contrastText: '#ffffff',
    },
  },
});

function Register() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const navigate = useNavigate();

  const isValidCPF = cpf.length === 14;
  const isValidTelefone = telefone.length === 15;
  const isFormFilled = nome.trim() !== '' && telefone !== '' && cpf !== '';

  const handleNext = () => {
    if (!isValidTelefone || !isValidCPF) {
      return;
    }

    navigate('/registerAcco');
  };

  return (
    <div className="formulario">
      <div className="gradient"></div>

      <div className="body-form">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="reg-body-form">
          <div className="title">
            <h3>Registre-se</h3>
          </div>

          <ThemeProvider theme={theme}>
            <div className="reg-form">
              <RegisterForm
                nome={nome}
                setNome={setNome}
                telefone={telefone}
                setTelefone={setTelefone}
                cpf={cpf}
                setCpf={setCpf}
              />

              <div className="botao">
                <Button 
                  variant="contained"
                  color="secundary"
                  fullWidth
                  sx={{ borderRadius: '20px' }}
                  onClick={handleNext}
                  disabled={!isFormFilled}
                >
                  Próximo
                </Button>
              </div>
              
              <div className="link">
                <Link to="/">Já tenho conta!</Link>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Register;
