// Function to pad numbers with leading zeros
function padNumber(num, size) {
  var s = "0" + num; // Prepend a "0"
  return s.substr(s.length - size); // Return the last `size` characters
}

function formatDate(date) {
  // Format the date as YYYY-MM-DD_HH-MM-SS
  var year = date.getFullYear();
  var month = padNumber(date.getMonth() + 1, 2); // Months are 0-based
  var day = padNumber(date.getDate(), 2);
  var hours = padNumber(date.getHours(), 2);
  var minutes = padNumber(date.getMinutes(), 2);
  var seconds = padNumber(date.getSeconds(), 2);

  return (
    year + "-" + month + "-" + day + "_" + hours + "-" + minutes + "-" + seconds
  );
}

function logToFile(logMessage) {
  var newDate = new Date();
  var formattedDate = formatDate(newDate);

  // Construct the log file name with the formatted date
  var logFile = new File("../Logs/" + formattedDate + "_AE_Log.txt"); // Adjust path as needed

  // Ensure the log file is opened in append mode
  logFile.open("a"); // Open the file in append mode
  logFile.writeln(newDate.toString() + ": " + logMessage); // Write the timestamp and message
  logFile.close(); // Close the file
}
