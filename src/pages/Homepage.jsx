import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import Footer from '../components/common/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Homepage;