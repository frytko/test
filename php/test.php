<?php

class dbconnect
{
// private	$dbUser = 'test';
// private	$dbPass = 'test';
	private	$dbUser = ";
	private	$dbName = ";
	private	$dbPass = ";
	private	$dbAddress = ";
//	private	$dbAddress = 'localhost';
	private $con;


	public function load(){
		// poprawne odwolanie
		$result = array();
		$con = mysql_connect($this->dbAddress, $this->dbUser, $this->dbPass);
		mysql_select_db($this->dbName, $con);
		$query = mysql_query('SELECT * FROM test');
//		$query = mysql_query("CALL select_test");
		if (!$query){
			die("Could Not Query Database: <br />".mysql_error());
		} 
		while ($row = mysql_fetch_assoc($query)){
//			echo ($row->deleted);
			array_push($result, $row);
//			print ($result);
		}
//			==1
//			) {$result["deleted"]='true';}
//			print_r $row["id"];
				//print_r($result);
		return $result;
	} //end getField();

	public function update ($todos){
		echo ('update todo php');
		// poprawne odwolanie
		$con = mysql_connect($this->dbAddress, $this->dbUser, $this->dbPass);
		mysql_select_db($this->dbName, $con);

//		$query = "UPDATE `test` SET `deleted`=1 WHERE `id`=".$todo["id"].";";
//		print_r($todos);
		$query='';
		foreach ($todos as $todo) {

//				print ("
//					".$todo->id);
		$query = "UPDATE `test` SET `deleted`=". $this->trueFalse($todo->deleted)." WHERE `id`=".$todo->id.";";
//		print($query);
		$q = mysql_query($query);
		}

	}
	private function trueFalse($entry){
		if ($entry > 0) {
			return "true";
		} else {
			return "false";
		}
	}

	public function save($todos){
//		print_r($todos);
		// poprawne odwolanie
		$con = mysql_connect($this->dbAddress, $this->dbUser, $this->dbPass);
		mysql_select_db($this->dbName, $con);

//		INSERT INTO `test` (`name`, `description`) VALUES ('walk', 'dog'), ('feed', 'cat');

		$query='';
			foreach ($todos as $value) {
				$query = "INSERT INTO `test` (`name`, `description`) VALUES ('".$value["name"]."','".$value["description"]."');
				";
//				echo ($query);	
				$q = mysql_query($query);
			}
			//*/
		}

		public function delete($todo){
//			print_r($todo);
			if (!$todo->deleted) {echo ("delete ERROR"); }else{
				echo ("zapis moze byc skasowany");
		$con = mysql_connect($this->dbAddress, $this->dbUser, $this->dbPass);
		mysql_select_db($this->dbName, $con);
//  DELETE FROM `test` WHERE id =33 AND deleted =1				
				$query= "DELETE FROM `test` WHERE id = ".$todo->id." AND deleted =1";
				echo ("skasowano");
				$q = mysql_query($query);
				}
		}


} //end class

$db = new dbconnect;

// $dbconnect = array([
// 	'dbUser' -> 'test',
// 	'dbPass' -> 'test',
// 	'dbAddress' -> 'localhost'
// 	]);


$data = json_decode(file_get_contents("php://input"));

//routing commands
switch ($data->command){
	case "delete":
		echo ("delete from DB");
		$a = $db->delete($data->todo);
		break;
	case "save":
		//echo ("save");
		$todos = array();
		foreach ($data->todos as $todo){
//			print_r($todo);
			array_push($todos, get_object_vars($todo));
		}
//		print_r($todos);

		$a = $db->save($todos);
		break;
	case "load":
		//echo ("getField");
		$a = $db->load();

//		var_dump($_COOKIE['test']);
//		setcookie("test", 'TESTOWE DANE');
		header('Content-Type: application/json');
		echo (json_encode($a));
		break;
	case "update":
		//echo ("getField");
		$todos = array();
//		foreach ($data->todos as $todo){
//			print_r($todo->done);
//			if ($todo->done) array_push($todos, get_object_vars($todo));
//		}
//		print_r($data->todos);
		$a = $db->update($data->todos);
//		echo (json_encode($a));
		break;
	default:
		echo ("php unknown command");
}



//print_r($db->save($data->todos));
?>

