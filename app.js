var app = angular.module('myApp', []);

var MainController = function($scope,github,$interval,$log,$anchorScroll,$location) {
    var onComplete = function(data) {
        $scope.user = data;
        github.getRepos($scope.user).then(onRepos, onError);
        $scope.error = "";
    };

    var onRepos = function(data) {
        $scope.repos = data;
        $location.hash("userDetails");
        $anchorScroll();
    };

    var onError = function(reason) {
        $scope.error = "Deu ruim!"
    };
    
    var decrementCountdown = function(){
        $scope.countdown -= 1;
        if($scope.countdown < 1) {
            $scope.search($scope.username);
        }
    };
    var countdownInterval =null;
    var startCountdown = function() {
        countdownInterval =  $interval(decrementCountdown, 1000, $scope.countdown);
    }

    $scope.search = function(username) {
        $log.info("Searching for " + username);
        github.getUser(username).then(onComplete, onError);
        if(countdownInterval) {
            $interval.cancel(countdownInterval);
            $scope.countdown = "";
        }
    };
    
    $scope.username = "angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    startCountdown();

};

app.controller('MainController', MainController);