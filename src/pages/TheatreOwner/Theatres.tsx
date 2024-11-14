import { motion } from "framer-motion";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TheatreCard from "../../components/TheatreCard";
import axios from "axios";
import { toast } from "sonner";
import theatreOwnerApi from "../../axiosInstance/theatreOwnerApi";

interface Theatre {
    theatreId: string;
    theatreName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    isVerified: boolean;
    contactEmail: string; 
    phoneNumber: string;
    createdAt: string;
}

const Theatres = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const navigate = useNavigate();

    const fetchTheatres = async () => {
        try {
            const response = await theatreOwnerApi.get("/theatres");
            setTheatres(response.data.theatres);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const errorMessage = error.response.data?.message || 'An error occurred.';
                    toast.error(errorMessage);
                } else if (error.request) {
                    // The request was made but no response was received
                    toast.error('Network error: No response received from the server.');
                } else {
                    toast.error('Error setting up the request: ' + error.message);
                }
            } else {
                toast.error('An unexpected error occurred.');
                console.error('Unexpected error:', error);
            }
        }
    }

    useEffect(() => {
        fetchTheatres();
    }, []);

    return (
        <div>
            <div className="text-3xl">
                <Title text1="Theatres" text2="List" />
            </div>
            <div className="flex w-full justify-end">
                <motion.button
                    type="submit"
                    className="w-32 bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300"
                    whileTap={{ scale: 0.2 }}
                    onClick={() => navigate("/theatreOwner/theatres/add-theatre")}
                >
                    Add Theatre
                </motion.button>
            </div>

            <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {theatres.map((theatre) => (
                    <TheatreCard key={theatre.theatreId} onConfigure={() => console.log('onConfig clicked')} theatreData={theatre} />
                ))}
            </div>
        </div>
    );
};

export default Theatres;