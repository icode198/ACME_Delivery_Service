import "./styles.css";
import { GraphCanvas, GraphCanvasRef, useSelection, LayoutTypes } from "reagraph";
import { useState, useRef, Fragment } from "react";

export default function App() {
  const complexNodes = [
    {
      id: "A",
      label: "A"
    },
    {
      id: "B",
      label: "B"
    },
    {
      id: "C",
      label: "C"
    },
    {
      id: "D",
      label: "D"
    },
    {
      id: "E",
      label: "E"
    },
    {
      id: "F",
      label: "F"
    }
  ];
  const complexEdges = [
    {
      id: "AB1",
      source: "A",
      target: "B",
      label: "1"
    },
    {
      id: "AC4",
      source: "A",
      target: "C",
      label: "4"
    },
    {
      id: "AD10",
      source: "A",
      target: "D",
      label: "10"
    },
    {
      id: "BE3",
      source: "B",
      target: "E",
      label: "3"
    },
    {
      id: "CD4",
      source: "C",
      target: "D",
      label: "4"
    },
    {
      id: "CF2",
      source: "C",
      target: "F",
      label: "2"
    },
    {
      id: "DE1",
      source: "D",
      target: "E",
      label: "1"
    },
    {
      id: "EB3",
      source: "E",
      target: "B",
      label: "3"
    },
    {
      id: "EA2",
      source: "E",
      target: "A",
      label: "2"
    },
    {
      id: "FD1",
      source: "F",
      target: "D",
      label: "1"
    }
  ];

  const graphRef = useRef<GraphCanvasRef | null>(null);
  const { selections, actives, selectNodePaths, onNodeClick, onCanvasClick } =
    useSelection({
      ref: graphRef,
      nodes: complexNodes,
      edges: complexEdges,
      pathSelectionType: 'direct',
      type: 'multi'
    });

  const [layout, setLayout] = useState<LayoutTypes>('forceDirected2d');

  // const from = "E";
  // const to = "D";

  return (
    <Fragment>
      <div
        style={{
          zIndex: 9,
          position: 'absolute',
          top: 15,
          right: 15,
          background: 'rgba(0, 0, 0, .5)',
          padding: 1,
          color: 'white'
        }}
      >
        {/* <button
          style={{ display: 'block', width: '100%' }}
          onClick={() => {
            console.log("clicked");
            selectNodePaths(from, to);
          }}
        >
          Select {from} to {to} Paths
        </button> */}
      </div>
      <GraphCanvas
        edgeLabelPosition="natural"
        labelType="all"
        ref={graphRef}
        actives={actives}
        nodes={complexNodes}
        edges={complexEdges}
        draggable
        layoutType={layout}
        selections={selections}
        onCanvasClick={onCanvasClick}
        onNodeClick={onNodeClick}
      />
    </Fragment>
  );
}
