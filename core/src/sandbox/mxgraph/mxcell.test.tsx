import React from "react";
import { render, prettyDOM } from "@testing-library/react";
// import mx from "./mxgraph"; // <- import values from factory()
import factory, { mxGraph, mxGraphModel } from "mxgraph"; // <- import types only

// jgraph.github.io/mxgraph/docs/manual.html#1.3
const manual_1_3 = (container: HTMLElement) => {
  const mx = factory({
    mxBasePath: "",
  });

  if (!mx.mxClient.isBrowserSupported()) {
    mx.mxUtils.error("Browser is not supported!", 200, false);
  } else {
    // Creates the graph inside the given container
    var graph = new mx.mxGraph(container);

    // Enables rubberband selection
    new mx.mxRubberband(graph);

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    var parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    try {
      var v1 = graph.insertVertex(parent, null, "Hello2,", 20, 20, 80, 30);
      var v2 = graph.insertVertex(parent, null, "World2!", 200, 150, 80, 30);
      var e1 = graph.insertEdge(parent, null, "", v1, v2);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  }
  return container;
};

// https://jgraph.github.io/mxgraph/docs/js-api/files/model/mxCell-js.html
const mxCell_js = (container: HTMLElement) => {
  const mx = factory({
    mxBasePath: "",
  });

  if (!mx.mxClient.isBrowserSupported()) {
    mx.mxUtils.error("Browser is not supported!", 200, false);
  } else {
    // Creates the graph inside the given container
    var graph = new mx.mxGraph(container);

    try {
      var doc = mx.mxUtils.createXmlDocument();
      var node = doc.createElement("MyMyNode");
      node.setAttribute("label", "MyMyLabel");
      node.setAttribute("attribute1", "VVavalue1");
      const parent = graph.getDefaultParent();
      graph.insertVertex(parent, null, node, 40, 40, 80, 30);

      var v1 = graph.insertVertex(parent, null, "Hello2,", 20, 20, 80, 30);
      var v2 = graph.insertVertex(parent, null, "World2!", 200, 150, 80, 30);
      var e1 = graph.insertEdge(parent, null, "", v1, v2);
    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }

    var encoder = new mx.mxCodec();
    var result = encoder.encode(graph.getModel());
    var xml = mx.mxUtils.getXml(result);
    console.log("xml=", xml);
  }
  return container;
};

describe("useCounter", () => {
  it("countは初期値0である", () => {
    const result = render(<span data-test-id="hoge">fuga</span>);

    // console.log(prettyDOM(manual_1_3(result.container)));
    console.log(prettyDOM(mxCell_js(result.container)));
  });
});
