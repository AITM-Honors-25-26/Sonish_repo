import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import VaultDial from '../../components/VaultDial.jsx';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await register(form);
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
        <VaultDial status="NEW ENTRY" />
        <div className="brand-copy">
          <h1>Provision a new set of credentials.</h1>
          <p>Your password is hashed before it ever touches the database.</p>
        </div>
      </div>

      <div className="auth-form-panel">
        <form className="auth-card" onSubmit={handleSubmit} noValidate>
          <div className="auth-card-header">
            <span className="eyebrow">CREATE ACCOUNT</span>
            <h2>Set up access</h2>
            <p>It takes less than a minute.</p>
          </div>

          {formError && <div className="form-banner">{formError}</div>}

          <div className="field">
            <label htmlFor="name">NAME</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
          </div>

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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {fieldErrors.password ? (
              <div className="field-error">{fieldErrors.password}</div>
            ) : (
              <div className="field-hint">At least 8 characters, with a letter and a number.</div>
            )}
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'PROVISIONING…' : 'CREATE ACCOUNT'}
          </button>

          <div className="auth-switch">
            Already have access? <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
