(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var Preloader, PreloadController;

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/miro_preloader/packages/miro_preloader.js                      //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {                                                             // 1
                                                                           // 2
///////////////////////////////////////////////////////////////////////    // 3
//                                                                   //    // 4
// packages/miro:preloader/lib/server_route_controller.js            //    // 5
//                                                                   //    // 6
///////////////////////////////////////////////////////////////////////    // 7
                                                                     //    // 8
// v1.2.3                                                            // 1  // 9
                                                                     // 2  // 10
Preloader = {                                                        // 3  // 11
	// Dummy placeholder until we put something smart here              // 4  // 12
};                                                                   // 5  // 13
                                                                     // 6  // 14
if ( typeof PreloadController === 'undefined' ) {                    // 7  // 15
	PreloadController = RouteController.extend({                        // 8  // 16
		// Dummy placeholder until we put something smart here             // 9  // 17
	});                                                                 // 10
}                                                                    // 11
                                                                     // 12
///////////////////////////////////////////////////////////////////////    // 21
                                                                           // 22
}).call(this);                                                             // 23
                                                                           // 24
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['miro:preloader'] = {
  Preloader: Preloader,
  PreloadController: PreloadController
};

})();

//# sourceMappingURL=miro_preloader.js.map
