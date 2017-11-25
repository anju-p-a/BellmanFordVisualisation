//document.getElementById("dataButton").style.visibility = "hidden";
var vertexCount = 0;
const MAX = 9999;
const A = 65;
var count = 0;
function generateAlphabet(v){
  var c = String.fromCharCode((v-1)+ A);
  return c;
}
function generateGrid(){
  //vertexCount = d3.select("nodes").node().value;
  vertexCount = parseInt(document.getElementById('nodes').value);


  var body = document.getElementsByTagName("body")[0];
  var table = document.createElement("table");
  var tableBody = document.createElement("tablebody");
 //create table with row and column size as vertexCount
  for (var i = 0; i < vertexCount+1; i++) {
    var row = document.createElement("tr");
    row.setAttribute("width","3");
    for (var j = 0; j < vertexCount+1; j++) {

      var cell = document.createElement("td");
        cell.setAttribute("width","1");
        if(i != 0 && j != 0){
          var input = document.createElement("input");
          input.setAttribute("type","number");
          input.setAttribute("class","inputWeight");
          cell.appendChild(input);
        }

      if(i==0 && j>0){
        var cellText = document.createTextNode(generateAlphabet(j));
        cell.appendChild(cellText);
      }
      if(j==0 && i>0){
        var cellText = document.createTextNode(generateAlphabet(i));
        cell.appendChild(cellText);
      }



      row.appendChild(cell);

    }

    // add the row to the end of the table body
    tableBody.appendChild(row);
  }


  table.appendChild(tableBody);
  body.appendChild(table);
  table.setAttribute("border", "2");
  var button = document.createElement("button");
  button.setAttribute("onClick","drawGraph()");
  button.setAttribute("id","dataButton");
  var t = document.createTextNode("Draw Graph");
  button.appendChild(t);
  document.body.appendChild(button);
  //document.getElementById("dataButton").style.visibility = "visible";

}

function processData(){
  weights2D = new Array(vertexCount);
  for(var i = 0; i<vertexCount;i++){
    weights2D[i] = new Array(vertexCount);
  }
  weights = new Array(vertexCount*vertexCount);
  var x = document.getElementsByClassName("inputWeight");
  var length = x.length;
  var row =0,col =0;
  for(var i=0;i<length;i++){
    row = Math.floor(i/vertexCount);
    col = i%vertexCount;
     if(x[i].value == null || x[i].value == "" || x[i].value == 0){
       weights[i] = 0;
       weights2D[row][col] = 0;
     }else {
       weights[i] = x[i].value;
        weights2D[row][col] = x[i].value;
        count++;
     }
  }

}

/** FUNCTION TO DRAW THE GRAPH BASED ON THE USER INPUT **/

function drawGraph(){

processData();
var lineCoordinates = new Array(count);
for(var i = 0;i<count;i++){
  lineCoordinates[i] = new Array(2);
}

distances = new Array(vertexCount);
for(var i=0;i<vertexCount;i++){
distances[i] = MAX;
}
var widthX = 800;
var widthY = 600;
var radius = 25;
var edgeLength = 125;


//  document.getElementById("print").innerHTML = lineEnd[1];

//Initialising the radius array as a 2d array for cx and cy
var nodePosition = new Array(vertexCount);
for(var i = 0; i<vertexCount;i++){
  nodePosition[i] = new Array(2);
    if(i==0){
      nodePosition[i][0] = 25;
      nodePosition[i][1] = widthY/2;
    }else if (i == vertexCount-1) {
      nodePosition[i][0] = edgeLength*Math.ceil(i/2);
      nodePosition[i][1] = widthY/2;
    }else {
      if(i%2 == 1){
        nodePosition[i][0] = edgeLength*Math.ceil(i/2)
        nodePosition[i][1] = widthY/3;
      }else{
        nodePosition[i][0] = edgeLength*Math.floor(i/2)
        nodePosition[i][1] = widthY/1.5;
      }
    }
  }

  var k =0;
  for(var i=0;i<vertexCount;i++){
    for(j=0;j<vertexCount;j++){
      if(weights2D[i][j] != 0){
        lineCoordinates[k][0] = i;
        lineCoordinates[k][1] = j;
        k++;
      }
    }
  }

var svgContext = d3.select("body").append("svg")
                  .attr("width", widthX)
                  .attr("height", widthY);

var circleData = svgContext.selectAll("circle")
  .data(nodePosition)
  .enter()
  .append("circle");

var circleAttributes = circleData
  .attr("cx", function (d) { return d[0]; })
  .attr("cy",function (d) { return d[1];})
  .attr("r",25)
  .style("full","green");



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

var link = svgContext.selectAll("line")
.data(lineCoordinates)
.enter()
.append("line")
.attr("x1",function(d){ return nodePosition[d[0]][0]+radius;})
.attr("y1",function(d){ return nodePosition[d[0]][1];})
.attr("x2",function(d){ return nodePosition[d[1]][0]-radius;})
.attr("y2",function(d){ return nodePosition[d[1]][1];})
.attr("stroke","black")
.attr("stroke-width",2)
.attr("marker-end","url(#arrow)");
}
