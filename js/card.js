// Class 'Card'
function Card(id, name, idColumn) {
    var self = this;
    this.id = id;
    this.idColumn = idColumn;
    this.name = name || 'No name';
    this.$element = createCard();

    function createCard() {
        var $card = $('<li>').addClass('card').attr('data-id', self.id);  // Creating card elements
        var $cardDescription = $('<p>').addClass('card-description').text(self.name);
        var $cardDelete = $('<button>').addClass('btn-delete-card').html('<i class="fa fa-trash" aria-hidden="true"></i>');
        var $cardEdit = $('<button>').addClass('btn-edit-card').html('<i class="fa fa-pencil" aria-hidden="true"></i>');

        $cardDelete.click(function(){  // Adding events to card elements
            self.removeCard();
        });

        $cardEdit.click(function() {
            self.editCard();
        });

        $card.append($cardDelete)  // Appending card elements 
             .append($cardEdit)
             .append($cardDescription);             

        return $card;  // Returning created card
    }
}

// Methods for class 'Card'
Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function(){
                self.$element.remove();
            }
        });
    },

    editCard: function() {        
        var self = this;
        var newName = prompt('Edit card name', self.name);
        if (newName != self.name) {
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: newName,
                    bootcamp_kanban_column_id: self.idColumn
                },
                success: function (response) {
                    self.$element.children('p').text(newName);
                    self.name = newName;
                }
            });
        }
    }
};

    