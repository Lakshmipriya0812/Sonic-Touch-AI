import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="mb-3">
                <textarea
                  rows="3"
                  placeholder="Message"
                  className="w-full p-3 border rounded-lg"
                ></textarea>
              </div>
              <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center items-center bg-gray-100 p-6">
            <img
              src="/contact-illustration.svg"
              alt="Contact Illustration"
              className="w-48 mb-3"
            />
            <p className="text-gray-600 text-center">
              Need help? Get in touch with us today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
