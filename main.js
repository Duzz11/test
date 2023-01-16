// (function () {
// 	'use strict';
	
// 	var canvas = document.querySelector('canvas'),
// 		ctx = canvas.getContext('2d'),
// 		W = canvas.width = window.innerWidth,
// 		H = canvas.height = window.innerHeight,
// 		maxP = 700,
// 		minP = 1000,
// 		fireworks = [];
	
// 	function tick() {
// 	  var newFireworks = [];
// 	  ctx.clearRect(0, 0, W, H);
	  
// 	  fireworks.forEach(function (firework) {
// 		firework.draw();
// 		if (!firework.done) newFireworks.push(firework);
// 	  });
	  
// 	  fireworks = newFireworks;
// 	  window.requestAnimationFrame(tick);
// 	}
	
// 	function Vector(x, y) {
// 	  this.x = x;
// 	  this.y = y;
// 	}
	
// 	Vector.prototype = {
// 	  constructor: Vector,
	  
// 	  add: function (vector) {
// 		this.x += vector.x;
// 		this.y += vector.y;
// 	  },
	  
// 	  diff: function (vector) {
// 		var target = this.copy();
// 		return Math.sqrt(
// 		  (target.x-=vector.x) * target.x + (target.y-=vector.y) * target.y
// 		);
// 	  },
	  
// 	  copy: function () {
// 		return new Vector(this.x, this.y);
// 	  }
// 	};
	
// 	var colors = [
// 	  ['rgba(179,255,129,', 'rgba(0,255,0,'], //green / white
// 	  ['rgba(0,0,255,', 'rgba(100,217,255,'], //blue / cyan
// 	  ['rgba(255,0,0,', 'rgba(255,255,0,'], //red / yellow
// 	  ['rgba(145,0,213,', 'rgba(251,144,204,'] //purple / pink
// 	];
	
// 	function Firework(start, target, speed) {
// 	  this.start = start;
// 	  this.pos = this.start.copy();
// 	  this.target = target;
// 	  this.spread = Math.round(Math.random() * (maxP-minP)) + minP;
// 	  this.distance = target.diff(start);
// 	  this.speed = speed || Math.random() * 5 + 15;
// 	  this.angle = Math.atan2(target.y - start.y, target.x - start.x);
// 	  this.velocity = new Vector(
// 		Math.cos(this.angle) * this.speed,
// 		Math.sin(this.angle) * this.speed
// 	  );
	  
// 	  this.particals = [];
// 	  this.prevPositions = [];
	  
// 	  var colorSet = colors[Math.round(Math.random() * (colors.length -1))];
	  
// 	  for (var i=0; i<this.spread; i++) {
// 		this.particals.push(new Partical(target.copy(), colorSet));
// 	  }
// 	}
	
// 	Firework.prototype = {
// 	  constructor: Firework,
	  
// 	  draw: function () {
// 		var last = this.prevPositions[this.prevPositions.length -1] || this.pos;
		
// 		ctx.beginPath();
// 		ctx.moveTo(last.x, last.y);
// 		ctx.lineTo(this.pos.x, this.pos.y);
// 		ctx.strokeStyle = 'rgba(255,255,255,.7)';
// 		ctx.stroke();
		
// 		this.update();
// 	  },
	  
// 	  update: function () {
// 		if (this.start.diff(this.pos) >= this.distance) {
// 		  var newParticals = [];
// 		  this.particals.forEach(function (partical) {
// 			partical.draw();
// 			if (!partical.done) newParticals.push(partical);
// 		  });
		  
// 		  this.particals = newParticals;
// 		  this.prevPositions = [];
		  
// 		  if (!newParticals.length) this.done = true;
// 		} else {
// 		  this.prevPositions.push(this.pos.copy());
		  
// 		  if (this.prevPositions.length > 8) {
// 			this.prevPositions.shift();
// 		  }
  
// 		  this.pos.add(this.velocity);
// 		}
// 	  }
// 	};
	
// 	function Partical(pos, colors) {
// 	  this.pos = pos;
// 	  this.ease = 0.2;
// 	  this.speed = Math.random() * 6 + 2;
// 	  this.gravity = Math.random() * 3 + 0.1;
// 	  this.alpha = .8;
// 	  this.angle = Math.random() * (Math.PI*2);
// 	  this.color = colors[Math.round(Math.random() * (colors.length - 1))];
// 	  this.prevPositions = [];
// 	}
	
// 	Partical.prototype = {
// 	  constructor: Partical,
	  
// 	  draw: function () {
// 		var last = this.prevPositions[this.prevPositions.length -1] || this.pos;
		
// 		ctx.beginPath();
// 		ctx.moveTo(last.x, last.y);
// 		ctx.lineTo(this.pos.x, this.pos.y);
// 		ctx.strokeStyle = this.color + this.alpha + ')';
// 		ctx.stroke();
		
// 		this.update();
// 	  },
	  
// 	  update: function () {
// 		if (this.alpha <= 0) {
// 		  this.done = true;
// 		} else {
// 		  this.prevPositions.push(this.pos.copy());
		  
// 		  if (this.prevPositions.length > 10) this.prevPositions.shift();
// 		  if (this.speed > 1) this.speed -= this.ease;
		  
// 		  this.alpha -= 0.01;
// 		  this.gravity += 0.01;
		  
// 		  this.pos.add({
// 			x: Math.cos(this.angle) * this.speed,
// 			y: Math.sin(this.angle) * this.speed + this.gravity
// 		  });
// 		}
// 	  }
// 	};
	
// 	function addFirework(target) {
// 	  var startPos = new Vector(W/2, H);
// 	  target = target || new Vector(Math.random() * W, Math.random() * (H - 300));
// 	  fireworks.push(new Firework(startPos, target));
// 	}
	
// 	canvas.addEventListener('click', function (e) {
// 	  addFirework(new Vector(e.clientX, e.clientY))
// 	}, false);
	
// 	function randomFirework() {
// 	  addFirework();
// 	  window.setTimeout(randomFirework, Math.random() * 1000);
// 	}
	
// 	tick();
// 	randomFirework();
	
//   })();

document.addEventListener("DOMContentLoaded",function(){
	var audio = document.getElementById('audio');
	audio.play();
	
	var canvas = document.createElement("canvas");
	var c = canvas.getContext("2d");
	
	document.body.appendChild(canvas);
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var Reset,Size,Number,Fill;
	
	Reset = document.querySelector("#Reset-Config");
	Size = document.querySelector("#Size");
	Number = document.querySelector("#Number");
	Fill = document.querySelector("#Fill");
	
	const config = {
	  size:3,
	  number:20,
	  fill:.1
	}
	
	const ColorArray = [
				"#ffffff",
				"#FF0000",
				"#33FF33",
				"#CCFF00",
				"#FF9900",
				"#3399FF",
				"#FF3399",
				"#CC0066",
				"#00FF00"];
  
	document.addEventListener('resize',function(){
	   canvas.width = window.innerWidth;
	   canvas.height = window.innerHeight;
	});
	document.addEventListener('click',function(){
	  audio.play();
	});
	Size.addEventListener("change",function(){
	  config.size = Size.value;
	});
	Number.addEventListener("change",function(){
	  config.number = Number.value;
	});
	Fill.addEventListener("change",function(){
	  config.fill = "."+Fill.value;
	});
	Reset.addEventListener("click",function(){
	  config.size = 3;
	  config.number = 20;
	  config.fill = .1;
	  Size.value = 3;
	  Number.value = 20;
	  Fill.value = 1;
	});
	/**FireWork**/
	function FireWork(){
	  this.radius = config.size;
	  this.x = canvas.width / 2;
	  this.y = canvas.height;
	  this.color = ColorArray[Math.floor(Math.random() * ColorArray.length)];
	  this.velocity = {
		x: Math.random()*6 - 3,
		y: Math.random()*3 + 3
	  }
	  this.maxY = Math.random() * canvas.height / 4 + canvas.height/10;
	  this.life = false;
	}
	
	FireWork.prototype.draw = function(c){
	  c.beginPath();
	  c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	  c.fillStyle = this.color;
	  c.fill()
	  c.closePath();
	}
	FireWork.prototype.maximumY = function(){
	  if(this.y <= this.maxY){
		this.life = true; 
		for(let i = 0; i < 10; i++){
		  SparkArray.push(new Spark(this.x, this.y, this.radius, this.color));
		}
	  }
	  if(this.x <= 0 || this.x >= canvas.width){
		this.life = true; 
		for(let i = 0; i < 10; i++){
		  SparkArray.push(new Spark(this.x, this.y, this.radius, this.color));
		}
	  }
	}
	
	FireWork.prototype.update = function(c){
	  this.y -= this.velocity.y;
	  this.x += this.velocity.x
	  this.maximumY();
	  this.draw(c)
	}
	/**end firework**/
	/**Spark**/
	
	function Spark(x, y, radius, color){
	  this.x = x;
	  this.y = y;
	  this.radius = radius/2;
	  this.color = color;
	  this.velocity = {
		x: Math.random()*3 - 1,
		y: Math.random()*3 - 1
	  }
	  this.friction = 0.015;
	  this.life = 150;
	}
	
	Spark.prototype.draw = function(c){
	  c.beginPath();
	  c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	  c.fillStyle = this.color;
	  c.fill();
	  c.closePath();
	}
	Spark.prototype.update = function(c){
	  this.velocity.y -= this.friction;
	  this.life -= 1;
	  this.y -= this.velocity.y;
	  this.x += this.velocity.x;
	  this.draw(c);
	}
	/**end Spark**/
	  
	var FireWorkArray = [];
	var SparkArray = [];
	function init(){
	  if(FireWorkArray.length < config.number)
		FireWorkArray.push(new FireWork());
	}
	
	function animate(){
	  window.requestAnimationFrame(animate);
	  c.fillStyle = `rgba(0,0,0,${config.fill})`; 
	  c.fillRect(0, 0, canvas.width, canvas.height);
	  
	  FireWorkArray.forEach(function(fw, index){
		fw.update(c);
		if(fw.life)
		  FireWorkArray.splice(index,1);
	  });
	  SparkArray.forEach(function(s, index){
		if(s.life <= 0)
		  SparkArray.splice(index,1);
		s.update(c);
	  });
	  init();
	  console.log(SparkArray.length);
	}
	
	animate();
	
  });
  
  // Play and loop music
  

