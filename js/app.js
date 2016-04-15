$(function(){

  function checkSize(){
   var maxWidth = window.matchMedia("(max-width: 650px)");
   maxWidth.addListener(WidthChange);
   WidthChange(maxWidth);

   function WidthChange(maxWidth){
     if(maxWidth.matches){
       $("#hamburger").css("display", "block");
          $("nav").css("display", "none");
     }else{
       $("#hamburger").css("display", "none");
      $("nav").css("display", "block");
     }
   }
 }
checkSize();

  $("#hamburger").on("click", function(){
    $("nav").slideToggle();
  });

});
