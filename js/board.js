// Object 'Board'
var board = {
    name: 'Kanban Board',

    createColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },

    $element: $('#board .column-container')
};

// Adding events - creating column

$('.create-column').click(function() {
    var columnName = prompt('Enter column name');

    if (columnName !== null) {
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response){
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
    }
});

// Drag'n'drop
function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder',
        receive: function(event, ui) {
            var columnId = ui.item.closest('.column').attr('data-id'),
                cardId = ui.item.attr('data-id'),
                name = ui.item.find('.card-description').text();

            $.ajax({
                url: baseUrl + '/card/' + cardId,
                method: 'PUT',
                data: {
                    name: name,
                    bootcamp_kanban_column_id: columnId
                }                
            });
        }
    }).disableSelection();
}