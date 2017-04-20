
var deck = document.getElementById("deck");
var user = document.getElementById("user");
var comp = document.getElementById("comp");
var field1 = document.getElementById("field1");
var field2 = document.getElementById("field2");
var discard = document.getElementById("discard");
var trump;
var button = document.getElementsByTagName("button")[0];

var cards = document.getElementsByClassName("card");
var deckCards = deck.children;
var userCards = user.children;
var compCards = comp.children;
var field1Cards = field1.children;
var field2Cards = field2.children;
var discardCards = discard.children;

var attacker;
var defender;
var facesInField = [];

window.onload = function() {
	createCards();
	moveToDeck();
	shuffle();
}

deck.onclick = function() {
	deal();
	attack();
}
function newGame() {
	/*button.style.display = "block";
	button.innerHTML = "New game";
	button.onclick = function () {
		moveToDeck();
		shuffle();
		deal();
		attack();
	}*/
	return;
}

function findSuit(elem) {
	if (elem == null) {
		return null;
	}
	if (elem.classList.contains("spade")) {
		return "spade";
	}
	if (elem.classList.contains("heart")) {
		return "heart";
	}
	if (elem.classList.contains("club")) {
		return "club";
	}
	if (elem.classList.contains("diamond")) {
		return "diamond";
	}
}
function findFace(elem) {
	if (elem == null) {
		return null;
	}
	if (elem.classList.contains("SIX")) {
		return "SIX";
	}	
	if (elem.classList.contains("SEVEN")) {
		return "SEVEN";
	}
	if (elem.classList.contains("EIGHT")) {
		return "EIGHT";
	}
	if (elem.classList.contains("NINE")) {
		return "NINE";
	}
	if (elem.classList.contains("TEN")) {
		return "TEN";
	}
	if (elem.classList.contains("JACK")) {
		return "JACK";
	}
	if (elem.classList.contains("QUEEN")) {
		return "QUEEN";
	}
	if (elem.classList.contains("KING")) {
		return "KING";
	}
	if (elem.classList.contains("ACE")) {
		return "ACE";
	}
}
function refreshFacesInField() {
	facesInField.length = 0;
	checkFaces(field1);
	checkFaces(field2);
	return facesInField;
	
	function checkFaces(field) {
		for (let i = 0; i < field.children.length; i++) {
			facesInField.push(findFace(field.children[i]));
		}
	}
}
function findLastSuitInField() {
	return findSuit(field1.lastElementChild);
}
function changeAttacker () {
	return attacker = attacker === user ? comp : user;
}
function changeClassNameAllChildren (parent, from, to) {
	for (let i = 0; i < parent.children.length; i++) {
			
		if (parent.children[i].classList.contains(from)) {
			parent.children[i].classList.toggle(from);
			parent.children[i].classList.toggle(to);
		}
	}
}
function setupNeedClasses () {
	changeClassNameAllChildren(user, "face-down", "face-up");
	changeClassNameAllChildren(comp, "face-up", "face-down");
	changeClassNameAllChildren(field1, "face-down", "face-up");
	changeClassNameAllChildren(field2, "face-down", "face-up");
	changeClassNameAllChildren(discard, "face-up", "face-down");
	changeClassNameAllChildren(field1, "enabled", "disabled");
	changeClassNameAllChildren(field2, "enabled", "disabled");
	changeClassNameAllChildren(discard, "enabled", "disabled");
}
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
	if (button.style.display === "block") {
		button.style.display = "none";
	}
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
function deal() {
	if (deckCards.length === 36) {
		deck.lastElementChild.classList.toggle("enabled");
		deck.lastElementChild.classList.toggle("disabled");
		
		for (let i = 0; i < 6; i++) {
			deal1Card(user);
			deal1Card(comp);
		}
		
		createTrump();
		
		deck.onclick = false;
	}
	else {
		
		while ((defender.children.length < 6) && (deckCards.length > 0)) {
			deal1Card(defender);
		}
		while ((attacker.children.length < 6) && (deckCards.length > 0)) {
			deal1Card(attacker);
		}
		
	}
	
	sortUserCards();
	
	setupNeedClasses();
	
	
	
	function deal1Card (whom) {
		whom.appendChild(deck.lastElementChild);
	}
	function createTrump () {
		if (trump) {
			for (let i = 0; i < cards.length; i++) {
				if (cards[i].classList.contains(findSuit(trump))) {
				cards[i].value -= 9;
				}
			}
		}
		trump = deck.insertBefore(deck.lastElementChild, deckCards[0]);
		trump.id = "trump";
		
		deck.firstElementChild.classList.toggle("face-up");
		deck.firstElementChild.classList.toggle("face-down");
		
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].classList.contains(findSuit(trump))) {
			cards[i].value += 9;
			}
		}
		return trump;
	}
	function sortUserCards() {
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
		return userCards;
		
	}
	
}
function attack() {
	
	if (deckCards.length == 24) {
		attacker = whoAttack();
	}
	
	defender = attacker === user ? comp : user;
	
	var turner = attacker;
	
	defineEnableCards();
	turn();
	
	
	function changeTurner () {
		return turner = turner === user ? comp : user;
	}
	function whoAttack() {
		if ((minTrumpCard(user)) && (minTrumpCard(comp))) {
			if ((minTrumpCard(user)) < (minTrumpCard(comp))) {
				return user;
			}
			else {
				return comp;
			}
		}
		else if (minTrumpCard(user)) {
			return user;
		}
		else if (minTrumpCard(comp)) {
			return comp;
		}
		else {
			return user;
		}
		
		function minTrumpCard(whom) {
			var min;
			
			for (let i = 0; i < whom.children.length; i++) {
				if (whom.children[i].classList.contains(findSuit(trump))) {
					if (!min) {
						min = whom.children[i].value;
					}
					else if (whom.children[i].value < min) {
						min = whom.children[i].value;
					}
				}
			}
			return min;
		}
	}
	function defineEnableCards() {
		changeClassNameAllChildren(turner, "enabled", "disabled");
		
		if (turner === attacker) {
			
			if (attacker.children.length > 0) {
				if ((field1Cards.length === 0) && (field2Cards.length === 0)) {
					changeClassNameAllChildren(turner, "disabled", "enabled");
				}
				else {
					refreshFacesInField();
					for (let i = 0; i < turner.children.length; i++) {
						for (let n = 0; n < facesInField.length; n++) {
							if (turner.children[i].classList.contains(facesInField[n])) {
								turner.children[i].classList.remove("disabled");
								turner.children[i].classList.add("enabled");
							}
						}
					}
				}
			}
			else if (attacker === user) {
				alert("You win! Congratulations!");
				newGame();
			}
			else {
				alert("I am sorry, you lose.");
				newGame();
			}
		}
		else {
			var lastField1Value = field1.lastElementChild.value;
			var suitInField = findLastSuitInField();
			
			for (let i = 0; i < turner.children.length; i++) {
				if (turner.children[i].classList.contains(suitInField) && (turner.children[i].value > lastField1Value)) {
					turner.children[i].classList.remove("disabled");
					turner.children[i].classList.add("enabled");
				}
				else if ((suitInField !== findSuit(trump)) && (turner.children[i].classList.contains(findSuit(trump)))) {
					turner.children[i].classList.remove("disabled");
					turner.children[i].classList.add("enabled");
				}
			}
		}
	}
	function turn() {
		if (turner === user) {
			if ((attacker === user)) {
				if (field1Cards.length !== 0) {
					button.style.display = "block";
					button.innerHTML = "To discard";
					button.onclick = toDiscard;
				}
			}
			else {
				button.style.display = "block";
				button.innerHTML = "To home";
				button.onclick = function() {
					toHome(user);
				}
			}
			for (let i = 0; i < userCards.length; i++) {
				
				if (userCards[i].classList.contains("enabled")) {
					userCards[i].onclick = 	function () {
						moveToField.call(this, user, this);
					}
				}
			}
		}
		else {
			if (button.style.display === "block") {
				button.style.display = "none";
			}
			
			var enableCards = comp.getElementsByClassName("enabled");
			
			if (enableCards.length !== 0) {
				var random = Math.floor(Math.random() * enableCards.length);
				var turnCard = enableCards[random];
				
				turnCard.classList.toggle("enabled");
				turnCard.classList.toggle("disabled");
				turnCard.classList.toggle("face-up");
				turnCard.classList.toggle("face-down");

				moveToField(comp, turnCard);
				
			}
			else {
				if (turner === attacker) {
					toDiscard();
					deal();
				}
				else {
					toHome(comp);
					deal();
				}
			}
		}
		function moveToField(who, that) {
				if (turner === attacker) {
					if (defender.children.length > 0) {
						field1.appendChild(that);
						var empty = document.createElement("div");

						empty.classList.add("empty");
						field2.appendChild(empty);
					}
					else {
						toDiscard();
					}
				}
				else {
					var empty = field2.getElementsByClassName("empty");

					if (empty.length > 0) {
						field2.removeChild(empty[0]);
					}
					
					field2.appendChild(that);
				}
				that.classList.toggle("enabled");
				that.classList.toggle("disabled");
				if (that === this) {
					that.onclick = false;
				}
				
				for (let i = 0; i < who.children.length; i++) {
					if (who.children[i].classList.contains("enabled")) {
						who.children[i].classList.toggle("enabled");
						who.children[i].classList.toggle("disabled");
					}	
					if (that === this) {
						user.children[i].onclick = false;
					}
				}
				/*var enableList = who.getElementsByClassName("enabled");
				if (enableList.length > 0) {
					for (let i = 0; i < enableList.length; i++) {
						enableList[i].classList.toggle("enabled");
						enableList[i].classList.toggle("disabled");
						if (that === this) {
							user.children[i].onclick = false;
						}
					}
				}*/
				

				changeTurner();
				defineEnableCards();
				turn();
			
		}
		function toHome(whom) {
			for (let i = 0, len = field1Cards.length; i < len; i++) {
				
				if (whom === comp) {
					field1Cards[0].classList.toggle("face-up");
					field1Cards[0].classList.toggle("face-down");
				}
				
				whom.appendChild(field1Cards[0]);
			}
			
			var empty = field2.getElementsByClassName("empty");
			
			if (empty.length > 0) {
				field2.removeChild(empty[0]);
			}
			
			for (let i = 0, len = field2Cards.length; i < len; i++) {
				
				if (whom === comp) {
					field2Cards[0].classList.toggle("face-up");
					field2Cards[0].classList.toggle("face-down");
				}
				
				whom.appendChild(field2Cards[0]);
			}
			if (deckCards.length > 0) {
				deal();
			}
			
			if (attacker.children.length === 0) {
				if (attacker === user) {
					alert("You win! Congratulations!");
				}
				else {
					alert("I am sorry, you lose.");
				}
				newGame();
				return;
			}
			else {
				attack();
			}
		}
		function toDiscard() {
			
			for (let i = 0, len = field1Cards.length; i < len; i++) {
				discard.appendChild(field1Cards[0]);
			}
			
			for (let i = 0, len = field2Cards.length; i < len; i++) {
				discard.appendChild(field2Cards[0]);
			}
			
			if (deckCards.length > 0) {
				deal();
			}
			if ((attacker.children.length === 0) && (defender.children.length === 0)) {
				alert("You have a draw");
				newGame();
			}
			else if (attacker.children.length === 0) {
				
				if (attacker === user) {
					alert("You win! Congratulations!");
				}
				else {
					alert("I am sorry, you lose.");
				}
				newGame();
			}
			else if (defender.children.length === 0) {
				
				if (defender === user) {
					alert("You win! Congratulations!");
				}
				else {
					alert("I am sorry, you lose.");
				}
				newGame();
			}
			else {
				changeAttacker();
				attack();
			}
		}
		
	}
	
	
	
}
