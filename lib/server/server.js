//LIVE AUTH
ServiceConfiguration.configurations.upsert(
  	{ service: "facebook" },
    	{
	        $set: {
	          appId: "442572199236703",
	          loginStyle: "popup",
	          secret: "91ac94b88c3ceabf6dec283fa0ed2b22"
	        }
  		}
);

// TEST AUTH 
// ServiceConfiguration.configurations.upsert(
//   { service: "facebook" },
//     {
//        $set: {
//           appId: "516546195172636",
//           loginStyle: "popup",
//           secret: "b6f6ccdcbbe750118869a0d8e1c7a953"
//        }
//   	}
// );

Meteor.startup(function(){


	  Accounts.users.upsert(

	  	{ _id : '2FSADpWjQbKBajbhD'},
				{
					$set : {
						admin  : true,
						player : true			
					}
				}
	  	);

});

