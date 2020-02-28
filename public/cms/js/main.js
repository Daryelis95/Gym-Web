
var CONFIRMATION_URL = null;

$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();
    
    /** Search **/

    if($('#keyword')) {
        $('#keyword').keydown(function($event) {

            var pressed = event.keyCode || event.which;

            if(pressed == 13) {
                $('#search-form').submit();
            }
        })
    }

    /** Confirmation Box **/

    $('.confirm-btn').click(function() {

        var href = $(this).attr('data-href');

        if(href) {

            CONFIRMATION_URL = href;

            $('#confirmation-modal').modal('show');
            $('#confirmation-modal #confirmation-ok-btn').unbind('click').click(
                function() {
                    location.href = CONFIRMATION_URL;
                }
            );
        }
        else {

            console.log('HREF is empty');
        }

        return false;
    });

    /** File Input **/

    $.each($('.file-upload-box'), function($index, element) {

        $(element)
            .children('.file-clear')
            .removeClass('show');

        $(element)
            .children('.file-clear')
            .click(function() {

            $(element)
                .children('input[type="file"]')
                .val(null);

            $(element)
                .children('.file-status')
                .removeClass('selected');

            $(element)
                .children('.file-content')
                .children('.file-name')
                .text('Select File');

            return false;
        });

        $(element)
            .children('input[type="file"]')
            .change(function() {

            var fileName = $(this).val();
            fileName = fileName.replace(/^.*[\\\/]/, '');

            var field = null;

            if($(this).data('field')) {

                field = $('input[name="' + $(this).data('field') + '"]');

                if(field.val() == '') {
                    field.val(fileName);
                }
            }

            $(element)
                .children('.file-status')
                .addClass('selected');

            $(element)
                .children('.file-clear')
                .addClass('show');

            $(element)
                .children('.file-content')
                .children('.file-name')
                .text(fileName);
        });

    });

});
