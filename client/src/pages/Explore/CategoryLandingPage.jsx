import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/ecommerce.json";
import { FaTshirt, FaPaw, FaArrowRight, FaStar, FaUsers, FaShippingFast } from "react-icons/fa";

const CategoryLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    {
      id: "clothing",
      title: "Fashion & Style",
      subtitle: "Clothing Collection",
      description: "Discover the latest trends in men's, women's, and children's fashion. From casual wear to formal attire, we've got you covered.",
      icon: FaTshirt,
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      bgGradient: "from-blue-50 to-purple-50",
      buttonColor: "bg-gradient-to-r from-blue-600 to-purple-600",
      hoverColor: "hover:from-blue-700 hover:to-purple-700",
      route: "/clothing",
      features: ["Trending Styles", "Premium Quality", "Fast Delivery"],
      stats: { products: "500+", categories: "20+", brands: "30+" }
    },
    {
      id: "pets",
      title: "Pet Paradise",
      subtitle: "Pet Supplies",
      description: "Everything your furry friends need - from premium food to stylish accessories. Keep your pets happy and healthy.",
      icon: FaPaw,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      bgGradient: "from-green-50 to-emerald-50",
      buttonColor: "bg-gradient-to-r from-green-600 to-emerald-600",
      hoverColor: "hover:from-green-700 hover:to-emerald-700",
      route: "/pets",
      features: ["Premium Food", "Health Products", "Stylish Accessories"],
      stats: { products: "250+", categories: "15+", brands: "10+" }
    }
  ];

  const benefits = [
    {
      icon: FaStar,
      title: "Premium Quality",
      description: "Curated selection of high-quality products"
    },
    {
      icon: FaShippingFast,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep"
    },
    {
      icon: FaUsers,
      title: "Expert Support",
      description: "24/7 customer support for all your needs"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-48 h-48 md:w-64 md:h-64 mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Explore Categories
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products across our carefully curated categories. 
            <span className="font-semibold text-blue-600"> Start your shopping journey today!</span>
          </p>
        </div>

        {/* Categories Grid */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                hoveredCard === category.id ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
                             {/* Card Background */}
               <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500`}></div>
               
               {/* Card Content */}
               <div className="relative bg-white/90 rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h2>
                
                <p className={`text-lg font-semibold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent mb-4`}>
                  {category.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {category.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {Object.entries(category.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{key}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to={category.route}
                  className={`inline-flex items-center justify-center w-full ${category.buttonColor} ${category.hoverColor} text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl`}
                >
                  Explore {category.subtitle}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Choose <span className="text-blue-600">Sonic Touch</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
                             <div
                 key={index}
                 className="group p-6 rounded-2xl bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
               >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryLandingPage;
