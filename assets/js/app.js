let home = $('#home-carousel');
home.owlCarousel({
    loop: false,
    dots: true,
    nav: false,
    items: 1,
    autoplay:true,
    autoplayTimeout: 5000
});

function initialize_owl(el) {
    el.owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay:true,
        autoplayTimeout: 5000,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
}

function destroy_owl(el) {
    el.trigger("destroy.owl.carousel");
}

$(document).ready(function () {

    $('[data-toggle="popover"]').popover({
        html: true
    });
    
    initialize_owl($('#services-1'));

    $('a[href="#gobierno"]').on('shown.bs.tab', function () {
        initialize_owl($('#services-1'));
    }).on('hide.bs.tab', function () {
        destroy_owl($('#services-1'));
    });

    $('a[href="#ciudadania"]').on('shown.bs.tab', function () {
        initialize_owl($('#services-2'));
    }).on('hide.bs.tab', function () {
        destroy_owl($('#services-2'));
    });


    // Normatividad dataTables
    $('#dataTable').DataTable(
        {
            "language": {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            "columnDefs": [
                { 
                    "targets": -1, // your case first column
                    "className": "text-center",
                    "searchable": false,
                    "orderable": false
                }
            ]

        }
    );

    // Viewport Checker
    $('.section').addClass("ocultar").viewportChecker({
        classToAdd: 'mostrar',
        classToRemove: 'ocultar',
        offset: 50
    });
});

$(window).scroll(function() {    
    // get the amount the window has scrolled
    var scroll = $(window).scrollTop();
    // add the 'active' class to the correct li based on the scroll amount
    if (scroll > 200) {
        $(".navbar-primary").addClass("fixed-top");
    }else {
        $(".navbar-primary").removeClass("fixed-top");
    }
});

var lastScrollTop = 0;
$(window).scroll(function(event){
   let st = $(this).scrollTop();
   let wh = $(this).height();
   let dh = $(document).height();

   if (st > 200){
    $(".navbar-primary").addClass("fixed-top");
   }else{
       $(".navbar-primary").removeClass("fixed-top");
   }

   if (st > 500){
    $(".top").removeClass("ocultar");
    $(".top").addClass("mostrar");
   }else{
       $(".top").removeClass("mostrar");
       $(".top").addClass("ocultar");
   }

   lastScrollTop = st;
   
   if( st + wh == dh ) {
       $(".floating-nav").removeClass("fadeIn");
       $(".floating-nav").addClass("fadeOut");
   }else{
      $(".floating-nav").removeClass("fadeOut");
      $(".floating-nav").addClass("fadeIn");
   }

});

// Select all links with hashes
$('a[href*="#"].to')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });