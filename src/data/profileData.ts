import { Experience, Project, Skill } from '../types/types';

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'PT. Bithealth',
    location: 'Tangerang, Indonesia',
    period: 'Jul 2025 - Apr 2026',
    responsibilities: [
      'Troubleshoot and resolve production issues through root cause analysis, improving system stability and reducing recurring incidents',
      'Improve API performance by optimizing inefficient queries and resolving N+1 query problems',
      'Refactor legacy code following clean architecture and engineering best practices',
      'Implement backend and frontend improvements including bug fixes and feature enhancements',
      'Improve system observability by enhancing application logging and monitoring',
      'Improved API response time by up to 70% through database query optimization'
    ],
    projects: 'Siloam Hospitals (frontoffice, kairos, payment, queue management, opdadmin)',
    techStack: 'Angular, React, Express.js, Typescript, .NET, SQL Server (MSSQL), PostgreSQL, Kibana'
  },
  {
    id: 2,
    role: 'Web Development Team Lead',
    company: 'PT. Phincon',
    location: 'Jakarta, Indonesia',
    period: 'Apr 2023 - Apr 2025',
    responsibilities: [
      'Led a 10-member team delivering high-performance and scalable API services for 30+ Telkomsel applications',
      'Ensured high system reliability and achieved 100% SLA compliance during Non-Functional Testing',
      'Collaborated with Product Owners, QA, and DevOps teams to ensure stable production releases',
      'Implemented engineering standards, documentation practices, and development workflows to improve productivity',
      'Managed sprint planning, team capacity, and backlog prioritization to maintain consistent delivery performance',
      'Mentored junior developers and conducted technical reviews to maintain code quality'
    ],
    projects: 'MyTelkomsel Web',
    techStack: 'Hapi.js, Express.js, React, MySQL, Redis, AWS, Docker, Jenkins, Jira'
  },
  {
    id: 3,
    role: 'Fullstack Developer',
    company: 'PT. Phincon',
    location: 'Jakarta, Indonesia',
    period: 'Nov 2021 - Jul 2025',
    responsibilities: [
      'Developed and maintained scalable API services for Telkomsel enterprise systems',
      'Collaborated with QA and DevOps teams across SIT, UAT, regression, functional, and non-functional testing',
      'Built automated unit tests achieving 80%+ coverage to improve code quality and system reliability',
      'Optimized backend services and database queries to achieve sub-second API response times'
    ],
    projects: 'MyTelkomsel Web, MyTelkomsel Apps, MyTelkomsel Lite',
    techStack: 'Hapi.js, Express.js, React, MySQL, Redis, AWS, Docker, Jenkins, Jira'
  },
  {
    id: 4,
    role: 'IT Developer',
    company: 'PT. eGoGo Hub Indonesia',
    location: 'Jakarta, Indonesia',
    period: 'Oct 2018 - Oct 2021',
    responsibilities: [
      'Built and maintained ERP systems and corporate websites',
      'Translated business requirements into scalable, database-driven applications',
      'Delivered client-facing solutions and supported production systems used in daily business operations',
      'Improved internal workflows and resolved production issues to support business operations'
    ],
    projects: 'eGoGo Web & ERP, Dekkson ERP & Loyalty, Hattan Intl, Go-Commerce Builder, Live Integration Dashboard (LID)',
    techStack: 'PHP Native, Express.js, React, Go, Dolibarr, MySQL'
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'MyTelkomsel Digital World',
    description: 'A large-scale digital ecosystem consisting of three main platforms: MyTelkomsel Web, MyTelkomsel App, and MyTelkomsel Lite, serving millions of Telkomsel users across Indonesia.',
    techStack: ['Hapi.js', 'Express.js', 'React', 'MySQL', 'Redis', 'AWS', 'Docker', 'Jenkins'],
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: []
  },
  {
    id: 2,
    title: 'Siloam Mobility',
    description: 'Digital healthcare platform. Focused on resolving production issues, optimizing backend API performance, and refactoring legacy code to improve system stability.',
    techStack: ['Angular', 'React', 'Express.js', 'Typescript', '.NET', 'SQL Server', 'PostgreSQL'],
    thumbnail: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: []
  },
  {
    id: 3,
    title: 'Dekkson Loyalty System',
    description: 'Customer loyalty and rewards management system',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'jQuery'],
    thumbnail: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: []
  },
  {
    id: 4,
    title: 'Dekkson ERP',
    description: 'Enterprise resource planning system for inventory and sales management',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: []
  },
  {
    id: 5,
    title: 'Go-Commerce Builder',
    description: 'E-commerce platform builder and manager',
    techStack: ['Go', 'React', 'PostgreSQL', 'Docker'],
    thumbnail: 'https://images.pexels.com/photos/6568911/pexels-photo-6568911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: []
  },
  {
    id: 6,
    title: 'Live Integration Dashboard (LID)',
    description: 'Real-time data integration and visualization dashboard',
    techStack: ['Node.js', 'Express', 'Socket.io', 'MongoDB'],
    thumbnail: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: []
  }
];

export const skills: Skill[] = [
  {
    category: 'Backend Engineering',
    items: ['Node.js', 'Go', 'PHP', 'TypeScript', 'REST API', 'Micro-services']
  },
  {
    category: 'Frontend Development',
    items: ['React', 'Angular', 'HTML', 'CSS']
  },
  {
    category: 'Databases & Caching',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server', 'Redis']
  },
  {
    category: 'Cloud & Infrastructure',
    items: ['AWS (EKS, EC2, ECR)', 'Docker', 'Kubernetes', 'CI/CD']
  },
  {
    category: 'Testing & Observability',
    items: ['Jest', 'Mocha', 'SonarQube', 'Kibana', 'Splunk']
  }
];

export const personalInfo = {
  name: "Muhammad Nurdin Mafatichul Fuadi",
  title: "Backend Developer • Fullstack Engineer • Software Engineer",
  location: "Yogyakarta, Indonesia",
  email: "mafatichulfuadi@gmail.com",
  phone: "+62-8133-5884-729",
  linkedin: "https://www.linkedin.com/in/mafatichulfuadi"
};