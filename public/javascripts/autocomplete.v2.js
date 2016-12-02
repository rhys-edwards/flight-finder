$(function() {
  $.ajax({
    url: "javascripts/airports.json",
    dataType: "json",
    success: function(request, response) {
             var data = $.grep(suggestion, function(value) {
               return value.city.substring(0, request.term.length).toLowerCase() == request.term.toLowerCase();
             });
  $('#autocomplete').autocomplete({
  minLength: 1,
  source: data,
  focus: function(event, ui) {
              $('#autocomplete').val(ui.item.city,ui.item.country);
              return false;
    },
  select: function(event, ui) {
    $('#autocomplete').val(ui.item.name);
      return false;
      }
      }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li></li>" )
          .data( "ui-autocomplete-item", item )
            .append( "<a>" + item.city + "," + item.country + "</a>" )
              .appendTo( ul );
          };
        }
    });
  });
