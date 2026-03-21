import { FaCar, FaUsers, FaStar, FaShieldAlt, FaHeadset, FaMoneyBillWave } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const About = () => {
  const features = [
    {
      icon: FaCar,
      title: 'Wide Selection',
      description: 'Choose from a wide range of premium vehicles from top brands.'
    },
    {
      icon: FaUsers,
      title: 'Experienced Team',
      description: 'Our team of professionals ensures you get the best service.'
    },
    {
      icon: FaStar,
      title: 'Quality Service',
      description: 'We maintain the highest standards of quality and cleanliness.'
    },
    {
      icon: FaShieldAlt,
      title: 'Safe & Secure',
      description: 'Fully insured vehicles with 24/7 customer support.'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your rental needs.'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Best Prices',
      description: 'Competitive rates with no hidden charges.'
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
              About Eliaan Motors
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Your trusted partner for premium car rentals in Ghana. We provide quality vehicles, 
              exceptional service, and unforgettable driving experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-dark-100/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To provide accessible, reliable, and premium car rental services that exceed customer 
              expectations, making every journey memorable and hassle-free.
            </p>
          </div>
          <div className="bg-dark-100/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              To become Ghana's leading car rental platform, setting new standards in quality, 
              convenience, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-400">Car Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10k+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>

        {/* Features */}
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-dark-100/80 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;