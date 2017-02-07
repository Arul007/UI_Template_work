var app = angular.module('myApp',[])
.controller('Ctrl' , function($scope, $http, $window) {
		
	_onpageload();
		function _onpageload(){
			if($window.location.pathname == '/index.html'){
			 homepagecall();	
				//alert('page loaded');
				//console.log($window.location.pathname);
			}
		}

// *************** index.html ***************
	// Scheme_details to show the added Schemes in index.html
	function homepagecall (){
		$http.get("http://localhost:8008/homepagecheck")
			  .then(function(response) {
            	// alert("Success");
            	$scope.Scheme_details = response.data;
				console.log($scope.Scheme_details);
			
			  }, function myError(error) {
               console.log("Error");
      });
	}
	// For (Add Scheme and Data) Button

		$scope.checkboxSelection = 'true';
		$scope.isCheckboxSelected = function(index) {
			//console.log("hello");
			if(index === $scope.checkboxSelection){
			$scope.link = "";
			}else {
			$scope.link = "/dataload.html";
			}
			return index === $scope.checkboxSelection;
		};



// ***************  index.html END ***************

// *************** dataload.html  ***************

	//  being used for ng-options

		 $http.get("jsonfile/SchemeCategory.json")
			  .then(function(response) {
				  $scope.SchemeCategory = response.data;
				  //console.log($scope.SchemeCategory);
				  //alert(data);
			  });
		 $http.get("jsonfile/SchemeName.json")
			  .then(function(response) {
				  $scope.SchemeName = response.data;
				  //console.log($scope.SchemeName);
				  //alert(data);
			  });
		 $http.get("jsonfile/MemberType.json")
			  .then(function(response) {
				  $scope.MemberType = response.data;
				  //console.log($scope.MemberType);
				  //alert(data);
			  });

			//  ng-options END
			
		// To show Date in the dataload page
			$scope.fetchdate =function () {				
				//console.log($scope.Scheme_name);
				$scope.date = $scope.Scheme_name.date;
				console.log($scope.date);
			} 

			// function called from Submit button click to upload files and data
			$scope.submit = function() {
				console.log("*** Submit function in the home.js controller ***");
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
				res.then(function(data, status, headers, config) {
  			 	// alert(data);
  				//console.log(data.statusText);
				if(data.statusText=="OK"){
  			 	//$scope.message = status;
				//console.log(" \n calling upload function ===> ");
				$scope.uploadFiles(); // call for upload file function...
				}								
  			 });
				
			};
			// this function clears all the data after uploading the file 
			$scope.cancel = function() {
				console.log("refersh the options");
				$scope.Scheme_name = "";
				$scope.Scheme_category = "";
				$scope.Member_type = "";
				$scope.fileNames = "";
				$scope.files = "";

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
					//console.log($scope.files);
					//console.log("filenames",$scope.fileNames);

				});
			//console.log($scope.formData);
		};

	     // NOW UPLOAD THE FILES.
	        $scope.uploadFiles = function () {
	        	console.log("*** Uploading function in the home.js controller ***");
	        	//console.log($scope.files[0]);
	            //FILL FormData WITH FILE DETAILS.
	            var data = new FormData();	                   
	            for (var i in $scope.files) {
	            	//var data = new FormData($scope.files[i]);	       
	            	//console.log("\n Scope varaible files ===>  "+i);
	            	//console.log($scope.files[i]);
	                data.append("file"+i, $scope.files[i]);	                
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
					  //alert(" File uploaded successfully");
					  swal("Good job!", "You clicked the button!", "success")
					  console.log(" File uploaded successfully ");
					  })
					.catch(function (error) {
	        		  //alert("Error in file upload");// Handle error here
	        		  sweetAlert("Oops...", "Something went wrong!", "error");
	        		  console.log("Error ===>"+error);
					  $scope.cancel();
	    			 });
			  $scope.cancel();
	        }
	// *************** dataload.html END  ***************

});
