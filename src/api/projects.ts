import { Project } from '../types/types';

const API_URL = 'https://api.example.com/projects';

export async function fetchProjects(): Promise<Project[]> {
  try {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'My Siloam',
            description: 'A centralized Omnichannel Healthcare Ecosystem for Siloam Hospitals nationwide, facilitating an End-to-End Patient Journey orchestration—ranging from Appointment Scheduling and Inpatient/Outpatient Admission to real-time Automated Notifications and Integrated Payment Gateway solutions.',
            techStack: ['Node.js', 'Expressjs', 'TypeScript', 'AngularJS', 'Reactjs', '.NET', 'PostgreSQL', 'MS SQL Server', 'Docker'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Siloam/siloam.png',
            images: [
              'https://mafatichulfuadi.com/Project/Siloam/siloam.png',
              'https://mafatichulfuadi.com/Project/Siloam/siloam.png',
              'https://mafatichulfuadi.com/Project/Siloam/siloam.png'
            ],
            features: [
              'Patient Admission',
              'Appointment Management',
              'Inventory Management',
              'Doctor Scheduling',
              'Queue Monitoring',
              'etc'
            ],
            demoUrl: '-'
          },
          {
            id: 2,
            title: 'MyTelkomsel',
            description: 'Mobile operator customer portal and self-service application with advanced features for account management, billing, and service customization. The platform serves millions of users daily with real-time updates and seamless integration with backend services.',
            techStack: ['ReactJS', 'Node.js', 'Expressjs', 'Hapijs', 'MongoDB', 'Amazone EKS', 'Amazone S3', 'Amazone ECR', 'Amazone EFS', 'Jenkins', 'Kubernetes', 'Docker'],
            thumbnail: 'https://mafatichulfuadi.com/Project/MyTelkomsel/Thumbnail.png',
            images: [
              'https://mafatichulfuadi.com/Project/MyTelkomsel/Thumbnail1.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/Thumbnail2.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/Thumbnail3.png'
            ],
            features: [
              'Real-time usage monitoring',
              'Bill payment integration',
              'Package subscription management',
              'Grapari Online Service',
              'Service activation/deactivation',
              'etc'
            ],
            demoUrl: 'https://my.telkomsel.com'
          },
          {
            id: 3,
            title: 'Dekkson Loyalty System',
            description: 'Customer loyalty and rewards management system designed to enhance customer engagement and retention. The platform includes point tracking, reward redemption, and personalized offers based on customer behavior.',
            techStack: ['NodeJS', 'ExpressJS', 'ReactJS', 'MySQL', 'JavaScript', 'jQuery'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Dekkson/dekkson.png',
            images: [
              'https://mafatichulfuadi.com/Project/Dekkson/dekkson.png',
              'https://mafatichulfuadi.com/Project/Dekkson/dekkson.png',
              'https://mafatichulfuadi.com/Project/Dekkson/dekkson.png'
            ],
            features: [
              'Points tracking system',
              'Reward catalog management',
              'Customer segmentation',
              'Analytics dashboard',
              'Integration with POS systems'
            ]
          },
          {
            id: 4,
            title: 'Dekkson ERP',
            description: 'Enterprise resource planning system for inventory and sales management, streamlining business operations and improving efficiency. The system provides comprehensive tools for managing various aspects of the business.',
            techStack: ['NodeJS', 'ExpressJS', 'ReactJS', 'MySQL', 'JavaScript', 'Bootstrap'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Dekkson/dekkson-erp.png',
            images: [
              'https://mafatichulfuadi.com/Project/Dekkson/dekkson-erp.png',
              'https://mafatichulfuadi.com/Project/Dekkson/dekkson-erp.png',
              'https://mafatichulfuadi.com/Project/Dekkson/dekkson-erp.png'
            ],
            features: [
              'Inventory management',
              'Sales tracking',
              'Purchase order processing',
              'Financial reporting',
              'Employee management'
            ],
            demoUrl: 'https://erp.dekkson.com'
          },
          {
            id: 5,
            title: 'Go-Commerce Builder',
            description: 'E-commerce platform builder and manager that enables businesses to create and manage their online stores with ease. The platform includes customizable templates and powerful management tools.',
            techStack: ['Go', 'NodeJS', 'ExpressJS', 'ReactJS', 'MySQL', 'Docker'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
            images: [
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png'
            ],
            features: [
              'Store builder interface',
              'Product management',
              'Order processing',
              'Payment gateway integration',
              'Analytics and reporting'
            ]
          },
          {
            id: 6,
            title: 'Live Integration Dashboard (LID)',
            description: 'Real-time data integration and visualization dashboard providing insights into system performance and business metrics. The dashboard offers customizable views and automated reporting.',
            techStack: ['Node.js', 'Express', 'Go', 'Socket.io', 'MongoDB', 'MySQL', 'ReactJS'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
            images: [
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo',
              'https://mafatichulfuadi.com/Project/Egogo/egogo'
            ],
            features: [
              'Real-time data visualization',
              'Custom dashboard creation',
              'Alert configuration',
              'Data export capabilities',
              'System health monitoring'
            ]
          },
          {
            id: 8,
            title: 'Go-Media',
            description: 'Media content management and distribution platform designed for efficient handling of digital assets. The system supports various media types and includes advanced search capabilities.',
            techStack: ['NodeJS', 'ExpressJS', 'ReactJS', 'MySQL'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
            images: [
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png'
            ],
            features: [
              'Media asset management',
              'Content distribution',
              'User access control',
              'Version control',
              'Automated workflows'
            ]
          },
          {
            id: 9,
            title: 'eGoGo Hub ERP',
            description: 'Egogohub ERP is an internal enterprise platform owned by eGoGo Hub Indonesia, designed to simplify business processes and support employee needs.',
            techStack: ['PHP Native', 'Dolibarr', 'Bootstrap', 'MySQL', 'JQuery'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
            images: [
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png'
            ],
            features: [
              'User & employee Management',
              'Attendance Tracking',
              'Timesheet Management',
              'Warehouse & Fulfillment Management',
              'Finance & Accounting',
              'etc'
            ],
            demoUrl: 'https://erp.egogohub.com'
          },
          {
            id: 10,
            title: 'eGoGo Hub Company Profile',
            description: 'This is a company profile platform used to introduce the company to the public.',
            techStack: ['PHP Native', 'Bootstrap', 'MySQL', 'Javascript', 'JQuery'],
            thumbnail: 'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
            images: [
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png',
              'https://mafatichulfuadi.com/Project/Egogo/egogo.png'
            ],
            features: [
              'Profile Company',
              'Job Vacancy',
              'Contact',
            ],
            demoUrl: 'https://www.egogohub.com'
          }
        ]);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}