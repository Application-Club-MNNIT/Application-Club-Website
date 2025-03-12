import React from 'react';

const MouseEffectBackground: React.FC = () => {
    const rows = 12;
    const columns = 20;

    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <div
                className="grid sm:grid-cols-7 md:grid-cols-[repeat(14,minmax(0,1fr))] xl:grid-cols-[repeat(17,minmax(0,1fr))] gap-0 w-full h-full">
                {Array.from({length: rows * columns}).map((_, index) => (
                    <div
                        key={index}
                        className="bg-black transition-all duration-1000 ease-out hover:bg-AC_Orange hover:transition-none aspect-square"
                    />
                ))}
            </div>
        </div>
    );
};

export {MouseEffectBackground};
