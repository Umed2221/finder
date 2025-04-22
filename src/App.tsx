import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VacanciesPage from './pages/VacanciesPage';
import ResumesPage from './pages/ResumesPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/vacancies" element={<VacanciesPage />} />
                <Route path="/resumes" element={<ResumesPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;