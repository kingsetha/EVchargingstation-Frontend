

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './DateTimePicker.css';

function AvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [editingSlot, setEditingSlot] = useState(null);
  const [newSlot, setNewSlot] = useState({
    startTime: new Date(),
    endTime: new Date(),
    status: 'AVAILABLE',
    level1Count: 0,
    level2Count: 0,
    dcFastChargingCount: 0,
    chargingStation: { id: '' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const stationId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!stationId) {
      console.error('Station ID is not set in session storage.');
      setError('Station ID is not set in session storage.');
      setLoading(false);
      return;
    }

    setNewSlot(prevState => ({
      ...prevState,
      chargingStation: { id: stationId }
    }));

    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/station/slots/available?stationId=${stationId}`);
        const slotsWithDates = response.data.map(slot => ({
          ...slot,
          startTime: moment(slot.startTime).local().toDate(),
          endTime: moment(slot.endTime).local().toDate()
        }));

        // Filter to show only today's slots
        const today = moment().startOf('day');
        const endOfToday = moment().endOf('day');
        const todaysSlots = slotsWithDates.filter(slot => 
          moment(slot.startTime).isBetween(today, endOfToday, null, '[]')
        );

        setSlots(todaysSlots);
      } catch (err) {
        console.error('Error fetching slots:', err.response ? err.response.data : err.message);
        setError('Failed to fetch available slots.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [stationId]);

  const handleAddSlot = async () => {
    if (!stationId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Station ID is not available.',
      });
      return;
    }

    if (newSlot.startTime >= newSlot.endTime) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Time Range',
        text: 'Start time must be before end time.',
      });
      return;
    }

    const formattedSlot = {
      startTime: moment(newSlot.startTime).toISOString(),
      endTime: moment(newSlot.endTime).toISOString(),
      status: newSlot.status,
      level1Count: newSlot.level1Count,
      level2Count: newSlot.level2Count,
      dcFastChargingCount: newSlot.dcFastChargingCount,
      chargingStation: { id: stationId }
    };

    try {
      const response = await axios.post('http://localhost:1000/station/slots', formattedSlot);
      Swal.fire({
        icon: 'success',
        title: 'Added',
        text: 'Slot has been added successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      setSlots(prevSlots => [...prevSlots, {
        ...response.data,
        startTime: moment(response.data.startTime).local().toDate(),
        endTime: moment(response.data.endTime).local().toDate()
      }]);
      setNewSlot({
        startTime: new Date(),
        endTime: new Date(),
        status: 'AVAILABLE',
        level1Count: 0,
        level2Count: 0,
        dcFastChargingCount: 0,
        chargingStation: { id: stationId }
      });
    } catch (err) {
      console.error('Error adding slot:', err.response ? err.response.data : err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add the slot.',
      });
    }
  };

  const handleUpdateSlot = async () => {
    if (!stationId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Station ID is not available.',
      });
      return;
    }

    if (editingSlot.startTime >= editingSlot.endTime) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Time Range',
        text: 'Start time must be before end time.',
      });
      return;
    }

    try {
      const formattedSlot = {
        ...editingSlot,
        startTime: moment(editingSlot.startTime).toISOString(),
        endTime: moment(editingSlot.endTime).toISOString(),
        chargingStation: { id: stationId }
      };

      const response = await axios.put(`http://localhost:1000/station/slots/${editingSlot.id}`, formattedSlot);
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Slot has been updated successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      setSlots(prevSlots => prevSlots.map(slot => (slot.id === editingSlot.id ? {
        ...response.data,
        startTime: moment(response.data.startTime).local().toDate(),
        endTime: moment(response.data.endTime).local().toDate()
      } : slot)));
      setEditingSlot(null);
    } catch (err) {
      console.error('Error updating slot:', err.response ? err.response.data : err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the slot.',
      });
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!stationId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Station ID is not available.',
      });
      return;
    }

    try {
      await axios.delete(`http://localhost:1000/station/slots/${id}?stationId=${stationId}`);
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Slot has been deleted successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      setSlots(prevSlots => prevSlots.filter(slot => slot.id !== id));
    } catch (err) {
      console.error('Error deleting slot:', err.response ? err.response.data : err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the slot.',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-lg font-semibold text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 pt-20">
      
      <div className="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md">
  {/* Add New Slot */}
  <div className="bg-teal-50 p-6 rounded-lg shadow-lg mb-4">
  <h2 className="text-xl font-semibold text-teal-800 mb-4">Add New Slot</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="bg-white p-4 rounded-lg shadow-sm">
  <label className="block text-lg font-medium text-gray-700 mb-2">Start Time</label>
  <DatePicker
    selected={newSlot.startTime}
    onChange={(date) => setNewSlot(prev => ({ ...prev, startTime: date }))}
    className="w-72 border border-gray-300 rounded-lg shadow-sm p-2 text-sm" 
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
  />
</div>

    <div className="bg-white p-4 rounded-lg shadow-sm">
      <label className="block text-lg font-medium text-gray-700 mb-2">End Time</label>
      <DatePicker
        selected={newSlot.endTime}
        onChange={(date) => setNewSlot(prev => ({ ...prev, endTime: date }))}
        className="w-72 border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">Level 1 Charging Count</label>
      <input
        type="number"
        value={newSlot.level1Count}
        onChange={(e) => setNewSlot(prev => ({ ...prev, level1Count: Math.max(0, Number(e.target.value)) }))}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
        min="0"
      />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">Level 2 Charging Count</label>
      <input
        type="number"
        value={newSlot.level2Count}
        onChange={(e) => setNewSlot(prev => ({ ...prev, level2Count: Math.max(0, Number(e.target.value)) }))}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
        min="0"
      />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">DC Fast Charging Count</label>
      <input
        type="number"
        value={newSlot.dcFastChargingCount}
        onChange={(e) => setNewSlot(prev => ({ ...prev, dcFastChargingCount: Math.max(0, Number(e.target.value)) }))}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
        min="0"
      />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">Status</label>
      <select
        value={newSlot.status}
        onChange={(e) => setNewSlot(prev => ({ ...prev, status: e.target.value }))}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
      >
        <option value="AVAILABLE">Available</option>
        <option value="BOOKED">Booked</option>
      </select>
    </div>
    <div className="col-span-full flex justify-center mt-4">
      <button
        onClick={handleAddSlot}
        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300 text-sm"
      >
        Add Slot
      </button>
    </div>
  </div>
</div>

</div>

<div className="container mx-auto max-w-6xl p-8 bg-white rounded-lg shadow-md">
  {/* Display Slots */}
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-teal-800 mb-4">Existing Slots for today</h2>
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-teal-100">
            <th className="px-4 py-2 border border-gray-300">Start Time</th>
            <th className="px-4 py-2 border border-gray-300">End Time</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
            <th className="px-4 py-2 border border-gray-300">Level 1 Count</th>
            <th className="px-4 py-2 border border-gray-300">Level 2 Count</th>
            <th className="px-4 py-2 border border-gray-300">DC Fast Charging Count</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map(slot => (
            <tr key={slot.id}>
              <td className="px-4 py-2 border border-gray-300">{slot.startTime.toLocaleString()}</td>
              <td className="px-4 py-2 border border-gray-300">{slot.endTime.toLocaleString()}</td>
              <td className="px-4 py-2 border border-gray-300">{slot.status}</td>
              <td className="px-4 py-2 border border-gray-300">{slot.level1Count}</td>
              <td className="px-4 py-2 border border-gray-300">{slot.level2Count}</td>
              <td className="px-4 py-2 border border-gray-300">{slot.dcFastChargingCount}</td>
              <td className="px-4 py-2 border border-gray-300 flex gap-2">
                <button
                  onClick={() => setEditingSlot(slot)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-teal-700 text-sm w-24"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 text-sm w-24"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Edit Slot Modal */}
  {editingSlot && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-teal-200 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">Edit Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-lg font-medium text-gray-700 mb-2">Start Time</label>
            <DatePicker
              selected={editingSlot.startTime}
              onChange={(date) => setEditingSlot(prev => ({ ...prev, startTime: date }))}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy HH:mm"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block text-lg font-medium text-gray-700 mb-2">End Time</label>
            <DatePicker
              selected={editingSlot.endTime}
              onChange={(date) => setEditingSlot(prev => ({ ...prev, endTime: date }))}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy HH:mm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Level 1 Count</label>
            <input
              type="number"
              value={editingSlot.level1Count}
              onChange={(e) => setEditingSlot(prev => ({ ...prev, level1Count: +e.target.value }))}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Level 2 Count</label>
            <input
              type="number"
              value={editingSlot.level2Count}
              onChange={(e) => setEditingSlot(prev => ({ ...prev, level2Count: +e.target.value }))}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">DC Fast Charging Count</label>
            <input
              type="number"
              value={editingSlot.dcFastChargingCount}
              onChange={(e) => setEditingSlot(prev => ({ ...prev, dcFastChargingCount: +e.target.value }))}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">status</label>
            <select
        value={editingSlot.status}
        onChange={(e) => setEditingSlot(prev => ({ ...prev, status: e.target.value }))}
        className="w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm"
      >
        <option value="AVAILABLE">Available</option>
        <option value="BOOKED">Booked</option>
      </select>
            
          </div>
          <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={handleUpdateSlot}
            className="bg-teal-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-teal-600 text-sm"
          >
            Update
          </button>
          <button
            onClick={() => setEditingSlot(null)}
            className="bg-gray-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-gray-600 text-sm"
          >
            Cancel
          </button>
        </div>
        </div>
      </div>
    </div>
  )}
</div>

    </div>
  );
}

export default AvailableSlots;
