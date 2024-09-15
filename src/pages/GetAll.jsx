
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAll } from '../redux/Action';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// function Navbar() {
//   return (
//     <nav className="bg-blue-800 p-4 shadow-lg">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="text-white text-2xl font-bold">Employee Management</div>
//         <div>
//           <Link
//             to="/"
//             className="text-white hover:text-gray-200 transition duration-300 mx-4 text-lg"
//           >
//             Home
//           </Link>
//           <Link
//             to="/create"
//             className="bg-orange-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 text-lg"
//           >
//             Add Employee
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function Footer() {
//   return (
//     <footer className="bg-blue-800 py-4 mt-8">
//       <div className="container mx-auto text-center text-white">
//         <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

// function ViewAll() {
//   const user = useSelector((state) => state.data.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/Data')
//       .then((response) => {
//         dispatch(getAll(response.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [dispatch]);

//   const handleSubmit = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this record?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`http://localhost:5000/Data/${id}`)
//           .then(() => {
//             Swal.fire(
//               'Deleted!',
//               'The record has been deleted.',
//               'success'
//             );
//             // Reload the data without reloading the whole page
//             axios.get('http://localhost:5000/Data')
//               .then((response) => {
//                 dispatch(getAll(response.data));
//               })
//               .catch((err) => console.log(err));
//           })
//           .catch((err) => {
//             Swal.fire(
//               'Error!',
//               'There was a problem deleting the record.',
//               'error'
//             );
//             console.log(err);
//           });
//       }
//     });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-5xl font-bold text-white bg-teal-500 py-6 text-center mb-6 rounded-lg shadow-lg">
//             Employee Management System
//           </h1>
//           <h2 className="text-3xl font-semibold text-gray-800 bg-yellow-200 py-4 text-center mb-6 rounded-lg shadow-md">
//             Employee Information
//           </h2>

//           <div className="text-right mb-6">
//             <Link
//               to="/create"
//               className="bg-orange-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 text-lg"
//             >
//               Add Employee
//             </Link>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
//               <thead className="bg-teal-100 text-teal-800">
//                 <tr>
//                   <th className="py-4 px-6 border-b border-gray-300 text-left">ID</th>
//                   <th className="py-4 px-6 border-b border-gray-300 text-left">Name</th>
//                   <th className="py-4 px-6 border-b border-gray-300 text-left">Age</th>
//                   <th className="py-4 px-6 border-b border-gray-300 text-left">City</th>
//                   <th className="py-4 px-6 border-b border-gray-300 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {user && user.length > 0 ? (
//                   user.map((d, i) => (
//                     <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
//                       <td className="py-4 px-6">{d.id}</td>
//                       <td className="py-4 px-6">{d.name}</td>
//                       <td className="py-4 px-6">{d.age}</td>
//                       <td className="py-4 px-6">{d.city}</td>
//                       <td className="py-4 px-6 flex space-x-2">
//                         <Link
//                           to={`/update/${d.id}`}
//                           className="bg-teal-500 text-white py-1 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
//                         >
//                           Update
//                         </Link>
//                         <button
//                           onClick={() => handleSubmit(d.id)}
//                           className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
//                       No data available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default ViewAll;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../redux/Action';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Navbar() {
  return (
    <nav className="bg-blue-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Employee Management</div>
        <div>
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition duration-300 mx-4 text-lg"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="bg-orange-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 text-lg"
          >
            Add Employee
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-blue-800 py-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}

function ViewAll() {
  const users = useSelector((state) => state.data.users); // Ensure 'users' matches your reducer state
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:5001/Data')
      .then((response) => {
        console.log('Fetched data:', response.data); // Log the fetched data
        dispatch(getAll(response.data)); // Assuming response.data is an array of user objects
      })
      .catch((err) => {
        console.error('Error fetching data:', err); // Log errors
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5001/Data/${id}`)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The record has been deleted.',
              'success'
            );
            // Reload the data
            axios.get('http://localhost:5001/Data')
              .then((response) => {
                dispatch(getAll(response.data)); // Assuming response.data is an array of user objects
              })
              .catch((err) => console.error('Error reloading data:', err));
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              'There was a problem deleting the record.',
              'error'
            );
            console.error('Error deleting data:', err); // Log errors
          });
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-white bg-teal-500 py-6 text-center mb-6 rounded-lg shadow-lg">
            Employee Management System
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 bg-yellow-200 py-4 text-center mb-6 rounded-lg shadow-md">
            Employee Information
          </h2>

          <div className="text-right mb-6">
            <Link
              to="/create"
              className="bg-orange-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300 text-lg"
            >
              Add Employee
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
              <thead className="bg-teal-100 text-teal-800">
                <tr>
                  <th className="py-4 px-6 border-b border-gray-300 text-left">ID</th>
                  <th className="py-4 px-6 border-b border-gray-300 text-left">Name</th>
                  <th className="py-4 px-6 border-b border-gray-300 text-left">Age</th>
                  <th className="py-4 px-6 border-b border-gray-300 text-left">City</th>
                  <th className="py-4 px-6 border-b border-gray-300 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((d) => (
                    <tr key={d.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-4 px-6">{d.id}</td>
                      <td className="py-4 px-6">{d.name}</td>
                      <td className="py-4 px-6">{d.age}</td>
                      <td className="py-4 px-6">{d.city}</td>
                      <td className="py-4 px-6 flex space-x-2">
                        <Link
                          to={`/update/${d.id}`}
                          className="bg-teal-500 text-white py-1 px-4 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ViewAll;

