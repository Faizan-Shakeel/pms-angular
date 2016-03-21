var app = angular.module('userProfileModule', []);

app.controller('userProfileCtrl', ['mongoCrudService', '$localStorage', function(mongoCrudService, $localStorage)
{
	var vm = this,
		 contactNumber,
		 address,
		 dateOfBirth,
		 email,
		 gender,
		 userId = $localStorage.currentUser.users.id;


	vm.updateProfile = function(modal)
	{
		console.log(modal);
		console.log(userId);
		if (modal.numberRequiredFlag)
		{
			contactNumber = {'users.contactNumber': modal.newUserNumber};
			mongoCrudService.updateData($userId, contactNumber);
		}
		else if(modal.addressRequiredFlag)
		{
			address = {'users.address': modal.newUserAddress};
			mongoCrudService.updateData(userId, address);
		}
		else if(modal.dateOfBirthRequiredFlag)
		{
			dateOfBirth = {'users.dateOfBirth': modal.newUserDateOfBirth};
			mongoCrudService.updateData(userId, dateOfBirth);
		}
		else if(modal.emailRequiredFlag)
		{
			email = {'users.email': modal.newUserEmail};
			mongoCrudService.updateData(userId, email);
		}
		else if(modal.genderRequiredFlag)
		{
			gender = {'users.gender': modal.selectedGender}
			mongoCrudService.updateData(userId, gender);
		}

		else if(modal.newPasswordRequiredFlag)
		{
			mongoCrudService.updatePassword(userId, modal.newUserCurrentPassword, modal.userNewPassword);
		}
	}
}]);