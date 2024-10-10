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
    // Get the duration of the composition
    var compDuration = comp.duration;
    var totalFrames = Math.ceil(compDuration / frameDuration);

    for (var i = 1; i < totalFrames; i++) {
      // Calculate the time at which to split the layer
      var splitTime = i * frameDuration;

      // Move the playhead to the split time
      app.project.activeItem.time = splitTime;

      // Check if the layer is still active and within the split time
      if (layer.inPoint < splitTime && splitTime < layer.outPoint) {
        // Split the layer at the specified time
        layer.splitLayer(splitTime);

        // Re-fetch the layer to ensure we're working with the latest version
        layer = comp.selectedLayers[0]; // Get the current selected layer again
      } else {
        alert(
          "Skipping split at: " + splitTime + " (not active or out of range)"
        );
      }
    }
  } else {
    alert("Please select a layer to split.");
  }

  app.endUndoGroup();
} else {
  alert("Please select a composition.");
}
