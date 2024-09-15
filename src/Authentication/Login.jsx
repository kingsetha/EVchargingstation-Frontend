

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess, loginFailure } from '../redux/Action';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 
//   const error = useSelector((state) => state.data.error);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (email === '' || password === '') {
//       dispatch(loginFailure('Please fill in all fields'));
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:1000/User/login', { email, password });
  
//       if (response.data) {
//         const { userid, role, message } = response.data;
  
//         if (message === 'LoginSuccess') {
//           dispatch(loginSuccess({ userid: userid, role }));
  
//           sessionStorage.setItem('userId', userid);
//           sessionStorage.setItem('userRole', role);
  
//           await Swal.fire({
//             icon: 'success',
//             title: 'Login Successful',
//             text: 'You have been logged in successfully!',
//             timer: 2000,
//             showConfirmButton: false
//           });
  
          
//           switch (role) {
//             case 'user':
//               navigate('/UserDashboard');
//               break;
//             case 'station_admin':
//               navigate('/StationAdminDashboard');
//               break;
//             case 'admin':
//               navigate('/AdminDashboard');
//               break;
//             default:
//               navigate('/'); 
//           }
//         } else {
//           dispatch(loginFailure('Invalid email or password'));
//         }
//       }
//     } catch (error) {
//       let errorMessage = 'Login failed. Please try again.';
  
//       if (error.response) {
//         const status = error.response.status;
//         const message = error.response.data?.message || ''; 
  
//         if (status === 401) {
//           if (message.includes('pending approval')) {
//             errorMessage = 'Your account is pending approval. Please contact support.';
//           } else {
//             errorMessage = 'Incorrect credentials. Please try again.';
//           }
//         } else {
//           errorMessage = 'Login failed. Please try again.';
//         }
//       }
  
//       dispatch(loginFailure(errorMessage));
//     }
//   };
  

//   return (
//     <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8 relative">
//         <button 
//           onClick={() => navigate('/')}
//           className="absolute top-4 left-4 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//         >
//           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Login</h1>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-4 text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-teal-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginSuccess, loginFailure } from '../redux/Action';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 
//   const error = useSelector((state) => state.data.error);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (email === '' || password === '') {
//       dispatch(loginFailure('Please fill in all fields'));
//       return;
//     }
  
//     try {
//       const response = await axios.post('http://localhost:1000/User/login', { email, password });
  
//       if (response.data) {
//         const { userid, role, message } = response.data;
  
//         if (message === 'LoginSuccess') {
//           dispatch(loginSuccess({ userid: userid, role }));
  
//           sessionStorage.setItem('userId', userid);
//           sessionStorage.setItem('userRole', role);
  
//           await Swal.fire({
//             icon: 'success',
//             title: 'Login Successful',
//             text: 'You have been logged in successfully!',
//             timer: 2000,
//             showConfirmButton: false
//           });
  
//           switch (role) {
//             case 'user':
//               navigate('/UserDashboard');
//               break;
//             case 'station_admin':
//               navigate('/StationAdminDashboard');
//               break;
//             case 'admin':
//               navigate('/AdminDashboard');
//               break;
//             default:
//               navigate('/'); 
//           }
//         } else {
//           dispatch(loginFailure('Invalid email or password'));
//         }
//       }
//     } catch (error) {
//       let errorMessage = 'Login failed. Please try again.';
  
//       if (error.response) {
//         const status = error.response.status;
//         const message = error.response.data?.message || ''; 
  
//         if (status === 401) {
//           if (message.includes('pending approval')) {
//             errorMessage = 'Your account is pending approval. Please contact support.';
//           } else {
//             errorMessage = 'Incorrect credentials. Please try again.';
//           }
//         } else {
//           errorMessage = 'Login failed. Please try again.';
//         }
//       }
  
//       dispatch(loginFailure(errorMessage));
//     }
//   };

//   const handleRegisterClick = () => {
//     Swal.fire({
//       title: 'Register As',
//       text: 'Choose your registration type:',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'User',
//       cancelButtonText: 'Station Admin',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/Register');  // Adjust the path to your user registration route
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         navigate('/RegisterStation');  // Adjust the path to your station admin registration route
//       }
//     });
//   };

//   return (
//     <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8 relative">
//         <button 
//           onClick={() => navigate('/')}
//           className="absolute top-4 left-4 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//         >
//           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Login</h1>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-4 text-gray-600">
//           Don't have an account?{' '}
//           <button onClick={handleRegisterClick} className="text-teal-600 hover:underline">
//             Register
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/Action';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const error = useSelector((state) => state.data.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (email === '' || password === '') {
      dispatch(loginFailure('Please fill in all fields'));
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:1000/User/login', { email, password });
  
      if (response.data) {
        const { userid, role, message } = response.data;
  
        if (message === 'LoginSuccess') {
          dispatch(loginSuccess({ userid: userid, role }));
  
          sessionStorage.setItem('userId', userid);
          sessionStorage.setItem('userRole', role);
  
          await Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have been logged in successfully!',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              popup: 'bg-teal-900 text-white',
              title: 'text-teal-200',
              icon: 'text-teal-400'
            }
          });
  
          switch (role) {
            case 'user':
              navigate('/UserDashboard');
              break;
            case 'station_admin':
              navigate('/StationAdminDashboard');
              break;
            case 'admin':
              navigate('/AdminDashboard');
              break;
            default:
              navigate('/'); 
          }
        } else {
          dispatch(loginFailure('Invalid email or password'));
        }
      }
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';
  
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || '';
  
        if (status === 401) {
          if (message.includes('pending approval')) {
            errorMessage = 'Your account is pending approval. Please contact support.';
          } else {
            errorMessage = 'Incorrect credentials. Please try again.';
          }
        } else {
          errorMessage = 'Login failed. Please try again.';
        }
      }
  
      dispatch(loginFailure(errorMessage));
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        customClass: {
          popup: 'bg-red-900 text-white',
          title: 'text-red-200',
          icon: 'text-red-400'
        }
      });
    }
  };
  // const handleRegisterClick = () => {
  //   Swal.fire({
  //     title: 'Register As',
  //     html: `
  //       <div style="display: flex; justify-content: center; gap: 1rem;">
  //         <div style="text-align: center;">
  //           <button class="swal2-confirm swal2-styled" style="background-color: #00796b; color: white; border: none; border-radius: 0.5rem; padding: 1rem; font-size: 1.25rem; cursor: pointer;" onclick="location.href='/Register'">
  //             User
  //           </button>
  //         </div>
  //         <div style="text-align: center;">
  //           <button class="swal2-cancel swal2-styled" style="background-color: #00796b; color: white; border: none; border-radius: 0.5rem; padding: 1rem; font-size: 1.25rem; cursor: pointer;" onclick="location.href='/RegisterStation'">
  //             Station
  //           </button>
  //         </div>
  //       </div>
  //     `,
  //     showConfirmButton: false,
  //     showCancelButton: false,
  //     customClass: {
  //       popup: 'bg-teal-900 text-white',
  //       title: 'text-teal-200',
  //       confirmButton: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
  //       cancelButton: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
  //     },
  //     buttonsStyling: false
  //   });
  // };
  const handleRegisterClick = () => {
    Swal.fire({
      title: 'Register As',
      html: `
        <div style="display: flex; justify-content: center; gap: 1rem;">
          <div style="text-align: center;">
            <button id="user-btn" class="custom-btn" style="background-color: #00796b; color: white; border: none; border-radius: 0.5rem; padding: 1rem; font-size: 1.25rem; cursor: pointer; width: 150px;">
              User
            </button>
          </div>
          <div style="text-align: center;">
            <button id="admin-btn" class="custom-btn" style="background-color: #00796b; color: white; border: none; border-radius: 0.5rem; padding: 1rem; font-size: 1.25rem; cursor: pointer; width: 150px;">
              Station
            </button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      didOpen: () => {
        const userButton = document.getElementById('user-btn');
        const adminButton = document.getElementById('admin-btn');
  
        userButton.addEventListener('click', () => {
          Swal.fire({
            title: 'Redirecting...',
            text: 'You are being redirected to the user registration page.',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
            willClose: () => {
              window.location.href = '/Register'; // Redirect to user registration
            }
          });
        });
  
        adminButton.addEventListener('click', () => {
          Swal.fire({
            title: 'Redirecting...',
            text: 'You are being redirected to the station admin registration page.',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
            willClose: () => {
              window.location.href = '/RegisterStation'; // Redirect to station admin registration
            }
          });
        });
      },
      customClass: {
        popup: 'bg-teal-900 text-white',
        title: 'text-teal-200',
        confirmButton: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
        cancelButton: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
      },
      buttonsStyling: false
    });
  };
  
 

  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button onClick={handleRegisterClick} className="text-teal-600 hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
