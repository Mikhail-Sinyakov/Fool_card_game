var cards = document.getElementsByClassName("card");
var deck = document.getElementById("deck");
var user = document.getElementById("user");
var comp = document.getElementById("comp");
var field = document.getElementById("field");
var discard = document.getElementById("discard");
var trump = document.getElementById("trump");
var deckCards = deck.children;
var userCards = user.children;
var compCards = comp.children;
var fieldCards = field.children;
var discardCards = discard.children;
function createCards() {
	var div;
	var beforeLast = document.body.children[document.body.children.length - 1];
	for (let i = 0; i < 36; i++) {
		div = document.createElement("div");
		document.body.insertBefore(div, beforeLast);
		div.classList.add("card");
	}
	for (let i = 0; i < cards.length; i++) {
		if (i % 4 === 0) {
			cards[i].classList.add("heart");
		}
		else if (i % 4 === 1) {
			cards[i].classList.add("diamond");
		}
		else if (i % 4 === 2) {
			cards[i].classList.add("club");
		}
		else {
			cards[i].classList.add("spade");
		}
		if (i % 9 === 0) {
			cards[i].classList.add("ACE");
			cards[i].value = 14;
		}
		else if (i % 9 === 1) {
			cards[i].classList.add("KING");
			cards[i].value = 13;
		}
		else if (i % 9 === 2) {
			cards[i].classList.add("QUEEN");
			cards[i].value = 12;
		}
		else if (i % 9 === 3) {
			cards[i].classList.add("JACK");
			cards[i].value = 11;
		}
		else if (i % 9 === 4) {
			cards[i].classList.add("TEN");
			cards[i].value = 10;
		}
		else if (i % 9 === 5) {
			cards[i].classList.add("NINE");
			cards[i].value = 9;
		}
		else if (i % 9 === 6) {
			cards[i].classList.add("EIGHT");
			cards[i].value = 8;
		}
		else if (i % 9 === 7) {
			cards[i].classList.add("SEVEN");
			cards[i].value = 7;
		}
		else {
			cards[i].classList.add("SIX");
			cards[i].value = 6;
		}
	}
}
function moveToDeck() {
	for (let i = 0, len = cards.length; i < len; i++) {
		deck.appendChild(cards[i]);
		cards[i].classList.add("face-down");
		cards[i].classList.add("disabled");
	}
}
function shuffle() {
	var random, len;
	for (len = deckCards.length; len > 0; len--) {
		random = Math.floor(Math.random() * len);
		deck.insertBefore(deckCards[len - 1], deckCards[random]);
		deck.insertBefore(deckCards[random + 1], deckCards[len]);
	}
	deck.lastElementChild.classList.toggle("enabled");
	deck.lastElementChild.classList.toggle("disabled");
}
function firstDeal() {
	function deal1Card (whom) {
		whom.appendChild(deck.lastElementChild);
	}
	function createTrump () {
		var trump = deck.insertBefore(deck.lastElementChild, deckCards[0]);
		trump.id = "trump";
		deck.firstElementChild.classList.toggle("face-up");
		deck.firstElementChild.classList.toggle("face-down");
		var trumpSuit = function() {
			if (trump.classList.contains("spade")) {
				return "spade";
			}
			else if (trump.classList.contains("heart")) {
				return "heart";
			}
			else if (trump.classList.contains("club")) {
				return "club";
			}
			else if (trump.classList.contains("diamond")) {
				return "diamond";
			}
		} 
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].classList.contains(trumpSuit())) {
			cards[i].value += 9;
			}
		}
	}
	function sort() {
		var k = 0;
		function minElem() {
			var min = 25, index;
			for (let i = 0; i < userCards.length - k; i++) {
				if (i === 0) {
					min = userCards[i].value;
					index = i;
				}
				else if (userCards[i].value < min) {
					min = userCards[i].value;
					index = i;
				}
			}
			return userCards[index];
		}
		while (k < userCards.length) {
			user.appendChild(minElem());
			k++;
		}
		
	}
	deck.lastElementChild.classList.toggle("enabled");
	deck.lastElementChild.classList.toggle("disabled");
	for (let i = 0; i < 6; i++) {
		deal1Card(user);
		deal1Card(comp);
	}
	for (let i = 0; i < userCards.length; i++) {
		userCards[i].classList.toggle("face-up");
		userCards[i].classList.toggle("face-down");
	}
	createTrump();
	sort();
	deck.onclick = false;
}
window.onload = function() {
	createCards();
	moveToDeck();
	shuffle();
}

deck.onclick = firstDeal;