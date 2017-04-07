var deck = [];
var Card = function(suit, face, value) {
	this.suit = suit;
	this.face = face;
	this.value = value;
}
for (var k = 0; k < 36; k++) {
	deck[k] = new Card("", "", 0);
}
function fillDeck() {
	for (var n = 0; n < 36; n++) {
		if (n % 4 === 0) {
			deck[n].suit = "heart";
		}
		else if (n % 4 === 1) {
			deck[n].suit = "diamond";
		}
		else if (n % 4 === 2) {
			deck[n].suit = "club";
		}
		else {
			deck[n].suit = "spade";
		}
		if (n % 9 === 0) {
			deck[n].face = "ACE";
			deck[n].value = 14;
		}
		else if (n % 9 === 1) {
			deck[n].face = "KING";
			deck[n].value = 13;
		}
		else if (n % 9 === 2) {
			deck[n].face = "QUEEN";
			deck[n].value = 12;
		}
		else if (n % 9 === 3) {
			deck[n].face = "JACK";
			deck[n].value = 11;
		}
		else if (n % 9 === 4) {
			deck[n].face = "10";
			deck[n].value = 10;
		}
		else if (n % 9 === 5) {
			deck[n].face = "9";
			deck[n].value = 9;
		}
		else if (n % 9 === 6) {
			deck[n].face = "8";
			deck[n].value = 8;
		}
		else if (n % 9 === 7) {
			deck[n].face = "7";
			deck[n].value = 7;
		}
		else {
			deck[n].face = "6";
			deck[n].value = 6;
		}
		return deck;
	}
}
function shuffle (array) {
	var j, x, i;
	for (i = array.length; i >= 0; i--) {
		j = Math.floor(Math.random() * i)
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}
function blue() = {
	document.getElementsById("div").style.backgroundColor = "blue";
}

document.getElementsById("div").onmouseover = blue;



