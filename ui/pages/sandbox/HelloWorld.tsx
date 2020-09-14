/* eslint-disable new-cap */
// import { mxGraph } from 'mxgraph'
// import * as mxGraph from 'mxgraph'
import factory from 'mxgraph'
import { useEffect } from 'react'

// console.log(mx.mxClient.VERSION)
// Program starts here. Creates a sample graph in the
// DOM node with the specified ID. This function is invoked
// from the onLoad event handler of the document (see below).
function main(container: HTMLElement) {
  //   const mx = mxGraph({ mxBasePath: '' }) //{ mxBasePath: '' }
  const mx = factory({
    mxBasePath: '',
  })

  //   console.log('container=', container)
  //   console.log('mxGraph=', mg)
  //   console.log('mxClient=', mg.mxClient)

  // Checks if the browser is supported
  if (!mx.mxClient.isBrowserSupported()) {
    // Displays an error message if the browser is not supported.
    mx.mxUtils.error('Browser is not supported!', 200, false)
  } else {
    // Disables the built-in context menu
    // mg.mxEvent.disableContextMenu(container)

    // Creates the graph inside the given container
    const graph = new mx.mxGraph(container)

    // Enables rubberband selection
    new mx.mxRubberband(graph)

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent()

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate()
    try {
      const v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30)
      const v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30)
      const v3 = graph.insertVertex(parent, null, 'ThisCity', 20, 200, 80, 30)
      const e1 = graph.insertEdge(parent, null, '', v1, v2)
      const e2 = graph.insertEdge(parent, null, '', v2, v3)
    } finally {
      // Updates the display
      graph.getModel().endUpdate()
    }
  }
}

export function HelloWorld() {
  console.log('init HelloWorld')

  useEffect(() => {
    main(document.getElementById('graphContainer'))
  })
  return (
    <div
      id="graphContainer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '321px',
        height: '241px',
        background: "url('sandbox/mxgraph/examples/editors/images/grid.gif')",
        cursor: 'default',
      }}
    ></div>
  )
}

/**
 
<!--
  Copyright (c) 2006-2018, JGraph Ltd
  
  Hello, World! example for mxGraph. This example demonstrates using
  a DOM node to create a graph and adding vertices and edges.
-->
<html>
<head>
	<title>Hello, World! example for mxGraph</title>

	<!-- Sets the basepath for the library if not in same directory -->
	<script type="text/javascript">
		mxBasePath = '../src';
	</script>

	<!-- Loads and initializes the library -->
	<script type="text/javascript" src="../src/js/mxClient.js"></script>

	<!-- Example code -->
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		function main(container)
		{
			// Checks if the browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Disables the built-in context menu
				mxEvent.disableContextMenu(container);
				
				// Creates the graph inside the given container
				var graph = new mxGraph(container);

				// Enables rubberband selection
				new mxRubberband(graph);
				
				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();
								
				// Adds cells to the model in a single step
				graph.getModel().beginUpdate();
				try
				{
					var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
					var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
					var e1 = graph.insertEdge(parent, null, '', v1, v2);
				}
				finally
				{
					// Updates the display
					graph.getModel().endUpdate();
				}
			}
		};
	</script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'))">

	<!-- Creates a container for the graph with a grid wallpaper -->
	<div id="graphContainer"
		style="position:relative;overflow:hidden;width:321px;height:241px;background:url('editors/images/grid.gif');cursor:default;">
	</div>
</body>
</html>
 */
