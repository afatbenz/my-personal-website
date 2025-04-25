import { Experience, Project, Skill } from '../types/types';

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Development Team Lead',
    company: 'PT. Phincon',
    location: 'Surakarta & Jakarta, Indonesia',
    period: '04/2023 - 04/2025',
    responsibilities: [
      'Led a team of 10 developers to deliver API services and web UI',
      'Ensured development adhered to timelines and managed resources effectively',
      'Monitored and resolved production issues across 20+ running services, ensuring system stability',
      'Spearheaded documentation efforts (MOP, deployment logs, pentest reports)',
      'Led performance optimization efforts, achieving 100% NFT compliance',
      'Ensured all production code resolved pentest issues, improving security compliance',
      'Managed deployments for 30+ microservices, ensuring zero downtime releases',
      'Served as a liaison between users, product owners, and developers for feature requests'
    ]
  },
  {
    id: 2,
    role: 'Fullstack Developer',
    company: 'PT. Phincon',
    location: 'Surakarta & Jakarta, Indonesia',
    period: '11/2021 - Present',
    responsibilities: [
      'Develop and maintain API services with clean, tested code and proper documentation',
      'Collaborate on deployments and oversee testing (SIT, UAT, Regression, FUT, NFT)',
      'Conduct performance testing and resolve production issues efficiently',
      'Ensured 80%+ unit test coverage positively impacted the development process'
    ]
  },
  {
    id: 3,
    role: 'IT Programmer',
    company: 'PT. EGoGo Hub Indonesia',
    location: 'Jakarta, Indonesia',
    period: '10/2018 - 10/2021',
    responsibilities: [
      'Built and maintained ERP systems and company profile websites for internal and client needs',
      'Led the development team through the software development lifecycle',
      'Analyzed user needs, provided solutions, and designed databases based on project requirements',
      'Supported UAT processes and resolved production issues efficiently',
      'Developed and maintained 7 projects for internal company and corporate clients'
    ]
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'MyTelkomsel',
    description: 'Mobile operator customer portal and self-service application',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: 'Dekkson Loyalty System',
    description: 'Customer loyalty and rewards management system',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'jQuery'],
    thumbnail: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: 'Dekkson ERP',
    description: 'Enterprise resource planning system for inventory and sales management',
    techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    title: 'Go-Commerce Builder',
    description: 'E-commerce platform builder and manager',
    techStack: ['Go', 'React', 'PostgreSQL', 'Docker'],
    thumbnail: 'https://images.pexels.com/photos/6568911/pexels-photo-6568911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    title: 'Live Integration Dashboard (LID)',
    description: 'Real-time data integration and visualization dashboard',
    techStack: ['Node.js', 'Express', 'Socket.io', 'MongoDB'],
    thumbnail: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    title: 'Go-Media',
    description: 'Media content management and distribution platform',
    techStack: ['Go', 'React', 'AWS S3', 'PostgreSQL'],
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const skills: Skill[] = [
  {
    category: 'Programming Languages',
    items: ['PHP', 'JavaScript (Node.js, Express)', 'TypeScript', 'Go (Gin)']
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Hapi.js', 'HTML/CSS']
  },
  {
    category: 'Database',
    items: ['MySQL', 'MongoDB', 'Redis']
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EKS, EC2, ECR)', 'Kubernetes', 'Docker', 'CI/CD (Jenkins, GitLab CI)']
  },
  {
    category: 'Testing & Monitoring',
    items: ['Jest', 'Mocha', 'Splunk', 'Postman', 'SonarQube']
  }
];

export const personalInfo = {
  name: "Muhammad Nurdin Mafatichul Fuadi",
  title: "Software Engineer",
  location: "Jakarta, Indonesia",
  email: "mafatichulfuadi@gmail.com",
  phone: "+62 813-3588-4729",
  linkedin: "https://www.linkedin.com/in/mafatichulfuadi"
};