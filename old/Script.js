var w = 250,
    h = 250;

var colorscale = d3.scale.category10();

////////////////////////////////////////////
///////// Create Line Charts ///////////////
////////////////////////////////////////////

// TODO

////////////////////////////////////////////
///////// Create Radar Charts //////////////
////////////////////////////////////////////

// Legend titles
var LegendOptions = ['GitHub User'];

// Data
var data1 = [
    [
        { axis: "Commits", value: 0.10 },
        { axis: "Added LoC", value: 0.10 },
        { axis: "Removed Loc", value: 0.30 },
        { axis: "Branches", value: 0.70 },
        { axis: "Merges", value: 0.50 },
        { axis: "Pull Requests", value: 0.70 }
    ]
];

var data2 = [
    [
        { axis: "Commits", value: 0.30 },
        { axis: "Added LoC", value: 0.20 },
        { axis: "Removed LoC", value: 0 },
        { axis: "Branches", value: 0.20 },
        { axis: "Merges", value: 0.50 },
        { axis: "Pull Requests", value: 0.10 }
    ]
];

var data3 = [
    [
        { axis: "Commits", value: 0.70 },
        { axis: "Added LoC", value: 0.15 },
        { axis: "Removed Loc", value: 0 },
        { axis: "Branches", value: 0.50 },
        { axis: "Merges", value: 0.90 },
        { axis: "Pull Requests", value: 0.40 }
    ]
];

// Options for the Radar chart, other than default
var mycfg = {
    w: w,
    h: h,
    maxValue: 1,
    levels: 5,
    ExtraWidthX: 150
}

// Call function to draw the Radar chart
// Will expect that data is in %'s
RadarChart.draw("#radarChart1", data1, mycfg);
RadarChart.draw("#radarChart2", data2, mycfg);
RadarChart.draw("#radarChart3", data3, mycfg);

////////////////////////////////////////////
/////////// Initiate Legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
    .selectAll('svg')
    .append('svg')
    .attr("width", w)
    .attr("height", h)

// Initiate Legend	
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(-150,0)')
    ;

// Create colour squares
legend.selectAll('rect')
    .data(LegendOptions)
    .enter()
    .append("rect")
    .attr("x", w - 65)
    .attr("y", function (d, i) { return i * 20; })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function (d, i) { return colorscale(i); })
    ;

// Create text next to squares
legend.selectAll('text')
    .data(LegendOptions)
    .enter()
    .append("text")
    .attr("x", w - 52)
    .attr("y", function (d, i) { return i * 20 + 9; })
    .attr("font-size", "11px")
    .attr("fill", "#737373")
    .text(function (d) { return d; })
    ;	