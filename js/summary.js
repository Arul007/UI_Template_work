var app = angular.module('myApp',[])
.controller('Summary' ,function($scope,$http,$location,$window,$filter) {
	
	//********************* Universal fun **********************/
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
		
		_onpageload();
		function _onpageload(){
			if($window.location.pathname == '/summary.html'){
			 summarypage();
			
				//console.log($window.location.pathname);
			}	
			if($window.location.pathname == '/AuditTrailSummary2.html'){
			 summary2page();
             
				//console.log($window.location.pathname);
			}
			if($window.location.pathname == '/Feilds.html'){
			 feilds();
				//console.log($window.location.pathname);
			}
			if($window.location.pathname == '/match.html'){
			 match();
				//console.log($window.location.pathname);
			}
			if($window.location.pathname == '/consistency.html'){
			 consistency();
				//console.log($window.location.pathname);
			}
			if($window.location.pathname == '/tranches.html'){
			 tranches();
				//console.log($window.location.pathname);
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
			//console.log(Object.keys($scope.ltdata));
			var ltdatalen =  $scope.summary;
			var EmpCount = 0;
			var EmpCount1 = 0;
            var max = 0;
            var max1 = 0;			
			for(var p = 0; p<ltdatalen.length; p++){		
			  max = (ltdatalen[p].Employee_ID_Number != null) ?  EmpCount++ : max;
              max1 = (ltdatalen[p].New_Additional_Matches != null) ?  EmpCount1++ : max1;
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
		function summary2page(){
			//console.log("poProcessRun");
  			$http.get("http://localhost:8008/summary2")
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
		
// *************** dataload.html END *************************

// *************** feilds.html *******************************

			function feilds(){
				//console.log("feilds");
				$http.get("http://127.0.0.1:8008/feilds")
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
				  max = (ltdatalen[p].TT_Raw_Data_MemberID != null) ?  matchColumn++ : max;
				  max1 = (ltdatalen[p].TT_RawDataMemberID != null) ?  notMatchedColumn++ : max1;
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
			
		// Data changed by the Doer's in the consistency page:
		$scope.test=function(raw){
			alert(raw);
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
				 max = (ltdatalen[p].Date_Pens_Serv_Commenced != null) ?  matchColumn++ : max;	
				 //max1 = (ltdatalen[p].Revaluing != null) ?  notMatchedColumn++ : max1;
				}				 
				  $scope.matchColumn = matchColumn;
				 // $scope.notMatchedColumn = notMatchedColumn;
					console.log('tranches',matchColumn, notMatchedColumn);
				 });
				};


// *************** Tranches.html END *******************************

// *************** Derivation.html *******************************

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
			alert("Hi Devi!");
			
		}

// *************** Derivation.html END *******************************






}); 