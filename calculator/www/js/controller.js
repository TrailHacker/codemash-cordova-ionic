angular.module('starter')
.controller('CalculatorController', function($scope, $window) {
	var db = $window.PouchDB('db');
	db.get('value').then(function(val){
		$scope.display = val;
	});
	$scope.display = "5*5";
	$scope.needsReset = true;

	$scope.clear = function(){
		$scope.needsReset = false;
		$scope.display = "";
	};

	$scope.equals = function(){
		var expr = $scope.display;
		var parser = new Epsilon.ExpressionParser($scope.display);

		$scope.display = parser.evaluate();
		$scope.needsReset = true;

		db.post(function(response){
			alert('saved');
		});
	};

	$scope.appendToDisplay = function(value){
		if($scope.needsReset)
			$scope.display = value.toString();
		else
			$scope.display += value.toString();
		$scope.needsReset = false;
	};

});
