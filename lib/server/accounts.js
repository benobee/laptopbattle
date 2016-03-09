Accounts.emailTemplates.siteName = "Laptop Battle";
Accounts.emailTemplates.from = "Battle Master Pro <no-reply@meteor.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {

    return "Welcome, " + user.username + "!";

};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
   return "You are about to begin an exciting career at Laptop Battle!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};

