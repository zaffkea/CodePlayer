$(document).on('ready', function(){
  var toggles;
  var ls = false;
  if(typeof(Storage) !== "undefined") {
    ls = true;
    toggles = localStorage.getItem('toggles');
    toggles = JSON.parse(toggles);
    if(!toggles){
      toggles = {};
    }
    for (var key in toggles) {
      console.log(key);
      // if (p.hasOwnProperty(key)) {
      //   alert(key + " -> " + p[key]);
      // }
    }
  }
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
      // localStorage.setItem('testObject', JSON.stringify(testObject));
    }
    console.log(toggles);

  });
  $('.code-container label').on('click', function(){
    $(this).parent().children('textarea')[0].select();
  });
});
