var pass = true;
$('#userInput').val('');
findKeyBoardHeights();
var level = 0;
var errorCount = 0;
var randStr;
var levels = ['ffjj ', 'dddk kkfj ', 'ssss llll dfjk ', 'ffjj ddkk ssll ', 'uuuu uuuu rrrr rrrr ffjj dksl ', 'eeee iiii eeii rruu kkdd slei ', 'sdfe rjki lulu sdfe rjki ', 'aaaa aa;; ;;;;sldk fjei a;ie ', 'wwww oooo wwoo llls ssee iikj dfur a;wo ', 'aaaa ;;;; wwww oooo fjdk slur eiwo ','hhhh hhgg gggg uutt iirr owks a;hg ', 'tttt ttpp pppp ;;;a aaoo rrfj kdsl a;pt ', 'wert uiop asdf ghjk l; ', 'qqqq qqyy yyyy aaah hhgj uuww sert iopk l;qy ', 'qqyy wwtt oopp erui asdf ghjk l;', 'mmmm mmvv ggkk gkuu ttrr desa qwui opl; ', 'nnnn nncc cccc mmmv vvvj fdsa kl;u rytp ', 'mmmm nnnn vvvv cccc jjff kkdd llss a;ur ', 'xxxx xxx, ,,,, ,,mm cckk kddd l;as wert yuio p', 'zzzz zzz. .... ..ll ss;; aasl ddkk ppee ', 'qwer tyui opas dfgh jkl; xcvn m,.z ', 'qazs xpl.k ,zq. ']

function closeModal() {
	$('.modal-trasparency').css('display', 'none');
	$('#userInput').focus();
}

function openMenu() {
	$('.modal-trasparency').css('display', 'block');	
}

//Set the height on the keyboard keys initially and as the window resizes. The height should be the same as the with of a key with class="letter" which is dynamic cuz its a percentage. The Height of the keyboard should be calculated based on the available room on the screen.
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

	tall = $('.letter').css('width');
	tallBoard = ((parseInt(tall) + 15 + parseInt(margin)) * 6) + 'px';
	$('.key-board').css('height', tallBoard);
	$('.results').css('height', tallBoard);
}

$(window).resize(function(){
    findKeyBoardHeights();
});

//set the height of the textarea to match the height of the practiceMaterial

//If needs be, the results can be appear in a modal window or next to the keyboard.

//do te clear fix for the li items in the modal nav as well as for the keyboard keys

//Find out how to figure out which key is pressed on ondownclick(). Use thta to make the appropriate key light up on the keyboard as its pressed

//Also on the ondownclick() event, find out the property name of the string inside a text area so it can be compared, after every keystroke, to the string in the practiceMaterials class and the appropriate key index can be either grayed out if correct or become bright if incorrect.

//Create a timer that starts when the first item is clicked in the textarea and ends when the 100th character is pressed.

//For small screens, reduce the number of characters in the practiceMaterial string so that there isn't excessive word wrapping shrinking the screen

//decide how you want to handle errors, should the user fix them, or should he just keep going

//Add a color-coded finger guide. Unless you figure out how to have transparent hands over the board pressing the keys. That would be the coolest.

doLevel(0);

function userAdvance() {
	$('#userInput').val('');
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
	var nextLevel = levels[lev];
	randStr = randomStr(nextLevel);
	// Creat a string of HTML that contains a single character from randStr wrapped in <span id="charX"> where coinsides with the character number in randStr
	var htmlStr = '';
	for(var i = 0; i < randStr.length; i++) {
		var tempId = 'char' + i;
		htmlStr += '<span class="char ' + tempId + '">';
		htmlStr += randStr[i];;
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
	for(var i = 1; i < 100; i++) {
		var char = Math.ceil(Math.random() * len) - 1;
		if (newStr[i - 1] === ' ') {
			if (str[char] === ' ') {
				i--;
			} 
		}else {
			newStr += str[char];
		}
	}
	return newStr;
}

function textChange() {
	var inputStr = $('#userInput').val();
	for(var i = 0; i < inputStr.length; i++) {
		var tempId = '.char' + i;
		if(inputStr[i] != randStr[i] ) {		
			errorCount++;			
			$(tempId).css('color', 'red');
			if(randStr[i] === ' ') {
				$(tempId).css('background-color', 'red');
			}
		} else if(randStr[i] === ' ') {
				console.log('blank');
				$(tempId).css('color', 'gray').css('background-color', 'gray');
		} else {
			$(tempId).css('color', 'gray');
		}
	}	

	if(inputStr.length === 100) {
		$('#userInput').blur();
		// $('#advance').focus();
		var accStr = (100 - errorCount) + '%'; 
		$('.accuracy').text(accStr);
		errorCount = 0;
		$('.key-board').css('width', 'calc(70% - 1px)');
		$('.results').css('visibility', 'visible');
		$('.results').css('width', 'calc(22% - 1px)');
		$('#advance').css('color','blue').hide();
		$('#advance').delay( 2000 ).fadeIn( 1000 );
	}
}