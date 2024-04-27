// This function runs whenever a user edits a cell in the spreadsheet
function onEdit(e) {
  // Check if 'e' and 'e.range' are defined
  if (!e || !e.range) {
    console.log("Event object or range is undefined.");
    return; // Exit the function if 'e' or 'e.range' is undefined
  }

  // Get the active spreadsheet and sheets
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("main");
  var ingredientsSheet = ss.getSheetByName("Ingridients");

  // Clear existing data in the "main" sheet, excluding the first 2 rows and columns after column J
  var lastRowMain = mainSheet.getLastRow();
  var lastColumnMain = mainSheet.getLastColumn();
  mainSheet.getRange(3, 10, lastRowMain - 2, lastColumnMain - 9).clearContent();
  console.log("Cleared existing data in 'main' sheet.");

  // Get information about the edited cell
  var activeCell = e.range;
  var activeSheet = activeCell.getSheet();
  var cellColumn = activeCell.getColumn();
  var cellRow = activeCell.getRow();

  console.log("Active Sheet Name:", activeSheet.getName());
  console.log("Active Cell:", activeCell.getA1Notation());

  // Check if the edited cell is in the specified range (column 6, row 1)
  if (activeSheet.getName() == "main" && cellColumn == 6 && cellRow == 1) {
    // Get the product name from the edited cell
    var productName = activeCell.getValue();
    console.log("Product Name:", productName);

    // Find the matching product in the "Ingredients" sheet
    var productRange = ingredientsSheet.getDataRange();  // Get the entire data range of the "Ingredients" sheet
    var productValues = productRange.getValues();
    var productFound = false;

    // Copy the product data to the "main" sheet
    var productData = [];
    var productFoundRowIndex = -1;

    // Find the row index of the matched product
    for (var i = 0; i < productValues.length; i++) {
      if (productValues[i][0] == productName) {
        productFoundRowIndex = i;
        break;
      }
    }

    // If the product is found, copy data below the matched row up to 5 columns until encountering an empty row
    if (productFoundRowIndex != -1) {
      var numRowsToCopy = productValues.length - productFoundRowIndex;
      for (var j = productFoundRowIndex + 1; j < productValues.length; j++) {
        if (productValues[j][0] === "") {
          break; // Stop copying when encountering an empty row
        }
        productData.push(productValues[j].slice(0, 5)); // Copy 5 columns of data
      }
    } else {
      console.log("Product not found:", productName);
    }

    // Paste the copied data to the "main" sheet
    mainSheet.getRange(3, 6, productData.length, productData[0].length).setValues(productData);

    // Log if the product is not found
    if (!productFound) {
      console.log("Product not found:", productName);
    }
  }
}
