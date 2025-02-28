import React from "react";

const About = ({ isAuthenticated }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-lg p-10 relative">
        <div className="w-[250px] h-[250px] bg-gray-200 rounded-lg overflow-hidden float-right ml-6 mb-4">
          <img
            src="path/to/your/logo.png"
            alt="Sonic Touch Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-lato">
          About Us
        </h1>

        <p className="text-xl text-gray-700 font-lato font-semibold mb-6">
          Helping people shop independently through the power of voice.
        </p>

        <p className="text-lg text-gray-600 mb-6 font-lato flex-1">
          At Sonic Touch, we believe shopping should be accessible to everyone,
          regardless of ability. We’ve created a fully voice-controlled
          e-commerce platform designed specifically for visually impaired users.
          With just your voice, you can browse, select, and purchase products
          with ease—no touch or screen interaction needed.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6 font-lato font-semibold">
          <li>"Find me a new phone."</li>
          <li>"Tell me about the Samsung Galaxy."</li>
          <li>"Add this to my cart."</li>
        </ul>
        <div className="clear-right"></div>

        <p className="text-lg text-gray-600 mb-6 font-lato">
          Our platform is designed for effortless navigation, providing
          personalized recommendations and secure, voice-confirmed checkouts.
          Accessibility is at the core of everything we do.
        </p>
        <p className="text-lg text-gray-600 mb-6 font-lato">
          As technology evolves, we continue to enhance our platform's
          functionality, ensuring that all users—regardless of their
          challenges—have access to a seamless shopping experience.
        </p>
        <p className="text-lg text-gray-600 mb-6 font-lato">
          Our commitment to accessibility extends beyond just our platform. We
          strive to ensure that all our users feel confident and empowered as
          they navigate through the digital world. With voice-activated
          commands, a truly personalized experience awaits every customer.
        </p>
      </div>
    </div>
  );
};

export default About;
