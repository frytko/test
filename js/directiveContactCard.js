angular.module('app.directives.contactCard', [])
.directive('contactCard', function(){
	return{
		restrict: 'E',
		controller: function($scope){
			alert('controller');
		}
	}

})