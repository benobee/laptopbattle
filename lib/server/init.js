Meteor.startup(function(){
		process.env.MAIL_URL = 'smtp://contact@mail.laptopbattle.com:792797627c664959fd7ee503ee3b3bf7@smtp.mailgun.org:587';
		//'smtp://masterbattle@laptopbattle.com:(SGZdw77[@t@@mail.laptopbattle.com:465';
	    Accounts.users.upsert({ _id : 'sw9886GEnGcTqBE8d'},
				{
					$set : {

						admin  : true,
						player : true
		
					}
				}
	  	);

	  	// Accounts.users.upsert({ _id : 'ZbpBJwPASvga6XMpx'},
				// {
				// 	$set : {

				// 		admin  : true,
				// 		player : true
		
				// 	}
				// }
	  	// );
		  	
});

