import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/voice.json";

const Home = ({ isAuthenticated, handleLogout }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Voice-Enabled Shopping",
      description: "Navigate and shop using natural voice commands",
      icon: "🎙️",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "AI-Powered Assistant",
      description: "Intelligent product recommendations and support",
      icon: "🤖",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Accessibility First",
      description: "Designed for inclusive shopping experience",
      icon: "♿",
      color: "from-green-500 to-blue-600"
    }
  ];



  const techStack = [
    { name: "React", icon: "⚛️", color: "bg-blue-500" },
    { 
      name: "Node.js", 
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.368,1.359 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.604 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,1.881-1.233 c1.537,0,2.511,0.389,2.711,1.493c0.024,0.139,0.152,0.237,0.292,0.237h1.141c0.07,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
        </svg>
      ), 
      color: "bg-green-500" 
    },
    { 
      name: "MongoDB", 
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.9 2.673c-.594-.02-1.155.299-1.47.837-1.056 1.828-2.09 3.663-3.18 5.47-.375.626-.75 1.25-1.124 1.874-.374-.625-.748-1.25-1.123-1.875-1.09-1.808-2.124-3.643-3.18-5.47-.315-.538-.876-.857-1.47-.837-.594.02-1.155.299-1.47.837C1.5 4.36 1.5 6.18 1.5 8v8c0 1.82 0 3.64.837 5.49.315.538.876.857 1.47.837.594-.02 1.155-.299 1.47-.837 1.056-1.828 2.09-3.663 3.18-5.47.375-.626.75-1.25 1.124-1.874.374.625.748 1.25 1.123 1.875 1.09 1.808 2.124 3.643 3.18 5.47.315.538.876.857 1.47.837.594-.02 1.155-.299 1.47-.837C22.5 19.64 22.5 17.82 22.5 16V8c0-1.82 0-3.64-.837-5.49-.315-.538-.876-.857-1.47-.837z"/>
        </svg>
      ), 
      color: "bg-green-600" 
    },
    { name: "Rasa AI", icon: "🤖", color: "bg-purple-500" },
    { name: "Docker", icon: "🐳", color: "bg-blue-600" },
    { name: "Tailwind", icon: "🎨", color: "bg-cyan-500" }
  ];

  const stats = [
    { number: "500+", label: "Products" },
    { number: "20+", label: "Categories" },
    { number: "24/7", label: "AI Support" },
    { number: "99%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen relative pt-24">
      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1708724195876-1156245fce21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          filter: "brightness(1) contrast(1.05)"
        }}
      ></div>
      
      {/* Overlay */}
      <div className="fixed inset-0 w-full h-full bg-white/60 z-10 pointer-events-none"></div>
      
            
      {/* Content */}
      <div className="relative z-30">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  Sonic Touch
                </h1>
                <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                  The Future of <span className="font-semibold text-blue-600">Voice-Enabled</span> E-commerce
                </p>
                <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
                  Experience shopping like never before with AI-powered voice navigation, 
                  intelligent recommendations, and accessibility-first design.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link
                  to="/clothing"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="relative z-10">Start Shopping</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full text-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              {/* Hero Animation */}
              <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/90 rounded-2xl p-8 shadow-2xl">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="w-full h-64"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose <span className="text-blue-600">Sonic Touch</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the next generation of e-commerce with cutting-edge technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    currentFeature === index ? 'scale-105' : 'scale-100'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-white/90 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className={`text-6xl mb-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Showcase Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Explore Our <span className="text-blue-600">Collections</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From fashion to pet essentials, discover everything you need
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Women's Fashion */}
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=center"
                    alt="Women's Fashion"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Women's Fashion</h3>
                    <p className="text-white/90 mb-4">Elegant styles for every occasion</p>
                    <Link
                      to="/clothing/women"
                      className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg text-white font-semibold hover:bg-white/30 transition-all duration-300"
                    >
                      Explore Collection →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Men's Fashion */}
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=center"
                    alt="Men's Fashion"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Men's Fashion</h3>
                    <p className="text-white/90 mb-4">Sophisticated styles for modern men</p>
                    <Link
                      to="/clothing/men"
                      className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg text-white font-semibold hover:bg-white/30 transition-all duration-300"
                    >
                      Explore Collection →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pet Essentials */}
              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=800&fit=crop&crop=center"
                    alt="Pet Essentials"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Pet Essentials</h3>
                    <p className="text-white/90 mb-4">Everything your pets need and love</p>
                    <Link
                      to="/pets"
                      className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg text-white font-semibold hover:bg-white/30 transition-all duration-300"
                    >
                      Explore Collection →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built with <span className="text-blue-600">Modern Tech</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cutting-edge technologies powering the future of e-commerce
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="group text-center"
                >
                  <div className={`w-20 h-20 ${tech.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice AI Showcase */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Experience <span className="text-purple-600">Voice AI</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Navigate, search, and shop using natural voice commands
              </p>
            </div>

            <div className="bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Try These Voice Commands:
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Show me women's clothing",
                      "Navigate to men's fashion",
                      "Take me to pet supplies",
                      "Help me find contact info"
                    ].map((command, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50/80 rounded-lg">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{command}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link
                      to="/clothing"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Start Voice Shopping →
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center">
                    <div className="text-6xl mb-4">🎙️</div>
                    <h4 className="text-xl font-semibold mb-2">Voice Assistant Active</h4>
                    <p className="text-purple-100">Microphone Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of customers who are already enjoying voice-enabled shopping
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/clothing"
                className="px-8 py-4 bg-white text-blue-600 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Shopping Now
              </Link>
              <Link
                to="/signup"
                className="px-8 py-4 border-2 border-white text-white rounded-full text-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Logout Button for Authenticated Users */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
