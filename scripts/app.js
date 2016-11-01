
var Yike = angular.module('Yike', ['ngRoute', 'Controllers']);

Yike.config(['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/today', {
		templateUrl: './views/today.html',
		controller: 'TodayController'
	})
	.when('/older', {
		templateUrl: './views/older.html',
		controller: 'OlderController'
	})
	.when('/author', {
		templateUrl: './views/author.html',
		controller: 'AuthorController'
	})
	.when('/category', {
		templateUrl: './views/category.html',
		controller: 'CategoryController'
	})
	.when('/like', {
		templateUrl: './views/like.html',
		controller: 'LikeController'
	})
	.when('/settings', {
		templateUrl: './views/settings.html',
		controller: 'SettingsController'
	})
	.otherwise({
		redirectTo: '/today'
	});

}]);

// 直接运行根作用域
Yike.run(['$rootScope', function ($rootScope) {
	// 默认关闭
	$rootScope.collapsed = false;

	// 加载状态
	$rootScope.done = false;

	// 标题
	$rootScope.title = '今日一刻';

	// 导航默认索引
	$rootScope.currentKey = 0; 

	// 菜单动画
	$rootScope.toggle = function () {

		// 获得所有导航
		var navs = document.querySelectorAll('.navs dd');

		if($rootScope.collapsed) {
			// 打开状态 需要translate 为 -100%
			for(var i=navs.length - 1; i>0; i--) {
				navs[i].style.transform = 'translate(-100%)';
				navs[i].style.transitionDelay = '';
				navs[i].style.transitionDuration = 0.15 * (navs.length - i) + 's';
			}
		} else {
			// 关闭状态 需要translate 为 0
			for(var i=0; i<navs.length; i++) {
				navs[i].style.transform = 'translate(0)';
				navs[i].style.transitionDelay = '0.25s';
				navs[i].style.transitionDuration = 0.15 * (i + 1) + 's';
			}
		}
		// 
		$rootScope.collapsed = !$rootScope.collapsed;
	}

}]);

// 配置路由

