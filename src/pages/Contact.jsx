import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Contact = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-300">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-dark via-dark-200 to-dark py-20 border-b border-primary/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600')] bg-cover bg-center opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-gray-300 text-lg">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-dark-100/80 backdrop-blur-sm rounded-xl border border-primary/20">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{info.title}</h3>
                      {info.action ? (
                        <a href={info.action} className="text-gray-400 hover:text-primary transition-colors">
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-400">{info.details}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-dark-100 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <FaFacebook className="text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-dark-100 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <FaTwitter className="text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-dark-100 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <FaInstagram className="text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-dark-100 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <FaLinkedin className="text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-100/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-600 rounded-xl focus:outline-none focus:border-primary text-white"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-600 rounded-xl focus:outline-none focus:border-primary text-white"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-600 rounded-xl focus:outline-none focus:border-primary text-white"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-600 rounded-xl focus:outline-none focus:border-primary text-white resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-dark font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Find Us</h2>
          <div className="bg-dark-100/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20">
            <iframe
              title="Eliaan Motors Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127040.65797448746!2d-0.213762!3d5.603717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;