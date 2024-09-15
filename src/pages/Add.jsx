// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// function Add() {
//   const [inputData, setInputData] = useState({
//     name: '',
//     age: '',
//     city: ''
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let result = validateValues(inputData);

//     if (result === true) {
//       axios
//         .post('http://localhost:5001/Data', inputData)
//         .then((res) => {
//           Swal.fire({
//             title: 'Success!',
//             text: 'Data added successfully',
//             icon: 'success',
//             confirmButtonColor: '#3085d6',
//             confirmButtonText: 'OK'
//           }).then(() => {
//             navigate('/');
//           });
//         })
//         .catch((err) => {
//           Swal.fire({
//             title: 'Error!',
//             text: 'Failed to add data',
//             icon: 'error',
//             confirmButtonColor: '#d33',
//             confirmButtonText: 'OK'
//           });
//           console.log(err);
//         });
//     } else {
//       Swal.fire({
//         title: 'Validation Error!',
//         text: 'Please enter valid inputs!',
//         icon: 'warning',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'OK'
//       });
//     }
//   };

//   const validateValues = (inputData) => {
//     if (inputData.name.trim() === '') {
//       Swal.fire({
//         title: 'Validation Error!',
//         text: 'Please enter employee name!',
//         icon: 'warning',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'OK'
//       });
//       return false;
//     } else if (inputData.age.trim() === '') {
//       Swal.fire({
//         title: 'Validation Error!',
//         text: 'Please enter age!',
//         icon: 'warning',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'OK'
//       });
//       return false;
//     } else if (inputData.city.trim() === '') {
//       Swal.fire({
//         title: 'Validation Error!',
//         text: 'Please enter city!',
//         icon: 'warning',
//         confirmButtonColor: '#3085d6',
//         confirmButtonText: 'OK'
//       });
//       return false;
//     } else {
//       return true;
//     }
//   };

//   return (
//     <div className="flex w-full h-screen justify-center items-center bg-gray-100">
//       <div className="w-full max-w-lg border rounded-lg bg-white shadow-lg p-8">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-600">Add Employee</h1>
//           <div className="mb-6">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
//             <input
//               type="number"
//               name="age"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               onChange={(e) => setInputData({ ...inputData, age: e.target.value })}
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//             <input
//               type="text"
//               name="city"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               onChange={(e) => setInputData({ ...inputData, city: e.target.value })}
//             />
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 text-lg"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Add;

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Add() {
  const [inputData, setInputData] = useState({
    name: '',
    age: '',
    city: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validateValues(inputData);

    if (result === true) {
      axios
        .post('http://localhost:5001/Data', inputData)
        .then((res) => {
          Swal.fire({
            title: 'Success!',
            text: 'Data added successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/');
          });
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add data',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
          });
          console.log(err);
        });
    } else {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter valid inputs!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  };

  const validateValues = (inputData) => {
    if (inputData.name.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter employee name!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (inputData.age.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter age!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (inputData.city.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter city!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (inputData.email.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter email!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return false;
    } else if (inputData.password.trim() === '') {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please enter password!',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg border rounded-lg bg-white shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-600">Add Employee</h1>

          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={inputData.name}
              onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
            />
          </div>

          {/* Age Field */}
          <div className="mb-6">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={inputData.age}
              onChange={(e) => setInputData({ ...inputData, age: e.target.value })}
            />
          </div>

          {/* City Field */}
          <div className="mb-6">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={inputData.city}
              onChange={(e) => setInputData({ ...inputData, city: e.target.value })}
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={inputData.email}
              onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={inputData.password}
              onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
