import {isInside,getMousePos,get_distance,onload,initial_dimensions,destination_dimensions} from './helpers.js';

window.applyKalmanFilter = true;

window.saveDataAcrossSessions = true;

const collisionSVG = "collisionSVG";

//stub - fill out later with procedural svg object generator
function place_objects(data){
}
let blinks = 0;
var collisionEyeListener = async function(data, clock) {
  if(!data)
    return;
  if (!webgazerCanvas) {
    webgazerCanvas = webgazer.getVideoElementCanvas();
  }

  var patches = await webgazer.getTracker().getEyePatches(webgazerCanvas, webgazerCanvas.width, webgazerCanvas.height);
  var fmPositions = await webgazer.getTracker().getPositions();
  var blink_detector = new webgazer.BlinkDetector();
  var blink_results = blink_detector.detectBlink(patches)
  if (blink_results.left.blink || blink_results.right.blink){
    blinks++;
  }



  var whr = webgazer.getVideoPreviewToCameraResolutionRatio();
  var line = d3.select('#eyeline1')
          .attr("x1",data.x)
          .attr("y1",data.y)
          .attr("x2",fmPositions[145][0] * whr[0])
          .attr("y2",fmPositions[145][1] * whr[1]);

  var line = d3.select("#eyeline2")
          .attr("x1",data.x)
          .attr("y1",data.y)
          .attr("x2",fmPositions[374][0] * whr[0])
          .attr("y2",fmPositions[374][1] * whr[1]);

  var dot = d3.select("#predictionSquare")
            .attr("x",data.x)
            .attr("y",data.y);
  if (get_distance(initial_dimensions.x, data.x,initial_dimensions.y,data.y) < initial_dimensions.radius){
    initial_position = true;
    time_initial_position = clock;
  }
  else if ((get_distance(destination_dimensions.x, data.x,destination_dimensions.y,data.y) 
    < destination_dimensions.radius) & initial_position) {
    
    var distance = get_distance(data.x, initial_dimensions.x,
      data.y,initial_dimensions.y)
    var speed_holder = document.getElementById('speed_result')
    var speed_message  = "Speed is: " 
    + String(Math.round(distance/(clock-time_initial_position) * 1000))
    + " pixels/second";
    var efficiency = "efficiency is " + String(Math.round(100*distance/total_distance)) + "%";
    speed_holder.innerHTML = speed_message + " " + efficiency;
    initial_position = false;

    total_distance = 0;
    time_initial_position = 0;
    
  }
  else{
    if (!last_position){
      last_position = (({ x, y }) => ({ x, y }))(data)
      return
    }
  var distance_traveled = get_distance(last_position.x,data.x,last_position.y,data.y)
  var new_x = destination_dimensions.x + data.x - (window.innerWidth/2)
  var new_y = destination_dimensions.y + data.y - (window.innerHeight/2)
  document.getElementById('start_circle').setAttribute('cx',new_x)
  document.getElementById('start_circle').setAttribute('cy',new_y)
  total_distance += distance_traveled
  last_position = (({ x, y }) => ({ x, y }))(data)

  }
}

window.onload = onload(setupCollisionSystem(),collisionEyeListener)

window.onbeforeunload = function() {
  if (window.saveDataAcrossSessions) {
      webgazer.end();
  } else {
      localforage.clear();
  }
}

function setupCollisionSystem() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var numberOfNodes = 2;
  var svg = d3.select("body").append("svg")
  .attr("id", collisionSVG)
  .attr("width", width)
  .attr("height", height)
  .style("top", "0px")
  .style("left","0px")
  .style("margin","0px")
  .style("position","absolute")
  .style("z-index", 100000);

  svg.append("circle")
  .attr("r", destination_dimensions.radius)
  .attr("cy",destination_dimensions.y)
  .attr("cx",destination_dimensions.x)
  .attr('id','start_circle')
  .style("fill", "red")

  svg.append("circle")
  .attr("r", initial_dimensions.radius)
  .attr("cy",initial_dimensions.y)
  .attr("cx",initial_dimensions.x)
  .style("fill", "red")

  svg.append("line")
  .attr("id", "eyeline1" )
  .attr("stroke-width",2)
  .attr("stroke","red");

  svg.append("line")
  .attr("id", "eyeline2" )
  .attr("stroke-width",2)
  .attr("stroke","red");

  svg.append("rect")
  .attr("id","predictionSquare")
  .attr("width",5)
  .attr("height",5)
  .attr("fill","red");

  svg.append("text")
  .attr("id","speed_result")
  .attr("x",width/50)
  .attr("y",height-(height/10))
  
}

var canvas = document.getElementById('collisionSVG');
var calibrate_button = document.getElementById('calibrate_button');

var button_attrs = calibrate_button.getBoundingClientRect()
var button_rect = {
  x:button_attrs.x,
  y:button_attrs.y,
  width:button_attrs.width,
  height:button_attrs.height
}
canvas.addEventListener('click',function(evt){
  var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,button_rect)) {
    finished_calibration = true
  }
}) 
var finished_calibration = false;
var initial_position = false;
var time_initial_position = 0;
var webgazerCanvas = null;
var total_distance = 0;
var last_position = null;

