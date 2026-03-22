import { 
  FaCar, 
  FaUsers, 
  FaStar, 
  FaShieldAlt, 
  FaHeadset, 
  FaMoneyBillWave, 
  FaMapMarkerAlt, 
  FaClock, 
  FaAward, 
  FaHeart, 
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AboutBackground from '../assets/images/homepage/home8.jpg';

const About = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: FaCar,
      title: 'Wide Selection',
      description: 'Choose from a wide range of premium vehicles from top brands including Mercedes, BMW, Audi, and more.'
    },
    {
      icon: FaUsers,
      title: 'Experienced Team',
      description: 'Our professional team has over 10 years of experience in the car rental industry.'
    },
    {
      icon: FaStar,
      title: 'Quality Service',
      description: 'We maintain the highest standards of quality, cleanliness, and customer satisfaction.'
    },
    {
      icon: FaShieldAlt,
      title: 'Safe & Secure',
      description: 'Fully insured vehicles with 24/7 roadside assistance and support.'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your rental needs and inquiries.'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Best Prices',
      description: 'Competitive rates with no hidden charges. What you see is what you pay.'
    }
  ];

  const stats = [
    { value: '50+', label: 'Car Models', icon: FaCar },
    { value: '10k+', label: 'Happy Customers', icon: FaUsers },
    { value: '4.9', label: 'Average Rating', icon: FaStar },
    { value: '24/7', label: 'Support', icon: FaHeadset }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from vehicle quality to customer interaction.',
      icon: FaAward
    },
    {
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty in all our dealings.',
      icon: FaHeart
    },
    {
      title: 'Innovation',
      description: 'We continuously improve and innovate to provide the best rental experience.',
      icon: FaGlobe
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32"
        style={{ 
          backgroundImage: `url(${AboutBackground})`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'bg-black/80' : 'bg-black/60'}`}></div>
        
        <div className="relative z-10 container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-white">About </span>
              <span className="text-primary">Eliaan Motors</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-8 animate-fade-in-up animation-delay-200">
              Your trusted partner for premium car rentals in Ghana. We provide quality vehicles, 
              exceptional service, and unforgettable driving experiences.
            </p>
            <div className="animate-fade-in-up animation-delay-400">
              <Link 
                to="/listings" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300"
              >
                Explore Our Fleet
                <FaCar className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-primary text-xl" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Story */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our <span className="text-primary">Story</span>
            </h2>
            <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Founded in 2020, Eliaan Motors started with a simple vision: to make car rental in Ghana 
              easy, affordable, and reliable. What began as a small fleet of 5 vehicles has grown into 
              a trusted brand with over 50 premium cars.
            </p>
            <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our journey has been driven by a passion for excellence and a commitment to our customers. 
              We believe that everyone deserves to drive a quality vehicle, whether for business, leisure, 
              or special occasions.
            </p>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Today, we're proud to serve thousands of satisfied customers across Ghana, offering a 
              diverse fleet of luxury, economy, and SUV vehicles.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'border border-gray-800' : 'border border-gray-200'}`}>
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800" 
                alt="Eliaan Motors Fleet"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <FaGlobe className="text-primary text-2xl" />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Mission</h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              To provide accessible, reliable, and premium car rental services that exceed customer 
              expectations, making every journey memorable and hassle-free.
            </p>
          </div>
          <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <FaStar className="text-primary text-2xl" />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Vision</h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              To become Ghana's leading car rental platform, setting new standards in quality, 
              convenience, and customer satisfaction across Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container-custom py-12">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Our Core <span className="text-primary">Values</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index} 
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="container-custom py-12">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Why <span className="text-primary">Choose Us</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark ? 'bg-gray-900 border border-gray-800 hover:border-primary/50' : 'bg-white border border-gray-200 hover:border-primary/50 shadow-lg'
                }`}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-primary text-xl" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location Section */}
      <div className="container-custom py-12">
        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-primary text-xl" />
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Visit Us</h3>
              </div>
              <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Ashaley Botwe, Accra, Ghana</p>
              <div className="flex items-center gap-2 mt-4">
                <FaClock className="text-primary" />
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mon - Sun: 8:00 AM - 8:00 PM</p>
              </div>
              <Link 
                to="/contact" 
                className="inline-block mt-6 px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-black transition-all duration-300"
              >
                Get Directions
              </Link>
            </div>
            <div className="h-64 md:h-auto">
              <iframe
                title="Eliaan Motors Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127040.65797448746!2d-0.213762!3d5.603717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5!2sAccra%2C%20Ghana!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-custom py-16">
        <div className={`text-center p-12 rounded-3xl ${isDark ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-gray-100 to-white'} border border-primary/20`}>
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to <span className="text-primary">Drive</span> with Us?
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied customers who trust Eliaan Motors for their car rental needs.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Get Started Today</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;