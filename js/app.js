$(function(){

  var hamburger = $("#hamburger");
  var fruits =   $(".container-fruits-items").find(".item");
  var base = $(".container-base-items").find(".item");
  var countFruit = $(".container-fruits-items").find(".item").length;
  var countBase = $(".container-base-items").find(".item").length;
  var mixBtn = $(".mix-btn");
  //variable to store objects ingredients for mix fruity
  var dataIngredients = []; //array for data about ingredients form mix seccion
  var closeMixBtn = $(".close-info-mix ");
  var dataAboutUs = []; // areay for data about us
  var aboutUs = false; //variable to send to ajax to recognise the seccion
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
  //variable to check if we are in mobile or screen display
  var mobile = false;



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

  //  addListener to change display where it is mobile
       function test_match(){
         var mW = window.matchMedia("(max-width: 600px)");
         mW.addListener(WidthChange);
         WidthChange(mW);

         function WidthChange(mW){
           if(mW.matches){
             var containerMix = $(".container-glass-items").detach();
             $(".container-fruits").find(".container-move-btn").before(containerMix);
             mobile = true;

           }else{
             var containerMix = $(".container-glass-items").detach();
             $(".container-glass").append(containerMix);
             mobile = false;
           }
         }
       }
     test_match();

  function checkSize(){
   var maxWidth = window.matchMedia("(max-width: 600px)");
   maxWidth.addListener(WidthChange);
   WidthChange(maxWidth);


   function WidthChange(maxWidth){
     var menu = $("nav");
     if(maxWidth.matches){
       $("#hamburger").css("display", "block");
      $("#hamburger").css("position", "fixed");
          menu .css("display", "none");
          menu.css("position", "fixed");
     }else{
       $("#hamburger").css("display", "none");
       $("#hamburger").css("position", "absolute");
       menu .css("display", "block");
       menu.css("position", "");
      if(menu .hasClass("show-menu")){
         menu .removeClass("show-menu");
         $("nav").find("li").removeClass("show-li");
      }
     }
   }
};
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



  //function to remove position fixed, class from item when it is adden to the new site in DOM
  function clearItem(item){
    item.css("position", "");
    item.css("top", "");
    item.css("left", "");
    item.removeClass("fruit-around");
  };

function moveIngredients(item){
  //takes all variables
  var containerFruits = $(".container-fruits-items"); //container where fruits are at the beginning
  var containerBase = $(".container-base-items"); //container where bases are at the beginning
  var containerMix = $(".container-glass-items"); //container belowe the glass  where fruits and a base are collected to be mixed

  //variables with offset left and top of above variables
  var containerMixTop = containerMix.offset().top;
  console.log(containerMixTop);
  var containerMixLeft = containerMix.offset().left;

  var containerFruitsLeft = containerFruits.offset().left;
  var containerFruitsTop = containerFruits.offset().top;
  var containerBaseLeft = containerBase.offset().left;
  var containerBaseTop = containerBase.offset().top;

  //vairables to store offsets of the clicked fruits or base
  var itemTop = item.offset().top;
  var itemLeft = item.offset().left;
  var itemWidth = item.css("width"); //width of fruit or base


  item.css("top", itemTop + "px"); //the position of offset().top is put as a position top of element
  item.css("left", itemLeft + "px"); //the position of offset().left is put as a position left of element
  item.css("position", "fixed"); // give element position fixed to enable to moving it
  item.css("z-index", "10"); // z-index to make element visible where it is moving
  item.addClass("fruit-around"); //animation with rotation

  //if check where the clicked element is located, if is located in fruit or base container it moves it to container where  fruits
  //and a base are collected to be mixed
  if(item.parent().hasClass("container-fruits-items") || item.parent().hasClass("container-base-items")){
    item.animate({
        left:  containerMixLeft + "px",
        top: containerMixTop + "px",
    }, 800, function(){
      //element is remove and put in the DOM in the new site in the container where  fruits and a base are collected to be mixed
      var newSite = item.detach();
      containerMix.prepend(newSite);
      clearItem(newSite);
    });
  }
  /// else if check if the element which is in the mix container are fruits
  //if so it is moved back to the container where fruits where at the beggining
  //the second if check how many fruits in the container to calculate where exactly move the fruit
  else if(item.hasClass("fruit")){
    if($(".container-fruits-items").find(".item").length === 7){
      containerFruitsLeft += parseInt(itemWidth);
    }else if($(".container-fruits-items").find(".item").length === 8){
        containerFruitsLeft += 2*(parseInt(itemWidth));
    }
    //moving back animation to the proper site
    item.animate({
      left: containerFruitsLeft + "px",
      top: containerFruitsTop + 2*(parseInt(itemWidth)) + "px",
    }, 800, function(){
      var newSite = item.detach();
      containerFruits.append(newSite);
      clearItem(newSite);
    });
  }else{
    //moving back aniation for bases
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

//add event to fruits which are stored in the beggining in the container-fruits-items to be choosen yo mix
fruits.on("click", function(){
  //if check variable blockBtns, it is true only where coctail is mixing and then
  //it is not possible to  choose any new fruits items to be mixed
  if(blockBtns === false){
    //if checks how many fruits are in the container,  variable countFruit count fruits in the beggining container at the beggining is 9
    // this if eneble only chose 2-3 fruits , so countFruit has to be bigger than 6
    if(countFruit > 6 && ($(this).parent().hasClass("container-fruits-items"))){
      countFruit --;
      moveIngredients($(this));
    }else if($(this).parent().hasClass("container-glass-items")){
      countFruit ++;
      moveIngredients($(this))
    }
  }
});

//add event to bases which are stored in the beggining in the container-base-items to be choosen yo mix
base.on("click", function(){
  //if check variable blockBtns, it is true where coctail is mixing and then
  //it is not possible to  choose any new base item to be mixed
  if(blockBtns === false){
    //if checks how many bases are in the container,  variable countBase count bases in the beggining container at the beggining is 3
    // this if eneble only chose 1 base , so countBase has to be bigger than 2
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

// http://stackoverflow.com/questions/13912775/jquery-deferred-getting-result-of-chained-ajax-calls
//http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when

function getIngredientsData(array, id, name, end, aboutUs){
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
    if(aboutUs === true){
      displayAboutUs();
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
    mixBtn.addClass("mix-press");
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


function giveInfromation(array, seccion){
  var line1 = "";
  var line2 = "";
  for(var i=0; i<array.length; i++){
    line1 = line1 + array[i][0].vitamin + ", ";
    line2 = line2 + array[i][0].mineral + ", ";
  }
  if(seccion === 1){
    $(".vitamin").text(line1);
    $(".mineral").text(line2);
  }else {
    $(".vitamin-about").text(line1);
    $(".mineral-about").text(line2);
  }

  // if(mobile === true){
  //     $("body, html, document").scrollTop( $("#glass-mobile").offset().top );
  //
  // }
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
    $(".glass-content-wave").addClass("wave-moving");
    $(".glass-content-wave").css("background-color", finalColor);
    // $(".infromation-mix").css("left", informationMixLeft);
    // $(".straw").addClass("straw-visible");

    if(mobile === true){
      $(".information-mix-mobile").css("display", "block");
      $(".straw").animate({
        left: 62
      }, 800);

    }else{
      $(".information-mix").css("display", "block");
      $(".information-mix").animate({
        left: 0
      },800);
      $(".straw").animate({
        left: 62
      }, 800);
    }

    giveInfromation(dataIngredients, 1);

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
  $(".mix-btn").removeClass("mix-press");
  setMixInformationPosition();
  $(".information-mix").css("display", "none");
  $(".information-mix-mobile").css("display", "none");
  $(".straw").css("display","block");
  $(".glass").removeClass("shake");
  $(".glass-content-up").removeClass("fill-big").css("background-color", "");
  $(".glass-content-big").find("glass-content").each(function(){
    $(this).css("background-color","");
    $(this).css("height", "0");
  });
  $(".glass-content-wave").removeClass("wave-moving");
  $(".glass-content-wave").css("background-color","");

  dataIngredients = [];
  // $('[class^="fill"]').removeClass();
  $(".container-glass-items").find(".item").each(function(){
    moveIngredients($(this));
  })
});

//give fruits in seccion about us event on click
$(".about-us").find(".item").on("click",function(){
  if(aboutUs === false){
    var item = $(this);
    aboutUs = true;
    var name = "";
    var id = "";
    var end = false;

    if(item.hasClass("fruit")){
      id = "fruits";
      name = item.data("fruit");
    } else {
      id = "bases";
      name = item.data("base");
    }
      getIngredientsData(dataAboutUs, id, name, end, aboutUs);
  }
});

  function displayAboutUs(){
    var name = dataAboutUs[0][0].name;
    var text = "";
    if(name === "apple" || name === "orange"){
        $(".fruit-name").text("an " + name);
    }else{
        $(".fruit-name").text("a " + name);
    }
    giveInfromation(dataAboutUs, 2);
  };
});
