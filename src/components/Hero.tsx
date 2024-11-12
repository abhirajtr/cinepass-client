import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../constants";

const Hero = () => {
    const banners = [
        { image: assets.banner1 },
        { image: assets.banner2 },
        { image: assets.banner3 },
        { image: assets.banner4 },
        { image: assets.banner5 },
    ];

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [banners.length]);

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="flex"
                animate={{
                    x: `-${currentBannerIndex * 100}%`,
                }}
                transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                }}
                style={{
                    display: "flex", // Ensure the banners align in a row
                }}
            >
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className="h-[150px] sm:h-[250px] md:h-[300px] lg:h-[400px] min-w-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${banner.image})`,
                        }}
                    />
                ))}
            </motion.div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentBannerIndex ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        onClick={() => setCurrentBannerIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
