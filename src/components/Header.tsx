import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Briefcase, FileText, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">РаботаПоиск</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Главная
            </Link>
            <Link 
              to="/vacancies" 
              className={`font-medium ${isActive('/vacancies') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Вакансии
            </Link>
            <Link 
              to="/resumes" 
              className={`font-medium ${isActive('/resumes') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Резюме
            </Link>
          </nav>

          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="btn btn-outline flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Личный кабинет</span>
                </Link>
                <button onClick={logout} className="text-gray-700 hover:text-blue-600 font-medium">
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                  Войти
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Регистрация
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={closeMenu}
              >
                Главная
              </Link>
              <Link 
                to="/vacancies" 
                className={`font-medium ${isActive('/vacancies') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={closeMenu}
              >
                Вакансии
              </Link>
              <Link 
                to="/resumes" 
                className={`font-medium ${isActive('/resumes') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={closeMenu}
              >
                Резюме
              </Link>
              
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="block py-2 font-medium text-gray-700"
                      onClick={closeMenu}
                    >
                      Личный кабинет
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        closeMenu();
                      }} 
                      className="block py-2 font-medium text-gray-700"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block py-2 font-medium text-gray-700"
                      onClick={closeMenu}
                    >
                      Войти
                    </Link>
                    <Link 
                      to="/register" 
                      className="block py-2 font-medium text-blue-600"
                      onClick={closeMenu}
                    >
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;