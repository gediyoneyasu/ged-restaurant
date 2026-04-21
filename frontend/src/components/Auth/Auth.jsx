import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import axios from 'axios';
import './Auth.css';

const API_URL = 'http://localhost:5001/api';

function Auth() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        
        if (response.data.success) {
          localStorage.setItem('gedToken', response.data.token);
          localStorage.setItem('gedUser', JSON.stringify(response.data.user));
          navigate('/');
          window.location.reload();
        } else {
          setError(response.data.message || 'Login failed');
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError(language === 'en' ? 'Passwords do not match' : 'የይለፍ ቃሎች አይዛመዱም');
          setLoading(false);
          return;
        }
        
        const response = await axios.post(`${API_URL}/auth/register`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        
        if (response.data.success) {
          localStorage.setItem('gedToken', response.data.token);
          localStorage.setItem('gedUser', JSON.stringify(response.data.user));
          navigate('/');
          window.location.reload();
        } else {
          setError(response.data.message || 'Registration failed');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Something went wrong');
      } else if (err.request) {
        setError('Cannot connect to server. Make sure backend is running on port 5001');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" key={language}>
      <div className="auth-hero">
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p>{isLogin ? 'Login to continue ordering' : 'Sign up to start ordering'}</p>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={`tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
            <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>

          {error && <div className="error-message" style={{ background: '#fee', color: '#e74c3c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="input-group">
                  <i className="ri-user-line"></i>
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <i className="ri-phone-line"></i>
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                </div>
              </>
            )}
            
            <div className="input-group">
              <i className="ri-mail-line"></i>
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="input-group">
              <i className="ri-lock-line"></i>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </div>
            
            {!isLogin && (
              <div className="input-group">
                <i className="ri-lock-line"></i>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
            )}
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
