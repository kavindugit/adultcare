import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

<div>
          <label className="block text-sm font-medium text-gray-700">Session Phone No</label>

            <input
            name="sessionPhoneNo"
            value={formData.sessionPhoneNo}
            onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,10}$/.test(input)) {
                handleChange(e); // only update if input has 0–10 digits
                }
            }}
            type="text"
            inputMode="numeric"
            pattern="\d{10}"
            required
            maxLength={10}
            placeholder="Enter 10-digit number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
        </div>

export default NotFound;
