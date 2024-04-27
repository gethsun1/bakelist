----

## Script Description
----

This Google Sheets script is designed to automate data copying from one sheet to another based on user edits. It is specifically tailored for a scenario where data needs to be copied from an "Ingridients" sheet to a "main" sheet in a Google Sheets document.

### Features

1. **OnEdit Trigger**: The script triggers whenever a user edits a cell in the "main" sheet, specifically in column 6 (F) of row 1.
2. **Data Clearing**: Before copying new data, the script clears all existing data in the "main" sheet, excluding the first 2 rows and columns after column J.
3. **Data Copying**: It then searches for the edited product name in the "Ingridients" sheet and copies all data below the identified product name until encountering an empty row.
4. **Logging**: The script logs various actions and events to the console for debugging and monitoring purposes.

### How to Use

1. Place the script in the Google Sheets script editor.
2. Set up the sheets as follows:
   - "main" sheet: Where the data will be copied.
   - "Ingridients" sheet: Where the data to be copied is stored.
3. Edit any cell in column 6 (F) of row 1 in the "main" sheet to trigger the script and copy data from the "Ingridients" sheet.

### Note

- Make sure to adjust sheet names ("main" and "Ingridients") and range specifications as per your specific Google Sheets document structure.
- Enable the Google Sheets API and Google Apps Script API in the Google Cloud Platform project associated with your Google account before using this script.

---
