import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github as GitHub } from 'lucide-react';
import { personalInfo } from '../data/profileData';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-dark-800">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-primary-400">Contact Information</h3>
            
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-primary-500 bg-opacity-20 p-3 rounded-lg mr-4">
                  <Mail className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-primary-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-primary-500 bg-opacity-20 p-3 rounded-lg mr-4">
                  <Phone className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Phone</p>
                  <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-primary-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-primary-500 bg-opacity-20 p-3 rounded-lg mr-4">
                  <MapPin className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white">{personalInfo.location}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-primary-500 bg-opacity-20 p-3 rounded-lg mr-4">
                  <Linkedin className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                    Connect with me
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-dark-700 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-primary-400">Send a Message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-3 bg-dark-600 border border-dark-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;