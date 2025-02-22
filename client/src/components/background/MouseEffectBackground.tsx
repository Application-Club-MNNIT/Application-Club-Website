import React, { useEffect, useState } from "react";
import "./gridCell.css";
import { useDispatch, useSelector } from "react-redux";
import { initState } from "../../redux/slices/boxSlice";
import { RootState } from "../../redux/store";
import Square from "./square";

const MouseEffectBackground: React.FC = () => {
  const [columns, setColumns] = useState<number>(21); // default to sm
  // const rows = 100;
  // const columns = 100;
  const dispatch = useDispatch();
  useEffect(() => {
    let rows: number = Math.floor(1000 / columns) + 1;
    dispatch(initState({ rows, columns }));
  }, [columns]);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      // Adjust these values to match your Tailwind breakpoints
      if (width >= 1280) {
        // xl breakpoint (example: 1280px)
        setColumns(34);
      } else if (width >= 768) {
        // md breakpoint (example: 768px)
        setColumns(28);
      } else if (width >= 640) {
        // sm breakpoint (example: 640px)
        setColumns(21);
      } else {
        setColumns(1); // fallback for very small screens
      }
    };

    // Initial check
    updateColumns();

    // Update on resize
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  console.log(columns);
  const squares = useSelector((state: RootState) => state.boxSlice.value);
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="grid sm:grid-cols-21 md:grid-cols-28 xl:grid-cols-34 gap-0 w-full h-full">
        {squares.length > 0 &&
          Array.from({ length: 1000 }).map((_, index) => {
            // console.log(index, columns);
            return (
              <Square
                key={index}
                x={Math.floor(index / columns)}
                y={index % columns}
              />
            );
          })}
      </div>
    </div>
  );
};

export { MouseEffectBackground };
