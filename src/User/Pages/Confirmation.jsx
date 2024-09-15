//before validation

// import html2canvas from 'html2canvas';
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { FaArrowLeft } from 'react-icons/fa';

// const VEHICLE_RATES = {
//     LEVEL_1: 20,
//     LEVEL_2: 30,
//     DC_FAST_CHARGING: 50
// };
// const TAX_RATE = 0.10;

// function PaymentConfirmation() {
//     const { bookingId, slotId, deviceType } = useParams();
//     const [count, setCount] = useState(1);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [amountWithTax, setAmountWithTax] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [upiId, setUpiId] = useState('');
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');
//     const [cvv, setCvv] = useState('');
//     const [stationLocation, setStationLocation] = useState({ lat: null, lon: null });
//     const [currentLocation, setCurrentLocation] = useState({ lat: null, lon: null });
//     const [mapImage, setMapImage] = useState(null);
//     const mapRef = useRef();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedStation = sessionStorage.getItem('selectedStation');
//         if (storedStation) {
//             const station = JSON.parse(storedStation);
//             setStationLocation({ lat: station.latitude, lon: station.longitude });
//         }

//         navigator.geolocation.getCurrentPosition(position => {
//             setCurrentLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
//         });
//     }, []);

//     useEffect(() => {
//         if (VEHICLE_RATES[deviceType]) {
//             const baseAmount = VEHICLE_RATES[deviceType] * count;
//             setTotalAmount(baseAmount);
//             const taxAmount = baseAmount * TAX_RATE;
//             setAmountWithTax(baseAmount + taxAmount);
//         } else {
//             navigate('/');
//         }
//     }, [count, deviceType, navigate]);

//     useEffect(() => {
//         if (stationLocation.lat && stationLocation.lon && currentLocation.lat && currentLocation.lon) {
//             captureMapImage();
//         }
//     }, [stationLocation, currentLocation]);

//     const captureMapImage = () => {
//         if (mapRef.current) {
//             html2canvas(mapRef.current).then(canvas => {
//                 const img = canvas.toDataURL('image/png');
//                 const base64Image = img.split(',')[1];
//                 setMapImage(base64Image);
//                 console.log('Captured map image:', base64Image);
//             }).catch(error => {
//                 console.error('Error capturing map image:', error);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Map Capture Error',
//                     text: 'Failed to capture map image. Please try again.',
//                 });
//             });
//         } else {
//             console.error('Map reference is not set.');
//         }
//     };

//     const generateDirectionsUrl = (originLat, originLon, destLat, destLon) => {
//         return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLon}&destination=${destLat},${destLon}`;
//     };

//     const handlePayment = async () => {
//         if (!bookingId || isNaN(parseInt(bookingId, 10))) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Validation Error',
//                 text: 'Invalid booking ID.',
//             });
//             return;
//         }

//         let errors = {};
//         if (paymentMethod === 'upi') {
//             if (!upiId) errors.upiId = 'UPI ID is required.';
//         } else if (paymentMethod === 'credit_card') {
//             if (!cardNumber || !/^\d{16}$/.test(cardNumber)) errors.cardNumber = 'A valid 16-digit card number is required.';
//             if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) errors.expiryDate = 'Expiry date (MM/YY) is required.';
//             if (!cvv || !/^\d{3}$/.test(cvv)) errors.cvv = 'CVV (3 digits) is required.';
//         }

//         if (Object.keys(errors).length > 0) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Validation Error',
//                 text: Object.values(errors).join(' '),
//             });
//             return;
//         }

//         try {
//             const paymentData = {
//                 booking: { bookingId: parseInt(bookingId, 10) },
//                 amount: amountWithTax,
//                 paymentMethod: paymentMethod.toUpperCase(),
//                 paymentStatus: 'SUCCESSFUL',
//                 paymentTime: new Date().toISOString(),
//                 deviceType: deviceType,
//                 ...(paymentMethod === 'upi' && { upiId: upiId }),
//                 ...(paymentMethod === 'credit_card' && {
//                     cardNumber: cardNumber,
//                     expiryDate: expiryDate,
//                     cvv: cvv
//                 }),
//                 slotId: slotId,
//                 stationLocation,
//                 currentLocation,
//                 mapImage, // Ensure this is not null
//                 mapLocationUrl: generateDirectionsUrl(
//                     currentLocation.lat,
//                     currentLocation.lon,
//                     stationLocation.lat,
//                     stationLocation.lon
//                 ) // Include the map location URL
//             };

//             console.log('Payment Data:', paymentData);

//             const paymentResponse = await axios.post('http://localhost:1000/payments', paymentData);

//             console.log('Payment Response Status:', paymentResponse.status);

//             if (paymentResponse.status === 201) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Payment Successful',
//                     text: 'Your payment has been processed successfully. You will receive a confirmation email shortly.',
//                 }).then(() => {
//                     navigate(`/amountpaid/${bookingId}/${slotId}`);
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Payment Error',
//                     text: 'There was an error processing your payment. Please try again later.',
//                 });
//             }
//         } catch (error) {
//             console.error('Payment error:', error.response ? error.response.data : error.message);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Payment Error',
//                 text: error.response ? error.response.data.message : 'There was an error processing your payment. Please try again later.',
//             });
//         }
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     return (
//         <div>
//             <main className="container mx-auto p-4">
//                 <button
//                     onClick={handleGoBack}
//                     className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md mb-6 hover:bg-teal-700 transition duration-300"
//                 >
//                     <FaArrowLeft className="inline-block mr-2" />
//                     Go Back
//                 </button>
//                 <section>
//                     <div className="p-6 border rounded-lg shadow-lg">
//                         <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment</h1>
//                         <div className="p-6 border rounded-lg shadow-lg mb-6">
//                             <h2 className="text-xl font-bold text-teal-700 mb-4">
//                                 Device Type: {deviceType.replace('_', ' ')}
//                             </h2>
//                             <p className="text-gray-600 mb-4">Rate per unit: ${VEHICLE_RATES[deviceType]}</p>
//                             <div className="flex items-center mb-4">
//                                 <label className="text-gray-700 mr-4">Quantity:</label>
//                                 <input
//                                     type="number"
//                                     value={count}
//                                     onChange={(e) => setCount(Number(e.target.value))}
//                                     min="1"
//                                     className="border p-2 rounded-lg w-20"
//                                 />
//                             </div>
//                             <p className="text-lg font-semibold text-teal-700 mb-4">
//                                 Total Amount: ${totalAmount}
//                             </p>
//                             <p className="text-lg font-semibold text-teal-700 mb-4">
//                                 Tax (10%): ${totalAmount * TAX_RATE}
//                             </p>
//                             <p className="text-lg font-semibold text-teal-700 mb-4">
//                                 Amount with Tax: ${amountWithTax.toFixed(2)}
//                             </p>

//                             <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6">
//                                 <h2 className="text-2xl font-bold text-teal-700 mb-4">Select Payment Method</h2>
//                                 <div>
//                                     <label className="block mb-4">
//                                         <input
//                                             type="radio"
//                                             value="upi"
//                                             checked={paymentMethod === 'upi'}
//                                             onChange={(e) => setPaymentMethod(e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         UPI
//                                     </label>
//                                     <label className="block mb-4">
//                                         <input
//                                             type="radio"
//                                             value="credit_card"
//                                             checked={paymentMethod === 'credit_card'}
//                                             onChange={(e) => setPaymentMethod(e.target.value)}
//                                             className="mr-2"
//                                         />
//                                         Credit Card
//                                     </label>
//                                 </div>

//                                 {paymentMethod === 'upi' && (
//                                     <div className="mb-4">
//                                         <label className="block text-gray-700 mb-2">UPI ID:</label>
//                                         <input
//                                             type="text"
//                                             value={upiId}
//                                             onChange={(e) => setUpiId(e.target.value)}
//                                             className="border p-2 rounded-lg w-full"
//                                         />
//                                     </div>
//                                 )}
//                                 {paymentMethod === 'credit_card' && (
//                                     <div>
//                                         <label className="block text-gray-700 mb-2">Card Number:</label>
//                                         <input
//                                             type="text"
//                                             value={cardNumber}
//                                             onChange={(e) => setCardNumber(e.target.value)}
//                                             className="border p-2 rounded-lg w-full mb-4"
//                                         />
//                                         <label className="block text-gray-700 mb-2">Expiry Date (MM/YY):</label>
//                                         <input
//                                             type="text"
//                                             value={expiryDate}
//                                             onChange={(e) => setExpiryDate(e.target.value)}
//                                             className="border p-2 rounded-lg w-full mb-4"
//                                         />
//                                         <label className="block text-gray-700 mb-2">CVV:</label>
//                                         <input
//                                             type="text"
//                                             value={cvv}
//                                             onChange={(e) => setCvv(e.target.value)}
//                                             className="border p-2 rounded-lg w-full"
//                                         />
//                                     </div>
//                                 )}
//                             </div>

//                             <button
//                                 onClick={handlePayment}
//                                 className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md mt-6 hover:bg-teal-700 transition duration-300"
//                             >
//                                 Confirm Payment
//                             </button>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// }

// export default PaymentConfirmation;


//after validation

import html2canvas from 'html2canvas';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const VEHICLE_RATES = {
    LEVEL_1: 20,
    LEVEL_2: 30,
    DC_FAST_CHARGING: 50
};
const TAX_RATE = 0.10;

function PaymentConfirmation() {
    const { bookingId, slotId, deviceType } = useParams();
    const [count, setCount] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [amountWithTax, setAmountWithTax] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [stationLocation, setStationLocation] = useState({ lat: null, lon: null });
    const [currentLocation, setCurrentLocation] = useState({ lat: null, lon: null });
    const [mapImage, setMapImage] = useState(null);
    const mapRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const storedStation = sessionStorage.getItem('selectedStation');
        if (storedStation) {
            const station = JSON.parse(storedStation);
            setStationLocation({ lat: station.latitude, lon: station.longitude });
        }

        navigator.geolocation.getCurrentPosition(position => {
            setCurrentLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
    }, []);

    useEffect(() => {
        if (VEHICLE_RATES[deviceType]) {
            const baseAmount = VEHICLE_RATES[deviceType] * count;
            setTotalAmount(baseAmount);
            const taxAmount = baseAmount * TAX_RATE;
            setAmountWithTax(baseAmount + taxAmount);
        } else {
            navigate('/');
        }
    }, [count, deviceType, navigate]);

    useEffect(() => {
        if (stationLocation.lat && stationLocation.lon && currentLocation.lat && currentLocation.lon) {
            captureMapImage();
        }
    }, [stationLocation, currentLocation]);

    const captureMapImage = () => {
        if (mapRef.current) {
            html2canvas(mapRef.current).then(canvas => {
                const img = canvas.toDataURL('image/png');
                const base64Image = img.split(',')[1];
                setMapImage(base64Image);
                console.log('Captured map image:', base64Image);
            }).catch(error => {
                console.error('Error capturing map image:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Map Capture Error',
                    text: 'Failed to capture map image. Please try again.',
                });
            });
        } else {
            console.error('Map reference is not set.');
        }
    };

    const generateDirectionsUrl = (originLat, originLon, destLat, destLon) => {
        return `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLon}&destination=${destLat},${destLon}`;
    };

    const validateUPI = (upi) => {
        // Basic validation: UPI ID should not be empty and should not contain special characters
        return /^[a-zA-Z0-9._@]+$/.test(upi);
    };

    const validateCardNumber = (number) => {
        // Validate card number as exactly 16 digits
        return /^\d{16}$/.test(number);
    };

    const validateExpiryDate = (date) => {
        // Validate expiry date in MM/YY format
        const [month, year] = date.split('/').map(part => part.trim());
        if (!/^\d{2}$/.test(month) || !/^\d{2}$/.test(year)) return false;

        const inputMonth = parseInt(month, 10);
        const inputYear = parseInt(year, 10) + 2000;
        const currentDate = new Date();

        if (inputYear < currentDate.getFullYear()) return false;
        if (inputYear === currentDate.getFullYear() && inputMonth < currentDate.getMonth() + 1) return false;
        if (inputMonth < 1 || inputMonth > 12) return false;

        return true;
    };

    const validateCVV = (cvv) => {
        // Validate CVV as exactly 3 digits
        return /^\d{3}$/.test(cvv);
    };

    const handlePayment = async () => {
        if (!bookingId || isNaN(parseInt(bookingId, 10))) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Invalid booking ID.',
            });
            return;
        }

        let errors = {};
        if (paymentMethod === 'upi') {
            if (!upiId || !validateUPI(upiId)) errors.upiId = 'A valid UPI ID is required.';
        } else if (paymentMethod === 'credit_card') {
            if (!cardNumber || !validateCardNumber(cardNumber)) errors.cardNumber = 'A valid 16-digit card number is required.';
            if (!expiryDate || !validateExpiryDate(expiryDate)) errors.expiryDate = 'A valid expiry date (MM/YY) is required.';
            if (!cvv || !validateCVV(cvv)) errors.cvv = 'CVV (3 digits) is required.';
        }

        if (Object.keys(errors).length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: Object.values(errors).join(' '),
            });
            return;
        }

        try {
            const paymentData = {
                booking: { bookingId: parseInt(bookingId, 10) },
                amount: amountWithTax,
                paymentMethod: paymentMethod.toUpperCase(),
                paymentStatus: 'SUCCESSFUL',
                paymentTime: new Date().toISOString(),
                deviceType: deviceType,
                ...(paymentMethod === 'upi' && { upiId: upiId }),
                ...(paymentMethod === 'credit_card' && {
                    cardNumber: cardNumber,
                    expiryDate: expiryDate,
                    cvv: cvv
                }),
                slotId: slotId,
                stationLocation,
                currentLocation,
                mapImage, // Ensure this is not null
                mapLocationUrl: generateDirectionsUrl(
                    currentLocation.lat,
                    currentLocation.lon,
                    stationLocation.lat,
                    stationLocation.lon
                ) // Include the map location URL
            };

            console.log('Payment Data:', paymentData);

            const paymentResponse = await axios.post('http://localhost:1000/payments', paymentData);

            console.log('Payment Response Status:', paymentResponse.status);

            if (paymentResponse.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: 'Your payment has been processed successfully. You will receive a confirmation email shortly.',
                }).then(() => {
                    navigate(`/amountpaid/${bookingId}/${slotId}`);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Error',
                    text: 'There was an error processing your payment. Please try again later.',
                });
            }
        } catch (error) {
            console.error('Payment error:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: error.response ? error.response.data.message : 'There was an error processing your payment. Please try again later.',
            });
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <main className="container mx-auto p-4">
                <button
                    onClick={handleGoBack}
                    className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md mb-6 hover:bg-teal-700 transition duration-300"
                >
                    <FaArrowLeft className="inline-block mr-2" />
                    Go Back
                </button>
                <section>
                    <div className="p-6 border rounded-lg shadow-lg">
                        <h1 className="text-3xl font-bold text-teal-700 mb-4">Payment</h1>
                        <div className="p-6 border rounded-lg shadow-lg mb-6">
                            <h2 className="text-xl font-bold text-teal-700 mb-4">
                                Device Type: {deviceType.replace('_', ' ')}
                            </h2>
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
                            <p className="text-lg font-semibold text-teal-700 mb-4">
                                Total Amount: ${totalAmount}
                            </p>
                            <p className="text-lg font-semibold text-teal-700 mb-4">
                                Tax (10%): ${totalAmount * TAX_RATE}
                            </p>
                            <p className="text-lg font-semibold text-teal-700 mb-4">
                                Amount with Tax: ${amountWithTax.toFixed(2)}
                            </p>

                            <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-teal-700 mb-4">Select Payment Method</h2>
                                <div>
                                    <label className="block mb-4">
                                        <input
                                            type="radio"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        UPI
                                    </label>
                                    <label className="block mb-4">
                                        <input
                                            type="radio"
                                            value="credit_card"
                                            checked={paymentMethod === 'credit_card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-2"
                                        />
                                        Credit Card
                                    </label>
                                </div>

                                {paymentMethod === 'upi' && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">UPI ID:</label>
                                        <input
                                            type="text"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            className="border p-2 rounded-lg w-full"
                                        />
                                    </div>
                                )}
                                {paymentMethod === 'credit_card' && (
                                    <div>
                                        <label className="block text-gray-700 mb-2">Card Number:</label>
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />
                                        <label className="block text-gray-700 mb-2">Expiry Date (MM/YY):</label>
                                        <input
                                            type="text"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            className="border p-2 rounded-lg w-full mb-4"
                                        />
                                        <label className="block text-gray-700 mb-2">CVV:</label>
                                        <input
                                            type="text"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            className="border p-2 rounded-lg w-full"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handlePayment}
                                className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md mt-6 hover:bg-teal-700 transition duration-300"
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

export default PaymentConfirmation;
