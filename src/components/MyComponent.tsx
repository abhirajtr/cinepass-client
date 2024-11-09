import { motion } from "framer-motion";

const MyComponent = () => (
    <motion.button
        type="button"
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
        whileHover={{ scale: 1.1 }} // Enlarges button slightly on hover
        whileTap={{ scale: 0.9 }}   // Shrinks button slightly on tap for visual feedback
    >
        Click Me
    </motion.button>
);

export default MyComponent;
