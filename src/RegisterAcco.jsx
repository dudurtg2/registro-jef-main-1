import { useState } from 'react';
import './RegisterAcco.css';
import { createTheme, ThemeProvider, Button } from '@mui/material';
import Logo from '../src/assets/GYM.png';
import { useNavigate, Link } from 'react-router-dom';
import RegisterAccoForm from './components/account/registeracco.jsx';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Swal from 'sweetalert2';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!emailValid) {
      setErroSenha('Por favor, insira um email válido!');
      return;
    }

    if (password !== confirmPassword) {
      setErroSenha('As senhas precisam ser iguais!');
      return;
    }

    // Salvar no localStorage
    const listaCadastro = JSON.parse(localStorage.getItem('listaCadastro')) || [];
    listaCadastro.push({ email, password });
    localStorage.setItem('listaCadastro', JSON.stringify(listaCadastro));

    Swal.fire({
      icon: 'success',
      title: 'Cadastrado com sucesso!',
      text: 'Sua conta foi registrada com sucesso!',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-button',
        icon: 'custom-swal-icon'
      }
    }).then(() => {
      navigate('/');
    });
  };

  const isFormValid = email !== '' && password !== '' && confirmPassword !== '';

  return (
    <div className='formulario'>
      <div className="gradient"></div>
      <div className='body-form'>
        <div className='logo'>
          <img src={Logo} alt="Logo" />
        </div>

        <div className="reg-body-form">
          <div className="title">
            <div className="title-icon">
              <Link to="/register" className="link"><KeyboardArrowLeftIcon /></Link>
            </div>
            <h3>Registre-se</h3>
          </div>

          <ThemeProvider theme={theme}>
            <RegisterAccoForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              setEmailValid={setEmailValid}
            />
            <div className='botao'>
              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: '20px' }}
                color='secundary'
                disabled={!isFormValid}
                onClick={handleRegister}
              >
                Finalizar Cadastro
              </Button>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default Register;