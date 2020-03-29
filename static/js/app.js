// import the data from data.js
const tableData = data;


// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Create Table Building FUnction
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {
  // Save the element, value, and id of the filter that was changed
  let fElements = ["#datetime", "#city", "#state", "#country", "#shape"];
  let fName;
  filters = {};

  for (fName of fElements)
  {
    if(d3.select(fName).property("value"))
    {
      // If a filter value was entered then add that filterId and value
      // to the filters list. Otherwise, clear that filter from the filters object
      filters[fName] = d3.select(fName).property("value");
    }    
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(entry => {
    let key = entry[0]; let value = entry[1];
    if(key === "#datetime") {
      filteredData = filteredData.filter(row => row.datetime === value); 
    }
    if(key === "#city") {
      filteredData = filteredData.filter(row => row.city === value); 
    }
    if(key === "#state") {
      filteredData = filteredData.filter(row => row.state === value); 
    }
    if(key === "#country") {
      filteredData = filteredData.filter(row => row.country === value); 
    }
    if(key === "#shape") {
      filteredData = filteredData.filter(row => row.shape === value); 
    }
  });
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis 
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
