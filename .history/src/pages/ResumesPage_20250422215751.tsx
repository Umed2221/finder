import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X, ChevronDown } from 'lucide-react';
import { useData, Resume } from '../context/DataContext';

const ResumesPage: React.FC = () => {
  const { resumes } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResumes, setFilteredResumes] = useState<Resume[]>(resumes);
  const [showFilters, setShowFilters] = useState(false);
  
 
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('');
  
 
  const locations = Array.from(new Set(resumes.map(r => r.location)));
  

  const experienceOptions = [
    { value: 'any', label: 'Любой опыт' },
    { value: 'no-experience', label: 'Без опыта' },
    { value: '1-3', label: '1-3 года' },
    { value: '3-6', label: '3-6 лет' },
    { value: '6+', label: 'Более 6 лет' }
  ];
  

  useEffect(() => {
    let filtered = resumes;
    
  
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchLower) || 
        r.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        r.about.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter(r => r.location === selectedLocation);
    }
    
    // Apply experience filter
    if (experienceLevel) {
      // This is a simplified version - in real app would need better parsing
      if (experienceLevel === 'no-experience') {
        filtered = filtered.filter(r => 
          r.experience.includes('Без опыта') || 
          r.experience.includes('0') || 
          r.experience.includes('Нет')
        );
      } else if (experienceLevel === '1-3') {
        filtered = filtered.filter(r => 
          r.experience.includes('1') || 
          r.experience.includes('2') || 
          r.experience.includes('3')
        );
      } else if (experienceLevel === '3-6') {
        filtered = filtered.filter(r => 
          r.experience.includes('3') || 
          r.experience.includes('4') || 
          r.experience.includes('5') || 
          r.experience.includes('6')
        );
      } else if (experienceLevel === '6+') {
        filtered = filtered.filter(r => {
          const years = parseInt(r.experience);
          return !isNaN(years) && years > 6;
        });
      }
    }
    
    setFilteredResumes(filtered);
  }, [searchTerm, selectedLocation, experienceLevel, resumes]);
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedLocation('');
    setExperienceLevel('');
    setSearchTerm('');
  };

  return (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-64px-300px)]">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Поиск резюме</h1>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow relative">
              <input 
                type="text" 
                className="form-input pl-10 py-3 w-full rounded-md"
                placeholder="Специальность, навыки или ключевые слова"
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                
                {/* Experience Filter */}
                <div>
                  <label className="form-label">Опыт работы</label>
                  <select 
                    className="form-input"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="">Любой опыт</option>
                    {experienceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
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
            Найдено {filteredResumes.length} резюме
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Сортировать:</span>
            <select className="form-input py-1 px-2">
              <option>По дате (новые)</option>
              <option>По дате (старые)</option>
              <option>По опыту (по убыванию)</option>
              <option>По опыту (по возрастанию)</option>
            </select>
          </div>
        </div>
        
        {/* Resumes List */}
        <div className="space-y-6">
          {filteredResumes.length > 0 ? (
            filteredResumes.map((resume) => (
              <div key={resume.id} className="card hover:translate-y-[-2px] transition-transform duration-300">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{resume.title}</h2>
                  <p className="text-gray-800 font-medium mb-2">{resume.fullName}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{resume.location}</span>
                    <span className="mx-2">•</span>
                    <span>Опыт: {resume.experience}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{resume.about}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Ключевые навыки:</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Образование:</h3>
                  <p className="text-gray-600">{resume.education}</p>
                </div>
                
                <div className="flex flex-wrap justify-between items-center">
                  <p className="font-semibold text-gray-800">Ожидания: {resume.salary}</p>
                  <div className="flex space-x-3 mt-2 sm:mt-0">
                    <button className="btn btn-outline">
                      Сохранить
                    </button>
                    <button className="btn btn-primary">
                      Пригласить
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 text-gray-500 text-sm">
                  Обновлено: {resume.createdAt}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg mb-4">По вашему запросу резюме не найдено</p>
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
        {filteredResumes.length > 0 && (
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
                Следующая
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumesPage;