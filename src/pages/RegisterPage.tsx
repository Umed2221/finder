import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, RegisterFormData } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    name: '',
    isEmployer: false
  });
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.name) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    if (formData.password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Пожалуйста, введите корректный email адрес');
      return;
    }
    
    // Validate password strength
    if (formData.password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(formData);
    } catch (err) {
      setError('Ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-64px-300px)]">
      <div className="container max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Account Type */}
              <div className="flex justify-center p-4 mb-4 border border-gray-200 rounded-lg">
                <label className="inline-flex items-center mr-6">
                  <input
                    type="checkbox"
                    name="isEmployer"
                    checked={!formData.isEmployer}
                    onChange={() => setFormData({...formData, isEmployer: false})}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Я ищу работу</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isEmployer"
                    checked={formData.isEmployer}
                    onChange={() => setFormData({...formData, isEmployer: true})}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Я работодатель</span>
                </label>
              </div>
              
              {/* Name */}
              <div>
                <label className="form-label">
                  {formData.isEmployer ? 'Название компании' : 'ФИО'}*
                </label>
                <input 
                  type="text" 
                  name="name"
                  className="form-input"
                  placeholder={formData.isEmployer ? 'ООО "Компания"' : 'Иванов Иван Иванович'}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Username */}
              <div>
                <label className="form-label">Логин*</label>
                <input 
                  type="text" 
                  name="username"
                  className="form-input"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Email */}
              <div>
                <label className="form-label">Email*</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input"
                  placeholder="example@mail.ru"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Password */}
              <div>
                <label className="form-label">Пароль*</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-input"
                  placeholder="Минимум 6 символов"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Confirm Password */}
              <div>
                <label className="form-label">Подтверждение пароля*</label>
                <input 
                  type="password" 
                  className="form-input"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Terms */}
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 mt-1 text-blue-600"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  Я согласен с <Link to="#" className="text-blue-600 hover:underline">Условиями использования</Link> и <Link to="#" className="text-blue-600 hover:underline">Политикой конфиденциальности</Link>
                </label>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-gray-600">
            Уже есть аккаунт? <Link to="/login" className="text-blue-600 hover:underline">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;