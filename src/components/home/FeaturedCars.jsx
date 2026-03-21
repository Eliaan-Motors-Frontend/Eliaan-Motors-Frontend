import { FaStar, FaMapMarkerAlt, FaGasPump, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedCars = () => {
  // Sample featured cars data - replace with actual data from API
  const featuredCars = [
    {
      id: 1,
      name: 'Mercedes Benz C-Class',
      price: 250,
      image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=400',
      rating: 4.8,
      location: 'Airport Residential',
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Petrol',
    },
    {
      id: 2,
      name: 'Toyota Camry',
      price: 150,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      rating: 4.6,
      location: 'East Legon',
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Petrol',
    },
    {
      id: 3,
      name: 'BMW X5',
      price: 350,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      rating: 4.9,
      location: 'Cantonments',
      transmission: 'Automatic',
      seats: 7,
      fuelType: 'Diesel',
    },
    {
      id: 4,
      name: 'Honda CR-V',
      price: 180,
      image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=400',
      rating: 4.7,
      location: 'Tema',
      transmission: 'Automatic',
      seats: 5,
      fuelType: 'Petrol',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Featured <span className="text-primary">Cars</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of premium vehicles at competitive rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-md">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-semibold">{car.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{car.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="text-primary text-xs" />
                  <span>{car.location}</span>
                </div>

                <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaGasPump />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>{car.seats} Seats</span>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {car.transmission}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div>
                    <span className="text-2xl font-bold text-primary">${car.price}</span>
                    <span className="text-gray-500">/day</span>
                  </div>
                  <Link
                    to={`/car/${car.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;