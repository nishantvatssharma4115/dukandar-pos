import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { useAuth } from './context/AuthContext.jsx';

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? '/dashboard' : '/auth'} replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={token ? <DashboardPage /> : <Navigate to="/auth" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

