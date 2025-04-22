import React, { createContext, useContext, useState } from 'react';

// Types
export interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  employerId: number;
  createdAt: string;
  category: string;
  workType: string;
}

export interface Resume {
  id: number;
  userId: number;
  fullName: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  about: string;
  salary: string;
  contact: string;
  createdAt: string;
}

interface DataContextType {
  vacancies: Vacancy[];
  resumes: Resume[];
  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'createdAt'>) => void;
  addResume: (resume: Omit<Resume, 'id' | 'createdAt'>) => void;
  getVacancyById: (id: number) => Vacancy | undefined;
  getResumeById: (id: number) => Resume | undefined;
}

// Create mock data
const mockVacancies: Vacancy[] = [
  {
    id: 1,
    title: 'Frontend-разработчик',
    company: 'ООО "Технологии"',
    location: 'Москва',
    salary: '120 000 - 180 000 ₽',
    description: 'Требуется опытный Frontend-разработчик для создания современных веб-приложений. Работа в дружном коллективе, современный офис, гибкий график.',
    requirements: [
      'Знание JavaScript, React, TypeScript',
      'Опыт работы от 2 лет',
      'Понимание принципов адаптивной верстки',
      'Опыт работы с REST API',
    ],
    employerId: 2,
    createdAt: '2025-03-15',
    category: 'IT, интернет, связь',
    workType: 'Полная занятость',
  },
  {
    id: 2,
    title: 'Java-разработчик',
    company: 'АО "Финтех"',
    location: 'Санкт-Петербург',
    salary: '150 000 - 200 000 ₽',
    description: 'Разработка высоконагруженных банковских систем на Java. Требуется опыт работы с микросервисной архитектурой и знание Spring Framework.',
    requirements: [
      'Java 11+, Spring Boot, Spring Data',
      'Опыт работы с микросервисами',
      'Понимание принципов SOLID, DDD',
      'Навыки работы с PostgreSQL',
    ],
    employerId: 3,
    createdAt: '2025-03-12',
    category: 'IT, интернет, связь',
    workType: 'Полная занятость',
  },
  {
    id: 3,
    title: 'Менеджер по продажам',
    company: 'ООО "ТоргСервис"',
    location: 'Москва',
    salary: '80 000 - 120 000 ₽',
    description: 'Поиск и привлечение клиентов, ведение переговоров, заключение договоров. Работа в офисе с возможностью удаленной работы 2 дня в неделю.',
    requirements: [
      'Опыт работы в продажах от 1 года',
      'Навыки ведения переговоров',
      'Желание развиваться в сфере продаж',
      'Коммуникабельность и стрессоустойчивость',
    ],
    employerId: 4,
    createdAt: '2025-03-10',
    category: 'Продажи',
    workType: 'Полная занятость',
  },
  {
    id: 4,
    title: 'Бухгалтер',
    company: 'ЗАО "Консалтинг Групп"',
    location: 'Екатеринбург',
    salary: '70 000 - 90 000 ₽',
    description: 'Ведение бухгалтерского и налогового учета, подготовка и сдача отчетности, работа с первичной документацией.',
    requirements: [
      'Высшее экономическое образование',
      'Опыт работы бухгалтером от 3 лет',
      'Знание 1С: Бухгалтерия 8.3',
      'Знание налогового законодательства РФ',
    ],
    employerId: 5,
    createdAt: '2025-03-08',
    category: 'Бухгалтерия, финансы',
    workType: 'Полная занятость',
  },
  {
    id: 5,
    title: 'DevOps-инженер',
    company: 'ООО "Технологии"',
    location: 'Москва, удаленно',
    salary: '180 000 - 240 000 ₽',
    description: 'Настройка и поддержка CI/CD, автоматизация процессов, мониторинг инфраструктуры. Возможна полностью удаленная работа.',
    requirements: [
      'Опыт работы с Kubernetes, Docker',
      'Знание Linux на уровне администрирования',
      'Опыт работы с CI/CD (GitLab CI, Jenkins)',
      'Понимание принципов IaC',
    ],
    employerId: 2,
    createdAt: '2025-03-05',
    category: 'IT, интернет, связь',
    workType: 'Удаленная работа',
  },
];

const mockResumes: Resume[] = [
  {
    id: 1,
    userId: 1,
    fullName: 'Иван Петров',
    title: 'Frontend-разработчик',
    location: 'Москва',
    experience: '3 года',
    skills: [
      'JavaScript', 'React', 'TypeScript', 'HTML', 'CSS', 'Git'
    ],
    education: 'Московский Государственный Университет, Факультет Вычислительной Математики и Кибернетики, 2022',
    about: 'Ответственный разработчик с опытом создания современных веб-приложений. Владею хорошими навыками командной работы, умею работать с дедлайнами.',
    salary: 'от 150 000 ₽',
    contact: 'ivan.petrov@example.com',
    createdAt: '2025-03-10',
  },
  {
    id: 2,
    userId: 6,
    fullName: 'Анна Сидорова',
    title: 'UI/UX Дизайнер',
    location: 'Санкт-Петербург',
    experience: '4 года',
    skills: [
      'Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch', 'Prototyping'
    ],
    education: 'Санкт-Петербургский Государственный Университет, Факультет Искусств, 2020',
    about: 'Креативный дизайнер с портфолио успешных проектов. Создаю удобные и эстетичные интерфейсы, ориентированные на пользователей.',
    salary: 'от 120 000 ₽',
    contact: 'anna.sidorova@example.com',
    createdAt: '2025-03-08',
  },
  {
    id: 3,
    userId: 7,
    fullName: 'Алексей Смирнов',
    title: 'Java-разработчик',
    location: 'Москва',
    experience: '5 лет',
    skills: [
      'Java', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'Docker', 'Microservices'
    ],
    education: 'МГТУ им. Баумана, Факультет Информатики и Систем Управления, 2019',
    about: 'Опытный Java-разработчик с глубоким пониманием многопоточности, архитектуры приложений и высоконагруженных систем.',
    salary: 'от 200 000 ₽',
    contact: 'alexei.smirnov@example.com',
    createdAt: '2025-03-05',
  },
  {
    id: 4,
    userId: 8,
    fullName: 'Екатерина Иванова',
    title: 'Менеджер по продажам',
    location: 'Екатеринбург',
    experience: '3 года',
    skills: [
      'Ведение переговоров', 'CRM-системы', 'B2B продажи', 'Подготовка коммерческих предложений'
    ],
    education: 'Уральский Федеральный Университет, Экономический факультет, 2021',
    about: 'Целеустремленный менеджер по продажам с успешным опытом привлечения и удержания клиентов. Умею находить индивидуальный подход к каждому клиенту.',
    salary: 'от 80 000 ₽',
    contact: 'ekaterina.ivanova@example.com',
    createdAt: '2025-03-01',
  },
  {
    id: 5,
    userId: 9,
    fullName: 'Михаил Козлов',
    title: 'DevOps-инженер',
    location: 'Удаленно',
    experience: '4 года',
    skills: [
      'Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD', 'Ansible', 'Prometheus'
    ],
    education: 'Новосибирский Государственный Технический Университет, 2020',
    about: 'DevOps-инженер с опытом автоматизации инфраструктуры и процессов разработки. Обеспечиваю стабильную работу и масштабирование систем.',
    salary: 'от 180 000 ₽',
    contact: 'mikhail.kozlov@example.com',
    createdAt: '2025-02-25',
  },
];

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>(mockVacancies);
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);

  // Add new vacancy
  const addVacancy = (vacancy: Omit<Vacancy, 'id' | 'createdAt'>) => {
    const newVacancy: Vacancy = {
      ...vacancy,
      id: vacancies.length > 0 ? Math.max(...vacancies.map(v => v.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setVacancies([...vacancies, newVacancy]);
  };

  // Add new resume
  const addResume = (resume: Omit<Resume, 'id' | 'createdAt'>) => {
    const newResume: Resume = {
      ...resume,
      id: resumes.length > 0 ? Math.max(...resumes.map(r => r.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setResumes([...resumes, newResume]);
  };

  // Get vacancy by ID
  const getVacancyById = (id: number) => {
    return vacancies.find(vacancy => vacancy.id === id);
  };

  // Get resume by ID
  const getResumeById = (id: number) => {
    return resumes.find(resume => resume.id === id);
  };

  // Context value
  const value = {
    vacancies,
    resumes,
    addVacancy,
    addResume,
    getVacancyById,
    getResumeById,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};