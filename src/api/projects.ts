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
            title: 'MyTelkomsel',
            description: 'Mobile operator customer portal and self-service application with advanced features for account management, billing, and service customization. The platform serves millions of users daily with real-time updates and seamless integration with backend services.',
            techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
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
              'Customer support chat',
              'Service activation/deactivation'
            ],
            demoUrl: 'https://my.telkomsel.com'
          },
          {
            id: 2,
            title: 'Dekkson Loyalty System',
            description: 'Customer loyalty and rewards management system designed to enhance customer engagement and retention. The platform includes point tracking, reward redemption, and personalized offers based on customer behavior.',
            techStack: ['PHP', 'MySQL', 'JavaScript', 'jQuery'],
            thumbnail: 'https://mafatichulfuadi.com/Project/MyTelkomsel/NoPreview.png',
            images: [
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png'
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
            id: 3,
            title: 'Dekkson ERP',
            description: 'Enterprise resource planning system for inventory and sales management, streamlining business operations and improving efficiency. The system provides comprehensive tools for managing various aspects of the business.',
            techStack: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
            thumbnail: 'https://mafatichulfuadi.com/Project/MyTelkomsel/NoPreview.png',
            images: [
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png'
            ],
            features: [
              'Inventory management',
              'Sales tracking',
              'Purchase order processing',
              'Financial reporting',
              'Employee management'
            ]
          },
          {
            id: 4,
            title: 'Go-Commerce Builder',
            description: 'E-commerce platform builder and manager that enables businesses to create and manage their online stores with ease. The platform includes customizable templates and powerful management tools.',
            techStack: ['Go', 'React', 'PostgreSQL', 'Docker'],
            thumbnail: 'https://mafatichulfuadi.com/Project/MyTelkomsel/NoPreview.png',
            images: [
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png'
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
            id: 5,
            title: 'Live Integration Dashboard (LID)',
            description: 'Real-time data integration and visualization dashboard providing insights into system performance and business metrics. The dashboard offers customizable views and automated reporting.',
            techStack: ['Node.js', 'Express', 'Socket.io', 'MongoDB'],
            thumbnail: 'https://mafatichulfuadi.com/Project/MyTelkomsel/NoPreview.png',
            images: [
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoIma',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoIma'
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
            id: 6,
            title: 'Go-Media',
            description: 'Media content management and distribution platform designed for efficient handling of digital assets. The system supports various media types and includes advanced search capabilities.',
            techStack: ['Go', 'React', 'AWS S3', 'PostgreSQL'],
            thumbnail: 'https://mafatichulfuadi.com/Project/MyTelkomsel/NoPreview.png',
            images: [
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png',
              'https://mafatichulfuadi.com/Project/MyTelkomsel/NoImage.png'
            ],
            features: [
              'Media asset management',
              'Content distribution',
              'User access control',
              'Version control',
              'Automated workflows'
            ]
          }
        ]);
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}