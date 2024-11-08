import { useState, useEffect } from "react";
import { assets } from "../constants";

const Hero = () => {
    const banners = [
        {
            image: assets.banner1,
        },
        {
            image: assets.banner2,
        },
        {
            image: assets.banner3,
        }
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
            <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                    transform: `translateX(-${currentBannerIndex * 100}%)`,
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
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentBannerIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => setCurrentBannerIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;