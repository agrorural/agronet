const $ = require('jquery');

window.jQuery = require('jquery');
window.Popper = require('popper.js');

require('bootstrap');

// require("jszip");
// require('jszip-utils');

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "inputmask/dist/inputmask/jquery.inputmask";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

require( 'datatables.net-bs4' )( window, $ );
require( 'datatables.net-buttons-bs4' )( window, $ );
require( 'datatables.net-buttons/js/buttons.colVis.js' )( window, $ );
require( 'datatables.net-buttons/js/buttons.flash.js' )( window, $ );
require( 'datatables.net-buttons/js/buttons.html5.js' )( window, $ );
require( 'datatables.net-buttons/js/buttons.print.js' )( window, $ );
require( 'datatables.net-responsive-bs4' )( window, $ );  

FontAwesomeConfig = { searchPseudoElements: true };

import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(brands, solid, regular)

const Chart = require('chart.js');
const Chartkick = require('chartkick');
const confirm = require('jquery-confirm');
const redirect = require('jquery.redirect');
const Cookie = require('js-cookie');
const flatpickr = require("flatpickr");
const Swiper = require('swiper');
const toastr = require("toastr");
const simplebar = require('simplebar');
const inputmask = require('inputmask');

const Bloodhound = require("typeahead.js-browserify").Bloodhound
const engine = new Bloodhound({
    local: ['dog', 'pig', 'moose'],
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.whitespace
});

const typeahead = require("typeahead.js-browserify");
typeahead.loadjQueryPlugin();

Chartkick.options = {
    colors: ['#7daf28', '#f5d269', '#8c6437', '#b48caf', '#3ccdcd']
}

// new simplebar(document.getElementById('sidebar'));

$(function() {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();

    $(".flatpickr").flatpickr({
            enableTime: true,
            dateFormat: "Y-m-d H:i",
    });

    // media query event handler
    if (matchMedia) {
        const mq = window.matchMedia("(min-width: 768px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            $('body').addClass('sidebar-expand');
            $('body').removeClass('sidebar-collapse');
            console.log("window width is at least 768px");
        } else {
            $('body').removeClass('sidebar-expand');
            $('body').addClass('sidebar-collapse');
            console.log("window width is less than 768px");
        }
    }

    $('.sidebartoggler').click(function() {
        $('body').toggleClass('sidebar-expand sidebar-collapse');
        $('.sidebartoggler').toggleClass('is-active');
    });

    $('input.form-control').focus(function() {
        $(this).parents('.form-group').addClass('in-focus');
    }).blur(function(){
        let tmpval = $(this).val();
        $(this).parents('.form-group').removeClass('in-focus');
        if (tmpval == '') {
            $(this).parents('.form-group').addClass('empty');
            $(this).parents('.form-group').removeClass('not-empty');
            console.log(tmpval);
           
        } else {
            $(this).parents('.form-group').addClass('not-empty');
            $(this).parents('.form-group').removeClass('empty');
            console.log(tmpval);
        }
    });

    $('input:required').blur(function() {
        let tmpval = $(this).val();
        if (tmpval == '') {
            $(this).addClass('is-invalid');
            $(this).removeClass('is-valid');
            console.log(tmpval);
        }else{
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            console.log(tmpval);
        }
    });

    $(".custom-select:required").change(function(){
        let value = $(this).val();
        if(value == "0" || value == "")
         {
            $(this).addClass('is-invalid');
            $(this).removeClass('is-valid');
            console.log(value);
         }
         else
         {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            console.log(value);
         }
       });
    
    $('#sidebarCollapse').click(function() {
        $('nav#sidebar').toggleClass('active');
    });

    $('table.datagrid').DataTable({
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