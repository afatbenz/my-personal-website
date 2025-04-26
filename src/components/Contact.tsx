import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/profileData';

const Contact: React.FC = () => {
  const contactItems = [
    {
      icon: <Mail className="text-primary-400" size={24} />,
      label: 'Email',
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      delay: 0.1
    },
    {
      icon: <Phone className="text-primary-400" size={24} />,
      label: 'Phone',
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      delay: 0.2
    },
    {
      icon: <MapPin className="text-primary-400" size={24} />,
      label: 'Location',
      value: personalInfo.location,
      delay: 0.3
    },
    {
      icon: <Linkedin className="text-primary-400" size={24} />,
      label: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://www.linkedin.com/in/mafatichulfuadi',
      external: true,
      delay: 0.4
    },
    {
      icon: <Github className="text-primary-400" size={24} />,
      label: 'GitHub',
      value: 'View my repositories',
      link: 'https://github.com/afatbenz',
      external: true,
      delay: 0.5
    },
    {
      icon: <Instagram className="text-primary-400" size={24} />,
      label: 'Instagram',
      value: 'Follow me',
      link: 'https://www.instagram.com/mafatichulfuadi',
      external: true,
      delay: 0.5
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            I'm currently looking for new opportunities. Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="group relative bg-dark-700 rounded-lg p-6 hover:bg-dark-600 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-dark-800 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">{item.label}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-primary-400 transition-colors group-hover:text-primary-400 flex items-center gap-2"
                    >
                      {item.value}
                      {item.external && <ExternalLink size={14} />}
                    </a>
                  ) : (
                    <span className="text-gray-400">{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;