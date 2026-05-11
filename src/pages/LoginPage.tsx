import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { Brain, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #e8f4f8 30%, #dff6f0 70%, #e0f2fe 100%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <Brain size={52} color="#2563eb" />
        <span style={{ fontSize: '42px', fontWeight: 800, color: '#1e293b' }}>DocBrain</span>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          padding: '48px 40px',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: 600, color: '#475569', marginBottom: '36px' }}>
          Sign In
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address *"
              required
              style={{
                width: '100%',
                padding: '16px 18px',
                border: '1.5px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password *"
              required
              style={{
                width: '100%',
                padding: '16px 50px 16px 18px',
                border: '1.5px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: '#fff',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9ca3af',
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <p style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', marginBottom: '16px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', marginTop: '28px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
