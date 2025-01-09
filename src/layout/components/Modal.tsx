// const Modal = ({ isOpen, onClose, onConfirm, target, action }) => {
//     if (!isOpen) return null

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//                 <div className="p-6">
//                     <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
//                     <p className="mb-6">
//                         Are you sure you want to {action} {target}?
//                     </p>
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             onClick={onClose}
//                             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={() => {
//                                 onConfirm()
//                                 onClose()
//                             }}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                         >
//                             Confirm
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Modal;