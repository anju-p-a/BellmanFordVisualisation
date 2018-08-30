//document.getElementById("dataButton").style.visibility = "hidden";
var vertexCount = 0;
const MAX = 9999;
const A = 65;
var count = 0;
var processOnce = 0
function generateAlphabet(v){
  var c = String.fromCharCode((v-1)+ A);
  return c;
}
function generateGrid(){
  //vertexCount = d3.select("nodes").node().value;
  vertexCount = parseInt(document.getElementById('nodes').value);
  var body = document.getElementById("tableDiv");
  var table = document.createElement("table");
  var tableBody = document.createElement("tablebody");
  //create table with row and column size as vertexCount
  for (var i = 0; i < vertexCount+1; i++) {
    var row = document.createElement("tr");
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

  distances = new Array(vertexCount);
  for(var i=0;i<vertexCount;i++){
    distances[i] = MAX;
  }

  table.appendChild(tableBody);
  body.appendChild(table);
  table.setAttribute("border", "2");
  var button = document.createElement("button");
  button.setAttribute("onClick","drawGraph()");
  button.setAttribute("id","dataButton");
  var t = document.createTextNode("Draw Graph");
  button.appendChild(t);
  document.getElementById("tableDiv").appendChild(button);
  //document.getElementById("dataButton").style.visibility = "visible";

}
var s = -1;
var  l = 0;
function processData(){
  if(processOnce == 0){
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
  processOnce++;

}
var iterationCount = 0;

function drawGraph_bellman(){
  distances[0] = 0;
  for(var i = 1;i<vertexCount;i++){
    s++;

    for(var j=0;j< lineCoordinates.length;j++){
      var src = lineCoordinates[j][0];
      var des = lineCoordinates[j][1];
      //setTimeout(function(){

      //computeDistance(i,j,src,des);
      testUpdate(des);
      //document.getElementById("print").innerHTML = i + "," + j;
      if(distances[src] != MAX && (parseInt(distances[src])+ parseInt(weights2D[src][des])< parseInt(distances[des]))){
      distances[des] = parseInt(distances[src])+parseInt(weights2D[src][des]);
      iterationCount++;

  }

}





//you can call detect_cycle() here
}
for(l=0;l<vertexCount;l++){
  //sleep(3);
  //updateGraph(l);
}

detect_cycle();
}
/*function computeDistance(i,j,src,des){
  //document.getElementById("print").innerHTML = i + "," + j;
  if(distances[src] != MAX && (parseInt(distances[src])+ parseInt(weights2D[src][des])< parseInt(distances[des]))){
    distances[des] = parseInt(distances[src])+parseInt(weights2D[src][des]);
  }
}
*/
function sleep(seconds)
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}


function detect_cycle(){
  for(var j=0;j< lineCoordinates.length;j++){
    var src = lineCoordinates[j][0];
    var des = lineCoordinates[j][1];
    if(distances[src] != MAX && (parseInt(distances[src])+ parseInt(weights2D[src][des])< parseInt(distances[des]))){
      var x = document.createElement("p");
      document.getElementById("tableDiv").appendChild(x);
      x.innerHTML = "Cycle is detected, cannot run the algorithm";
      return true;
    }
  }
}
function testUpdate(i){
  vertexDistance.datum(nodePosition)
  .transition()
  .text(distances[i])
  .duration(20000)
  .ease(d3.easeLinear);
}
function updateWeight(){
  vertexDistance = circleGroup.selectAll("text")
  .transition()
  .text(function(d,i){if(i==0){return distances[i];}else return '2';})
  .duration(2000)
  .ease(d3.easeLinear)
   .on("end",function(){

     d3.select(this)
     .transition()
     .text(function(d,i){if(i==1){return distances[i];}else {return '2'}})
     .duration(5000)
     .ease(d3.easeLinear);
   })
}


function updateGraph(l){
  vertexDistance.datum(nodePosition)
  .transition()
  .text(function (d,i) { return weights2D[d[l]][i];})
  .duration(2000)
  .ease(d3.easeLinear)
  .on("end",function(){
    if(l<vertexCount){
    l = parseInt(l+1);
  }
    updateGraph();
  })

}
/** FUNCTION TO DRAW THE GRAPH BASED ON THE USER INPUT **/

function drawGraph(){
  if(processOnce == 0){
    processData();
    lineCoordinates = new Array(count);
    for(var i = 0;i<count;i++){
      lineCoordinates[i] = new Array(2);
    }
  }



  var widthX = 800;
  var widthY = 600;
  var radius = 25;
  var edgeLength = 125;


  //  document.getElementById("print").innerHTML = lineEnd[1];

  //Initialising the radius array as a 2d array for cx and cy
  nodePosition = new Array(vertexCount);
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
  //creating data with information on edges
  var k =0;
  var nodeConnections = new Array(vertexCount);
  for(var i = 0;i<vertexCount;i++){
    nodeConnections[i] = 0;
  }
  for(var i=0;i<vertexCount;i++){
    for(j=0;j<vertexCount;j++){
      if(weights2D[i][j] != 0){
        lineCoordinates[k][0] = i;
        lineCoordinates[k][1] = j;
        nodeConnections[i]++;
        k++;
      }
    }
  }
  //svg context and drawing
  var svgContext = d3.select("#svgWrapper").append("svg")
  .attr("width", widthX)
  .attr("height", widthY);

  circleGroup = svgContext.append("g");

  var circleData = circleGroup.selectAll("circle")
  .data(nodePosition)
  .enter()
  .append("circle");

  var circleAttributes = circleData
  .attr("cx", function (d) { return d[0]; })
  .attr("cy",function (d) { return d[1];})
  .attr("r",25)
  .style("fill","green");

  ////place vertext weights on each node
  vertexDistance = circleGroup.selectAll("text")
  .data(nodePosition)
  .enter()
  .append("text")
  .attr("class", "nodeWeight")
  .attr("x",function(d){return d[0];})
  .attr("y",function(d){return d[1]-radius-15;})
  .attr('text-anchor', 'middle')
  .attr("dy",".35em")
  .text(function(d,i){return distances[i];});

  //gives node name to each circle
  /**var texte = circleGroup.selectAll("text")
  .data(nodePosition)
  .enter()
  .append("text")
  .attr("class", "nodeText")
  .attr("x",function(d){return d[0];})
  .attr("y",function(d){return d[1];})
  .attr('text-anchor', 'middle')
  .attr("dy",".35em")
  .text(function(d,i){return generateAlphabet(i+1);});**/




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

  var lines = svgContext.append("g");
  var link = lines.selectAll("line")
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


  var weightOnLine = lines.selectAll("text")
  .data(lineCoordinates)
  .enter()
  .append("text")
  .attr("x",function(d){
    if(nodePosition[d[0]][0] == nodePosition[d[1]][0]){
      return nodePosition[d[0]][0];
    }else{
      return (nodePosition[d[0]][0] + nodePosition[d[1]][0])/2 ;
    }})
    .attr("y",function(d){
      if(nodePosition[d[0]][1] == nodePosition[d[1]][1]){
        return -10+nodePosition[d[0]][1];
      }else {
        return -20+(nodePosition[d[0]][1]+ nodePosition[d[1]][1])/2;
      }})

      .attr('text-anchor', 'middle')
      .attr("dy",".35em")
      .text(function(d,i){return weights2D[d[0]][d[1]];});

      var button = document.createElement("button");
      button.setAttribute("onClick","drawGraph_bellman()");
      button.setAttribute("id","belmanButton");
      var t = document.createTextNode("Run bellmanFord");
      button.appendChild(t);
      document.getElementById("tableDiv").appendChild(button);
    }
