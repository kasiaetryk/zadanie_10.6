$(function() {

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var str = '';
		var i = 0;
		for (i = 0; i < 10; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
	function Column(name) {
		var self = this; // przyda się dla funkcji zagnieżdżonych
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete fa fa-times');
			var $columnAddCard = $('<button>').addClass('add-card fa fa-plus');
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Wpisz nazwę karty")));
			});
			$column.append($columnTitle)
					.append($columnAddCard)
					.append($columnDelete)
					.append($columnCardList);
			return $column;
		}
	}
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};
	function Card(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.description = prompt('Podaj opis');
		this.$element = createCard(); 
		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardTitle = $('<h3>').addClass('card-title').text(self.name);
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete-card fa fa-times');
			$cardDelete.click(function(){
	        	self.removeCard();
			});
			$card.append($cardTitle)
				.append($cardDelete)
				.append($cardDescription);
		return $card;
		}
	}
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}
	var board = {
		name: 'Tablica Kanban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}
	$('.create-column')
		.click(function(){
			var name = prompt('Wpisz nazwę kolumny');
			var column = new Column(name);
		board.addColumn(column);
	});
	// TWORZENIE KOLUMN
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);
})