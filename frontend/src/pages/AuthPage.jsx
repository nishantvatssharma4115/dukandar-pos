import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const heroStats = [
  { value: '99.9%', label: 'Stock accuracy' },
  { value: '12s', label: 'Average bill time' },
  { value: '24/7', label: 'Sales visibility' }
];

const heroHighlights = [
  'Barcode-ready POS for every Kirana',
  'Real-time purchase & sales ledger',
  'WhatsApp-ready digital receipts'
];

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();
  const { login, register, isLoading, error, token, clearError } = useAuth();
  const isRegister = mode === 'register';

  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = (formData) => {
    if (isRegister) {
      register(formData);
    } else {
      login(formData);
    }
  };

  const handleModeChange = (nextMode) => {
    clearError();
    setMode(nextMode);
  };

  return (
    <main className="auth-page">
      <section className="auth-hero">
        <p className="eyebrow">DukanDar POS Suite</p>
        <h1>Smart billing, inventory & credit tracking for Kirana stores.</h1>
        <p className="lead">
          DukanDar keeps shelves stocked, queues moving, and ledgers reconciled. Generate GST-ready
          invoices, monitor expiry risk, and sync walk-in plus UPI sales from one live dashboard.
        </p>
        <ul className="hero-highlights">
          {heroHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="auth-panel card">
        <div className="switcher">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => handleModeChange('login')} type="button">
            Login
          </button>
          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => handleModeChange('register')}
            type="button"
          >
            Register
          </button>
        </div>
        <AuthForm mode={mode} onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        <p className="helper-text">
          By continuing, you agree to the <span>Field Operations Policy</span> and{' '}
          <span>Data Privacy Charter</span>.
        </p>
      </section>
    </main>
  );
};

export default AuthPage;

