angular
	.module('app')
	.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {


//////////////poczatek/////////
//wwwwwwwwwwwwwwwwww/wwwwwwwwwww
    $phpPath = 'php/';
    $scope.todosDB =[];					
	$scope.todos = [
        {id: 1, name: 'walk the dog', done: false, deleted: false},
        {id: 2, name: 'feed the cat', done: false, deleted: false}
    ];
    $scope.change =[];
    

    $scope.returnTotalTodos = function () {
        console.log ('returnTotalTodos executes');
        return $scope.todos.length;
    }
 
 
    $scope.addNewTodo = function () {
        console.log ('addNewTodo executes');
//        $scope.todosDB = $scope.todos;
   //              var nothing = $scope.newTodos.length;
  //               var nothing2  = nothing;
        if ($scope.newTodoText.length){
            $scope.todos.push ( {
                id:"new",
                name:$scope.newTodoText,
                description:$scope.newDescription,
                done: false,
                deleted: false
            });
            // $scope.change.push ( {
            //     id:"new",
            //     name:$scope.newTodoText,
            //     description:$scope.newDescription,
            //     done: false,
            //     deleted: false
            // });

            $scope.newTodoText = '';
            $scope.newDescription = '';
        }
 //       $scope.todos = $scope.todosDB.concat($scope.change);
    }

    $scope.hideFinishedTodos = function () {
        console.log ('hideFinishedTodos executes');
        $scope.todos = _.filter($scope.todos, function (todo) {return !todo.deleted})
    }

    $scope.clearFinishedTodos = function () {
        console.log ('clearFinishedTodos executes');
//        $scope.todos = _.filter($scope.todos, function (todo) {return !todo.done})

        if ($scope.todos){
            $scope.todos = _.filter(
                $scope.todos, function (todo) {
                    return !todo.deleted
                })
        }
    }
///////////////////////////   Data Base //////////////////////// 
    $scope.loadDBTodos = function () {
        console.log ('loadDBTodos executes');
        document.cookie = "test=test";
        $http.post($phpPath+'test.php', {'todos': $scope.todos, 'command': 'load' }
            ).success (function (data) {
//                console.log (data)
                $cookie = document.cookie;
                console.log($cookie);
                if (data.length){
 
//-----------------  ta czesc nie DZIALA bladny kod ze skryptu PHP -------
/*
*/
//-----------------  ta czesc nie DZIALA bladny kod ze skryptu PHP -------
                    $scope.todos = data;

//// -------------  zamienic na angular.forEach()                    
                    for (var i = data.length - 1; i >= 0; i--) {
//              console.log (data[i]);
                        if (data[i].deleted==1) {
                            data[i].deleted=true
                            } else {
                                data[i].deleted=false;
                        }//end if data[i]
                    }//end for i = data.length_
/// --------------  end zamienic na forEach
//
//              console.log (data[1].deleted);
                }
            }
            ).error (function (data){
                console.log('error')
            })

        return $scope.todos.length;
    }
    
    $scope.saveTodosToDB = function () {
        console.log ('saveTodosToDB executes');

        if ($scope.todos){
            $scope.todosToDB = _.filter(
                $scope.todos, function (todo) {
                    return (todo.id == "new")
                })
        }
        console.log($scope.todosToDB);
        $http.post($phpPath+'test.php', {'todos': $scope.todosToDB, 'command': 'save' }
            ).success (function (data) {
                console.log (data);
                $scope.loadDBTodos();
            }
            ).error (function (data){
                console.log('error')
            })

    }

    $scope.deleteTodos = function($todo){
        console.log('deleteTodos executes');
 //       console.log($todo);
        $http.post($phpPath+'test.php', {'todo': $todo, 'command': 'delete'}
            ).success (function(data){
                console.log(data);
                $scope.loadDBTodos();
            }
            ).error (function(data){
                console.log('delete todo http post error')
            })
    }

    $scope.updateTodos = function(){
        console.log ('updateTodos executes');
        console.log ($scope.todos);
        $http.post($phpPath+'test.php', {'todos': $scope.todos, 'command': 'update' }
            ).success (function (data) {
                console.log (data);
                $scope.loadDBTodos();
            }
            ).error (function(data){
                console.log('update todos http post error')
            })
    }
////////wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww*/
}]);
//////////////koniec/////////

