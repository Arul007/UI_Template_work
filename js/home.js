var app = angular.module('myApp',[])
.controller('Ctrl' , function($scope,$http) {

// *************** home.html ***************
	// Scheme_details to show the added Schemes in home.html

		  $http.get("jsonfile/Scheme_details.json")
			  .then(function(response) {
				  $scope.Scheme_details = response.data;
				  //console.log($scope.Scheme_details);
				  //alert(data);
			  });

	// For (Add Scheme and Data) Button

		$scope.checkboxSelection = 'true';
		$scope.isCheckboxSelected = function(index) {
			//console.log("hello");
			if(index === $scope.checkboxSelection){
			$scope.link = "";
			}else {
			$scope.link = "./dataload.html";
			}
			return index === $scope.checkboxSelection;
		};



							// ***************   home.html END ***************

// *************** dataload.html  ***************

	//  being used for ng-options

		 $http.get("jsonfile/SchemeCategory.json")
			  .then(function(response) {
				  $scope.SchemeCategory = response.data;
				  //console.log(Scheme);
				  //alert(data);
			  });
		 $http.get("jsonfile/SchemeName.json")
			  .then(function(response) {
				  $scope.SchemeName = response.data;
				  //console.log(Scheme);
				  //alert(data);
			  });
		 $http.get("jsonfile/MemberType.json")
			  .then(function(response) {
				  $scope.MemberType = response.data;
				  //console.log(Scheme);
				  //alert(data);
			  });

			//  ng-options END
		
			$scope.fetchdate =function () {				
				//console.log($scope.Scheme_name);
				// var obj = $scope.Scheme_name.date;
				$scope.date = $scope.Scheme_name.date;
				console.log($scope.date);
			} 

			// submit the data
			$scope.submit = function() {
				console.log("\n === Submit function in the controller  ===");
				// $scope.link = "./summary.html";
				console.log($scope.Scheme_name.SchemeName,
							$scope.Scheme_category.SchemeCategory,
							$scope.Member_type.MemberType);
				var dataObj = {
					schemeName : $scope.Scheme_name.SchemeName,
					schemeCate : $scope.Scheme_category.SchemeCategory,
					schemeMem  : $scope.Member_type.MemberType
				};

				// http call
				console.log(" http call to update Scheme Details ===>");
				var res = $http.post('http://127.0.0.1:8008/hello', dataObj);
				console.log(" \n calling upload function ===> ");
				$scope.uploadFiles(); // call for upload file function...
				$scope.cancel();
				console.log("\n After upload function ===>");

			};
			$scope.cancel = function() {
				console.log("refersh the options");
				$scope.Scheme_name = "";
				$scope.Scheme_category = "";
				$scope.Member_type = "";

			};
			$scope.formData = [{
					formName:"LT Raw Data"
				},
				{
					formName:"LT Snapshot Data"
				},
				{
					formName:"LT Decoder Data"
				},
				{
					formName:"TT Raw Data"
				},
				{
					formName:"Other Files"
				}];

			// GET THE FILE INFORMATION.
		$scope.fileNames=[];
		$scope.files = [];

		$scope.getFileDetails = function(e) {
			console.log(e.files);
			$scope.$apply(function() {
				// STORE THE FILE OBJECT IN AN ARRAY.
					$scope.files.push(e.files[0]);
					$scope.fileNames.push(e.files[0].name);
					console.log($scope.files);
					console.log("filenames",$scope.fileNames);

				});
			console.log($scope.formData);
		};


	     // NOW UPLOAD THE FILES.
	        $scope.uploadFiles = function () {

	        	console.log("\n Inside uploadfunction =====> ");

	        	console.log($scope.files[0]);
	            //FILL FormData WITH FILE DETAILS.
	            var data = new FormData();

	            console.log(" formdata ===> ");
	            console.log(data);

	            for (var i in $scope.files) {
	            	//var data = new FormData($scope.files[i]);
	            	console.log(" \n ===== Inside loop ====");
	            	console.log("\n Scope varaible files ===>  "+i);
	            	console.log($scope.files[i]);
	                data.append("file"+i, $scope.files[i]);
	                console.log("FormData ===>"+data);
	            }

	            var request = {
	                    method: 'POST',
	                    url: 'http://127.0.0.1:8008/upload',
	                    data: data,
	                    headers: {
	                        'Content-Type': undefined
	                    }
	                };


	            // Before http call for upload
	            $http(request)
	            	.then(function(response) {
					  			alert(" File uploaded successfully");
					  			console.log(" File uploaded successfully ");

				  			})
								.catch(function (error) {
	        				alert("Error in file upload");// Handle error here
	        				console.log("Error ===>"+error);
	    					});

	    			console.log("\n  ==== End of upload fun ==== ");

	        }
	// *************** dataload.html END  ***************

});
