import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
};

const nodesSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes(state, action) {
      state.nodes = action.payload;
    },
    setEdges(state, action) {
      state.edges = action.payload;
    },
    addNode(state, action) {
      state.nodes.push(action.payload);
    },
    updateNode(state, action) {
      const { id, data } = action.payload;
      const node = state.nodes.find((n) => n.id === id);
      if (node) {
        node.data = { ...node.data, ...data };
      }
    },
    removeNode(state, action) {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
    addEdge(state, action) {
      state.edges.push(action.payload);
    },
    removeEdge(state, action) {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  removeNode,
  addEdge,
  removeEdge,
} = nodesSlice.actions;

export default nodesSlice.reducer;
