var app = angular.module('registrationModule',[]);

app.controller('registrationCtrl', ['registrationService', function(registrationService)
{
   var vm = this;
	
	vm.libMode = 'bootstrap';
   
   vm.register = function(user)
   {
       registrationService.register(user, function()
       {

       });
   };    
}]);