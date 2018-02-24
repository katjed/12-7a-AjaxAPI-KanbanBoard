// ID generating
$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    // Class'Column'
    function Column(name) {
        var self = this; 
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {  
            var $column = $('<div>').addClass('column');  // Creating column elements
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

            $columnDelete.click(function() {  // Adding events to column elements
                self.removeColumn();
            });

            /*
            $columnAddCard.click(function(event) {
                self.addCard(new Card(prompt("Enter card name")));
            });
            */
              
            // Alternative - with blockade of adding nameless cards           
            $columnAddCard.click(function() {   
                var name = prompt('Enter card name');
                if (name) {
                    self.addCard(new Card(name));
                }
            });

            $column.append($columnTitle)  // Appending column elements
                   .append($columnDelete)
                   .append($columnAddCard)
                   .append($columnCardList);
    
            return $column;  // Returning created column
        }
    }

    // Methods for class 'Column'
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },

        removeColumn: function() {
            this.$element.remove();
        }
    };

    // Class 'Card'
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');  // Creating card elements
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(function(){  // Adding events to card elements
                self.removeCard();
            });

            $card.append($cardDelete)  // Appending card elements
                 .append($cardDescription);

            return $card;  // Returning created card
        }
    }

    // Methods for class 'Card'
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };

    // Object 'Board'
    var board = {
        name: 'Kanban Board',

        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },

        $element: $('#board .column-container')
    };

    // Adding events - creating column
    /*
    $('.create-column').click(function(){
        var name = prompt('Enter column name');
        var column = new Column(name);
        board.addColumn(column);
    });
    */
    // Alternative - with blockade of adding nameless cards 
    $('.create-column').click(function() {  
        var name = prompt('Enter column name');
        if (name) {
            board.addColumn(new Column(name));
        }  
    });

    // Drag'n'drop
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }

    // Creating columns
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // Adding columns to the board
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // Creating cards
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // Adding cards to columns
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
});