import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ContactBackground from '../assets/images/homepage/Home3.avif';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: '+233 24 123 4567',
      action: 'tel:+233241234567'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: 'info@eliaanmotors.com',
      action: 'mailto:info@eliaanmotors.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: 'Ashaley Botwe, Accra, Ghana',
      action: 'https://maps.google.com'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: 'Mon - Sun: 8:00 AM - 8:00 PM',
      action: null
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-20 md:py-28"
        style={{ 
          backgroundImage: `url(${ContactBackground})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 container-custom mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
              <span className="text-white">Contact</span>{' '}
              <span className="text-primary">Us</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 animate-fade-in-up animation-delay-200">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom mx-auto py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index} 
                    className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-gray-900 border border-gray-800' 
                        : 'bg-white border border-gray-200 shadow-lg'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                      isDark ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                      <Icon className="text-primary text-xl" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {info.title}
                    </h3>
                    {info.action ? (
                      <a 
                        href={info.action} 
                        className={`text-sm ${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} transition-colors`}
                        target={info.title === 'Address' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {info.details}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className={`p-6 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-gray-900 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-lg'
            }`}>
              <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:text-primary hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:text-primary hover:bg-gray-200'
                }`}>
                  <FaFacebook size={18} />
                </a>
                <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:text-primary hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:text-primary hover:bg-gray-200'
                }`}>
                  <FaTwitter size={18} />
                </a>
                <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:text-primary hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:text-primary hover:bg-gray-200'
                }`}>
                  <FaInstagram size={18} />
                </a>
                <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:text-primary hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:text-primary hover:bg-gray-200'
                }`}>
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`rounded-2xl p-6 md:p-8 transition-all duration-300 ${
            isDark 
              ? 'bg-gray-900 border border-gray-800' 
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Send us a Message
            </h2>
            
            {submitted && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-sm">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none ${
                    isDark 
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                  isDark 
                    ? 'bg-black text-primary border border-gray-700 hover:bg-gray-900 hover:border-primary' 
                    : 'bg-gray-900 text-primary border border-gray-200 hover:bg-gray-800 hover:border-primary'
                }`}
              >
                <span>Send Message</span>
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${
            isDark 
              ? 'bg-gray-900 border border-gray-800' 
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Find Us
              </h3>
            </div>
            <div className="h-80">
              <iframe
                title="Eliaan Motors Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127040.65797448746!2d-0.213762!3d5.603717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;