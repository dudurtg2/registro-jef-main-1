import React, { useEffect, useState } from 'react';

function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [listaCadastro, setListaCadastro] = useState([]);

  useEffect(() => {
    const lista = localStorage.getItem('listaCadastro');
    if (lista) {
      setListaCadastro(JSON.parse(lista));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listaCadastro', JSON.stringify(listaCadastro));
  }, [listaCadastro]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListaCadastro([...listaCadastro, form]);
    setForm({ email: '', password: '' });
    alert('Cadastro salvo no localStorage!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default RegisterForm;