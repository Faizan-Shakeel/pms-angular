var app = angular.module('userProfileModule', []);

app.controller('userProfileCtrl', ['mongoCrudService', function(mongoCrudService)
{
	var vm = this,
		 contactNumber,
		 address,
		 dateOfBirth,
		 email,
		 gender;

	vm.updateProfile = function(userId, modal)
	{
		console.log(modal);
		if (modal.numberRequiredFlag)
		{
			contactNumber = {'users.contactNumber': modal.newUserNumber};
			mongoCrudService.updateData(userId, contactNumber);
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