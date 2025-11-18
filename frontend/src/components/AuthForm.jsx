import { useEffect, useState } from 'react';

const AuthForm = ({ mode = 'login', onSubmit, isLoading, error }) => {
  const isRegister = mode === 'register';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  }, [mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = isRegister ? formData : { email: formData.email, password: formData.password };
    onSubmit(payload);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <header>
        <p className="eyebrow">{isRegister ? 'Create store console' : 'Welcome back to DukanDar'}</p>
        <h2>
          {isRegister
            ? 'Launch your smart Kirana POS in minutes'
            : 'Sign in to manage billing & stock'}
        </h2>
      </header>

      {isRegister && (
        <label className="field">
          <span>Store owner name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            autoComplete="name"
            required
          />
        </label>
      )}
      <label className="field">
          <span>Business email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jane@company.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          minLength={6}
          required
        />
      </label>
      {error && (
        <p className="error" role="status" aria-live="polite">
          {error}
        </p>
      )}
      <button type="submit" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? 'Please wait…' : isRegister ? 'Sign up' : 'Sign in'}
      </button>
    </form>
  );
};

export default AuthForm;

