'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$scope", "data", "$compile", '$sce', '$filter', function ($scope, data, $compile, $sce, $filter) {
  $scope.currentPage = 0;
  $scope.pageSize = 10;


  $scope.sanetizeHTML = function (str) {
    $scope.MytrustedHtml = $sce.trustAsHtml(str);
  }

  data.posts.then(function (result) {
    console.log(result.data);
    window.test = result.data;
    var str = JSON.stringify(result.data);
    str = str.replace(/\"\$\"/g, '"rowData"');
    //console.log(str);
    var posts = JSON.parse(str);

    $scope.posts = posts;
    $scope.numberOfPages = function () {
      return Math.ceil($scope.posts.posts.row.length / $scope.pageSize);
    }
  });
  data.comments.then(function (result) {
    console.log(result.data);
    window.test = result.data;
    var str = JSON.stringify(result.data);
    str = str.replace(/\"\$\"/g, '"rowData"');
    //console.log(str);
    var comments = JSON.parse(str);
    $scope.comments = comments;
  });
}])

.factory('data', function ($http) {
  // var xmlDoc = $http.get("http://localhost:3000/posts");

  // var posts;
  // // console.log(!localStorage.getItem("posts"));
  // // if (!localStorage.getItem("posts")) {

  // //   xmlDoc.then(function (result) {
  // //     localStorage.setItem("posts", result.data);
  // //     console.log(result.data);
  // //     posts = result.data;
  // //   });
  // // } else {
  // //   posts = localStorage.getItem("posts");
  // // }
  //  xmlDoc.then(function (result) {
  //     localStorage.setItem("posts", result.data);
  //     console.log(result.data);
  //     posts = result.data;
  //   });

  //console.log(posts);
  var obj = {
    posts: $http.get("http://localhost:3000/posts"),
    comments: $http.get("http://localhost:3000/comments")
  };



  return obj;
})

// .factory("localStorage", function () {
//   return {
//     set: function (key, value) {
//       localStorage[key] = value;
//     },
//     get: function (key) {
//       localStorage[value];
//     }
//   }
// });
//let's make a startFrom filter
app.filter('startFrom', function () {
  return function (input, start) {
    start = +start; //parse to int
    return input.slice(start);
  }
});