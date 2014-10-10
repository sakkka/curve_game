var nbplayer = 1;
var playerNames = new Array();

/*var decompte_fin=false;
var compte=4;
function decompte() 
{
	
	if(compte == 4)document.getElementById('compte').innerHTML = compte-1;
	if(compte == 3)document.getElementById('compte').innerHTML = compte-1;
	if(compte == 2){document.getElementById('compte').innerHTML = compte-1; decompte_fin=true;}
	if(compte == 1){
		document.getElementById('compte').innerHTML = "GO";
		
	}

	compte--;
	if(decompte_fin==false) {
		document.getElementById('compte').innerHTML = compte;
	}
	if (compte==0){
		decompte_fin = true;
	}


}*/

function fin_partie(){
	var fini = false;
	
	if(nbplayer == 3){
		for(var i=0;i<nbplayer-1;i++){
			if(playerNames[i].score == 5){
				alert(playerNames[i].name +" a gagné");
				fini = true;
			}
		}
	}
	if(nbplayer >=4){
		for(var i=0;i<nbplayer-1;i++){
			if(playerNames[i].score == 10){
				alert(playerNames[i].name +" a gagné");
				fini = true;
			}
		}
	}
	if (fini==true)
		for(var i=0;i<nbplayer-1;i++)
			playerNames[i].score = 0;
			affichage();
}
function jouer(){
	compte=4;
	//decompte();
	//setInterval(decompte , 1000);
	//setTimeout(aka, 3000);
	aka();
}
function changeColor()
{
	var newColor = document.getElementById('colorPicker').value;
	document.getElementById('menu').style.background = newColor;
}

function RandomArbitary (min, max) {
    	return Math.random() * (max - min) + min;
}

function addPlayer()
{		

	if(nbplayer > 4){
		alert("MAX PLAYERS");
		return ;
	}	
		
	var pname = document.getElementById('playerName').value;
	var string = "" ;
	var b ={score : 0,
			name : pname};
	playerNames.push(b);
	var couleur ="";
	for(var i=0; i<nbplayer; i++) {
		//alert(playerNames[i].score);
		if(i==0){
			couleur = "<img src='img/snake1.png'>  ← / →";
		}
		if(i==1){
			couleur = "<img src='img/snake2.png'>  Q / S";
		}
		if(i==2){
			couleur = "<img src='img/snake3.png'>  G / H";
		}
		if(i==3){
			couleur = "<img src='img/snake4.png'>  L / M";
		}
		if(i==nbplayer-1)
			string += playerNames[i].name+" &nbsp;  "+couleur+" &nbsp; score : &nbsp;"+ playerNames[i].score+"  &nbsp;<a href='#' onClick='delPlayer("+i+")'><img src='img/croix_rouge3.png' height='15'/></a><br>";
		else
			string += playerNames[i].name+" &nbsp;  "+couleur+" &nbsp; score : &nbsp;"+ playerNames[i].score+" <br>";
	}

	document.getElementById('playerList').innerHTML = string;
	nbplayer++;
	
	
}
function affichage()
{
	var string = "" ;
	var couleur ="";

	for(var i=0; i<nbplayer-1; i++) {

		var nom = playerNames[i].name;
		if(i==0){
			couleur = "<img src='img/snake1.png'>  ← / →";
		}
		if(i==1){
			couleur = "<img src='img/snake2.png'>  Q / S";
		}
		if(i==2){
			couleur = "<img src='img/snake3.png'>  G / H";
		}
		if(i==3){
			couleur = "<img src='img/snake4.png'>  L / M";
		}
		if(i==nbplayer-2)
			string += nom+" &nbsp;  "+couleur+" &nbsp; score : &nbsp;"+ playerNames[i].score+"  &nbsp;<a href='#' onClick='delPlayer("+i+")'><img src='img/croix_rouge3.png' height='15'/></a><br>";
		else
			string += nom+" &nbsp;  "+couleur+" &nbsp; score : &nbsp;"+ playerNames[i].score+" <br>";
	}

	document.getElementById('playerList').innerHTML = string;
}

function delPlayer(nb) 
{
	playerNames.pop();
	nbplayer--;
	affichage();
}


function aka() // fonction principale de jeu
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, w, h);

	var time;
	var gamePaused = false;	
	var joueurs_vivants;
	var food1; var food2; var food3; var foodBomb;// bonus
	var matrice = new Array(w,h);
	var x1; var y1; // directions du snake a 0.01 près.
	// snakes
	var snake1 = new Array();
	var snake2 = new Array();
	var snake3 = new Array();
	var snake4 = new Array();
	
	var touches = [];
	var timerBonus1; var timerBonus2;
	var presence_bomb=false; // présence de la bombe sur le terrain
	var passe_muraille=false; // passe muraille désactivé par dé


	// cumul des bonus pour chaque snake
	var bonusS1 = new Array();
	var bonusS2 = new Array();
	var bonusS3 = new Array();
	var bonusS4 = new Array();
	
	


	 $(document).ready(function(){
        init();
    });

	document.getElementById("pause").onclick = function pauseGame() 
	{
		if (!gamePaused) {
  			clearTimeout(game_loop);
    		gamePaused = true;
  		} 
		else if (gamePaused) {
    		game_loop = setInterval(paint, 5);
   			gamePaused = false;
  		}
	}

	function init()
	{
		//create_snake_gen(x1, y1,dirx,diry, vitesse, name, id,taille)
		joueurs_vivants=playerNames.length;
		
		if(playerNames.length>=2)
		{
			create_snake_gen(50, 50,1,RandomArbitary(0,1), 0.5, snake1, 1,3);
			create_snake_gen(950, 450,-1,RandomArbitary(-1,0),0.5, snake2, 2,3);
		}
		if(playerNames.length>=3)
			create_snake_gen(950, 50,-1,RandomArbitary(0,1),0.5, snake3, 3,3);
		if(playerNames.length>=4)
			create_snake_gen(50, 450 ,1,RandomArbitary(-1,0),0.5, snake4, 4,3);
		
		create_food(1);
		create_food(2);
		create_food(3);

		init_mat();

		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 5);
		setInterval(random1,300);
	    
	}

	function init_mat()
	{	
		for(var i=0;i<w;i++){
			matrice[i]=new Array();
			for(var j=0;j<h;j++){	
				matrice[i][j]=0;
			}
		}
		if(playerNames.length>=2)
		{
			matrice[snake1.coord.x][snake1.coord.y]=1;  
			matrice[snake2.coord.x][snake2.coord.y]=2;
		}
		if(playerNames.length>=3)
			matrice[snake3.coord.x][snake3.coord.y]=3;
		if(playerNames.length>=4)  
			matrice[snake4.coord.x][snake4.coord.y]=4;
	}

	function score(name)
	{
		if(name == snake1){
			if(snake2.vivant == true)playerNames[1].score ++;
			if(snake3.vivant == true)playerNames[2].score ++;
			if(snake4.vivant == true)playerNames[3].score ++;
		}
		if(name == snake2){
			if(snake1.vivant == true)playerNames[0].score ++;
			if(snake3.vivant == true)playerNames[2].score ++;
			if(snake4.vivant == true)playerNames[3].score ++;
		}
		if(name == snake3){
			if(snake2.vivant == true)playerNames[1].score ++;
			if(snake1.vivant == true)playerNames[0].score ++;
			if(snake4.vivant == true)playerNames[3].score ++;
		}
		if(name == snake4){
			if(snake2.vivant == true)playerNames[1].score ++;
			if(snake3.vivant == true)playerNames[2].score ++;
			if(snake1.vivant == true)playerNames[0].score ++;
		}
		affichage();
	}	

	function create_snake_gen(x1, y1, dirx, diry, vit, name, id, taille)
	{
		name.coord={x: x1, y: y1};
		name.vitesse=vit;
		name.dir={a: dirx, b: diry};
		name.nom=name;
		name.id=id;
		name.taille=taille;
		name.vivant=true;
	}

	function rotation(snake, angle) 
	{
		var tata = snake.dir.a*Math.cos(angle) - snake.dir.b*Math.sin(angle);	
		var titi = snake.dir.a*Math.sin(angle) + snake.dir.b*Math.cos(angle);
		
		snake.dir.a = tata;
		snake.dir.b = titi;

	}
	
	//enregistrement des bonus pr chaque snake(snake1 dans bonusS1, snake2 dans bonusS2,...)
	function new_bonus(name,effet)
	{
		var b ={ effect: effet,
				 timer : Date.now()
				}
		if(name == snake1) bonusS1.push(b);
		if(name == snake2) bonusS2.push(b);
		if(name == snake3) bonusS3.push(b);
		if(name == snake4) bonusS4.push(b);
	}


	// checke pour chaque snake si les bonus actifs sont dépassés et les annule.
	function check_time_bonus()
	{	
		if(bonusS1.length>0)
			if(bonusS1[0].timer <= Date.now()-5000)				
			{								
				if(bonusS1[0].effect == 'vitesseMoins') 
				{
					snake2.vitesse+=0.2;
					snake3.vitesse+=0.2;
					snake4.vitesse+=0.2;
				}
				if(bonusS1[0].effect == 'vitessePlus') snake1.vitesse -=0.2;
				if(bonusS1[0].effect == 'tailleMoins') snake1.taille=3;
				if(bonusS1[0].effect == 'taillePlus')
				{
					if(snake2.taille>=3)snake2.taille-=2;
					if(snake3.taille>=3)snake3.taille-=2;
					if(snake4.taille>=3)snake4.taille-=2;
				}
				if(bonusS1[0].effect == 'passe_muraille') passe_muraille=false;
				
				bonusS1.shift();
			}

		if(bonusS2.length>0)
			if(bonusS2[0].timer<= Date.now()-5000)
			{
				if(bonusS2[0].effect == 'passe_muraille') passe_muraille=false;
				if(bonusS2[0].effect == 'vitesseMoins')
				{
					snake1.vitesse+=0.2;
					snake3.vitesse+=0.2;
					snake4.vitesse+=0.2;
				}
				if(bonusS2[0].effect == 'vitessePlus') snake2.vitesse -=0.2;
				if(bonusS2[0].effect == 'tailleMoins' ) snake2.taille=3;
				if(bonusS2[0].effect == 'taillePlus') 
				{				
					if(snake1.taille>=3)snake1.taille-=2;
					if(snake3.taille>=3)snake3.taille-=2;
					if(snake4.taille>=3)snake4.taille-=2;
				}
				bonusS2.shift();
			}
		
		if(bonusS3.length>0)
			if(bonusS3[0].timer <= Date.now()-5000)
			{
				if(bonusS3[0].effect == 'passe_muraille') passe_muraille=false;
				if(bonusS3[0].effect == 'vitesseMoins')
				{
					snake2.vitesse+=0.2;
					snake1.vitesse+=0.2;
					snake4.vitesse+=0.2;
				}
				if(bonusS3[0].effect == 'vitessePlus') snake3.vitesse -=0.2;
				if(bonusS3[0].effect == 'tailleMoins' ) snake3.taille= 3;
				if(bonusS3[0].effect == 'taillePlus')
				{
					if(snake2.taille>=3)snake2.taille-=2;
					if(snake1.taille>=3)snake1.taille-=2;
					if(snake4.taille>=3)snake4.taille-=2;
				}
				bonusS3.shift();
			}
	
		if(bonusS4.length>0)
			if(bonusS4[0].timer <= Date.now()-5000)
			{
				if(bonusS4[0].effect == 'passe_muraille') passe_muraille=false;
				if(bonusS4[0].effect == 'vitesseMoins')
				{
					snake2.vitesse+=0.2;
					snake3.vitesse+=0.2;
					snake1.vitesse+=0.2;
				}
				if (bonusS4[0].effect == 'vitessePlus') snake4.vitesse -=0.2;
				if(bonusS4[0].effect == 'tailleMoins' ) snake4.taille=3;
				if(bonusS4[0].effect == 'taillePlus')
				{
					if(snake2.taille>=3)snake2.taille-=2;
					if(snake3.taille>=3)snake3.taille-=2;
					if(snake1.taille>=3)snake1.taille-=2;
				}
				bonusS4.shift();
			}
	}

	
	function create_food(num)
	{
		var img1 = new Image();
		img1.src = 'img/eclairb.png';
		var img2 = new Image();
		img2.src = 'img/burgerb.png';
		var img3 = new Image();
		img3.src = 'img/escargotb.png';
		var img4 = new Image();
		img4.src = 'img/pomme1b.png';
		var img5 = new Image();
		img5.src = 'img/fantome.png';
		if(num==1){
			var choix = parseInt(Math.random()*3+1);		
			food1 = {
				x: Math.round(Math.random()*(850)+50), 
				y: Math.round(Math.random()*(400)+50)
			};
			
			
			if(choix == 1){	
				img1.onload = function() {ctx.drawImage(img1, food1.x, food1.y);}
		    	ctx.beginPath();		
				food1.effet ="vitessePlus";
			}
			if(choix ==2){
				img2.onload = function() {ctx.drawImage(img2, food1.x, food1.y);}
		    	ctx.beginPath();
				food1.effet ="taillePlus";
			}
			
			if(choix ==3){
				img4.onload = function() {ctx.drawImage(img4, food1.x, food1.y);}
		    	ctx.beginPath();
				food1.effet ="tailleMoins";
			}
		
			
		}
		if(num==2){
			var choix = parseInt(Math.random()*4+1);		
			food2 = {
				x: Math.round(Math.random()*(850)+50), 
				y: Math.round(Math.random()*(400)+50)
			};
			
			if(choix == 1){	
			img1.onload = function() {ctx.drawImage(img1, food2.x, food2.y);}
	    	ctx.beginPath();		
			food2.effet ="vitessePlus";
			}
			if(choix ==2){
			img2.onload = function() {ctx.drawImage(img2, food2.x, food2.y);}
	    	ctx.beginPath();
			food2.effet ="taillePlus";
			}
			if(choix ==3){
			img3.onload = function() {ctx.drawImage(img3, food2.x, food2.y);}
	    	ctx.beginPath();
			food2.effet ="vitesseMoins";
			}
			if(choix ==4){
			img4.onload = function() {ctx.drawImage(img4, food2.x, food2.y);}
	    	ctx.beginPath();
			food2.effet ="tailleMoins";
			}
			
		}
		if(num==3){
			var choix = parseInt(Math.random()*5+1);		
			food3 = {
				x: Math.round(Math.random()*(850)+50), 
				y: Math.round(Math.random()*(400)+50)
			};
			
			if(choix == 1){	
			img1.onload = function() {ctx.drawImage(img1, food3.x, food3.y);}
	    	ctx.beginPath();		
			food3.effet ="vitessePlus";
			}
			if(choix ==2){
			img2.onload = function() {ctx.drawImage(img2, food3.x, food3.y);}
	    	ctx.beginPath();
			food3.effet ="taillePlus";
			}
			if(choix ==3){
			img3.onload = function() {ctx.drawImage(img3, food3.x, food3.y);}
	    	ctx.beginPath();
			food3.effet ="vitesseMoins";
			}
			if(choix ==4){
			img4.onload = function() {ctx.drawImage(img4, food3.x, food3.y);}
	    	ctx.beginPath();
			food3.effet ="tailleMoins";
			}
			if(choix ==5){
			img5.onload = function() {ctx.drawImage(img5, food3.x, food3.y);}
	    	ctx.beginPath();
			food3.effet ="passe_muraille";
			}
		}
			// crée aléatoirement une bomb sur le terrain de jeu
			if(presence_bomb==false)
			{
				var choixbomb = parseInt(Math.random()*20+1);			
				if(choixbomb==5)
				{	
					foodBomb = {
						x: Math.round(Math.random()*(850)+50), 
						y: Math.round(Math.random()*(400)+50)
					};
					var img= new Image();
					img.src='img/bomb.png';
					img.onload = function() {ctx.drawImage(img, foodBomb.x, foodBomb.y);}
			    	ctx.beginPath();		
					foodBomb.effet ="bomb";
					presence_bomb=true;		
				}
			}
		}
	

	// dessine la tête pendant les trous
	function paint_tete(name)
	{
		var col;
		switch (name.id) {
			case 1 : col = "chartreuse";
			break;
			case 2 : col = "deepPink";
			break;
			case 3 : col = "LightSkyBlue";
			break;
			case 4 : col = "Orange";
			break;
		}
		ctx.beginPath();
		ctx.fillStyle = col;
  		ctx.arc(name.coord.x +(name.dir.a)*3, name.coord.y +(name.dir.b)*3, name.taille-0.5, 0, Math.PI*2);
  		ctx.fill();
  		ctx.beginPath();
		ctx.fillStyle = "black";
  		ctx.arc(name.coord.x +(name.dir.a), name.coord.y +(name.dir.b), name.taille, 0, Math.PI*2);
  		ctx.fill();
  	
	}

	

	function supp_food(food) // efface la zone d'image du bonus et redessine les tracés des snakes
	{
		ctx.beginPath();
		ctx.fillStyle = "black";
  		ctx.clearRect(food.x, food.y, 50, 50);
  		ctx.rect(food.x, food.y, 50, 50);
  		ctx.fill();
  		
  		for (var i =food.x;i<=food.x+50;i++){
  			for(var j=food.y; j<=food.y+50;j++){
  				if(matrice[i][j]==1)
  				{
	  				ctx.beginPath();
					ctx.fillStyle = "chartreuse";
	  				ctx.arc(i, j, 3, 0, Math.PI*2);
	  				ctx.fill();
				}
				if(matrice[i][j]==2)
  				{
	  				ctx.beginPath();
					ctx.fillStyle = "deepPink ";
	  				ctx.arc(i, j, 3, 0, Math.PI*2);
	  				ctx.fill();
				}
				if(matrice[i][j]==3)
  				{
	  				ctx.beginPath();
					ctx.fillStyle = "LightSkyBlue ";
	  				ctx.arc(i, j, 3, 0, Math.PI*2);
	  				ctx.fill();
				}
				if(matrice[i][j]==4)
  				{
	  				ctx.beginPath();
					ctx.fillStyle = "Orange";
	  				ctx.arc(i, j, 3, 0, Math.PI*2);
	  				ctx.fill();
				}
  			}
  		}
  	
  	if(food==food1) // recrée dans la foulée un nouveau bonus
  		create_food(1);
  	if(food==food2)
  		create_food(2);
  	if(food==food3)
  		create_food(3);
	}

	function avancer (name) 
	{	
			x1 = new Number (name.coord.x+(name.dir.a * name.vitesse)); 	//arrondi au 0.1 pres (fonctionne pas trop bien)
			y1 = new Number (name.coord.y+(name.dir.b * name.vitesse));
			name.coord.x = parseFloat(x1.toFixed(2));
			name.coord.y = parseFloat(y1.toFixed(2));
			//console.log(name+".x="+name.coord.x+" y="+name.coord.y);		//affichage des coordonnees
	}
	
	
	function random1(){
		time = parseInt(Math.random()*12);
	}

	
	function paint()
	{

		if(passe_muraille==true)
		{
			ctx.lineWidth= 4;
			ctx.strokeStyle = "yellow";
			ctx.strokeRect(0,0,w,h);
			ctx.beginPath();
		}
		if(passe_muraille==false){
			ctx.lineWidth= 4;
			ctx.strokeStyle = "red";
			ctx.strokeRect(0,0,w,h);
			ctx.beginPath();
		}

		if(snake1.vivant==true)
			avancer(snake1);
		if(snake2.vivant==true)
			avancer(snake2);
		if(snake3.vivant==true)
			avancer(snake3);
		if(snake4.vivant==true)
			avancer(snake4);

		if(time != 1 && snake1.vivant==true)
			paint_cell("chartreuse",snake1);
	
		if(time==1 && snake1.vivant==true)
			paint_tete(snake1);	
		
		if(time != 2 && snake2.vivant==true)
		   paint_cell( "deepPink ",snake2);
		
		if(time==2 && snake2.vivant==true)
	 		paint_tete(snake2);
	 	
	 	if(time != 3 && snake3.vivant==true)		
			paint_cell("LightSkyBlue ",snake3);
		
		if(time == 3 && snake3.vivant==true)
		paint_tete(snake3);

		if(time != 4 && snake4.vivant==true)		
			paint_cell("orange",snake4);
		
		if(time == 4 && snake4.vivant==true)
		paint_tete(snake4);

	 	if(snake1.vivant==true)
			check_coord_sortie(snake1);
		if(snake2.vivant==true)
			check_coord_sortie(snake2);
		if(snake3.vivant==true)
			check_coord_sortie(snake3);			
		if(snake4.vivant==true)
			check_coord_sortie(snake4);	

		if(snake1.vivant==true)
			check_collision1(snake1);
		if(snake2.vivant==true)
			check_collision2(snake2);
		if(snake3.vivant==true)
			check_collision3(snake3);
		if(snake4.vivant==true)
			check_collision4(snake4);
		
		
		if(snake1.vivant==true){
			check_collision_bonus(food1, snake1);				
			check_collision_bonus(food2, snake1);
			check_collision_bonus(food3, snake1);
			if(presence_bomb ==true) check_collision_bomb(snake1);		
		}
		if(snake2.vivant==true){
			check_collision_bonus(food2, snake2);
			check_collision_bonus(food1, snake2);	
			check_collision_bonus(food3, snake2);
			if(presence_bomb ==true)check_collision_bomb(snake2);		
		}
		if(snake3.vivant==true){
			check_collision_bonus(food1, snake3);		
			check_collision_bonus(food2, snake3);
			check_collision_bonus(food3, snake3);
			if(presence_bomb ==true)check_collision_bomb(snake3);
		}
		if(snake4.vivant==true){
			check_collision_bonus(food1, snake4);				
			check_collision_bonus(food2, snake4);
			check_collision_bonus(food3, snake4);
			if(presence_bomb ==true)check_collision_bomb(snake4);	
		}
		
		

		if(touches.indexOf(71) >= 0) { // tourner a gauche avec snake3 'G'
			rotation(snake3, -0.020);
		}	
		if(touches.indexOf(72) >= 0) { // tourner a droite avec snake3 'H'
			rotation(snake3, 0.020);
		}
		if(touches.indexOf(37) >= 0) { // tourner a gauche avec snake1 <-
			rotation(snake1, -0.020);
		}	
		if(touches.indexOf(39) >= 0) { // tourner a droite avec snake1 ->
			rotation(snake1, 0.020);
		}

		if(touches.indexOf(81) >= 0) { // tourner a gauche avec snake2 q
			rotation(snake2, -0.020);
		}	
		if(touches.indexOf(83) >= 0) { // tourner a droite avec snake2 s
			rotation(snake2, 0.020);
		}
		if(touches.indexOf(76) >= 0) { // tourner a gauche avec snake4 'L'
			rotation(snake4, -0.020);
		}	
		if(touches.indexOf(77) >= 0) { // tourner a droite avec snake4 'M'
			rotation(snake4, 0.020);
		}
		
		if(time != 1 && snake1.vivant==true){ saveMatok(snake1);}
		if(time != 2 && snake2.vivant==true){ saveMatok(snake2);}
		if(time != 3 && snake3.vivant==true){ saveMatok(snake3);}
		if(time != 4 && snake4.vivant==true){ saveMatok(snake4);}

		check_time_bonus();
		check_fin();
	}
	
	function check_fin(){
		if(joueurs_vivants==1)
		{
			if(snake1.vivant==true){ 
				snake1.vivant=false;
			}
			if(snake2.vivant==true){
				snake2.vivant=false;
			}
			if(snake3.vivant==true){
				snake3.vivant=false;
			}
			if(snake4.vivant==true){
				snake4.vivant=false;
			}
			fin_partie();
			clearTimeout(game_loop);
		}
		
	}

	function paint_cell(color,name)
	{
		ctx.beginPath();
		ctx.fillStyle = color;
  		ctx.arc(name.coord.x, name.coord.y, name.taille, 0, Math.PI*2);
  		ctx.fill();
	}
	function toInt(x)
	{
			var x1 = new Number (x); 
			x1 = parseInt(x1);
			return x1;
	}

	function check_coord_sortie(name) 
	{
		if(passe_muraille==false){
			if(name.coord.x > w- name.taille || name.coord.x < name.taille || name.coord.y > h- name.taille || name.coord.y <  name.taille) {
				crash(toInt(name.coord.x),toInt(name.coord.y));
				name.vivant=false;
				joueurs_vivants--;
				// document.getElementById("son2").cloneNode(true).play();
				 document.getElementById("son2").cloneNode(true).play()
				 score(name);
			}
		}
		if(passe_muraille==true){
			if(name.coord.x >= w)  name.coord.x =1;
			if(name.coord.x <=0 )  name.coord.x = w-1;
			if(name.coord.y >= h)  name.coord.y =1;
			if(name.coord.y <= 0)  name.coord.y =h-1;

		}
	}

	function crash(x,y)
	{
		var img = new Image();
	    img.src = 'img/crash1.png';
		img.onload = function() {ctx.drawImage(img,x-25, y-25);}
	    ctx.beginPath();							
	}


	
	function check_collision1(name)
	{
			// collision  entre snake 1 et snake 2
		for(var i=-snake2.taille; i<=snake2.taille; i++){			
			if (matrice[toInt(name.coord.x) +i][toInt(name.coord.y) +i ] == 2 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y)-i ] == 2 ||
				matrice[toInt(name.coord.x) +i][toInt(name.coord.y)  ] == 2 || matrice[toInt(name.coord.x)][toInt(name.coord.y)-i ] == 2){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake1.vivant=false;
				joueurs_vivants--;	
				score(name);
				 document.getElementById("son2").cloneNode(true).play();		
			}
		}
			// collision  entre snake 1 et snake 3
		for(var i=-snake3.taille; i<=snake3.taille; i++){
			if (matrice[toInt(name.coord.x) +i][toInt(name.coord.y) +i ] == 3 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y)-i ] == 3 ||
				matrice[toInt(name.coord.x) +i][toInt(name.coord.y)  ] == 3 || matrice[toInt(name.coord.x)][toInt(name.coord.y)-i ] == 3){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake1.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();				
			}
		}
			// collision  entre snake 1 et snake 4
		for(var i=-snake4.taille; i<=snake4.taille; i++){
			if (matrice[toInt(name.coord.x) +i][toInt(name.coord.y) +i ] == 4 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y)-i ] == 4 ||
				matrice[toInt(name.coord.x) +i][toInt(name.coord.y)  ] == 4 || matrice[toInt(name.coord.x)][toInt(name.coord.y)-i ] == 4){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake1.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}
			//collision avec lui même
		if(matrice[toInt(name.coord.x +(name.dir.a )*2) ][toInt(name.coord.y+(name.dir.b )*2) ] == 1){
			crash(toInt(name.coord.x),toInt(name.coord.y));
			snake1.vivant=false;
			joueurs_vivants--;
			score(name);
			 document.getElementById("son2").cloneNode(true).play();
		}
	}

	function check_collision2(name)
	{
		
			// collision  entre snake 2 et snake 1
		for(var i=-snake1.taille; i<=snake1.taille; i++){			
			if (matrice[toInt(name.coord.x)+i][toInt(name.coord.y) +i ] == 1 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y) -i ]== 1 ||
				matrice[toInt(name.coord.x)+i][toInt(name.coord.y)  ] == 1 || matrice[toInt(name.coord.x)][toInt(name.coord.y) -i ] == 1){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake2.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}
			// collision  entre snake 2 et snake 3
		for(var i=-snake3.taille; i<=snake3.taille; i++){
			if (matrice[toInt(name.coord.x)+i][toInt(name.coord.y) +i ] == 3 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y) -i ]== 3 ||
				matrice[toInt(name.coord.x)+i][toInt(name.coord.y)  ] == 3 || matrice[toInt(name.coord.x)][toInt(name.coord.y) -i ] == 3){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake2.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}
			// collision  entre snake 2 et snake 4
		for(var i=-snake4.taille; i<=snake4.taille; i++){
			if (matrice[toInt(name.coord.x) +i][toInt(name.coord.y) +i ] == 4 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y)-i ] == 4 ||
				matrice[toInt(name.coord.x) +i][toInt(name.coord.y)  ] == 4 || matrice[toInt(name.coord.x)][toInt(name.coord.y)-i ] == 4){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake2.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}

		//collision avec lui même
		if(matrice[toInt(name.coord.x +(name.dir.a)*2) ][toInt(name.coord.y+(name.dir.b)*2) ] == 2){		
			crash(toInt(name.coord.x),toInt(name.coord.y));
			snake2.vivant=false;
			joueurs_vivants--;
			score(name);
			 document.getElementById("son2").cloneNode(true).play();			
		}
	}

	function check_collision3(name)
	{
			// collision  entre snake 3 et snake 1
		for(var i=-snake1.taille; i<=snake1.taille; i++){			
			if (matrice[toInt(name.coord.x)+i][toInt(name.coord.y) +i ] == 1 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y) -i ]== 1 ||
				matrice[toInt(name.coord.x)+i][toInt(name.coord.y)  ] == 1 || matrice[toInt(name.coord.x)][toInt(name.coord.y) -i ] == 1){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake3.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();				
			}
		}
			// collision  entre snake 3 et snake 2
		for(var i=-snake2.taille; i<=snake2.taille; i++){
			if (matrice[toInt(name.coord.x)+i][toInt(name.coord.y) +i ] == 2 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y) -i ]== 2 ||
				matrice[toInt(name.coord.x)+i][toInt(name.coord.y)  ] == 2 || matrice[toInt(name.coord.x)][toInt(name.coord.y) -i ] == 2){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake3.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}
			// collision  entre snake 3 et snake 4
		for(var i=-snake4.taille; i<=snake4.taille; i++){
			if (matrice[toInt(name.coord.x) +i][toInt(name.coord.y) +i ] == 4 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y)-i ] == 4 ||
				matrice[toInt(name.coord.x) +i][toInt(name.coord.y)  ] == 4 || matrice[toInt(name.coord.x)][toInt(name.coord.y)-i ] == 4){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake3.vivant=false;	
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}

		//collision avec lui même
		if(matrice[toInt(name.coord.x +(name.dir.a)*2) ][toInt(name.coord.y+(name.dir.b)*2) ] == 3){		
			crash(toInt(name.coord.x),toInt(name.coord.y));
			snake3.vivant=false;
			joueurs_vivants--;
			score(name);
			 document.getElementById("son2").cloneNode(true).play();
		}
	}

	function check_collision4(name)
	{
		
			// collision  entre snake 4 et snake 1
		for(var i=-snake1.taille; i<=snake1.taille; i++){			
			if (matrice[toInt(name.coord.x)+i][toInt(name.coord.y) +i ] == 1 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y) -i ]== 1 ||
				matrice[toInt(name.coord.x)+i][toInt(name.coord.y)  ] == 1 || matrice[toInt(name.coord.x)][toInt(name.coord.y) -i ] == 1){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake4.vivant=false;
				joueurs_vivants--;
				score(name);
				 document.getElementById("son2").cloneNode(true).play();
				
			}
		}
			// collision  entre snake 4 et snake 2
		for(var i=-snake2.taille; i<=snake2.taille; i++){
			if (matrice[toInt(name.coord.x)+i][toInt(name.coord.y) +i ] == 2 || matrice[toInt(name.coord.x) +i][toInt(name.coord.y) -i ]== 2 ||
				matrice[toInt(name.coord.x)+i][toInt(name.coord.y)  ] == 2 || matrice[toInt(name.coord.x)][toInt(name.coord.y) -i ] == 2){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake4.vivant=false;
				joueurs_vivants--;score(name);
				 document.getElementById("son2").cloneNode(true).play();
			}
		}
			// collision  entre snake 4 et snake 3
		for(var i=-snake4.taille; i<=snake4.taille; i++){
			if (matrice[toInt(name.coord.x) +i][toInt(name.coord.y) +i ] == 3|| matrice[toInt(name.coord.x) +i][toInt(name.coord.y)-i ] == 3 ||
				matrice[toInt(name.coord.x) +i][toInt(name.coord.y)  ] == 3 || matrice[toInt(name.coord.x)][toInt(name.coord.y)-i ] == 3){
				crash(toInt(name.coord.x),toInt(name.coord.y));
				snake4.vivant=false;
				joueurs_vivants--;	
				score(name);
				 document.getElementById("son2").cloneNode(true).play();					
			}
		}

		//collision avec lui même
		if(matrice[toInt(name.coord.x +(name.dir.a)*2) ][toInt(name.coord.y+(name.dir.b)*2) ] == 4){		
			crash(toInt(name.coord.x),toInt(name.coord.y));
			snake4.vivant=false;
			joueurs_vivants--;
			score(name);
			 document.getElementById("son2").cloneNode(true).play();
		}
	}

	function check_collision_bonus(bonus, name)
	{
		for(var i=0; i<=40; i++){
			if ((parseInt(name.coord.x) == bonus.x + i && parseInt(name.coord.y) == bonus.y + i)  ||
				(parseInt(name.coord.x) == bonus.x + i && parseInt(name.coord.y) == bonus.y )  || 
				(parseInt(name.coord.x) == bonus.x  && parseInt(name.coord.y) == bonus.y + i)){
				// joue le crop
				
				if(bonus.effet == "vitessePlus")
					 name.vitesse=name.vitesse+0.2; // augmente sa propre vitesse
				 
				if(bonus.effet == "taillePlus") // augmente la taille de l'adversaire
				{
					if(name==snake1){snake2.taille+=2;snake3.taille+=2;snake4.taille+=2;}

					if(name==snake2){snake1.taille+=2;snake3.taille+=2;snake4.taille+=2;}

					if(name==snake3){snake1.taille+=2;snake2.taille+=2;snake4.taille+=2;}

					if(name==snake4){snake1.taille+=2;snake3.taille+=2;snake2.taille+=2;}

				}
				
				if(bonus.effet == "vitesseMoins") // diminue la vitesse de l'adversaire
				{
					if(name==snake1){
						if(snake2.vitesse>=0.5)
						snake2.vitesse -= 0.2;
						if(snake3.vitesse>=0.5)
						snake3.vitesse -= 0.2;
						if(snake4.vitesse>=0.5)
						snake4.vitesse -= 0.2;
					}
					if(name==snake2){
						if(snake1.vitesse>=0.5)
						snake1.vitesse -= 0.2;
						if(snake3.vitesse>=0.5)
						snake3.vitesse -= 0.2;
						if(snake4.vitesse>=0.5)
						snake4.vitesse -= 0.2;
					}	
					if(name==snake3){
						if(snake1.vitesse>=0.5)
						snake1.vitesse -= 0.2;
						if(snake2.vitesse>=0.5)
						snake2.vitesse -= 0.2;
						if(snake4.vitesse>=0.5)
						snake4.vitesse -= 0.2;
					}
					if(name==snake4){
						if(snake1.vitesse>=0.5)
						snake1.vitesse -= 0.2;
						if(snake3.vitesse>=0.5)
						snake3.vitesse -= 0.2;
						if(snake2.vitesse>=0.5)
						snake2.vitesse -= 0.2;
					}
				}

				if(bonus.effet == "tailleMoins") // diminue sa propre taille
					if(name.taille>=3) name.taille-=2;

				if(bonus.effet == "passe_muraille") passe_muraille = true;

				 document.getElementById("son").cloneNode(true).play();
				new_bonus(name,bonus.effet);
				supp_food(bonus);
			}
		}
	}


	function check_collision_bomb(name)
	{
		//console.log(foodBomb.x);
		//console.log(foodBomb.y);
		for(var i=0; i<=50; i++){
			if ((parseInt(name.coord.x) == foodBomb.x + i && parseInt(name.coord.y) == foodBomb.y + i)  ||
				(parseInt(name.coord.x) == foodBomb.x + i && parseInt(name.coord.y) == foodBomb.y )  || 
				(parseInt(name.coord.x) == foodBomb.x  && parseInt(name.coord.y) == foodBomb.y + i))
			{
				 document.getElementById("son1").cloneNode(true).play();
				bomb();
				
			}
			
		}
	}

	function bomb()
	{
		presence_bomb=false;
		ctx.beginPath();
		ctx.fillStyle = "black";
  		ctx.rect(0, 0, w, h);
  		ctx.fill();
  		// calcul des coordonnées du cercle effacé pr vider la matrice à celle-ci	   
	   	create_food(1);
	  	create_food(2);
	   	create_food(3);
	   	init_mat();

	}

	function saveMatok (name)
	{
		 matrice[toInt(name.coord.x)][toInt(name.coord.y)] = name.id;			
		//console.log(matrice[toInt(name.coord.x)][toInt(name.coord.y)]+" save aux coordonnees : "+toInt(name.coord.x)+";"+toInt(name.coord.y) );	
	}

	document.onkeydown = function(e) {
	  var code = e.keyCode;
	  
	  if(touches.indexOf(code) < 0) {
	    touches.push(code);
	  }  
	}

	document.onkeyup = function(e) {
	  var code = e.keyCode;
	  index = touches.indexOf(code);
	 
	  if(index>=0) {
	    touches.splice(index,1);
	  }
	  
	}
	

}
