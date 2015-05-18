$(document).on('ready', function(){
  $("#header li").on("click",function(){
    $(this).hasClass("selected")?$(this).removeClass("selected"):$(this).addClass("selected");
  });
});
