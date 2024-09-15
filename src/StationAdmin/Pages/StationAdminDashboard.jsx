

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Line, Bar, Doughnut } from 'react-chartjs-2';
// // // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // //   ArcElement
// // // );

// // // function StationAdminDashboard() {
// // //   const [dashboardData, setDashboardData] = useState({
// // //     totalUsers: 0,
// // //     totalAmountPaid: 0,
// // //     newBookings: 0,
// // //     totalSlots: 0,
// // //     activeSlots: 0,
// // //     lastUpdated: ''
// // //   });

// // //   const [lineChartData, setLineChartData] = useState({
// // //     labels: [],
// // //     datasets: []
// // //   });

// // //   const [barChartData, setBarChartData] = useState({
// // //     labels: ['Available Slots', 'Booked Slots'],
// // //     datasets: []
// // //   });

// // //   const [doughnutChartData, setDoughnutChartData] = useState({
// // //     labels: ['Active', 'Inactive'],
// // //     datasets: []
// // //   });

// // //   const fetchData = async () => {
// // //     try {
// // //       const response = await axios.get('http://localhost:1000/api/dashboard/data'); 
// // //       const data = response.data;
  
// // //       setDashboardData({
// // //         totalUsers: data.totalUsers,
// // //         totalAmountPaid: data.totalAmountPaid,
// // //         newBookings: data.newBookings,
// // //         totalSlots: data.totalSlots,
// // //         activeSlots: data.activeSlots,
// // //         lastUpdated: new Date().toISOString() 
// // //       });
  
// // //       // Update line chart data
// // //       setLineChartData({
// // //         labels: data.lineChartLabels || [],
// // //         datasets: [
// // //           {
// // //             label: 'New Bookings',
// // //             data: data.lineChartData || [],
// // //             borderColor: '#1D4ED8',
// // //             backgroundColor: 'rgba(29, 78, 216, 0.2)',
// // //             fill: true
// // //           }
// // //         ]
// // //       });
  
// // //       // Update bar chart data
// // //       setBarChartData({
// // //         labels: data.barChartLabels || ['Available Slots', 'Booked Slots'],
// // //         datasets: [
// // //           {
// // //             label: 'Available Slots',
// // //             data: data.availableSlotsData || [],
// // //             backgroundColor: '#16A34A'
// // //           },
// // //           {
// // //             label: 'Booked Slots',
// // //             data: data.bookedSlotsData || [],
// // //             backgroundColor: '#F87171'
// // //           }
// // //         ]
// // //       });
  
// // //       setDoughnutChartData({
// // //         labels: ['Active', 'Inactive'],
// // //         datasets: [
// // //           {
// // //             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
// // //             backgroundColor: ['#34D399', '#D1D5DB']
// // //           }
// // //         ]
// // //       });
  
// // //     } catch (err) {
// // //       console.error('Error fetching data:', err.response ? err.response.data : err.message);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData(); 

// // //     const intervalId = setInterval(() => {
// // //       fetchData(); 
// // //     }, 30000);

// // //     return () => clearInterval(intervalId); 
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen p-8 pt-20">
// // //       <div className="rounded-lg shadow-lg p-8 mb-6">
// // //         <h1 className="text-4xl font-bold text-teal-800 mb-6">Station Admin Dashboard</h1>

// // //         {/* Dashboard Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// // //           {[ 
// // //             { title: 'Total Users', value: dashboardData.totalUsers },
// // //             { title: 'Total Amount Paid', value: `$${dashboardData.totalAmountPaid.toLocaleString()}` },
// // //             { title: 'New Bookings', value: dashboardData.newBookings },
// // //             { title: 'Total Slots', value: dashboardData.totalSlots },
// // //             { title: 'Active Slots', value: dashboardData.activeSlots },
// // //             { title: 'Last Updated', value: new Date(dashboardData.lastUpdated).toLocaleString() }
// // //           ].map((card, index) => (
// // //             <div key={index} className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //               <h2 className="text-2xl font-semibold text-teal-800 mb-4">{card.title}</h2>
// // //               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Charts */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
// // //             <Line data={lineChartData} />
// // //           </div>

// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Slots Availability</h2>
// // //             <Bar data={barChartData} />
// // //           </div>

// // //           {/* Uncomment if you need Doughnut chart */}
// // //           {/* 
// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300 lg:col-span-2">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Active vs Inactive Slots</h2>
// // //             <Doughnut data={doughnutChartData} />
// // //           </div>
// // //           */}
// // //         </div>

// // //         {/* Additional Information */}
// // //         <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //           <h2 className="text-2xl font-semibold text-teal-800 mb-4">Additional Information</h2>
// // //           <p className="text-lg text-gray-600">Here you can add additional details or statistics relevant to the station admin.</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default StationAdminDashboard;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Line, Bar, Doughnut } from 'react-chartjs-2';
// // // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // //   ArcElement
// // // );

// // // function StationAdminDashboard({ stationId }) {
// // //   const [dashboardData, setDashboardData] = useState({
// // //     totalUsers: 0,
// // //     totalAmountPaid: 0,
// // //     newBookings: 0,
// // //     totalSlots: 0,
// // //     activeSlots: 0,
// // //     lastUpdated: ''
// // //   });

// // //   const [lineChartData, setLineChartData] = useState({
// // //     labels: [],
// // //     datasets: []
// // //   });

// // //   const [barChartData, setBarChartData] = useState({
// // //     labels: ['Available Slots', 'Booked Slots'],
// // //     datasets: []
// // //   });

// // //   const [doughnutChartData, setDoughnutChartData] = useState({
// // //     labels: ['Active', 'Inactive'],
// // //     datasets: []
// // //   });

// // //   const fetchData = async () => {
// // //     try {
// // //       // Fetch data specific to the station admin
// // //       const response = await axios.get(`http://localhost:1000/api/dashboard/data/${stationId}`); 
// // //       const data = response.data;
  
// // //       setDashboardData({
// // //         totalUsers: data.totalUsers,
// // //         totalAmountPaid: data.totalAmountPaid,
// // //         newBookings: data.newBookings,
// // //         totalSlots: data.totalSlots,
// // //         activeSlots: data.activeSlots,
// // //         lastUpdated: new Date().toISOString() 
// // //       });
  
// // //       // Update line chart data
// // //       setLineChartData({
// // //         labels: data.lineChartLabels || [],
// // //         datasets: [
// // //           {
// // //             label: 'New Bookings',
// // //             data: data.lineChartData || [],
// // //             borderColor: '#1D4ED8',
// // //             backgroundColor: 'rgba(29, 78, 216, 0.2)',
// // //             fill: true
// // //           }
// // //         ]
// // //       });
  
// // //       // Update bar chart data
// // //       setBarChartData({
// // //         labels: data.barChartLabels || ['Available Slots', 'Booked Slots'],
// // //         datasets: [
// // //           {
// // //             label: 'Available Slots',
// // //             data: data.availableSlotsData || [],
// // //             backgroundColor: '#16A34A'
// // //           },
// // //           {
// // //             label: 'Booked Slots',
// // //             data: data.bookedSlotsData || [],
// // //             backgroundColor: '#F87171'
// // //           }
// // //         ]
// // //       });
  
// // //       setDoughnutChartData({
// // //         labels: ['Active', 'Inactive'],
// // //         datasets: [
// // //           {
// // //             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
// // //             backgroundColor: ['#34D399', '#D1D5DB']
// // //           }
// // //         ]
// // //       });
  
// // //     } catch (err) {
// // //       console.error('Error fetching data:', err.response ? err.response.data : err.message);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData(); 

// // //     const intervalId = setInterval(() => {
// // //       fetchData(); 
// // //     }, 30000);

// // //     return () => clearInterval(intervalId); 
// // //   }, [stationId]);

// // //   return (
// // //     <div className="min-h-screen p-8 pt-20">
// // //       <div className="rounded-lg shadow-lg p-8 mb-6">
// // //         <h1 className="text-4xl font-bold text-teal-800 mb-6">Station Admin Dashboard</h1>

// // //         {/* Dashboard Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// // //           {[ 
// // //             { title: 'Total Users', value: dashboardData.totalUsers },
// // //             { title: 'Total Amount Paid', value: `$${dashboardData.totalAmountPaid.toLocaleString()}` },
// // //             { title: 'New Bookings', value: dashboardData.newBookings },
// // //             { title: 'Total Slots', value: dashboardData.totalSlots },
// // //             { title: 'Active Slots', value: dashboardData.activeSlots },
// // //             { title: 'Last Updated', value: new Date(dashboardData.lastUpdated).toLocaleString() }
// // //           ].map((card, index) => (
// // //             <div key={index} className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //               <h2 className="text-2xl font-semibold text-teal-800 mb-4">{card.title}</h2>
// // //               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Charts */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
// // //             <Line data={lineChartData} />
// // //           </div>

// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Slots Availability</h2>
// // //             <Bar data={barChartData} />
// // //           </div>

// // //           {/* Uncomment if you need Doughnut chart */}
// // //           {/* 
// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300 lg:col-span-2">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Active vs Inactive Slots</h2>
// // //             <Doughnut data={doughnutChartData} />
// // //           </div>
// // //           */}
// // //         </div>

// // //         {/* Additional Information */}
// // //         <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //           <h2 className="text-2xl font-semibold text-teal-800 mb-4">Additional Information</h2>
// // //           <p className="text-lg text-gray-600">Here you can add additional details or statistics relevant to the station admin.</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default StationAdminDashboard;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { Line, Bar, Doughnut } from 'react-chartjs-2';
// // // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   PointElement,
// // //   LineElement,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // //   ArcElement
// // // );

// // // function StationAdminDashboard() {
// // //   const [dashboardData, setDashboardData] = useState({
// // //     totalUsers: 0,
// // //     totalAmountPaid: 0,
// // //     newBookings: 0,
// // //     totalSlots: 0,
// // //     activeSlots: 0,
// // //     lastUpdated: ''
// // //   });

// // //   const [lineChartData, setLineChartData] = useState({
// // //     labels: [],
// // //     datasets: []
// // //   });

// // //   const [barChartData, setBarChartData] = useState({
// // //     labels: ['Available Slots', 'Booked Slots'],
// // //     datasets: []
// // //   });

// // //   const [doughnutChartData, setDoughnutChartData] = useState({
// // //     labels: ['Active', 'Inactive'],
// // //     datasets: []
// // //   });

// // //   const [stationId, setStationId] = useState(null);

// // //   useEffect(() => {
// // //     // Retrieve the stationId from session or localStorage
// // //     const fetchedStationId = sessionStorage.getItem('userId'); // Change to the appropriate method of fetching userId
// // //     setStationId(fetchedStationId);

// // //     // Fetch data if stationId is available
// // //     if (fetchedStationId) {
// // //       fetchData(fetchedStationId);
// // //     }

// // //     // Set up an interval to refresh data every 30 seconds
// // //     const intervalId = setInterval(() => {
// // //       if (fetchedStationId) {
// // //         fetchData(fetchedStationId);
// // //       }
// // //     }, 30000);

// // //     // Clear interval on component unmount
// // //     return () => clearInterval(intervalId);
// // //   }, []);

// // //   const fetchData = async (stationId) => {
// // //     if (!stationId) {
// // //       console.error('Station ID is undefined');
// // //       return;
// // //     }

// // //     try {
// // //       // Log the URL being requested
// // //       console.log(`Fetching data from: http://localhost:1000/api/dashboard/data/station/${stationId}`);

// // //       // Fetch data specific to the station admin
// // //       const response = await axios.get(`http://localhost:1000/api/dashboard/data/station/${stationId}`);
// // //       const data = response.data;

// // //       setDashboardData({
// // //         totalUsers: data.totalUsers,
// // //         totalAmountPaid: data.totalAmountPaid,
// // //         newBookings: data.newBookings,
// // //         totalSlots: data.totalSlots,
// // //         activeSlots: data.activeSlots,
// // //         lastUpdated: new Date().toISOString()
// // //       });

// // //       // Update line chart data
// // //       setLineChartData({
// // //         labels: data.lineChartLabels || [],
// // //         datasets: [
// // //           {
// // //             label: 'New Bookings',
// // //             data: data.lineChartData || [],
// // //             borderColor: '#1D4ED8',
// // //             backgroundColor: 'rgba(29, 78, 216, 0.2)',
// // //             fill: true
// // //           }
// // //         ]
// // //       });

// // //       // Update bar chart data
// // //       setBarChartData({
// // //         labels: data.barChartLabels || ['Available Slots', 'Booked Slots'],
// // //         datasets: [
// // //           {
// // //             label: 'Available Slots',
// // //             data: data.availableSlotsData || [],
// // //             backgroundColor: '#16A34A'
// // //           },
// // //           {
// // //             label: 'Booked Slots',
// // //             data: data.bookedSlotsData || [],
// // //             backgroundColor: '#F87171'
// // //           }
// // //         ]
// // //       });

// // //       // Update doughnut chart data
// // //       setDoughnutChartData({
// // //         labels: ['Active', 'Inactive'],
// // //         datasets: [
// // //           {
// // //             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
// // //             backgroundColor: ['#34D399', '#D1D5DB']
// // //           }
// // //         ]
// // //       });

// // //     } catch (err) {
// // //       // Log the error with detailed information
// // //       console.error('Error fetching data:', err.response ? err.response.data : err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen p-8 pt-20">
// // //       <div className="rounded-lg shadow-lg p-8 mb-6">
// // //         <h1 className="text-4xl font-bold text-teal-800 mb-6">Station Admin Dashboard</h1>

// // //         {/* Dashboard Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// // //           {[ 
// // //             { title: 'Total Users', value: dashboardData.totalUsers },
// // //             { title: 'Total Amount Paid', value: `$${dashboardData.totalAmountPaid.toLocaleString()}` },
// // //             { title: 'New Bookings', value: dashboardData.newBookings },
// // //             { title: 'Total Slots', value: dashboardData.totalSlots },
// // //             { title: 'Active Slots', value: dashboardData.activeSlots },
// // //             { title: 'Last Updated', value: new Date(dashboardData.lastUpdated).toLocaleString() }
// // //           ].map((card, index) => (
// // //             <div key={index} className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //               <h2 className="text-2xl font-semibold text-teal-800 mb-4">{card.title}</h2>
// // //               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Charts */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
// // //             <Line data={lineChartData} />
// // //           </div>

// // //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Slots Availability</h2>
// // //             <Bar data={barChartData} />
// // //           </div>

         
// // //         </div>

// // //         {/* Additional Information */}
// // //         <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// // //           <h2 className="text-2xl font-semibold text-teal-800 mb-4">Additional Information</h2>
// // //           <p className="text-lg text-gray-600">Here you can add additional details or statistics relevant to the station admin.</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default StationAdminDashboard;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Line, Bar, Doughnut } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ArcElement
// // );

// // function StationAdminDashboard() {
// //   const [dashboardData, setDashboardData] = useState({
// //     totalUsers: 0,
// //     totalAmountPaid: 0,
// //     newBookings: 0,
// //     totalSlots: 0,
// //     activeSlots: 0,
// //     lastUpdated: ''
// //   });

// //   const [lineChartData, setLineChartData] = useState({
// //     labels: ['No Data'],
// //     datasets: [
// //       {
// //         label: 'New Bookings',
// //         data: [0],
// //         borderColor: '#1D4ED8',
// //         backgroundColor: 'rgba(29, 78, 216, 0.2)',
// //         fill: true,
// //         lineTension: 0.1
// //       }
// //     ]
// //   });

// //   const [barChartData, setBarChartData] = useState({
// //     labels: ['Available Slots', 'Booked Slots'],
// //     datasets: []
// //   });

// //   const [doughnutChartData, setDoughnutChartData] = useState({
// //     labels: ['Active', 'Inactive'],
// //     datasets: [
// //       {
// //         data: [0, 0],
// //         backgroundColor: ['#34D399', '#D1D5DB']
// //       }
// //     ]
// //   });

// //   const [stationId, setStationId] = useState(null);

// //   useEffect(() => {
// //     // Retrieve the stationId from session or localStorage
// //     const fetchedStationId = sessionStorage.getItem('userId'); // Change to the appropriate method of fetching userId
// //     setStationId(fetchedStationId);

// //     // Fetch data if stationId is available
// //     if (fetchedStationId) {
// //       fetchData(fetchedStationId);
// //     }

// //     // Set up an interval to refresh data every 30 seconds
// //     const intervalId = setInterval(() => {
// //       if (fetchedStationId) {
// //         fetchData(fetchedStationId);
// //       }
// //     }, 30000);

// //     // Clear interval on component unmount
// //     return () => clearInterval(intervalId);
// //   }, []);

// //   const fetchData = async (stationId) => {
// //     if (!stationId) {
// //       console.error('Station ID is undefined');
// //       return;
// //     }

// //     try {
// //       // Log the URL being requested
// //       console.log(`Fetching data from: http://localhost:1000/api/dashboard/data/station/${stationId}`);

// //       // Fetch data specific to the station admin
// //       const response = await axios.get(`http://localhost:1000/api/dashboard/data/station/${stationId}`);
// //       const data = response.data;

// //       console.log('Fetched data:', data);

// //       setDashboardData({
// //         totalUsers: data.totalUsers,
// //         totalAmountPaid: data.totalAmountPaid,
// //         newBookings: data.newBookings,
// //         totalSlots: data.totalSlots,
// //         activeSlots: data.activeSlots,
// //         lastUpdated: new Date().toISOString()
// //       });

// //       // Update line chart data
// //       setLineChartData({
// //         labels: data.lineChartLabels || ['No Data'],
// //         datasets: [
// //           {
// //             label: 'New Bookings',
// //             data: data.lineChartData || [0],
// //             borderColor: '#1D4ED8',
// //             backgroundColor: 'rgba(29, 78, 216, 0.2)',
// //             fill: true,
// //             lineTension: 0.1
// //           }
// //         ]
// //       });

// //       // Update bar chart data
// //       setBarChartData({
// //         labels: data.barChartLabels || ['Available Slots', 'Booked Slots'],
// //         datasets: [
// //           {
// //             label: 'Available Slots',
// //             data: data.availableSlotsData || [0],
// //             backgroundColor: '#16A34A'
// //           },
// //           {
// //             label: 'Booked Slots',
// //             data: data.bookedSlotsData || [0],
// //             backgroundColor: '#F87171'
// //           }
// //         ]
// //       });

// //       // Update doughnut chart data
// //       setDoughnutChartData({
// //         labels: ['Active', 'Inactive'],
// //         datasets: [
// //           {
// //             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
// //             backgroundColor: ['#34D399', '#D1D5DB']
// //           }
// //         ]
// //       });

// //     } catch (err) {
// //       console.error('Error fetching data:', err.response ? err.response.data : err.message);

// //       // Set default data in case of error
// //       setLineChartData({
// //         labels: ['No Data'],
// //         datasets: [
// //           {
// //             label: 'New Bookings',
// //             data: [0],
// //             borderColor: '#1D4ED8',
// //             backgroundColor: 'rgba(29, 78, 216, 0.2)',
// //             fill: true,
// //             lineTension: 0.1
// //           }
// //         ]
// //       });

// //       setBarChartData({
// //         labels: ['Available Slots', 'Booked Slots'],
// //         datasets: [
// //           {
// //             label: 'Available Slots',
// //             data: [0],
// //             backgroundColor: '#16A34A'
// //           },
// //           {
// //             label: 'Booked Slots',
// //             data: [0],
// //             backgroundColor: '#F87171'
// //           }
// //         ]
// //       });

// //       setDoughnutChartData({
// //         labels: ['Active', 'Inactive'],
// //         datasets: [
// //           {
// //             data: [0, 0],
// //             backgroundColor: ['#34D399', '#D1D5DB']
// //           }
// //         ]
// //       });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen p-8 pt-20">
// //       <div className="rounded-lg shadow-lg p-8 mb-6">
// //         <h1 className="text-4xl font-bold text-teal-800 mb-6">Station Admin Dashboard</h1>

// //         {/* Dashboard Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
// //           {[
// //             { title: 'Total Users', value: dashboardData.totalUsers },
// //             { title: 'Total Amount Paid', value: `$${dashboardData.totalAmountPaid.toLocaleString()}` },
// //             { title: 'New Bookings', value: dashboardData.newBookings },
// //             { title: 'Total Slots', value: dashboardData.totalSlots },
// //             { title: 'Active Slots', value: dashboardData.activeSlots },
// //             { title: 'Last Updated', value: new Date(dashboardData.lastUpdated).toLocaleString() }
// //           ].map((card, index) => (
// //             <div key={index} className="rounded-lg shadow-lg p-6 border border-gray-300">
// //               <h2 className="text-2xl font-semibold text-teal-800 mb-4">{card.title}</h2>
// //               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Charts */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
// //             <Line
// //               data={lineChartData}
// //               options={{
// //                 responsive: true,
// //                 plugins: {
// //                   legend: {
// //                     position: 'top',
// //                   },
// //                   tooltip: {
// //                     callbacks: {
// //                       label: function (tooltipItem) {
// //                         return `New Bookings: ${tooltipItem.raw}`;
// //                       }
// //                     }
// //                   }
// //                 },
// //                 scales: {
// //                   x: {
// //                     title: {
// //                       display: true,
// //                       text: 'Time'
// //                     }
// //                   },
// //                   y: {
// //                     title: {
// //                       display: true,
// //                       text: 'Number of Bookings'
// //                     },
// //                     beginAtZero: true
// //                   }
// //                 }
// //               }}
// //             />
// //           </div>

// //           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// //             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Slots Availability</h2>
// //             <Bar
// //               data={barChartData}
// //               options={{
// //                 responsive: true,
// //                 plugins: {
// //                   legend: {
// //                     position: 'top',
// //                   },
// //                   tooltip: {
// //                     callbacks: {
// //                       label: function (tooltipItem) {
// //                         return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
// //                       }
// //                     }
// //                   }
// //                 },
// //                 scales: {
// //                   x: {
// //                     title: {
// //                       display: true,
// //                       text: 'Type'
// //                     }
// //                   },
// //                   y: {
// //                     title: {
// //                       display: true,
// //                       text: 'Count'
// //                     },
// //                     beginAtZero: true
// //                   }
// //                 }
// //               }}
// //             />
// //           </div>
// //         </div>

// //         {/* Additional Information */}
// //         <div className="rounded-lg shadow-lg p-6 border border-gray-300">
// //           <h2 className="text-2xl font-semibold text-teal-800 mb-4">Additional Information</h2>
// //           <p className="text-lg text-gray-600">Here you can add additional details or statistics relevant to the station admin.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default StationAdminDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadarController, RadialLinearScale } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   RadarController,
//   RadialLinearScale
// );

// function StationAdminDashboard() {
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     totalAmountPaid: 0,
//     newBookings: 0,
//     totalSlots: 0,
//     availableSlotsToday: 0,
//     lastUpdated: ''
//   });

//   const [lineChartData, setLineChartData] = useState({
//     labels: ['No Data'],
//     datasets: [
//       {
//         label: 'New Bookings Over Time',
//         data: [0],
//         borderColor: '#1D4ED8',
//         backgroundColor: 'rgba(29, 78, 216, 0.2)',
//         fill: true,
//         lineTension: 0.1
//       }
//     ]
//   });

//   const [barChartData, setBarChartData] = useState({
//     labels: ['Available Slots', 'Booked Slots'],
//     datasets: [
//       {
//         label: 'Available Slots',
//         data: [0],
//         backgroundColor: '#16A34A'
//       },
//       {
//         label: 'Booked Slots',
//         data: [0],
//         backgroundColor: '#F87171'
//       }
//     ]
//   });

//   const [doughnutChartData, setDoughnutChartData] = useState({
//     labels: ['Active', 'Inactive'],
//     datasets: [
//       {
//         data: [0, 0],
//         backgroundColor: ['#34D399', '#D1D5DB']
//       }
//     ]
//   });

//   const [paymentChartData, setPaymentChartData] = useState({
//     labels: ['No Data'],
//     datasets: [
//       {
//         label: 'Payment Increase Over Time',
//         data: [0],
//         borderColor: '#F59E0B',
//         backgroundColor: 'rgba(249, 231, 159, 0.5)',
//         fill: true,
//         lineTension: 0.1
//       }
//     ]
//   });

//   const [paymentPieData, setPaymentPieData] = useState({
//     labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//     datasets: [
//       {
//         data: [0, 0, 0],
//         backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//       }
//     ]
//   });

//   const [paymentRadarData, setPaymentRadarData] = useState({
//     labels: ['January', 'February', 'March', 'April', 'May'],
//     datasets: [
//       {
//         label: 'Monthly Payments',
//         data: [0, 0, 0, 0, 0],
//         backgroundColor: 'rgba(253, 226, 240, 0.5)',
//         borderColor: '#F59E0B',
//         borderWidth: 1
//       }
//     ]
//   });

//   const [stationId, setStationId] = useState(null);

//   useEffect(() => {
//     // Retrieve the stationId from session or localStorage
//     const fetchedStationId = sessionStorage.getItem('userId'); // Change to the appropriate method of fetching userId
//     setStationId(fetchedStationId);

//     // Fetch data if stationId is available
//     if (fetchedStationId) {
//       fetchData(fetchedStationId);
//     }

//     // Set up an interval to refresh data every 30 seconds
//     const intervalId = setInterval(() => {
//       if (fetchedStationId) {
//         fetchData(fetchedStationId);
//       }
//     }, 30000);

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchData = async (stationId) => {
//     if (!stationId) {
//       console.error('Station ID is undefined');
//       return;
//     }

//     try {
//       // Log the URL being requested
//       console.log(`Fetching data from: http://localhost:1000/api/dashboard/data/station/${stationId}`);

//       // Fetch data specific to the station admin
//       const response = await axios.get(`http://localhost:1000/api/dashboard/data/station/${stationId}`);
//       const data = response.data;

//       console.log('Fetched data:', data);

//       // Set dashboard data
//       setDashboardData({
//         totalUsers: data.totalUsers,
//         totalAmountPaid: data.totalAmountPaid,
//         newBookings: data.newBookings,
//         totalSlots: data.totalSlots,
//         availableSlotsToday: calculateAvailableSlotsToday(data.slotsAvailabilityData),
//         lastUpdated: new Date().toISOString()
//       });

//       // Update line chart data
//       setLineChartData({
//         labels: data.lineChartLabels || ['No Data'],
//         datasets: [
//           {
//             label: 'New Bookings Over Time',
//             data: data.lineChartData || [0],
//             borderColor: '#1D4ED8',
//             backgroundColor: 'rgba(29, 78, 216, 0.2)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       // Process slots data for today
//       const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
//       const slotsToday = data.slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];

//       const availableSlots = slotsToday.filter(slot => slot.count > 0).length;
//       const bookedSlots = slotsToday.filter(slot => slot.count === 0).length;

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: [availableSlots],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: [bookedSlots],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       // Update doughnut chart data
//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [
//           {
//             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
//             backgroundColor: ['#34D399', '#D1D5DB']
//           }
//         ]
//       });

//       // Update payment chart data
//       setPaymentChartData({
//         labels: data.paymentChartLabels || ['No Data'],
//         datasets: [
//           {
//             label: 'Payment Increase Over Time',
//             data: data.paymentChartData || [0],
//             borderColor: '#F59E0B',
//             backgroundColor: 'rgba(249, 231, 159, 0.5)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       // Update payment pie chart data
//       setPaymentPieData({
//         labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//         datasets: [
//           {
//             data: data.paymentPieData || [0, 0, 0],
//             backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//           }
//         ]
//       });

//       // Update payment radar chart data
//       setPaymentRadarData({
//         labels: data.paymentRadarLabels || ['January', 'February', 'March', 'April', 'May'],
//         datasets: [
//           {
//             label: 'Monthly Payments',
//             data: data.paymentRadarData || [0, 0, 0, 0, 0],
//             backgroundColor: 'rgba(253, 226, 240, 0.5)',
//             borderColor: '#F59E0B',
//             borderWidth: 1
//           }
//         ]
//       });

//     } catch (err) {
//       console.error('Error fetching data:', err.response ? err.response.data : err.message);

//       // Set default data in case of error
//       setLineChartData({
//         labels: ['No Data'],
//         datasets: [
//           {
//             label: 'New Bookings Over Time',
//             data: [0],
//             borderColor: '#1D4ED8',
//             backgroundColor: 'rgba(29, 78, 216, 0.2)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: [0],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: [0],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [
//           {
//             data: [0, 0],
//             backgroundColor: ['#34D399', '#D1D5DB']
//           }
//         ]
//       });

//       setPaymentChartData({
//         labels: ['No Data'],
//         datasets: [
//           {
//             label: 'Payment Increase Over Time',
//             data: [0],
//             borderColor: '#F59E0B',
//             backgroundColor: 'rgba(249, 231, 159, 0.5)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       setPaymentPieData({
//         labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//         datasets: [
//           {
//             data: [0, 0, 0],
//             backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//           }
//         ]
//       });

//       setPaymentRadarData({
//         labels: ['January', 'February', 'March', 'April', 'May'],
//         datasets: [
//           {
//             label: 'Monthly Payments',
//             data: [0, 0, 0, 0, 0],
//             backgroundColor: 'rgba(253, 226, 240, 0.5)',
//             borderColor: '#F59E0B',
//             borderWidth: 1
//           }
//         ]
//       });
//     }
//   };

//   const calculateAvailableSlotsToday = (slotsAvailabilityData) => {
//     const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
//     const slotsToday = slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];
//     return slotsToday.filter(slot => slot.count > 0).length;
//   };

//   return (
//     <div className="min-h-screen p-8 pt-20">
//       <div className="rounded-lg shadow-lg p-8 mb-6">
//         <h1 className="text-4xl font-bold text-teal-800 mb-6">Station Admin Dashboard</h1>

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//           {[{
//             title: 'Total Users',
//             value: dashboardData.totalUsers
//           },
//           {
//             title: 'Total Amount Paid',
//             value: `$${dashboardData.totalAmountPaid.toLocaleString()}`
//           },
//           {
//             title: 'New Bookings',
//             value: dashboardData.newBookings
//           },
//           {
//             title: 'Total Slots',
//             value: dashboardData.totalSlots
//           },
//           {
//             title: 'Slots Available Today',
//             value: dashboardData.availableSlotsToday
//           },
//           {
//             title: 'Last Updated',
//             value: new Date(dashboardData.lastUpdated).toLocaleString()
//           }]
//           .map((card, index) => (
//             <div key={index} className="rounded-lg shadow-lg p-6 border border-gray-300">
//               <h2 className="text-2xl font-semibold text-teal-800 mb-4">{card.title}</h2>
//               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
//             <h2 className="text-2xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
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

//           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
//             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Slots Availability Today</h2>
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

//         {/* Additional Information */}
       
//         <div className="rounded-lg shadow-lg p-6 border border-gray-300">
//           <h2 className="text-2xl font-semibold text-teal-800 mb-4">Monthly Payment Overview (Radar)</h2>
//           <Radar
//             data={paymentRadarData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'top',
//                 },
//                 tooltip: {
//                   callbacks: {
//                     label: function (tooltipItem) {
//                       return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
//                     }
//                   }
//                 }
//               },
//               scales: {
//                 r: {
//                   angleLines: {
//                     display: true
//                   },
//                   suggestedMin: 0
//                 }
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StationAdminDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadarController, RadialLinearScale } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   RadarController,
//   RadialLinearScale
// );

// function StationAdminDashboard() {
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     totalAmountPaid: 0,
//     newBookings: 0,
//     totalSlots: 0,
//     availableSlotsToday: 0,
//     lastUpdated: ''
//   });

//   const [lineChartData, setLineChartData] = useState({
//     labels: ['No Data'],
//     datasets: [
//       {
//         label: 'New Bookings Over Time',
//         data: [0],
//         borderColor: '#1D4ED8',
//         backgroundColor: 'rgba(29, 78, 216, 0.2)',
//         fill: true,
//         lineTension: 0.1
//       }
//     ]
//   });

//   const [barChartData, setBarChartData] = useState({
//     labels: ['Available Slots', 'Booked Slots'],
//     datasets: [
//       {
//         label: 'Available Slots',
//         data: [0],
//         backgroundColor: '#16A34A'
//       },
//       {
//         label: 'Booked Slots',
//         data: [0],
//         backgroundColor: '#F87171'
//       }
//     ]
//   });

//   const [doughnutChartData, setDoughnutChartData] = useState({
//     labels: ['Active', 'Inactive'],
//     datasets: [
//       {
//         data: [0, 0],
//         backgroundColor: ['#34D399', '#D1D5DB']
//       }
//     ]
//   });

//   const [paymentChartData, setPaymentChartData] = useState({
//     labels: ['No Data'],
//     datasets: [
//       {
//         label: 'Payment Increase Over Time',
//         data: [0],
//         borderColor: '#F59E0B',
//         backgroundColor: 'rgba(249, 231, 159, 0.5)',
//         fill: true,
//         lineTension: 0.1
//       }
//     ]
//   });

//   const [paymentPieData, setPaymentPieData] = useState({
//     labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//     datasets: [
//       {
//         data: [0, 0, 0],
//         backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//       }
//     ]
//   });

//   const [paymentRadarData, setPaymentRadarData] = useState({
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//     datasets: [
//       {
//         label: 'Monthly Payments',
//         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         backgroundColor: 'rgba(253, 226, 240, 0.5)',
//         borderColor: '#F59E0B',
//         borderWidth: 1
//       }
//     ]
//   });

//   const [stationId, setStationId] = useState(null);

//   useEffect(() => {
//     // Retrieve the stationId from session or localStorage
//     const fetchedStationId = sessionStorage.getItem('userId'); // Change to the appropriate method of fetching userId
//     setStationId(fetchedStationId);

//     // Fetch data if stationId is available
//     if (fetchedStationId) {
//       fetchData(fetchedStationId);
//     }

//     // Set up an interval to refresh data every 30 seconds
//     const intervalId = setInterval(() => {
//       if (fetchedStationId) {
//         fetchData(fetchedStationId);
//       }
//     }, 30000);

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchData = async (stationId) => {
//     if (!stationId) {
//       console.error('Station ID is undefined');
//       return;
//     }

//     try {
//       // Log the URL being requested
//       console.log(`Fetching data from: http://localhost:1000/api/dashboard/data/station/${stationId}`);

//       // Fetch data specific to the station admin
//       const response = await axios.get(`http://localhost:1000/api/dashboard/data/station/${stationId}`);
//       const data = response.data;

//       console.log('Fetched data:', data);

//       // Set dashboard data
//       setDashboardData({
//         totalUsers: data.totalUsers,
//         totalAmountPaid: data.totalAmountPaid,
//         newBookings: data.newBookings,
//         totalSlots: data.totalSlots,
//         availableSlotsToday: calculateAvailableSlotsToday(data.slotsAvailabilityData),
//         lastUpdated: new Date().toISOString()
//       });

//       // Update line chart data
//       setLineChartData({
//         labels: data.lineChartLabels || ['No Data'],
//         datasets: [
//           {
//             label: 'New Bookings Over Time',
//             data: data.lineChartData || [0],
//             borderColor: '#1D4ED8',
//             backgroundColor: 'rgba(29, 78, 216, 0.2)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       // Process slots data for today
//       const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
//       const slotsToday = data.slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];

//       const availableSlots = slotsToday.filter(slot => slot.count > 0).length;
//       const bookedSlots = slotsToday.filter(slot => slot.count === 0).length;

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: [availableSlots],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: [bookedSlots],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       // Update doughnut chart data
//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [
//           {
//             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
//             backgroundColor: ['#34D399', '#D1D5DB']
//           }
//         ]
//       });

//       // Update payment chart data
//       setPaymentChartData({
//         labels: data.paymentChartLabels || ['No Data'],
//         datasets: [
//           {
//             label: 'Payment Increase Over Time',
//             data: data.paymentChartData || [0],
//             borderColor: '#F59E0B',
//             backgroundColor: 'rgba(249, 231, 159, 0.5)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       // Update payment pie chart data
//       setPaymentPieData({
//         labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//         datasets: [
//           {
//             data: data.paymentPieData || [0, 0, 0],
//             backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//           }
//         ]
//       });

//       // Update payment radar chart data
//       setPaymentRadarData({
//         labels: data.paymentRadarLabels || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//         datasets: [
//           {
//             label: 'Monthly Payments',
//             data: data.paymentRadarData || [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//             backgroundColor: 'rgba(253, 226, 240, 0.5)',
//             borderColor: '#F59E0B',
//             borderWidth: 1
//           }
//         ]
//       });

//     } catch (err) {
//       console.error('Error fetching data:', err.response ? err.response.data : err.message);

//       // Set default data in case of error
//       setLineChartData({
//         labels: ['No Data'],
//         datasets: [
//           {
//             label: 'New Bookings Over Time',
//             data: [0],
//             borderColor: '#1D4ED8',
//             backgroundColor: 'rgba(29, 78, 216, 0.2)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: [0],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: [0],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [
//           {
//             data: [0, 0],
//             backgroundColor: ['#34D399', '#D1D5DB']
//           }
//         ]
//       });

//       setPaymentChartData({
//         labels: ['No Data'],
//         datasets: [
//           {
//             label: 'Payment Increase Over Time',
//             data: [0],
//             borderColor: '#F59E0B',
//             backgroundColor: 'rgba(249, 231, 159, 0.5)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       setPaymentPieData({
//         labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//         datasets: [
//           {
//             data: [0, 0, 0],
//             backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//           }
//         ]
//       });

//       setPaymentRadarData({
//         labels: ['January', 'February', 'March', 'April', 'May'],
//         datasets: [
//           {
//             label: 'Monthly Payments',
//             data: [0, 0, 0, 0, 0],
//             backgroundColor: 'rgba(253, 226, 240, 0.5)',
//             borderColor: '#F59E0B',
//             borderWidth: 1
//           }
//         ]
//       });
//     }
//   };

//   const calculateAvailableSlotsToday = (slotsAvailabilityData) => {
//     const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
//     const slotsToday = slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];
//     return slotsToday.filter(slot => slot.count > 0).length;
//   };

//   return (
//     <div className="min-h-screen p-8 pt-20">
//       <div className="rounded-lg shadow-lg p-8 mb-6">
//         <h1 className="text-4xl font-bold text-teal-800 mb-6">Station Admin Dashboard</h1>

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//           {[{
//             title: 'Total Users',
//             value: dashboardData.totalUsers
//           },
//           {
//             title: 'Total Amount Paid',
//             value: `$${dashboardData.totalAmountPaid.toLocaleString()}` 
//           },
//           {
//             title: 'New Bookings',
//             value: dashboardData.newBookings
//           },
//           {
//             title: 'Total Slots',
//             value: dashboardData.totalSlots
//           },
//           {
//             title: 'Slots Available Today',
//             value: dashboardData.availableSlotsToday
//           },
//           {
//             title: 'Last Updated',
//             value: new Date(dashboardData.lastUpdated).toLocaleString()
//           }]
//           .map((card, index) => (
//             <div key={index} className="rounded-lg shadow-lg p-6 border border-gray-300">
//               <h2 className="text-2xl font-semibold text-teal-800 mb-4">{card.title}</h2>
//               <p className="text-4xl font-bold text-gray-800">{card.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
//             <h2 className="text-2xl font-semibold text-teal-800 mb-4">New Bookings Over Time</h2>
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

//           <div className="rounded-lg shadow-lg p-6 border border-gray-300">
//             <h2 className="text-2xl font-semibold text-teal-800 mb-4">Slots Availability Today</h2>
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

//         {/* Additional Information */}
//         <div className="rounded-lg shadow-lg p-6 border border-gray-300 flex flex-col items-center justify-center">
//   <h2 className="text-2xl font-semibold text-teal-800 mb-4">Monthly Payment Overview (Radar)</h2>
//   <div style={{ width: '400px', height: '300px' }} className="relative flex items-center justify-center">
//     <Radar
//       data={paymentRadarData}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false, // Ensures the chart does not maintain the default aspect ratio
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             callbacks: {
//               label: function (tooltipItem) {
//                 return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
//               }
//             }
//           }
//         },
//         scales: {
//           r: {
//             angleLines: {
//               display: true
//             },
//             suggestedMin: 0
//           }
//         }
//       }}
//     />
//   </div>
// </div>

//       </div>
//     </div>
//   );
// }

// export default StationAdminDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadarController, RadialLinearScale } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   RadarController,
//   RadialLinearScale
// );

// function StationAdminDashboard() {
//   const [dashboardData, setDashboardData] = useState({
//     totalUsers: 0,
//     totalAmountPaid: 0,
//     newBookings: 0,
//     totalSlots: 0,
//     availableSlotsToday: 0,
//     lastUpdated: ''
//   });

//   const [lineChartData, setLineChartData] = useState({
//     labels: ['No Data'],
//     datasets: [
//       {
//         label: 'New Bookings Over Time',
//         data: [0],
//         borderColor: '#1D4ED8',
//         backgroundColor: 'rgba(29, 78, 216, 0.2)',
//         fill: true,
//         lineTension: 0.1
//       }
//     ]
//   });

//   const [barChartData, setBarChartData] = useState({
//     labels: ['Available Slots', 'Booked Slots'],
//     datasets: [
//       {
//         label: 'Available Slots',
//         data: [0],
//         backgroundColor: '#16A34A'
//       },
//       {
//         label: 'Booked Slots',
//         data: [0],
//         backgroundColor: '#F87171'
//       }
//     ]
//   });

//   const [doughnutChartData, setDoughnutChartData] = useState({
//     labels: ['Active', 'Inactive'],
//     datasets: [
//       {
//         data: [0, 0],
//         backgroundColor: ['#34D399', '#D1D5DB']
//       }
//     ]
//   });

//   const [paymentChartData, setPaymentChartData] = useState({
//     labels: ['No Data'],
//     datasets: [
//       {
//         label: 'Payment Increase Over Time',
//         data: [0],
//         borderColor: '#F59E0B',
//         backgroundColor: 'rgba(249, 231, 159, 0.5)',
//         fill: true,
//         lineTension: 0.1
//       }
//     ]
//   });

//   const [paymentPieData, setPaymentPieData] = useState({
//     labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//     datasets: [
//       {
//         data: [0, 0, 0],
//         backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//       }
//     ]
//   });

//   const [paymentRadarData, setPaymentRadarData] = useState({
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//     datasets: [
//       {
//         label: 'Monthly Payments',
//         data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         backgroundColor: 'rgba(253, 226, 240, 0.5)',
//         borderColor: '#F59E0B',
//         borderWidth: 1
//       }
//     ]
//   });

//   const [stationId, setStationId] = useState(null);

//   useEffect(() => {
//     // Retrieve the stationId from session or localStorage
//     const fetchedStationId = sessionStorage.getItem('userId'); // Change to the appropriate method of fetching userId
//     setStationId(fetchedStationId);

//     // Fetch data if stationId is available
//     if (fetchedStationId) {
//       fetchData(fetchedStationId);
//     }

//     // Set up an interval to refresh data every 30 seconds
//     const intervalId = setInterval(() => {
//       if (fetchedStationId) {
//         fetchData(fetchedStationId);
//       }
//     }, 30000);

//     // Clear interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const fetchData = async (stationId) => {
//     if (!stationId) {
//       console.error('Station ID is undefined');
//       return;
//     }

//     try {
//       // Log the URL being requested
//       console.log(`Fetching data from: http://localhost:1000/api/dashboard/data/station/${stationId}`);

//       // Fetch data specific to the station admin
//       const response = await axios.get(`http://localhost:1000/api/dashboard/data/station/${stationId}`);
//       const data = response.data;

//       console.log('Fetched data:', data);

//       // Set dashboard data
//       setDashboardData({
//         totalUsers: data.totalUsers,
//         totalAmountPaid: data.totalAmountPaid,
//         newBookings: data.newBookings,
//         totalSlots: data.totalSlots,
//         availableSlotsToday: calculateAvailableSlotsToday(data.slotsAvailabilityData),
//         lastUpdated: new Date().toISOString()
//       });

//       // Update line chart data
//       setLineChartData({
//         labels: data.lineChartLabels || ['No Data'],
//         datasets: [
//           {
//             label: 'New Bookings Over Time',
//             data: data.lineChartData || [0],
//             borderColor: '#1D4ED8',
//             backgroundColor: 'rgba(29, 78, 216, 0.2)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       // Process slots data for today
//       const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
//       const slotsToday = data.slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];

//       const availableSlots = slotsToday.filter(slot => slot.count > 0).length;
//       const bookedSlots = slotsToday.filter(slot => slot.count === 0).length;

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: [availableSlots],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: [bookedSlots],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       // Update doughnut chart data
//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [
//           {
//             data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
//             backgroundColor: ['#34D399', '#D1D5DB']
//           }
//         ]
//       });

//       // Update payment chart data
//       setPaymentChartData({
//         labels: data.paymentChartLabels || ['No Data'],
//         datasets: [
//           {
//             label: 'Payment Increase Over Time',
//             data: data.paymentChartData || [0],
//             borderColor: '#F59E0B',
//             backgroundColor: 'rgba(249, 231, 159, 0.5)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       // Update payment pie chart data
//       setPaymentPieData({
//         labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//         datasets: [
//           {
//             data: data.paymentPieData || [0, 0, 0],
//             backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//           }
//         ]
//       });

//       // Update payment radar chart data
//       setPaymentRadarData({
//         labels: data.paymentRadarLabels || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
//         datasets: [
//           {
//             label: 'Monthly Payments',
//             data: data.paymentRadarData || [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//             backgroundColor: 'rgba(253, 226, 240, 0.5)',
//             borderColor: '#F59E0B',
//             borderWidth: 1
//           }
//         ]
//       });

//     } catch (err) {
//       console.error('Error fetching data:', err.response ? err.response.data : err.message);

//       // Set default data in case of error
//       setLineChartData({
//         labels: ['No Data'],
//         datasets: [
//           {
//             label: 'New Bookings Over Time',
//             data: [0],
//             borderColor: '#1D4ED8',
//             backgroundColor: 'rgba(29, 78, 216, 0.2)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       setBarChartData({
//         labels: ['Available Slots', 'Booked Slots'],
//         datasets: [
//           {
//             label: 'Available Slots',
//             data: [0],
//             backgroundColor: '#16A34A'
//           },
//           {
//             label: 'Booked Slots',
//             data: [0],
//             backgroundColor: '#F87171'
//           }
//         ]
//       });

//       setDoughnutChartData({
//         labels: ['Active', 'Inactive'],
//         datasets: [
//           {
//             data: [0, 0],
//             backgroundColor: ['#34D399', '#D1D5DB']
//           }
//         ]
//       });

//       setPaymentChartData({
//         labels: ['No Data'],
//         datasets: [
//           {
//             label: 'Payment Increase Over Time',
//             data: [0],
//             borderColor: '#F59E0B',
//             backgroundColor: 'rgba(249, 231, 159, 0.5)',
//             fill: true,
//             lineTension: 0.1
//           }
//         ]
//       });

//       setPaymentPieData({
//         labels: ['Low Payments', 'Medium Payments', 'High Payments'],
//         datasets: [
//           {
//             data: [0, 0, 0],
//             backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
//           }
//         ]
//       });

//       setPaymentRadarData({
//         labels: ['January', 'February', 'March', 'April', 'May'],
//         datasets: [
//           {
//             label: 'Monthly Payments',
//             data: [0, 0, 0, 0, 0],
//             backgroundColor: 'rgba(253, 226, 240, 0.5)',
//             borderColor: '#F59E0B',
//             borderWidth: 1
//           }
//         ]
//       });
//     }
//   };

//   const calculateAvailableSlotsToday = (slotsAvailabilityData) => {
//     const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
//     const slotsToday = slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];
//     return slotsToday.filter(slot => slot.count > 0).length;
//   };

//   return (
//     <div className="min-h-screen p-8 pt-20 bg-gray-100">
//       <div className="rounded-lg shadow-lg p-6 mb-6 bg-white">
//         <h1 className="text-3xl font-bold text-teal-700 mb-6">Station Admin Dashboard</h1>

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           {[{
//             title: 'Total Users',
//             value: dashboardData.totalUsers
//           },
//           {
//             title: 'Total Amount Paid',
//             value: `$${dashboardData.totalAmountPaid.toLocaleString()}`
//           },
//           {
//             title: 'New Bookings',
//             value: dashboardData.newBookings
//           },
//           {
//             title: 'Total Slots',
//             value: dashboardData.totalSlots
//           },
//           {
//             title: 'Slots Available Today',
//             value: dashboardData.availableSlotsToday
//           },
//           {
//             title: 'Last Updated',
//             value: new Date(dashboardData.lastUpdated).toLocaleString()
//           }]
//           .map((card, index) => (
//             <div key={index} className="rounded-lg shadow-md p-4 border border-teal-300 bg-teal-50">
//               <h2 className="text-xl font-semibold text-teal-800 mb-2">{card.title}</h2>
//               <p className="text-2xl font-bold text-teal-700">{card.value}</p>
//             </div>
//           ))}
//         </div>

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

//         {/* Additional Information */}
//         <div className="rounded-lg shadow-lg p-4 border border-teal-300 bg-white">
//           <h2 className="text-xl font-semibold text-teal-800 mb-4">Monthly Payment Overview (Radar)</h2>
//           <div style={{ width: '100%', height: '300px' }} className="relative flex items-center justify-center">
//             <Radar
//               data={paymentRadarData}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false, // Ensures the chart does not maintain the default aspect ratio
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: function (tooltipItem) {
//                         return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
//                       }
//                     }
//                   }
//                 },
//                 scales: {
//                   r: {
//                     angleLines: {
//                       display: true
//                     },
//                     suggestedMin: 0
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StationAdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadarController, RadialLinearScale } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale
);

function StationAdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalAmountPaid: 0,
    newBookings: 0,
    totalSlots: 0,
    availableSlotsToday: 0,
    lastUpdated: ''
  });

  const [lineChartData, setLineChartData] = useState({
    labels: ['No Data'],
    datasets: [
      {
        label: 'New Bookings Over Time',
        data: [0],
        borderColor: '#1D4ED8',
        backgroundColor: 'rgba(29, 78, 216, 0.2)',
        fill: true,
        lineTension: 0.1
      }
    ]
  });

  const [barChartData, setBarChartData] = useState({
    labels: ['Available Slots', 'Booked Slots'],
    datasets: [
      {
        label: 'Available Slots',
        data: [0],
        backgroundColor: '#16A34A'
      },
      {
        label: 'Booked Slots',
        data: [0],
        backgroundColor: '#F87171'
      }
    ]
  });

  const [doughnutChartData, setDoughnutChartData] = useState({
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#34D399', '#D1D5DB']
      }
    ]
  });

  const [paymentChartData, setPaymentChartData] = useState({
    labels: ['No Data'],
    datasets: [
      {
        label: 'Payment Increase Over Time',
        data: [0],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(249, 231, 159, 0.5)',
        fill: true,
        lineTension: 0.1
      }
    ]
  });

  const [paymentPieData, setPaymentPieData] = useState({
    labels: ['Low Payments', 'Medium Payments', 'High Payments'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
      }
    ]
  });

  const [paymentRadarData, setPaymentRadarData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Payments',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(253, 226, 240, 0.5)',
        borderColor: '#F59E0B',
        borderWidth: 1
      }
    ]
  });

  const [stationId, setStationId] = useState(null);

  useEffect(() => {
    const fetchedStationId = sessionStorage.getItem('userId');
    setStationId(fetchedStationId);

    if (fetchedStationId) {
      fetchData(fetchedStationId);
    }

    const intervalId = setInterval(() => {
      if (fetchedStationId) {
        fetchData(fetchedStationId);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async (stationId) => {
    if (!stationId) {
      console.error('Station ID is undefined');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1000/api/dashboard/data/station/${stationId}`);
      const data = response.data;

      // Update dashboard data with defaults if missing
      setDashboardData({
        totalUsers: data.totalUsers || 0,
        totalAmountPaid: data.totalAmountPaid || 0,
        newBookings: data.newBookings || 0,
        totalSlots: data.totalSlots || 0,
        availableSlotsToday: calculateAvailableSlotsToday(data.slotsAvailabilityData),
        lastUpdated: new Date().toISOString()
      });

      // Update charts with defaults if missing
      setLineChartData({
        labels: data.lineChartLabels || ['No Data'],
        datasets: [
          {
            label: 'New Bookings Over Time',
            data: data.lineChartData || [0],
            borderColor: '#1D4ED8',
            backgroundColor: 'rgba(29, 78, 216, 0.2)',
            fill: true,
            lineTension: 0.1
          }
        ]
      });

      const today = new Date().toISOString().split('T')[0];
      const slotsToday = data.slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];

      const availableSlots = slotsToday.filter(slot => slot.count > 0).length;
      const bookedSlots = slotsToday.filter(slot => slot.count === 0).length;

      setBarChartData({
        labels: ['Available Slots', 'Booked Slots'],
        datasets: [
          {
            label: 'Available Slots',
            data: [availableSlots],
            backgroundColor: '#16A34A'
          },
          {
            label: 'Booked Slots',
            data: [bookedSlots],
            backgroundColor: '#F87171'
          }
        ]
      });

      setDoughnutChartData({
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [data.activeSlots || 0, (data.totalSlots || 0) - (data.activeSlots || 0)],
            backgroundColor: ['#34D399', '#D1D5DB']
          }
        ]
      });

      setPaymentChartData({
        labels: data.paymentChartLabels || ['No Data'],
        datasets: [
          {
            label: 'Payment Increase Over Time',
            data: data.paymentChartData || [0],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(249, 231, 159, 0.5)',
            fill: true,
            lineTension: 0.1
          }
        ]
      });

      setPaymentPieData({
        labels: ['Low Payments', 'Medium Payments', 'High Payments'],
        datasets: [
          {
            data: data.paymentPieData || [0, 0, 0],
            backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
          }
        ]
      });

      setPaymentRadarData({
        labels: data.paymentRadarLabels || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Monthly Payments',
            data: data.paymentRadarData || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgba(253, 226, 240, 0.5)',
            borderColor: '#F59E0B',
            borderWidth: 1
          }
        ]
      });

    } catch (err) {
      console.error('Error fetching data:', err.response ? err.response.data : err.message);

      // Set default data in case of error
      setLineChartData({
        labels: ['No Data'],
        datasets: [
          {
            label: 'New Bookings Over Time',
            data: [0],
            borderColor: '#1D4ED8',
            backgroundColor: 'rgba(29, 78, 216, 0.2)',
            fill: true,
            lineTension: 0.1
          }
        ]
      });

      setBarChartData({
        labels: ['Available Slots', 'Booked Slots'],
        datasets: [
          {
            label: 'Available Slots',
            data: [0],
            backgroundColor: '#16A34A'
          },
          {
            label: 'Booked Slots',
            data: [0],
            backgroundColor: '#F87171'
          }
        ]
      });

      setDoughnutChartData({
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#34D399', '#D1D5DB']
          }
        ]
      });

      setPaymentChartData({
        labels: ['No Data'],
        datasets: [
          {
            label: 'Payment Increase Over Time',
            data: [0],
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(249, 231, 159, 0.5)',
            fill: true,
            lineTension: 0.1
          }
        ]
      });

      setPaymentPieData({
        labels: ['Low Payments', 'Medium Payments', 'High Payments'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#FECACA', '#FECACA', '#FECACA']
          }
        ]
      });

      setPaymentRadarData({
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Monthly Payments',
            data: [0, 0, 0, 0, 0],
            backgroundColor: 'rgba(253, 226, 240, 0.5)',
            borderColor: '#F59E0B',
            borderWidth: 1
          }
        ]
      });
    }
  };

  const calculateAvailableSlotsToday = (slotsAvailabilityData) => {
    const today = new Date().toISOString().split('T')[0];
    const slotsToday = slotsAvailabilityData?.filter(slot => slot.createdAt.startsWith(today)) || [];
    return slotsToday.filter(slot => slot.count > 0).length;
  };

  return (
    <div className="min-h-screen p-8 pt-20 bg-gray-100">
      <div className="rounded-lg shadow-lg p-6 mb-6 bg-white">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Station Admin Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[{
            title: 'Total Users',
            value: dashboardData.totalUsers
          },
          {
            title: 'Total Amount Paid',
            value: `$${dashboardData.totalAmountPaid.toLocaleString()}`
          },
          {
            title: 'New Bookings',
            value: dashboardData.newBookings
          },
          {
            title: 'Total Slots',
            value: dashboardData.totalSlots
          },
          {
            title: 'Slots Available Today',
            value: dashboardData.availableSlotsToday
          },
          {
            title: 'Last Updated',
            value: new Date(dashboardData.lastUpdated).toLocaleString()
          }]
          .map((card, index) => (
            <div key={index} className="rounded-lg shadow-md p-4 border border-teal-300 bg-teal-50">
              <h2 className="text-xl font-semibold text-teal-800 mb-2">{card.title}</h2>
              <p className="text-2xl font-bold text-teal-700">{card.value}</p>
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

        {/* Additional Information */}
        <div className="rounded-lg shadow-lg p-4 border border-teal-300 bg-white">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Monthly Payment Overview (Radar)</h2>
          <div style={{ width: '100%', height: '300px' }} className="relative flex items-center justify-center">
            <Radar
              data={paymentRadarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
                      }
                    }
                  }
                },
                scales: {
                  r: {
                    angleLines: {
                      display: true
                    },
                    suggestedMin: 0
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationAdminDashboard;
