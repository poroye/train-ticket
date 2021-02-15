// Create a new directed graph
var g = new dagreD3.graphlib.Graph().setGraph({});

// States and transitions
var currentState = 0;
var states = ["0","5","10","15","20","25","15S","20S","25S","30S"];
var remain = 0;

var remaining = document.getElementById('remain');
remaining.textContent = remain;
function getState(state){
  if(state == "0"){return 0;}
  else if(state == "5"){return 1;}
  else if(state == "10"){return 2;}
  else if(state == "15"){return 3;}
  else if(state == "20"){return 4;}
  else if(state == "25"){return 5;}
  else if(state == "15S"){return 6;}
  else if(state == "20S"){return 7;}
  else if(state == "25S"){return 8;}
  else if(state == "30S"){return 9;}
}
// Automatically label each of the nodes
states.forEach(function (state) {
  g.setNode(state, { label: state ,shape:"circle" });
});
// Set up the edges
g.setEdge("15S","15S",{label:"1"});
g.setEdge("15S","20S",{label:"2"});
g.setEdge("15S","25S",{label:"3"});
g.setEdge("15S","30S",{label:"4"});
g.setEdge("15S","0",{label:"C"});
g.setEdge("15S","10",{label:"5"});
g.setEdge("15S","5",{label:"10"});

g.setEdge("20S","15S",{label:"1"});
g.setEdge("20S","20S",{label:"2"});
g.setEdge("20S","25S",{label:"3"});
g.setEdge("20S","30S",{label:"4"});
g.setEdge("20S","0",{label:"C"});
g.setEdge("20S","15",{label:"5"});
g.setEdge("20S","10",{label:"10"});

g.setEdge("25S","15S",{label:"1"});
g.setEdge("25S","20S",{label:"2"});
g.setEdge("25S","25S",{label:"3"});
g.setEdge("25S","30S",{label:"4"});
g.setEdge("25S","0",{label:"C"});
g.setEdge("25S","20",{label:"5"});
g.setEdge("25S","15",{label:"10"});

g.setEdge("30S","15S",{label:"1"});
g.setEdge("30S","20S",{label:"2"});
g.setEdge("30S","25S",{label:"3"});
g.setEdge("30S","30S",{label:"4"});
g.setEdge("30S","0",{label:"C"});
g.setEdge("30S","25",{label:"5"});
g.setEdge("30S","20",{label:"10"});

g.setEdge("0","15S",{label:"1"});
g.setEdge("0","20S",{label:"2"});
g.setEdge("0","25S",{label:"3"});
g.setEdge("0","30S",{label:"4"});
g.setEdge("0","0",{label:"C,5,10"});

g.setEdge("5","5",{label:"1,2,3,4"});
g.setEdge("5","0",{label:"C,5,10"});

g.setEdge("10","10",{label:"1,2,3,4"});
g.setEdge("10","0",{label:"C,10"});
g.setEdge("10","5",{label:"5"});

g.setEdge("15","15",{label:"1,2,3,4"});
g.setEdge("15","0",{label:"C"});
g.setEdge("15","10",{label:"5"});
g.setEdge("15","5",{label:"10"});

g.setEdge("20","20",{label:"1,2,3,4"});
g.setEdge("20","0",{label:"C"});
g.setEdge("20","15",{label:"5"});
g.setEdge("20","10",{label:"10"});

g.setEdge("25","25",{label:"1,2,3,4"});
g.setEdge("25","0",{label:"C"});
g.setEdge("25","20",{label:"5"});
g.setEdge("25","15",{label:"10"});

// Set some general styles
g.nodes().forEach(function (v) {
  var node = g.node(v);
  node.rx = node.ry = 5;
});
// Add some custom colors based on state
g.node('0').style = "fill: #f77";

var svg = d3.select("svg"),
inner = svg.select("g");

// Set up zoom support
var zoom = d3.behavior.zoom().on("zoom", function () {
  inner.attr("transform", "translate(" + d3.event.translate + ")" +
  "scale(" + d3.event.scale + ")");
});
svg.call(zoom);

// Create the renderer
var render = new dagreD3.render();

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Center the graph
var initialScale = 1;

var GoTo = [
  //  1     2     3     4   C   5  10
  ["15S","20S","25S","30S","0","0","0"],    //0
  ["5","5","5","5","0","0","0"],            //5
  ["10","10","10","10","0","5","0"],        //10
  ["15","15","15","15","0","10","5"],       //15
  ["20","20","20","20","0","15","10"],      //20
  ["25","25","25","25","0","20","15"],      //25
  ["15S","20S","25S","30S","0","10","5"],   //15S
  ["15S","20S","25S","30S","0","15","10"],  //20S
  ["15S","20S","25S","30S","0","20","15"],  //25S
  ["15S","20S","25S","30S","0","25","20"]  //30S
];

let ST = document.getElementById('1');
let ND = document.getElementById('2');
let RD = document.getElementById('3');
let TH = document.getElementById('4');
let CC = document.getElementById('c');
let five = document.getElementById('5');
let ten = document.getElementById('10');

ST.addEventListener('click',ev=>{
  console.log("input 1 from",states[currentState]," to ",GoTo[currentState][0]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){
  g.node(GoTo[currentState][0]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][0]);
  console.log("now at",currentState," state ",states[currentState]);
  if(currentState == 0 || currentState > 5){remain = 15;}
  remaining.textContent = remain;
 }, 200 );
});

ND.addEventListener('click',ev=>{
  console.log("input 2 from",states[currentState]," to ",GoTo[currentState][1]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){  
  g.node(GoTo[currentState][1]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][1]);
  console.log("now at",currentState,states[currentState]);
  if(currentState == 0 || currentState > 5){remain = 20;}
  remaining.textContent = remain;
 }, 200 );
});

RD.addEventListener('click',ev=>{
  console.log("input 3 from",states[currentState]," to ",GoTo[currentState][2]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){  
  g.node(GoTo[currentState][2]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][2]);
  console.log("now at",currentState,states[currentState]);
  if(currentState == 0 || currentState > 5){remain = 25;}
  remaining.textContent = remain;
 }, 200 );
});

TH.addEventListener('click',ev=>{
  console.log("input 4 from",states[currentState]," to ",GoTo[currentState][3]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){  
  g.node(GoTo[currentState][3]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][3]);
  console.log("now at",currentState,states[currentState]);
  if(currentState == 0 || currentState > 5){remain = 30;}
  remaining.textContent = remain;
 }, 200 );
});

CC.addEventListener('click',ev=>{
  console.log("input cancel from",states[currentState]," to ",GoTo[currentState][4]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){  
  g.node(GoTo[currentState][4]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][4]);
  console.log("now at",currentState,states[currentState]);
  remain = 0;
  remaining.textContent = remain;
 }, 200 );
});

five.addEventListener('click',ev=>{
  console.log("input 5 from",states[currentState]," to ",GoTo[currentState][5]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){  
  g.node(GoTo[currentState][5]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][5]);
  console.log("now at",currentState,states[currentState]);
  if(remain > 4){remain = remain - 5;}
  remaining.textContent = remain;
 }, 200 );
});

ten.addEventListener('click',ev=>{
  console.log("input 10 from",states[currentState]," to ",GoTo[currentState][6]);
  states.forEach(function (state) {g.node(state).style = "fill: #ffffee";});
  render(inner, g);
  setTimeout(function(){  
  g.node(GoTo[currentState][6]).style = "fill: #f77";
  render(inner, g);
  currentState = getState(GoTo[currentState][6]);
  console.log("now at",currentState,states[currentState]);
  if(remain > 9){remain = remain - 10;}

  else if(remain == 5){remain = 0};

  remaining.textContent = remain;
 }, 200 );
});

