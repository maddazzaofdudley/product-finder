var pfApp = angular.module('pfApp', ['ngMaterial', 'ngRoute']);

var setup = function($mdThemingProvider, $routeProvider) {

	var customPrimary = {
			'50': '#ff6666',
			'100': '#ff4d4d',
			'200': '#ff3333',
			'300': '#ff1a1a',
			'400': '#ff0000',
			'500': '#e60000',
			'600': '#cc0000',
			'700': '#b30000',
			'800': '#990000',
			'900': '#800000',
			'A100': '#ff8080',
			'A200': '#ff9999',
			'A400': '#ffb3b3',
			'A700': '#660000'
	};
	$mdThemingProvider
			.definePalette('customPrimary', customPrimary);

	var customAccent = {
			'50': '#0affff',
			'100': '#00f0f0',
			'200': '#00d6d6',
			'300': '#00bdbd',
			'400': '#00a3a3',
			'500': '#008a8a',
			'600': '#007070',
			'700': '#005757',
			'800': '#003d3d',
			'900': '#002424',
			'A100': '#24ffff',
			'A200': '#3dffff',
			'A400': '#57ffff',
			'A700': '#000a0a'
	};
	$mdThemingProvider
			.definePalette('customAccent', customPrimary);

	var customWarn = {
			'50': '#ffb280',
			'100': '#ffa266',
			'200': '#ff934d',
			'300': '#ff8333',
			'400': '#ff741a',
			'500': '#ff6400',
			'600': '#e65a00',
			'700': '#cc5000',
			'800': '#b34600',
			'900': '#993c00',
			'A100': '#ffc199',
			'A200': '#ffd1b3',
			'A400': '#ffe0cc',
			'A700': '#803200'
	};
	$mdThemingProvider
			.definePalette('customWarn', customWarn);

	var customBackground = {
			'50': '#737373',
			'100': '#666666',
			'200': '#595959',
			'300': '#4d4d4d',
			'400': '#404040',
			'500': '#333',
			'600': '#262626',
			'700': '#1a1a1a',
			'800': '#0d0d0d',
			'900': '#000000',
			'A100': '#808080',
			'A200': '#8c8c8c',
			'A400': '#999999',
			'A700': '#000000'
	};
	$mdThemingProvider
			.definePalette('customBackground', customBackground);

 $mdThemingProvider.theme('default')
		 .primaryPalette('customPrimary')
		 .accentPalette('customAccent')
		 .warnPalette('customWarn')
		 .backgroundPalette('customBackground')

		 $routeProvider
	 		.when('/',
	 			{
	 				controller: 'homeController',
	 				templateUrl: '_home.html'
	 			})
	 		.when('/lookup',
	 			{
	 				controller: 'lookupController',
	 				templateUrl: '_lookup.html'
	 			})
			.when('/lookup/saleschannel/:channel/',
				{
					controller: 'lookupController',
					templateUrl: '_lookup.html'
				})
			.when('/lookup/saleschannel/:channel/path/',
				{
					controller: 'lookupController',
					templateUrl: '_lookup.html'
				})
			.when('/lookup/saleschannel/:channel/path/:path*/',
				{
					controller: 'lookupController',
					templateUrl: '_lookup.html'
				})
			.when('/product/:productid',
				{
					controller: 'productController',
					templateUrl: '_product.html'
				})
	 		.when ('/search',
	 			{
	 				controller: 'searchController',
	 				templateUrl: '_search.html'
	 			})
			.when ('/search/:query',
			 	{
					controller: 'searchController',
					templateUrl: '_search.html'
				})
	 		.when ('/help',
	 			{
	 				controller: 'helpController',
	 				templateUrl: '_help.html'
	 			})
	 		.when ('/contact',
	 			{
	 				controller: 'contactController',
	 				templateUrl: '_contact.html'
	 			})
	 		.otherwise({ redirectTo: '/' });

};

pfApp.config(setup);

var controllers = {};

var data = {};
var stage1Nodes = [];

controllers.searchHandler = function ($scope, $location) {

	$scope.searchText = {
		text: ''
	}

	$scope.validateAndSearch = function() {
		if ($scope.searchText.text == null || $scope.searchText.text == undefined || $scope.searchText.text == '') {
			window.alert('Please enter a search term');
		}

		else {
			$location.url('/search/' + $scope.searchText.text);
		}

	}
}

controllers.homeController = function ($scope, $http, $location) {

	$('.small-search-box').css('display', 'none');

	var baseLocation = $location.$$url;

	var objectListContainsName = function(list, name) {

		for (var i = 0; i < list.length; i++) {
			if (list[i].name == name) {
				return true;
			}
		}

		return false;

	}

	$scope.validateAndGo = function() {

		if ($scope.segmentSelect.SelectedOption.name == null || $scope.segmentSelect.SelectedOption.name == undefined || $scope.segmentSelect.SelectedOption.name == 'Please select a sales channel') {
			window.alert('Please select a sales channel');
		}
		else {
			$location.url('/lookup/saleschannel/' + $scope.segmentSelect.SelectedOption.name + '/path/');
		}
	}

	$scope.validateAndSearch = function() {
		if ($scope.searchText.text == null || $scope.searchText.text == undefined || $scope.searchText.text == '') {
			window.alert('Please enter a search term');
		}

		else {
			$location.url('/search/' + $scope.searchText.text);
		}

	}

	$scope.searchText = {text: ''}

	$scope.segmentSelect = {
		options: [
			{name: 'Please select a sales channel'},
			{name: 'SMB'},
			{name: 'SME'},
			{name: 'Large Enterprise'},
			{name: 'Mid Market'},
			{name: 'Public'},
			{name: 'Indirect Reseller'},
			{name: 'Wholesale'}
		],
		SelectedOption: {name: 'Please select a sales channel'}
	}

	$http.get('products.txt')
		.success(function (response) {
			data = response.data;
		})
		.error(function (response) {
			console.log(response);
		});

	$scope.buttonName = "Search";
	$scope.allSegments = ['SMB', 'SME', 'Large Enterprise', 'Mid Market', 'Public', 'Indirect reseller', 'Wholesale'];

	$scope.salesChannels = [
	{ name: 'Please select a Sales Channel', value: 'sC'},
	{ name: 'SMB', value: 'sMB' },
	{ name: 'SME', value: 'sME' },
	{ name: 'Large Enterprise', value: 'largeenterprise'},
	{ name: 'Mid Market', value: 'midmarket' },
	{ name: 'Public', value: 'public' },
	{ name: 'Indirect Reseller', value: 'indirectReseller' },
	{ name: 'Wholesale', value: 'wholesale' }
	];

	$scope.salesChannelSelect = { channel: $scope.salesChannels[0].value };

	$scope.hotSME = [{ text: 'Local SIM', link: 'index.html#/product/1194' }, { text: 'Vodafone One Net Business', link: 'index.html#/product/1259' }, { text: 'Dedicated Internet Access', link: 'index.html#/product/1255' }];
	$scope.hotMM = [{ text: 'Vodafone One Net Enterprise-Cloud', link: 'index.html#/product/1241' }, { text: 'Primary Storage', link: 'index.html#/product/1204' }, { text: 'Dedicated Internet Access', link: 'index.html#/product/1255' }];
	$scope.hotSMB = [{ text: 'Vodafone One Net Express', link: 'index.html#/product/1244' }, { text: 'Vodafone One Net Business', link: 'index.html#/product/1259' }, { text: 'Office 365', link: 'index.html#/product/1184' }];
	$scope.hotPublic = [{ text: 'Total Managed Mobility', link: 'index.html#/product/1225' }, { text: 'Total Mobile', link: 'index.html#/product/1271' }, { text: 'PSN Connect', link: 'index.html#/product/1212' }];
	$scope.hotLE = [{ text: 'IP-VPN', link: 'index.html#/product/1211' }, { text: 'Private Cloud', link: 'index.html#/product/1289' }, { text: 'Ethernet Wireline', link: 'index.html#/product/1280' }];

	$scope.go = function() {
			window.alert("Please select a sales channel first");
	}
}

controllers.searchController = function($scope, $http, $routeParams, $location) {

	$('.small-search-box').css('display', 'inline');

	sessionStorage.removeItem('channel');

	var getSearchResults = function(data) {

		var searchResults = [];
		var query = $routeParams.query;

		data.forEach(function(element){
			if (element.label.toLowerCase().indexOf(query.toLowerCase()) > -1) {
				searchResults.push(element);
			}
		});

		displaySearchResults(query, searchResults);

	}

	var displaySearchResults = function (query, results) {

		$scope.query = query;
		$scope.numberOfResults = results.length;

		$scope.searchResults = [];

		results.forEach(function(element) {
			$scope.searchResults.push({
				title: element.label,
				url: 'index.html#/product/' + element.id,
				salesChannels: (element.sales_channel == null || element.sales_channel == undefined) ? [] : element.sales_channel,
				description: element.short_description
			});
		});

	}

	if (data.length == 0 || data.length == undefined) {
		$http.get('products.txt')
			.success(function (response) {
				data = response.data;
				getSearchResults(data);

			})
			.error(function (response) {
				console.log(response);
			});
	}

	else {
		getSearchResults(data);
	}



}

controllers.lookupController = function($scope, $http, $routeParams, $location) {

	$('.small-search-box').css('display', 'inline');

	sessionStorage.setItem('channel' , $routeParams.channel);

	var getProductFromID = function(id) {

		var ret;

		data.forEach(function(x) {
			if (x.id == id) {
				ret = x;
			}
		})

		return ret;
	}

	$scope.validateAndSearch = function() {
		if ($scope.searchText.text == null || $scope.searchText.text == undefined || $scope.searchText.text == '') {
			window.alert('Please enter a search term');
		}

		else {
			$location.url('/search/' + $scope.searchText.text);
		}

	}

	angular.element(document).ready(function () {

		var getProductFromID = function(id) {

			var ret;

			data.forEach(function(x) {
				if (x.id == id) {
					ret = x;
				}
			})

			return ret;
		}

		$('.circles-container').on('mouseenter', '.tags p', function() {
			$(this).append('<div class="hover-over">' + $(this).data('hover-text') + '</div>');
		})

		$('.circles-container').on('mouseleave', '.tags p', function() {
			$(this).children('.hover-over').remove();
		})

		$('.circles-container').on('click', '.info', function() {

			if ($(this).parent().find('.popover').length == 0) {
				var nodeName = $(this).siblings().find('.circle-name').html()
				var product = getProductFromID($(this.parentElement).data('product-id'));

				var nodeInfoObject = $(product.category_product_line_descriptions[product.category_product_line.indexOf(nodeName)]);

				if (product.category_product_line.indexOf(nodeName) == -1) {
					nodeInfoObject = $('<p>' + product.short_description + '</p>');
				}

				if (nodeInfoObject.length == 0) {
					nodeInfoObject = $('<p>Product Finder is based on content that is currently available today. If there is limited or no information this may be because there is no content available or it needs to be refreshed. Please contact us to find out more.</p>');
				}
				nodeInfoObject.addClass('popover');
				nodeInfoObject.addClass('info-popover');
				$('.info-popover').remove();
				$(this).parent().append(nodeInfoObject);
			}

			else {
				$(this).parent().find('.popover').remove();
			}

		})

		$('.child').find('.circle-name').each(function (element) {
			if (this.textContent.length > 25) {
				$(this).css('font-size', '13px');
			}
		})
	})

	$scope.base = $location.$$url;
	var salesChannelUrl = $scope.base.split('//path//')[0];
	$scope.salesChannel = $routeParams.channel;

	var objectListContainsName = function(list, name) {

		for (var i = 0; i < list.length; i++) {
			if (list[i].name == name) {
				return true;
			}
		}

		return false;

	}

	var generateNode = function(data, currentLevel, element) {
		var name = element.category_product_line[currentLevel];
		var path = 'index.html#' + $scope.base + element.category_product_line[currentLevel];
		var colour = (element.colour[currentLevel] == null || element.colour[currentLevel] == undefined) ? element.colour[0] : element.colour[currentLevel];
		var furtherNodes = [];

		return {name: name,
			path: path,
			furtherNodes: furtherNodes,
			colour: '#' + colour,
			type: 'category',
			infoAvailable: true,
			id: element.id
		};
	}

	var makeRing = function() {
		var container = $('.circles-container');
		var circles = $('.circle-link.child');
		var width = container.width();
		var height = container.height();
		var step = (2*Math.PI) / circles.length;
		var radius = 170;
		var angle = 3.16;

		circles.each(function() {
			var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
			var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);

			$(this).css({
				left: x + 'px',
				top: y + 'px'
			});
			angle = angle + step;
		});

		var parentCircle = $('.parent-circle');

		parentCircle.css({
			left: (width/2 - parentCircle.width()/2) + 'px',
			top: (height/2 - parentCircle.height()/2) + 'px'
		})

	}

	var getNextNodes = function(data) {

		var nextLevelNodes = [];

		if ($routeParams.path != undefined) {
			var journey = $routeParams.path.split('/');
			$scope.steps = [];

			for (i = 0; i < journey.length - 1; i++) {
				$scope.steps.push({text: journey[i], path: encodeURIComponent(decodeURIComponent($scope.base).split('/' + journey[i + 1] + '/')[0])})
			}

			var currentLevel = journey.length;
			$scope.currentLevelName = journey[journey.length - 1];
			$scope.nextLevelName = journey[journey.length];

			data.forEach(function(element) {
				if (element.category_product_line != undefined) {
					if (element.category_product_line[currentLevel - 1] != undefined && (element.category_product_line[currentLevel - 1] == $scope.currentLevelName) && !(objectListContainsName(nextLevelNodes, element.category_product_line[currentLevel])) && (element.sales_channel == null || element.sales_channel.indexOf($scope.salesChannel) != -1)) {
						if (element.category_product_line.length <= currentLevel) {
							nextLevelNodes.push({
								id: element.id,
								name: element.label,
								path: 'index.html#/product/' + element.id,
								gms: element.gms_category != null ? element.gms_category : '',
								status: element.status != null ? element.status : '',
								colour: element.colour[currentLevel] == null || element.colour[currentLevel] == undefined ? '#' + element.colour[0] :  '#' + element.colour[currentLevel],
								type: 'product',
								infoAvailable: true
							});
						}
						else {
							nextLevelNodes.push(generateNode(data, currentLevel, element))
						}

					}
				}
			})
			$scope.circles = nextLevelNodes;

			angular.element(document).ready(function () {

				var parentCircle = '<div class="circle-link parent-circle"><a><div style="background-color: ' + $($('.circle')[0]).css('background-color') + '" class="circle"><p class="circle-name">' + $scope.currentLevelName + '</p></div></a></div>';

				$('.circles-container').prepend(parentCircle);

				if (window.innerWidth > 560) {
					makeRing();
				}

				$(window).resize(function() {

					if (window.innerWidth > 560) {
						makeRing();
					}

					else {
						$('.circle-link').css('top', '');
						$('.circle-link').css('left', '');
					}

				});

			})

		}

		else {

			stage1Nodes = [];

			data.forEach(function(element) {
				if (element.category_product_line != undefined) {
					if (element.category_product_line[0] != undefined && !(objectListContainsName(stage1Nodes, element.category_product_line[0])) && element.sales_channel != null && element.sales_channel != undefined && element.sales_channel.indexOf($scope.salesChannel) != -1) {
						stage1Nodes.push({name: element.category_product_line[0], path: 'index.html#' + $scope.base + element.category_product_line[0], colour: '#' + element.colour[0], type: 'category', infoAvailable: true, id: element.id, level: 'first' });
					}
				}
			})
			$scope.circles = stage1Nodes;

			angular.element(document).ready(function () {
				var circles = $('.circle-link');

				$('.circles-container').css({
					height: 'auto'
				})

				circles.css({
					position: 'relative',
					margin: '20px'
				})

			})

		}
	}

	if (data.length == 0 || data.length == undefined) {
		$http.get('products.txt')
			.success(function (response) {
				data = response.data;
				getNextNodes(data);

			})
			.error(function (response) {
				console.log(response);
			});
	}

	else {
		getNextNodes(data);
	}
}

controllers.productController = function($scope, $http, $routeParams, $sce) {

	$scope.validateAndSearch = function() {
		if ($scope.searchText.text == null || $scope.searchText.text == undefined || $scope.searchText.text == '') {
			window.alert('Please enter a search term');
		}

		else {
			$location.url('/search/' + $scope.searchText.text);
		}

	}

	var getProductFromID = function(id) {

		var ret;

		data.forEach(function(x) {
			if (x.id == id) {
				ret = x;
			}
		})

		return ret;
	}

	$('.small-search-box').css('display', 'inline');

	$scope.altProducts = [];

	var arraysEqual = function(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (b.length != a.length ) return false;

		for (var i = 0; i < a.length; ++i) {
    		if (a[i] !== b[i]) return false;
  		}

		return true;

	}

	var getProductsInCategory = function(data, categoryPath) {

		var productsInCategory = []

		data.forEach(function (element) {
			if (arraysEqual(element.category_product_line, categoryPath)) {
				productsInCategory.push(element);
			}
		});

		return productsInCategory;

	}

	var constructChart = function (roadmap) {

		var startYear = new Date().getFullYear();
		var numberOfYears = 2;


		var yearLabelsMarkup = '<div class="year-labels">';
		yearLabelsMarkup += '<span class="first-year">' + (startYear) + '</span>';
		yearLabelsMarkup += '<span class="second-year">' + (startYear + 1) + '</span>';
		yearLabelsMarkup += '</div>';

		var year1Markup = '<div class="year year1"><div class="quarter">' +
			'<div class="month"></div>' +
			'<div class="month"><span>Q1</span></div>' +
			'<div class="month last"></div>' +
		'</div>' +
		'<div class="quarter">' +
			'<div class="month"></div>' +
 			'<div class="month"><span>Q2</span></div>' +
			'<div class="month last"></div>' +
			'</div>' +
		'<div class="quarter">' +
			'<div class="month"></div>' +
			'<div class="month"><span>Q3</span></div>' +
			'<div class="month last"></div>' +
		'</div>' +
		'<div class="quarter last">' +
			'<div class="month"></div>' +
			'<div class="month"><span>Q4</span></div>' +
			'<div class="month last"></div>' +
		'</div></div>';

		var year2Markup = '<div class="year year2"><div class="quarter">' +
			'<div class="month"></div>' +
			'<div class="month"><span>Q1</span></div>' +
			'<div class="month last"></div>' +
		'</div>' +
		'<div class="quarter">' +
			'<div class="month"></div>' +
 			'<div class="month"><span>Q2</span></div>' +
			'<div class="month last"></div>' +
			'</div>' +
		'<div class="half last">' +
			'<div><span>H2</span></div>'
		'</div></div>';

		var chartMarkup = '<div class="chart">';
		chartMarkup += year1Markup;
		chartMarkup += year2Markup;
		chartMarkup += '</div>';

		angular.element(document).ready(function () {
			$('.roadmaps').prepend(chartMarkup);
			$('.roadmaps').prepend(yearLabelsMarkup);
		})


	}

	var convertDate = function (s) {
		s = s.substring(0, s.indexOf('T'));
		s = s.split('-');

		return new Date(s[0], s[1], s[2]);
	}

	var constructRoadmap = function(product) {

		var title = product.label;
		var roadmap = product.roadmap;
		var lines = [];

		var roadmapMarkup = '<div class="roadmap-graph">' +
			'<p data-product-id="' + product.id + '" class="title">' + title + '</p><div class="lines-container"></div></div>';

		angular.element(document).ready(function () {
			$('.roadmaps').append(roadmapMarkup);
		});

		for (var i = 0; i < roadmap.length; i++) {

			try {
				var startDate = convertDate(roadmap[i].field_developed_from.und[0].value);
				var endDate = convertDate(roadmap[i].field_release_date.und[0].value);

				if (endDate.getFullYear() < new Date().getFullYear() - 1 || startDate.getFullYear() > new Date().getFullYear() + 2) {
					return false;
				}

				else {
					var status = roadmap[i].field_roadmap_status.und[0].value.toLowerCase();
					var diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
					var lineLength = Math.ceil((diffDays / 730) * 100);

					var startDiff = Math.ceil((startDate.getTime() - new Date(new Date().getFullYear(), 00, 01).getTime()) / 86400000);
					var gapLeftPercent = Math.ceil((startDiff / 730) * 100) + 6;

					var lineMarkup ='<div class="line '+ status +'" style="' + 'width: ' + lineLength + '%; left: '+ gapLeftPercent +'%">' +
						'<div class="point ' + status +'">' +
							'<a class="product-link" data-product-id="' + product.id + '" data-roadmap-index="' + i + '">'+ roadmap[i].field_roadmap_name.und[0].value +'</a>' +
						'</div>' +
					'</div>';

					lines.push(lineMarkup);
				}
			}

			catch(error) {

			}

		}

		angular.element(document).ready(function () {
			lines.forEach(function(line) {
				$('.roadmaps .roadmap-graph').last().children('.lines-container').append(line);
			})
		})



	}

	var isRoadmapComplete = function(roadmap) {

		var isComplete = true;

		roadmap.forEach(function(element) {

			if (element.length == 0 ) isComplete = false;
			if (element.field_developed_from == undefined || element.field_developed_from == null) isComplete = false;
			if (element.field_developed_from.und == undefined || element.field_developed_from.und == null || element.field_developed_from.und.length == 0) isComplete = false;
			if (element.field_name == undefined || element.field_name == null) isComplete = false;
			if (element.field_release_date.und == undefined || element.field_release_date.und == null || element.field_release_date.und.length == 0) isComplete = false;
			if (element.field_roadmap_description.length == 0) isComplete = false;
			if (element.field_roadmap_name.length == 0) isComplete = false;
			if (element.field_roadmap_status.length == 0) isComplete = false;

		})

		return isComplete;

	}

	var construct = function (product) {

		if (product.alternative_products != null && product.alternative_products != undefined && product.alternative_products != []) {
			product.alternative_products.forEach(function(id) {
				var alternateProduct = getProductFromID(id);
				$scope.altProducts.push({label: alternateProduct.label, link: 'index.html#/product/' + alternateProduct.id});
			})
		}

		if (product.roadmap_available != 'Yes') {
			$('md-tabs-wrapper').css('display', 'none');
		}

		if (product.roadmap_available != null && product.roadmap_available != undefined && product.roadmap_available == 'Yes') {
			if (isRoadmapComplete(product.roadmap)) {

				angular.element(document).ready(function () {
					$('.unavailable-roadmap').css('display', 'none');
					$('.no-roadmap').css('display', 'none');
				});

				constructChart(product.roadmap);

				data.forEach(function(item) {
					if (item.abstract_id == product.abstract_id) {
						constructRoadmap(item);
					}

					else if (item.parent_product_id == product.abstract_id) {
						constructRoadmap(item);
					}
				})
			}
			else {
				angular.element(document).ready(function () {
					$('.no-roadmap').css('display', 'none');
					$('.roadmap-colours').css('display', 'none');
					$('.roadmap-description').css('display', 'none');
				});

				console.log('Roadmap incomplete');
			}
		}

		else {
			angular.element(document).ready(function () {
				$('.unavailable-roadmap').css('display', 'none');
				$('.roadmap-colours').css('display', 'none');
				$('.roadmap-description').css('display', 'none');
			});

			console.log('Roadmap unvailable');
		}

	}

	var initProductFields = function (product) {

		$scope.steps = [];
		var pathProgress = '';

		for (var i = 0; i < product.category_product_line.length; i++) {

			pathProgress = pathProgress + encodeURIComponent(product.category_product_line[i]) + '/';

			$scope.steps.push({
				text: product.category_product_line[i],
				path: 'index.html#/lookup/saleschannel/' + sessionStorage.getItem('channel') + '/path/' + pathProgress,

			})
		}

		$scope.backLink = $scope.steps[$scope.steps.length - 1].path;

		var MCproperties = [];


		if (product.battlecard) MCproperties.push({ name: 'Battlecard', link: product.battlecard });
		if (product.data_sheet) MCproperties.push({ name: 'Data Sheet', link: product.data_sheet });
		if (product.cheat_sheet) MCproperties.push({ name: 'Cheat Sheet', link: product.cheat_sheet });
		if (product.product_briefing) MCproperties.push({ name: 'Product Briefing', link: product.product_briefing });
		if (product.customer_brochure) MCproperties.push({ name: 'Customer Brochure', link: product.customer_brochure });
		if (product.customer_presentation) MCproperties.push({ name: 'Customer Presentation', link: product.customer_presentation });
		if (product.customer_case_study) MCproperties.push({ name: 'Customer Case Study', link: product.customer_case_study });
		if (product.internal_presentation) MCproperties.push({ name: 'Internal Presentation', link: product.internal_presentation });

		$(product.additional_resource).each(function(index) {
			MCproperties.push({ name: this.title, link: this.url });
		})

		var TIproperties = [];

		if (product.msa) TIproperties.push({ name: 'MSA', link: product.msa });
		if (product.pricing_schedule) TIproperties.push({ name: 'Pricing Schedule', link: product.pricing_schedule });
		if (product.service_definition) TIproperties.push({ name: 'Service Definition', link: product.service_definition });
		if (product.on_boarding_form) TIproperties.push({ name: 'Order Form', link: product.on_boarding_form });


		$scope.product = {
			id: product.id,
			name: product.label,
			benefits: product.benefits,
			channel: $routeParams.channel,
			description: product.description,
			gms: product.gms_category != null ? product.gms_category : '',
			status: product.status != null ? product.status : '',
			MCproperties: MCproperties,
			TIproperties: TIproperties
		}

		angular.element(document).ready(function () {
			$('.mk-opener').on('click', function() {
				$('.popover').not('.mk-popup').addClass('hidden');
				$('.mk-popup').toggleClass('hidden');
			})

			$('.ti-opener').on('click', function () {
				$('.popover').not('.ti-popup').addClass('hidden');
				$('.ti-popup').toggleClass('hidden');
			})

			if ($('.ti-popup').children().length == 0) {
				$('.ti-popup').append('<span>Sorry! there doesn\'t appear to be any content here.</span>');
			}

			if ($('.mk-popup').children().length == 0) {
				$('.mk-popup').append('<span>Sorry! there doesn\'t appear to be any content here.</span>');
			}

			if ($('.benefits p').text() == '') {
				$('.benefits').remove();
			}

			if ($('.alternative-products').children('ul').length == 0) {
				$('.alternative-products').append('<p></p>');
			}
		});

		$scope.descriptionElement = $sce.trustAsHtml(product.description);

	}

	if (data.length == 0 || data.length == undefined) {
		$http.get('products.txt')
			.success(function (response) {
				data = response.data;

				var product = data.filter(function (element) {
					if (element.id != undefined || element.id != null) {
						return element.id == $routeParams.productid;
					}
					return false;
				})[0]

				initProductFields(product);

				construct(product);

			})
			.error(function (response) {
				console.log(response);
			});
	}
	else {

		var product = data.filter(function (element) {
			if (element.id != undefined || element.id != null) {
				return element.id == $routeParams.productid;
			}
			return false;
		})[0]

		initProductFields(product);

		construct(product);

	}

	var constructThemeMarkup = function (theme) {

		var pointList = theme.field_roadmap_description.und[0].value.split('*');

		var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"];

		var markup = '<div class="theme">';

		var themeText = theme.field_roadmap_description.und[0].value;

		var splitreleaseDate = theme.field_release_date.und[0].value.substring(0, theme.field_release_date.und[0].value.indexOf('T')).split('-');

		var releaseDate = new Date(splitreleaseDate[0], splitreleaseDate[1] - 1, splitreleaseDate[2])

		markup += '<p>' + theme.field_roadmap_name.und[0].value + ', <span class="' + theme.field_roadmap_status.und[0].value.toLowerCase() + '">' +
			theme.field_roadmap_status.und[0].value.toLowerCase() + ' </span>' +  ' - target release ' + monthNames[releaseDate.getMonth()] + ' ' + releaseDate.getFullYear() + '</p>';


		pointList.forEach(function(point) {
			markup += '<div class="line"><div class="dash"></div><p class="point">' + point.trim() + '</p></div>'
		})

		return markup += '</div>';
	}

	var constructTheme = function(productid, roadmapIndex) {

		var product = getProductFromID(productid);

		var themePage = '<div class="theme-page">';
		themePage += '<h1 class="product-name"><span class="back-to-graph">< </span>' + product.label + '</h1>';

		if (roadmapIndex == undefined || roadmapIndex == null) {
			product.roadmap.forEach(function(line) {
				themePage += constructThemeMarkup(line);
			})
		}

		else {
			themePage += constructThemeMarkup(product.roadmap[roadmapIndex]);
		}

		if (product.alternative_products != null && product.alternative_products != undefined && product.alternative_products.length != 0) {
			var altProducts = [];
			product.alternative_products.forEach(function(id) {
				altProducts.push(getProductFromID(id));
			})

			var altProductsMarkup = '<div class="alt-products"><h2>Alternative Products</h2>';

			altProducts.forEach(function(product) {
				altProductsMarkup += '<a class="product" href="index.html#/product/' + product.id + '">' + product.label + '</a>'
			})

			altProductsMarkup += '</div>';

			themePage += altProductsMarkup;
		}



		return themePage += '</div>';

	}

	angular.element(document).ready(function () {
		$('.roadmaps').on('click', '.roadmap-graph .title', function() {
			$('.roadmaps').css('display', 'none');
			$('.roadmap-colours').css('display', 'none');
			$('.roadmap-description').css('display', 'none');
			$('.roadmap-tab').append(constructTheme($(this).data('product-id'), $(this).data('roadmapIndex')));
		})

		$('.tags').on('mouseenter', 'p', function() {
			$(this).append('<div class="hover-over">' + $(this).data('hover-text') + '</div>');
		})

		$('.tags').on('mouseleave', 'p', function() {
			$(this).children('.hover-over').remove();
		})

		if (!sessionStorage.getItem('channel')) {
			$('.product-back-button').css('display', 'none');
			$('.product-partial').css('margin-top', '56px');
		}

	})

	angular.element(document).ready(function () {
		$('.roadmaps').on('click', '.point .product-link', function() {
			$('.roadmaps').css('display', 'none');
			$('.roadmap-colours').css('display', 'none');
			$('.roadmap-description').css('display', 'none');
			$('.roadmap-tab').append(constructTheme($(this).data('product-id'), $(this).data('roadmapIndex')));
		})
	})

	angular.element(document).ready(function() {
		$('.roadmap-tab').on('click', '.back-to-graph', function() {
			$('.theme-page').remove();
			$('.roadmaps').css('display', 'block');
			$('.roadmap-colours').css('display', 'block');
			$('.roadmap-description').css('display', 'block');
		})
	})

}

controllers.contactController = function () {

}

controllers.helpController = function () {

	$('.small-search-box').css('display', 'inline');

	$('.question').on('click', function() {
		$(this).parent().toggleClass('closed');
	})
}

pfApp.controller(controllers);
