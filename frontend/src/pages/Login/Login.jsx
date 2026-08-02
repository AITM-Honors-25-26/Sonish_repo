import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import VaultDial from '../../components/VaultDial.jsx';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFieldErrors({});
    setSubmitting(true);

    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      const res = err.response?.data;
      if (res?.errors) {
        const mapped = {};
        res.errors.forEach((error) => {
          mapped[error.field] = error.message;
        });
        setFieldErrors(mapped);
      } else {
        setFormError(res?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <div className="brand-mark">
          <span className="dot" />
          VAULT
        </div>
        <VaultDial status="LOCKED" />
        <div className="brand-copy">
          <h1>Access requires verification.</h1>
          <p>Sign in with your registered credentials to reach your account.</p>
        </div>
      </div>

      <div className="auth-form-panel">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card-header">
            <span className="eyebrow">SIGN IN</span>
            <h2>Welcome back</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          {formError && <div className="form-banner">{formError}</div>}

          <div className="field">
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
          </div>

          <div className="field">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'VERIFYING…' : 'UNLOCK ACCOUNT'}
          </button>

          <div className="auth-switch">
            No account yet? <Link to="/register">Create one</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
