//https://stackoverflow.com/questions/30868236/d3-js-grid-moving-around-when-dragging-and-zooming
data = {"nodes":
[
{"id": "0", "label": "Scott Joplin", "x": 341, "y": 3, "size": 3, "color": "black", "attributes": {}},
{"id": "b0", "label": "", "x": 0, "y": 3, "size": 0, "color": "black", "attributes": {"Birth": "Scott Joplin was born in 1868"}},
{"id": "1", "label": "Miles Davis", "x": 528, "y": 50, "size": 3, "color": "black", "attributes": {}},
{"id": "b1", "label": "", "x": 44, "y": 50, "size": 3, "color": "black", "attributes": {}}
],
"edges": 
[
{"id": "b0", "source": "b0", "target": "0", "size": 10, "color": "#000000", "type": "straight", "neighboors": "48;52;80;165"},
{"id": "b1", "source": "b1", "target": "1", "size": 10, "color": "#000000", "type": "straight", "neighboors": "179"} 
]}
;

var width = window.innerWidth;
var height = window.innerHeight;

var ratio = width/height;
var xTick = 20;
console.log(ratio);
/* GRID SETUP */

var x = d3.scale.linear()
	.domain([-width / 2, width / 2])
	.range([0, width]);

var y = d3.scale.linear()
	.domain([-height / 2, height / 2])
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.ticks(xTick)
	.orient("bottom")
	.tickSize(-height);

	console.log(Math.round(xTick/ ratio));
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(Math.round(xTick /ratio))
	.tickSize(-width);

/* DRWA GRID */


d3.select("#graph").style("margin", "0 auto").style("background-color","#FFFFFF");

svg = d3.select("#graph")
	.append("svg:svg")
	.attr("width", width)
	.attr("height", height)
	.style("border", "medium solid #FFFFFF")
	.call(d3.behavior.zoom().x(x).y(y).scaleExtent([0.5, 8]).on("zoom", zoomed))
	.append("g");

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);


// nodes = data.nodes;

// for (var i in data.edges) {
// 	for (var j in nodes) {
// 		if (nodes[j].id == data.edges[i].source) {
// 			data.edges[i].source = nodes[j];
// 		} else if (nodes[j].id == data.edges[i].target) {
// 			data.edges[i].target = nodes[j];
// 		}
// 	}
// }
// links = data.edges;

// var lines = svg.selectAll(".line")
// 	.data(links)
// 	.enter()
// 	.append("line")
// 	.attr('id', function(d) { return d.target.id })
// 	.attr("x1", function(d) { return d.source.x })
// 	.attr("y1", function(d) { return d.source.y })
// 	.attr("x2", function(d) { return d.target.x })
// 	.attr("y2", function(d) { return d.target.y })
// 	.attr("stroke-width", function(d) { if (d.id.indexOf("b") == -1 && d.id.indexOf("d") == -1) { return ""; } else { return "3"; } })
// 	.style("stroke", function(d) { if (d.id.indexOf("b") == -1 && d.id.indexOf("d") == -1) { return ""; } else { return d.color; } })
// 	.style("cursor", "pointer");


// lines.append("span")
// 	.style("display", "none")
// 	.text(function(d) { if (d.id.indexOf("b") != -1) { return d.target.label; } else if (d.id.indexOf("d") != -1) { return d.source.label; } else { return ""; }});

// lines.insert("div")
// 	.attr("class", function(d) {return "wiki_link";})
// 	.style('display', 'none')
// 	.html(function(d) { return d.target.attributes.wiki_link;});

// lines.insert("div")
// 	.attr("class", function(d) {return "wiki_desc";})
// 	.style('display', 'none')
// 	.html(function(d) { return d.target.attributes.wiki_desc;});

//draw the object and add them to objects list
function zoomed() {
	svg.select(".x.axis").call(xAxis);
	svg.select(".y.axis").call(yAxis);
	//objects.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}