// components/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-blue-100 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Contact Us</h2>
        <p className="text-center text-gray-700">If you have any issue related to website, feel free to reach out!</p>
        <form method="POST" action="https://api.web3forms.com/submit" className="mt-4 space-y-4">
          <input type="hidden" name="access_key" value="1df7a326-7688-4684-8ab1-2428b76e40b2" />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            required
            name="name"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            required
            name="email"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            rows="4"
            required
            name="message"
          />
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
