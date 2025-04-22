import React from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, Award, Users, Briefcase, FileText, Star, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const HomePage: React.FC = () => {
  const { vacancies } = useData();
  
  
  const latestVacancies = [...vacancies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Найдите работу мечты или идеального сотрудника
            </h1>
            <p className="text-xl mb-10 text-blue-100">
              РаботаПоиск — это современная платформа для поиска работы и подбора персонала
            </p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mx-auto">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-grow relative">
                  <input 
                    type="text" 
                    placeholder="Должность, компания или ключевые слова" 
                    className="form-input pl-10 pr-4 py-3 rounded-md w-full"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-shrink-0">
                  <button className="btn btn-primary w-full md:w-auto py-3 px-6">
                    Найти
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                  IT-специалист
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                  Менеджер
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                  Удаленная работа
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm">
                  Маркетолог
                </span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
              <Link to="/vacancies" className="btn btn-primary py-3 px-6">
                Найти вакансии
              </Link>
              <Link to="/resumes" className="btn btn-outline bg-white/10 py-3 px-6">
                Поиск сотрудников
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Активных вакансий</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Компаний</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">25,000+</div>
              <div className="text-gray-600">Резюме</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1,000+</div>
              <div className="text-gray-600">Трудоустройств</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Как работает РаботаПоиск
            </h2>
            <p className="text-gray-600 text-lg">
              Мы разработали удобную платформу, которая помогает соискателям и работодателям найти друг друга
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Для соискателей</h3>
              <p className="text-gray-600 mb-4">
                Создайте профессиональное резюме и откликайтесь на интересующие вас вакансии.
              </p>
              <Link to="/register" className="text-blue-600 font-medium hover:text-blue-700">
                Создать резюме →
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Для работодателей</h3>
              <p className="text-gray-600 mb-4">
                Размещайте вакансии и находите подходящих кандидатов с помощью удобного поиска.
              </p>
              <Link to="/register" className="text-blue-600 font-medium hover:text-blue-700">
                Разместить вакансию →
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрый результат</h3>
              <p className="text-gray-600 mb-4">
                Наши алгоритмы помогают находить наиболее подходящие предложения для обеих сторон.
              </p>
              <Link to="/vacancies" className="text-blue-600 font-medium hover:text-blue-700">
                Начать поиск →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Vacancies Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Новые вакансии
            </h2>
            <p className="text-gray-600 text-lg">
              Ознакомьтесь с последними предложениями работы на нашей платформе
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {latestVacancies.map((vacancy) => (
              <div key={vacancy.id} className="card hover:translate-y-[-5px] transition-transform duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{vacancy.title}</h3>
                </div>
                <p className="text-blue-600 font-medium mb-2">{vacancy.company}</p>
                <div className="flex items-center text-gray-500 mb-3">
                  <span>{vacancy.location}</span>
                  <span className="mx-2">•</span>
                  <span>{vacancy.workType}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{vacancy.description}</p>
                <p className="font-medium text-gray-800 mb-4">{vacancy.salary}</p>
                <Link 
                  to={`/vacancies`} 
                  className="inline-block text-blue-600 font-medium hover:text-blue-700"
                >
                  Подробнее →
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/vacancies" className="btn btn-primary py-3 px-6">
              Смотреть все вакансии
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Отзывы наших пользователей
            </h2>
            <p className="text-gray-600 text-lg">
              Что говорят те, кто уже нашел работу или сотрудников с помощью РаботаПоиск
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-6">
                "Благодаря РаботаПоиск я нашел работу мечты всего за неделю! Удобный интерфейс и большое количество актуальных вакансий действительно впечатляют."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">АС</span>
                </div>
                <div>
                  <div className="font-medium">Алексей Смирнов</div>
                  <div className="text-sm text-gray-500">Frontend-разработчик</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-gray-600 mb-6">
                "Как HR-менеджер, я пользуюсь РаботаПоиск для поиска специалистов. Платформа предлагает отличный функционал для фильтрации кандидатов и управления откликами."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">ЕИ</span>
                </div>
                <div>
                  <div className="font-medium">Екатерина Иванова</div>
                  <div className="text-sm text-gray-500">HR-менеджер, ООО "Технологии"</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-gray-600 mb-6">
                "После создания резюме на РаботаПоиск я получил несколько предложений в течение первых дней. Сервис очень помог в поиске удаленной работы в IT-сфере."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold">МК</span>
                </div>
                <div>
                  <div className="font-medium">Михаил Козлов</div>
                  <div className="text-sm text-gray-500">DevOps-инженер</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы начать поиск?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Присоединяйтесь к нашей платформе сегодня и найдите идеальную работу или сотрудника
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="btn bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 text-lg">
                Зарегистрироваться
              </Link>
              <Link to="/vacancies" className="btn border-2 border-white text-white hover:bg-blue-700 py-3 px-8 text-lg">
                Просмотреть вакансии
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Преимущества РаботаПоиск
            </h2>
            <p className="text-gray-600 text-lg">
              Почему тысячи соискателей и работодателей выбирают нашу платформу
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Проверенные вакансии</h3>
              <p className="text-gray-600">
                Все вакансии проходят модерацию и проверку на актуальность
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Лучшие работодатели</h3>
              <p className="text-gray-600">
                На платформе представлены ведущие компании по всей России
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Карьерный рост</h3>
              <p className="text-gray-600">
                Возможность найти работу с перспективой профессионального развития
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Поддержка клиентов</h3>
              <p className="text-gray-600">
                Профессиональная поддержка на всех этапах поиска работы
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;