// Class 'Column'
function Column(id, name) {
    var self = this; 
    this.id = id;
    this.name = name || 'No name';
    this.$element = createColumn();

    function createColumn() {  
        var $column = $('<div>').addClass('column').attr('data-id', self.id);  // Creating column elements
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete-column').html('<i class="fa fa-trash" aria-hidden="true"></i>');
        var $columnEdit = $('<button>').addClass('btn-edit-column').html('<i class="fa fa-pencil" aria-hidden="true"></i>');
        var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

        $columnDelete.click(function() {  // Adding events to column elements
            self.removeColumn();
        });

        $columnEdit.click(function() {
            self.editColumn();
        });

        $columnAddCard.click(function(event) {
            var cardName = prompt('Enter card name');
            event.preventDefault();

            if (cardName !== null) {
                $.ajax({
                    url: baseUrl + '/card',
                    method: 'POST',
                    data: {
                        name: cardName,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function(response) {
                        var card = new Card(response.id, cardName, self.id);
                        self.createCard(card);
                    }
                });
            }
        });

        $column.append($columnTitle)  // Appending column elements
               .append($columnDelete)
               .append($columnAddCard)
               .append($columnEdit)
               .append($columnCardList);
    
        return $column;  // Returning created column
    }
}

// Methods for class 'Column'
Column.prototype = {
    createCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },

    removeColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response){
                self.$element.remove();
            }
        });
    },

    editColumn: function() {
        var self = this;
        var newName = prompt('Edit column name', self.name);
        event.preventDefault();
        if (newName != self.name) {
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'PUT',
                data: {
                    name: newName
                },
                success: function(response) {
                    self.$element.children('.column-title').text(newName);
                    self.name = newName;
                }
            });
        }
    }
};
