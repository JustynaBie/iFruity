$(function(){

  var hamburger = $("#hamburger");
  var fruits =   $(".container-fruits-items").find(".item");
  var base = $(".container-base-items").find(".item");
  var countFruit = $(".container-fruits-items").find(".item").length;
  var countBase = $(".container-base-items").find(".item").length;
  var mixBtn = $(".mix-btn"); //button which is for start mixing coctails
  //variable to store objects ingredients for mix fruity
  var dataIngredients = []; //array for data about ingredients from mix section
  var closeMixBtn = $(".close-info-mix "); //button to close information window which appear after mixing coctail
  var dataAboutUs = []; // areay for data about us
  var aboutUs = false; //variable to send to ajax to recognise the section
  //variable to block onclick in fruits, bases and mix btns
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



  // function to change position from which the straw and information-mix panel at the bggining
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

  // function to change position from which the straw and information-mix starts animation andput them in this position
   $(window).resize(function(){
     if(blockBtns === false){
         setMixInformationPosition();
     }
   });

  //  addListener to change display where it is mobile and put containerMix-where fruits are waiting to be mixed to the other place
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

 //addListener when the size of window is lees than 600px change menu for hamburger panel
 //and make it fixed and remove fixed from header, change a href from header to section-mix
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
        menu.find("a").first().attr("href", "#header");
      }else{
        $("#hamburger").css("display", "none");
        $("#hamburger").css("position", "absolute");
        menu .css("display", "block");
        menu.css("position", "");
        menu.find("a").first().attr("href", "#section-mix");
      if(menu .hasClass("show-menu")){
         menu .removeClass("show-menu");
         $("nav").find("li").removeClass("show-li");
      }
     }
    }
  };
  checkSize();

  //when click on hamburger menu is viisble
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
   $(".container-glass-items").find(".item").each(function(){    //loop over all ingredients which are waiting to be mixed
     if($(this).hasClass("fruit")){
        var itemIngredient = [$(this).data("fruit"),"fruits"]; //if ingredients is a fruit array with name of ingredients and name of group is put in the variable
     }else {
        var itemIngredient = [$(this).data("base"), "bases"];
     }
     ingredients.push(itemIngredient); //variable with name of fruit or base and name of group is push to the array
   });
   return ingredients.reverse(); //change orden of ingredients to be the same as was choosen
  };

//function which used ajax to send json to obtain datas about from database
  function getIngredientsData(array, id, name, end, aboutUs){
    var urlServer = "http://localhost:3000/";
    $.ajax({
      url: urlServer + id + "?name=" + name,
      type: "GET",
      dataType: "json"
    }).done(function(response){
      array.push(response);

      //when the last ingredient came the mixIngredients function starts
      if(end === true){
        mixIngredients();
      }
      //if enquiry was from section aboutUs
      if(aboutUs === true){
        displayAboutUs();
      }
    }).fail(function(error){
       console.log("error");
    })
  };

//mix button ad event on click
  mixBtn.on("click",function(){
    if(blockBtns === false){ //checked if it was clicek before and it is blocked
      mixBtnClicked();
    }
  });

 //when button mix is not blocked this function starts
  function mixBtnClicked(){
    if(($(".container-glass-items").find(".item").length > 2) && ($(".container-glass-items").find(".base").length === 1)){
      mixBtn.addClass("mix-press"); //change display of button mix
      blockBtns = true; //block mix button
      var ingredients = []; //array for collect data from ingredients to be mixed

      takeIngredients(ingredients);

      for(var i=0; i<ingredients.length; i++){
        var end = false;
        if(i === ingredients.length-1){
          end = true; //when last ingredients is taken variable and chaneg to true to say ajax to start to run other function
        }

        if(ingredients[i][1] === "fruits"){
          //call function with ajax for fruits
          getIngredientsData(dataIngredients, "fruits", ingredients[i][0], end);
        }else{
          //call function with ajax for bases
          getIngredientsData(dataIngredients, "bases", ingredients[i][0], end);
        }
      }
    }
  };

//print in information pane information about fruits from coctail for mix section or about one fruits from section about-us
function giveInformation(array, section){
  var line1 = "";
  var line2 = "";
  for(var i=0; i<array.length; i++){
    line1 = line1 + array[i][0].vitamin + ", ";
    line2 = line2 + array[i][0].mineral + ", ";
  }
  if(section === 1){
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

//function for mixing ingredients
function mixIngredients(){
  var fillGlass = $(".glass-content"); //small containers parts of glass withh will be filled
  var classArray = ["fill1", "fill2", "fill3", "fill4"] //array with css clases with animation which fill small containers
  var j = 3;
  for(var i=0; i<dataIngredients.length; i++){

    if((dataIngredients.length === 3) && ((dataIngredients[i][0].group) === "bases")){
      //if only 3 ingredients are choosen base will be put two times, so the color of base is put to times, one in this if
      (fillGlass[j]).classList.add(classArray[i]);
      classArray[i];
      var color = dataIngredients[i][0].color;
      (fillGlass[j]).style.backgroundColor = color;
      j--
    }
    //add class fill to small containers
    (fillGlass[j]).classList.add(classArray[i]);
    classArray[i];
    var color = dataIngredients[i][0].color;
    (fillGlass[j]).style.backgroundColor = color; // give the fruit color to the collor of fill class (small containers)
    j--;
  }
    chooseFinalColor();
    //add class shake to the glass
    $(".glass").delay(3200).addClass("shake");
   //add class with animation and final color to the bigger container which will be visible in the end
    $(".glass-content-up").addClass("fill-big").css("background-color", finalColor);

    //function which where shaking animation is finshed
    setTimeout(function( ) {
      //remove class with colors from small containers
    $(".gc1").removeClass("fill1 fill2 fill3 fill4");
    $(".gc2").removeClass("fill1 fill2 fill3 fill4");
    $(".gc3").removeClass("fill1 fill2 fill3 fill4");
    $(".gc4").removeClass("fill1 fill2 fill3 fill4");
    //change straw to be block
    $(".straw").css("display","block");
    $(".straw").css("left", strawLeft);
    //adding class with wave effect
    $(".glass-content-wave").addClass("wave-moving");
    $(".glass-content-wave").css("background-color", finalColor);


    if(mobile === true){
      //for mobiles and smaller width then 600px only straw is animated and second information block appear
      $(".information-mix-mobile").css("display", "block");
      $(".straw").animate({
        left: 62
      }, 800);

    }else{
      //animation of straw and first information block appear
      var moveLeft = $(".container-fruits").offset().left;
      $(".information-mix").css("display", "block");
      $(".information-mix").animate({
        left: moveLeft
      },800);
      $(".straw").animate({
        left: 62
      }, 800);
    }
   //function which print all information about ingredients in information block
    giveInformation(dataIngredients, 1);

  }, 7200)
};

//function which base on taken fruits code-color will find proper color of coctail
function chooseFinalColor(){
  //code colors at the beggiing has value -1 which mean not find
  var white = -1;
  var orange = -1;
  var red = -1;
  var blue = -1;
  var yellow = -1;
  //array to put code colors from all ingredients
  var colorCode = [];
  //putting code colors in array
  for(var i =0; i<dataIngredients.length; i++){
    colorCode.push(dataIngredients[i][0].colorGroup)
  }
  //checking if in array is one this code colors
  white = colorCode.indexOf("white");
  orange = colorCode.indexOf("orange");
  red = colorCode.indexOf("red");
  blue = colorCode.indexOf("blue");
  yellow = colorCode.indexOf("yellow");
  //assiging final coctail color base of find code colors
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

//add event for closing button in mix-information  panel
closeMixBtn.on("click", function(){
  //change variables which block posibility to choose fruits bases and mixt button when mixing animation is working
  blockBtns = false;
  countBase = 3; // variable which count bases back to 3
  countFruit = 9;// variable which count bases back to 9
  //remove class mix-pres from button mix
  $(".mix-btn").removeClass("mix-press");
  //call function which put straw and information panel out of screen
  setMixInformationPosition();
  //remove all characteristic whick was put to elements during mix function
  $(".information-mix").css("display", "none");
  $(".information-mix-mobile").css("display", "none");
  $(".straw").css("display","none");
  $(".glass").removeClass("shake");
  $(".glass-content-up").removeClass("fill-big").css("background-color", "");
  $(".glass-content-big").find("glass-content").each(function(){
    $(this).css("background-color","");
    $(this).css("height", "0");
  });
  $(".glass-content-wave").removeClass("wave-moving");
  $(".glass-content-wave").css("background-color","");

  dataIngredients = [];

  $(".container-glass-items").find(".item").each(function(){
    moveIngredients($(this)); //move ingredients to begging containers
  })
});

//give fruits in section about us event on click
$(".about-us").find(".item").on("click",function(){
  if(aboutUs === false){
    var item = $(this);
    aboutUs = true;
    var name = "";
    var id = "";
    var end = false;

    // gave the choosen item postion absolue and make it bigger to display over information-about -us panel
    item.css("z-index", "21").css("position", "absolute").css("top", "2%").css("left","2%").css("zoom","150%");
    //class up is give to item to recignise it after, when it backs to normal position  and remove all characteristic
    item.addClass("up");

    //check if item is me or fruit
    if(item.hasClass("item-me")){
      displayAboutMe()
    }else {
      if(item.hasClass("fruit")){
        id = "fruits";
        name = item.data("fruit");
      } else {
        id = "bases";
        name = item.data("base");
      }
        getIngredientsData(dataAboutUs, id, name, end, aboutUs);
    }
    }

});

//function which print information about fruits
  function displayAboutUs(){
    var name = dataAboutUs[0][0].name;
    var text = "";
    $(".information-aboutUs").css("display", "block");
    $(".subtitle").text("I have");
    $(".information-first").text("Vitamins:");
    $(".information-second").text("Minerals:");
    if(name === "apple" || name === "orange"){
        $(".fruit-name").text("an " + name);
    }else{
        $(".fruit-name").text("a " + name);
    }
    giveInformation(dataAboutUs, 2);
  };

//function which print information about me
  function displayAboutMe(){
    $(".information-aboutUs").css("display", "block");
    $(".fruit-name").text("Justyna");
    $(".subtitle").text("The web page is a final project in cooding bootcamp 'Become Front-End Developer'");
    $(".information-first").text("The bootcam was organised by Coders Lab in Warsaw.");
    $(".information-second").text("In this project I used: HTML, CSS, jQuery, JavaScript, Sass, Gulp, Git. I send ajax query to external server to obtain infromation about fruits and bases to coctails. I dont't use any plugs.");
    $(".vitamin-about").text("");
    $(".mineral-about").text("The project is responsive, it is possible to see it in last versions of browsers: EI, Chrome, Firefox, Opera and mobile devices.");
  };

//event on click on close info-about-us button which remove all give characteristic
  $(".close-info-aboutUs").on("click", function(){
    aboutUs = false;
    $(".information-aboutUs").css("display", "none");
    dataAboutUs = [];
    $(".about-us").find(".up").removeClass("up").css("z-index", "").css("position", "relative").css("zoom","").css("top", "").css("left","");

  });
});
