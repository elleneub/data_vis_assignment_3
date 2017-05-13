// Sam Neubauer and Kyle Schiller
// LAB marks code taken from Eric Alexander's d3_lab

// LAB: First, we will create some constants to define non-data-related parts of the visualization
const mapWidth = 460;
const mapHeight = 760;		
const w = 470;				// Width of our scatter plot
const h = 400;				// Height of our scatter plot
const xOffset = 160;		// Space for x-axis labelsx
const yOffset = 50;		// Space for y-axis labels
const metrics = ['POP_ESTIMATE_', 'N_POP_CHG_', 'Births_', 'Deaths_', 'NATURAL_INC_', 
				 'INTERNATIONAL_MIG_', 'DOMESTIC_MIG_', 'NET_MIG_', 'Unemployment_rate_'];
//  "Percent of adults with less than a high school diploma, 1970" 80, 90, 2000, 2011-2015
const years = [2010, 2011, 2012, 2013, 2014, 2015];

let year = years[0];
let x = "Percent of adults with less than a high school diploma, 1970"; // = metrics[8]+year;
//let x = "PCTPOV517_2015";
//"Percent of adults with less than a high school diploma, 1970"
let y = "poverty_PCTPOV017_2015"; //metrics[6]+year;
const yDisplayName = "Percent Poverty 2015";
// let x = metrics[8]+year;
// let y = metrics[6]+year;


scatterSVG = d3.select('#scatterDiv').append('svg')
	.attr('width', w + 100)
	.attr('height', h + 20);	

xAxisG = scatterSVG.append('g')
		.attr('class', 'yaxis')
		.attr('transform', 'translate(' + (100) + ',' + (0) + ')');

yAxisG = scatterSVG.append('g')
		.attr('class', 'xaxis')
		.attr('transform', 'translate(' + (-60) + ',' + (h-yOffset) + ')');

// LAB: Load in our CSV of data
d3.csv('poverty_education.csv', function(csvData) {	
	data = csvData;

	toFloat = (s) => { return parseFloat(s.replace(/,/g, '')); } 



	//getMinVal = (metric) => d3.min(data.map( row => toFloat(row[metric]) ));

	//getMaxVal = (metric) => d3.max(data.map( row => toFloat(row[metric]) ));

	getMinVal = (metric) => d3.min(data.map( row => toFloat(row[metric]) ));

	getMaxVal = (metric) => d3.max(data.map( row => toFloat(row[metric]) ));

	console.log("Yo");
	const xScale = d3.scale.linear()
		.domain([getMinVal(x), getMaxVal(x)])
		.range([xOffset, w]);

	const yScale = d3.scale.linear()
		.domain([getMinVal(y), getMaxVal(y)])
		.range([h-yOffset, 50]); 

	console.log("Yo");
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

	var scatterLabel = scatterSVG.append('text')
		.attr('x', 30)
		.attr('y', h/2)
		.attr('text-anchor', 'middle')
		.attr('font-size', '14')
	    .attr('transform', 'rotate(90 ' + 30 + ' ' + h/2 + ')')
		.text(yDisplayName);

	var scatterLabel2 = scatterSVG.append('text')
		.attr('x', w/2)
		.attr('y', h)
		.attr('text-anchor', 'middle')
		.attr('font-size', '14')
		.text(x);

	var filter = scatterSVG.append("defs")
		.append("filter")
			.attr("id", "blur")
			.attr('x', '-50%')
			.attr('y', '-50%')
			.attr('height', '200%')
			.attr('width', '200%')
		.append("feGaussianBlur")
			.attr("stdDeviation", 5);
			
	circles = scatterSVG.selectAll('circle')
		.data(data);

	circles.enter()
	 	.append('svg:circle')

	circles
		.attr('x', (d) => d[x])
		.attr('y', (d) => d[y])
		.style('fill', 'rgb(105,16,120)')
		.attr('stroke-width', '0')
		.attr('r', '10')
		.attr('opacity', '.03')
        .attr("filter", "url(#blur)")
		.transition().duration(500)
		.attr('cx', (d) => xScale(toFloat(d[x])) - 60)
		.attr('cy', (d) => yScale(toFloat(d[y])));	
});

updateData = () => d3.csv('states_population_unemployment.csv', function(csvData) {	
	data = csvData;

});

