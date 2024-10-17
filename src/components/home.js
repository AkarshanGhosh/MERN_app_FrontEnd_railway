import React, { useEffect, useState } from 'react';

const Home = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-grow relative">
        <div className="w-full max-w-md bg-blue-100 p-8 rounded-2xl shadow-lg relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Home</h2>
            {/* Install Button for PWA */}
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
              >
                Install App
              </button>
            )}
          </div>
          <p className="text-center text-gray-700">Login to access</p>
        </div>
      </div>
      <footer className="bg-gray-800 p-4 text-center text-gray-300 rounded-t-2xl">
        <p>&copy; 2024 Akarshan Ghosh</p>
        <p className="text-sm md:text-base">Phone: +91 .....</p>
        <p className="text-sm md:text-base">Email: akarshanghosh28@gmail.com</p>
      </footer>
    </div>
  );
};

export default Home;
