<?PHP
  //header('Access-Control-Allow-Origin: *');
  $file = file_get_contents(__DIR__.'/../js/ifruity.json');
  $fruits = json_decode($file);
  // var_dump($fruits);
  $id = (int)$_GET['id'];
  $type = $_GET['type'];
  $fruit = getFruitById($fruits->$type, $id);
  echo json_encode($fruit);

  function getFruitById($fruits, $id){
     foreach($fruits as $fruit) {
       if($fruit->id === $id) {
         return $fruit;
       }
     }
  }
?>
