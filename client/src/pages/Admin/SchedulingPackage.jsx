import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const SchedulingPackage = () => {
  const { requestId } = useParams();
  const { state } = useLocation();
  const { packageId, adultId, guardianId } = state || {};

  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [employeeType, setEmployeeType] = useState("Doctor");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [employeeSchedule, setEmployeeSchedule] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState("");

  const timeSlotOptions = [
    "8:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
  ];

  useEffect(() => {
    fetchEmployees();
  }, [employeeType]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`http://localhost:4000/api/user/by-role?role=${employeeType}`, {
        withCredentials: true,
      });
      setEmployees(response.data.users || []);
    } catch (err) {
      setError("Failed to fetch employees: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeDetails = async (empId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/employee/${employeeType}/${empId}`, {
        withCredentials: true,
      });
      if (response.data.success && response.data.employee) {
        setEmployeeDetails(response.data.employee);
      } else {
        setScheduleError("Failed to load employee details.");
        setEmployeeDetails(null);
      }
    } catch (err) {
      setScheduleError("Error fetching employee details: " + (err.response?.data?.message || err.message));
      setEmployeeDetails(null);
    }
  };

  const fetchEmployeeSchedule = async (empId) => {
    console.log("Fetching schedule for employee:", empId);
    setScheduleLoading(true);
    setScheduleError("");
    try {
      const response = await axios.get(`http://localhost:4000/api/schedule/${employeeType}/${empId}`, {
        withCredentials: true,
      });
      console.log("Schedule response:", response.data);
      setEmployeeSchedule(response.data.schedules || []);
      await fetchEmployeeDetails(empId);
    } catch (err) {
      console.error("Schedule fetch error:", err);
      setScheduleError("Failed to fetch schedule: " + (err.response?.data?.message || err.message));
    } finally {
      setScheduleLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!date || !employeeId || timeSlots.length === 0) {
      setError("Please select a date, an employee, and at least one time slot");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/schedule/create",
        {
          employeeType,
          employeeId,
          adultId,
          date,
          timeSlots,
          status: "Booked",
        },
        { withCredentials: true }
      );

      const { scheduleIds } = response.data;
      const newAssignments = scheduleIds.map(scheduleId => ({
        employeeType,
        employeeId,
        scheduleId,
        date,
        timeSlots,
      }));
      setScheduledSlots(prev => [...prev, ...newAssignments]);
      setTimeSlots([]);
      setError("");
    } catch (err) {
      setError("Failed to create schedule: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!startDate || scheduledSlots.length === 0) {
      setError("Please set a start date and schedule at least one slot");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.put(
        `http://localhost:4000/api/package-requests/assign/${requestId}`,
        {
          startDate,
          assignedEmployees: scheduledSlots.map(slot => ({
            employeeType: slot.employeeType,
            employeeId: slot.employeeId,
            scheduleId: slot.scheduleId,
          })),
        },
        { withCredentials: true }
      );
      alert("Package scheduled successfully!");
      setScheduledSlots([]);
      setStartDate("");
    } catch (err) {
      setError("Failed to assign employees: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const selectedEmployee = employees.find(emp => emp.userId === employeeId) || { userId: employeeId, fullName: employeeId };

  // Generate schedule structure
  const generateScheduleStructure = () => {
    const details = employeeDetails || {};
    const weeks = [];
    const timeSlots = [
      "8:00-10:00",
      "10:00-12:00",
      "12:00-14:00",
      "14:00-16:00",
      "16:00-18:00",
    ];
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let workingDays = [];
    let workingTimeSlots = [];
    console.log("Employee Details:", details);
    if (employeeType === "Doctor") {
      workingDays = details.availableDate || [];
      workingTimeSlots = (details.availableWorkingHours || []).map(slot => {
        const [start, end] = slot.split(" - ").map(time => {
          const [hour, minute] = time.split(":");
          return `${parseInt(hour, 10)}:${minute}`;
        });
        return `${start}-${end}`;
      });
    } else if (employeeType === "Nurse" || employeeType === "Caregiver") {
      workingDays = details.preferredWorkingDays || [];
      workingTimeSlots = details.isPartTime && details.preferredTimeSlots?.length > 0
        ? details.preferredTimeSlots
        : timeSlots;
    }
    console.log("Working Days:", workingDays, "Working Time Slots:", workingTimeSlots);

    const currentDate = dayjs("2025-05-09");
    const startOfCurrentWeek = currentDate.startOf("week").add(1, "day");
    const endOfCurrentWeek = currentDate.endOf("week");
    const baseDate = currentDate.isAfter(endOfCurrentWeek) ? endOfCurrentWeek.add(1, "day").startOf("week").add(1, "day") : startOfCurrentWeek;

    for (let week = 0; week < 5; week++) {
      const weekStart = baseDate.add(week * 7, "day");
      const weekData = [];

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const currentDay = weekStart.add(dayIndex, "day");
        const formattedDate = currentDay.format("D MMM");
        const dayName = daysOfWeek[dayIndex];

        const day = {
          date: currentDay.format("YYYY-MM-DD"),
          dayName,
          displayDate: formattedDate,
          isToday: currentDate.isSame(currentDay, "day"),
          slots: timeSlots.map(timeSlot => {
            const isScheduled = employeeSchedule.some(s => 
              dayjs(s.date).isSame(currentDay, "day") && s.timeSlot === timeSlot
            );
            return {
              timeSlot,
              status: isScheduled ? "Scheduled" : (workingDays.includes(dayName) && workingTimeSlots.includes(timeSlot) ? "Available" : "Unassigned"),
              booked: isScheduled,
            };
          }),
        };
        weekData.push(day);
      }
      weeks.push(weekData);
    }

    return { weeks, timeSlots };
  };

  // Process schedule data
  const processScheduleData = () => {
    return generateScheduleStructure();
  };

  if (!requestId || !packageId || !adultId || !guardianId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Missing required data. Please ensure all details are provided.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Scheduling Package (Request ID: {requestId})</h1>
            <p className="text-gray-600 mb-6">
              Guardian ID: {guardianId} | Adult ID: {adultId} | Package ID: {packageId}
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            {loading && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            )}

            {/* Employee Type */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeType">
                Employee Type:
              </label>
              <select
                id="employeeType"
                value={employeeType}
                onChange={e => {
                  setEmployeeType(e.target.value);
                  setEmployeeId("");
                  setShowScheduleModal(false);
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Caregiver">Caregiver</option>
              </select>
            </div>

            {/* Select Employee with Calendar Icon */}
            <div className="mb-6 flex items-center">
              <label className="block text-gray-700 text-sm font-bold mb-2 mr-2" htmlFor="employeeId">
                Select Employee:
              </label>
              <select
                id="employeeId"
                value={employeeId}
                onChange={e => setEmployeeId(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={employees.length === 0}
              >
                <option value="">-- Select Employee --</option>
                {employees.map(emp => (
                  <option key={emp.userId} value={emp.userId}>
                    {emp.name || emp.userId}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (employeeId) {
                    setShowScheduleModal(true);
                    fetchEmployeeSchedule(employeeId);
                  }
                }}
                className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none"
                disabled={!employeeId}
              >
                <Calendar size={16} />
              </button>
            </div>

            {/* Select Date */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Select Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Select Time Slots */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Select Time Slots:</label>
              <div className="grid grid-cols-2 gap-4">
                {timeSlotOptions.map(slot => (
                  <label key={slot} className="flex items-center">
                    <input
                      type="checkbox"
                      value={slot}
                      checked={timeSlots.includes(slot)}
                      onChange={e => setTimeSlots(prev =>
                        e.target.checked ? [...prev, slot] : prev.filter(s => s !== slot)
                      )}
                      className="mr-2 leading-tight"
                    />
                    <span className="text-gray-700">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleSchedule}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-6"
            >
              Schedule Slots
            </button>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Slots ({scheduledSlots.length})</h3>
              {scheduledSlots.length === 0 ? (
                <p className="text-gray-600">No slots scheduled yet.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {scheduledSlots.map((slot, index) => (
                    <li key={index} className="text-gray-700">
                      {slot.employeeType} ({slot.employeeId}) on {slot.date} at {slot.timeSlots.join(", ")} - Schedule ID: {slot.scheduleId}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Package Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={e => {
                  console.log("Selected startDate:", e.target.value); // Debug log
                  setStartDate(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || scheduledSlots.length === 0}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Submit Package Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Employee Schedule */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Schedule for Employee: {selectedEmployee.fullName || selectedEmployee.userId}</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                X
              </button>
            </div>
            {scheduleLoading ? (
              <div className="flex justify-center">
                <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : scheduleError ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {scheduleError}</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="mb-8">
                  {(() => {
                    const { weeks, timeSlots } = processScheduleData();
                    return weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Week {weekIndex + 1}</h3>
                        <table className="min-w-full border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="py-2 px-3 border-b border-r text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                              </th>
                              {week.map((day) => (
                                <th
                                  key={day.dayName}
                                  className={`py-2 px-3 border-b border-r text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${day.isToday ? "bg-yellow-200" : ""}`}
                                >
                                  {day.dayName}<br /><span className="text-sm">{day.displayDate}</span>
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
                                  const slot = day.slots.find(s => s.timeSlot === timeSlot);
                                  return (
                                    <td key={day.dayName} className="py-2 px-3 border-b border-r text-center">
                                      {slot.status === "Available" && !slot.booked ? (
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                          <div className="w-2 h-2 rounded-full mr-1 bg-green-500"></div>
                                          Available
                                        </div>
                                      ) : slot.status === "Scheduled" || slot.booked ? (
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                          <div className="w-2 h-2 rounded-full mr-1 bg-red-500"></div>
                                          Scheduled
                                        </div>
                                      ) : (
                                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600 border border-gray-300">
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
                    ));
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingPackage;