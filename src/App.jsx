import './App.css';
import Login from './components/login/login.jsx';
import { createTheme, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Logo from '../src/assets/GYM.png';
import Img from '../src/assets/BG.png';
import Register from './Register';
import Entrada from './components/Entrada/Entrada';
<Route path="/entrada" element={<Entrada />} />
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterAcco from './RegisterAcco.jsx'
import { Link } from "react-router-dom";

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
})

function Home() {
  return (
    <div className='tela'>
      <div className="gradient"></div>
      <div className='formulario'>
        <div className='img-lateral'>
          <img src={Img} />
        </div>
        <div className='body-form'>
          <div className='logo'>
            <img src={Logo} />
          </div>
          <ThemeProvider theme={theme}>
            <div className='login'>
              <div className='title-log'>
                <h3>Entrar</h3>
              </div>
              <div className="form-login">
                <Login />
              </div>
            </div>
            <div class="link" id="register">
                  <Link to="/register">Não tem conta? Cadastre-se!</Link>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerAcco" element={<RegisterAcco />} />
        <Route path="/Entrada" element={<Entrada />} />
      </Routes>
    </Router>
  );
}

export default App;
