import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./Recursos/DnDContext";
import FlowsList from "./FlowsList";

const FlowPage = () => {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <FlowsList />
      </DnDProvider>
    </ReactFlowProvider>
  );
};

export default FlowPage;
