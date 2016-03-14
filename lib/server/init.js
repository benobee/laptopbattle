Meteor.startup(function(){

		process.env.MAIL_URL = 'smtp://masterbattle@laptopbattle.com:(SGZdw77[@t@@mail.laptopbattle.com:465';	

	    Accounts.users.upsert({ _id : 'mYuid8yBpdvPJhuL6'},
				{
					$set : {

						admin  : true,
						player : true
		
					}
				}
	  	);

	  	Accounts.users.upsert({ _id : '37SdJXu2f9HamyGfe'},
				{
					$set : {

						admin  : true,
						player : true
		
					}
				}
	  	);
		  	
});

