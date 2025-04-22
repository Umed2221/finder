import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData, Resume, Vacancy } from '../context/DataContext';
import { User, BookOpen, FileText, Bell, Settings, Plus, Edit, Trash2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { vacancies, resumes, addVacancy, addResume } = useData();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Filter vacancies and resumes that belong to the user
  const userVacancies = vacancies.filter(v => v.employerId === user.id);
  const userResumes = resumes.filter(r => r.userId === user.id);

  // Determine if user is employer
  const isEmployer = user.isEmployer;

  return (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-64px-300px)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-blue-600 text-white">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-center">{user.name}</h2>
                <p className="text-center text-blue-100 mt-1">{isEmployer ? 'Работодатель' : 'Соискатель'}</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button 
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <User className="h-5 w-5" />
                      <span>Профиль</span>
                    </button>
                  </li>
                  {isEmployer ? (
                    <li>
                      <button 
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${activeTab === 'vacancies' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('vacancies')}
                      >
                        <BookOpen className="h-5 w-5" />
                        <span>Мои вакансии</span>
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button 
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${activeTab === 'resumes' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('resumes')}
                      >
                        <FileText className="h-5 w-5" />
                        <span>Мои резюме</span>
                      </button>
                    </li>
                  )}
                  <li>
                    <button 
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <Bell className="h-5 w-5" />
                      <span>Уведомления</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Настройки</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Профиль</h1>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Основная информация</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Имя пользователя</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={user.username}
                            disabled
                          />
                        </div>
                        <div>
                          <label className="form-label">Email</label>
                          <input 
                            type="email" 
                            className="form-input" 
                            value={user.email}
                            disabled
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="form-label">ФИО / Название компании</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={user.name}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Статистика</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-500 text-sm">Просмотры профиля</p>
                          <p className="text-2xl font-semibold mt-1">28</p>
                        </div>
                        {isEmployer ? (
                          <>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-500 text-sm">Опубликовано вакансий</p>
                              <p className="text-2xl font-semibold mt-1">{userVacancies.length}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-500 text-sm">Отклики</p>
                              <p className="text-2xl font-semibold mt-1">12</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-500 text-sm">Отправлено откликов</p>
                              <p className="text-2xl font-semibold mt-1">5</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-gray-500 text-sm">Приглашения</p>
                              <p className="text-2xl font-semibold mt-1">3</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Последняя активность</h2>
                      <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                          <p className="font-medium">Обновлен профиль</p>
                          <p className="text-gray-500 text-sm">2 часа назад</p>
                        </div>
                        {isEmployer ? (
                          <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <p className="font-medium">Опубликована новая вакансия</p>
                            <p className="text-gray-500 text-sm">1 день назад</p>
                          </div>
                        ) : (
                          <div className="border-l-4 border-blue-500 pl-4 py-2">
                            <p className="font-medium">Отклик на вакансию "Frontend-разработчик"</p>
                            <p className="text-gray-500 text-sm">1 день назад</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Vacancies Tab (for employers) */}
              {activeTab === 'vacancies' && isEmployer && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Мои вакансии</h1>
                    <button className="btn btn-primary flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Создать вакансию</span>
                    </button>
                  </div>
                  
                  {userVacancies.length > 0 ? (
                    <div className="space-y-4">
                      {userVacancies.map((vacancy) => (
                        <div key={vacancy.id} className="card">
                          <div className="flex justify-between">
                            <h2 className="text-xl font-semibold mb-1">{vacancy.title}</h2>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-500 hover:text-blue-600">
                                <Edit className="h-5 w-5" />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-red-600">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 mb-2">
                            <span>{vacancy.location}</span>
                            <span className="mx-2">•</span>
                            <span>{vacancy.workType}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{vacancy.description.substring(0, 150)}...</p>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{vacancy.salary}</span>
                            <div className="flex space-x-2">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Откликов: 5
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Просмотров: 78
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 text-gray-500 text-sm">
                            Опубликовано: {vacancy.createdAt}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-4 text-gray-400">
                        <BookOpen className="h-16 w-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">У вас пока нет вакансий</h3>
                      <p className="text-gray-500 mb-4">Создайте первую вакансию, чтобы найти подходящих кандидатов</p>
                      <button className="btn btn-primary">
                        Создать вакансию
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Resumes Tab (for job seekers) */}
              {activeTab === 'resumes' && !isEmployer && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Мои резюме</h1>
                    <button className="btn btn-primary flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Создать резюме</span>
                    </button>
                  </div>
                  
                  {userResumes.length > 0 ? (
                    <div className="space-y-4">
                      {userResumes.map((resume) => (
                        <div key={resume.id} className="card">
                          <div className="flex justify-between">
                            <h2 className="text-xl font-semibold mb-1">{resume.title}</h2>
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-500 hover:text-blue-600">
                                <Edit className="h-5 w-5" />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-red-600">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 mb-2">
                            <span>{resume.location}</span>
                            <span className="mx-2">•</span>
                            <span>Опыт: {resume.experience}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{resume.about.substring(0, 150)}...</p>
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {resume.skills.slice(0, 5).map((skill, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                              {resume.skills.length > 5 && (
                                <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-full text-xs">
                                  +{resume.skills.length - 5}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{resume.salary}</span>
                            <div className="flex space-x-2">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Просмотров: 45
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 text-gray-500 text-sm">
                            Обновлено: {resume.createdAt}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-4 text-gray-400">
                        <FileText className="h-16 w-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">У вас пока нет резюме</h3>
                      <p className="text-gray-500 mb-4">Создайте резюме, чтобы работодатели могли вас найти</p>
                      <button className="btn btn-primary">
                        Создать резюме
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Уведомления</h1>
                  
                  {isEmployer ? (
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg flex items-start">
                        <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">Новый отклик на вакансию "Frontend-разработчик"</p>
                          <p className="text-gray-600 text-sm mt-1">
                            Иван Петров откликнулся на вашу вакансию. Просмотрите резюме и ответьте кандидату.
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <button className="btn btn-sm btn-primary">Просмотреть</button>
                            <button className="btn btn-sm btn-outline">Отметить прочитанным</button>
                          </div>
                          <p className="text-gray-400 text-xs mt-2">2 часа назад</p>
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg flex items-start bg-gray-50">
                        <div className="bg-gray-200 text-gray-600 rounded-full p-2 mr-3">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-gray-500">Заканчивается срок размещения вакансии</p>
                          <p className="text-gray-500 text-sm mt-1">
                            Через 3 дня истечет срок размещения вакансии "Java-разработчик". Продлите размещение, чтобы продолжить получать отклики.
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <button className="btn btn-sm btn-outline text-gray-500 border-gray-300">Продлить</button>
                          </div>
                          <p className="text-gray-400 text-xs mt-2">1 день назад</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg flex items-start">
                        <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">Приглашение на собеседование</p>
                          <p className="text-gray-600 text-sm mt-1">
                            Компания "ООО Технологии" пригласила вас на собеседование на должность "Frontend-разработчик".
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <button className="btn btn-sm btn-primary">Просмотреть</button>
                            <button className="btn btn-sm btn-outline">Отметить прочитанным</button>
                          </div>
                          <p className="text-gray-400 text-xs mt-2">3 часа назад</p>
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg flex items-start bg-gray-50">
                        <div className="bg-gray-200 text-gray-600 rounded-full p-2 mr-3">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-gray-500">Ваше резюме просмотрено</p>
                          <p className="text-gray-500 text-sm mt-1">
                            Компания "АО Финтех" просмотрела ваше резюме. Обновите информацию, чтобы повысить шансы на приглашение.
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <button className="btn btn-sm btn-outline text-gray-500 border-gray-300">Обновить резюме</button>
                          </div>
                          <p className="text-gray-400 text-xs mt-2">2 дня назад</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Настройки</h1>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Личные данные</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Имя пользователя</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            defaultValue={user.username}
                          />
                        </div>
                        <div>
                          <label className="form-label">Email</label>
                          <input 
                            type="email" 
                            className="form-input" 
                            defaultValue={user.email}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="form-label">ФИО / Название компании</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            defaultValue={user.name}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Изменить пароль</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="form-label">Текущий пароль</label>
                          <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Введите текущий пароль"
                          />
                        </div>
                        <div className="md:col-span-1"></div>
                        <div>
                          <label className="form-label">Новый пароль</label>
                          <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Введите новый пароль"
                          />
                        </div>
                        <div>
                          <label className="form-label">Подтверждение пароля</label>
                          <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Подтвердите новый пароль"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-3">Настройки уведомлений</h2>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          <span>Уведомления по email</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          <span>Уведомления о новых вакансиях</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          <span>Уведомления о просмотре профиля</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          <span>Уведомления о новых откликах</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <button className="btn btn-primary">
                        Сохранить изменения
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;