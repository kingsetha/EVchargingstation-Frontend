


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { useNavigate } from 'react-router-dom';
// // import DetailModal from './DetailModal';
// // import Footer from './Footer'; // Import the Footer component

// // function PendingDashboard() {
// //   const [admins, setAdmins] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchAdmins = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:1000/superadmin/pending');
// //         setAdmins(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error('Error fetching data:', err.response ? err.response.data : err.message);
// //         setError('Failed to fetch admins.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchAdmins();
// //   }, []);

// //   const handleApprove = async (adminId) => {
// //     try {
// //       await axios.post(`http://localhost:1000/superadmin/approve/${adminId}`);
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Approved',
// //         text: 'The request has been approved! You can now log in using your email and password.',
// //         timer: 2000,
// //         showConfirmButton: false
// //       });
// //       setAdmins(admins.filter(admin => admin.id !== adminId));
// //     } catch (err) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Failed to approve the request.',
// //       });
// //     }
// //   };

// //   const handleReject = async (adminId) => {
// //     try {
// //       await axios.post(`http://localhost:1000/superadmin/reject/${adminId}`);
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Rejected',
// //         text: 'The request has been rejected!',
// //         timer: 2000,
// //         showConfirmButton: false
// //       });
// //       setAdmins(admins.filter(admin => admin.id !== adminId));
// //     } catch (err) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Failed to reject the request.',
// //       });
// //     }
// //   };

// //   const openModal = (admin) => {
// //     setSelectedAdmin(admin);
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setSelectedAdmin(null);
// //   };

// //   if (loading) {
// //     return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
// //   }

// //   return (
// //     <div className="bg-gray-100 min-h-screen p-8 pt-24 relative">
// //       <div className="container mx-auto bg-white rounded-lg shadow-lg p-8 mb-16">
// //         <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pending Admin Requests</h1>
// //         {error && <p className="text-red-500 text-center mb-4 text-lg font-semibold">{error}</p>}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {admins.length > 0 ? (
// //             admins.map(admin => (
// //               <div key={admin.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-300 transition-transform transform hover:scale-105">
// //                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{admin.name}</h2>
// //                 <p className="text-gray-600 mb-2">Email: {admin.email}</p>
// //                 <p className="text-gray-600 mb-2">Phone: {admin.phoneNumber}</p>
// //                 <p className="text-gray-600 mb-2">Station ID: {admin.id}</p>
// //                 <p className="text-gray-600 mb-4">Station Name: {admin.name}</p>
// //                 <div className="flex justify-between gap-2">
// //                   <button
// //                     onClick={() => openModal(admin)}
// //                     className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //                   >
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="col-span-4 text-center py-4 text-lg font-semibold">No admins to display</div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Modal Component */}
// //       {isModalOpen && selectedAdmin && (
// //         <DetailModal
// //           admin={selectedAdmin}
// //           onApprove={() => handleApprove(selectedAdmin.id)}
// //           onReject={() => handleReject(selectedAdmin.id)}
// //           onClose={closeModal}
// //         />
// //       )}

// //       {/* Footer Component */}
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default PendingDashboard;


// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { useNavigate } from 'react-router-dom';
// // import DetailModal from './DetailModal';
// // import Footer from './Footer'; // Import the Footer component

// // function PendingDashboard() {
// //   const [admins, setAdmins] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchAdmins = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:1000/superadmin/pending');
// //         setAdmins(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error('Error fetching data:', err.response ? err.response.data : err.message);
// //         setError('Failed to fetch admins.');
// //         setLoading(false);
// //       }
// //     };

// //     fetchAdmins();
// //   }, []);

// //   const handleApprove = async (adminId) => {
// //     try {
// //       await axios.post(`http://localhost:1000/superadmin/approve/${adminId}`);
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Approved',
// //         text: 'The request has been approved! You can now log in using your email and password.',
// //         timer: 2000,
// //         showConfirmButton: false
// //       });
// //       setAdmins(admins.filter(admin => admin.id !== adminId));
// //     } catch (err) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Failed to approve the request.',
// //       });
// //     }
// //   };

// //   const handleReject = async (adminId) => {
// //     try {
// //       await axios.post(`http://localhost:1000/superadmin/reject/${adminId}`);
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Rejected',
// //         text: 'The request has been rejected!',
// //         timer: 2000,
// //         showConfirmButton: false
// //       });
// //       setAdmins(admins.filter(admin => admin.id !== adminId));
// //     } catch (err) {
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error',
// //         text: 'Failed to reject the request.',
// //       });
// //     }
// //   };

// //   const openModal = (admin) => {
// //     setSelectedAdmin(admin);
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setSelectedAdmin(null);
// //   };

// //   if (loading) {
// //     return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
// //   }

// //   return (
// //     <div className="bg-gray-100 min-h-screen p-8 pt-24 relative">
// //       <div className="container mx-auto bg-white rounded-lg shadow-lg p-8 mb-16">
// //         <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pending Admin Requests</h1>
// //         {error && <p className="text-red-500 text-center mb-4 text-lg font-semibold">{error}</p>}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {admins.length > 0 ? (
// //             admins.map(admin => (
// //               <div key={admin.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-300 transition-transform transform hover:scale-105">
// //                 <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin:{admin.name}</h2>
// //                 <p className="text-gray-600 mb-2">StationName: {admin.chargingStationName}</p>
// //                 <p className="text-gray-600 mb-2">Email: {admin.email}</p>
// //                 <p className="text-gray-600 mb-2">Phone: {admin.phoneNumber}</p>
// //                 <p className="text-gray-600 mb-2">Station ID: {admin.id}</p>
// //                 <p className="text-gray-600 mb-2">Station Location: {admin.chargingStationLocation}</p>
// //                 <p className="text-gray-600 mb-4">Registration Certificate Number: {admin.registrationCertificateNumber}</p>
// //                 <div className="flex justify-between gap-2">
// //                   <button
// //                     onClick={() => openModal(admin)}
// //                     className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //                   >
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="col-span-4 text-center py-4 text-lg font-semibold">No admins to display</div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Modal Component */}
// //       {isModalOpen && selectedAdmin && (
// //         <DetailModal
// //           admin={selectedAdmin}
// //           onApprove={() => handleApprove(selectedAdmin.id)}
// //           onReject={() => handleReject(selectedAdmin.id)}
// //           onClose={closeModal}
// //         />
// //       )}

// //       {/* Footer Component */}
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default PendingDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import DetailModal from './DetailModal';
// import Footer from './Footer'; // Import the Footer component

// function PendingDashboard() {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/superadmin/pending');
//         setAdmins(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err.response ? err.response.data : err.message);
//         setError('Failed to fetch admins.');
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   const handleApprove = async (adminId) => {
//     try {
//       await axios.post(`http://localhost:1000/superadmin/approve/${adminId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Approved',
//         text: 'The request has been approved! You can now log in using your email and password.',
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

//   const openModal = (admin) => {
//     setSelectedAdmin(admin);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedAdmin(null);
//   };

//   if (loading) {
//     return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-grow bg-gray-100 p-8 pt-24 relative">
//         <div className="container mx-auto bg-white rounded-lg shadow-lg p-8 mb-16">
//           <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pending Admin Requests</h1>
//           {error && <p className="text-red-500 text-center mb-4 text-lg font-semibold">{error}</p>}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {admins.length > 0 ? (
//               admins.map(admin => (
//                 <div key={admin.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-300 transition-transform transform hover:scale-105">
//                   <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin: {admin.name}</h2>
//                   <p className="text-gray-600 mb-2">Station Name: {admin.chargingStationName}</p>
//                   <p className="text-gray-600 mb-2">Email: {admin.email}</p>
//                   <p className="text-gray-600 mb-2">Phone: {admin.phoneNumber}</p>
//                   <p className="text-gray-600 mb-2">Station ID: {admin.id}</p>
//                   <p className="text-gray-600 mb-2">Station Location: {admin.chargingStationLocation}</p>
//                   <p className="text-gray-600 mb-4">Registration Certificate Number: {admin.registrationCertificateNumber}</p>
//                   <div className="flex justify-between gap-2">
//                     <button
//                       onClick={() => openModal(admin)}
//                       className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-4 text-center py-4 text-lg font-semibold">No admins to display</div>
//             )}
//           </div>
//         </div>

//         {/* Modal Component */}
//         {isModalOpen && selectedAdmin && (
//           <DetailModal
//             admin={selectedAdmin}
//             onApprove={() => handleApprove(selectedAdmin.id)}
//             onReject={() => handleReject(selectedAdmin.id)}
//             onClose={closeModal}
//           />
//         )}
//       </main>

//       {/* Footer Component */}
//       <Footer />
//     </div>
//   );
// }

// export default PendingDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DetailModal from './DetailModal';
import Footer from './Footer'; // Import the Footer component

function PendingDashboard() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:1000/superadmin/pending');
        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch admins.');
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleApprove = async (adminId) => {
    try {
      await axios.post(`http://localhost:1000/superadmin/approve/${adminId}`);
      Swal.fire({
        icon: 'success',
        title: 'Approved',
        text: 'The request has been approved!.',
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

  const openModal = (admin) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  if (loading) {
    return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-24 relative">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8 mb-16">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pending Admin Requests</h1>
        {error && <p className="text-red-500 text-center mb-4 text-lg font-semibold">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {admins.length > 0 ? (
            admins.map(admin => (
              <div key={admin.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-300 transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Admin: {admin.name}</h2>
                <p className="text-gray-600 mb-2">Station Name: {admin.chargingStationName}</p>
                <p className="text-gray-600 mb-2">Email: {admin.email}</p>
                <p className="text-gray-600 mb-2">Phone: {admin.phoneNumber}</p>
                <p className="text-gray-600 mb-2">Station ID: {admin.id}</p>
                <p className="text-gray-600 mb-2">Station Location: {admin.chargingStationLocation}</p>
                <p className="text-gray-600 mb-4">Registration Certificate Number: {admin.registrationCertificateNumber}</p>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => openModal(admin)}
                    className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-4 text-lg font-semibold">No admins to display</div>
          )}
        </div>
      </div>

      {/* Conditionally Render Footer */}
      {!isModalOpen && <Footer />}

      {/* Modal Component */}
      {isModalOpen && selectedAdmin && (
        <DetailModal
          admin={selectedAdmin}
          onApprove={() => handleApprove(selectedAdmin.id)}
          onReject={() => handleReject(selectedAdmin.id)}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default PendingDashboard;
