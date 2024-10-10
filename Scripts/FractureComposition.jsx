// Define the duration of each frame in seconds
var frameDuration = 1 / 24; // Change this to your desired frame rate (e.g., 24 fps)

// Get the active composition
var comp = app.project.activeItem;

// Ensure a composition is selected
if (comp && comp instanceof CompItem) {
  app.beginUndoGroup("Split Layers");

  // Get the selected layer
  var layer = comp.selectedLayers[0];

  // Ensure a layer is selected
  if (layer) {
    var totalFrames = Math.ceil(layer.outPoint / frameDuration);
    for (var i = 0; i < totalFrames; i++) {
      // Move the playhead to the frame duration
      layer.startTime = i * frameDuration;
      layer.outPoint = (i + 1) * frameDuration;

      // Split the layer
      layer.splitLayer();
    }
  } else {
    alert("Please select a layer to split.");
  }

  app.endUndoGroup();
} else {
  alert("Please select a composition.");
}
