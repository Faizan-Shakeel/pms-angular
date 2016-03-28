var app = angular.module('userProfileModule', ['ngFileUpload']);

app.controller('userProfileCtrl', ['mongoCrudService', '$localStorage', 'Upload', '$rootScope', function(mongoCrudService, $localStorage, Upload, $rootScope)
{
	var vm = this,
		 contactNumber,
		 address,
		 dateOfBirth,
		 email,
		 gender,
		 userProfilePicName,
		 userId = $localStorage.currentUser.users.id;


	vm.updateProfile = function(modal)
	{
		if (modal.numberRequiredFlag)
		{
			contactNumber = {'users.contactNumber': modal.newUserNumber};
			mongoCrudService.updateData(userId, contactNumber);
		}
		else if(modal.dateOfBirthRequiredFlag)
		{
			dateOfBirth = {'users.dateOfBirth': modal.newUserDateOfBirth};
			mongoCrudService.updateData(userId, dateOfBirth);
		}

		else if(modal.genderRequiredFlag)
		{
			gender = {'users.gender': modal.selectedGender};
			mongoCrudService.updateData(userId, gender);
		}
		else if(modal.newPasswordRequiredFlag)
		{
			mongoCrudService.updatePassword(userId, modal.newUserCurrentPassword, modal.userNewPassword);
		}
	};

	$rootScope.uploadProfilePicture = function(file, invalidFiles)
    {console.log(invalidFiles);
        if (file)
        {   
        	mongoCrudService.deleteFile($localStorage.currentUser.users.imageUrl);
            userProfilePicName = userId + $localStorage.currentUser.users.name + file.name;
            file.upload = Upload.upload({
                url: '/uploadProfilePic',
                method: 'POST',
                data: {'file': file , fileName: userProfilePicName}
            }).then(function(res)
            {
               if (res.status == 200)
               {
                	mongoCrudService.removeOldProfilePic($localStorage.currentUser.users.imageUrl, function(res)
                	{
                		$localStorage.currentUser.users.imageUrl = userProfilePicName;
						mongoCrudService.updateData(userId , {'users.imageUrl': userProfilePicName});
                		mongoCrudService.storeProfilePic($localStorage.currentUser.users, function(response)
                		{  	                
                		});
                	});
               }              
            }, 
            function (err)
            {
                console.log(err);
            }, 
            function (evt)
            {
            });
        }
        else
        {
        	alert('Profile Pic Should Not Exceed 100Kb in size');
        }
    };

}]);