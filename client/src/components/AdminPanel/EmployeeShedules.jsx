import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Filter } from "lucide-react";
import dayjs from "dayjs";

const EmployeeSchedules = () => {
  const [employeeType, setEmployeeType] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees when category changes
  const fetchEmployees = async (category) => {
    setLoading(true);
    setError(null);
    try {
      // Use the correct API endpoint with query parameter
      const response = await fetch(`http://localhost:4000/api/user/by-role?role=${category}`);
      const data = await response.json();
     
      if (!data.success || !data.users) {
        console.error("API returned error:", data.message);
        setError(data.message || "Failed to fetch employees");
        setEmployees([]);
        setLoading(false);
        return;
      }
     
      // Extract only the required fields (fullName and userId)
      const employeesList = data.users.map(user => ({
        fullName: user.fullName || user.name, // Account for both name formats
        userId: user.userId
      }));
     
      setEmployees(employeesList || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees: " + error.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch schedule for selected employee
  const fetchSchedule = async (employee) => {
    setSelectedEmployee(employee);
    setLoading(true);
    try {
      let apiUrl = `http://localhost:4000/api/schedule/${employeeType}/${employee.userId}`;
      
      // Add time filter if it's not "all"
      if (timeFilter !== "all") {
        apiUrl += `?filter=${timeFilter}`;
      }
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.success && data.schedules) {
        setSchedule(data.schedules);
      } else {
        setSchedule([]);
        setError("Failed to load schedule data.");
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setSchedule([]);
      setError("Error fetching schedule: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle time filter changes
  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
    if (selectedEmployee) {
      fetchSchedule(selectedEmployee);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setEmployeeType(category);
    setEmployees([]);
    setSelectedEmployee(null);
    setSchedule([]);
    setError(null);
    if (category) {
      fetchEmployees(category);
    }
  };

  // Generate a 5-week schedule structure
  const generateScheduleStructure = () => {
    const days = [];
    const timeSlots = [
      "8:00 AM - 10:00 AM",
      "10:00 AM - 12:00 PM", 
      "12:00 PM - 2:00 PM",
      "2:00 PM - 4:00 PM",
      "4:00 PM - 6:00 PM"
    ];
    
    const today = dayjs().startOf('day');
    
    // Generate 35 days (5 weeks)
    for (let i = 0; i < 35; i++) {
      const currentDay = today.add(i, 'day');
      const formattedDate = currentDay.format("YYYY-MM-DD");
      const dayName = currentDay.format("ddd");
      const dayNumber = currentDay.format("D");
      const monthName = currentDay.format("MMM");
      
      // Create day object with empty slots
      const day = {
        date: formattedDate,
        display: `${dayName}, ${monthName} ${dayNumber}`,
        slots: timeSlots.map(timeSlot => ({
          timeSlot,
          status: "Available", // Default status
          booked: false
        }))
      };
      
      days.push(day);
    }

    return { days, timeSlots };
  };

  // Process the schedule data to fill in the schedule structure
  const processScheduleData = () => {
    const { days, timeSlots } = generateScheduleStructure();
    
    // Update days with actual schedule data
    schedule.forEach(slot => {
      const dayIndex = days.findIndex(day => day.date === slot.date);
      if (dayIndex !== -1) {
        const slotIndex = days[dayIndex].slots.findIndex(s => s.timeSlot === slot.timeSlot);
        if (slotIndex !== -1) {
          days[dayIndex].slots[slotIndex] = {
            ...days[dayIndex].slots[slotIndex],
            ...slot,
            booked: slot.status !== "Available"
          };
        }
      }
    });
    
    // Group days by week for easier rendering
    const weeks = [];
    for (let i = 0; i < 5; i++) {
      weeks.push(days.slice(i * 7, (i + 1) * 7));
    }
    
    return { weeks, timeSlots };
  };

  // Group schedule by date for better display (original grouping logic kept for reference)
  const groupedSchedule = schedule.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Employee Schedule Management</h1>
        <p className="text-gray-600 mt-2">View and manage employee schedules</p>
      </div>
      
      {/* Filter Controls */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Filter size={18} className="mr-2 text-blue-600" />
          Schedule Filters
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee Category</label>
            <select
              value={employeeType}
              onChange={handleCategoryChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select Category --</option>
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
              <option value="Caregiver">Caregiver</option>
            </select>
          </div>
          
          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Filter</label>
            <select
              value={timeFilter}
              onChange={handleTimeFilterChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!employeeType}
            >
              <option value="all">All Time Slots</option>
              <option value="available">Available Only</option>
              <option value="booked">Booked Only</option>
              <option value="morning">Morning (8AM-12PM)</option>
              <option value="afternoon">Afternoon (12PM-6PM)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Employee List */}
      {employees.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <User size={20} className="mr-2" />
            {employeeType}s Available ({employees.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <div
                key={employee.userId}
                onClick={() => fetchSchedule(employee)}
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                  selectedEmployee?.userId === employee.userId
                    ? "bg-blue-500 border-blue-700 text-white"
                    : "bg-white border-blue-300 hover:bg-blue-50"
                }`}
              >
                <h3 className={`font-semibold text-lg ${selectedEmployee?.userId === employee.userId ? "text-white" : "text-gray-800"}`}>
                  {employee.fullName}
                </h3>
                <p className={`text-sm mt-1 ${selectedEmployee?.userId === employee.userId ? "text-blue-100" : "text-gray-500"}`}>
                  Click to view schedule
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Schedule Display - 5-Week View */}
      {selectedEmployee && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Calendar size={24} className="mr-2 text-blue-600" />
              5-Week Schedule for {selectedEmployee.fullName}
            </h2>
          </div>
          
          {schedule.length > 0 ? (
            <div className="overflow-x-auto">
              {(() => {
                const { weeks, timeSlots } = processScheduleData();
                
                return (
                  <div className="mb-8">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Week {weekIndex + 1}</h3>
                        
                        <table className="min-w-full border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-2 px-3 border-b border-r text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                Date
                              </th>
                              {timeSlots.map((slot, slotIndex) => (
                                <th key={slotIndex} className="py-2 px-3 border-b border-r text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {slot}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {week.map((day, dayIndex) => (
                              <tr key={dayIndex} className={dayIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="py-2 px-3 border-b border-r text-sm font-medium text-gray-900">
                                  {day.display}
                                </td>
                                {day.slots.map((slot, slotIndex) => (
                                  <td key={slotIndex} className="py-2 px-3 border-b border-r text-center">
                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      slot.booked 
                                        ? "bg-red-100 text-red-800 border border-red-200" 
                                        : "bg-green-100 text-green-800 border border-green-200"
                                    }`}>
                                      <div className={`w-2 h-2 rounded-full mr-1 ${
                                        slot.booked ? "bg-red-500" : "bg-green-500"
                                      }`}></div>
                                      {slot.booked ? "Booked" : "Available"}
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-40" />
              <p>No schedule information available for this employee</p>
            </div>
          )}
        </div>
      )}
      
      {/* Empty state when no category selected */}
      {!employeeType && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600">Select an employee category to get started</h3>
          <p className="text-gray-500 mt-2">You'll be able to view employee schedules after selection</p>
        </div>
      )}
      
      {/* Empty state when category selected but no employees */}
      {employeeType && employees.length === 0 && !loading && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600">No {employeeType}s found</h3>
          <p className="text-gray-500 mt-2">There are no employees registered with role "{employeeType}"</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default EmployeeSchedules;