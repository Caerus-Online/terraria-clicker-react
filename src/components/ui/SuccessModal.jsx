import React from 'react';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200]">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-game-secondary bg-opacity-90 rounded-lg shadow-game max-w-sm w-full m-4 p-6">
        <div className="flex items-center mb-4">
          <span className="material-icons text-green-500 mr-2">check_circle</span>
          <h3 className="text-lg font-game text-white">{title || 'Success'}</h3>
        </div>
        
        <p className="text-white mb-6">{message}</p>
        
        <button
          onClick={onClose}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-game transition-colors shadow-md"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
