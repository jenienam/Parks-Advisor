// Animation for header text
let textWrapperHeader = document.querySelector(".wildlife-header");
textWrapperHeader.innerHTML = textWrapperHeader.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.wildlife-header .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.wildlife-header',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Animation for header tagline
let textWrapperTagline = document.querySelector(".wildlife-tagline");
textWrapperTagline.innerHTML = textWrapperTagline.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.wildlife-tagline .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.wildlife-tagline',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

//Import csv file to be used as data
d3.csv('data/clean_wildlife.csv').then((data) => {
    
  //Check that data was imported with debug statement
  //console.log("Raw Wildlife Data: ", data);

  //Name columns
  let columns = ['Park Code', 'Park Name', 'Category', 'Order', 'Family', 'Scientific Name', 'Common Names', 'Occurrence', 'Nativeness', 'Abundance', 'NPS Tags'];
  
  //Add search bar for Park Code
  d3.select("#tableArea").append("div")
    .attr("class", "searchBarPark")
    .append("p")
    .attr("class", "searchBarPark")
    .text("Search By Park Code:");

  d3.select(".searchBarPark")
    .append("input")
    .attr("class", "searchBarPark")
    .attr("id", "searchPark")
    .attr("type", "text")
    .attr("placeholder", "ex. ACAD");
  
  //Add search button for Park Code
  d3.select("#tableArea").append("button")
    .attr("id", "filter-btn-park")
    .attr("type", "button")
    .attr("class", "btn btn-default")
    .text("Search");

  //Add search bar for Species
  d3.select("#tableArea").append("div")
    .attr("class", "searchBarSpecies")
    .append("p")
    .attr("class", "searchBarSpecies")
    .text("Search By Species:");

  d3.select(".searchBarSpecies")
    .append("input")
    .attr("class", "searchBarSpecies")
    .attr("id", "searchSpecies")
    .attr("type", "text")
    .attr("placeholder", "ex. Canis lupus");
  
  //Add search button for Species
  d3.select("#tableArea").append("button")
    .attr("id", "filter-btn-species")
    .attr("type", "button")
    .attr("class", "btn btn-default")
    .text("Search");

  //Create table
  let table = d3.select('#tableArea').append('table')
    let thead = table.append('thead')
    let tbody = table.append('tbody');
  
    //Create table headers
    thead.append('tr')
      .selectAll('th')
      .data(columns)
      .enter()
      .append('th')
        .text(function (column) { return column; })

    //Set up rows
    let rows = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');
  
    //Insert data
    let cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return row[column];
          });
      })
      .enter()
      .append('td')
          .text(function(d) { return d; })
          
  
  //Filter data according to park code input

  //Select button
  let buttonPark = d3.select("#filter-btn-park");

  buttonPark.on("click", function() {

    //Select user's input park code
    let inputElement = d3.select("#searchPark");
    let inputValue = inputElement.property("value");

    //Make sure park code is capitalized correctly
    let formattedInputValue = inputValue.toUpperCase();
    
    //Debug statement
    console.log("Input Park Code:", formattedInputValue);

    //Filter data based on input park code
    let filteredData = data.filter((park) => park["Park Code"] === formattedInputValue);
    
    //Debug statement
    //console.log(filteredData);

    //Clear table
    d3.select("tbody").html("");

    //Refill table with filtered data
    filteredData.forEach((park) => {
      //console.log(park);
      let rows = tbody.append("tr");
  
      Object.entries(park).forEach(([key, value]) => {
          //console.log(key, value);
          let cell = rows.append("td");
          cell.text(value);
      })
    });
  });

  //Filter data according to species input

  //Select button
  let buttonSpecies = d3.select("#filter-btn-species");

  buttonSpecies.on("click", function() {

    //Select user's input scientific name of species
    let inputElement = d3.select("#searchSpecies");
    let inputValue = inputElement.property("value");

    //Make sure name is properly capitalized
    let lowercaseInputValue = inputValue.toLowerCase();
    let splitInput = lowercaseInputValue.split(" ");
    let capitalizedSplitInput = splitInput[0].charAt(0).toUpperCase() + splitInput[0].slice(1);
    let formattedInputValue = `${capitalizedSplitInput} ${splitInput[1]}`;
    
    //Debug statement
    console.log("Input Species:", formattedInputValue);

    //Filter data based on input park code
    let filteredData = data.filter((species) => species["Scientific Name"] === formattedInputValue);
    
    //Debug statement
     //console.log(filteredData);

    //Clear table
    d3.select("tbody").html("");

    //Refill table with filtered data
    filteredData.forEach((species) => {
      //console.log(park);
      let rows = tbody.append("tr");
  
      Object.entries(species).forEach(([key, value]) => {
          //console.log(key, value);
          let cell = rows.append("td");
          cell.text(value);
      })
    });
  });
});