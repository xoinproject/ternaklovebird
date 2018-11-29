angular.module("ternaklovebird", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ternaklovebird.controllers", "ternaklovebird.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Ternak Lovebird" ;
		$rootScope.appLogo = "data/images/logo.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {
			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admobpro --save
			if (typeof AdMob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-1956062878682348/8047568769",
					interstitial: "ca-app-pub-1956062878682348/1385624350",
					rewardvideo: "ca-app-pub-1956062878682348/9332730277"
				};
				$timeout(function(){
					
					AdMob.createBanner({
						adId: admobid.banner,
						isTesting: true,// TODO: remove this line when release
						overlap: false,
						autoShow: true,
						offsetTopBar: false,
						position: AdMob.AD_POSITION.BOTTOM_CENTER,
						bgColor: "black"
					});
					
					AdMob.prepareInterstitial({
						adId: admobid.interstitial,
						autoShow: true,
						isTesting: true,// TODO: remove this line when release
					});
					
				}, 1000);
			
			
				$timeout(function(){
					AdMob.prepareRewardVideoAd({
						adId: admobid.rewardvideo,
						autoShow: true,
						isTesting: true,// TODO: remove this line when release
					});
				}, 30000);
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "ternaklovebird",
				storeName : "ternaklovebird",
				description : "The offline datastore for TernakLovebird app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("ternaklovebird.videotutorial");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("ternaklovebird",{
		url: "/ternaklovebird",
			abstract: true,
			templateUrl: "templates/ternaklovebird-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("ternaklovebird.about_us", {
		url: "/about_us",
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.aboutus", {
		url: "/aboutus",
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-aboutus.html",
						controller: "aboutusCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.admob", {
		url: "/admob",
		cache:false,
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-admob.html",
						controller: "admobCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.dashboard", {
		url: "/dashboard",
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.tutoriallain", {
		url: "/tutoriallain",
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-tutoriallain.html",
						controller: "tutoriallainCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.videotutorial", {
		url: "/videotutorial",
		cache:false,
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-videotutorial.html",
						controller: "videotutorialCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ternaklovebird.videotutorial_singles", {
		url: "/videotutorial_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"ternaklovebird-side_menus" : {
						templateUrl:"templates/ternaklovebird-videotutorial_singles.html",
						controller: "videotutorial_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/ternaklovebird/videotutorial");
});
