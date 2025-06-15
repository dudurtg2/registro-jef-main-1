import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CustomThemeProvider from '../theme/CustomThemeProvider';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({ email: '', senha: '' });

  const emailRegex = /^\S+@\S+\.\S+$/;

  const handleLogin = () => {
    const newErrors = { email: '', senha: '' };

    if (email.trim() === '') {
      newErrors.email = 'Campo obrigatório';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Formato de e-mail inválido';
    }

    if (senha.trim() === '') {
      newErrors.senha = 'Campo obrigatório';
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.senha) return;

    onLogin();
  };

  return (
    <CustomThemeProvider>
      <Box
        component="form"
        sx={{
          // centraliza e define largura máxima
          maxWidth: 400,
          mx: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          // responsividade dos campos
          '& .MuiTextField-root': {
            my: 1,
            width: { xs: '100%', sm: '300px' },
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          label="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          required
          label="Senha"
          type="password"
          autoComplete="current-password"
          value={senha}
          onChange={e => {
            setSenha(e.target.value);
            if (errors.senha) setErrors(prev => ({ ...prev, senha: '' }));
          }}
          error={!!errors.senha}
          helperText={errors.senha}
        />

        <Box sx={{ width: { xs: '100%', sm: '300px' }, mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLogin}
            sx={{ borderRadius: '20px' }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </CustomThemeProvider>
  );
}
