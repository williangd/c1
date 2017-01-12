var app = angular.module('myApp', []);

var MainController = function($scope,$http) {
    var onComplete = function(response) {
        $scope.user = response.data;
        $http.get($scope.user.repos_url)
            .then(onRepos, onError);
        $scope.error = "";
    };

    var onRepos = function(response) {
        $scope.repos = response.data;
    }

    var onError = function(reason) {
        $scope.error = "Deu ruim!"
    }
    
    $scope.search = function(username) {
        $http.get("https://api.github.com/users/" + username)
        .then(onComplete, onError);
    }
    
    $scope.username = "angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";

};

app.controller('MainController', ['$scope','$http', MainController]);