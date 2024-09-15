// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { FaArrowLeft } from 'react-icons/fa';

// // const VEHICLE_RATES = {
// //   car: 20, // Amount in dollars
// //   bike: 10,
// //   truck: 30,
// // };

// // function Payment() {
// //   const { id, slotId, vehicleType } = useParams(); // Get station ID, slot ID, and vehicle type from route parameters
// //   const [amount, setAmount] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchPaymentDetails = () => {
// //       try {
// //         if (VEHICLE_RATES[vehicleType]) {
// //           setAmount(VEHICLE_RATES[vehicleType]);
// //         } else {
// //           setError('Invalid vehicle type.');
// //         }
// //       } catch (err) {
// //         setError('Failed to fetch payment details.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPaymentDetails();
// //   }, [vehicleType]);

// //   const handleConfirmPayment = () => {
// //     // Navigate to a Confirmation or Receipt page
// //     navigate(`/Confirmation/${id}/${slotId}`);
// //   };

// //   const handleGoBack = () => {
// //     navigate(-1); // Go back to the previous page
// //   };

// //   return (
// //     <div className="bg-gray-50 min-h-screen flex flex-col">
// //       <main className="flex-grow pt-16">
// //         <section className="bg-white py-12 shadow-md rounded-lg">
// //           <div className="container mx-auto px-4">
// //             {loading ? (
// //               <div className="flex justify-center items-center h-48">
// //                 <div className="loader">Loading...</div>
// //               </div>
// //             ) : error ? (
// //               <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
// //                 {error}
// //               </div>
// //             ) : (
// //               <div>
// //                 <button
// //                   onClick={handleGoBack}
// //                   className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
// //                 >
// //                   <FaArrowLeft className="mr-2" /> Back
// //                 </button>

// //                 <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Details</h1>
                
// //                 <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6">
// //                   <h2 className="text-2xl font-semibold text-teal-700 mb-4">Vehicle Type: {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</h2>
// //                   <p className="text-gray-600 mb-4">Amount to be paid:</p>
// //                   <div className="text-3xl font-bold text-teal-600 mb-4">${amount}</div>
                  
// //                   <button
// //                     onClick={handleConfirmPayment}
// //                     className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
// //                   >
// //                     Confirm Payment
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // export default Payment;


// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';

// // Define vehicle rates here or fetch them from a server if necessary
// const VEHICLE_RATES = {
//   LEVEL_1: 20, // Amount in dollars
//   LEVEL_2: 30,
//   DC_FAST_CHARGING: 40,
// };

// function Payment() {
//   const { id, slotId, vehicleType } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Extract 'count' from query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const count = parseInt(queryParams.get('count'), 10) || 1;

//   const [amount, setAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPaymentDetails = () => {
//       try {
//         if (VEHICLE_RATES[vehicleType]) {
//           const totalAmount = VEHICLE_RATES[vehicleType] * count;
//           setAmount(totalAmount);
//           setError(null);
//         } else {
//           setError('Invalid vehicle type.');
//         }
//       } catch (err) {
//         setError('Failed to calculate payment details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [vehicleType, count]);

//   const handleConfirmPayment = () => {
//     // Redirect to a Confirmation or Receipt page
//     navigate(`/confirmation/${id}/${slotId}`);
//   };

//   const handleGoBack = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <main className="flex-grow pt-16">
//         <section className="bg-white py-12 shadow-md rounded-lg">
//           <div className="container mx-auto px-4">
//             {loading ? (
//               <div className="flex justify-center items-center h-48">
//                 <div className="loader">Loading...</div>
//               </div>
//             ) : error ? (
//               <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
//                 {error}
//               </div>
//             ) : (
//               <div>
//                 <button
//                   onClick={handleGoBack}
//                   className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
//                 >
//                   <FaArrowLeft className="mr-2" /> Back
//                 </button>

//                 <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment Details</h1>
                
//                 <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6">
//                   <h2 className="text-2xl font-semibold text-teal-700 mb-4">
//                     Vehicle Type: {vehicleType.replace('_', ' ')}
//                   </h2>
//                   <p className="text-gray-600 mb-4">Amount to be paid:</p>
//                   <div className="text-3xl font-bold text-teal-600 mb-4">${amount}</div>
                  
//                   <button
//                     onClick={handleConfirmPayment}
//                     className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
//                   >
//                     Confirm Payment
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Payment;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const VEHICLE_RATES = {
  LEVEL_1: 20,
  LEVEL_2: 30,
  DC_FAST_CHARGING: 50
};

function Payment() {
  const { id, slotId, deviceType } = useParams();
  const [count, setCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (VEHICLE_RATES[deviceType]) {
      setTotalAmount(VEHICLE_RATES[deviceType] * count);
    } else {
      navigate('/');
    }
  }, [count, deviceType, navigate]);

  const handleConfirmPayment = () => {
    // Navigate to confirmation page with booking details
    navigate(`/confirmation/${id}/${slotId}/${deviceType}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
        <section className="bg-white py-12 shadow-md rounded-lg">
          <div className="container mx-auto px-4">
            <button
              onClick={handleGoBack}
              className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>

            <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment</h1>
            <div className="p-6 border rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-bold text-teal-700 mb-4">Device Type: {deviceType.replace('_', ' ')}</h2>
              <p className="text-gray-600 mb-4">Rate per unit: ${VEHICLE_RATES[deviceType]}</p>

              <div className="flex items-center mb-4">
                <label className="text-gray-700 mr-4">Quantity:</label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  min="1"
                  className="border p-2 rounded-lg w-20"
                />
              </div>

              <p className="text-lg font-semibold text-teal-700 mb-4">Total Amount: ${totalAmount}</p>

              <button
                onClick={handleConfirmPayment}
                className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Payment;
