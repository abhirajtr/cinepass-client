// import React, { useState } from 'react';
// // import { Button, Card, CardContent, CardHeader, Input, Modal, ModalBody, ModalFooter, ModalTrigger, } from '@/components/ui/button';
// // import { Trash2, Edit } from '@lucide/react';
// import { PencilIcon, TrashIcon } from 'lucide-react';

// // Define type for Theatre entity
// interface Theatre {
//     id: number;
//     name: string;
//     location: string;
//     status: 'Active' | 'Inactive';
// }

// const TheatreList: React.FC = () => {
//     // State for managing search term, selected theatre, and delete modal
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [selectedTheatre, setSelectedTheatre] = useState<number | null>(null);
//     const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

//     // Example theatre data
//     const theatres: Theatre[] = [
//         { id: 1, name: 'Galaxy Cinemas', location: 'Downtown', status: 'Active' },
//         { id: 2, name: 'Sunrise Multiplex', location: 'Uptown', status: 'Inactive' },
//         { id: 3, name: 'Cinema City', location: 'Midtown', status: 'Active' },
//     ];

//     // Filter theatres based on search term
//     const filteredTheatres = theatres.filter((theatre) =>
//         theatre.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Handle theatre deletion
//     const handleDeleteTheatre = (theatreId: number) => {
//         console.log(`Deleting theatre with ID: ${theatreId}`);
//         setDeleteModalOpen(false);
//     };

//     return (
//         <div className="p-6 bg-gray-900 text-white min-h-screen">
//             {/* Header with Search Bar */}
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">Manage Your Theatres</h1>
//                 <Input
//                     type="text"
//                     placeholder="Search Theatres..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="bg-gray-800 text-white rounded px-4 py-2 w-1/3"
//                 />
//             </div>

//             {/* Theatre Cards Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredTheatres.map((theatre) => (
//                     <Card key={theatre.id} className="bg-gray-800 text-white rounded shadow-lg hover:shadow-xl transition">
//                         <CardHeader>
//                             <h2 className="text-xl font-semibold">{theatre.name}</h2>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="text-gray-400">{theatre.location}</p>
//                             <p
//                                 className={`text-sm mt-2 ${theatre.status === 'Active' ? 'text-green-500' : 'text-red-500'
//                                     }`}
//                             >
//                                 {theatre.status}
//                             </p>
//                         </CardContent>
//                         <div className="flex justify-between p-4">
//                             {/* Select Theatre Button */}
//                             <Button
//                                 variant="primary"
//                                 onClick={() => setSelectedTheatre(theatre.id)}
//                                 className="bg-blue-500 hover:bg-blue-600 text-white"
//                             >
//                                 Select
//                             </Button>
//                             {/* Edit Theatre Button */}
//                             <Button
//                                 variant="outline"
//                                 onClick={() => console.log(`Editing theatre ${theatre.name}`)}
//                                 className="text-yellow-400 hover:text-yellow-500"
//                             >
//                                 <PencilIcon className="h-5 w-5" />
//                             </Button>
//                             {/* Delete Theatre Button with Modal Trigger */}
//                             <Modal open={isDeleteModalOpen} onOpenChange={setDeleteModalOpen}>
//                                 <ModalTrigger>
//                                     <Button
//                                         variant="outline"
//                                         onClick={() => setDeleteModalOpen(true)}
//                                         className="text-red-500 hover:text-red-600"
//                                     >
//                                         <TrashIcon className="h-5 w-5" />
//                                     </Button>
//                                 </ModalTrigger>
//                                 <ModalBody>
//                                     <p className="text-white">Are you sure you want to delete this theatre?</p>
//                                 </ModalBody>
//                                 <ModalFooter>
//                                     <Button onClick={() => setDeleteModalOpen(false)} className="bg-gray-500 text-white">
//                                         Cancel
//                                     </Button>
//                                     <Button
//                                         onClick={() => handleDeleteTheatre(theatre.id)}
//                                         className="bg-red-500 hover:bg-red-600 text-white"
//                                     >
//                                         Delete
//                                     </Button>
//                                 </ModalFooter>
//                             </Modal>
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TheatreList;
