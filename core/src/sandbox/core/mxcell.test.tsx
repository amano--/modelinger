import React from "react";
import { render, prettyDOM } from "@testing-library/react";
// import mx from "./mxgraph"; // <- import values from factory()
import factory, { mxGraph, mxGraphModel } from "mxgraph"; // <- import types only

const sample = (container: HTMLElement) => {
  const mx = factory({
    mxBasePath: "",
  });

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
    const mx = factory({
      mxBasePath: "",
    });
    console.log(mx.mxClient.VERSION);
  });

  const result = render(<span data-test-id="hoge">fuga</span>);

  console.log(prettyDOM(sample(result.container)));
});

const templater = (args: { id: string; className: string }) => `
<mxCell id="0"/>
<mxCell id="1" parent="0"/>
<mxCell id="2" value="Class1" style="swimlane;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=29;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;html=1;" vertex="1" parent="1">
    <mxGeometry x="20" y="50" width="140" height="79" as="geometry"/>
</mxCell>
<mxCell id="3" value="&amp;lt;&amp;lt;stereotype1&amp;gt;&amp;gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="2">
    <mxGeometry y="29" width="140" height="25" as="geometry"/>
</mxCell>
<mxCell id="4" value="stereotype property 1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="2">
    <mxGeometry y="54" width="140" height="25" as="geometry"/>
</mxCell>
<mxCell id="5" value="Class2" style="swimlane;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=29;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;html=1;" vertex="1" parent="1">
    <mxGeometry x="240" y="50" width="140" height="79" as="geometry"/>
</mxCell>
<mxCell id="6" value="&amp;lt;&amp;lt;stereotype1&amp;gt;&amp;gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="5">
    <mxGeometry y="29" width="140" height="25" as="geometry"/>
</mxCell>
<mxCell id="7" value="stereotype property 1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="5">
    <mxGeometry y="54" width="140" height="25" as="geometry"/>
</mxCell>
`;
