
$(document).ready(function() {

    $('.desktop-nav-switch, .mobile-navigation > .close-button > a').click(function() {
        $('.mobile-navigation').toggleClass('open-mb');
        return false;
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.filter-switch').click(function() {
        $('.filter-abs').toggleClass('filter-open');
        return false;
    });

    $('.search-switch').click(function() {
        $('.search-wrapper').toggleClass('search-open');
        return false;
    });

    /** Search **/

    if($('#keyword')) {
        $('#keyword').keydown(function($event) {

            var pressed = event.keyCode || event.which;

            if(pressed == 13) {
                $('#search-form').submit();
            }
        })
    }

    $('.show-opts-btn').click(function() {
        $('.comunidad-topbar').toggleClass('opened');
        return false;
    });

    if($('.action-menu')) {
        $('.action-menu').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            nav: false,
            dost: false,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        });

        $('.ab-prev-btn').click(function() {
            $('.action-menu').trigger('prev.owl.carousel');
            return false;
        });

        $('.ab-next-btn').click(function() {
            $('.action-menu').trigger('next.owl.carousel');
            return false;
        });
    }

    if($('.week-slider')) {
        $('.week-slider').owlCarousel({
            loop: false,
            responsiveClass: true,
            nav: false,
            margin: 0,
            dost: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 3
                },
                900: {
                    items: 4
                },
                1200: {
                    items: 5
                },
                1400: {
                    items: 7
                }
            }
        });

        $('.week-day-prev').click(function() {
            $('.week-slider').trigger('prev.owl.carousel');
            return false;
        });

        $('.week-day-next').click(function() {
            $('.week-slider').trigger('next.owl.carousel');
            return false;
        });
    }

    if($('.line-carousel')) {
        $('.line-carousel').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: false,
            dost: true,
            margin: 10,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }

    if($('.plan-bottom-carousel')) {
        $('.plan-bottom-carousel').owlCarousel({
            loop: true,
            responsiveClass: false,
            nav: false,
            dost: true,
            items: 1
        });
    }

    if($('.plans-carousel')) {
        $('.plans-carousel').owlCarousel({
            loop: true,
            responsiveClass: false,
            nav: false,
            dost: true,
            responsive: {
                0: {
                    items: 1
                },
                1024: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });

        $('.plans-slider-prev').click(function() {
            $('.plans-carousel').trigger('prev.owl.carousel');
            return false;
        });

        $('.plans-slider-next').click(function() {
            $('.plans-carousel').trigger('next.owl.carousel');
            return false;
        });
    }

    var calendarEl = document.getElementById('calendar');

    if(calendarEl) {

        var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: [ 'dayGrid'],
          header: {
            left: '',
            center: '',
            right: ''
          },
          defaultDate: new Date(),
          locale: 'es',
          buttonIcons: false,
          weekNumbers: false,
          columnHeaderFormat: {
              weekday: 'long'
          },
          navLinks: false,
          editable: true,
          eventLimit: true,
          navLinks: false,
          aspectRatio: 1.22,
          fixedWeekCount: false,
          dayRender: function(element) {

              var rand = Math.floor(Math.random() * 3 + 1);
              var title = null;

              if(rand == 2) title = '01. CARDIO XL';
              if(rand == 3) title = '01. RETO';
              if(rand == 1) title = '02. RUTINA XL';

              rand = Math.floor(Math.random() * 5 + 1);

              var list  = [
                  'Cardio Rutina',
                  'Equilibirum XL',
                  'Reto Rutina',
                  'Collection De',
                  'Cardio Rutina',
                  'A Equilibirum',
                  'Reto Rutina 2',
                  'Collection De 2'
              ];
              var con   = '';

              for(var index = 0; index < rand; index ++) {
                  con += '<label class="filter-cell"><input type="checkbox" name="filter[]"/> <div class="cell-marker"> <span class="true la la-check"></span><span class="false la la-circle"></span> </div> <span>' + list[index] + '</span> </label>';
              }

              var classList = Object.assign([],element.el.classList);

              if(classList.indexOf('fc-other-month') == -1) {
                  var html  =   '<div class="daily-program">';
                  html      +=  '   <div class="header">' + title + '</div>';
                  html      +=  '   <div class="body">' + con;
                  html      +=  '   </div>';
                  html      +=  '</div>';

                  element.el.innerHTML = html;
              }

          },
          events: [ ]
        });

        calendar.render();
    }

    if($('.datepicker-consulta')) {
        $('.datepicker-consulta').datepicker({
            inline: true,
            navTitles: {
                days: 'MM'
            }
        });
    }

    $('.add-receta').click(function() {

        var meal = $(this).attr('data-meal');

        $('#add-receta-modal').modal('show');
        $('#add-receta-modal').find('input[name="meal"]').val(meal);

        return false;
    });

    $('.update-receta').click(function() {

        var meal        = $(this).attr('data-meal');
        var content_id  = $(this).attr('data-content-id');
        var receta_id   = $(this).attr('data-receta-id');

        $('#add-receta-modal').modal('show');
        $('#add-receta-modal').find('select[name="receta_id"]').val(receta_id);
        $('#add-receta-modal').find('input[name="meal"]').val(meal);
        $('#add-receta-modal').find('input[name="content_id"]').val(content_id);

        return false;
    });

    $('.add-receta-calendar').click(function() {

        var meal        = $(this).attr('data-meal');
        var day         = $(this).attr('data-day');

        $('#add-receta-modal').modal('show');
        $('#add-receta-modal').find('input[name="day"]').val(day);
        $('#add-receta-modal').find('input[name="meal"]').val(meal);

        return false;
    });

});

jQuery(function()
{
    jQuery(document).on('show.bs.modal', '.modal', function()
    {
        var maxZ = parseInt(jQuery('.modal-backdrop').css('z-index')) || 1040;

        jQuery('.modal:visible').each(function()
        {
            maxZ = Math.max(parseInt(jQuery(this).css('z-index')), maxZ);
        });

        jQuery('.modal-backdrop').css('z-index', maxZ);
        jQuery(this).css("z-index", maxZ + 1);
        jQuery('.modal-dialog', this).css("z-index", maxZ + 2);
    });

    jQuery(document).on('hidden.bs.modal', '.modal', function ()
    {
        if (jQuery('.modal:visible').length)
        {
            jQuery(document.body).addClass('modal-open');

           var maxZ = 1040;

           jQuery('.modal:visible').each(function()
           {
               maxZ = Math.max(parseInt(jQuery(this).css('z-index')), maxZ);
           });

           jQuery('.modal-backdrop').css('z-index', maxZ-1);
       }
    });
});
//Mostrar y ocultar ventana
$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip2").click(function(){
      $("#panel2").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip3").click(function(){
      $("#panel3").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip4").click(function(){
      $("#panel4").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip5").click(function(){
      $("#panel5").slideToggle("slow");
    });
});

$(document).ready(function(){
    $("#flip6").click(function(){
      $("#panel6").slideToggle("slow");
    });
});
//popover
$(document).ready(function(){
    $(".popover").popover({
      placement:"bottom",
      title: "AÑADIR OTRA RECETA" ,
      content: "PERSONALIZAR RECETA"
    });
});
//scroll
$('.scroll').scrollspy({ target: '#scroll-body' })


