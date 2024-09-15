import React from 'react';
import { Transition } from '@headlessui/react';

function Toast({ show, message, type, onClose }) {
  return (
    <Transition
      show={show}
      enter="transition-opacity ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed bottom-5 right-5 z-50"
    >
      <div
        className={`p-4 rounded-lg shadow-lg text-white ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <div className="flex items-center">
          <div className="mr-2">
            <svg
              className={`w-6 h-6 ${
                type === 'success' ? 'text-green-200' : 'text-red-200'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {type === 'success' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
          </div>
          <div className="flex-1">{message}</div>
          <button onClick={onClose} className="ml-4 text-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  );
}

export default Toast;
