

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EmailForm = () => {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [file, setFile] = useState(null);
    const [recipientType, setRecipientType] = useState('users');
    const [recipients, setRecipients] = useState([]); // State for email recipients

    // Fetch recipient emails based on the recipient type
    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const url = recipientType === 'users'
                    ? 'http://localhost:1000/User/getAllUserEmails'
                    : 'http://localhost:1000/StationAdmin/getAllStationAdminEmails';

                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setRecipients(data); // Set recipients based on response
                } else {
                    Swal.fire({
                        title: 'Failed!',
                        text: 'Failed to fetch recipient emails from the backend.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Error fetching recipient emails:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while fetching recipient emails.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchRecipients();
    }, [recipientType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRecipientToggle = (type) => {
        setRecipientType(type);
        setFormData({ subject: '', message: '' }); // Clear form when toggling
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recipients.length === 0) {
            Swal.fire({
                title: 'No Recipients!',
                text: 'No recipients available to send emails to.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('body', formData.message);
        if (file) {
            formDataToSend.append('attachment', file);
        }

        recipients.forEach(email => formDataToSend.append('to', email));

        const url = recipientType === 'users'
            ? 'http://localhost:1000/User/sendEmailToAll'
            : 'http://localhost:1000/StationAdmin/sendEmailToAll';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: `Email sent successfully to all ${recipientType === 'users' ? 'users' : 'station admins'}!`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-2xl font-semibold mb-6 text-center">Send Email To All</h3>
                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        className={`px-11 py-2 rounded-l-lg ${recipientType === 'users' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => handleRecipientToggle('users')}
                    >
                        Users
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-r-lg ${recipientType === 'stationAdmins' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => handleRecipientToggle('stationAdmins')}
                    >
                        Station Admins
                    </button>
                </div>
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
                                placeholder={`Enter your message for ${recipientType === 'users' ? 'users' : 'station admins'} here`}
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
