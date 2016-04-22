$(function(){

  var hamburger = $("#hamburger");
  var fruits =   $(".container-fruits-items").find(".item");
  var base = $(".container-base-items").find(".item");
  var countFruit = $(".container-fruits-items").find(".item").length;
  var countBase = $(".container-base-items").find(".item").length;
  var mixBtn = $("#mix");
  //variable to store objects ingredients for mix fruity
  var dataIngredients = [];
  var closeMixBtn = $("#close-info-mix ");
  //variable to bloc onclick in fruits, bases and mix btns
  var blockBtns = false;
  //variables to check start position of information-mix and the strawv
  var informationMix = {
     infromationMixPosition: 0,
     infromationMixWidth: 0,
     infromationMixLeft: 0
  };

  var strawLeft = {
    glassPosition: 0,
    glassWidth: 0,
    documentWidth: 0,
    strawLeftPosition: 0
  };
  //variable to write final color of fruity
  var finalColor = "";

//addListener to change display where it is mobile
  //
  //
    function test_match(){
      var mW = window.matchMedia("(max-width: 600px)");
      mW.addListener(WidthChange);
      WidthChange(mW);

      function WidthChange(mW){
        if(mW.matches){
          var containerMix = $(".container-glass-items").detach();
          $(".container-fruits").find(".container-move-btn").before(containerMix);
          // $("#hamburger").css("display", "block");
          //    $("nav").css("display", "none");
          //    console.log("yes");
        }else{
          var containerMix = $(".container-glass-items").detach();
          $(".container-glass").append(containerMix);
        //   $("#hamburger").css("display", "none");
        //  $("nav").css("display", "block");
        //  console.log("no");
        }
      }
    }
  test_match();

  function matchHeightWidth(){
    var maxW = window.matchMedia("(max-width: 600px and min-height: 640px)");
    // var minH = window.matchMedia("(min-height: 640px)");
    // minH.addListener(WidthHeightChange);
    maxW.addListener(WidthHeightChange);

    WidthHeightChange(maxW);

    function WidthHeightChange(maxW){
      if(maxW.matches){
        console.log("in");
      // var wHeight = $(window).height();
      // console.log(wHeight);
      }else{
      console.log("out")
      }
    }
  }
matchHeightWidth();

  // function to change position from which the straw and information-mix mix at
  // the bggining and second function will be moved depending on resize
  function setMixInformationPosition(){
    informationMix.infromationMixPosition = $(".container-fruits").offset().left;
    informationMix.infromationMixWidth = $(".information-mix").width();

    strawLeft.documentWidth = $(window).width();
    strawLeft.glassPosition = $(".glass").offset().left;
    strawLeft.glassWidth = $(".glass").width();

    strawLeft.strawLeftPosition = strawLeft.documentWidth - parseInt(strawLeft.glassPosition) + strawLeft.glassWidth;
    $(".straw").css("left", strawLeft.strawLeftPosition);
    console.log($(".straw"));
    informationMix.infromationMixLeft  = informationMix.infromationMixPosition + parseInt(informationMix.infromationMixWidth);
    $(".container-fruits").find('.information-mix').css("left", -informationMix.infromationMixLeft);
  };

  setMixInformationPosition();

  // function to change position from which the straw and information-mix mix at
  // the bggining and second function will be moved depending on resize
   $(window).resize(function(){

     if(blockBtns === false){
         setMixInformationPosition();
     }
   });



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
      // newSite.css("margin-left", "0.5rem");
      // newSite.css("margin-right", "0.5rem");
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
  if(blockBtns === false){
    if(countFruit > 6 && ($(this).parent().hasClass("container-fruits-items"))){
      countFruit --;
      console.log(countFruit);
      moveIngredients($(this));
    }else if($(this).parent().hasClass("container-glass-items")){
      countFruit ++;
      console.log(countFruit);
      moveIngredients($(this))
    }
  }
});

base.on("click", function(){
  if(blockBtns === false){
    if(countBase> 2){
      countBase --;
      moveIngredients($(this));
    }else if($(this).parent().hasClass("container-glass-items")){
      countBase ++;
      moveIngredients($(this));
    }
  }
});

function takeIngredients (ingredients){

  $(".container-glass-items").find(".item").each(function(){
    if($(this).hasClass("fruit")){
        var itemIngredient = [$(this).data("fruit"),"fruits"];
    }else {
        var itemIngredient = [$(this).data("base"), "bases"];
    }
    ingredients.push(itemIngredient);
  });
  return ingredients.reverse();
};


function getIngredientsData(array, id, name, end){
  var urlServer = "http://localhost:3000/";
  $.ajax({
    url: urlServer + id + "?name=" + name,
    type: "GET",
    dataType: "json"
  }).done(function(response){
    array.push(response);
    console.log(array);
    if(end === true){
      console.log(true);
      mixIngredients();
    }
  }).fail(function(error){
     console.log("error");
  })

  };

mixBtn.on("click",function(){
  if(blockBtns === false){
    mixBtnClicked();
  }
});

function mixBtnClicked(){
  if(($(".container-glass-items").find(".item").length > 2) && ($(".container-glass-items").find(".base").length === 1)){
    blockBtns = true;
    var ingredients = [];

    takeIngredients(ingredients);

    for(var i=0; i<ingredients.length; i++){
      var end = false;
      if(i === ingredients.length-1){
        end = true;
      }
       console.log(ingredients);
      if(ingredients[i][1] === "fruits"){
        console.log(ingredients[i][0]);
        getIngredientsData(dataIngredients, "fruits", ingredients[i][0], end);
      }else{
        console.log(ingredients[i][1]);
        getIngredientsData(dataIngredients, "bases", ingredients[i][0], end);
      }
    }
  }
};



function giveInfromation(){
  var line1 = "";
  var line2 = "";
  for(var i=0; i<dataIngredients.length; i++){
    line1 = line1 + dataIngredients[i][0].vitamin + ", ";
    line2 = line2 + dataIngredients[i][0].mineral + ", ";
  }
  $("#vitamin").text(line1);
  $("#mineral").text(line2);
};
function mixIngredients(){
  var fillGlass = $(".glass-content");
  var classArray = ["fill1", "fill2", "fill3", "fill4"]
  var j = 3;
  for(var i=0; i<dataIngredients.length; i++){

    if((dataIngredients.length === 3) && ((dataIngredients[i][0].group) === "bases")){
      console.log("jestem");
      (fillGlass[j]).classList.add(classArray[i]);
      classArray[i];
      var color = dataIngredients[i][0].color;
      (fillGlass[j]).style.backgroundColor = color;
      j--
    }
    (fillGlass[j]).classList.add(classArray[i]);
    classArray[i];
    var color = dataIngredients[i][0].color;
    (fillGlass[j]).style.backgroundColor = color;
    j--;
  }
    choosefinalColor();
    $(".glass").delay(3200).addClass("shake");

    $(".glass-content-up").addClass("fill-big").css("background-color", finalColor);
    // $(".glass-content-big").delay(3200).css("background-color", "red");
    // fillGlass.delay(3200).addClass("fill5");
    setTimeout(function( ) {
    $(".gc1").removeClass("fill1 fill2 fill3 fill4");
    $(".gc2").removeClass("fill1 fill2 fill3 fill4");
    $(".gc3").removeClass("fill1 fill2 fill3 fill4");
    $(".gc4").removeClass("fill1 fill2 fill3 fill4");
    $(".straw").css("display","block");
    $(".straw").css("left", strawLeft);
    // $(".infromation-mix").css("left", informationMixLeft);
    // $(".straw").addClass("straw-visible");
    $(".information-mix").css("display", "block");
    $(".information-mix").animate({
      left: 0
    },800);
    $(".straw").animate({
      left: 62
    }, 800);
    giveInfromation();

  }, 7200)
};

function choosefinalColor(){
  var white = -1;
  var orange = -1;
  var red = -1;
  var blue = -1;
  var yellow = -1;
  var colorCode = [];
  for(var i =0; i<dataIngredients.length; i++){
    colorCode.push(dataIngredients[i][0].colorGroup)
  }
  white = colorCode.indexOf("white");
  orange = colorCode.indexOf("orange");
  red = colorCode.indexOf("red");
  blue = colorCode.indexOf("blue");
  yellow = colorCode.indexOf("yellow");
  if(white >= 0){
    if(red >=0 && yellow>=0 && blue <0){
      finalColor = "#efa17f";
    }else if(red>=0 && blue >= 0){
      finalColor = "#ab5d72";
    }else if(red>=0 && yellow<0 && blue<0){
      finalColor = "#ec929b";
    }else if(blue>=0) {
      finalColor = "#7d69b1";
    }else{
      finalColor = "#f8e994";
    }
  }
  if(orange>=0){
    if(red>= 0 && blue>=0){
      finalColor = "#b2336e";
    }else if(red>=0 && blue<0){
      finalColor = "#f27911";
    }else if(blue>=0){
      finalColor = "#8c976e";
    }else{
      finalColor = "#f0cc34";
    }
  }
};

closeMixBtn.on("click", function(){
  blockBtns = false;
  countBase = 3;
  countFruit = 9;
  setMixInformationPosition();
  $(".information-mix").css("display", "none");
  $(".straw").css("display","block");
  $(".glass").removeClass("shake");
  $(".glass-content-up").removeClass("fill-big").css("background-color", "");
  $(".glass-content-big").find("glass-content").each(function(){
    console.log("usuwam background color");
    $(this).css("background-color","");
    $(this).css("height", "0");
  });

  dataIngredients = [];
  // $('[class^="fill"]').removeClass();
  $(".container-glass-items").find(".item").each(function(){
    moveIngredients($(this));
  })
});

});
