import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { hoverBox, leaveBox, clickBox } from "../../redux/slices/boxSlice";

interface SquareProps {
  x: number;
  y: number;
}

const Square: React.FC<SquareProps> = ({ x, y }) => {
  const dispatch = useDispatch();
  let currState: number = useSelector(
    (state: RootState) => state.boxSlice.value[x][y]
  );

  const handleMouseEnter = () => {
    dispatch(hoverBox({ x, y }));
  };

  const handleMouseLeave = () => {
    dispatch(leaveBox({ x, y }));
  };

  const handleClick = () => {
    dispatch(clickBox({ x, y }));
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={
        currState === 1
          ? "box1"
          : currState === 2
          ? "box2"
          : currState === 3
          ? "box3"
          : "box"
      }
      style={{
        aspectRatio: "1 / 1",
      }}
    ></div>
  );
};

export default Square;
