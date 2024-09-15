
// import React from 'react';
// import { Modal, Button, Card } from 'react-bootstrap';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { LatLngTuple } from 'leaflet';
// import Footer from './Footer'; 

// function DetailModal({ admin, onApprove, onReject, onClose }) {
//   // Default position in case latitude or longitude are missing
//   const position: LatLngTuple = [
//     admin.latitude ?? 0,
//     admin.longitude ?? 0
//   ];

//   return (
//     <Modal show onHide={onClose} centered size="lg" dialogClassName="modal-90w">
//       <Modal.Header closeButton>
//         {/* <Modal.Title>Admin Details</Modal.Title> */}
//       </Modal.Header>
//       <Modal.Body className="flex flex-col h-[calc(100vh-150px)]">
//         {/* Title */}
//         <div className="text-center mb-4">
//           <h2 className="text-2xl font-semibold">Station Admin</h2>
//         </div>

//         {/* Admin Details Container */}
//         <div className="flex flex-col items-center space-y-4 mb-4">
//           {/* Admin Details Card */}
//           <Card className="shadow-lg rounded-lg max-w-md w-full">
//             <Card.Body>
//               <Card.Title className="text-xl font-bold">{admin.name}</Card.Title>
//               <Card.Subtitle className="text-muted mb-2">{admin.stationName}</Card.Subtitle>
//               <Card.Text>
//               <strong>StationName:</strong> {admin.chargingStationName}<br />
//                 <strong>Email:</strong> {admin.email}<br />
//                 <strong>Phone:</strong> {admin.phoneNumber}<br />
//                 <strong>Station ID:</strong> {admin.id}<br />
//                 <strong>Address:</strong> {admin.address}<br/>
//                 <strong>Location:</strong> {admin.chargingStationLocation}<br />
//                 <strong>Registration Certificate Number:</strong> {admin.registrationCertificateNumber}
             
//               </Card.Text>
//             </Card.Body>
//           </Card>

//           {/* Buttons Container */}
//           <div className="flex space-x-2 mt-4">
//             <Button
//               onClick={onClose}
//               className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm py-1 px-3 rounded"
//             >
//               Close
//             </Button>
//             <Button
//               onClick={onApprove}
//               className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm py-1 px-3 rounded"
//             >
//               Approve
//             </Button>
//             <Button
//               onClick={onReject}
//               className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-1 px-3 rounded"
//             >
//               Reject
//             </Button>
//           </div>
//         </div>

//         {/* Map Container */}
//         <div className="h-[400px] w-full">
//           <MapContainer center={position} zoom={13} className="h-full w-full">
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker position={position}>
//               <Popup>
//                 <strong>{admin.name}</strong><br />
//                 {admin.address}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </Modal.Body>
//     </Modal>
    
//   );
  
// }

// export default DetailModal;



import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css'; // Ensure this import is included
import Footer from './Footer';

function DetailModal({ admin, onApprove, onReject, onClose }) {
  // Default position in case latitude or longitude are missing
  const position = {
    lat: admin.latitude ?? 0,
    lng: admin.longitude ?? 0
  };

  // Google Maps URL for coordinates
  const mapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

  return (
    <Modal show onHide={onClose} centered size="lg" dialogClassName="modal-90w">
      <Modal.Header closeButton>
        {/* <Modal.Title>Admin Details</Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="flex flex-col h-[calc(100vh-150px)]">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">Station Admin</h2>
        </div>

        {/* Admin Details Container */}
        <div className="flex flex-col items-center space-y-4 mb-4">
          {/* Admin Details Card */}
          <Card className="shadow-lg rounded-lg max-w-md w-full">
            <Card.Body>
              <Card.Title className="text-xl font-bold">{admin.name}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">{admin.stationName}</Card.Subtitle>
              <Card.Text>
                <strong>Station Name:</strong> {admin.chargingStationName}<br />
                <strong>Email:</strong> {admin.email}<br />
                <strong>Phone:</strong> {admin.phoneNumber}<br />
                <strong>Station ID:</strong> {admin.id}<br />
                <strong>Address:</strong> {admin.address}<br/>
                <strong>Location:</strong> {admin.chargingStationLocation}<br />
                <strong>Registration Certificate Number:</strong> {admin.registrationCertificateNumber}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Buttons Container */}
          <div className="flex space-x-2 mt-4">
            <Button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-sm py-1 px-3 rounded"
            >
              Close
            </Button>
            <Button
              onClick={onApprove}
              className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm py-1 px-3 rounded"
            >
              Approve
            </Button>
            <Button
              onClick={onReject}
              className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-1 px-3 rounded"
            >
              Reject
            </Button>
            {/* <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-1 px-3 rounded flex items-center"
            >
              View on Google Maps
            </a> */}
          </div>
        </div>

        {/* Google Maps Static Link */}
        <div className="mb-4 text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Station Location on Google Maps
          </a>
        </div>

        {/* Leaflet Map Container */}
        <div className="h-[400px] w-full">
          <MapContainer center={[position.lat, position.lng]} zoom={13} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[position.lat, position.lng]}>
              <Popup>
                <strong>{admin.chargingStationName}</strong><br />
                {admin.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DetailModal;
