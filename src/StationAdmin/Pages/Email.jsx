

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EmailForm = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [file, setFile] = useState(null); // State for file upload
    const [recipients, setRecipients] = useState([]); // State for email recipients

    // Fetch user emails from the backend
    useEffect(() => {
        const fetchUserEmails = async () => {
            try {
                const response = await fetch('http://localhost:1000/User/getAllUserEmails');
                if (response.ok) {
                    const data = await response.json();
                    setRecipients(data);
                } else {
                    console.error('Failed to fetch user emails');
                }
            } catch (error) {
                console.error('Error fetching user emails:', error);
            }
        };

        fetchUserEmails();
    }, []);

    // Handle input change for subject and message
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('body', formData.message);
        if (file) {
            formDataToSend.append('attachment', file);
        }

        // Add recipients as multiple 'to' parameters
        recipients.forEach(email => formDataToSend.append('to', email));
    
        try {
            const response = await fetch('http://localhost:1000/User/sendEmailToAll', {
                method: 'POST',
                body: formDataToSend,
            });
    
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Email sent successfully to all users!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Clear the form after success
                    setFormData({ subject: '', message: '' });
                    setFile(null);
                });
            } else {
                const errorText = await response.text();
                Swal.fire({
                    title: 'Failed!',
                    text: `Failed to send email: ${errorText}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while sending the email.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16"> {/* Added pt-16 for top padding */}
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-2xl font-semibold mb-6 text-center">Send Email To All Users</h3>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter subject"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
                                name="message"
                                rows="8"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your message here"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Attachment (optional)</label>
                            <input
                                type="file"
                                name="attachment"
                                className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                Send Email
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailForm;


// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';

// const EmailForm = () => {
//     const [formData, setFormData] = useState({
//         subject: '',
//         message: ''
//     });
//     const [file, setFile] = useState(null);
//     const [recipientType, setRecipientType] = useState('users'); // State to toggle between users and admins
//     const [recipients, setRecipients] = useState([]);

//     // Fetch recipient emails based on the recipient type
//     useEffect(() => {
//         const fetchRecipients = async () => {
//             try {
//                 const url = recipientType === 'users'
//                     ? 'http://localhost:1000/User/getAllUserEmails'
//                     : 'http://localhost:1000/StationAdmin/getAllStationAdminEmails';

//                 const response = await fetch(url);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRecipients(data);
//                 } else {
//                     Swal.fire({
//                         title: 'Failed!',
//                         text: `Failed to fetch ${recipientType} emails.`,
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error fetching recipient emails:', error);
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'An error occurred while fetching recipient emails.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         };

//         fetchRecipients();
//     }, [recipientType]);

//     // Handle input change for subject and message
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle file input change
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // Handle recipient type toggle
//     const handleRecipientToggle = (type) => {
//         setRecipientType(type);
//         setFormData({ subject: '', message: '' }); // Clear form when toggling
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (recipients.length === 0) {
//             Swal.fire({
//                 title: 'No Recipients!',
//                 text: 'No recipients available to send emails to.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         const formDataToSend = new FormData();
//         formDataToSend.append('subject', formData.subject);
//         formDataToSend.append('body', formData.message);
//         if (file) {
//             formDataToSend.append('attachment', file);
//         }

//         recipients.forEach(email => formDataToSend.append('to', email));

//         const url = recipientType === 'users'
//             ? 'http://localhost:1000/User/sendEmailToAll'
//             : 'http://localhost:1000/User/sendEmailToAdmin';

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 body: formDataToSend,
//             });

//             if (response.ok) {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: `Email sent successfully to all ${recipientType === 'users' ? 'users' : 'station admins'}!`,
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 }).then(() => {
//                     setFormData({ subject: '', message: '' });
//                     setFile(null);
//                 });
//             } else {
//                 const errorText = await response.text();
//                 Swal.fire({
//                     title: 'Failed!',
//                     text: `Failed to send email: ${errorText}`,
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         } catch (error) {
//             console.error('Error sending email:', error);
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'An error occurred while sending the email.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
//             <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
//                 <h3 className="text-2xl font-semibold mb-6 text-center">Send Email To All</h3>
//                 <div className="flex justify-center mb-6">
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-l-lg ${recipientType === 'users' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('users')}
//                     >
//                         Users
//                     </button>
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-r-lg ${recipientType === 'admins' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('admins')}
//                     >
//                         Admin
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="space-y-6">
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Subject</label>
//                             <input
//                                 type="text"
//                                 name="subject"
//                                 value={formData.subject}
//                                 onChange={handleChange}
//                                 placeholder="Enter subject"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Message</label>
//                             <textarea
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 name="message"
//                                 rows="8"
//                                 value={formData.message}
//                                 onChange={handleChange}
//                                 placeholder={`Enter your message for ${recipientType === 'users' ? 'users' : 'admin'} here`}
//                                 required
//                             ></textarea>
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Attachment (optional)</label>
//                             <input
//                                 type="file"
//                                 name="attachment"
//                                 className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <div className="text-center mt-8">
//                             <button
//                                 type="submit"
//                                 className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                             >
//                                 Send Email
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EmailForm;



// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';

// const EmailForm = () => {
//     const [formData, setFormData] = useState({
//         subject: '',
//         message: ''
//     });
//     const [file, setFile] = useState(null);
//     const [recipientType, setRecipientType] = useState('users'); // State to toggle between users and admins
//     const [recipients, setRecipients] = useState([]);

//     // Fetch recipient emails based on the recipient type
//     useEffect(() => {
//         const fetchRecipients = async () => {
//             try {
//                 const url = recipientType === 'users'
//                     ? 'http://localhost:1000/User/getAllUserEmails'
//                     : 'http://localhost:1000/User/sendEmailToAdminBy';

//                 const response = await fetch(url);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRecipients(data);
//                 } else {
//                     Swal.fire({
//                         title: 'Failed!',
//                         text: `Failed to fetch ${recipientType} emails.`,
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error fetching recipient emails:', error);
//                 Swal.fire({
//                     title: 'Error!',
//                     text: 'An error occurred while fetching recipient emails.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         };

//         fetchRecipients();
//     }, [recipientType]);

//     // Handle input change for subject and message
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle file input change
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // Handle recipient type toggle
//     const handleRecipientToggle = (type) => {
//         setRecipientType(type);
//         setFormData({ subject: '', message: '' }); // Clear form when toggling
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (recipients.length === 0) {
//             Swal.fire({
//                 title: 'No Recipients!',
//                 text: 'No recipients available to send emails to.',
//                 icon: 'warning',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         const formDataToSend = new FormData();
//         formDataToSend.append('subject', formData.subject);
//         formDataToSend.append('body', formData.message);
//         if (file) {
//             formDataToSend.append('attachment', file);
//         }

//         recipients.forEach(email => formDataToSend.append('to', email));

//         // Adjust URL based on recipient type
//         const url = recipientType === 'users'
//             ? 'http://localhost:1000/User/sendEmailToAll'
//             : 'http://localhost:1000/User/sendEmailToAdmin';

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 body: formDataToSend,
//             });

//             if (response.ok) {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: `Email sent successfully to all ${recipientType === 'users' ? 'users' : 'station admins'}!`,
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 }).then(() => {
//                     setFormData({ subject: '', message: '' });
//                     setFile(null);
//                 });
//             } else {
//                 const errorText = await response.text();
//                 Swal.fire({
//                     title: 'Failed!',
//                     text: `Failed to send email: ${errorText}`,
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         } catch (error) {
//             console.error('Error sending email:', error);
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'An error occurred while sending the email.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
//             <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
//                 <h3 className="text-2xl font-semibold mb-6 text-center">Send Email To All</h3>
//                 <div className="flex justify-center mb-6">
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-l-lg ${recipientType === 'users' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('users')}
//                     >
//                         Users
//                     </button>
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-r-lg ${recipientType === 'admins' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('admins')}
//                     >
//                         Admin
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="space-y-6">
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Subject</label>
//                             <input
//                                 type="text"
//                                 name="subject"
//                                 value={formData.subject}
//                                 onChange={handleChange}
//                                 placeholder="Enter subject"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Message</label>
//                             <textarea
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 name="message"
//                                 rows="8"
//                                 value={formData.message}
//                                 onChange={handleChange}
//                                 placeholder={`Enter your message for ${recipientType === 'users' ? 'users' : 'admin'} here`}
//                                 required
//                             ></textarea>
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Attachment (optional)</label>
//                             <input
//                                 type="file"
//                                 name="attachment"
//                                 className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <div className="text-center mt-8">
//                             <button
//                                 type="submit"
//                                 className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                             >
//                                 Send Email
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EmailForm;


// import React, { useState } from 'react';
// import Swal from 'sweetalert2';

// const EmailForm = () => {
//     const [formData, setFormData] = useState({
//         subject: '',
//         message: ''
//     });
//     const [file, setFile] = useState(null);
//     const [recipientType, setRecipientType] = useState('users'); // Default recipient type

//     // Retrieve stationId from session storage
//     const stationId = sessionStorage.getItem('userId'); // Use session storage

//     // Handle input change for subject and message
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle file input change
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // Handle recipient type toggle
//     const handleRecipientToggle = (type) => {
//         setRecipientType(type);
//         setFormData({ subject: '', message: '' }); // Clear form when toggling
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stationId) {
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'Station ID is missing.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         const formDataToSend = new FormData();
//         formDataToSend.append('stationId', stationId); // Include the stationId in the form data
//         formDataToSend.append('subject', formData.subject);
//         formDataToSend.append('body', formData.message);
//         if (file) {
//             formDataToSend.append('attachment', file);
//         }

//         const url = recipientType === 'users'
//             ? 'http://localhost:1000/User/sendEmailToAll' // Adjust endpoint as needed
//             : 'http://localhost:1000/User/sendEmailToAdminBy'; // Adjust URL based on recipient type

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 body: formDataToSend,
//                 credentials: 'include' // Ensure credentials (like session cookies) are sent with the request
//             });

//             if (response.ok) {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: `Email sent successfully to all ${recipientType === 'users' ? 'users' : 'admins'}!`,
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 }).then(() => {
//                     setFormData({ subject: '', message: '' });
//                     setFile(null);
//                 });
//             } else {
//                 const errorText = await response.text();
//                 Swal.fire({
//                     title: 'Failed!',
//                     text: `Failed to send email: ${errorText}`,
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         } catch (error) {
//             console.error('Error sending email:', error);
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'An error occurred while sending the email.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
//             <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
//                 <h3 className="text-2xl font-semibold mb-6 text-center">Send Email</h3>
//                 <div className="flex justify-center mb-6">
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-l-lg ${recipientType === 'users' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('users')}
//                     >
//                         Users
//                     </button>
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-r-lg ${recipientType === 'admins' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('admins')}
//                     >
//                         Admin
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="space-y-6">
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Subject</label>
//                             <input
//                                 type="text"
//                                 name="subject"
//                                 value={formData.subject}
//                                 onChange={handleChange}
//                                 placeholder="Enter subject"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Message</label>
//                             <textarea
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 name="message"
//                                 rows="8"
//                                 value={formData.message}
//                                 onChange={handleChange}
//                                 placeholder={`Enter your message for ${recipientType === 'users' ? 'users' : 'admin'} here`}
//                                 required
//                             ></textarea>
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Attachment (optional)</label>
//                             <input
//                                 type="file"
//                                 name="attachment"
//                                 className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <div className="text-center mt-8">
//                             <button
//                                 type="submit"
//                                 className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                             >
//                                 Send Email
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EmailForm;
// import React, { useState } from 'react';
// import Swal from 'sweetalert2';

// const EmailForm = () => {
//     const [formData, setFormData] = useState({
//         subject: '',
//         message: ''
//     });
//     const [file, setFile] = useState(null);
//     const [recipientType, setRecipientType] = useState('users'); // Default recipient type

//     // Retrieve stationId from session storage
//     const stationId = sessionStorage.getItem('userId'); // Use session storage

//     // Handle input change for subject and message
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle file input change
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // Handle recipient type toggle
//     const handleRecipientToggle = (type) => {
//         setRecipientType(type);
//         setFormData({ subject: '', message: '' }); // Clear form when toggling
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!stationId) {
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'Station ID is missing.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         const formDataToSend = new FormData();
//         formDataToSend.append('stationId', stationId); // Include the stationId in the form data
//         formDataToSend.append('subject', formData.subject);
//         formDataToSend.append('body', formData.message);
//         if (file) {
//             formDataToSend.append('attachment', file);
//         }

//         const url = recipientType === 'users'
//             ? 'http://localhost:1000/User/sendEmailToAll' // Adjust endpoint as needed
//             : 'http://localhost:1000/User/sendEmailToAdminBy'; // Adjust URL based on recipient type

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 body: formDataToSend,
//                 credentials: 'include' // Ensure credentials (like session cookies) are sent with the request
//             });

//             console.log('Response Status:', response.status); // Debugging line
//             console.log('Response Headers:', response.headers); // Debugging line

//             const responseText = await response.text();
//             console.log('Response Text:', responseText); // Debugging line

//             if (response.ok) {
//                 Swal.fire({
//                     title: 'Success!',
//                     text: `Email sent successfully to all ${recipientType === 'users' ? 'users' : 'admins'}!`,
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 }).then(() => {
//                     setFormData({ subject: '', message: '' });
//                     setFile(null);
//                 });
//             } else {
//                 Swal.fire({
//                     title: 'Failed!',
//                     text: `Failed to send email: ${responseText}`,
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         } catch (error) {
//             console.error('Error sending email:', error); // Debugging line
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'An error occurred while sending the email.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
//             <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
//                 <h3 className="text-2xl font-semibold mb-6 text-center">Send Email</h3>
//                 <div className="flex justify-center mb-6">
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-l-lg ${recipientType === 'users' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('users')}
//                     >
//                         Users
//                     </button>
//                     <button
//                         type="button"
//                         className={`px-4 py-2 rounded-r-lg ${recipientType === 'admins' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
//                         onClick={() => handleRecipientToggle('admins')}
//                     >
//                         Admin
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="space-y-6">
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Subject</label>
//                             <input
//                                 type="text"
//                                 name="subject"
//                                 value={formData.subject}
//                                 onChange={handleChange}
//                                 placeholder="Enter subject"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Message</label>
//                             <textarea
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 name="message"
//                                 rows="8"
//                                 value={formData.message}
//                                 onChange={handleChange}
//                                 placeholder={`Enter your message for ${recipientType === 'users' ? 'users' : 'admin'} here`}
//                                 required
//                             ></textarea>
//                         </div>
//                         <div className="form-group">
//                             <label className="block text-sm font-medium text-gray-700">Attachment (optional)</label>
//                             <input
//                                 type="file"
//                                 name="attachment"
//                                 className="mt-1 block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-3"
//                                 onChange={handleFileChange}
//                             />
//                         </div>
//                         <div className="text-center mt-8">
//                             <button
//                                 type="submit"
//                                 className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                             >
//                                 Send Email
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EmailForm;
