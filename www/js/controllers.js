angular.module("ternaklovebird.controllers", [])



// TODO: indexCtrl --|-- 
.controller("indexCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	// TODO: indexCtrl --|-- $rootScope.exitApp
	$rootScope.exitApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm Exit",
			template: "Are you sure you want to exit?"
		});
		confirmPopup.then(function (close){
			if(close){
				ionic.Platform.exitApp();
			}
			$rootScope.closeMenuPopover();
		});
	};
	
	// TODO: indexCtrl --|-- $rootScope.changeLanguage
	$rootScope.changeLanguage = function(langKey){
		if(typeof langKey !== null){
			$translate.use(langKey);
			tmhDynamicLocale.set(langKey);
			try {
				$rootScope.language_option = langKey;
				localforage.setItem("language_option",langKey);
			}catch(e){
				localforage.setItem("language_option","en-us");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showLanguageDialog
	var modal_language = "";
	modal_language += "<ion-modal-view>";
	modal_language += "<ion-header-bar class=\"bar bar-header bar-positive-900\">";
	modal_language += "<h1 class=\"title\">{{ 'Language' | translate }}</h1>";
	modal_language += "</ion-header-bar>";
	modal_language += "<ion-content class=\"padding\">";
	modal_language += "<div class=\"list\">";
	modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'en-us'\" ng-click=\"tryChangeLanguage('en-us')\">English - US</ion-radio>";
	modal_language += "<button class=\"button button-full button-positive-900\" ng-click=\"closeLanguageDialog()\">{{ 'Close' | translate }}</button>";
	modal_language += "</div>";
	modal_language += "</ion-content>";
	modal_language += "</ion-modal-view>";
	
	$rootScope.languageDialog = $ionicModal.fromTemplate(modal_language,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showLanguageDialog = function(){
		$rootScope.languageDialog.show();
		localforage.getItem("language_option", function(err, value){
			$rootScope.language_option = value;
		}).then(function(value){
			$rootScope.language_option = value;
		}).catch(function (err){
			$rootScope.language_option = "en-us";
		})
	};
	
	$rootScope.closeLanguageDialog = function(){
		$rootScope.languageDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	$rootScope.tryChangeLanguage = function(langKey){
		$rootScope.changeLanguage(langKey);
	};
	
	localforage.getItem("language_option", function(err, value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).catch(function (err){
		localforage.setItem("language_option","en-us");
	})
	// TODO: indexCtrl --|-- $rootScope.changeFontSize
	$rootScope.changeFontSize = function(fontSize){
		if(typeof fontSize !== null){
			try {
				$rootScope.fontsize_option = $rootScope.fontsize = fontSize;
				localforage.setItem("fontsize_option",fontSize);
			}catch(e){
				localforage.setItem("fontsize_option","normal");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showFontSizeDialog
	var modal_fontsize = "";
	modal_fontsize += "<ion-modal-view>";
	modal_fontsize += "<ion-header-bar class=\"bar bar-header bar-positive-900\">";
	modal_fontsize += "<h1 class=\"title\">{{ 'Font Size' | translate }}</h1>";
	modal_fontsize += "</ion-header-bar>";
	modal_fontsize += "<ion-content class=\"padding\">";
	modal_fontsize += "<div class=\"list\">";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'small'\" ng-click=\"tryChangeFontSize('small');\">{{ 'Small' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'normal'\" ng-click=\"tryChangeFontSize('normal');\">{{ 'Normal' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'large'\" ng-click=\"tryChangeFontSize('large');\">{{ 'Large' | translate }}</ion-radio>";
	modal_fontsize += "<button class=\"button button-full button-positive-900\" ng-click=\"closeFontSizeDialog()\">{{ 'Close' | translate }}</button>";
	modal_fontsize += "</div>";
	modal_fontsize += "</ion-content>";
	modal_fontsize += "</ion-modal-view>";
	
	$rootScope.fontSizeDialog = $ionicModal.fromTemplate(modal_fontsize,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showFontSizeDialog = function(){
		$rootScope.fontSizeDialog.show();
		localforage.getItem("fontsize_option", function(err, value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).then(function(value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).catch(function (err){
			$rootScope.fontsize_option = $rootScope.fontsize = "normal";
		})
	};
	
	$rootScope.closeFontSizeDialog = function(){
		$rootScope.fontSizeDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	localforage.getItem("fontsize_option", function(err, value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).catch(function (err){
		console.log(err);
		localforage.setItem("fontsize_option","normal");
	})
	
	
	$rootScope.tryChangeFontSize = function(val){
		$rootScope.changeFontSize(val);
	};
	
	// TODO: indexCtrl --|-- $rootScope.clearCacheApp
	$rootScope.clearCacheApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm",
			template: "Are you sure you want to clear cache?"
		});
		confirmPopup.then(function (close){
			if(close){
				localforage.keys().then(function(keys) {
					for(var e = 0; e < keys.length ; e++) {
						localforage.setItem(keys[e],[]);
					}
					$state.go("ternaklovebird.videotutorial");
				}).catch(function(err) {
					$state.go("ternaklovebird.videotutorial");
				});
			}
			$rootScope.closeMenuPopover();
		});
	};
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: indexCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: indexCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: indexCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: indexCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: indexCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: indexCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: indexCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `index` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: side_menusCtrl --|-- 
.controller("side_menusCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: side_menusCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: side_menusCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: side_menusCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: side_menusCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: side_menusCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: side_menusCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 
	
	var popover_template = "";
	popover_template += "<ion-popover-view class=\"fit\">";
	popover_template += "	<ion-content>";
	popover_template += "		<ion-list>";
	popover_template += "			<a  class=\"item dark-ink\" ng-href=\"#/ternaklovebird/about_us\" ng-click=\"popover.hide()\">";
	popover_template += "			{{ 'About Us' | translate }}";
	popover_template += "			</a>";
	popover_template += "		</ion-list>";
	popover_template += "	</ion-content>";
	popover_template += "</ion-popover-view>";
	
	
	$scope.popover = $ionicPopover.fromTemplate(popover_template,{
		scope: $scope
	});
	
	$scope.closePopover = function(){
		$scope.popover.hide();
	};
	
	$rootScope.closeMenuPopover = function(){
		$scope.popover.hide();
	};
	
	$scope.$on("$destroy", function(){
		$scope.popover.remove();
	});

	// TODO: side_menusCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `side_menus` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: about_usCtrl --|-- 
.controller("about_usCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: about_usCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: about_usCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: about_usCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: about_usCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: about_usCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: about_usCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: about_usCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `about_us` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: aboutusCtrl --|-- 
.controller("aboutusCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page_builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: aboutusCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: aboutusCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: aboutusCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: aboutusCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: aboutusCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: aboutusCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: aboutusCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `aboutus` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: admobCtrl --|-- 
.controller("admobCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (admob)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: admobCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: admobCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: admobCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: admobCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: admobCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: admobCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: admobCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("ternaklovebird.videotutorial");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: admobCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: admobCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://bstrdproject.xyz/admob.json";
	// TODO: admobCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://bstrdproject.xyz/admob.json?callback=JSON_CALLBACK";
	// TODO: admobCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_admobs = [];
	
	localforage.getItem("data_admobs_" + $scope.hashURL, function(err, get_admobs){
		if(get_admobs === null){
			data_admobs =[];
		}else{
			data_admobs = JSON.parse(get_admobs);
			$scope.data_admobs =JSON.parse( get_admobs);
			$scope.admobs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_admobs[lastPush])){
					$scope.admobs.push(data_admobs[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_admobs === null ){
		data_admobs =[];
	}
	if(data_admobs.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: admobCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_admobs = response.data;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_admobs);
				$scope.data_admobs = response.data;
				// TODO: admobCtrl --|---------- set:localforage
				localforage.setItem("data_admobs_" + $scope.hashURL, JSON.stringify(data_admobs));
				$scope.admobs = [];
				for(lastPush = 0; lastPush < 50; lastPush++) {
					if (angular.isObject(data_admobs[lastPush])){
						$scope.admobs.push(data_admobs[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: admobCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_admobs = data;
						$scope.data_admobs = data;
						$ionicLoading.hide();
						// TODO: admobCtrl --|---------- set:localforage
						localforage.setItem("data_admobs_" + $scope.hashURL,JSON.stringify(data_admobs));
						controller_by_user();
						$scope.admobs = [];
						for(lastPush = 0; lastPush < 50; lastPush++) {
							if (angular.isObject(data_admobs[lastPush])){
								$scope.admobs.push(data_admobs[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: admobCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: admobCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: admobCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: admobCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_admobs = response.data;
			$scope.data_admobs = response.data;
			// TODO: admobCtrl --|---------- set:localforage
			localforage.setItem("data_admobs_" + $scope.hashURL,JSON.stringify(data_admobs));
			$scope.admobs = [];
			for(lastPush = 0; lastPush < 50; lastPush++) {
				if (angular.isObject(data_admobs[lastPush])){
					$scope.admobs.push(data_admobs[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: admobCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_admobs = data;
					$scope.data_admobs = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: admobCtrl --|---------- set:localforage
					localforage.setItem("data_admobs_"+ $scope.hashURL,JSON.stringify(data_admobs));
					$scope.admobs = [];
					for(lastPush = 0; lastPush < 50; lastPush++) {
						if (angular.isObject(data_admobs[lastPush])){
							$scope.admobs.push(data_admobs[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: admobCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: admobCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_admobs === null){
		data_admobs = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_admobs[lastPush])){
				$scope.admobs.push(data_admobs[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// code 

	// TODO: admobCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			

angular.forEach(data_admobs, function(ads, key) {
	switch (ads.ad_format) {
	case "banner":
		if (typeof AdMob !== "undefined") {
			$timeout(function(){
				AdMob.createBanner({
				    adId: ads.ad_unit_id,
                    overlap: false,
                    autoShow: true,
                    offsetTopBar: false,
                    position: AdMob.AD_POSITION.TOP_CENTER,
                    bgColor: "black"
                });				
			}, 1000);
		}
		break;
	case "interstitial":
		if (typeof AdMob !== "undefined") {
				AdMob.prepareInterstitial({
					adId: ads.ad_unit_id,
					autoShow: true,
				});
		}
		break;
	case "rewardvideo":
		if (typeof AdMob !== "undefined") {
			$timeout(function(){
				AdMob.prepareRewardVideoAd({
					adId: ads.ad_unit_id,
					autoShow: true,
				});
			}, 30000);
		}         
		break;
	default:
	}
});    
    			
		} catch(e){
			console.log("%cerror: %cPage: `admob` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	controller_by_user();
})

// TODO: dashboardCtrl --|-- 
.controller("dashboardCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: dashboardCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: dashboardCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: dashboardCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: dashboardCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: dashboardCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: dashboardCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: dashboardCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `dashboard` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: slide_tab_menuCtrl --|-- 
.controller("slide_tab_menuCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: slide_tab_menuCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: slide_tab_menuCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: slide_tab_menuCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: slide_tab_menuCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `slide_tab_menu` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: tutoriallainCtrl --|-- 
.controller("tutoriallainCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: tutoriallainCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: tutoriallainCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: tutoriallainCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: tutoriallainCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: tutoriallainCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: tutoriallainCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: tutoriallainCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `tutoriallain` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: videotutorialCtrl --|-- 
.controller("videotutorialCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: videotutorialCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: videotutorialCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: videotutorialCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: videotutorialCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: videotutorialCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: videotutorialCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: videotutorialCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("ternaklovebird.videotutorial");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url Video Ternak Lovebird
	targetQuery = "maxResults=50"; //default param
	raplaceWithQuery = "maxResults=50";
	
	
	// TODO: videotutorialCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: videotutorialCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PL9XS30jHbFDtS58I2P--CVP8VDds0TMc6&key=AIzaSyBHdEaKH1RXJyOkkjxGHX7aqaINHWs_45g";
	// TODO: videotutorialCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PL9XS30jHbFDtS58I2P--CVP8VDds0TMc6&key=AIzaSyBHdEaKH1RXJyOkkjxGHX7aqaINHWs_45g&callback=JSON_CALLBACK";
	// TODO: videotutorialCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_videotutorials = [];
	
	localforage.getItem("data_videotutorials_" + $scope.hashURL, function(err, get_videotutorials){
		if(get_videotutorials === null){
			data_videotutorials =[];
		}else{
			data_videotutorials = JSON.parse(get_videotutorials);
			$scope.data_videotutorials =JSON.parse( get_videotutorials);
			$scope.videotutorials = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_videotutorials[lastPush])){
					$scope.videotutorials.push(data_videotutorials[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_videotutorials === null ){
		data_videotutorials =[];
	}
	if(data_videotutorials.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: videotutorialCtrl --|-- $http.get
			console.log("%cRetrieving JSON: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
			$http.get(url_request,http_header).then(function(response) {
				data_videotutorials = response.data.items;
				console.log("%cSuccessfully","color:blue;font-size:18px");
				console.dir(data_videotutorials);
				$scope.data_videotutorials = response.data.items;
				// TODO: videotutorialCtrl --|---------- set:localforage
				localforage.setItem("data_videotutorials_" + $scope.hashURL, JSON.stringify(data_videotutorials));
				$scope.videotutorials = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data_videotutorials[lastPush])){
						$scope.videotutorials.push(data_videotutorials[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					console.log("%cRetrieving again: %c" + url_request,"color:blue;font-size:18px","color:red;font-size:18px");
					// TODO: videotutorialCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_videotutorials = data.items;
						$scope.data_videotutorials = data.items;
						$ionicLoading.hide();
						// TODO: videotutorialCtrl --|---------- set:localforage
						localforage.setItem("data_videotutorials_" + $scope.hashURL,JSON.stringify(data_videotutorials));
						controller_by_user();
						$scope.videotutorials = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data_videotutorials[lastPush])){
								$scope.videotutorials.push(data_videotutorials[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: videotutorialCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: videotutorialCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: videotutorialCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: videotutorialCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_videotutorials = response.data.items;
			$scope.data_videotutorials = response.data.items;
			// TODO: videotutorialCtrl --|---------- set:localforage
			localforage.setItem("data_videotutorials_" + $scope.hashURL,JSON.stringify(data_videotutorials));
			$scope.videotutorials = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_videotutorials[lastPush])){
					$scope.videotutorials.push(data_videotutorials[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: videotutorialCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_videotutorials = data.items;
					$scope.data_videotutorials = data.items;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: videotutorialCtrl --|---------- set:localforage
					localforage.setItem("data_videotutorials_"+ $scope.hashURL,JSON.stringify(data_videotutorials));
					$scope.videotutorials = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data_videotutorials[lastPush])){
							$scope.videotutorials.push(data_videotutorials[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
					// TODO: videotutorialCtrl --|------------ error:Unauthorized
					$scope.showAuthentication();
					}else{
						// TODO: videotutorialCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_videotutorials === null){
		data_videotutorials = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_videotutorials[lastPush])){
				$scope.videotutorials.push(data_videotutorials[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: videotutorialCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `videotutorial` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: videotutorial_singlesCtrl --|-- 
.controller("videotutorial_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page-builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: videotutorial_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: videotutorial_singlesCtrl --|-- $scope.openURL
	// open external browser 
	$scope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: videotutorial_singlesCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$scope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done");
		appBrowser.addEventListener("loadstart",function(){
			appBrowser.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: videotutorial_singlesCtrl --|-- $scope.openWebView
	// open WebView
	$scope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no");
		appWebview.addEventListener("loadstart",function(){
			appWebview.insertCSS({
				code: "body{background:#100;color:#100;font-size:1px;}body:after{content:'loading...';color:#fff;font-size:72px;position:absolute;bottom:50%;left:0;right:0; text-align: center; vertical-align: middle;}"
			});
		});
	
		appWebview.addEventListener("loaderror",function(){
			window.location = "retry.html";
		});
	};
	
	
	// TODO: videotutorial_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: videotutorial_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: videotutorial_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var authPopup = $ionicPopup.show({
			template: ' This page required login',
			title: "Authorization",
			subTitle: "Authorization is required",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("ternaklovebird.videotutorial");
				}},
			],
		}).then(function(form){
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.snippetresourceIdvideoId;
	// TODO: videotutorial_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PL9XS30jHbFDtS58I2P--CVP8VDds0TMc6&key=AIzaSyBHdEaKH1RXJyOkkjxGHX7aqaINHWs_45g";
	// TODO: videotutorial_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&part=id,snippet&playlistId=PL9XS30jHbFDtS58I2P--CVP8VDds0TMc6&key=AIzaSyBHdEaKH1RXJyOkkjxGHX7aqaINHWs_45g&callback=JSON_CALLBACK";
	// TODO: videotutorial_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_videotutorials_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				var datas = JSON.parse(get_datas);
				for (var i = 0; i < datas.length; i++) {
					if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
						current_item = datas[i] ;
					}
				}
			}
			// event done, hidden animation loading
			$timeout(function(){
				$ionicLoading.hide();
				$scope.videotutorial = current_item ;
				controller_by_user();
			}, 100);
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: videotutorial_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: videotutorial_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_videotutorials_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "Network Error" + " (" + data.status + ")",
						template: "An error occurred while collecting data.",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.videotutorial = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: videotutorial_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.snippetresourceIdvideoId;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: videotutorial_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data.items;
			// TODO: videotutorial_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_videotutorials_"+ $scope.hashURL,JSON.stringify(datas));
			for (var i = 0; i < datas.length; i++) {
				if((datas[i].snippet.resourceId.videoId ===  parseInt(itemID)) || (datas[i].snippet.resourceId.videoId === itemID.toString())) {
					current_item = datas[i] ;
				}
			}
		},function(data) {
			// Error message
		// TODO: videotutorial_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response.items;
			// TODO: videotutorial_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_videotutorials_"+ $scope.hashURL,JSON.stringify(datas));
					for (var i = 0; i < datas.length; i++) {
						if((datas[i].snippetresourceIdvideoId ===  parseInt(itemID)) || (datas[i].snippetresourceIdvideoId === itemID.toString())) {
							current_item = datas[i] ;
						}
					}
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.videotutorial = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.videotutorial = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: videotutorial_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			

    
$ionicConfig.backButton.text("");
$scope.pauseVideo = function() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' +   '","args":""}', '*');
}


$scope.playVideo = function() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
   iframe.postMessage('{"event":"command","func":"' + 'playVideo' +   '","args":""}', '*');
}

$scope.$on("$ionicView.beforeLeave", function(){
	$scope.pauseVideo();
});

$scope.$on("$ionicView.enter", function(){
	$scope.playVideo();
});
			
		} catch(e){
			console.log("%cerror: %cPage: `videotutorial_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})
