
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function ReminderSettings() {
//   const [reminder, setReminder] = useState(null);
//   const [reminderEnabled, setReminderEnabled] = useState(false);
//   const [reminderDate, setReminderDate] = useState('');
//   const [reminderTime, setReminderTime] = useState('09:00');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem('userId');
//     setUserId(storedUserId);

//     if (storedUserId) {
//       axios.get(`http://localhost:1000/api/reminders/user/${storedUserId}`)
//         .then(response => {
//           setReminder(response.data);
//           if (response.data) {
//             setReminderEnabled(response.data.reminderEnabled);
//             setReminderDate(response.data.reminderDate);
//             setReminderTime(response.data.reminderTime);
//           }
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching reminder:', error);
//           setError('Error fetching reminder');
//           setLoading(false);
//         });
//     }
//   }, []);

//   const handleReminderChange = (e) => {
//     setReminderEnabled(e.target.checked);
//   };

//   const handleReminderDateChange = (e) => {
//     setReminderDate(e.target.value);
//   };

//   const handleReminderTimeChange = (e) => {
//     setReminderTime(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (!userId) {
//       console.error('User ID is not available.');
//       return;
//     }

//     const updatedReminder = {
//       reminderEnabled,
//       daysBefore: 1, // Default value as 1
//       reminderDate: new Date(reminderDate).toISOString().split('T')[0], // Ensure YYYY-MM-DD
//       reminderTime: reminderTime // Ensure HH:mm
//     };

//     axios.post(`http://localhost:1000/api/reminders/user/${userId}`, updatedReminder)
//       .then(response => {
//         setReminder(response.data);
//         Swal.fire({
//           title: 'Success!',
//           text: 'Reminder updated successfully',
//           icon: 'success',
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#3085d6',
//           backdrop: true,
//           timer: 3000,
//         });
//       })
//       .catch(error => {
//         console.error('Error updating reminder:', error);
//         Swal.fire({
//           title: 'Error!',
//           text: 'Error updating reminder',
//           icon: 'error',
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#d33',
//           backdrop: true,
//         });
//       });
//   };

//   return (
//     <div className="container mx-auto px-4 py-6 md:px-8 md:py-12 mt-16">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Reminder Settings</h1>

//       {loading && <p className="text-gray-500">Loading...</p>}

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//         {reminder ? (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Current Reminder</h2>
//             <p><strong>Reminder Enabled:</strong> {reminder.reminderEnabled ? 'Yes' : 'No'}</p>
//             <p><strong>Reminder Date:</strong> {reminder.reminderDate}</p>
//             <p><strong>Reminder Time:</strong> {reminder.reminderTime}</p>
//             <button
//               onClick={() => setReminder(null)}
//               className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//             >
//               Clear Reminder
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="text-xl font-semibold mb-4 text-gray-700">Set a New Reminder</h2>
//             <div className="flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 checked={reminderEnabled}
//                 onChange={handleReminderChange}
//                 id="reminderEnabled"
//                 className="form-checkbox h-4 w-4 text-teal-600"
//               />
//               <label htmlFor="reminderEnabled" className="ml-2 text-gray-600">Enable Reminder</label>
//             </div>
//             <div className="mb-4">
//               <label htmlFor="reminderDate" className="block text-gray-700">Reminder Date:</label>
//               <input
//                 type="date"
//                 id="reminderDate"
//                 value={reminderDate}
//                 onChange={handleReminderDateChange}
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="reminderTime" className="block text-gray-700">Reminder Time:</label>
//               <input
//                 type="time"
//                 id="reminderTime"
//                 value={reminderTime}
//                 onChange={handleReminderTimeChange}
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               />
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             >
//               Save Reminder
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ReminderSettings;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ReminderSettings() {
  const [reminder, setReminder] = useState(null);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [reminderExists, setReminderExists] = useState(false); // New state to track reminder existence

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);

    if (storedUserId) {
      axios.get(`http://localhost:1000/api/reminders/user/${storedUserId}`)
        .then(response => {
          if (response.data) {
            setReminder(response.data);
            setReminderExists(true); // Reminder exists
            setReminderEnabled(response.data.reminderEnabled);
            setReminderDate(response.data.reminderDate);
            setReminderTime(response.data.reminderTime);
          } else {
            setReminderExists(false); // No reminder data
            setReminder(null);
          }
          setLoading(false);
        })
        .catch(error => {
          // Handle error without setting error state
          console.error('Error fetching reminder:', error);
          setLoading(false);
        });
    }
  }, []);

  const handleReminderChange = (e) => {
    setReminderEnabled(e.target.checked);
  };

  const handleReminderDateChange = (e) => {
    setReminderDate(e.target.value);
  };

  const handleReminderTimeChange = (e) => {
    setReminderTime(e.target.value);
  };

  const handleSubmit = () => {
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    const updatedReminder = {
      reminderEnabled,
      daysBefore: 1, // Default value as 1
      reminderDate: new Date(reminderDate).toISOString().split('T')[0], // Ensure YYYY-MM-DD
      reminderTime: reminderTime // Ensure HH:mm
    };

    axios.post(`http://localhost:1000/api/reminders/user/${userId}`, updatedReminder)
      .then(response => {
        setReminder(response.data);
        Swal.fire({
          title: 'Success!',
          text: 'Reminder updated successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          backdrop: true,
          timer: 3000,
        });
      })
      .catch(error => {
        console.error('Error updating reminder:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Error updating reminder',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
          backdrop: true,
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-8 md:py-12 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reminder Settings</h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Show error message only if an error occurred during fetching */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        {reminderExists ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Current Reminder</h2>
            <p><strong>Reminder Enabled:</strong> {reminder.reminderEnabled ? 'Yes' : 'No'}</p>
            <p><strong>Reminder Date:</strong> {reminder.reminderDate}</p>
            <p><strong>Reminder Time:</strong> {reminder.reminderTime}</p>
            <button
              onClick={() => setReminder(null)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clear Reminder
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Set a New Reminder</h2>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={handleReminderChange}
                id="reminderEnabled"
                className="form-checkbox h-4 w-4 text-teal-600"
              />
              <label htmlFor="reminderEnabled" className="ml-2 text-gray-600">Enable Reminder</label>
            </div>
            <div className="mb-4">
              <label htmlFor="reminderDate" className="block text-gray-700">Reminder Date:</label>
              <input
                type="date"
                id="reminderDate"
                value={reminderDate}
                onChange={handleReminderDateChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reminderTime" className="block text-gray-700">Reminder Time:</label>
              <input
                type="time"
                id="reminderTime"
                value={reminderTime}
                onChange={handleReminderTimeChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Save Reminder
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ReminderSettings;
