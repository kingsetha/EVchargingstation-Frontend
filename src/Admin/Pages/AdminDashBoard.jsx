

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function AdminDashboard() {
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     totalAmountPaid: 0,
//     newBookings: 0,
//     totalSlots: 0,
//     activeSlots: 0,
//     lastUpdated: ''
//   });

//   const [lineChartData, setLineChartData] = useState({
//     labels: [],
//     datasets: []
//   });

//   const [barChartData, setBarChartData] = useState({
//     labels: ['Available Slots', 'Booked Slots'],
//     datasets: []
//   });

//   const [doughnutChartData, setDoughnutChartData] = useState({
//     labels: ['Active', 'Inactive'],
//     datasets: []
//   });

//   const [admins, setAdmins] = useState([]);
//   const [statistics, setStatistics] = useState({});
//   const [totalUsers, setTotalUsers] = useState('Data not available');
//   const [userStats, setUserStats] = useState({ new: 0, lastWeek: 0, older: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchData = async () => {
//     try {
//       // Fetch data for both dashboards
//       const [dashboardResponse, adminsResponse, statsResponse, totalUsersResponse, userStatsResponse] = await Promise.all([
//         axios.get('http://localhost:1000/api/dashboard/data'),
//         axios.get('http://localhost:1000/superadmin/pending'),
//         axios.get('http://localhost:1000/superadmin/statistics'),
//         axios.get('http://localhost:1000/api/dashboard/data'),
//         axios.get('http://localhost:1000/User/all')
//       ]);

//       const data = dashboardResponse.data;

//       setDashboardData({
//         totalUsers: data.totalUsers,
//         totalAmountPaid: data.totalAmountPaid,
//         newBookings: data.newBookings,
//         totalSlots: data.totalSlots,
//         activeSlots: data.activeSlots,
//         lastUpdated: new Date().toISOString()
//       });

//       setLineChartData({
//         labels: data.lineChartLabels || [],
//         datasets: [{
//           label: 'New Bookings',
//           data: data.lineChartData || [],
//           borderColor: '#1D4ED8',
//           backgroundColor: 'rgba(29, 78, 216, 0.2)',
//           fill: true
//         }]
//       });

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: data.availableSlotsData || [],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: data.bookedSlotsData || [],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [{
//           data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
//           backgroundColor: ['#34D399', '#D1D5DB']
//         }]
//       });

//       // Fetch admin and statistics data
//       const today = new Date();
//       const oneWeekAgo = new Date();
//       oneWeekAgo.setDate(today.getDate() - 7);

//       const newUsers = userStatsResponse.data.filter(user => {
//         const registrationDate = new Date(user.registrationDate);
//         return registrationDate.toDateString() === today.toDateString();
//       }).length;

//       const lastWeekUsers = userStatsResponse.data.filter(user => {
//         const regDate = new Date(user.registrationDate);
//         return regDate >= oneWeekAgo && regDate < today;
//       }).length;

//       const olderUsers = userStatsResponse.data.filter(user => {
//         return new Date(user.registrationDate) < oneWeekAgo;
//       }).length;

//       setAdmins(adminsResponse.data);
//       setStatistics({
//         approved: statsResponse.data.approved || 0,
//         pending: statsResponse.data.pending || 0,
//         rejected: statsResponse.data.rejected || 0
//       });
//       setTotalUsers(totalUsersResponse.data.totalUsers || 'Data not available');
//       setUserStats({ new: newUsers, lastWeek: lastWeekUsers, older: olderUsers });
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching data:', err.response ? err.response.data : err.message);
//       setError('Failed to fetch data.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const intervalId = setInterval(() => {
//       fetchData();
//     }, 30000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleApprove = async (adminId) => {
//     try {
//       await axios.post(`http://localhost:1000/superadmin/approve/${adminId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Approved',
//         text: 'The request has been approved!',
//         timer: 2000,
//         showConfirmButton: false
//       });
//       setAdmins(admins.filter(admin => admin.id !== adminId));
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to approve the request.',
//       });
//     }
//   };

//   const handleReject = async (adminId) => {
//     try {
//       await axios.post(`http://localhost:1000/superadmin/reject/${adminId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Rejected',
//         text: 'The request has been rejected!',
//         timer: 2000,
//         showConfirmButton: false
//       });
//       setAdmins(admins.filter(admin => admin.id !== adminId));
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to reject the request.',
//       });
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen p-8 pt-20 bg-gray-100">
//       <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-4xl font-bold text-teal-900 mb-6">Admin Dashboard</h1>
//         {error && <p className="text-red-500 text-center mb-4 text-lg font-semibold">{error}</p>}

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//   {[
//     { title: 'Total Users', value: dashboardData.totalUsers, bgColor: 'bg-teal-900' },
//     { title: 'Total Amount Paid', value: `$${dashboardData.totalAmountPaid.toLocaleString()}`, bgColor: 'bg-teal-700' },
//     { title: 'New Bookings', value: dashboardData.newBookings, bgColor: 'bg-teal-600' },
//     { title: 'Total Slots', value: dashboardData.totalSlots, bgColor: 'bg-teal-500' },
//     { title: 'Active Slots', value: dashboardData.activeSlots, bgColor: 'bg-teal-400' },
//     { title: 'Last Updated', value: new Date(dashboardData.lastUpdated).toLocaleString(), bgColor: 'bg-teal-300' }
//   ].map((card, index) => (
//     <div key={index} className={`${card.bgColor} text-white p-4 rounded-lg shadow-lg border border-gray-300`}>
//       <h2 className="text-lg font-semibold">{card.title}</h2>
//       <p className="text-xl font-bold">{card.value}</p>
//     </div>
//   ))}
// </div>


//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="rounded-lg shadow-lg p-4 border border-teal-300 bg-white">
//             <h2 className="text-xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
//             <Line
//               data={lineChartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (tooltipItem) {
//                         return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                       }
//                     }
//                   }
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: 'Date'
//                     }
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: 'Count'
//                     },
//                     beginAtZero: true
//                   }
//                 }
//               }}
//             />
//           </div>

//           <div className="rounded-lg shadow-lg p-4 border border-teal-300 bg-white">
//             <h2 className="text-xl font-semibold text-teal-800 mb-4">Slots Availability Today</h2>
//             <Bar
//               data={barChartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (tooltipItem) {
//                         return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//                       }
//                     }
//                   }
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: 'Slot Type'
//                     }
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: 'Count'
//                     },
//                     beginAtZero: true
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>

//         {/* Statistics Section */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           <div className="bg-teal-800 text-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold">Total Users</h2>
//             <p className="text-2xl font-bold">{totalUsers}</p>
//           </div>
//           <div className="bg-teal-600 text-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold">Approved Requests</h2>
//             <p className="text-2xl font-bold">{statistics.approved || 0}</p>
//           </div>
//           <div className="bg-teal-400 text-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold">Pending Requests</h2>
//             <p className="text-2xl font-bold">{statistics.pending || 0}</p>
//           </div>
//           <div className="bg-teal-300 text-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold">Rejected Requests</h2>
//             <p className="text-2xl font-bold">{statistics.rejected || 0}</p>
//           </div>
//         </div>

//         {/* User Overview Chart */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="col-span-1 rounded-lg shadow-lg p-4 border border-gray-300">
//             <h2 className="text-xl font-semibold text-teal-900 mb-4">Request Overview</h2>
//             <div className="h-64">
//               <Bar
//                 data={{
//                   labels: ['Pending', 'Approved', 'Rejected'],
//                   datasets: [{
//                     label: 'Number of Requests',
//                     data: [statistics.pending || 0, statistics.approved || 0, statistics.rejected || 0],
//                     backgroundColor: ['rgba(50, 115, 220, 0.2)', 'rgba(0, 204, 136, 0.2)', 'rgba(255, 82, 82, 0.2)'],
//                     borderColor: ['rgba(50, 115, 220, 1)', 'rgba(0, 204, 136, 1)', 'rgba(255, 82, 82, 1)'],
//                     borderWidth: 1
//                   }]
//                 }}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: { display: false },
//                     tooltip: {
//                       callbacks: {
//                         label: function(tooltipItem) {
//                           return tooltipItem.label + ': ' + tooltipItem.raw;
//                         }
//                       }
//                     }
//                   },
//                   scales: {
//                     x: { stacked: true },
//                     y: { stacked: true, beginAtZero: true }
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           <div className="col-span-1 rounded-lg shadow-lg p-4 border border-gray-300">
//             <h2 className="text-xl font-semibold text-teal-900 mb-4">User Overview</h2>
//             <div className="h-64">
//               <Bar
//                 data={{
//                   labels: ['New Users', 'Last Week', 'Older Users'],
//                   datasets: [{
//                     label: 'Number of Users',
//                     data: [userStats.new, userStats.lastWeek, userStats.older],
//                     backgroundColor: ['rgba(50, 115, 220, 0.2)', 'rgba(0, 204, 136, 0.2)', 'rgba(255, 82, 82, 0.2)'],
//                     borderColor: ['rgba(50, 115, 220, 1)', 'rgba(0, 204, 136, 1)', 'rgba(255, 82, 82, 1)'],
//                     borderWidth: 1
//                   }]
//                 }}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: { display: false },
//                     tooltip: {
//                       callbacks: {
//                         label: function(tooltipItem) {
//                           return tooltipItem.label + ': ' + tooltipItem.raw;
//                         }
//                       }
//                     }
//                   },
//                   scales: {
//                     x: { stacked: true },
//                     y: { stacked: true, beginAtZero: true }
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Admin Requests Section */}
//         {/* Add your admin requests section here if needed */}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalAmountPaid: 0,
    newBookings: 0,
    totalSlots: 0,
    activeSlots: 0,
    lastUpdated: ''
  });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: []
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['Available Slots', 'Booked Slots'],
    datasets: []
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ['Active', 'Inactive'],
    datasets: []
  });

  const [admins, setAdmins] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [totalUsers, setTotalUsers] = useState('Data not available');
  const [userStats, setUserStats] = useState({ new: 0, lastWeek: 0, older: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      // Fetch data for both dashboards
      const [dashboardResponse, adminsResponse, statsResponse, totalUsersResponse, userStatsResponse] = await Promise.all([
        axios.get('http://localhost:1000/api/dashboard/data'),
        axios.get('http://localhost:1000/superadmin/pending'),
        axios.get('http://localhost:1000/superadmin/statistics'),
        axios.get('http://localhost:1000/api/dashboard/data'),
        axios.get('http://localhost:1000/User/all')
      ]);

      const data = dashboardResponse.data;

      setDashboardData({
        totalUsers: data.totalUsers || 0,
        totalAmountPaid: data.totalAmountPaid || 0,
        newBookings: data.newBookings || 0,
        totalSlots: data.totalSlots || 0,
        activeSlots: data.activeSlots || 0,
        lastUpdated: new Date().toISOString()
      });

      setLineChartData({
        labels: data.lineChartLabels || [],
        datasets: [{
          label: 'New Bookings',
          data: data.lineChartData || [],
          borderColor: '#1D4ED8',
          backgroundColor: 'rgba(29, 78, 216, 0.2)',
          fill: true
        }]
      });

      setBarChartData({
        labels: ['Available Slots', 'Booked Slots'],
        datasets: [
          {
            label: 'Available Slots',
            data: data.availableSlotsData || [0, 0],
            backgroundColor: '#16A34A'
          },
          {
            label: 'Booked Slots',
            data: data.bookedSlotsData || [0, 0],
            backgroundColor: '#F87171'
          }
        ]
      });

      setDoughnutChartData({
        labels: ['Active', 'Inactive'],
        datasets: [{
          data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
          backgroundColor: ['#34D399', '#D1D5DB']
        }]
      });

      // Fetch admin and statistics data
      const today = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(today.getDate() - 7);

      const newUsers = userStatsResponse.data?.filter(user => {
        const registrationDate = new Date(user.registrationDate);
        return registrationDate.toDateString() === today.toDateString();
      }).length || 0;

      const lastWeekUsers = userStatsResponse.data?.filter(user => {
        const regDate = new Date(user.registrationDate);
        return regDate >= oneWeekAgo && regDate < today;
      }).length || 0;

      const olderUsers = userStatsResponse.data?.filter(user => {
        return new Date(user.registrationDate) < oneWeekAgo;
      }).length || 0;

      setAdmins(adminsResponse.data || []);
      setStatistics({
        approved: statsResponse.data?.approved || 0,
        pending: statsResponse.data?.pending || 0,
        rejected: statsResponse.data?.rejected || 0
      });
      setTotalUsers(totalUsersResponse.data?.totalUsers || 'Data not available');
      setUserStats({ new: newUsers, lastWeek: lastWeekUsers, older: olderUsers });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err.response ? err.response.data : err.message);
      setError('Failed to fetch data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleApprove = async (adminId) => {
    try {
      await axios.post(`http://localhost:1000/superadmin/approve/${adminId}`);
      Swal.fire({
        icon: 'success',
        title: 'Approved',
        text: 'The request has been approved!',
        timer: 2000,
        showConfirmButton: false
      });
      setAdmins(admins.filter(admin => admin.id !== adminId));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve the request.',
      });
    }
  };

  const handleReject = async (adminId) => {
    try {
      await axios.post(`http://localhost:1000/superadmin/reject/${adminId}`);
      Swal.fire({
        icon: 'success',
        title: 'Rejected',
        text: 'The request has been rejected!',
        timer: 2000,
        showConfirmButton: false
      });
      setAdmins(admins.filter(admin => admin.id !== adminId));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to reject the request.',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 pt-20 bg-gray-100">
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-teal-900 mb-6">Admin Dashboard</h1>
        {error && <p className="text-red-500 text-center mb-4 text-lg font-semibold">{error}</p>}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[
            { title: 'Total Users', value: dashboardData.totalUsers, bgColor: 'bg-teal-900' },
            { title: 'Total Amount Paid', value: `$${dashboardData.totalAmountPaid.toLocaleString()}`, bgColor: 'bg-teal-700' },
            { title: 'New Bookings', value: dashboardData.newBookings, bgColor: 'bg-teal-600' },
            { title: 'Total Slots', value: dashboardData.totalSlots, bgColor: 'bg-teal-500' },
            { title: 'Active Slots', value: dashboardData.activeSlots, bgColor: 'bg-teal-400' },
            { title: 'Last Updated', value: new Date(dashboardData.lastUpdated).toLocaleString(), bgColor: 'bg-teal-300' }
          ].map((card, index) => (
            <div key={index} className={`${card.bgColor} text-white p-4 rounded-lg shadow-lg border border-gray-300`}>
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-lg shadow-lg p-4 border border-teal-300 bg-white">
            <h2 className="text-xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count'
                    },
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>

          <div className="rounded-lg shadow-lg p-4 border border-teal-300 bg-white">
            <h2 className="text-xl font-semibold text-teal-800 mb-4">Slots Availability Today</h2>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Slot Type'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count'
                    },
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-teal-800 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
          <div className="bg-teal-600 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Approved Requests</h2>
            <p className="text-2xl font-bold">{statistics.approved || 0}</p>
          </div>
          <div className="bg-teal-400 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            <p className="text-2xl font-bold">{statistics.pending || 0}</p>
          </div>
          <div className="bg-teal-300 text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Rejected Requests</h2>
            <p className="text-2xl font-bold">{statistics.rejected || 0}</p>
          </div>
        </div>

        {/* User Overview Chart */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-1 rounded-lg shadow-lg p-4 border border-gray-300">
            <h2 className="text-xl font-semibold text-teal-900 mb-4">Request Overview</h2>
            <div className="h-64">
              <Bar
                data={{
                  labels: ['Pending', 'Approved', 'Rejected'],
                  datasets: [{
                    label: 'Number of Requests',
                    data: [statistics.pending || 0, statistics.approved || 0, statistics.rejected || 0],
                    backgroundColor: ['rgba(50, 115, 220, 0.2)', 'rgba(0, 204, 136, 0.2)', 'rgba(255, 82, 82, 0.2)'],
                    borderColor: ['rgba(50, 115, 220, 1)', 'rgba(0, 204, 136, 1)', 'rgba(255, 82, 82, 1)'],
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                      }
                    }
                  },
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                  }
                }}
              />
            </div>
          </div>

          <div className="col-span-1 rounded-lg shadow-lg p-4 border border-gray-300">
            <h2 className="text-xl font-semibold text-teal-900 mb-4">User Overview</h2>
            <div className="h-64">
              <Bar
                data={{
                  labels: ['New Users', 'Last Week', 'Older Users'],
                  datasets: [{
                    label: 'Number of Users',
                    data: [userStats.new || 0, userStats.lastWeek || 0, userStats.older || 0],
                    backgroundColor: ['rgba(50, 115, 220, 0.2)', 'rgba(0, 204, 136, 0.2)', 'rgba(255, 82, 82, 0.2)'],
                    borderColor: ['rgba(50, 115, 220, 1)', 'rgba(0, 204, 136, 1)', 'rgba(255, 82, 82, 1)'],
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: function(tooltipItem) {
                          return tooltipItem.label + ': ' + tooltipItem.raw;
                        }
                      }
                    }
                  },
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Admin Requests Section */}
        {/* Add your admin requests section here if needed */}
      </div>
    </div>
  );
}

export default AdminDashboard;
