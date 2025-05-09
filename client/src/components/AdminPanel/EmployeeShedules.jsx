import React, { useState, useEffect } from "react";
import { Calendar, User, Filter } from "lucide-react";
import dayjs from "dayjs";

const EmployeeSchedules = () => {
  const [employeeType, setEmployeeType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees when category changes
  const fetchEmployees = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/user/by-role?role=${category}`);
      const data = await response.json();

      if (!data.success || !data.users) {
        setError(data.message || "Failed to fetch employees");
        setEmployees([]);
        return;
      }

      const employeesList = data.users.map((user) => ({
        fullName: user.name || user.fullName,
        userId: user.userId,
      }));

      setEmployees(employeesList || []);
    } catch (error) {
      setError("Failed to fetch employees: " + error.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee details (working preferences)
  const fetchEmployeeDetails = async (employeeType, employeeId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/employee/${employeeType}/${employeeId}`);
      const data = await response.json();

      if (data.success && data.employee) {
        setEmployeeDetails(data.employee);
      } else {
        setError("Failed to load employee details.");
        setEmployeeDetails(null);
      }
    } catch (error) {
      setError("Error fetching employee details: " + error.message);
      setEmployeeDetails(null);
    }
  };

  // Fetch schedule for selected employee
  const fetchSchedule = async (employee) => {
    setSelectedEmployee(employee);
    setLoading(true);
    try {
      const apiUrl = `http://localhost:4000/api/schedule/${employeeType}/${employee.userId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success && data.schedules) {
        setSchedule(data.schedules);
      } else {
        setSchedule([]);
        setError("Failed to load schedule data.");
      }

      // Fetch employee details
      await fetchEmployeeDetails(employeeType, employee.userId);
    } catch (error) {
      setSchedule([]);
      setError("Error fetching schedule: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setEmployeeType(category);
    setEmployees([]);
    setSelectedEmployee(null);
    setSchedule([]);
    setEmployeeDetails(null);
    setError(null);
    if (category) {
      fetchEmployees(category);
    }
  };

  // Generate a 5-week schedule structure with 7 columns and 24-hour rows
  const generateScheduleStructure = () => {
    const details = employeeDetails || {};
    const weeks = [];
    // Define 24-hour time slots in 2-hour intervals
    const timeSlots = [
      "0:00-2:00",
      "2:00-4:00",
      "4:00-6:00",
      "6:00-8:00",
      "8:00-10:00",
      "10:00-12:00",
      "12:00-14:00",
      "14:00-16:00",
      "16:00-18:00",
      "18:00-20:00",
      "20:00-22:00",
      "22:00-0:00",
    ];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let workingDays = [];
    let workingTimeSlots = [];
    if (employeeType === "Doctor") {
      workingDays = details.availableDate || [];
      // Normalize workingTimeSlots to match timeSlots format
      workingTimeSlots = (details.availableWorkingHours || []).map(slot => {
        const [start, end] = slot.split(" - ").map(time => {
          const [hour, minute] = time.split(":");
          const normalizedHour = parseInt(hour, 10);
          const adjustedHour = normalizedHour === 24 ? 0 : normalizedHour;
          return `${adjustedHour}:${minute}`;
        });
        return `${start}-${end}`;
      });
    } else if (employeeType === "Nurse" || employeeType === "Caregiver") {
      workingDays = details.preferredWorkingDays || [];
      // Use availableShifts to determine workingTimeSlots
      const shiftType = details.availableShifts || "Full-Time";
      switch (shiftType) {
        case "Day Shift (8:00 AM - 8:00 PM)":
        case "Day Shift":
          workingTimeSlots = [
            "8:00-10:00", "10:00-12:00", "12:00-14:00",
            "14:00-16:00", "16:00-18:00", "18:00-20:00",
          ];
          break;
        case "Night Shift (8:00 PM - 8:00 AM)":
        case "Night Shift":
          workingTimeSlots = [
            "20:00-22:00", "22:00-0:00", "0:00-2:00",
            "2:00-4:00", "4:00-6:00", "6:00-8:00",
          ];
          break;
        case "Full-Time (24-hour availability)":
        case "Full-Time":
          workingTimeSlots = timeSlots;
          break;
        case "Part-Time (Custom time slots)":
        case "Part-Time":
          workingTimeSlots = details.preferredTimeSlots || timeSlots;
          break;
        default:
          workingTimeSlots = timeSlots; // Default to Full-Time if shift type is invalid
      }
    }

    // Set current date to Thursday, May 8, 2025
    const currentDate = dayjs("2025-05-08");
    const startOfCurrentWeek = currentDate.startOf("week").add(1, "day"); // Monday of current week (May 5, 2025)
    const endOfCurrentWeek = currentDate.endOf("week");
    const nextWeekStart = endOfCurrentWeek.add(1, "day").startOf("week").add(1, "day");
    const baseDate = currentDate.isAfter(endOfCurrentWeek) ? nextWeekStart : startOfCurrentWeek;

    for (let week = 0; week < 5; week++) {
      const weekStart = baseDate.add(week * 7, "day");
      const weekData = [];

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const currentDay = weekStart.add(dayIndex, "day");
        const formattedDate = currentDay.format("D MMM"); // e.g., "5 May"
        const dayName = daysOfWeek[dayIndex];

        const day = {
          date: currentDay.format("YYYY-MM-DD"),
          dayName,
          displayDate: formattedDate,
          isToday: currentDay.isSame(currentDate, "day"),
          slots: timeSlots.map((timeSlot) => ({
            timeSlot,
            status: workingDays.includes(dayName) && workingTimeSlots.includes(timeSlot) ? "Available" : "Unassigned",
            booked: false,
          })),
        };
        weekData.push(day);
      }
      weeks.push(weekData);
    }

    return { weeks, timeSlots };
  };

  // Process the schedule data to fill in the schedule structure
  const processScheduleData = () => {
    const { weeks, timeSlots } = generateScheduleStructure();

    schedule.forEach((slot) => {
      const slotDate = dayjs(slot.date).format("YYYY-MM-DD");
      weeks.forEach((week) => {
        const day = week.find((d) => d.date === slotDate);
        if (day) {
          const slotIndex = day.slots.findIndex((s) => s.timeSlot === slot.timeSlot);
          if (slotIndex !== -1) {
            day.slots[slotIndex] = {
              ...day.slots[slotIndex],
              ...slot,
              status: "Scheduled",
              booked: true,
            };
          }
        }
      });
    });

    return { weeks, timeSlots };
  };

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

        <div className="grid grid-cols-1 gap-4">
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
                <h3
                  className={`font-semibold text-lg ${
                    selectedEmployee?.userId === employee.userId ? "text-white" : "text-gray-800"
                  }`}
                >
                  {employee.fullName}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    selectedEmployee?.userId === employee.userId ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  Click to view schedule
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Display - 5-Week View */}
      {selectedEmployee && employeeDetails && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Calendar size={24} className="mr-2 text-blue-600" />
              5-Week Schedule for {selectedEmployee.fullName}
            </h2>
          </div>

          {generateScheduleStructure().weeks.length > 0 ? (
            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
              {(() => {
                const { weeks, timeSlots } = processScheduleData();

                return (
                  <div className="mb-8">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Week {weekIndex + 1}</h3>

                        <table className="min-w-full border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50 sticky top-0">
                              <th className="py-2 px-3 border-b border-r text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                              </th>
                              {week.map((day) => (
                                <th
                                  key={day.dayName}
                                  className={`py-2 px-3 border-b border-r text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${day.isToday ? "bg-yellow-200" : ""}`}
                                >
                                  {day.dayName} <br /> <span className="text-sm">{day.displayDate}</span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {timeSlots.map((timeSlot, rowIndex) => (
                              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="py-2 px-3 border-b border-r text-sm font-medium text-gray-900">
                                  {timeSlot}
                                </td>
                                {week.map((day) => {
                                  const slot = day.slots.find((s) => s.timeSlot === timeSlot);
                                  return (
                                    <td
                                      key={day.dayName}
                                      className="py-2 px-3 border-b border-r text-center"
                                    >
                                      {slot.status === "Available" && !slot.booked ? (
                                        <div
                                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                                        >
                                          <div className="w-2 h-2 rounded-full mr-1 bg-green-500"></div>
                                          Available
                                        </div>
                                      ) : slot.status === "Scheduled" || slot.booked ? (
                                        <div
                                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"
                                        >
                                          <div className="w-2 h-2 rounded-full mr-1 bg-red-500"></div>
                                          Scheduled
                                        </div>
                                      ) : (
                                        <div
                                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600 border border-gray-300"
                                        >
                                          <div className="w-2 h-2 rounded-full mr-1 bg-gray-400"></div>
                                          Unassigned
                                        </div>
                                      )}
                                    </td>
                                  );
                                })}
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