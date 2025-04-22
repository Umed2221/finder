import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!email || !password) {
      setError('Пожалуйста, введите email и пароль');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password);
      // Redirect is handled in the login function
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ошибка при входе. Пожалуйста, проверьте ваши данные.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-64px-300px)]">
      <div className="container max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Вход в аккаунт</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input"
                  placeholder="example@mail.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {/* Password */}
              <div>
                <label className="form-label">Пароль</label>
                <input 
                  type="password" 
                  className="form-input"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Запомнить меня</span>
                </label>
                <Link to="#" className="text-sm text-blue-600 hover:underline">
                  Забыли пароль?
                </Link>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>
          
          {/* Quick Login Buttons */}
          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Или войти через</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                className="btn border border-gray-300 flex justify-center items-center space-x-2 py-2"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Google</span>
              </button>
              <button 
                type="button" 
                className="btn border border-gray-300 flex justify-center items-center space-x-2 py-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-600">
            Нет аккаунта? <Link to="/register" className="text-blue-600 hover:underline">Зарегистрироваться</Link>
          </div>
        </div>
        
        {/* Demo credentials for testing */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
          <p className="font-medium mb-1">Тестовые данные для входа:</p>
          <div className="space-y-1">
            <p><span className="font-medium">Соискатель:</span> user@example.com / anypassword</p>
            <p><span className="font-medium">Работодатель:</span> employer@example.com / anypassword</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;