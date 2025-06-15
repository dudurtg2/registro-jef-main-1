import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../login/login.css';

export default function RegisterFormFull() {
  const [form, setForm] = React.useState({
    nome: '',
    telefone: '',
    cpf: '',
    email: '',
    confirmEmail: '',
    senha: '',
    confirmarSenha: '',
  });

  const [errors, setErrors] = React.useState({
    nome: '',
    telefone: '',
    cpf: '',
    email: '',
    confirmEmail: '',
    senha: '',
    confirmarSenha: '',
  });

  const [success, setSuccess] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formatCPF = value =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);

  const formatTelefone = value =>
    value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);

  // Nova função pra validar CPF com dígitos verificadores
  const validateCPF = cpf => {
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(clean.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(clean.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(clean.charAt(10));
  };

  const handleChange = (field, value) => {
    let val = value;
    if (field === 'cpf') val = formatCPF(value);
    if (field === 'telefone') val = formatTelefone(value);

    setForm(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleBlur = field => {
    setErrors(prev => {
      const e = { ...prev };
      const v = form[field].trim();

      switch (field) {
        case 'nome':
          e.nome = v === '' ? 'Campo obrigatório' : '';
          break;

        case 'telefone': {
          const digits = form.telefone.replace(/\D/g, '');
          e.telefone = digits.length < 11 ? 'Telefone inválido' : '';
          break;
        }

        case 'cpf': {
          e.cpf = validateCPF(form.cpf)
            ? ''
            : 'CPF inválido';
          break;
        }

        case 'email':
          if (v === '') e.email = 'Campo obrigatório';
          else if (!emailRegex.test(v)) e.email = 'Formato de e-mail inválido';
          else e.email = '';
          break;

        case 'confirmEmail':
          e.confirmEmail = form.confirmEmail.trim() === ''
            ? 'Campo obrigatório'
            : (form.confirmEmail !== form.email ? 'E-mails não coincidem' : '');
          break;

        case 'senha':
          e.senha = form.senha.length < 8 ? 'Mínimo 8 caracteres' : '';
          break;

        case 'confirmarSenha':
          if (form.confirmarSenha.trim() === '') e.confirmarSenha = 'Campo obrigatório';
          else if (form.confirmarSenha !== form.senha) e.confirmarSenha = 'Senhas não coincidem';
          else e.confirmarSenha = '';
          break;

        default:
      }

      return e;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    ['nome','telefone','cpf','email','confirmEmail','senha','confirmarSenha']
      .forEach(f => handleBlur(f));

    const hasErrors = Object.values(errors).some(err => err);
    if (!hasErrors) {
      console.log('Formulário válido:', form);
      setSuccess(true);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '300px' } }}
        noValidate
        className="title-sec dados-conta"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h4>Dados da Conta</h4>
        <TextField
          required id="nome" label="Nome"
          value={form.nome}
          onChange={e => handleChange('nome', e.target.value)}
          onBlur={() => handleBlur('nome')}
          error={!!errors.nome}
          helperText={errors.nome}
        />
        <TextField
          required id="telefone" label="Telefone"
          value={form.telefone}
          onChange={e => handleChange('telefone', e.target.value)}
          onBlur={() => handleBlur('telefone')}
          error={!!errors.telefone}
          helperText={errors.telefone}
        />
        <TextField
          required id="cpf" label="CPF"
          value={form.cpf}
          onChange={e => handleChange('cpf', e.target.value)}
          onBlur={() => handleBlur('cpf')}
          error={!!errors.cpf}
          helperText={errors.cpf}
        />
        <TextField
          required id="email" label="Email"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          required id="confirmar_email" label="Repita o Email"
          value={form.confirmEmail}
          onChange={e => handleChange('confirmEmail', e.target.value)}
          onBlur={() => handleBlur('confirmEmail')}
          error={!!errors.confirmEmail}
          helperText={errors.confirmEmail}
        />
        <TextField
          required id="senha" type="password" label="Senha"
          value={form.senha}
          onChange={e => handleChange('senha', e.target.value)}
          onBlur={() => handleBlur('senha')}
          error={!!errors.senha}
          helperText={errors.senha}
        />
        <TextField
          required id="confirmar_senha" type="password" label="Repita a Senha"
          value={form.confirmarSenha}
          onChange={e => handleChange('confirmarSenha', e.target.value)}
          onBlur={() => handleBlur('confirmarSenha')}
          error={!!errors.confirmarSenha}
          helperText={errors.confirmarSenha}
        />
        <Button id="botao_criar" type="submit" variant="contained" sx={{ m: 1 }}>
          Criar Conta
        </Button>
      </Box>

      <Snackbar
        id="snackbar_success"
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          id="alert_success"
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Conta criada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
