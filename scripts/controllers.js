
angular.module('Controllers', [])

.controller('DemoController', ['$scope', function ($scope) {
	// 
}])
// 导航对应的控制器
.controller('NavsController', ['$scope', function ($scope) {

	$scope.navs = [
		{link: '#/today', text: '今日一刻', icon: 'icon-home'},
		{link: '#/older', text: '往期内容', icon: 'icon-file-empty'},
		{link: '#/author', text: '热门作者', icon: 'icon-pencil'},
		{link: '#/category', text: '栏目浏览', icon: 'icon-menu'},
		{link: '#/like', text: '我的喜欢', icon: 'icon-heart'},
		{link: '#/settings', text: '设置', icon: 'icon-cog'},
	];

}])
.controller('TodayController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	// 选中状态
	$rootScope.title = '今日一刻';
	$rootScope.currentKey = 0;

	$rootScope.done = false;

	$http({
		url: './api/today.php?callback=JSON_CALLBACK',
		method: 'jsonp'
	}).success(function (data) {
		console.log(data);

		$scope.posts = data.posts;

		// 日期
		$scope.date = data.date;

		// 加载完成
		$rootScope.done = true;
	});

}])
.controller('OlderController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

	// 选中状态
	$rootScope.title = '往期内容';
	$rootScope.currentKey = 1;

	$rootScope.done = false;

	$http({
		url: './api/older.php?callback=JSON_CALLBACK',
		method: 'jsonp',
		params: {
			date: '2016-10-12'
		}
	}).success(function (data) {

		// 加载过完成
		$rootScope.done = true;

		// 获取到的数据
		$scope.posts = data.posts;

		// 日期
		$scope.date = data.date;
	});

}])

// 热门作者
.controller('AuthorController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

	$rootScope.currentKey = 2;
	$rootScope.title = '热门作者';
	$rootScope.done = false;

	$http({
		url: './api/author.php',
		method: 'get'
	}).success(function (data) {
		console.log(data);

		$rootScope.done = true;

		$scope.recs = data.rec;
		$scope.alls = data.all;
	});

}])

// 
.controller('CategoryController', ['$scope', function ($scope) {

}])

.controller('LikeController', ['$scope', function ($scope) {

}])

.controller('SettingsController', ['$scope', function ($scope) {

}])
