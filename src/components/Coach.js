import React, { useEffect } from 'react'; // Import React and useEffect hook
import { useParams } from 'react-router-dom'; // Import useParams for route parameters

const Coach = () => {
  const { coachId } = useParams(); // Get the coach ID from the URL

  useEffect(() => {
    // Hide Navbar when in Coach component
    document.body.classList.add('hide-navbar'); // Add class to hide the Navbar

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('hide-navbar'); // Remove class to show the Navbar
    };
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      <h1>Coach Details for Coach ID: {coachId}</h1>
      
      {/* Separator Line */}
      <div className="border-b-2 border-gray-300 my-4" />

      {/* Table Structure (Empty for Now) */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Temperature</th>
            <th className="border px-4 py-2">Chain Status</th>
            <th className="border px-4 py-2">Latitude</th>
            <th className="border px-4 py-2">Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2"></td> {/* Empty cell for Date */}
            <td className="border px-4 py-2"></td> {/* Empty cell for Time */}
            <td className="border px-4 py-2"></td> {/* Empty cell for Temperature */}
            <td className="border px-4 py-2"></td> {/* Empty cell for Chain Status */}
            <td className="border px-4 py-2"></td> {/* Empty cell for Latitude */}
            <td className="border px-4 py-2"></td> {/* Empty cell for Longitude */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Coach; // Export the Coach component
