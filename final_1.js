var vertexCount = 3;
var weights = [[0, 1, 2],
               [0, 0, 1],
               [0, 0, 0]];



var svgContext = d3.select("body").append("svg")
                  .attr("width", 600)
                  .attr("height", 600);
var vertices = svgContext
.append("circle")
.attr("cx", 50)
.attr("cy", 50)
.attr("r", 25)
.style("fill", "purple");


/** Defining the marker arrow to be used with each line **/
var markers = svgContext
.append("defs")
.append("marker")
.attr("id","arrow")
.attr("markerWidth",10)
.attr("markerHeight",10)
.attr("refX",0)
.attr("refY",3)
.attr("orient","auto")
.attr("markerUnits","strokeWidth")
.append("path")
.attr("d","M0,0 L0,6 L6,3 z");

var link = svgContext
.append("line")
.attr("x1",75)
.attr("y1",50)
.attr("x2",125)
.attr("y2",150)
.attr("stroke","black")
.attr("stroke-width",2)
.attr("marker-end","url(#arrow)");
