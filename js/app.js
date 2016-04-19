$(function(){

  var hamburger = $("#hamburger");
  var fruits =   $(".container-fruits-items").find(".item");
  var base = $(".container-base-items").find(".item");
  var countFruit = $(".container-fruits-items").find(".item").length;
  var countBase = $(".container-base-items").find(".item").length;
  var mixBtn = $("#mix");
  var dataFruits = [];
  var dataBases = [];




  function checkSize(){
   var maxWidth = window.matchMedia("(max-width: 600px)");
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

  hamburger.on("click", function(){
    var menu = $("nav");
    menu.toggleClass("show-menu");
    menu.find("li").toggleClass("show-li");
    if(menu.hasClass("show-menu")){
        menu.toggle(300);
    }else{
      menu.toggle();
    }
  });

  //function to clear position, and remove class from item when it is adden to the new site in DOM
  function clearItem(item){
    item.css("position", "");
    item.css("top", "");
    item.css("left", "");
    item.removeClass("fruit-around");
  };

function moveIngredients(item){

  var containerFruits = $(".container-fruits-items");
  var containerBase = $(".container-base-items");
  var containerMix = $(".container-glass-items");

  var containerMixTop = containerMix.offset().top;
  var containerMixLeft = containerMix.offset().left;

  var containerFruitsLeft = containerFruits.offset().left;
  var containerFruitsTop = containerFruits.offset().top;
  var containerBaseLeft = containerBase.offset().left;
  var containerBaseTop = containerBase.offset().top;

  var itemTop = item.offset().top;
  var itemLeft = item.offset().left;
  var itemWidth = item.css("width");
  console.log(itemWidth);

  item.css("top", itemTop + "px");
  item.css("left", itemLeft + "px");
  item.css("position", "fixed");
  item.css("z-index", "10");
  item.addClass("fruit-around");

  if(item.parent().hasClass("container-fruits-items") || item.parent().hasClass("container-base-items")){
    item.animate({
        left:  containerMixLeft + "px",
        top: containerMixTop  + "px",
    }, 800, function(){
      var newSite = item.detach();
      containerMix.prepend(newSite);
      newSite.css("margin-left", "0.5rem");
      newSite.css("margin-right", "0.5rem");
      clearItem(newSite);

    });
  }else if(item.hasClass("fruit")){
    if($(".container-fruits-items").find(".item").length === 7){
      containerFruitsLeft += parseInt(itemWidth);
      console.log("jestem 7")
    }else if($(".container-fruits-items").find(".item").length === 8){
        containerFruitsLeft += 2*(parseInt(itemWidth));
        console.log("jestm 8");
    }
    item.animate({
      left: containerFruitsLeft + "px",
      top: containerFruitsTop + 2*(parseInt(itemWidth)) + "px",
    }, 800, function(){
      var newSite = item.detach();
      containerFruits.append(newSite);
      clearItem(newSite);
    });
  }else{
    item.animate({
      left: containerBaseLeft + 2*(parseInt(itemWidth)) + "px",
      top: containerBaseTop  + "px",
    },800, function(){
      var newSite = item.detach();
      containerBase.append(newSite);
      clearItem(newSite);
    });
  }

};



fruits.on("click", function(){
  if(countFruit > 6 && ($(this).parent().hasClass("container-fruits-items"))){
    countFruit --;
    console.log(countFruit);
    moveIngredients($(this));
  }else if($(this).parent().hasClass("container-glass-items")){
    countFruit ++;
    console.log(countFruit);
    moveIngredients($(this))
  }


});



base.on("click", function(){
  if(countBase> 2){
    countBase --;
    moveIngredients($(this));
  }else if($(this).parent().hasClass("container-glass-items")){
    countBase ++;
    moveIngredients($(this));
  }
});

function takeIngredients (ingredients){

  $(".container-glass-items").find(".item").each(function(){
    if($(this).hasClass("fruit")){
        var itemIngredient = $(this).data("fruit");
    }else {
        var itemIngredient = $(this).data("base");
    }
    ingredients.push(itemIngredient);
  });
  return ingredients.reverse();
};


function getIngredientsData(array, id, name){
  var urlServer = "http://localhost:3000/";
  $.ajax({
    url: urlServer + id + "?name=" + name,
    type: "GET",
    dataType: "json"
  }).done(function(response){
    array.push(response);
    console.log(array);
  }).fail(function(error){
     console.log("error");
  })

  };

mixBtn.on("click",function(){
  var ingredients = [];
  var coctail = [];
  takeIngredients(ingredients);


  for(var i=0; i<ingredients.length; i++){

    if(this.dataset.fruit = true){
      console.log(ingredients[i] + "fruit");
      getIngredientsData(dataFruits, "fruits", ingredients[i]);
    }else{
      console.log(ingredients[i] + "bases");
      getIngredientsData(dataBases, "bases", ingredients[i]);
    }

  }




  // $(".gc1").addClass("fill4");
  // $(".gc2").addClass("fill3");
  // $(".gc3").addClass("fill2");
  // $(".gc4").addClass("fill1");
  // $(".glass").delay(3200).addClass("shake");

});
});
