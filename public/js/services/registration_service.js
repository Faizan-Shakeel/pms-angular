var app = angular.module('registrationServiceModule',[]);

app.service('registrationService', ['$http', '$location', '$rootScope' ,function($http, $location, $rootScope)
{
    var register = function(user)
    {
        var userData = {
            companyName: user.companyName,
            users:{
                    name: user.name,
                    email: user.email,
                    position: 'admin',
                    id: '0u',
                    imageUrl: '',
                    password: user.password,
                }
        };
        $http.post('/register',userData).success(function(data)
        {
           $location.url('/login');
        })
                .error(function(err)
        {
           console.log('error in registeration process ' + err); 
        });            
    };
    
    return {register: register};
    
}]);