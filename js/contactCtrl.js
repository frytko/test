/*** app ** Description*/

angular
	.module('app')
	.controller('contactCtrl', ['$scope','items','$http', function($scope, items, $http){

	$scope.items = items;
	$scope.todos = [
        {todoItem: 'walk the dog', done: false},
        {todoItem: 'feed the cat', done: false}
    ];
    
    $scope.returnTotalTodos = function () {
        console.log ('returnTotalTodos executes');
        return $scope.todos.length;
    }
 
 
    $scope.addNewTodo = function () {
         console.log ('addNewTodo executes');
                 var nothing = $scope.todos.length;
                 var nothing2  = nothing;
        if ($scope.newTodoText.length){
            $scope.todos.push ( {todoItem: $scope.newTodoText , done: false});
            $scope.newTodoText = '';
        }
    }
 
    $scope.clearFinishedTodos = function () {
        console.log ('clearFinishedTodos executes');
        $scope.todos = _.filter($scope.todos, function (todo) {return !todo.done})
    }

    $scope.dataToPhp = function () {
    	console.log ('post dataToPhp');
		$http.post('test/test.php', {'name': $scope.todos, 'command': 'load' }
                ).success(function(data, status, headers, config) {
        	        //console.log (data);
        			$scope.items = data;
                }).error(function(){
                    console.log ('error');
                    })
    }

    $scope.addNewItem = function (item){
    	$scope.items.push( {name: item.name})
    }

	}]);