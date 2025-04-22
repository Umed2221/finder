import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X, ChevronDown } from 'lucide-react';
import { useData, Vacancy } from '../context/DataContext';

const VacanciesPage: React.FC = () => {
  const { vacancies } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>(vacancies);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  
  // Get unique categories, work types, and locations
  const categories = Array.from(new Set(vacancies.map(v => v.category)));
  const workTypes = Array.from(new Set(vacancies.map(v => v.workType)));
  const locations = Array.from(new Set(vacancies.map(v => v.location)));
  
  // Filter vacancies when search or filters change
  useEffect(() => {
    let filtered = vacancies;
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(v => 
        v.title.toLowerCase().includes(searchLower) || 
        v.company.toLowerCase().includes(searchLower) || 
        v.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(v => v.category === selectedCategory);
    }
    
    // Apply work type filter
    if (selectedWorkType) {
      filtered = filtered.filter(v => v.workType === selectedWorkType);
    }
    
    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter(v => v.location === selectedLocation);
    }
    
    setFilteredVacancies(filtered);
  }, [searchTerm, selectedCategory, selectedWorkType, selectedLocation, vacancies]);
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedWorkType('');
    setSelectedLocation('');
    setSearchTerm('');
  };

  return (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-64px-300px)]">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Поиск вакансий</h1>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow relative">
              <input 
                type="text" 
                className="form-input pl-10 py-3 w-full rounded-md"
                placeholder="Должность, компания или ключевые слова"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex-shrink-0 flex space-x-2 items-center">
              <button 
                className="btn btn-outline flex items-center space-x-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>Фильтры</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <button className="btn btn-primary flex-shrink-0">
                Найти
              </button>
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Фильтры</h3>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  onClick={resetFilters}
                >
                  <X className="h-4 w-4" />
                  <span>Сбросить фильтры</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="form-label">Категория</label>
                  <select 
                    className="form-input" 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Все категории</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Work Type Filter */}
                <div>
                  <label className="form-label">Тип занятости</label>
                  <select 
                    className="form-input"
                    value={selectedWorkType}
                    onChange={(e) => setSelectedWorkType(e.target.value)}
                  >
                    <option value="">Все типы занятости</option>
                    {workTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="form-label">Местоположение</label>
                  <select 
                    className="form-input"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">Все города</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Найдено {filteredVacancies.length} вакансий
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Сортировать:</span>
            <select className="form-input py-1 px-2">
              <option>По дате (новые)</option>
              <option>По дате (старые)</option>
              <option>По зарплате (по убыванию)</option>
              <option>По зарплате (по возрастанию)</option>
            </select>
          </div>
        </div>
        
        {/* Vacancies List */}
        <div className="space-y-6">
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map((vacancy) => (
              <div key={vacancy.id} className="card hover:translate-y-[-2px] transition-transform duration-300">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{vacancy.title}</h2>
                  <p className="text-blue-600 font-medium mb-2">{vacancy.company}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{vacancy.location}</span>
                    <span className="mx-2">•</span>
                    <span>{vacancy.workType}</span>
                    <span className="mx-2">•</span>
                    <span>Категория: {vacancy.category}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{vacancy.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Требования:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {vacancy.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap justify-between items-center">
                  <p className="font-semibold text-gray-800">{vacancy.salary}</p>
                  <div className="flex space-x-3 mt-2 sm:mt-0">
                    <button className="btn btn-outline">
                      Сохранить
                    </button>
                    <button className="btn btn-primary">
                      Откликнуться
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 text-gray-500 text-sm">
                  Опубликовано: {vacancy.createdAt}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">По вашему запросу вакансий не найдено</p>
              <button 
                className="btn btn-outline"
                onClick={resetFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredVacancies.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-1">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Предыдущая
              </button>
              <button className="px-4 py-2 border border-blue-500 bg-blue-500 text-white rounded-md">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Следующая
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanciesPage;