import { createSlice } from "@reduxjs/toolkit";
import Queue from "../../helper/Queue";
const initialState: initialStateType = {
  value: [],
  rows: 0,
  columns: 0,
};

interface initialStateType {
  value: number[][];
  rows: number;
  columns: number;
}

const boxSlice = createSlice({
  name: "boxSlice",
  initialState,
  reducers: {
    // will be called once to set the state of divs
    initState: (state, actions) => {
      console.log("state initialized");
      const rows: number = actions.payload.rows;
      const columns: number = actions.payload.columns;
      state.rows = rows;
      state.columns = columns;
      // Initializing array with zeroes
      state.value = Array.from({ length: rows }, () =>
        new Array(columns).fill(0)
      );
      // for (let i: number = 0; i < rows; i++) {
      //   for (let j: number = 0; j < columns; j++) {
      //     console.log(state.value[i][j]);
      //   }
      //   console.log("here");
      // }
      console.log(rows, columns);
    },

    // Do a BFS run on hover (upto 3 levels)
    hoverBox: (state, actions) => {
      const tx: number = actions.payload.x;
      const ty: number = actions.payload.y;
      let level: number = 0;
      const queue = new Queue<number[]>();
      queue.enqueue([tx, ty]);
      let vis: number[][] = Array.from({ length: state.rows }, () =>
        new Array(state.columns).fill(0)
      );
      vis[tx][ty] = 1;
      while (!queue.isEmpty()) {
        level++;
        let size: number = queue.size();
        while (size--) {
          let top: number[] = queue.dequeue();
          let dx: number = top[0];
          let dy: number = top[1];
          state.value[dx][dy] = level;
          for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
              let x: number = dx + i;
              let y: number = dy + j;
              if (
                x >= 0 &&
                x < state.rows &&
                y >= 0 &&
                y < state.columns &&
                !vis[x][y]
              ) {
                queue.enqueue([x, y]);
                vis[x][y] = 1;
              }
            }
          }
        }
        if (level == 3) {
          break;
        }
      }
    },

    leaveBox: (state, actions) => {
      const tx: number = actions.payload.x;
      const ty: number = actions.payload.y;
      let level: number = 0;
      const queue = new Queue<number[]>();
      queue.enqueue([tx, ty]);
      let vis: number[][] = Array.from({ length: state.rows }, () =>
        new Array(state.columns).fill(0)
      );
      vis[tx][ty] = 1;
      while (!queue.isEmpty()) {
        level++;
        let size: number = queue.size();
        while (size--) {
          let top: number[] = queue.dequeue();
          let dx: number = top[0];
          let dy: number = top[1];
          state.value[dx][dy] = 0;
          for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
              let x: number = dx + i;
              let y: number = dy + j;
              if (
                x >= 0 &&
                x < state.rows &&
                y >= 0 &&
                y < state.columns &&
                !vis[x][y]
              ) {
                queue.enqueue([x, y]);
                vis[x][y] = 1;
              }
            }
          }
        }
        if (level == 3) {
          break;
        }
      }
    },

    clickBox: (state, actions) => {
      const tx: number = actions.payload.x;
      const ty: number = actions.payload.y;
      let level: number = 0;
      const queue = new Queue<number[]>();
      queue.enqueue([tx, ty]);
      let vis: number[][] = Array.from({ length: state.rows }, () =>
        new Array(state.columns).fill(0)
      );
      vis[tx][ty] = 1;
      while (!queue.isEmpty()) {
        level++;
        let size: number = queue.size();
        while (size--) {
          let top: number[] = queue.dequeue();
          let dx: number = top[0];
          let dy: number = top[1];
          state.value[dx][dy] = state.value[dx][dy] == 1 ? 0 : 1;
          for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
              let x: number = dx + i;
              let y: number = dy + j;
              if (
                x >= 0 &&
                x < state.rows &&
                y >= 0 &&
                y < state.columns &&
                !vis[x][y]
              ) {
                queue.enqueue([x, y]);
                vis[x][y] = 1;
              }
            }
          }
        }
      }
    },
  },
});

export const { initState, hoverBox, leaveBox, clickBox } = boxSlice.actions;
export default boxSlice.reducer;
