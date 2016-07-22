var app = angular.module('myApp',["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider

.when('/',{
  templateUrl:'Home.html',
  controller :'HomeController'
})
.when('/signin',{
  templateUrl:'signin.html',
  controller :'validateCtrl'
})
.when('/Register', {
  templateUrl: 'Register.html',
  controller: 'RegisterController',
  })
.when('/overview',{
  templateUrl:'overview.html',
   controller:'OverviewController'
})
.when('/aboutus',{
  templateUrl:'aboutus.html',
  controller:'AboutusController'
  })
.when('/contact',{
  templateUrl:'contact.html',
  controller:'contactController'
  })

.when('/Reminder',{
    templateUrl:'Reminder.html',
    controller:'ReminderController'
    })
    .when('/Alarm',{
      templateUrl:'Alarm.html',
      controller:'AlarmController'
      })
    .when('/Calendar',{
      templateUrl:'Calendar.html',
      controller:'CalendarController'
      })
      .when('/Blog',{
        templateUrl:'Blog.html',
        controller:'BlogController'
        })
        .when('/ManageTask',{
          templateUrl:'ManageTask.html',
          controller:'ManageTaskController'
          })
.otherwise({redirectTo:'/'});
  });

app.controller('HomeController',function($scope){
 $scope.message='';
});
app.controller('contactController',function($scope){
 $scope.message='';
});
app.controller('OverviewController',function($scope){
 $scope.message='';
});

app.controller('signinController',function($scope){
  $scope.message='';
});
app.controller('ManageTaskController',function($scope){
  $scope.message='';
});
app.controller('BlogController',function($scope){
  $scope.message='';
});
app.controller('CalendarController',function($scope){
  $scope.message='';
});
app.controller('AlarmController',function($scope){
  $scope.message='';
});
app.controller('ReminderController',function($scope){
  $scope.message='';
});
app.controller('RegisterController',function($scope){
  $scope.message='';
});
app.controller('validateCtrl', function($scope,$location,$rootScope) {
    $scope.username = '';
    $scope.password = '';
    $scope.Function = function()
  {
      if($scope.username == 'DEEP' && $scope.password=='RANJAN'){
        $rootScope.signin = true;
      $location.path('/ManageTask');
      }
      else{
        alert('Invalid login');
      }
    }
});
app.controller('ManageTaskController', function($scope,$location) {
  $scope.products = ["ManageTask"];
$location.path('/ManageTask');
});
app.controller('RegisterController', function($scope,$location) {
  $scope.products = ["Register"];
$location.path('/ManageTask');
});

app.controller("AboutusController", function($scope) {
$scope.products = ["Work"];
$scope.addTask = function () {
    $scope.errortext = "";
    if (!$scope.addMe) {return;}
    if ($scope.products.indexOf($scope.addMe) == -1) {
        $scope.products.push($scope.addMe);
    } else {
        $scope.errortext = "The item is already in your shopping list.";
    }
}
$scope.removeItem = function (x) {
    $scope.errortext = "";
    $scope.products.splice(x, 1);
}
});
app.controller('MainSchedulerCtrl', function($scope) {
  $scope.events = [
    { id:1, text:"Task A-12458",
      start_date: new Date(2013, 10, 12),
      end_date: new Date(2013, 10, 16) },
    { id:2, text:"Task A-83473",
      start_date: new Date(2013, 10, 22 ),
      end_date: new Date(2013, 10, 24 ) }
  ];

  $scope.scheduler = { date : new Date(2013,10,1) };

});

app.directive('dhxScheduler', function() {
  return {
    restrict: 'A',
    scope: false,
    transclude: true,
    template:'<div class="dhx_cal_navline" ng-transclude></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',



    link:function ($scope, $element, $attrs, $controller){

      if (!$scope.scheduler)
        $scope.scheduler = {};
      $scope.scheduler.mode = $scope.scheduler.mode || "month";
      $scope.scheduler.date = $scope.scheduler.date || new Date();


      $scope.$watch($attrs.data, function(collection){
        scheduler.clearAll();
        scheduler.parse(collection, "json");
      }, true);

      //mode or date
      $scope.$watch(function(){
        return $scope.scheduler.mode + $scope.scheduler.date.toString();
      }, function(nv, ov) {
        var mode = scheduler.getState();
        if (nv.date != mode.date || nv.mode != mode.mode)
          scheduler.setCurrentView($scope.scheduler.date, $scope.scheduler.mode);
      }, true);


      $scope.$watch(function() {
        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
      }, function() {
        scheduler.setCurrentView();
      });


      $element.addClass("dhx_cal_container");


      scheduler.init($element[0], $scope.scheduler.date, $scope.scheduler.mode);
    }
  }
});

app.directive('dhxTemplate', ['$filter', function($filter){
  scheduler.aFilter = $filter;

  return {
    restrict: 'AE',
    terminal:true,

    link:function($scope, $element, $attrs, $controller){
      $element[0].style.display = 'none';

      var template = $element[0].innerHTML;
      template = template.replace(/[\r\n]/g,"").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function(match, prop){
        if (prop.indexOf("|") != -1){
          var parts = prop.split("|");
          return "\"+scheduler.aFilter('"+(parts[1]).trim()+"')(event."+(parts[0]).trim()+")+\"";
        }
        return '"+event.'+prop+'+"';
      });
      var templateFunc = Function('sd','ed','event', 'return "'+template+'"');
      scheduler.templates[$attrs.dhxTemplate] = templateFunc;
    }
  };
}]);
