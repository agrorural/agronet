window.jQuery = require('jquery')
window.Popper = require('popper.js')
require('bootstrap')

const Chart = require('chart.js');
const Chartkick = require('chartkick');
const owlCarousel = require('owl.carousel');
const confirm = require('jquery-confirm');
const redirect = require('jquery.redirect');
const Cookie = require('js-cookie');
const typeahead = require('typeahead.js');


Chartkick.options = {
    colors: ['#7daf28', '#f5d269', '#8c6437', '#b48caf', '#3ccdcd']
}

const dt = require('datatables.net-responsive-bs4')();

jQuery(function() {
    jQuery('[data-toggle="popover"]').popover();
    jQuery('[data-toggle="tooltip"]').tooltip();

    // media query event handler
    if (matchMedia) {
        const mq = window.matchMedia("(min-width: 768px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            jQuery('body').addClass('sidebar-expand');
            jQuery('body').removeClass('sidebar-collapse');
            console.log("window width is at least 768px");
        } else {
            jQuery('body').removeClass('sidebar-expand');
            jQuery('body').addClass('sidebar-collapse');
            console.log("window width is less than 768px");
        }
    }

    jQuery('.sidebartoggler').click(function() {
        jQuery('body').toggleClass('sidebar-expand sidebar-collapse');
    });

    jQuery('input.form-control').blur(function() {
        let tmpval = jQuery(this).val();
        if (tmpval == '') {
            jQuery(this).parent('.form-group').addClass('empty');
            jQuery(this).parent('.form-group').removeClass('not-empty');
        } else {
            jQuery(this).parent('.form-group').addClass('not-empty');
            jQuery(this).parent('.form-group').removeClass('empty');
        }
    });
    jQuery('#sidebarCollapse').click(function() {
        jQuery('nav#sidebar').toggleClass('active');
    });

    jQuery('table.datagrid').DataTable({
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        responsive: true
    });
});