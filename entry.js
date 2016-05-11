function drawSquare(charString,offsetX,offsetY) {

	i=0;

	while(square=charString.match(/\w\d*/g)[i++]){


		c.fillStyle=referenceObj[square[0]]||'#000';

		c.f(

			// x
			4*(+square[1]*drawDirection+((drawDirection-1)*-5)+offsetX),

			// y
			4*(+square[2]+offsetY),

			// width
			4*drawDirection*((square[3]|0)+1),

			// height
			4*((square[4]|0)+1)
		)
	}
}

// global variables
worldOffset=isJumping=velY=velX=destY=posY=0;

referenceObj={

	/*
	 key handlers
	 */

	//left
	37:-1,

	//right
	39:counter=robotDirection=1,

	//space
	32:'if(!isJumping)isJumping=velY=-4;0',


	/*
	 colors
	 */

	// black is being caught by the fill
	// b:'000'
	w:'#fff',


	/*
	 tiles
	 */

	//0:water is set below based on counterStep

	// empty tile
	1:emptyTile='057w',

	// left edge (with one flower)
	2:'1702w26w354w542w63b64',

	// right edge
	3:'6702w56w054',

	// a lot of flowers
	4:emptyTile+'022w1104b12w432w5202b53w34',

	// just one flower
	5:emptyTile+'1004w012b11'

};

// key handling
b.onkeyup=b.onkeydown=function(e){

	// determine keyup or keydown with checking existence of 6th char
	// velX is based on evaling the keycode, making it 0 by default by ^0
	// if velX ends up to be 0, keep it the same
	robotDirection=(velX=e.type[6]?eval(referenceObj[e.keyCode])^0||velX:e.keyCode>36?0:velX)||robotDirection
};


c.f=c.fillRect;
feetPart='w18w7';
tiles='00245300241115430000254300243';

setInterval(function(){


	quarterCanvasWidth=a.width/4;
	worldWidth=(Math.max(232,quarterCanvasWidth+32)/8)|0;

	// clear canvas with fill, is cheaper then clearRect
	c.f(tileIndex=0,0,quarterCanvasWidth*4,canvasHeight=a.height);


	// determine robot position in world
	newWorldOffset=worldOffset+velX;
	robotWorldX=Math.floor(1+(posX+newWorldOffset)/8)%worldWidth;

	while(robotWorldX<0)robotWorldX=worldWidth+robotWorldX;

	robotIsInWater=!+tiles[robotWorldX];


	/*
	 wall detection and gravity
	 */

	swimDestY=(canvasHeight/8|0)-9;

	if(robotIsInWater&&posY==swimDestY||posY<swimDestY){
		worldOffset=newWorldOffset;
		destY=robotIsInWater?swimDestY:swimDestY-9
	}

	posY+=posY>swimDestY?-posY:velY++;

	if(posY>destY&&velY>0){

		isJumping=velY=0;
		posY=destY
	}


	// makes water animate and robot float
	waterFrame=counter%18<9;


	/*
	 robot drawing
	 */

	drawDirection=robotDirection;
	drawSquare(
		'w1063b4101b6101'+['w29w69',feetPart+7,feetPart+8,feetPart+9][robotFrame=isJumping?2:velX?counter%4:0],
		robotX=posX-4,
		robotY=+'6645'[robotFrame]+posY+(robotIsInWater&&waterFrame)
	);

	drawSquare(
		'w106w2142b51b421',
		robotX=posX-4,
		+'5455'[robotFrame]+robotY
	);

	drawSquare(
		'w00w80',
		robotX=posX-4,
		+'7676'[robotFrame]+robotY
	);


	/*
	 world drawing
	 */

	drawDirection=1;

	while(tileIndex<worldWidth){

		tileX=tileIndex++*8-worldOffset;
		while(tileX<-16)tileX+=worldWidth*8;
		while(tileX>quarterCanvasWidth+8)tileX-=worldWidth*8;

		// draw world tiles, of tiles[tileIndex] is 0 or undefined draw the water tile
		// start the tile with 'b0777w' to make sure the tiles are covering the robot
		// end the string with 'b' so the fillStyle is black when we're clearing the canvas at the beginning of the redraw
		drawSquare(
			'b0777w'+(referenceObj[tiles[tileIndex]]||['081w271w481w671b069','291w081w691w481'][+waterFrame])+'b',
			tileX,
			swimDestY+3)
	}

	counter++

},posX=82)