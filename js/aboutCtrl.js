angular
	.module('app')
	.controller('aboutCtrl', ['$scope', '$http', function($scope, $http) {

//environmet shortcuts
    $phpPath = 'php/';

//////////////poczatek/////////
//wwwwwwwwwwwwwwwwww/wwwwwwwwwww					
	$scope.todos = [
        {id: 1, name: 'item name', description: "lorem ipsum description", done: false, deleted: false},
        {id: 2, name: 'another item name', description: "lorem ipsum description", done: false, deleted: false}
    ];
    $     
    $scope.returnTotalTodos = function () {
        console.log ('returnTotalTodos executes');
        return $scope.todos.length;
    }
    
    $scope.addNew = function (){
        console.log("addNew");
    }

    $scope.addNewTodo = function () {
          console.log ('addNewTodo executes');
                 var nothing = $scope.newTodos.length;
                 var nothing2  = nothing;
        if ($scope.newTodoText.length){
            $scope.todos.push ( { name: $scope.newTodoText, description: $scope.newTodoDescription, done: false, deleted: false});
            $scope.newTodoText = '';
            $scope.newTodoDescription = '';
        }
    }
 // ----------------- BUTTON PANEL --------------
    $scope.saveTodos = function () {
        console.log ('saveTodos executes');
        $scope.todos= $scope.todos.concat($scope.newTodos);
        console.log ($scope.todos);
        $scope.newTodos = [];
    }

    $scope.saveDBTodos = function () {
        console.log ('saveDB-Todos executes');
        //console.log $scope.newTodos;

        $http.post('test/test.php', {'todos': $scope.newTodos, 'command': 'save' }
            ).success (function (data) {
                console.log (data)
            }
            ).error (function (data){
                console.log('error')
            });
        

    }

    $scope.clearFinishedTodos = function () {
        console.log ('clearFinishedTodos executes');
        $scope.todos = _.filter($scope.todos, function (todo) {return !todo.done})
    }
 // --END--------------- BUTTON PANEL END -----------END---
////////wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww*/
}]);
//////////////koniec/////////

