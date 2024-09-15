// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// function Update() {
//   const { id } = useParams();
//   const [data, setData] = useState({
//     id: '',
//     name: '',
//     age: '',
//     city: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5001/Data/${id}`)
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:5001/Data/${id}`, data)
//       .then(() => {
//         Swal.fire({
//           title: 'Success!',
//           text: 'Employee updated successfully',
//           icon: 'success',
//           confirmButtonColor: '#3085d6',
//           confirmButtonText: 'OK'
//         }).then(() => {
//           navigate('/');
//         });
//       })
//       .catch((err) => {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Failed to update employee',
//           icon: 'error',
//           confirmButtonColor: '#d33',
//           confirmButtonText: 'OK'
//         });
//         console.log(err);
//       });
//   };

//   return (
//     <div className="flex w-full h-screen justify-center items-center bg-gray-200">
//       <div className="w-full max-w-md border rounded-lg bg-white shadow-lg p-8">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-600">Update Employee</h1>
//           <div className="mb-6">
//             <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
//             <input
//               type="text"
//               name="id"
//               disabled
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500"
//               value={data.id}
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={data.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
//             <input
//               type="number"
//               name="age"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={data.age}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//             <input
//               type="text"
//               name="city"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               value={data.city}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Update;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

function Update() {
  const { id } = useParams();
  const [data, setData] = useState({
    id: '',
    name: '',
    age: '',
    city: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/Data/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/Data/${id}`, data)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee updated successfully',
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
          text: 'Failed to update employee',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
        console.log(err);
      });
  };

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gray-200">
      <div className="w-full max-w-md border rounded-lg bg-white shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-600">Update Employee</h1>
          
          {/* ID Field */}
          <div className="mb-6">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500"
              value={data.id}
            />
          </div>

          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          {/* Age Field */}
          <div className="mb-6">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.age}
              onChange={handleChange}
            />
          </div>

          {/* City Field */}
          <div className="mb-6">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.city}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={data.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
