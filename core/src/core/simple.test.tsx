import React from "react";
import { render, prettyDOM } from "@testing-library/react";
import mx from "./mxgraph"; // <- import values from factory()
import { mxGraph, mxGraphModel } from "mxgraph"; // <- import types only

const sample = (container: HTMLElement) => {
  // const mx = factory({
  //   mxBasePath: "",
  // });

  if (mx.mxClient.isBrowserSupported()) {
    console.log("Yes! Yes!");
  }

  const graph: mxGraph = new mx.mxGraph(container);
  const model: mxGraphModel = graph.getModel();
  model.beginUpdate();
  try {
    graph.insertVertex(graph.getDefaultParent(), "", "TEST", 0, 0, 100, 100);
  } finally {
    model.endUpdate();
  }
  return container;
};
describe("useCounter", () => {
  it("countは初期値0である", () => {
    // const mx = factory({
    //   mxBasePath: "",
    // });
    console.log(mx.mxClient.VERSION);
  });

  const result = render(<span data-test-id="hoge">fuga</span>);

  console.log(prettyDOM(sample(result.container)));
});
