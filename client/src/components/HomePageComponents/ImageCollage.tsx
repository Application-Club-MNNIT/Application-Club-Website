import React from 'react';

const ImageCollage: React.FC = () => {
    // This array will contain the image paths once you add images to the activityImages folder
    const images: string[] = [
        "/src/assets/images/activityImages/am3.jpeg",
        "/src/assets/images/activityImages/css1.jpg",
        "/src/assets/images/activityImages/am2.jpeg",
        "/src/assets/images/activityImages/am1.jpeg",
        "/src/assets/images/activityImages/opc1.jpeg",
        "/src/assets/images/activityImages/opc2.jpeg",
    ];

    return (
        <div className="w-full py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Club Activities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={image}
                                alt={`Activity ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCollage;
