var pass = true;
$('#userInput').val('');
findKeyBoardHeights();
var level = 0;
var errorCount = 0;
var randStr;
var randStrIndex = 0;
var levels = ['ffjj ', 'dddk kkfj ', 'ssss llll dfjk ', 'ffjj ddkk ssll ', 'uuuu uuuu rrrr rrrr ffjj dksl ', 'eeee iiii eeii rruu kkdd slei ', 'sdfe rjki lulu sdfe rjki ', 'aaaa aa;; ;;;;sldk fjei a;ie ', 'wwww oooo wwoo llls ssee iikj dfur a;wo ', 'aaaa ;;;; wwww oooo fjdk slur eiwo ','hhhh hhgg gggg uutt iirr owks a;hg ', 'tttt ttpp pppp ;;;a aaoo rrfj kdsl a;pt ', 'wert uiop asdf ghjk l; ', 'qqqq qqyy yyyy aaah hhgj uuww sert iopk l;qy ', 'qqyy wwtt oopp erui asdf ghjk l;', 'mmmm mmvv ggkk gkuu ttrr desa qwui opl; ', 'nnnn nncc cccc mmmv vvvj fdsa kl;u rytp ', 'mmmm nnnn vvvv cccc jjff kkdd llss a;ur ', 'xxxx xxx, ,,,, ,,mm cckk kddd l;as wert yuio p', 'zzzz zzz. .... ..ll ss;; aasl ddkk ppee ', 'qwer tyui opas dfgh jkl; xcvn m,.z ', 'qazs xpl.k ,zq. ']
doLevel(0);

function closeModal() {
	$('.modal-trasparency').css('display', 'none');
	$('#userInput').focus();
}

function openMenu() {
	$('#userInput').val('');
	randStrIndex = 0;
	$('.modal-trasparency').css('display', 'block');	
}

//Set the height on the keyboard keys initially and as the window resizes. The height should be the same as the with of a key with class="letter" which is dynamic cuz its a percentage. The Height of the keyboard should be culated based on the available room on the screen.
function findKeyBoardHeights() {
	var tall = $('.letter').css('width');
	$('.key').css('height', tall);
	$('.key').css('line-height', tall);
	$('.letter').css('height', tall);	
	$('.letter').css('line-height', tall);
	tall = (parseInt(tall) * 2 / 3) + 'px';
	$('.double').css('line-height', tall);
	var margin = $('.key-board').css('margin-left');
	$('.key-board').css('margin', margin);
	$('.results').css('margin-top', margin);
	tall = $('.letter').css('width');
	tallBoard = ((parseInt(tall) + 19 + parseInt(margin)) * 6) + 'px';
	$('.key-board').css('height', tallBoard);
	$('.results').css('height', tallBoard);
}

$(window).resize(function(){
    findKeyBoardHeights();
});

function userAdvance() {
	$('#userInput').val('');
	randStrIndex = 0;
	if (pass && level < levels.length) {
		level += 1;
		doLevel(level);
	} else if(!pass) {
		doLevel(level);
	} else {
		var nextLevel = $('#stringHolder').text('You Have Completed All Levels');	
	}
}

function doLevel(lev) {
	// Creat a string of HTML that contains a single character from randStr wrapped in <span id="charX"> where coinsides with the character number in randStr
	var nextLevel = levels[lev];
	randStr = randomStr(nextLevel);	
	var htmlStr = '';
	for(var i = 0; i < randStr.length; i++) {
		var tempId = 'char' + i;
		htmlStr += '<span class="char ' + tempId + '">';
		htmlStr += randStr[i];
		htmlStr += '</span>';
	}
	$('#stringHolder').html(htmlStr);	
	if(lev !== 0) {	
		closeModal();
	}
	level = lev;
}

function randomStr(str) {
	var len = str.length;
	var newStr = str[0];
	for(var i = 1; i < 99; i++) {
		var chr = Math.ceil(Math.random() * len) - 1;
		if (newStr[i - 1] === ' ' &&  str[chr] === ' ') {
				i--;			
		}else {
			newStr += str[chr];
		}
	}
	newStr[99] = str[7];
	return newStr;
}

function keyPress(k) {
	//var startTime = 0;
	var endTime = 0;
	var hr, min, sec;
	var chr = k.key;
	var tempId = '.char' + randStrIndex;
	var d = new Date();
	// var keyColor = setColor(randStr[randStrIndex + 1]);
	var keyColor = 'green';
	if(randStrIndex > 0) {
		hiliteKey(chr, chr, 'black', 3);	
	}
	hiliteKey(randStr[randStrIndex], chr, 'red', 1);
	if(randStrIndex < 98) {
		hiliteKey(randStr[randStrIndex + 1], chr, keyColor, 2);
	}

	if(chr !== randStr[randStrIndex]) {		
		errorCount++;			
		$(tempId).css('color', 'red');
		if(randStr[randStrIndex] === ' ') {
			$(tempId).css('background-color', 'red');
		}
	} else if(randStr[randStrIndex] === ' ') {
		$(tempId).css('color', 'gray').css('background-color', 'gray');
	} else {
		$(tempId).css('color', 'gray');
	}

	if(randStrIndex === 0) {
		hr = d.getHours();
		min = d.getMinutes();
		sec = d.getSeconds();
		startTime = (hr * 3600) + (min * 60) + sec;
		startTime = parseInt(startTime);
	}

	if(randStrIndex === 98) {
		hr = d.getHours();
		min = d.getMinutes();
		sec = d.getSeconds();		
		endTime = (hr * 3600) + (min * 60) + sec;
		var timeTotal = (endTime - startTime) + ' seconds';
		var wpm = Math.round(17/((endTime - startTime)/60));
		$('.wpm').text(wpm);
		$('.time').text(timeTotal);
		$('#userInput').blur();
		var accStr = (100 - errorCount) + '%'; 
		$('.accuracy').text(accStr);
		errorCount = 0;
		$('.key-board').css('width', 'calc(70% - 1px)');
		$('.results').css('visibility', 'visible').css('width', 'calc(22% - 1px)').css('margin-right', '10px');
		$('#advance').css('color','blue').hide().delay(200 ).fadeIn( 1000 );
		randStrIndex = -1;
	}		
	randStrIndex++;
}

function focusTextArea () {
	$('textarea').focus();
}

function hiliteKey(ky, userKy, col, myCase) {
	//The case arg colors a key when it erases a red, sets a red, or erases a green (erase means make black)

	userKy = keyToClass(userKy);
	ky = keyToClass(ky);

	if(myCase === 3) {
		ky = 'key, .letter';
	}

	if(myCase === 1 && userKy === ky){
		col = 'rgb(0, 0, 0)';
	}	

	if(myCase === 1) {
		ky = userKy;
	}

	$('.' + ky).css('background-color', col);
}

function keyToClass(ky) {
	ky = ky.toLowerCase();
	switch (ky.charCodeAt(0)) {
    case 96:
    	ky = 'grave';
    	break;
    case 48:
        ky = 'zero';
        break;
    case 49:
        ky = 'one';
        break;
    case 50:
        ky = 'two';
        break;
    case 51:
        ky = 'three';
        break;
    case 52:
        ky = 'four';
        break;
    case 53:
        ky = 'five';
        break;
    case 54:
        ky = 'six';
        break;
    case 55:
    	ky = 'seven';
        break;
    case 6:
    	ky = 'eight';
        break;
    case 57:
    	ky = 'nine';
        break;
    case 45:
    	ky = 'dash';
        break;
    case 61:
    	ky = 'equals';
        break;
    case 92:
    	ky = 'back-slash';
        break;
    case 9://tab
    	ky = 'tab';
        break;
    case 91:
    	ky = 'left-bracket';
        break;
    case 93:
    	ky = 'right-bracket';
        break;
    case 59:
    	ky = 'semi-colon';
        break;
    case 39:
    	ky = 'apostraphe';
        break;
    case 44:
    	ky = 'comma';
        break;
    case 46:
    	ky = 'period';
        break;
    case 47:
    	ky = 'forward-slash';
        break;
    case 32:
    	ky = 'space-bar';    	
        break;
    //doesnt inlclude backspace, enter, caps lock, shift keys or any shift+ keys......yet
	}	
    return ky;
}

function setColor(ky) {
	var col = 'yellow';
	switch(ky){
	    case 'r':
	    case 'd':
	    case 't':
	    case 'c': 
	    	col = 'orange';
	    	break;
	    case 'w':
	    case 'e':
	    case 's':
	    case 'x': 
	    	col = 'brown';
	    	break;
	    case 'q':
	    case 'a':
	    case 'z': 
	    	col = 'purple';
	    	break;
	    case ' ':
	    	col = 'gray';
	    	break;
	    case 'y':
	    case 'u':
	    case 'h':
	    case 'j':
	    case 'n':
	    case 'm': 
	    	col = 'aqua';
	    	break;
	    case 'k':
	    case 'i':
	    case ',': 
	    	col = 'green';
	    	break;
	    case 'o':
	    case 'l':
	    case '.': 
	    	col = 'lime';
	    	break;
	    case 'p':
	    case ';':
	    case "'":
	    case '/': 
	    	col = 'turquoise';
	    	break;
	}
	return col;
}



