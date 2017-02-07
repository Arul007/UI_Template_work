var app = angular.module('myApp',[])
.controller('Summary' ,function($scope,$http,$location,$window,$filter) {
	
	//********************* Universal function **********************/
				// Page Navigation
				$scope.show=false;
				$scope.show1=false;
				$scope.show2=false;	
				$scope.currentPage = 1;	
				$scope.pageSize = 5;
				//$scope.currentPage = 1;					
				$scope.pageSize = 5;				
				$scope.numberOfPages=function(){
					return Math.ceil($scope.matchColumn/$scope.pageSize);                
					}	
				// show & hide page navigation on click check button
	 $scope.disp = function() { 			  
				if($scope.show==false){
					$scope.show=true;
					$scope.show2=true;
				}				
				else{
				   $scope.show=false;
					$scope.show2=false;	
				}
		};		
		  $scope.disp1 = function() { 			  
				if($scope.show1==false)
				{
					$scope.show1=true;
					$scope.show2=true;
				}
				else if($scope.show1==true && $scope.show==true)
				{
					$scope.show1=false;
					$scope.show2=true;
				}
				else{
				   $scope.show1=false;
					$scope.show2=false;	
				}
		};
		//console.log($window.location.pathname);
		_onpageload();
		function _onpageload(){
			if($window.location.pathname == '/summary.html'){
			 summarypage();
			
				console.log($window.location.pathname);
			}	
			if($window.location.pathname == '/AuditTrail.html'){
			 auditTrail();
             
				console.log($window.location.pathname);
			}
			if($window.location.pathname == '/Feilds.html'){
			 feilds();
				console.log($window.location.pathname);
			}
			if($window.location.pathname == '/match.html'){
			 match();
				console.log($window.location.pathname);
			}
			if($window.location.pathname == '/Consistency.html'){
			 consistency();
				console.log($window.location.pathname);
			}
			if($window.location.pathname == '/pension.html'){
			holmesSuggestion();
			 pension();
				console.log($window.location.pathname);
			}
			if($window.location.pathname == '/tranches.html'){
			 tranches();
				console.log($window.location.pathname);
			}
			if($window.location.pathname == '/derviations_calculations.html'){
			 derivation();
				//console.log($window.location.pathname);
			}	
		};

//*********************** Universal fun END **********************
//*********************** Summary.html ***************************

		// LT data getting from excel		
		function summarypage(){
			$http.get("http://localhost:8008/summary")
			  .then(function(response) {
            // alert("Success");
            $scope.summary = response.data.results;
			console.log($scope.summary);
			var ltdatalen =  $scope.summary;
			var EmpCount = 0;
			var EmpCount1 = 0;
            var max = 0;
            var max1 = 0;			
			for(var p = 0; p<ltdatalen.length; p++){		
			  max = (ltdatalen[p].LT_SNAP != null) ?  EmpCount++ : max;
              max1 = (ltdatalen[p].ADDITIONAL_MEMBERS != null) ?  EmpCount1++ : max1;
			}
			  //console.log('length', EmpCount, EmpCount1);
			  $scope.matchColumn = EmpCount;
			  $scope.notMatchedColumn = EmpCount1;
			  }, function myError(error) {
               console.log("Error");
      });
	};

      // Ltdata changed by the Doer's in the summay page
  		$scope.Lteditfun = function() {
  			var dataObj = $scope.summary;
			console.log(dataObj);
  			var res = $http.post('http://127.0.0.1:8008/summaryDataChanged', dataObj);
			res.then(function(data, status, headers, config) {
  			 	// alert(data);
  				console.log(data);
  			 	$scope.summary = data;
				
  			 });
  		};
		

// *************** Summary.html END *******************************		

// *************** AuditTrail.html *******************************
				// Data coming from excel
		function auditTrail(){
			//console.log("poProcessRun");
  			$http.get("http://localhost:8008/audit")
			  .then(function(response){
            $scope.summary2 = response.data;
			// console.log($scope.summary2);
			var ltdatalen =  $scope.summary2;
			var matchColumn = 0;
			var notMatchedColumn = 0;
            var max = 0;
            var max1 = 0;			
			for(var p = 0; p<ltdatalen.length; p++){		
			  max = (ltdatalen[p].LT_Raw_Data != null) ?  matchColumn++ : max;
              max1 = (ltdatalen[p].LT_Snapshot_Not_Matched_Column != null) ?  notMatchedColumn++ : max1;
			}
			  console.log('length', matchColumn, notMatchedColumn);
			  $scope.matchColumn = matchColumn;
			  $scope.notMatchedColumn = notMatchedColumn;
			
			  });
	  
		};
			
  	// Data changed by the Doer's in the summay2 page
  		$scope.amresh = function() {
  			var amresh = $scope.summary2;
			console.log(amresh);
  			var res = $http.post('http://127.0.0.1:8008/summary2DataChanged', amresh);
			res.then(function(data, status, headers, config) {
  			 	// alert(data);
  				console.log(data);
  			 	$scope.message = data;
				
  			 });
  		};
		
// *************** AuditTrail.html END *************************

// *************** feilds.html *******************************

			function feilds(){
				//console.log("feilds");
				$http.get("http://127.0.0.1:8008/feilddata")
				  .then(function(response){
				$scope.feilds = response.data;				 
			    var ltdatalen =  $scope.feilds;
				var matchColumn = 0;
				var notMatchedColumn = 0;
				var max = 0;
				var max1 = 0;			
				for(var p = 0; p<ltdatalen.length; p++){		
				  max = (ltdatalen[p].Member_Identifier != null) ?  matchColumn++ : max;
				  max1 = (ltdatalen[p].LT_SnapshotNotMatchedColumn != null) ?  notMatchedColumn++ : max1;
				}
				  console.log('length', matchColumn, notMatchedColumn);
				  $scope.matchColumn = matchColumn;
				  $scope.notMatchedColumn = notMatchedColumn;	
				
				  });
		  
			};
		
				
  	// Data changed by the Doer's in the Feilds page
  		$scope.feild = function() {
  			var amresh = $scope.feilds;
			console.log(amresh);
  			var res = $http.post('http://127.0.0.1:8008/feildsDataChanged', amresh);
			res.then(function(data, status, headers, config) {
  			 	// alert(data);
  				console.log(data);
  			 	$scope.feilds = data;				
  			 });
  		};

// *************** feilds.html END **************************

// *************** match.html *******************************

			function match(){
				//console.log("feilds");
				$http.get("http://127.0.0.1:8008/match")
				  .then(function(response){
				$scope.match = response.data;
				 console.log($scope.match);
			    var ltdatalen =  $scope.match;
				var matchColumn = 0;
				var notMatchedColumn = 0;
				var max = 0;
				var max1 = 0;			
				for(var p = 0; p<ltdatalen.length; p++){		
				  max = (ltdatalen[p].TT_RAW_MISMATCHED != null) ?  matchColumn++ : max;
				  max1 = (ltdatalen[p].ADDITIONAL_MEMBERS != null) ?  notMatchedColumn++ : max1;
				}
				  console.log('length', matchColumn, notMatchedColumn);
				  $scope.matchColumn = matchColumn;
				  $scope.notMatchedColumn = notMatchedColumn;
				
				  });
		  
			};
		
  	// Data changed by the Doer's in the match page
  		$scope.matchs = function() {
  			var amresh = $scope.match;
			console.log(amresh);
  			var res = $http.post('http://127.0.0.1:8008/matchDataChanged', amresh);
			res.then(function(data, status, headers, config) {
  			 	// alert(data);
  				console.log(data);
  			 	$scope.message = data;
				
  			 });
  		};
		
// *************** match.html END *******************************

// *************** Consistency Check ****************************
		// Top table Data 
		function consistency(){ 
			$scope.currentPage1=1;
			$scope.pageSize1 = 5;			
			$http.get("http://127.0.0.1:8008/consistency")
				  .then(function(response){
				$scope.consistency = response.data; 
				var ltdatalen =  $scope.consistency;
				var matchColumn = 0;				
				var max = 0;						
				for(var p = 0; p<ltdatalen.length; p++){		
				  max = (ltdatalen[p].Table_data != null) ?  matchColumn++ : max;
				}
				  console.log('length', matchColumn);
				  $scope.matchColumn = matchColumn;			 
			 });
			 
			}; 
			$scope.numberOfPages1=function(){
               return Math.ceil($scope.matchColumn1/$scope.pageSize);                
			}
					
		// This function informs backend to show the respective call table
		$scope.test = function(raw){
			var raw = {
				Doersneedexcel: raw
			}
			//BottomTable();	
			//alert(raw);
			var res = $http.post('http://127.0.0.1:8008/consist', raw);
			res.then(function(data, status, headers, config) {
  			 	// alert(data);
			if(data.statusText=="OK"){
				BottomTable();				
			  }				
  			 });
		   }
			 // Bottom table show data on click of uper $scope.test function success
		function BottomTable(){
			$scope.table ="true";
			$http.get("http://127.0.0.1:8008/consistencydata")
			  .then(function(response){
            $scope.consistbelowtab = response.data; 
			console.log('length',  $scope.consistbelowtab);
            var ltdatalen =  $scope.consistbelowtab;
				var matchColumn1 = 0;				
				var max = 0;				
				for(var p = 0; p<ltdatalen.length; p++){		
				  max = (ltdatalen[p].Membership_ID != null) ?  matchColumn1++ : max;				  
				}
				  console.log('length', matchColumn1);
				  $scope.matchColumn1 = matchColumn1;				 
        			 });
			}; 
		
// *************** Consistency Check.html END ******************

// *************** Pension.html ********************************
		
	function holmesSuggestion(){		
			$http.get("jsonfile/holmesSuggestion.json")
			  .then(function(response) {
				  $scope.suggestion = response.data;
				  console.log($scope.suggestion);
				  //alert(data);
			  });
	}
	function pension(){       	
           $http.get("http://127.0.0.1:8008/SumOftranches")
				   .then(function(response){				
				$scope.pension = response.data;	
				//console.log($scope.pension);
			    var ltdatalen =  $scope.pension;
				var matchColumn = 0;				
				var max = 0;		
				for(var p = 0; p<ltdatalen.length; p++){		
				 max = (ltdatalen[p].EmployeeIDNumber != null) ?  matchColumn++ : max;	
				}				 
				  $scope.matchColumn = matchColumn;				 
					//console.log('tranches',matchColumn)
				 });
				};
		$scope.pendata = function(){
			var pendata = $scope.pension;
			console.log(pendata);
			 //var amresh = $scope.summary2;
			//console.log(amresh);
  			var res = $http.post('http://127.0.0.1:8008/summary2DataChanged', pendata);
			res.then(function(data, status, headers, config) {
  			 	// alert(data);
  				console.log(data);
  			 	$scope.message = data;
				
  			 });
			
		}



// *************** Pension.html END ****************************

// *************** Tranches.html *******************************

       function tranches(){       	
           $http.get("http://127.0.0.1:8008/tranches")
				   .then(function(response){
				//console.log(parseInt(response.data[1]["Pre_06/04/1997"]));
				$scope.tranche = response.data;	
				console.log($scope.tranche);
			    var ltdatalen =  $scope.tranche;
				var matchColumn = 0;
				var notMatchedColumn = 0;
				var max = 0;
				var max1 = 0;			
				for(var p = 0; p<ltdatalen.length; p++){		
				 max = (ltdatalen[p].DatePensServCommenced != null) ?  matchColumn++ : max;	
				 max1 = (ltdatalen[p].Revaluing != null) ?  notMatchedColumn++ : max1;
				}				 
				  $scope.matchColumn = matchColumn;
				  $scope.notMatchedColumn = notMatchedColumn;
					console.log('tranches',matchColumn,notMatchedColumn )
				 });
				};


// *************** Tranches.html END *******************************

// *************** Derivation.html *******************************

		  $scope.finalhomepagecheck = function(){
				//alert("FinalHomePageCheckupdated");
				var check = $http.get('http://127.0.0.1:8008/homepagestatusupdate');
				check.then(function(data, status, headers, config) {
					console.log(data);
				 });
				$scope.link = "/output.html";
		     }; 

       function derivation(){       	
           $http.get("http://127.0.0.1:8008/derivation")
				   .then(function(response){				
				$scope.derivation = response.data;	
				console.log($scope.derivation);
			    var ltdatalen =  $scope.derivation;
				var matchColumn = 0;				
				var max = 0;						
				for(var p = 0; p<ltdatalen.length; p++){		
				 max = (ltdatalen[p].MembershipPlan != null) ?  matchColumn++ : max;					
				}				 
				  $scope.matchColumn = matchColumn;			 
					console.log('tranches',matchColumn);
				 });
				};
		$scope.deri = function(){
			alert("Hi DeviA!");
			
		}

// *************** Derivation.html END *******************************
		
}); 