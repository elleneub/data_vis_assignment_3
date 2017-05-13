// Sam Neubauer and Kyle Schiller
// LAB marks code taken from Eric Alexander's d3_lab

// Create some constants to define non-data-related parts of the visualization
const mapWidth = 460;		// Width of our maps
const mapHeight = 760;		// Height of our maps
const w = 470;				// Width of our scatter plot
const h = 400;				// Height of our scatter plot
const xOffset = 160;		// Space for x-axis labelsx
const yOffset = 50;		// Space for y-axis labels

// Combination of metrics and years can index all our relevant data
const metrics = ['POP_ESTIMATE_', 'N_POP_CHG_', 'Births_', 'Deaths_', 'NATURAL_INC_', 
				 'INTERNATIONAL_MIG_', 'DOMESTIC_MIG_', 'NET_MIG_', 'Unemployment_rate_'];
// For displaying to the actual user
const metricPrettyNames = ['Population Estimate ', 'Net Population Change ', 'Number Births ', 'Number of Deaths ', 'Natural Increase ', 
				 'International Migration ', 'Domestic Migration ', 'Net Migration ', 'Unemployment Rate '];
const years = [2010, 2011, 2012, 2013, 2014, 2015];

let year = years[0];
// X and Y Column names and names for displaying to user
let x = metrics[8]+year;
let y = metrics[6]+year;
let prettyX = metricPrettyNames[8]+year;
let prettyY = metricPrettyNames[6]+year;

// Define projection and geoPath that will let us convert lat/long to pixel coordinates
var projection = d3.geo.albersUsa().scale(500).translate([mapWidth/2, mapHeight/5]);
var geoPath = d3.geo.path()
        .projection(projection);

// Add svg elements for the two maps
var mapSVG = d3.select("#mapDiv").append("svg")
        .attr("width", mapWidth)
        .attr("height", mapHeight);

var mapSVG2 = d3.select("#mapDiv2").append("svg")
        .attr("width", mapWidth)
        .attr("height", mapHeight);

// Add box for labels below the maps
mapSVG.append('rect')
	.attr('x', mapWidth/2-140)
	.attr('y', mapHeight - 450)
	.attr('width', 280)
	.attr('height', 29)
	.attr('fill', 'white')
	.attr('stroke', 'black')
	.attr('open', 'false')
	.attr('rect', 'rect')
	.attr('stroke-width', '1');

// Add in the labels, set initial text
var label = mapSVG.append('text')
	.attr('x', mapWidth/2)
	.attr('y', mapHeight - 430)
	.attr('text-anchor', 'middle')
	.attr('font-size', '14')
	.text(prettyY);
// for every metric, make a hidden text element at label location
// Sets the idx, which is index in metrics array
metrics.forEach( (metric, idx) => {
	mapSVG.append('text')
		.attr('x', mapWidth/2)
		.attr('y', mapHeight - 430)
		.attr('option', 'true')
		.attr('visible', 'false')
		.attr('index', idx)
		.attr('text-anchor', 'middle')
		.attr('font-size', '14')
		.attr('opacity', '0')
		.text(metricPrettyNames[idx]);
});


// Repeat for second map
mapSVG2.append('rect')
	.attr('x', mapWidth/2-140)
	.attr('y', mapHeight - 450)
	.attr('width', 280)
	.attr('height', 29)
	.attr('fill', 'white')
	.attr('stroke', 'black')
	.attr('open', 'false')
	.attr('rect', 'rect2')
	.attr('stroke-width', '1');
var label2 = mapSVG2.append('text')
	.attr('x', mapWidth/2)
	.attr('y', mapHeight - 430)
	.attr('text-anchor', 'middle')
	.attr('font-size', '14')
	.text(prettyX);
metrics.forEach( (metric, idx) => {
	mapSVG2.append('text')
		.attr('x', mapWidth/2)
		.attr('y', mapHeight - 430)
		.attr('option2', 'true')
		.attr('visible', 'false')
		.attr('index', idx)
		.attr('text-anchor', 'middle')
		.attr('font-size', '14')
		.attr('opacity', '0')
		.text(metricPrettyNames[idx]);
});

// for all metrics in map 1 add click event, which if visible sets to current y metric
options = d3.selectAll('[option=true]');
options.on('click', function() {
	let currOption = d3.select(this);
	if (currOption.attr('visible') == 'true') {
		// index is set as location in metrics array
		let index = currOption.attr('index');
		y = metrics[index]+year;
		prettyY = metricPrettyNames[index]+year;
		label.text(prettyY);
		scatterLabel.text(prettyY);
		updateData();
	}
});

// for all metrics in map 2 add click event, which if visible sets to current x metric
options2 = d3.selectAll('[option2=true]');
options2.on('click', function() {
	let currOption = d3.select(this);
	if (currOption.attr('visible') == 'true') {
		let index = currOption.attr('index');
		x = metrics[index]+year;
		prettyX = metricPrettyNames[index]+year;
		label2.text(prettyX);
		scatterLabel2.text(prettyX);
		updateData();
	}
});

// selects the label box for 1st map, on click if open, close options, otherwise open options
rect = d3.select('[rect=rect]');
rect.on('click', function() {
	currRect = d3.select(this);
	if (currRect.attr('open') == 'false') { 
		currRect.attr('open', 'true');
		// for each option, flip visibility and opacity, move location
		options[0].forEach( option => {
			let currOption = d3.select(option);
			let index = currOption.attr('index');
			currOption
				.attr('visible', 'true')
				.transition().duration(400)	
				.attr('opacity', '1')
				.attr('y', mapHeight - 395 + index*20);
		});
	} else {
		currRect.attr('open', 'false');
		options[0].forEach( option => {
			let currOption = d3.select(option);
			let index = currOption.attr('index');
			// for each option, flip visibility and opacity, move location
			currOption
				.attr('visible', 'false')
				.transition().duration(400)	
				.attr('opacity', '0')
				.attr('y', mapHeight - 430);
		});
	}
});

// selects the label box for 2nd map, on click if open, close options, otherwise open options
rect2 = d3.select('[rect=rect2]');
rect2.on('click', function() {
	console.log("SLdFJLKSDJFKLJ");
	currRect = d3.select(this);
	if (currRect.attr('open') == 'false') { 
		currRect.attr('open', 'true');
		options2[0].forEach( option => {
			let currOption = d3.select(option);
			let index = currOption.attr('index');
			currOption
				.attr('visible', 'true')
				.transition().duration(400)	
				.attr('opacity', '1')
				.attr('y', mapHeight - 395 + index*20);
		});
	} else {
		currRect.attr('open', 'false');
		options2[0].forEach( option => {
			let currOption = d3.select(option);
			let index = currOption.attr('index');
			currOption
				.attr('visible', 'false')
				.transition().duration(400)	
				.attr('opacity', '0')
				.attr('y', mapHeight - 430);
		});
	}
});

// sets up the central scatterplot
scatterSVG = d3.select('#lineGraphDiv').append('svg:svg')
	.attr('width', w + 100)
	.attr('height', h + 20);

var defs = scatterSVG.append("defs")

var xLinearGradient = defs.append("linearGradient")
		.attr("id", "x-linear-gradient")
		.attr("x1", "0%")
	    .attr("y1", "0%")
	    .attr("x2", "100%")
	    .attr("y2", "0%");
//Set the color for the start (0%)
xLinearGradient.append("stop") 
    .attr("offset", "0%")   
    .attr("stop-color", "rgb(250, 127, 127)"); // red

//Set the color for the end (100%)
xLinearGradient.append("stop") 
    .attr("offset", "100%")   
    .attr("stop-color", "rgb(125, 255, 255)"); // blue

var yLinearGradient = defs.append("linearGradient")
		.attr("id", "y-linear-gradient")
		.attr("x1", "0%")
	    .attr("y1", "100%")
	    .attr("x2", "0%")
	    .attr("y2", "0%");
//Set the color for the start (0%)
yLinearGradient.append("stop") 
    .attr("offset", "0%")   
    .attr("stop-color", "rgb(250, 127, 127)"); // red

//Set the color for the end (100%)
yLinearGradient.append("stop") 
    .attr("offset", "100%")   
    .attr("stop-color", "rgb(125, 255, 255)"); // blue

//.style("fill", "url(#linear-gradient)");

var scatterLabel = scatterSVG.append('text')
	.attr('x', 30)
	.attr('y', h/2)
	.attr('text-anchor', 'middle')
	.attr('font-size', '14')
    .attr('transform', 'rotate(90 ' + 30 + ' ' + h/2 + ')')
	.text(prettyY);

var xAxisColorLegend = scatterSVG.append('rect')
	.attr('width', w-xOffset)
	.attr('x', 100)
	.attr('y', h-yOffset)
	.attr('height', 6)
	.style("fill", "url(#x-linear-gradient)");

var yAxisColorLegend = scatterSVG.append('rect')
	.attr('width', 6)
	.attr('height', h-yOffset-50)
	.attr('x', 94)
	.attr('y', yOffset)
	.style("fill", "url(#y-linear-gradient)");

	//.range([h-yOffset, 50]); 

	//.range([xOffset, w]);

var scatterLabel2 = scatterSVG.append('text')
	.attr('x', w/2)
	.attr('y', h)
	.attr('text-anchor', 'middle')
	.attr('font-size', '14')
	.text(prettyX);

// sets up the year selector
var yearSVG = d3.select('#yearDiv').append('svg')
	.attr('width', '100%')
	.attr('height', 50);	

years.forEach( (year, idx) => {
	// enlarge first year to show its selected
	var fontSize = idx == 0 ? 18 : 14;
	yearSVG.append('text')
		.attr('x', 110*idx+440)
		.attr('y', 40)
		.attr('yearOption', 'true')
		.attr('index', idx)
		.attr('text-anchor', 'middle')
		.attr('font-size', fontSize)
		.attr('opacity', '1')
		.attr('z-index', '50')
		.text(year);
});

yearOptions = d3.selectAll('[yearOption=true]');
yearOptions.on('click', function() {
	let currOption = d3.select(this);
	yearOptions.attr('font-size', '14');
	currOption.attr('font-size', '18');
	year = currOption.text();
	// modify x and y to reflect selected year
	x = x.substr(0, x.length-4) + year;
	y = y.substr(0, y.length-4) + year;
	prettyX = prettyX.substr(0, prettyX.length-4) + year;
	prettyY = prettyY.substr(0, prettyY.length-4) + year;
	label.text(prettyY);
	label2.text(prettyX);
	scatterLabel.text(prettyY);
	scatterLabel2.text(prettyX);
	updateData();
});


// Set up axes
xAxisG = scatterSVG.append('g')
		.attr('class', 'yaxis')
		.attr('transform', 'translate(' + (100) + ',' + (0) + ')');

yAxisG = scatterSVG.append('g')
		.attr('class', 'xaxis')
		.attr('transform', 'translate(' + (-60) + ',' + (h-yOffset) + ')');

// update data called when year or metrics changed
updateData = () => d3.csv('states_population_unemployment.csv', function(csvData) {	
	data = csvData;

	// creates an array of all of the state names
	const stateNames = data.map( row => row['Area_Name'] );

	// function that takes number string and turns into float
	toFloat = (s) => parseFloat(s.replace(/,/g, ''));

	// get min and max for a given metric
	getMinVal = (metric) => d3.min(data.map( row => toFloat(row[metric]) ));

	getMaxVal = (metric) => d3.max(data.map( row => toFloat(row[metric]) ));

	const xScale = d3.scale.linear()
		.domain([getMinVal(x), getMaxVal(x)])
		.range([xOffset, w]);

	const yScale = d3.scale.linear()
		.domain([getMinVal(y), getMaxVal(y)])
		.range([h-yOffset, 50]); 

	const xColorScale = d3.scale.linear()
		.domain([getMinVal(x), getMaxVal(x)])
		.range([0, 127]);
	
	const yColorScale = d3.scale.linear()
		.domain([getMinVal(y), getMaxVal(y)])
		.range([0, 127]); 

	const stateToX = {};
	const stateToY = {};

	data.forEach( row => {
		stateToX[row['Area_Name'].replace(/ /g, "")] = toFloat(row[x]);
		stateToY[row['Area_Name'].replace(/ /g, "")] = toFloat(row[y]);
	});

	// given a axis (x or y), returns the appropiate color scale
	scale = (axis) => {
		return axis == "x" ? xColorScale : yColorScale;
	}

	// given a axis (x or y), returns the appropriate dictionary (state name to var)
	stateTo = (axis) => {
		return axis == "x" ? stateToX : stateToY;
	}

	// given a color value, returns a rbg color string input color value is between 0 - 127
    stateColor = (colorValue) => {
    	intValue = parseInt(colorValue);
		return "rgb(" + (255-intValue) + "," + (127+intValue) + "," + (127+intValue) + ")";
	};

	// LAB Using the global variables that have been set for geoData, stateData, etc, build map
	var buildMap = function (parentSVG, geoData, axis) {
	    // Create paths for each state
	    var states = parentSVG.selectAll('.state')
	        .data(geoData.features);

	    // Append paths to the enter selection
	    states.enter()
	        .append('path')
	        .attr('name', (d) => { return d["properties"]["name"].replace(/ /g, ""); })
	        .attr('d', geoPath)
	        .attr('stroke', 'black')
	        .style('fill', (d) => { 
	        	return stateColor(scale(axis)(stateTo(axis)[d["properties"]["name"].replace(/ /g, "")])); 
	        });

	    states
	        .append('svg:title')
	        .text((d) => { return d["properties"]["name"]; });

	    // on hover, gives greater border to related objects (two states and point)
       	states
			.on('mouseover', function() {
				state = d3.select(this);
				stateName = state.attr('name');
				relatedObjects = d3.selectAll(`[name=${stateName}]`);
				console.log(relatedObjects);
				relatedObjects
					.attr('stroke-width', '5');
			});

       	states
			.on('mouseout', function() {
				state = d3.select(this);
				stateName = state.attr('name');
				relatedObjects = d3.selectAll(`[name=${stateName}]`);
				relatedObjects
					.attr('stroke-width', '1');
			});
	};

	// LAB: Let's load the geographical data (in JSON format)
	d3.json('usCoords.json', function(error, jsonData) {
       buildMap(mapSVG, jsonData, "y");
	});

	d3.json('usCoords.json', function(error, jsonData) {
       buildMap(mapSVG2, jsonData, "x");
	});

	// x and y axes
    xAxis = d3.svg.axis()
			.scale(xScale)
			.orient('bottom')
			.ticks(5);
    yAxis = d3.svg.axis()
			.scale(yScale)
			.orient('left')
			.ticks(5);
	scatterSVG.select('[class=xaxis]').call(xAxis);
	scatterSVG.select('[class=yaxis]').call(yAxis);

	circles = scatterSVG.selectAll('circle')
		.data(data);

	circles.enter()
	 	.append('svg:circle')

	circles
		.attr('name', (d) => d['Area_Name'].replace(/ /g, "") )
		// sets to actual x and y values
		.attr('x', (d) => d[x])
		.attr('y', (d) => d[y])
		.style('fill', 'white')
		.style('fill-opacity', '0')
		.attr('r', '6')
		.transition().duration(500)
		// sets to mapped x and y values
		.attr('cx', (d) => xScale(toFloat(d[x])) - 60)
		.attr('cy', (d) => yScale(toFloat(d[y])));

	// on hover give border to related items
	circles.on('mouseover', function() {
		stateName = d3.select(this).attr('name');
		relatedStates = d3.selectAll(`[name=${stateName}]`);
		relatedStates.attr('stroke-width', '5');
	});

	circles.on('mouseout', function() {
		stateName = d3.select(this).attr('name');
		relatedStates = d3.selectAll(`[name=${stateName}]`);
		relatedStates.attr('stroke-width', '1');
	});
});

updateData();
