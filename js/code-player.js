$(document).on('ready', function(){
  var toggles;
  var ls = false;
  if(typeof(Storage) !== "undefined") {
    ls = true;
    toggles = localStorage.getItem('toggles');
    toggles = JSON.parse(toggles);
    if(!toggles){
      // if first time visiting, set all toggles to true
      // so all code containers will be visible
      toggles = {};
      $('#header ul').children('li').each(function(i) {
        toggles[$(this).attr('id')] = true;
        $(this).addClass('selected');
      });
    }else{
      // if the user has been here before, turn on/off
      // the code containers according to what they
      // had them the last time they used the site
      for (var key in toggles) {
        var toggler = $('#'+key);
        var codeContainer = $('#'+$('#'+key).data('container'));
        var textareaID = codeContainer.children('textarea').first().attr('id');
        if(toggles[key]){
          toggler.addClass('selected');
        }else{
          toggler.removeClass('selected');
          codeContainer.hide();
        }
        // populate any code that might have been saved
        if(textareaID){
          $('#'+textareaID).val(localStorage.getItem(textareaID));
        }
      }
    }
  }
  // allow people to show and hide code containers
  $("#header li").on("click", function(){
    var tog = $(this).attr('id');
    if($(this).hasClass("selected")){
      $(this).removeClass("selected");
      $('#'+$(this).data('container')).hide();
      toggles[tog] = false;
    }else{
      $(this).addClass("selected");
      $('#'+$(this).data('container')).show();
      toggles[tog] = true;
    }
    if(ls){
      localStorage.setItem('toggles', JSON.stringify(toggles));
    }
  });
  // select everything in the text area if a user clicks the
  // label for it
  $('.code-container label').on('click', function(){
    var textAreaToSelect = $(this).parent().children('textarea')[0];
    if(textAreaToSelect){
      // don't try to select the iframe!
      $(this).parent().children('textarea')[0].select();
    }
  });
  // set the html, css, and javascript in the iframe
  // and show the results
  $('#runButt').on('click', function(){
    // set the contents of the iframe to the contents of the
    // code container text areas
    var htmlString = '<style>' + $('#cssTextArea').val() + '</style>';
    htmlString += $('#htmlTextArea').val();
    $('#resultsIFrame').contents().find('html').html(htmlString);
    document.getElementById('resultsIFrame').contentWindow.eval($('#jsTextArea').val());
    if(ls){
      $('textarea').each(function(){
        localStorage.setItem($(this).attr('id'), $(this).val());
      });
    }
  });
  // add keyboard support
  $('textarea').on('keydown', function(e){
    if(e.keyCode === 9){
      // add support for tabs
      e.preventDefault();
      var start = $(this).prop("selectionStart");
      var end = $(this).prop("selectionEnd");
      var txt1 = $(this).val().substr(0, start);
      var txt2 = $(this).val().substr(end);
      var tabChar = '  '
      $(this).val(txt1+tabChar+txt2);

      // prevent cursor from moving to the end of the texte area
      // by moving it back to where it belongs
      $(this).prop('selectionStart', start+tabChar.length);
      $(this).prop('selectionEnd', end+tabChar.length);
    }
  });
});
