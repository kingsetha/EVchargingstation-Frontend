


// // // // import React, { useRef } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// // // // import jsPDF from 'jspdf';
// // // // import { QRCodeCanvas } from 'qrcode.react';
// // // // import axios from 'axios';

// // // // function AmountPaid() {
// // // //   const { stationId, slotId, deviceType } = useParams(); // Adjust parameter names
// // // //   const navigate = useNavigate();
// // // //   const qrRef = useRef(null); // Reference for QR code element

// // // //   const handleDownloadPDF = () => {
// // // //     const doc = new jsPDF();

// // // //     doc.setFontSize(22);
// // // //     doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

// // // //     doc.setFontSize(18);
// // // //     doc.text('Booking Details', 14, 30);

// // // //     doc.setFontSize(12);
// // // //     doc.text(`Station ID: ${stationId}`, 14, 50);
// // // //     doc.text(`Slot ID: ${slotId}`, 14, 60);

// // // //     const qrCodeElement = qrRef.current;
// // // //     if (qrCodeElement) {
// // // //       const qrCodeDataURL = qrCodeElement.toDataURL();
// // // //       doc.addImage(qrCodeDataURL, 'PNG', 14, 70, 50, 50);
// // // //     }

// // // //     doc.text('Thank you for your payment!', 14, 130);
// // // //     doc.save('booking-details.pdf');
// // // //   };

// // // //   const handleViewBookingDetails = async () => {
// // // //     try {
// // // //       const response = await axios.post('/api/slots/reduce-count', {
// // // //         slotId: slotId,
// // // //         deviceType: deviceType
// // // //       });
      
// // // //       if (response.status === 200) {
// // // //         handleDownloadPDF();
// // // //       } else {
// // // //         console.error('Error reducing slot count');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error making API request:', error);
// // // //     }
// // // //   };

// // // //   const handleGoHome = () => {
// // // //     navigate('/'); // Navigate to the home page
// // // //   };

// // // //   return (
// // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
// // // //       <main className="flex-grow pt-16">
// // // //         <section className="bg-white py-12 shadow-md rounded-lg">
// // // //           <div className="container mx-auto px-4">
// // // //             <button
// // // //               onClick={() => navigate(-1)}
// // // //               className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
// // // //             >
// // // //               <FaArrowLeft className="mr-2" /> Back
// // // //             </button>

// // // //             <div className="text-center mb-6">
// // // //               <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
// // // //               <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
// // // //               <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
// // // //               <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationId} is confirmed.</p>
// // // //             </div>

// // // //             <div className="flex justify-center space-x-4 mb-6">
// // // //               <button
// // // //                 onClick={handleViewBookingDetails}
// // // //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// // // //               >
// // // //                 View Booking Details
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleGoHome}
// // // //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// // // //               >
// // // //                 Go to Home
// // // //               </button>
// // // //             </div>

// // // //             <div style={{ display: 'none' }}>
// // // //               <QRCodeCanvas
// // // //                 value={`Payment Successful\nStation ID: ${stationId}\nSlot ID: ${slotId}`}
// // // //                 size={128}
// // // //                 ref={qrRef}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </section>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AmountPaid;

// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// // // // import jsPDF from 'jspdf';
// // // // import { QRCodeCanvas } from 'qrcode.react';
// // // // import axios from 'axios';

// // // // function AmountPaid() {
// // // //   const { stationId, slotId, deviceType } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const qrRef = useRef(null);
// // // //   const [stationName, setStationName] = useState(''); // State for station name

// // // //   useEffect(() => {
// // // //     // Fetch station name when component mounts
// // // //     const fetchStationName = async () => {
// // // //       try {
// // // //         const response = await axios.get('http://localhost:1000/StationAdmin/api/${stationId}');

// // // //         setStationName(response.data.name); // Adjust according to your API response
// // // //       } catch (error) {
// // // //         console.error('Error fetching station name:', error);
// // // //       }
// // // //     };

// // // //     fetchStationName();
// // // //   }, [stationId]);

// // // //   const handleDownloadPDF = () => {
// // // //     const doc = new jsPDF();

// // // //     doc.setFontSize(22);
// // // //     doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

// // // //     doc.setFontSize(18);
// // // //     doc.text('Booking Details', 14, 30);

// // // //     doc.setFontSize(12);
// // // //     doc.text(`Station Name: ${stationName}`, 14, 50); // Display station name
// // // //     doc.text(`Station ID: ${stationId}`, 14, 60);
// // // //     doc.text(`Slot ID: ${slotId}`, 14, 70);

// // // //     const qrCodeElement = qrRef.current;
// // // //     if (qrCodeElement) {
// // // //       const qrCodeDataURL = qrCodeElement.toDataURL();
// // // //       doc.addImage(qrCodeDataURL, 'PNG', 14, 80, 50, 50);
// // // //     }

// // // //     doc.text('Thank you for your payment!', 14, 140);
// // // //     doc.save('booking-details.pdf');
// // // //   };

// // // //   const handleViewBookingDetails = async () => {
// // // //     try {
// // // //       const response = await axios.post('/api/slots/reduce-count', {
// // // //         slotId: slotId,
// // // //         deviceType: deviceType
// // // //       });

// // // //       if (response.status === 200) {
// // // //         handleDownloadPDF();
// // // //       } else {
// // // //         console.error('Error reducing slot count');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error making API request:', error);
// // // //     }
// // // //   };

// // // //   const handleGoHome = () => {
// // // //     navigate('/');
// // // //   };

// // // //   return (
// // // //     <div className="bg-gray-50 min-h-screen flex flex-col">
// // // //       <main className="flex-grow pt-16">
// // // //         <section className="bg-white py-12 shadow-md rounded-lg">
// // // //           <div className="container mx-auto px-4">
// // // //             <button
// // // //               onClick={() => navigate(-1)}
// // // //               className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
// // // //             >
// // // //               <FaArrowLeft className="mr-2" /> Back
// // // //             </button>

// // // //             <div className="text-center mb-6">
// // // //               <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
// // // //               <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
// // // //               <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
// // // //               <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationName} is confirmed.</p>
// // // //             </div>

// // // //             <div className="flex justify-center space-x-4 mb-6">
// // // //               <button
// // // //                 onClick={handleViewBookingDetails}
// // // //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// // // //               >
// // // //                 View Booking Details
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleGoHome}
// // // //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// // // //               >
// // // //                 Go to Home
// // // //               </button>
// // // //             </div>

// // // //             <div style={{ display: 'none' }}>
// // // //               <QRCodeCanvas
// // // //                 value={`Payment Successful\nStation Name: ${stationName}\nStation ID: ${stationId}\nSlot ID: ${slotId}`}
// // // //                 size={128}
// // // //                 ref={qrRef}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         </section>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default AmountPaid;
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// // // import jsPDF from 'jspdf';
// // // import { QRCodeCanvas } from 'qrcode.react';
// // // import axios from 'axios';

// // // function AmountPaid() {
// // //   const { stationId, slotId, deviceType } = useParams();
// // //   const navigate = useNavigate();
// // //   const qrRef = useRef(null);
// // //   const [stationName, setStationName] = useState(''); // State for station name

// // //   useEffect(() => {
// // //     // Fetch station name when component mounts
// // //     const fetchStationName = async () => {
// // //       try {
// // //         const response = await axios.get(`http://localhost:1000/StationAdmin/api/${stationId}`);
// // //         setStationName(response.data.name); // Adjust according to your API response
// // //       } catch (error) {
// // //         console.error('Error fetching station name:', error);
// // //       }
// // //     };

// // //     fetchStationName();
// // //   }, [stationId]);

// // //   const handleDownloadPDF = () => {
// // //     const doc = new jsPDF();

// // //     doc.setFontSize(22);
// // //     doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

// // //     doc.setFontSize(18);
// // //     doc.text('Booking Details', 14, 30);

// // //     doc.setFontSize(12);
// // //     doc.text(`Station Name: ${stationName}`, 14, 50); // Display station name
// // //     doc.text(`Station ID: ${stationId}`, 14, 60);
// // //     doc.text(`Slot ID: ${slotId}`, 14, 70);

// // //     const qrCodeElement = qrRef.current;
// // //     if (qrCodeElement) {
// // //       const qrCodeDataURL = qrCodeElement.toDataURL();
// // //       doc.addImage(qrCodeDataURL, 'PNG', 14, 80, 50, 50);
// // //     }

// // //     doc.text('Thank you for your payment!', 14, 140);
// // //     doc.save('booking-details.pdf');
// // //   };

// // //   useEffect(() => {
// // //     handleDownloadPDF();
// // //   }, [stationName]); // Run after the station name is fetched

// // //   const handleGoHome = () => {
// // //     navigate('/UserDashboard');
// // //   };

// // //   return (
// // //     <div className="bg-gray-50 min-h-screen flex flex-col">
// // //       <main className="flex-grow pt-16">
// // //         <section className="bg-white py-12 shadow-md rounded-lg">
// // //           <div className="container mx-auto px-4">
// // //             <button
// // //               onClick={() => navigate(-1)}
// // //               className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
// // //             >
// // //               <FaArrowLeft className="mr-2" /> Back
// // //             </button>

// // //             <div className="text-center mb-6">
// // //               <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
// // //               <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
// // //               <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
// // //               <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationName} is confirmed.</p>
// // //             </div>

// // //             <div className="flex justify-center space-x-4 mb-6">
// // //               <button
// // //                 onClick={handleGoHome}
// // //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// // //               >
// // //                 Go to Home
// // //               </button>
// // //             </div>

// // //             <div style={{ display: 'none' }}>
// // //               <QRCodeCanvas
// // //                 value={`Payment Successful\nStation Name: ${stationName}\nStation ID: ${stationId}\nSlot ID: ${slotId}`}
// // //                 size={128}
// // //                 ref={qrRef}
// // //               />
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default AmountPaid;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// // // import jsPDF from 'jspdf';
// // // import { QRCodeCanvas } from 'qrcode.react';
// // // import axios from 'axios';

// // // function AmountPaid() {
// // //   const { stationId, slotId } = useParams();
// // //   const navigate = useNavigate();
// // //   const qrRef = useRef(null);
// // //   const [stationName, setStationName] = useState(''); // State for station name
// // //   const [pdfReady, setPdfReady] = useState(false); // State to track PDF readiness

// // //   useEffect(() => {
// // //     // Fetch station name when component mounts
// // //     const fetchStationName = async () => {
// // //       try {
// // //         const response = await axios.get(`http://localhost:1000/StationAdmin/api/${stationId}`);
// // //         setStationName(response.data.name); // Adjust according to your API response
// // //         setPdfReady(true); // Set PDF readiness to true after fetching data
// // //       } catch (error) {
// // //         console.error('Error fetching station name:', error);
// // //       }
// // //     };

// // //     fetchStationName();
// // //   }, [stationId]);

// // //   useEffect(() => {
// // //     if (pdfReady) {
// // //       handleDownloadPDF();
// // //     }
// // //   }, [pdfReady, stationName]); // Run after the station name is fetched and pdfReady is true

// // //   const handleDownloadPDF = () => {
// // //     const doc = new jsPDF();

// // //     doc.setFontSize(22);
// // //     doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

// // //     doc.setFontSize(18);
// // //     doc.text('Booking Details', 14, 30);

// // //     doc.setFontSize(12);
// // //     doc.text(`Station Name: ${stationName}`, 14, 50); // Display station name
// // //     doc.text(`Station ID: ${stationId}`, 14, 60);
// // //     doc.text(`Slot ID: ${slotId}`, 14, 70);

// // //     const qrCodeElement = qrRef.current;
// // //     if (qrCodeElement) {
// // //       const qrCodeDataURL = qrCodeElement.toDataURL();
// // //       doc.addImage(qrCodeDataURL, 'PNG', 14, 80, 50, 50);
// // //     }

// // //     doc.text('Thank you for your payment!', 14, 140);
// // //     doc.save('booking-details.pdf');
// // //   };

// // //   const handleGoHome = () => {
// // //     navigate('/UserDashboard');
// // //   };

// // //   return (
// // //     <div className="bg-gray-50 min-h-screen flex flex-col">
// // //       <main className="flex-grow pt-16">
// // //         <section className="bg-white py-12 shadow-md rounded-lg">
// // //           <div className="container mx-auto px-4">
// // //             <button
// // //               onClick={() => navigate(-1)}
// // //               className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
// // //             >
// // //               <FaArrowLeft className="mr-2" /> Back
// // //             </button>

// // //             <div className="text-center mb-6">
// // //               <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
// // //               <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
// // //               <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
// // //               <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationName} is confirmed.</p>
// // //             </div>

// // //             <div className="flex justify-center space-x-4 mb-6">
// // //               <button
// // //                 onClick={handleGoHome}
// // //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// // //               >
// // //                 Go to Home
// // //               </button>
// // //             </div>

// // //             <div style={{ display: 'none' }}>
// // //               <QRCodeCanvas
// // //                 value={`Payment Successful\nStation Name: ${stationName}\nStation ID: ${stationId}\nSlot ID: ${slotId}`}
// // //                 size={128}
// // //                 ref={qrRef}
// // //               />
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default AmountPaid;

// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// // import jsPDF from 'jspdf';
// // import { QRCodeCanvas } from 'qrcode.react';

// // function AmountPaid() {
// //   const navigate = useNavigate();
// //   const qrRef = useRef(null);
// //   const [stationName, setStationName] = useState(''); // State for station name
// //   const [stationLocation, setStationLocation] = useState(''); // State for station location
// //   const [pdfReady, setPdfReady] = useState(false); // State to track PDF readiness
// //   const [slotId, setSlotId] = useState(''); // State for slot ID

// //   useEffect(() => {
// //     // Retrieve station details from sessionStorage
// //     const storedStation = sessionStorage.getItem('selectedStation');
// //     if (storedStation) {
// //       const station = JSON.parse(storedStation);
// //       setStationName(station.name);
// //       setStationLocation(station.location);
// //     }

// //     // Retrieve slot ID from sessionStorage
// //     const storedSlotId = sessionStorage.getItem('selectedSlotId');
// //     if (storedSlotId) {
// //       setSlotId(storedSlotId);
// //     }

// //     setPdfReady(true); // Set PDF readiness to true after fetching data
// //   }, []);

// //   useEffect(() => {
// //     if (pdfReady) {
// //       handleDownloadPDF();
// //     }
// //   }, [pdfReady, stationName, slotId]); // Run after the station name and slot ID are fetched and pdfReady is true

// //   const handleDownloadPDF = () => {
// //     const doc = new jsPDF();

// //     doc.setFontSize(22);
// //     doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

// //     doc.setFontSize(18);
// //     doc.text('Booking Details', 14, 30);

// //     doc.setFontSize(12);
// //     doc.text(`Station Name: ${stationName}`, 14, 50); // Display station name
// //     doc.text(`Station Location: ${stationLocation}`, 14, 60); // Display station location
// //     doc.text(`Slot ID: ${slotId}`, 14, 70);

// //     const qrCodeElement = qrRef.current;
// //     if (qrCodeElement) {
// //       const qrCodeDataURL = qrCodeElement.toDataURL();
// //       doc.addImage(qrCodeDataURL, 'PNG', 14, 80, 50, 50);
// //     }

// //     doc.text('Thank you for your payment!', 14, 140);
// //     doc.save('booking-details.pdf');
// //   };

// //   const handleGoHome = () => {
// //     navigate('/UserDashboard');
// //   };

// //   return (
// //     <div className="bg-gray-50 min-h-screen flex flex-col">
// //       <main className="flex-grow pt-16">
// //         <section className="bg-white py-12 shadow-md rounded-lg">
// //           <div className="container mx-auto px-4">
// //             <button
// //               onClick={() => navigate(-1)}
// //               className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
// //             >
// //               <FaArrowLeft className="mr-2" /> Back
// //             </button>

// //             <div className="text-center mb-6">
// //               <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
// //               <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
// //               <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
// //               <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationName} is confirmed.</p>
// //               <p className="text-gray-600 mb-4">Location: {stationLocation}</p> {/* Display station location */}
// //             </div>

// //             <div className="flex justify-center space-x-4 mb-6">
// //               <button
// //                 onClick={handleGoHome}
// //                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// //               >
// //                 Go to Home
// //               </button>
// //             </div>

// //             <div style={{ display: 'none' }}>
// //               <QRCodeCanvas
// //                 value={`Payment Successful\nStation Name: ${stationName}\nStation Location: ${stationLocation}\nSlot ID: ${slotId}`}
// //                 size={128}
// //                 ref={qrRef}
// //               />
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // export default AmountPaid;


// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
// import jsPDF from 'jspdf';
// import { QRCodeCanvas } from 'qrcode.react';
// import axios from 'axios';

// function AmountPaid() {
//   const { stationId, slotId } = useParams();
//   const navigate = useNavigate();
//   const qrRef = useRef(null);
//   const [stationName, setStationName] = useState('');
//   const [locationName, setLocationName] = useState('');
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [pdfReady, setPdfReady] = useState(false);

//   useEffect(() => {
//     const fetchStationData = async () => {
//       try {
//         // Assuming the station data is saved in session storage
//         const storedStation = sessionStorage.getItem('selectedStation');
//         if (storedStation) {
//           const station = JSON.parse(storedStation);
//           setStationName(station.name);
//           setLatitude(station.latitude);
//           setLongitude(station.longitude);
//         }

//         const response = await axios.get(`http://localhost:1000/StationAdmin/api/${stationId}`);
//         if (response.data) {
//           // Assuming the API provides latitude and longitude as well
//           setStationName(response.data.name); // Update this if API provides different field
//         }
//       } catch (error) {
//         console.error('Error fetching station data:', error);
//       }
//     };

//     fetchStationData();
//   }, [stationId]);

//   useEffect(() => {
//     if (latitude && longitude) {
//       const fetchLocationName = async () => {
//         try {
//           const response = await axios.get(
//             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//           );

//           if (response.data && response.data.display_name) {
//             setLocationName(response.data.display_name);
//           } else {
//             setLocationName('Location not found');
//           }
//         } catch (error) {
//           console.error('Error fetching location name:', error);
//           setLocationName('Failed to retrieve location');
//         }
//       };

//       fetchLocationName();
//     }
//   }, [latitude, longitude]);

//   useEffect(() => {
//     if (pdfReady) {
//       handleDownloadPDF();
//     }
//   }, [pdfReady, stationName, locationName]); // Run after the station name and location name are fetched

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(22);
//     doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

//     doc.setFontSize(18);
//     doc.text('Booking Details', 14, 30);

//     doc.setFontSize(12);
//     doc.text(`Station Name: ${stationName}`, 14, 50); // Display station name
//     doc.text(`Station Location: ${locationName}`, 14, 60); // Display location name
//     doc.text(`Station ID: ${stationId}`, 14, 70);
//     doc.text(`Slot ID: ${slotId}`, 14, 80);

//     const qrCodeElement = qrRef.current;
//     if (qrCodeElement) {
//       const qrCodeDataURL = qrCodeElement.toDataURL();
//       doc.addImage(qrCodeDataURL, 'PNG', 14, 90, 50, 50);
//     }

//     doc.text('Thank you for your payment!', 14, 150);
//     doc.save('booking-details.pdf');
//   };

//   const handleGoHome = () => {
//     navigate('/UserDashboard');
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <main className="flex-grow pt-16">
//         <section className="bg-white py-12 shadow-md rounded-lg">
//           <div className="container mx-auto px-4">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
//             >
//               <FaArrowLeft className="mr-2" /> Back
//             </button>

//             <div className="text-center mb-6">
//               <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
//               <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
//               <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
//               <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationName} is confirmed.</p>
//               {/* <p className="text-gray-600 mb-4">Location: {locationName}</p> */}
//             </div>

//             <div className="flex justify-center space-x-4 mb-6">
//               <button
//                 onClick={handleGoHome}
//                 className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
//               >
//                 Go to Home
//               </button>
//             </div>

//             <div style={{ display: 'none' }}>
//               <QRCodeCanvas
//                 value={`Payment Successful\nStation Name: ${stationName}\nStation Location: ${locationName}\nStation ID: ${stationId}\nSlot ID: ${slotId}`}
//                 size={128}
//                 ref={qrRef}
//               />
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default AmountPaid;

//above recent 

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

function AmountPaid() {
  const { stationId, slotId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);
  const [stationName, setStationName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        // Check if station data exists in session storage
        const storedStation = sessionStorage.getItem('selectedStation');
        if (storedStation) {
          const station = JSON.parse(storedStation);
          setStationName(station.name);
          setLatitude(station.latitude);
          setLongitude(station.longitude);
        } else {
          // Fetch from API if not in session storage
          const response = await axios.get(`http://localhost:1000/StationAdmin/api/${stationId}`);
          if (response.data) {
            setStationName(response.data.name);
            setLatitude(response.data.latitude);  // Ensure you update these if the API provides them
            setLongitude(response.data.longitude);
          }
        }
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchStationData();
  }, [stationId]);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchLocationName = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (response.data && response.data.display_name) {
            setLocationName(response.data.display_name);
          } else {
            setLocationName('Location not found');
          }
        } catch (error) {
          console.error('Error fetching location name:', error);
          setLocationName('Failed to retrieve location');
        }
      };

      fetchLocationName();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (stationName && locationName) {
      setPdfReady(true);
    }
  }, [stationName, locationName]);

  useEffect(() => {
    if (pdfReady) {
      handleDownloadPDF();
    }
  }, [pdfReady]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('EV STATION FINDER AND SLOT MANAGEMENT', 14, 16);

    doc.setFontSize(18);
    doc.text('Booking Details', 14, 30);

    doc.setFontSize(12);
    doc.text(`Station Name: ${stationName}`, 14, 50);
    doc.text(`Station Location: ${locationName}`, 14, 60);
    doc.text(`Station ID: ${stationId}`, 14, 70);
    doc.text(`Slot ID: ${slotId}`, 14, 80);

    const qrCodeElement = qrRef.current;
    if (qrCodeElement) {
      const qrCodeDataURL = qrCodeElement.toDataURL();
      doc.addImage(qrCodeDataURL, 'PNG', 14, 90, 50, 50);
    }

    doc.text('Thank you for your payment!', 14, 150);
    doc.save('booking-details.pdf');
  };

  const handleGoHome = () => {
    navigate('/UserDashboard');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <section className="bg-white py-12 shadow-md rounded-lg">
          <div className="container mx-auto px-4">
            {/* <button
              onClick={() => navigate(-1)}
              className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button> */}

            <div className="text-center mb-6">
              <FaCheckCircle className="text-teal-600 text-6xl mb-4" />
              <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Successful</h1>
              <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
              <p className="text-gray-600 mb-4">Booking for Slot {slotId} at Station {stationName} is confirmed.</p>
              {/* <p className="text-gray-600 mb-4">Location: {locationName}</p> */}
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={handleGoHome}
                className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
              >
                Go to Home
              </button>
            </div>

            <div style={{ display: 'none' }}>
              <QRCodeCanvas
                value={`Payment Successful\nStation Name: ${stationName}\nStation Location: ${locationName}\nStation ID: ${stationId}\nSlot ID: ${slotId}`}
                size={128}
                ref={qrRef}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AmountPaid;
