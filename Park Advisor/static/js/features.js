// Animation for header text
let textWrapperHeader = document.querySelector(".page-header");
textWrapperHeader.innerHTML = textWrapperHeader.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.page-header .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.page-header',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Animation for header tagline
let textWrapperTagline = document.querySelector(".page-tagline");
textWrapperTagline.innerHTML = textWrapperTagline.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.page-tagline .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.page-tagline',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


let svgWidth = 1200;
let svgHeight = 650;

let margin = {
  top: 20,
  right: 100,
  bottom: 80,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
let svg = d3
  .select("#scatter")
  .append("svg")
  .classed('chart',true)
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
let chosenYAxis = "campgrounds";

function yScale(parkData, chosenYAxis) {
    // create scales
    let yLinearScale = d3.scaleLinear()
      .domain([0,d3.max(parkData, d => d[chosenYAxis]) 
      ])
      .range([height, 0]);
    return yLinearScale;
}

function renderYAxes(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
}

function renderYBars(barsGroup, newYScale, chosenYAxis) {

  barsGroup.transition()
    .duration(1000)
    .attr("y", d => newYScale(d[chosenYAxis]))
    .attr("height", d => height - newYScale(d[chosenYAxis]));

  return barsGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenYAxis, barsGroup) {

  let yLabel;

  if (chosenYAxis === "campgrounds") {
    yLabel = "Number of Campgrounds:";
  }
  else if (chosenYAxis === "trails"){
    yLabel = "Number of Trails:";
  }
  else {
    yLabel = "Number of Available Activities:";
  };

  let toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([10, -10])
    .html(function(d) {
      return (`${d.Park_Name}<br> ${yLabel} ${d[chosenYAxis]}`);
    });

  barsGroup.call(toolTip);

  barsGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data) {
      toolTip.hide(data);
    });

  return barsGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("data/features.csv").then(function(parkData, err) {
  if (err) throw err;
  
  // parse data
  parkData.forEach(function(data) {
    data.trails = +data.trails;
    data.campgrounds = +data.campgrounds;
    data.activities = +data.activities;
  });
  let code = [];
  parkData.forEach(d =>
    code.push(d.park_code)
    );
  
  // xLinearScale function above csv import
  let xLinearScale = d3.scaleBand()
    .domain(code) 
    .range([0, width])
    .padding(0.2);

  // Create y scale function
  let yLinearScale =yScale(parkData, chosenYAxis);

  // Create initial axis functions
  let bottomAxis = d3.axisBottom(xLinearScale);
  let leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  let xAxis = chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  let yAxis = chartGroup.append("g")
    .call(leftAxis);

  // append initial bars
  let barsGroup = chartGroup.selectAll("rect")
    .data(parkData)
    .enter()
    .append("rect")  
    .attr("x", d => xLinearScale(d.park_code))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .attr("width", xLinearScale.bandwidth())
    .attr("height", d => height - yLinearScale(d[chosenYAxis]))
    .attr("fill", "#28a745");

  // Create group for x/y axis labels
  let xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  let ylabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");
   
  xlabelsGroup.append("text")
    .classed('xText', true)
    .attr("x", 0)
    .attr("y", 40)
    .classed("active", true)
    .text("National Parks");

  xAxis.selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // append y axis
  let campgroundYLabel = ylabelsGroup.append("text")
    .classed('yText', true)
    .attr("y", 0 - margin.left+40)
    .attr("x", 0 - (height / 2))
    .attr("value", "campgrounds")
    .classed("active", true)
    .text("Number of Total Campgrounds");
  
  let trailYLabel = ylabelsGroup.append("text")
    .classed('yText', true)
    .attr("y", 0 - margin.left+50)
    .attr("x", 0 - (height / 2))
    .attr("value", "trails")
    .attr("dy", "1em")
    .classed("inactive", true)
    .text("Number of Total Trails");

  let activityYLabel = ylabelsGroup.append("text")
    .classed('yText', true)
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("value", "activities")
    .attr("dy", "1em")
    .classed("inactive", true)
    .text("Number of Available Activities");

  // updateToolTip function above csv import
  barsGroup = updateToolTip(chosenYAxis, barsGroup);

    ylabelsGroup.selectAll(".yText")
    .on("click", function() {
      // get value of selection
      let value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(parkData, chosenYAxis);

        // updates y axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        barsGroup = renderYBars(barsGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        barsGroup = updateToolTip(chosenYAxis, barsGroup);

        // changes classes to change bold text
        if (chosenYAxis === "campgrounds") {
          campgroundYLabel
            .classed("active", true)
            .classed("inactive", false);
          trailYLabel
            .classed("active", false)
            .classed("inactive", true);
          activityYLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "trails"){
          campgroundYLabel
            .classed("active", false)
            .classed("inactive", true);
          trailYLabel
            .classed("active", true)
            .classed("inactive", false);
          activityYLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          campgroundYLabel
            .classed("active", false)
            .classed("inactive", true);
          trailYLabel
            .classed("active", false)
            .classed("inactive", true);
          activityYLabel
            .classed("active", true)
            .classed("inactive", false);
        };
      }
    });
}).catch(function(error) {
  console.log(error);
});
