/* 
* @Author: juve
* @Date:   2014-07-25 22:29:54
* @Last Modified by:   juve
* @Last Modified time: 2014-07-31 17:03:50
*/

'use strict';

/* App Module */

var APP = angular.module('app', [
  'Controllers',
  'Directives'
]);

// ugly copypaste
var filterUtility = {};
filterUtility.getFormatNumberWithCommasFunction = function(round, decimals) {
	return function(n) {
		if (isNaN(n) || n === '' || n === Infinity) {
			return n;
		}

		if(round) {
			n = filterUtility.round(n, decimals);
		}

		var parts = String(n).split('.');
		n = parts[0];
		var fraction = parts.length > 1 ? '.' + parts[1] : '';


		var segment = n.length % 3;
		var result = [];
		var i = 0;

		if (segment == 0) {
			segment = 3;
		}

		do {
			var s = n.substring(i, i + segment);
			result[result.length] = s;
			i += segment;

			if (i < n.length) {
				result[result.length] = ',';
			}

			segment = 3;
		} while(i < n.length)

		return result.join('') + fraction;			
	}
}

/* Controllers */

angular.module('Controllers', [])

.controller('MainCtrl', ['$scope',
  function($scope, $element) {
  	$scope.paperShowing = false;

  	$scope.showPaper = function() {
  		$scope.$apply(function() {
  			$scope.paperShowing = true;
  		});
  	};

  	$scope.hidePaper = function() {
  		$scope.$apply(function() {
  			$scope.paperShowing = false;
  			$scope.$broadcast('hidePaper');
  		});
  	}

  	$scope.dotGraphData = {
    totalScale: [0, 10000],
    metricScale: [0, 120],
    totals: {
      Facebook: [7800, 6800],
      Twitter: [8200, 7800],
      LinkedIn: [4500, 3800],
      Pinterest: [3000, 3100],
      'Google+': [3000, 2560]
    },
    metrics: {
      'Revenue/Share': {
        Facebook: [100, 60],
        Twitter: [77, 85],
        LinkedIn: [70, 60],
        Pinterest: [50, 45],
        'Google+': [55, 60]
      },
      'Revenue/Transaction': {
        Facebook: [68, 105],
        Twitter: [90, 70],
        LinkedIn: [25, 75],
        Pinterest: [60, 40],
        'Google+': [10, 20]
      },
      'Revenue/Visit': {
        Facebook: [50, 65],
        Twitter: [72, 65],
        LinkedIn: [18, 65],
        Pinterest: [64, 25],
        'Google+': [35, 25]
      },
      'Avg. Order Value': {
        Facebook: [67, 80],
        Twitter: [76, 80],
        LinkedIn: [51, 35],
        Pinterest: [33, 35],
        'Google+': [46, 70]
      }
    }
  }

  $scope.groupStack = "STACKED";

  $scope.barChartModel = {
    stacked: {
      data: {
        Facebook: [1000, 1400, 532, 300, 400],
        Twitter: [1400, 1000, 332, 300, 400],
        LinkedIn: [900, 900, 532, 300, 400],
        Pinterest: [800, 1000, 432, 300, 400],
        'E-Mail': [850, 970, 332, 300, 400]
      },
      maxVal: 3732
    },
    impressions: {
      data: {
        Facebook: [820, 900],
        Twitter: [583, 683],
        LinkedIn: [425, 225],
        Pinterest: [400, 420],
        'E-Mail': [367, 340]
      },
      maxVal: 900
    },
    uniqueVisitsFromES: {
      data: {
        Facebook: [820, 900],
        Twitter: [583, 683],
        LinkedIn: [425, 225],
        Pinterest: [400, 420],
        'E-Mail': [367, 340]
      },
      maxVal: 900   
    },
    pagesPerUniqueVisit: {
      data: {
        Facebook: [650, 700],
        Twitter: [440, 483],
        LinkedIn: [425, 225],
        Pinterest: [490, 380],
        'E-Mail': [367, 340]
      },
      maxVal: 700   
    },
    uniqueVisitsAndConvPerShare: {
      data: {
        Facebook: [2.8, 2.4, 3.6, 3.4],
        Twitter: [2.0, 2.6, 3.6, 3.4],
        LinkedIn: [2.4, 2.3, 3.2, 2.6],
        Pinterest: [1.2, 1.4, 2.0, 2.0],
        'E-Mail': [1.1, 1.0, 2.0, 2.0]
      },
      maxVal: 3.4   
    },
    bounceRate: {
      data: {
        Facebook: [66, 60],
        Twitter: [78, 40],
        LinkedIn: [70, 20],
        Pinterest: [44, 40],
        'E-Mail': [22, 44] 
      },
      maxVal: 78
    },
    fastestToConvert: {
      data: {
        Facebook: [820, 700],
        Twitter: [583, 483],
        LinkedIn: [425, 550],
        Pinterest: [400, 380],
        'E-Mail': [367, 400]
      },
      maxVal: 820   
    },
    returnVisitRate: {
      data: {
        Facebook: [66, 60],
        Twitter: [78, 40],
        LinkedIn: [70, 20],
        Pinterest: [44, 40],
        'E-Mail': [22, 44] 
      },
      maxVal: 78   
    },
    timeOnSite: {
      data: {
        Facebook: [820, 700],
        Twitter: [583, 483],
        LinkedIn: [425, 225],
        Pinterest: [400, 380],
        'E-Mail': [367, 340]
      },
      maxVal: 820   
    },
    clicks: {
      data: {
        Facebook: [820, 700],
        Twitter: [583, 483],
        LinkedIn: [425, 225],
        Pinterest: [400, 380],
        'E-Mail': [367, 340]
      },
      maxVal: 820   
    }
  }

  $scope.channelColors = {
      All: '#FF6D00',
      Facebook: '#3468A9',
      Twitter: '#27AAE0',
      LinkedIn: '#066C9A',
      Pinterest: '#C91F27',
      'Google+': '#39B549',
      'E-Mail': '#9AC1BE',
      'Learning Center': '#fd6f5a',
    }

    $scope.conversionColors = ['#DF525A','#B1D235','#5F2C91','#D2914C','#5CB5A0'];

    $scope.stackSwitch = function() {
    	if ($scope.groupStack === "STACKED") {
    		$scope.groupStack = "GROUPED";
    	} else {
    		$scope.groupStack = "STACKED";
    	}
    }
  }]);

/* Directives */

angular.module('Directives', [])

.filter('numberwithcommas', function() {
		return filterUtility.getFormatNumberWithCommasFunction(false, null);
	})

.filter('timeToConvert', function() {
		return function(minutes) {
			var formattedMinutes = String(minutes % 60).length === 1 ?
				'0' + String(minutes % 60) : String(minutes % 60);
			return String(Math.floor(minutes / 60)) + ':' + formattedMinutes;
		};
	})

.filter('peoplescorepercent', function() {
		return function(p) {
			return String(p.toFixed(0)) + '%';
		}
	})
.directive('dotgraph', function($filter, $timeout, $window) {
  return {
    restrict: 'E',
    scope: {
      model: '=ngModel',
      channelColors: '='
    },
    link: function(scope, element, attrs) {
      var leftPadding = element[0].previousElementSibling.offsetWidth + 45,  //width of subHeader plus padding
          topPadding = 32,
          labelOffset = 45, //space between metric labels and graph
          dividerTopPadding = 50, //height from total line to divider
          dividerBottomPadding = 45, //height form divider to first metric line
          metricLinePadding = 45, // height from metric to metric  
          dotRadius = 6.5,
          dashedLineWeight = 0.5,
          solidLineWeight = 1,
          initAnimateTime = 1500,
          reAnimateTime = 333,
          animationType = '<>',
          colors = {
            font: '#999999',
            label: '#777777',
            dashedLine: 'lightgrey',
            solidLine: '#49BFB3',
            faded: '#F6F6F6',
            zebra: '#FF6D00'
          };
      //extend color parameter with UberControllers' channelColors
      angular.extend(colors, scope.channelColors);
    
      var width,height,paper,yPos,xScalarTotal,xScalarMetric,bgSet,graph;
      
      scope.activeChannel = '';
      scope.hold = false;
      scope.uberHold = false;

      Draw();

      function Draw() {
        if(paper) {
            paper.remove();
        }

        if (scope.model.metricScale && scope.model.metricScale.length > 0) { // arbitrary way to make sure model has data
        graph = {};
        graph.buttons = [];
        graph.activeButton;
        //count number of metrics, for setting height
        var count = 0;
        angular.forEach(scope.model.metrics, function(){
          count += 1;
        })
        //set up paper
        height = topPadding + dividerTopPadding + dividerBottomPadding + (count * metricLinePadding) - 20;
        width = element[0].parentNode.offsetWidth;
        paper = Raphael(element[0], width, height);
        //set of elements that are always in the background
        bgSet = paper.set()
        //scalars
        xScalarTotal = (width - leftPadding) / (scope.model.totalScale[1] - scope.model.totalScale[0]);
        xScalarMetric = (width - leftPadding) / (scope.model.metricScale[1] - scope.model.metricScale[0]);
        xScalarTotal = xScalarTotal === Infinity ? 0 : xScalarTotal;
        xScalarMetric = xScalarMetric === Infinity ? 0 : xScalarMetric;
        //graph background with click event to clear held activeChannel
        graph.bg = paper.rect(0,0,width,height)
                        .attr({'stroke': 'white', 'fill': 'white', 'stroke-opacity': 0, 'fill-opacity': 0})
                        .click(function(){
                            if (!scope.uberHold) {
                              scope.hold = false;
                              scope.activeChannel = '';
                              scope.$emit('sidebarClear');
                              scope.$digest();
                            }
                        })  
        bgSet.push(graph.bg);
        //total line and labels
        graph.totalLine = paper.path('M' + (leftPadding - dotRadius) + ',' + topPadding + 'l' + (width-leftPadding) + ',0')
                               .attr({'stroke-width': dashedLineWeight, 'stroke': colors.dashedLine, 'stroke-dasharray': '7 7'});
        bgSet.push(graph.totalLine);
        graph.totalLabelLeft = paper.text(leftPadding - dotRadius, topPadding-15, '$'+($filter('numberwithcommas')(scope.model.totalScale[0])))
                                    .attr({'font-size': 11, 'fill': colors.font, 'font-family': 'robotoLight', 'text-anchor': 'start'});
        graph.totalLabelRight = paper.text(width, topPadding-15, '$'+($filter('numberwithcommas')(scope.model.totalScale[1])))
                                     .attr({'font-size': 11, 'fill': colors.font, 'font-family': 'robotoLight', 'text-anchor': 'end'});
        //graph keys
        graph.otherKey = paper.set();
        graph.otherKey.push(
          paper.text(dotRadius * 3, topPadding + dividerTopPadding, 'Multiple Channels ')
               .attr({'text-anchor': 'start', 'font-family': 'ralewayLight', 'fill': colors.label, 'font-size': 12}),
          paper.circle(dotRadius+1, topPadding + dividerTopPadding, dotRadius)
               .attr({'fill': colors.zebra, stroke: 'none'}),
          paper.image('img/MultiDotMask.svg', 1, topPadding + dividerTopPadding - dotRadius, dotRadius*2, dotRadius*2)
          )
        
        graph.key = paper.set();
        graph.key.push(
          paper.text(leftPadding - labelOffset, topPadding + dividerTopPadding - 2, 'Facebook')
               .attr({'text-anchor': 'end', 'font-family': 'ralewayLight', 'fill': colors.label, 'font-size': 16}),
          paper.text(dotRadius * 3, topPadding + dividerTopPadding, 'Average ')
               .attr({'text-anchor': 'start', 'font-family': 'ralewayLight', 'fill': colors.label, 'font-size': 12}),
          paper.circle(dotRadius+1, topPadding + dividerTopPadding, dotRadius-1)
               .attr({'stroke': 'lightgrey', 'stroke-width': 1.5})
          ).attr({'fill-opacity': 0, 'stroke-opacity': 0});

        //divider line and labels
        graph.divider = paper.path('M' + (leftPadding - dotRadius) + ',' + (topPadding + dividerTopPadding) + 'l' + (width-leftPadding) + ',0')
                               .attr({'stroke-width': solidLineWeight, 'stroke': colors.solidLine});
        graph.metricLabelLeft = paper.text(leftPadding - dotRadius, topPadding+dividerTopPadding+10, '$'+($filter('numberwithcommas')(scope.model.metricScale[0])))
                                     .attr({'font-size': 11, 'fill': colors.font, 'font-family': 'robotoLight', 'text-anchor': 'start'});
        graph.metricLabelRight = paper.text(width, topPadding+dividerTopPadding+10, '$'+($filter('numberwithcommas')(scope.model.metricScale[1])))
                                      .attr({'font-size': 11, 'fill': colors.font, 'font-family': 'robotoLight', 'text-anchor': 'end'});
        //loop thru model.total, draw dots etc
        graph.totals = {};
        angular.forEach(scope.model.totals, function(el, key) {
          graph.totals[key] = {};
          var val = scope.model.totals[key][0],
              avg = scope.model.totals[key][1];
          //draw main dot and label
          graph.totals[key].dot = paper.circle(leftPadding, topPadding, dotRadius)
                                       .attr({fill: colors[key], 'stroke': 'white', 'stroke-opacity': 0, 'stroke-width': 12})
                                       .animate({'cx': leftPadding + (val * xScalarTotal)}, initAnimateTime, animationType)
                                       .data('channel', key)
                                       .hover(function(){
                                        if (!scope.hold) {
                                        this.toFront();  
                                        scope.activeChannel = this.data('channel');
                                        scope.$digest();
                                        }
                                       }, function() {
                                        if (!scope.hold) { 
                                        this.toBack();
                                        bgSet.toBack(); 
                                        scope.activeChannel = '';
                                        scope.$digest();
                                        }
                                       })
                                       .click(function(){
                                        if (!scope.uberHold) {
                                            scope.hold = true;
                                            scope.activeChannel = this.data('channel');
                                            scope.$emit('dotGraphSidebar', this.data('channel'), 'total');
                                            scope.$digest();
                                        }
                                       });
          graph.totals[key].dotText = paper.text(leftPadding + (val * xScalarTotal), topPadding-13, '$'+($filter('numberwithcommas')(val)))
                                           .attr({'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 10, 'fill': colors.label})
                                           .toBack();
          //draw avg circle/label and line
          graph.totals[key].avg = paper.circle(leftPadding + (val * xScalarTotal), topPadding, dotRadius)
                                    .attr({'stroke-opacity': 0, 'stroke': '#8DC63F'})
                                    .data('on', leftPadding + (avg * xScalarTotal))
                                    .data('off', leftPadding + (val * xScalarTotal));
          if (val < avg) {
            graph.totals[key].avg.attr('stroke', '#DA1C5C');
            graph.totals[key].line = paper.path('M' + (leftPadding + val * xScalarTotal + dotRadius) + ',' + topPadding + 
                                                'L' + (leftPadding + val * xScalarTotal - dotRadius) + ',' + topPadding)
                                          .attr({'stroke-opacity': 0, 'stroke': '#DA1C5C', 'stroke-width': 1})
                                          .data('on', 'M' + (leftPadding + val * xScalarTotal + dotRadius) + ',' + topPadding +
                                                      'L' + (leftPadding + avg * xScalarTotal - dotRadius) + ',' + topPadding)
                                          .data('off', 'M' + (leftPadding + val * xScalarTotal + dotRadius) + ',' + topPadding +
                                                      'L' + (leftPadding + val * xScalarTotal - dotRadius) + ',' + topPadding);

            graph.totals[key].avgText = paper.text(leftPadding + ((avg + val) / 2 * xScalarTotal), topPadding+13, '-$'+($filter('numberwithcommas')(avg - val)))
                                             .attr({'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 10, 'fill': colors.label})
                                             .toBack();
          } else {
            graph.totals[key].line = paper.path('M' + (leftPadding + val * xScalarTotal - dotRadius) + ',' + topPadding + 
                                                'L' + (leftPadding + val * xScalarTotal + dotRadius) + ',' + topPadding)
                                          .attr({'stroke-opacity': 0, 'stroke': '#8DC63F', 'stroke-width': 1})
                                          .data('on', 'M' + (leftPadding + val * xScalarTotal - dotRadius) + ',' + topPadding +
                                                      'L' + (leftPadding + avg * xScalarTotal + dotRadius) + ',' + topPadding)
                                          .data('off', 'M' + (leftPadding + val * xScalarTotal - dotRadius) + ',' + topPadding +
                                                      'L' + (leftPadding + val * xScalarTotal + dotRadius) + ',' + topPadding);;
            graph.totals[key].avgText = paper.text(leftPadding + ((avg + val) / 2 * xScalarTotal), topPadding+13, '+$'+($filter('numberwithcommas')(val - avg)))
                                             .attr({'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 10, 'fill': colors.label})
                                             .toBack();
          }
        })
        //check for overlapping dots once animation is done
        setTimeout(dotOverlapCheckAndFix.bind(null, graph.totals), initAnimateTime);
        //set up for drawing metrics
        yPos = topPadding + dividerTopPadding + dividerBottomPadding;
        graph.metrics = {};
        //loop thru metrics, draw lines and labels
        for (var key in scope.model.metrics) {
          if (scope.model.metrics.hasOwnProperty(key)) {

            graph.metrics[key] = {};
            graph.metrics[key].label = paper.text(leftPadding-labelOffset, yPos, key).attr({'font-family': 'ralewayLight', 'text-anchor': 'end', 'font-size': 12.5, fill: colors.label})
            graph.metrics[key].line = paper.path('M' + (leftPadding - dotRadius) + ',' + yPos + 'l' + (width-leftPadding) + ',0')
                                   .attr({'stroke-width': dashedLineWeight, 'stroke': colors.dashedLine, 'stroke-dasharray': '7 7'});
            bgSet.push(graph.metrics[key].line);
                                  
            for (var hash in scope.model.metrics[key]) {
              if (scope.model.metrics[key].hasOwnProperty(hash)) {
                //set up graph object
                graph.metrics[key][hash] = {};

                var val = scope.model.metrics[key][hash][0],
                    avg = scope.model.metrics[key][hash][1];
                //draw dot and label
                graph.metrics[key][hash].dot = paper.circle(leftPadding, yPos, dotRadius)
                                            .attr({fill: colors[hash], 'stroke': 'white', 'stroke-opacity': 0, 'stroke-width': 12})
                                            .data('channel', hash)
                                            .data('metric', key)
                                            .hover(function(){
                                              if (!scope.hold) {
                                              this.toFront();  
                                              scope.activeChannel = this.data('channel');
                                              scope.$digest();
                                              }
                                             }, function() {
                                              if (!scope.hold) {
                                              this.toBack();
                                              bgSet.toBack();  
                                              scope.activeChannel = '';
                                              scope.$digest();
                                              }
                                             })
                                             .click(function(){
                                                if (!scope.uberHold) {
                                                  scope.hold = true;
                                                  scope.activeChannel = this.data('channel');
                                                  var metric = (function(metric){return metric;})(key);
                                                  scope.$emit('dotGraphSidebar', this.data('channel'), this.data('metric'));
                                                  scope.$digest();
                                                }
                                             })
                                            .animate({'cx': leftPadding + (val * xScalarMetric)}, initAnimateTime, animationType);

                graph.metrics[key][hash].dotText = paper.text(leftPadding + (val * xScalarMetric) - 2, yPos-13, '$'+($filter('numberwithcommas')(val)))
                                             .attr({'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 10, 'fill': colors.label})
                                             .toBack();

                // average dot, label and line                             
                graph.metrics[key][hash].avg = paper.circle(leftPadding + (val * xScalarMetric), yPos, dotRadius)
                                            .attr({'stroke-opacity': 0, fill: 'none', 'stroke': '#8DC63F'})
                                            .data('on', leftPadding + (avg * xScalarMetric))
                                            .data('off', leftPadding + (val * xScalarMetric));
                var avgDotText = $filter('numberwithcommas')((avg - val).toFixed(2));
                if (val < avg) {
                  graph.metrics[key][hash].avg.attr('stroke', '#DA1C5C');
                  graph.metrics[key][hash].line = paper.path('M' + (leftPadding + val * xScalarMetric + dotRadius) + ',' + yPos + 
                                                             'L' + (leftPadding + val * xScalarMetric - dotRadius) + ',' + yPos)
                                                       .attr({'stroke-opacity': 0, 'stroke': '#DA1C5C', 'stroke-width': 1})
                                                       .data('on', 'M' + (leftPadding + val * xScalarMetric + dotRadius) + ',' + yPos + 
                                                                   'L' + (leftPadding + avg * xScalarMetric - dotRadius) + ',' + yPos)
                                                       .data('off', 'M' + (leftPadding + val * xScalarMetric + dotRadius) + ',' + yPos + 
                                                                   'L' + (leftPadding + val * xScalarMetric - dotRadius) + ',' + yPos);
                  graph.metrics[key][hash].avgText = paper.text(leftPadding + ((avg + val) / 2 * xScalarMetric), yPos+13, '-$'+ avgDotText)
                                             .attr({'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 10, 'fill': colors.label})
                                             .toBack();
                } else {
                  graph.metrics[key][hash].line = paper.path('M' + (leftPadding + val * xScalarMetric - dotRadius) + ',' + yPos + 
                                                             'L' + (leftPadding + val * xScalarMetric + dotRadius) + ',' + yPos)
                                                        .attr({'stroke-opacity': 0, 'stroke': '#8DC63F', 'stroke-width': 1})
                                                       .data('on', 'M' + (leftPadding + val * xScalarMetric - dotRadius) + ',' + yPos + 
                                                                   'L' + (leftPadding + avg * xScalarMetric + dotRadius) + ',' + yPos)
                                                       .data('off', 'M' + (leftPadding + val * xScalarMetric - dotRadius) + ',' + yPos + 
                                                                   'L' + (leftPadding + val * xScalarMetric + dotRadius) + ',' + yPos);
                  graph.metrics[key][hash].avgText = paper.text(leftPadding + ((avg + val) / 2 * xScalarMetric), yPos+13, '+$'+ avgDotText)
                                             .attr({'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 10, 'fill': colors.label})
                                             .toBack();
                }
              
              }
            }
            setTimeout(dotOverlapCheckAndFix.bind(null, graph.metrics[key]), initAnimateTime);
          }
          yPos += metricLinePadding;
        }

        setTimeout(checkActiveChannel, initAnimateTime);
        }
      } //end Draw fcn

      function checkActiveChannel() {
        //check if need to animate to selected channel
        if (scope.activeChannel !== '') {
            switchActiveChannel(scope.activeChannel, '');
        }
      }
      function switchActiveChannel(newVal, oldVal) {
        if (oldVal !== '') {
          graph.buttons.forEach(function(el, index) {
            if (el.type === 'set') {
              el[0].animate({'fill': colors.zebra}, reAnimateTime, animationType);
              el[1].animate({'opacity': 1}, reAnimateTime, animationType);
            } else if (el.type === 'text') {
              el.animate({'fill-opacity': 1}, reAnimateTime, animationType);
            } else if (el.type === 'rect') {
              el.show();
            }           
          })
          graph.otherKey.animate({'stroke-opacity': 1, 'fill-opacity': 1}, reAnimateTime, animationType);
          graph.key.animate({'stroke-opacity': 0, 'fill-opacity': 0}, reAnimateTime, animationType);
          angular.forEach(graph.totals, function(el, key) {
            if (key !== oldVal) {
              el.dot.animate({'fill': colors[key]}, reAnimateTime, animationType);
            } else if (key === oldVal) {
              if (el.dot.data('groupShowing') === false) {
                  el.dot.animate({'fill-opacity': 0}, reAnimateTime, animationType, function() {
                    this.hide().toBack();
                    bgSet.toBack();
                  });
                }
             el.avg.animate({'stroke-opacity': 0, 'cx': el.avg.data('off')}, reAnimateTime, animationType);
             el.avg.attr('fill', 'none');
             el.avgText.animate({'fill-opacity': 0}, reAnimateTime, animationType).toBack();
             el.line.animate({path: el.line.data('off'), 'stroke-opacity': 0}, reAnimateTime, animationType).toFront();
             el.dotText.animate({'fill-opacity': 0}, reAnimateTime, animationType).toBack();
            }
          })
          angular.forEach(graph.metrics, function(el, key) {
            angular.forEach(el, function(elem, hash) {
              if (hash !== oldVal && hash !== 'label' && hash !== 'line') {
                elem.dot.animate({'fill': colors[hash]}, reAnimateTime, animationType);
              } else if (hash === oldVal) {
                if (elem.dot.data('groupShowing') === false) {
                  elem.dot.animate({'fill-opacity': 0}, reAnimateTime, animationType, function() {
                    this.hide().toBack();
                    bgSet.toBack();
                  });
                }
                elem.avg.animate({'stroke-opacity': 0, 'cx': elem.avg.data('off')}, reAnimateTime, animationType).toFront();
                elem.avg.attr('fill', 'none');
                elem.avgText.animate({'fill-opacity': 0}, reAnimateTime, animationType).toBack();
                elem.line.animate({path: elem.line.data('off'), 'stroke-opacity': 0}, reAnimateTime, animationType).toFront();
                elem.dotText.animate({'fill-opacity': 0}, reAnimateTime, animationType).toBack();
              }
            })
          });
        }
        if (newVal !== '') {
          graph.buttons.forEach(function(el, index) {
            if (el.type === 'set') {
              el[0].animate({'fill': colors.faded}, reAnimateTime, animationType);
              el[1].animate({'opacity': 0}, reAnimateTime, animationType);
            } else if (el.type === 'text') {
              el.animate({'fill-opacity': 0}, reAnimateTime, animationType);
            } else if (el.type === 'rect') {
              el.hide();
            }           
          })
          graph.otherKey.animate({'stroke-opacity': 0, 'fill-opacity': 0}, reAnimateTime, animationType);
          graph.key[0].attr({'text': newVal, 'fill': colors[newVal]});
          graph.key.animate({'stroke-opacity': 1, 'fill-opacity': 1}, reAnimateTime, animationType);
          angular.forEach(graph.totals, function(el, key) {
            if (key !== newVal) {
              el.dot.animate({'fill': colors.faded}, reAnimateTime, animationType);
            } else if (key === newVal) {
              if (el.dot.data('groupShowing') === false) {
                  el.dot.show().toFront().animate({'fill-opacity': 1}, reAnimateTime, animationType);
              }
              el.dot.toFront();
              avgAnim(el.avg, el.dot);             
              el.avgText.animate({'fill-opacity': 1}, reAnimateTime, animationType);
              el.line.animate({path: el.line.data('on'), 'stroke-opacity': 1}, reAnimateTime, animationType).toFront();
              el.dotText.animate({'fill-opacity': 1}, reAnimateTime, animationType);
            }
          })
          angular.forEach(graph.metrics, function(el, key) {
            angular.forEach(el, function(elem, hash) {
              if (hash !== newVal && hash !== 'label' && hash !== 'line') {
                elem.dot.animate({'fill': colors.faded}, reAnimateTime, animationType);
              } else if (hash === newVal) {
                if (elem.dot.data('groupShowing') === false) {
                  elem.dot.show().toFront().animate({'fill-opacity': 1}, reAnimateTime, animationType);
                }
                elem.dot.toFront();
                avgAnim(elem.avg, elem.dot);
                elem.avgText.animate({'fill-opacity': 1}, reAnimateTime, animationType);
                elem.line.animate({path: elem.line.data('on'), 'stroke-opacity': 1}, reAnimateTime, animationType).toFront();
                elem.dotText.animate({'fill-opacity': 1}, reAnimateTime, animationType);
              }
            })
          });
        }
      }
      function animToNewVals() {
        if (scope.model.metricScale && scope.model.metricScale.length > 0) { // arbitrary way to make sure model has data
          paper.remove();
          Draw();
        }
      }

      function standardizeChannels(chanName) {
        var hash = {
          email: 'E-Mail',
          facebook: 'Facebook',
          twitter: 'Twitter',
          pinterest: 'Pinterest',
          linkedin: 'LinkedIn',
          all: ''
        }
        if (hash[chanName] !== undefined) {
          return hash[chanName];
        } else {
          return chanName;
        }
      }
      function unStandardizeChannels(chanName) {
        var hash = {
          'E-Mail': 'email',
          'Facebook': 'facebook',
          'Twitter': 'twitter',
          'Pinterest': 'pinterest',
          'LinkedIn': 'linkedin',
          '': 'all'
        }
        if (hash[chanName]) {
          return hash[chanName];
        } else {
          return chanName;
        }
      }
      //channel highlight
      scope.$on('highlightChange', function(event, channel) {
        var chan = standardizeChannels(channel);
        scope.activeChannel = chan;
      })
      //channel select
      scope.$on('selectedChange', function(event, channel) {
        if (channel === 'all') {
            scope.uberHold = false;
            scope.hold = false;
        } else {
            scope.uberHold = true;
            scope.hold = true;
        }
      });
      // window resize behavior
      //necessary to $digest on window resize,
      //so element[0].parentNode.offsetWidth can be $watch-ed
      angular.element($window).bind('resize', function() {
        return scope.$digest();
      });
      // resize debounce
      var timeout = null;
      scope.$watch(function() {
        return element[0].parentNode.offsetWidth;
      }, function(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (timeout) {
            $timeout.cancel(timeout)
          }
        timeout = $timeout(animToNewVals, 250);
        }
      });    

      // model change behavior
      scope.$watch('model', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          Draw();
          animToNewVals();
        }
      })

      // channel highlight behavior
      scope.$watch('activeChannel', switchActiveChannel);


    function avgAnim(element, sourceDot) {
      var endAnim = function() {
        element.toFront();
        sourceDot.toFront();
      }
      element.toBack()
             .attr('fill', 'white')
             .animate({'stroke-opacity': 1, 'cx': element.data('on')}, reAnimateTime, animationType, endAnim);
    }
    function fireEvent(element,event) {
        if (document.createEventObject) {
            // dispatch for IE
            var evt = document.createEventObject();
            return element.fireEvent('on'+event,evt)
        } else {
            // dispatch for firefox + others
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, true); // event type,bubbling,cancelable
            return !element.dispatchEvent(evt);
        }
    }
    function dotOverlapCheckAndFix(lineObject) {
      var xValsArray = [];
      var collisions = [];
      var offset = dotRadius * 2 / 3;

      angular.forEach(lineObject, function(el, key) {
        if (key !== 'line' && key !== 'label') {
          var xVal = Math.round(el.dot.getBBox().x);

          xValsArray[xVal] = xValsArray[xVal] || [];
          xValsArray[xVal].push(key);
        }
      })

      var checkVal = 0;
      var group = [];
     xValsArray.forEach(function(el, key) {
        if (group.length === 0) {
          checkVal = key;
          el.forEach(function(elem, index) {
            group.push(elem);
          })
          return;
        } else if (key - checkVal < dotRadius) {
          checkVal = key;
          el.forEach(function(elem, index) {
            group.push(elem);
          })
          return;
        } else if (key - checkVal > dotRadius && group.length < 2) {
          group = [];
          el.forEach(function(elem, index) {
            group.push(elem);
          })
          checkVal = key;
          return;
        } else if (group.length > 1) {
          collisions.push(group);
          group = [];
          el.forEach(function(elem, index) {
            group.push(elem);
          })
          checkVal = key;
        }
      })
      if (group.length > 1) {
        collisions.push(group);
      }
     
      collisions.forEach(function(el, key) {
        if (el.length === 2) {
          var bb0 = lineObject[el[0]].dot.getBBox();
          var bb1 = lineObject[el[1]].dot.getBBox();
          var rectX = Math.min(bb0.x, bb1.x);
          var rectX2 = Math.max(bb0.x2, bb1.x2);
          var rectY = bb0.y2 + dotRadius/2;

          if (rectX2 - rectX < dotRadius*2.5) {
            var multidot = true;
            var dotMask = paper.set();
            dotMask.push(
              paper.circle((rectX2 + rectX) / 2, bb0.y + dotRadius, dotRadius).attr({'fill': colors.zebra, 'stroke': 'transparent'}),
              paper.image('img/MultiDotMask.svg', (rectX2 + rectX) / 2 - dotRadius, bb0.y, dotRadius*2, dotRadius*2)
              );
            lineObject[el[0]].dot.hide().data('groupShowing', false);
            lineObject[el[1]].dot.hide().data('groupShowing', false);
            graph.buttons.push(dotMask);
          } else {
            return;
          }

          graph.buttons.push(paper.text(rectX + (rectX2-rectX) / 2, rectY+5, '+')
                                  .attr({'fill': 'lightgrey', 'font-size': 28, 'font-family': 'ralewayLight'}));

          graph.buttons.push(paper.rect(rectX, rectY, rectX2 - rectX, dotRadius*2)
           .attr({fill: 'white', 'fill-opacity': 0, stroke: 'white', 'stroke-opacity': 0, 'cursor': 'pointer'})
           .data('state', 'closed')
           .click(function(){
            if (this.data('state') === 'closed') {
              if (multidot) {
                if (graph.activeButton) {
                  fireEvent(graph.activeButton.node, 'click');
                }
                graph.activeButton = this;
                dotMask.hide()
                lineObject[el[0]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[1]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
              }
              this.prev.attr('text', '-').transform('t0,-3');  
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't-'+offset+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[1]], function(elem) {
                elem.animate({transform: 't'+offset+',0'}, 250, animationType);
              });
              this.data('state', 'open');
            } else if (this.data('state') === 'open') {
              if (multidot) {
                if (graph.activeButton) {
                  graph.activeButton = null;
                }
                setTimeout(function(){
                  dotMask.show().toFront();
                  lineObject[el[0]].dot.hide().data('groupShowing', false);
                  lineObject[el[1]].dot.hide().data('groupShowing', false);
                }, 250);
              }
              this.prev.attr('text', '+').transform('t0,0'); 
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[1]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              this.data('state', 'closed');
            }
           }));
        } else if (el.length === 3) {
          var bb0 = lineObject[el[0]].dot.getBBox();
          var bb1 = lineObject[el[1]].dot.getBBox();
          var bb2 = lineObject[el[2]].dot.getBBox();
          var rectX = Math.min(bb0.x, bb1.x, bb2.x);
          var rectX2 = Math.max(bb0.x2, bb1.x2, bb2.x2);
          var rectY = bb0.y2 + dotRadius/2;

          if (rectX2 - rectX < dotRadius*2.5) {
            var multidot = true;
            var dotMask = paper.set();
            dotMask.push(
              paper.circle((rectX2 + rectX) / 2, bb0.y + dotRadius, dotRadius).attr({'fill': colors.zebra, 'stroke': 'transparent'}),
              paper.image('img/MultiDotMask.svg', (rectX2 + rectX) / 2 - dotRadius, bb0.y, dotRadius*2, dotRadius*2)
              );
            lineObject[el[0]].dot.hide().data('groupShowing', false);
            lineObject[el[1]].dot.hide().data('groupShowing', false);
            lineObject[el[2]].dot.hide().data('groupShowing', false);
            graph.buttons.push(dotMask);
          }

          graph.buttons.push(paper.text(rectX + (rectX2-rectX) / 2, rectY+5, '+')
                                  .attr({'fill': 'lightgrey', 'font-size': 28, 'font-family': 'ralewayLight'}));

          graph.buttons.push(paper.rect(rectX, rectY, rectX2 - rectX, dotRadius*2)
           .attr({fill: 'white', 'fill-opacity': 0, stroke: 'white', 'stroke-opacity': 0, 'cursor': 'pointer'})
           .data('state', 'closed')
           .click(function(){
            if (this.data('state') === 'closed') {
              if (multidot) {
                if (graph.activeButton) {
                  fireEvent(graph.activeButton.node, 'click');
                }
                graph.activeButton = this;
                dotMask.hide()
                lineObject[el[0]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[1]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[2]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
              }
              this.prev.attr('text', '-').transform('t0,-3');  
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't-'+offset*2+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[2]], function(elem) {
                elem.animate({transform: 't'+offset*2+',0'}, 250, animationType);
              });
              this.data('state', 'open');
            } else if (this.data('state') === 'open') {
              if (multidot) {
                if (graph.activeButton) {
                  graph.activeButton = null;
                }
                setTimeout(function(){
                  dotMask.show().toFront();
                  lineObject[el[0]].dot.hide().data('groupShowing', false);
                  lineObject[el[1]].dot.hide().data('groupShowing', false);
                  lineObject[el[2]].dot.hide().data('groupShowing', false);
                }, 250);
              }
              this.prev.attr('text', '+').transform('t0,0'); 
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[2]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              this.data('state', 'closed');
            }
           }));
        } else if (el.length === 4) {
          var bb0 = lineObject[el[0]].dot.getBBox();
          var bb1 = lineObject[el[1]].dot.getBBox();
          var bb2 = lineObject[el[2]].dot.getBBox();
          var bb3 = lineObject[el[3]].dot.getBBox();
          var rectX = Math.min(bb0.x, bb1.x, bb2.x, bb3.x);
          var rectX2 = Math.max(bb0.x2, bb1.x2, bb2.x2, bb3.x2);
          var rectY = bb0.y2 + dotRadius/2;

          if (rectX2 - rectX < dotRadius*2.5) {
            var multidot = true;
            var dotMask = paper.set();
            dotMask.push(
              paper.circle((rectX2 + rectX) / 2, bb0.y + dotRadius, dotRadius).attr({'fill': colors.zebra, 'stroke': 'transparent'}),
              paper.image('img/MultiDotMask.svg', (rectX2 + rectX) / 2 - dotRadius, bb0.y, dotRadius*2, dotRadius*2)
              );
            lineObject[el[0]].dot.hide().data('groupShowing', false);
            lineObject[el[1]].dot.hide().data('groupShowing', false);
            lineObject[el[2]].dot.hide().data('groupShowing', false);
            lineObject[el[3]].dot.hide().data('groupShowing', false);
            graph.buttons.push(dotMask);
          }
          
          graph.buttons.push(paper.text(rectX + (rectX2-rectX) / 2, rectY+5, '+')
                                  .attr({'fill': 'lightgrey', 'font-size': 28, 'font-family': 'ralewayLight'}));

          graph.buttons.push(paper.rect(rectX, rectY, rectX2 - rectX, dotRadius*2)
           .attr({fill: 'white', 'fill-opacity': 0, stroke: 'white', 'stroke-opacity': 0, 'cursor': 'pointer'})
           .data('state', 'closed')
           .click(function(){
            if (this.data('state') === 'closed') {
              if (multidot) {
                if (graph.activeButton) {
                  fireEvent(graph.activeButton.node, 'click');
                }
                graph.activeButton = this;
                dotMask.hide()
                lineObject[el[0]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[1]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[2]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[3]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
              }
              this.prev.attr('text', '-').transform('t0,-3');
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't-'+offset*3+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[1]], function(elem) {
                elem.animate({transform: 't-'+offset+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[2]], function(elem) {
                elem.animate({transform: 't'+offset+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[3]], function(elem) {
                elem.animate({transform: 't'+offset*3+',0'}, 250, animationType);
              });
              this.data('state', 'open');
            } else if (this.data('state') === 'open') {
              if (multidot) {
                if (graph.activeButton) {
                  graph.activeButton = null;
                }
                setTimeout(function(){
                  dotMask.show().toFront();
                  lineObject[el[0]].dot.hide().data('groupShowing', false);
                  lineObject[el[1]].dot.hide().data('groupShowing', false);
                  lineObject[el[2]].dot.hide().data('groupShowing', false);
                  lineObject[el[3]].dot.hide().data('groupShowing', false);
                }, 250);
              }
              this.prev.attr('text', '+').transform('t0,0');
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[1]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[2]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[3]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              this.data('state', 'closed');
            }
           }));
        } else if (el.length === 5) {
          var bb0 = lineObject[el[0]].dot.getBBox();
          var bb1 = lineObject[el[1]].dot.getBBox();
          var bb2 = lineObject[el[2]].dot.getBBox();
          var bb3 = lineObject[el[3]].dot.getBBox();
          var bb4 = lineObject[el[4]].dot.getBBox();
          var rectX = Math.min(bb0.x, bb1.x, bb2.x, bb3.x, bb4.x);
          var rectX2 = Math.max(bb0.x2, bb1.x2, bb2.x2, bb3.x2, bb4.x2);
          var rectY = bb0.y2 + dotRadius/2;

          if (rectX2 - rectX < dotRadius*2.5) {
            var multidot = true;
            var dotMask = paper.set();
            dotMask.push(
              paper.circle((rectX2 + rectX) / 2, bb0.y + dotRadius, dotRadius).attr({'fill': colors.zebra, 'stroke': 'transparent'}),
              paper.image('img/MultiDotMask.svg', (rectX2 + rectX) / 2 - dotRadius, bb0.y, dotRadius*2, dotRadius*2)
              );
            lineObject[el[0]].dot.hide().data('groupShowing', false);
            lineObject[el[1]].dot.hide().data('groupShowing', false);
            lineObject[el[2]].dot.hide().data('groupShowing', false);
            lineObject[el[3]].dot.hide().data('groupShowing', false);
            lineObject[el[4]].dot.hide().data('groupShowing', false);
            graph.buttons.push(dotMask);
          }

          graph.buttons.push(paper.text(rectX + (rectX2-rectX) / 2, rectY+5, '+')
                                  .attr({'fill': 'lightgrey', 'font-size': 28, 'font-family': 'ralewayLight'}));

          graph.buttons.push(paper.rect(rectX, rectY, rectX2 - rectX, dotRadius*2)
           .attr({fill: 'white', 'fill-opacity': 0, stroke: 'white', 'stroke-opacity': 0, 'cursor': 'pointer'})
           .data('state', 'closed')
           .click(function(){
            if (this.data('state') === 'closed') {
              if (multidot) {
                if (graph.activeButton) {
                  fireEvent(graph.activeButton.node, 'click');
                }
                graph.activeButton = this;
                dotMask.hide()
                lineObject[el[0]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[1]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[2]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[3]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
                lineObject[el[4]].dot.toFront().show().data('groupShowing', true).attr('fill-opacity', 1);
              }
              this.prev.attr('text', '-').transform('t0,-3'); 
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't-'+dotRadius*3+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[1]], function(elem) {
                elem.animate({transform: 't-'+dotRadius*1.5+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[3]], function(elem) {
                elem.animate({transform: 't'+dotRadius*1.5+',0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[4]], function(elem) {
                elem.animate({transform: 't'+dotRadius*3+',0'}, 250, animationType);
              });
              this.data('state', 'open');
            } else if (this.data('state') === 'open') {
              if (multidot) {
                if (graph.activeButton === this) {
                  graph.activeButton = null;
                }
                setTimeout(function(){
                  dotMask.show().toFront();
                  lineObject[el[0]].dot.hide().data('groupShowing', false);
                  lineObject[el[1]].dot.hide().data('groupShowing', false);
                  lineObject[el[2]].dot.hide().data('groupShowing', false);
                  lineObject[el[3]].dot.hide().data('groupShowing', false);
                  lineObject[el[4]].dot.hide().data('groupShowing', false);
                }, 250);
              }
              this.prev.attr('text', '+').transform('t0,0'); 
              angular.forEach(lineObject[el[0]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[1]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[3]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              angular.forEach(lineObject[el[4]], function(elem) {
                elem.animate({transform: 't0,0'}, 250, animationType);
              });
              this.data('state', 'closed');
            }
           }));
          }
        })
      }
    }  //end link fcn
  }  // end returned obj
})

.directive('barcharthoriz', function($filter, $timeout, $window, $rootScope) {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel',
        percent: '@percent',
        finishLine: '@finishLine',
        time: '@time',
        sidebarEvent: '@sidebarEvent',
        sortable: '@sortable',
        noHighlight: '@noHighlight',
        channelColors: '=',
        barChartsSorted: '='
      },
      link: function link(scope, element, attrs) {
        // directive parameters
        var leftPadding = 80,  //start of label to start of bar
            rightPadding = 65,  //space after end of longest bar to edge of container
            topPadding = 30,  
            rightLabelOffset = 10,  //space after end of bar to label
            barAngle = 4,   // pixels top of bar is longer than bottom
            barHeight = 10,
            barYSpacing = 30,  //space between bars
            slashWidth = 4,
            tooltipWidth = 60,
            tooltipHeight = 20,
            barAnimateTime = 1500, //ms
            labelFadeInTime = 333, //ms
            animationType = '<>', //see raphael docs
            reAnimateTime = 500, 
            colors = {
              font: '#999999',
              avgSlash: '#D3D3D3',
              tooltipBG: 'black',
              tooltipFont: 'white',
              percentBG: '#E6E7E8',
              faded: '#F6F6F6'
            };
        //extend color parameter with UberControllers' channelColors
        angular.extend(colors, scope.channelColors);
      
      var width,height,paper,yPos,bars,avgs,tooltips,hoverRects,rightLabels,xScalar,percentBGs,finishLine,finishLineLabel,minVal,graph;
      var hovers = true;

      Draw();

      function setMinValAndXScalarForFinishLine() {
        minVal = Number.MAX_VALUE;
        angular.forEach(scope.model.data, function(el, key) {
          // a value of '0' really means that we don't have data, so we don't want to consider it
          var val = el[0] > 0 ? el[0] : Number.MAX_VALUE;
          var avg = el[1] > 0 ? el[1] : Number.MAX_VALUE;

          minVal = Math.min(val, avg, minVal);
        });                 
        xScalar = (width - leftPadding - rightPadding) / minVal;
        xScalar = xScalar === Infinity ? (width - leftPadding - rightPadding) : xScalar;
      };

      function Draw() {
        //init graph object
        graph = {};
        // for setting height
        var numChans = 0, key;
        for (key in scope.model.data) {
          if (scope.model.data.hasOwnProperty(key)) {
            numChans += 1;
          }
        } 
        //set up paper
        width = element[0].parentNode.offsetWidth,
        height = topPadding + numChans * (barHeight + barYSpacing) - barYSpacing + 20,
        paper = Raphael(element[0], width, height);

        // graph scalars
        if (scope.percent) {
          percentBGs = paper.set()
          xScalar = (width - leftPadding - 20) / scope.model.maxVal;
          xScalar = xScalar === Infinity ? 0 : xScalar;
        } else if (scope.finishLine) {
          finishLine = paper.path('M'+(width-rightPadding-5)+',0l0,'+(height-50))
                                .attr({'stroke': colors.font, 'stroke-dasharray': '7 7'});
          finishLineLabel = paper.text(width-rightPadding-30, height/2, 'CONVERSION')
                                     .attr({'fill': colors.font, 'font-family': 'ralewayLight', 'text-anchor': 'start'})
                                     .transform('r90');

          setMinValAndXScalarForFinishLine();
        } else {
          xScalar = (width - leftPadding - rightPadding) / scope.model.maxVal;
          xScalar = xScalar === Infinity ? 0 : xScalar;
        }
        // graphing vars
        yPos = topPadding;

        // element sets
        bars = paper.set(),
        avgs = paper.set(),
        tooltips = paper.set(),
        hoverRects = paper.set(),
        rightLabels = paper.set();
        //loop thru model data, draw things
        for (var key in scope.model.data) {
          if (scope.model.data.hasOwnProperty(key)) {
              // setup
              graph[key] = {};
              var vals = scope.model.data[key];
              // if graph has percent flag
              if (scope.percent === 'percent') {
                graph[key].percentBG = paper.rect(leftPadding, yPos, width - leftPadding - 20 + barAngle, barHeight).attr({'fill': colors.percentBG, 'stroke': 'none'}).toBack();
                percentBGs.push(graph[key].percentBG);
              }

              //draw main bar
              if (scope.finishLine) {
                var barLength = vals[0] == 0 ? 0 : Math.floor(minVal/(vals[0]/minVal) * xScalar);
                var barAngleLength = vals[0] == null || vals[0] == 0 ? 0 : barAngle;
                var barStr1 = 'M' + leftPadding +','+ (barHeight + yPos) +'l1,0l' + barAngleLength + ',-' + barHeight +'l-' + (barAngleLength + 1) + ',0Z',
                    barStr2 = 'M' + leftPadding +','+ (barHeight + yPos) +'l' + barLength + ',0l' + barAngleLength + ',-' + barHeight + 'l-' + (barLength + barAngleLength) + ',0Z';
                graph[key].bar = paper.path(barStr1).attr({'fill': colors[key], 'stroke-width': '0px'})
                                      .data('channel', key)
                                      .click(function(){
                                        scope.$emit('barChartSidebarFilter', scope.sidebarEvent, this.data('channel'))
                                      })
                                      .animate({path: barStr2}, barAnimateTime+(yPos*2), animationType, function() {
                                        if (vals[1]) {  
                                        // shows hoverRect
                                        this.next.next.next.next.next.show(); //lawl
                                        }
                                      });

                bars.push(graph[key].bar);
                  //if average present in data
                if (vals[1] && vals[1] != 0) {
                  // draw average 'slash'
                  var avgStr = 'M'+ (leftPadding + minVal/(vals[1]/minVal) * xScalar) + ',' + (yPos + barHeight) + 'l' + barAngle + ',-' + barHeight + 'l' + slashWidth + ',0l-' + barAngle + ',' + barHeight;
                  graph[key].avg = paper.path(avgStr)
                                        .attr({'fill': colors.avgSlash, 'stroke-width': 0})
                                        .hide()
                                        .data('channel', key);
                  avgs.push(graph[key].avg);

                  // draw average tooltip
                  var rect = paper.rect(leftPadding + (minVal/(vals[1]/minVal)) * xScalar - (tooltipWidth / 2) + (slashWidth / 2), yPos-(tooltipHeight+5), tooltipWidth, tooltipHeight)
                                  .attr({'fill': colors.tooltipBG});
                  var text = paper.text(leftPadding + ((minVal/(vals[1]/minVal)) * xScalar) + (slashWidth / 2), yPos - 15, 'avg: '+ ($filter('timeToConvert')(vals[1])))
                                  .attr({'fill': colors.tooltipFont, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'middle'})
                                  .data('channel', key);
                  var point = paper.path('M' + (leftPadding + ((minVal/(vals[1]/minVal)) * xScalar) + (barAngle + slashWidth) / 2) + ',' + (yPos + 5) + 'l-8,-10l16,0Z')
                                   .attr({'fill': colors.tooltipBG, stroke: 'none'});
                  

                  if (text.getBBox().width > rect.getBBox().width) {
                    var newWidth = text.getBBox().width + 10;
                    var addedWidth = newWidth - rect.attr('width');
                    var newX = rect.attr('x') - addedWidth/2;
                    rect.attr({
                        'width': newWidth,
                        'x': newX
                    });
                  }

                  graph[key].tooltip = paper.set();
                  graph[key].tooltip.push(rect, point, text);
                  graph[key].tooltip.hide();
                  tooltips.push(graph[key].tooltip);

                  // hover event box
                  graph[key].hoverRect  = paper.rect(leftPadding + ((minVal/(vals[1]/minVal)) * xScalar) - 5, yPos - 5, 15, 20)
                                    .attr({fill: 'white', 'fill-opacity': 0, 'stroke': 'transparent'})
                  graph[key].hoverRect.hide();
                  // hover mouse in/out
                  graph[key].hoverRect.hover(function() {
                    this.prev.show();
                    this.prev.prev.show();
                    this.prev.prev.prev.show();
                  }, function() {
                    this.prev.hide();
                    this.prev.prev.hide();
                    this.prev.prev.prev.hide()
                  });
                  hoverRects.push(graph[key].hoverRect);
                } 
              } else {
                var barLength = vals[0] === null ? 0 : Math.floor(vals[0] * xScalar);
                var barAngleLength = vals[0] == null || vals[0] == 0 ? 0 : barAngle;
                var barStr1 = 'M' + leftPadding +','+ (barHeight + yPos) +'l1,0l' + barAngleLength + ',-' + barHeight +'l-' + (barAngleLength + 1) + ',0Z',
                    barStr2 = 'M' + leftPadding +','+ (barHeight + yPos) +'l' + barLength + ',0l' + barAngleLength + ',-' + barHeight + 'l-' + (barLength + barAngleLength) + ',0Z';
                graph[key].bar = paper.path(barStr1).attr({'fill': colors[key], 'stroke-width': '0px'});
                graph[key].bar.data('channel', key);
                graph[key].bar.click(function(){
                  scope.$emit('barChartSidebarFilter', scope.sidebarEvent, this.data('channel'));
                });
                graph[key].bar.animate({path: barStr2}, barAnimateTime+(yPos*2), animationType, function() {
                  if (vals[1]) {  
                  // shows hoverRect
                  this.next.next.next.next.next.show(); //lawl
                  }
                });
                bars.push(graph[key].bar);

                //if average present in data
                if (vals[1]) {
                  // draw average 'slash'
                  var avgStr = 'M'+ (leftPadding + vals[1] * xScalar) + ',' + (yPos + barHeight) + 'l' + barAngle + ',-' + barHeight + 'l' + slashWidth + ',0l-' + barAngle + ',' + barHeight;
                  graph[key].avg = paper.path(avgStr)
                              .attr({
                                'fill': colors.avgSlash,
                                'stroke-width': 0
                              });
                  graph[key].avg.hide()
                  graph[key].avg.data('channel', key);
                  avgs.push(graph[key].avg);

                // draw average tooltip
                graph[key].tooltip = paper.set();
                if (scope.percent) {
                  var tooltipText = 'avg: '+ ($filter('peoplescorepercent')(vals[1]));
                } else if (scope.time) {
                  var tooltipText = 'avg: '+ ($filter('timeToConvert')(vals[1]));
                } else { 
                  var tooltipText = 'avg: '+ vals[1]
                }
                  // draw average tooltip
                  var rect = paper.rect(leftPadding + vals[1] * xScalar - (tooltipWidth / 2) + (slashWidth / 2), yPos-(tooltipHeight+5), tooltipWidth, tooltipHeight)
                                  .attr({'fill': colors.tooltipBG});
                  var text = paper.text(leftPadding + (vals[1] * xScalar) + (slashWidth / 2), yPos - 15, tooltipText)
                                  .attr({'fill': colors.tooltipFont, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'middle'})
                                  .data('channel', key);
                  var point = paper.path('M' + (leftPadding + (vals[1] * xScalar) + (barAngle + slashWidth) / 2) + ',' + (yPos + 5) + 'l-8,-10l16,0Z')
                                   .attr({'fill': colors.tooltipBG, stroke: 'none'});
                  

                  if (text.getBBox().width > rect.getBBox().width - 10) {
                    var newWidth = text.getBBox().width + 10;
                    var addedWidth = Math.ceil(newWidth - rect.attr('width'));
                    var newX = rect.attr('x') - addedWidth/2;
                    rect.attr({
                        'width': newWidth,
                        'x': newX
                    });
                  }

                  graph[key].tooltip = paper.set();
                  graph[key].tooltip.push(rect, point, text);


                graph[key].tooltip.hide();
                tooltips.push(graph[key].tooltip);

                // hover event box
                graph[key].hoverRect  = paper.rect(leftPadding + (vals[1] * xScalar) - 5, yPos - 5, 15, 20)
                                  .attr({fill: 'white', 'fill-opacity': 0, 'stroke': 'transparent'})
                graph[key].hoverRect.hide();
                // hover mouse in/out
                graph[key].hoverRect.hover(function() {
                  this.prev.show();
                  this.prev.prev.show();
                  this.prev.prev.prev.show();
                }, function() {
                  this.prev.hide();
                  this.prev.prev.hide();
                  this.prev.prev.prev.hide()
                })
                hoverRects.push(graph[key].hoverRect);
              }
            }

              
              
              // left label
              graph[key].leftLabel = paper.text(0, yPos+5, key).attr({'fill': colors.font, 'font-family': 'ralewayLight', 'font-size': 11, 'text-anchor': 'start'});
              //rightLabel
              var labelText = ' ';
              if (scope.percent === 'percent') {
                if(vals[0]) {
                    labelText = ($filter('peoplescorepercent')(vals[0]));
                }
                graph[key].rightLabel = paper.text(Math.floor(vals[0] * xScalar)+leftPadding, yPos-(barHeight/2)-2, labelText)
                                      .attr({'fill': colors.font, 'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 12});
              } else if (scope.finishLine) {
                var barLength = vals[0] == 0 ? 0 : Math.floor(minVal/(vals[0]/minVal) * xScalar);
                var timeText = vals[0] == null || vals[0] == 0 ? ' ' : $filter('timeToConvert')(vals[0]);                
                graph[key].rightLabel = paper.text(barLength+leftPadding+rightLabelOffset, yPos+(barHeight/2), timeText)
                                      .attr({'fill': colors.font, 'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'start'});
              } else if (scope.time) {
                if(vals[0]) {
                    labelText = $filter('timeToConvert')(vals[0]);
                }
                graph[key].rightLabel = paper.text(Math.floor(vals[0] * xScalar)+leftPadding+rightLabelOffset, yPos+(barHeight/2), labelText)
                                      .attr({'fill': colors.font, 'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'start'}); 
              } else {
                if(vals[0]) {
                    labelText = vals[0];
                }
                graph[key].rightLabel = paper.text(Math.floor(vals[0] * xScalar)+leftPadding+rightLabelOffset, yPos+(barHeight/2), labelText)
                                      .attr({'fill': colors.font, 'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'start'}); 
              }
              graph[key].rightLabel.data('channel', key)
              rightLabels.push(graph[key].rightLabel);

              //increment
              yPos += (barYSpacing + barHeight);
            }  // end if
          }  // end for

          //show and fadeIn avgs and rightLabels respectively
          if (avgs.length > 0) {           
            avgs.forEach(function(el){
              setTimeout(function(){
                el.show();
              }, barAnimateTime)
            })
          }
          rightLabels.forEach(function(el){
            setTimeout(function(){
              if (avgs.length > 0) {
                var labelBB = el.getBBox();
                var avgBB = el.prev.prev.prev.prev.prev.prev.getBBox();
                if (labelBB.x < (avgBB.x2 + 5) && labelBB.x2 > avgBB.x && scope.percent !== 'percent') {
                  el.attr('x', avgBB.x2 + rightLabelOffset);
                }
              }
            el.animate({'fill-opacity': 1}, labelFadeInTime, animationType)
            }, barAnimateTime);
          });
          attachHoverEvents();
        } // end Draw Fcn

          //necessary to $digest on window resize,
          //so element[0].parentNode.offsetWidth can be $watch-ed
          angular.element($window).bind('resize', function() {
            return scope.$digest();
          });

          // resize debounce
          var timeout = null;

          scope.$watch(function(){
            return element[0].parentNode.offsetWidth;
          }, function(newVal, oldVal) {
            if (newVal !== oldVal) {
              if (timeout) {
                $timeout.cancel(timeout)
              }
              timeout = $timeout(animToNewVals.bind(null, 'resize'), 500);
            }
          });
          // also $watch for model changes
          scope.$watch('model.data', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              if (scope.barChartsSorted) {
                scope.$emit('barChartUnsort');
              }
              scope.sorted = false; 
              unorder();
              animToNewVals();
              attachHoverEvents();
            }
          });


          function standardizeChannels(chanName) {
            var hash = {
              email: 'E-Mail',
              facebook: 'Facebook',
              twitter: 'Twitter',
              pinterest: 'Pinterest',
              linkedin: 'LinkedIn',
              googleplus: 'Google+',
              'learn.kegerator.com': 'Learning Center',
              darksocial: 'Dark Social',
              youtube: 'YouTube'
            }
            if (hash[chanName]) {
              return hash[chanName];
            } else {
              return chanName;
            }
          }
          function unStandardizeChannels(chanName) {
            var hash = {
              'E-Mail': 'email',
              'Facebook': 'facebook',
              'Twitter': 'twitter',
              'Pinterest': 'pinterest',
              'LinkedIn': 'linkedin',
              'Google+': 'googleplus',
              'Learning Center': 'learn.kegerator.com',
              'Dark Social': 'darksocial',
              'YouTube': 'youtube'
            }
            if (hash[chanName]) {
              return hash[chanName];
            } else {
              return chanName;
            }
          }
          function hoverOn() {
            if (hovers) {
              $rootScope.$broadcast('highlightChange', unStandardizeChannels(this.data('channel')));
              $rootScope.$digest();
            }
          }
          function hoverOff() {
            if (hovers) {
              $rootScope.$broadcast('highlightChange', 'all');
              $rootScope.$digest();
            }
          }
          
          function attachHoverEvents() {
            bars.hover(hoverOn, hoverOff);
            
            scope.$on('highlightChange', function(event, channel) {
              var stdChan = standardizeChannels(channel);
              bars.forEach(function(el){
                el.attr('fill', colors[el.data('channel')]);
              })
              if (channel === 'all') {
                return;
              }
              bars.forEach(function(el){
                if (el.data('channel') !== stdChan)
                el.attr('fill', colors.faded);
              })
            });
          }
          
          scope.$on('chartDisableHover', function() {
            hovers = false;
          });
          
          scope.$on('chartEnableHover', function() {
            hovers = true;
          });
          

          scope.sorted = false;
          if (scope.sortable) {
            scope.$on('barChartReorder', function(){
              if (!scope.sorted) {
                scope.sorted = true;
                orderBySize();
              } else {
                scope.sorted = false;
                unorder();
              }
            })
          }

          var orderBySize = function() {
            var currentOrder = [];
            angular.forEach(graph, function(el, key) {
              currentOrder.push(key);
            })
            var sortArray = {};
            var newOrder = [];
            angular.forEach(scope.model.data, function(el, key) {
              sortArray[el[0]*1000] = sortArray[el[0]*1000] || []; //cheesy fix to accept floats
              sortArray[el[0]*1000].push(key)
            })

            var keys = Object.keys(sortArray);
            keys.sort(function(a,b) {
                return a-b;
            });
            var len = keys.length;
            var i = 0;

            while (i < len) {
                sortArray[keys[i]].forEach(function(el, ind) {
                    if (typeof el === Array) {  
                        el.forEach(function(elem, index) {
                            if (scope.finishLine) {
                                newOrder.push(elem);
                            } else {
                                newOrder.unshift(elem);
                            }
                        });
                    } else {
                        if (scope.finishLine) {
                            newOrder.push(el);
                        } else {
                            newOrder.unshift(el);
                        }
                    }
                });
                i++;
            }            

            angular.forEach(graph, function(el, key) {
              var start = currentOrder.indexOf(key);
              var end = newOrder.indexOf(key);
              if (start < end) {
                var transform = (end - start) * (barHeight + barYSpacing);
                el.bar.animate({transform: 't0,' + transform}, reAnimateTime*1.5, animationType);
                if (el.avg) {
                  el.avg.animate({transform: 't0,' + transform}, reAnimateTime*1.5, animationType);
                  el.tooltip.transform('t0,' + transform);
                  el.hoverRect.transform('t0,' + transform);
                }
                el.leftLabel.animate({transform: 't0,' + transform}, reAnimateTime*1.5, animationType);
                el.rightLabel.animate({transform: 't0,' + transform}, reAnimateTime*1.5, animationType);
                if (scope.percent) {
                  el.percentBG.animate({transform: 't0,' + transform}, reAnimateTime*1.5, animationType);
                }
              } else if (start > end) {
                var transform = (start - end) * (barHeight + barYSpacing);
                el.bar.animate({transform: 't0,-' + transform}, reAnimateTime*1.5, animationType);
                if (el.avg) {
                  el.avg.animate({transform: 't0,-' + transform}, reAnimateTime*1.5, animationType);
                  el.tooltip.transform('t0,-' + transform);
                  el.hoverRect.transform('t0,-' + transform);
                }
                el.leftLabel.animate({transform: 't0,-' + transform}, reAnimateTime*1.5, animationType);
                el.rightLabel.animate({transform: 't0,-' + transform}, reAnimateTime*1.5, animationType);
                if (scope.percent) {
                  el.percentBG.animate({transform: 't0,-' + transform}, reAnimateTime*1.5, animationType);
                }
              }
            })
          }

          var unorder = function() {
            angular.forEach(graph, function(el, key) {
                el.bar.animate({transform: 't0,0'}, reAnimateTime*1.5, animationType);
                if (scope.sortable && el.avg) {
                  el.avg.animate({transform: 't0,0'}, reAnimateTime*1.5, animationType);
                  el.tooltip.animate({transform: 't0,0'}, reAnimateTime*1.5, animationType);
                  el.hoverRect.animate({transform: 't0,0'}, reAnimateTime*1.5, animationType);
                }
                if (scope.percent) {
                  el.percentBG.animate({transform:'t0,0'}, reAnimateTime*1.5, animationType);
                }
                el.leftLabel.animate({transform: 't0,0'}, reAnimateTime*1.5, animationType);
                el.rightLabel.animate({transform: 't0,0'}, reAnimateTime*1.5, animationType);
            })
          }

          var animToNewVals = function(resizeFlag) {
            //check if number of channels has changed
            var numChans = 0, key;
              for (key in scope.model.data) {
                if (scope.model.data.hasOwnProperty(key)) {
                  numChans += 1;
                }
              }
            if (numChans !== bars.length) {
              barAnimateTime = reAnimateTime;
              paper.remove()
              Draw();
              return;
            }

            if (resizeFlag === 'resize') {
              var timeStore = reAnimateTime;
              reAnimateTime = 0;
              //resize paper
              width = element[0].parentNode.offsetWidth;
              paper.setSize(width, height);
            }
              yPos = 0 + topPadding;

              rightLabels.attr('fill-opacity', '0');
              hoverRects.hide()

              if (scope.percent === 'percent') {
                xScalar = (width - leftPadding - 15) / scope.model.maxVal;
                percentBGs.attr('width', width - leftPadding - 15 + barAngle)
              } else if (scope.finishLine) {
                finishLine.attr('path', 'M'+(width-rightPadding-5)+',0l0,'+(height-50));
                finishLineLabel.transform('r0');
                finishLineLabel.attr('x', (width-rightPadding-30));
                finishLineLabel.transform('r90');
                setMinValAndXScalarForFinishLine();
              } else {
                xScalar = (width - leftPadding - rightPadding) / scope.model.maxVal;
              }

              //animate bars
              bars.forEach(function(elem, index){
                var chan = elem.data('channel');
                var vals = scope.model.data[chan];
                var pathStr = '';
                var barAngleLength = vals[0] == null || vals[0] == 0 ? 0 : barAngle;
                if (scope.finishLine) {
                  var barLength = vals[0] == null || vals[0] == 0 ? 0 : Math.floor(minVal/(vals[0]/minVal) * xScalar);                  
                  pathStr = 'M' + leftPadding +','+ (barHeight + yPos) +'l' + barLength + ',0l' + barAngleLength + ',-' + barHeight + 'l-' + (barLength + barAngleLength) + ',0Z';
                } else {
                  var barLength = vals[0] == null || vals[0] == 0 ? 0 : Math.floor(vals[0] * xScalar);
                  pathStr = 'M' + leftPadding +','+ (barHeight + yPos) +'l' + barLength + ',0l' + barAngleLength + ',-' + barHeight + 'l-' + (barLength + barAngleLength) + ',0Z';  
                }
                elem.animate({path: pathStr}, reAnimateTime, '<>')
                yPos += (barYSpacing + barHeight);
              })
              yPos = 0 + topPadding;
              //animate averages
              avgs.forEach(function(elem, index){
                var chan = elem.data('channel');
                var vals = scope.model.data[chan];
                var pathStr = '';
                if (scope.finishLine) {
                  var avgPosition = vals[1] == 0 ? 0 : (leftPadding + minVal/(vals[1]/minVal) * xScalar);
                  pathStr = 'M'+ avgPosition + ',' + (yPos + barHeight) + 'l' + barAngle + ',-' + barHeight + 'l' + slashWidth + ',0l-' + barAngle + ',' + barHeight;
                } else {
                  pathStr = 'M'+ (leftPadding + vals[1] * xScalar) + ',' + (yPos + barHeight) + 'l' + barAngle + ',-' + barHeight + 'l' + slashWidth + ',0l-' + barAngle + ',' + barHeight;
                }
                elem.animate({path: pathStr}, reAnimateTime, '<>');
                yPos += (barYSpacing + barHeight);
              })
              //hide, reposition, then show rightLabels
              rightLabels.forEach(function(elem, index){
                var chan = elem.data('channel');
                var vals = scope.model.data[chan];
                var labelText = '';

                var barLength = vals[0] == null ? 0 : vals[0] * xScalar;

                if (scope.percent === 'percent') {
                  if(vals[0]) {
                    labelText = $filter('peoplescorepercent')(vals[0]);
                  }
                  elem.attr('text', labelText);
                  var newStartX = leftPadding + barLength - (10-barAngle);
                } else if (scope.finishLine) {
                  if(vals[0]) {
                    labelText = $filter('timeToConvert')(vals[0]);
                  }
                  barLength = vals[0] == null || vals[0] == 0 ? 0 : (minVal/(vals[0]/minVal) * xScalar);
                  elem.attr('text', labelText);
                  var newStartX = leftPadding + barLength + rightLabelOffset + 7;
                } else if (scope.time) {
                  if(vals[0]) {
                    labelText = $filter('timeToConvert')(vals[0]);
                  }
                  elem.attr('text', labelText);
                  var newStartX = leftPadding + barLength + rightLabelOffset + 7;
                } else {
                  if(vals[0]) {
                    labelText = vals[0];
                  }
                  elem.attr('text', labelText)
                  var newStartX = leftPadding + barLength + rightLabelOffset + 7;
                }

                elem.attr('x', newStartX);


                setTimeout(function(){
                  if (avgs.length > 0) {
                    var labelBB = elem.getBBox();
                    var avgBB = elem.prev.prev.prev.prev.prev.prev.getBBox();
                    if (labelBB.x < (avgBB.x2 + 5) && labelBB.x2 > avgBB.x && scope.percent !== 'percent') {
                      elem.attr('x', avgBB.x2 + rightLabelOffset);
                    }
                  }
                  elem.animate({'fill-opacity': 1}, labelFadeInTime, animationType)
                }, reAnimateTime + 10)

              })
              //move tooltips and hoverRects
              if (avgs.length > 0) {
                tooltips.forEach(function(elem, index){
                  setTimeout(function(){
                    var chan = elem[2].data('channel');
                    var vals = scope.model.data[chan];
                    if (scope.percent) {
                      var tooltipText = 'avg: '+ ($filter('peoplescorepercent')(vals[1]));
                    } else if (scope.finishLine || scope.time) {
                      var tooltipText = 'avg: '+ ($filter('timeToConvert')(vals[1]));
                    } else { 
                      var tooltipText = 'avg: '+ vals[1]
                    }

                    var startX = elem[1].attr('path')[0][1];
                    var endX = elem[0].prev.getBBox().x
                    var scalar =  endX - startX + (slashWidth / 2) + (barAngle / 2);
                    elem.transform('t' + scalar + ',0');
                    elem[2].attr('text', tooltipText)
                    elem[2].next.next.transform('t' + scalar + ',0');
                    elem[2].next.next.show();
                  }, reAnimateTime + 10)
                })
              }
              //reset after resize
              if (resizeFlag === 'resize') {
              reAnimateTime = timeStore;
            }            
          }
        } // end link fcn
      } // end returned obj     
})

.directive('barchartstackgroup', function($filter, $timeout, $window) {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel',
        mode: '=chartMode',
        conversionColors: '='
      },
      link: function link(scope, element, attrs) {
        // directive parameters.
        var leftPadding = 100,  //start of label to start of bar
            rightPadding = 40,  //space after end of longest bar to edge of container
            topPadding = 30,
            rightLabelOffset = 10,  //space after end of bar to label
            barAngle = 4,   // pixels top of bar is longer than bottom
            barHeight = 10,   // barheight when stacked
            altBarHeight = 6, // barheight when grouped
            barYSpacing = 30,  //space between stacked bars
            slashWidth = 4,
            groupSpacing = 11,  //space between groups of bars
            groupBarPadding = 3,  // pixels between bars of same group
            tooltipWidth = 56,
            tooltipHeight = 20,
            barAnimateTime = 1500, //ms
            labelFadeInTime = 333, //ms
            reAnimateTime = 500, //ms
            animationType = '<>', //see raphael docs
            colors = {
              font: '#999999',
              tooltipBG: 'black',
              tooltipFont: 'white'
            };
        //extend color parameter with UberControllers' channelColors
        angular.extend(colors, scope.conversionColors);

        var paper, Graph, labelSetR, hoverRects, yPos, groupHeight, stackHeight, width, height, xScalar, localMax;

        var numChans = 0, key;
        for (key in scope.model.data) {
          if (scope.model.data.hasOwnProperty(key)) {
            numChans += 1;
          }
        }
        if (numChans > 0) {
            Draw();
        }
        function Draw() {
        // for setting height
        var objKeys = Object.keys(scope.model.data);
        var numMetrics = scope.model.data[objKeys[0]].length;             
        
        var numChans = 0, key;
        for (key in scope.model.data) {
          if (scope.model.data.hasOwnProperty(key)) {
            numChans += 1;
          }
        }
        //paper dimension vars
        width = element[0].parentNode.offsetWidth;
        groupHeight = topPadding + (numChans * numMetrics) * (altBarHeight + groupBarPadding) + (numChans * groupSpacing) + 10;
        stackHeight = topPadding + numChans * (barHeight + barYSpacing);
        //vars set by graph mode
        if (scope.mode === "GROUPED") {
          localMax = 0;
          for (var key in scope.model.data) {
            if (scope.model.data.hasOwnProperty(key)) {
              scope.model.data[key].forEach(function(el){
                localMax = (el >localMax) ? el : localMax;
              });
            }
          }
          xScalar = (width - leftPadding - rightPadding) / localMax;
            yPos = 5 + topPadding;
            height = groupHeight;
        } else if (scope.mode === "STACKED") {
          xScalar = (width - leftPadding - rightPadding) / scope.model.maxVal;
            yPos = topPadding;
            height = stackHeight;
        }
        // set up paper, data structure for graph elements, and a couple element sets that span channels 
        paper = Raphael(element[0], width, height),
        Graph = {},
         labelSetR = paper.set(),
        hoverRects = paper.set();
        //loop thru model by channel, draw things
        for (key in scope.model.data) {
          if (scope.model.data.hasOwnProperty(key)) {
              // setup Graph object
              Graph[key] = {
                bars: paper.set(),
                tooltips: paper.set(),
                hoverRects: paper.set(),
                lLabel: null,
                rLabel: null
              };
              // init vars needed for drawing
              var vals = scope.model.data[key],
                 xUsed = 0,
               numBars = 0,
               sumVals = vals.reduce(function(a,b){return a+b});

              vals.forEach(function(elem, index) {
                if(elem == null) {
                    elem = 0;
                }
                //draw bars
                if (scope.mode === 'STACKED') {
                  if (index == 0) { // first bar section
                    var barStr1 = 'M'+(leftPadding)+','+yPos+'l'+slashWidth+',0l-'+barAngle+','+barHeight+'l-'+(slashWidth-barAngle)+',0Z',
                        barStr2 = 'M'+(leftPadding+xUsed)+','+yPos+'l'+(elem * xScalar)+',0l-'+barAngle+','+barHeight+'l-'+(elem * xScalar - barAngle)+',0Z',
                        bar = paper.path(barStr1).attr({'fill': colors[index], 'stroke-width': '0px'});
                    bar.animate({path: barStr2}, barAnimateTime+(yPos*2), animationType);
                  } else { // rest of bar sections
                    var barStr1 = 'M'+(leftPadding)+','+yPos+'l'+slashWidth+',0l-'+barAngle+','+barHeight+'l-'+slashWidth+',0Z',
                        barStr2 = 'M'+(leftPadding+xUsed)+','+yPos+'l'+(elem * xScalar)+',0l-'+barAngle+','+barHeight+'l-'+(elem * xScalar)+',0Z',
                        bar = paper.path(barStr1).attr({'fill': colors[index], 'stroke-width': '0px'});
                    bar.animate({path: barStr2}, barAnimateTime+(yPos*2), animationType);
                  }
                } else if (scope.mode === 'GROUPED') {
                  numBars += 1;
                  var barStr1 = 'M'+(leftPadding)+','+(yPos-barHeight)+'l'+barAngle+',0l-'+barAngle+','+altBarHeight+'l0,0Z',
                      barStr2 = 'M'+(leftPadding)+','+(yPos-barHeight)+'l'+(elem * xScalar)+',0l-'+barAngle+','+altBarHeight+'l-'+((elem * xScalar)-barAngle)+',0Z',
                      bar = paper.path(barStr1).attr({'fill': colors[index], 'stroke-width': '0px'});
                  bar.animate({path: barStr2}, barAnimateTime + (yPos * 2), animationType);
                }
                //add bar to Graph
                Graph[key].bars.push(bar);

                //tooltip
                var tooltip = paper.set();
                if (scope.mode === 'STACKED') {
                  tooltip.push(
                    paper.rect(leftPadding + xUsed + (elem * xScalar / 2) - tooltipWidth/2, yPos - (tooltipHeight+5), tooltipWidth, tooltipHeight).attr({'fill': colors.tooltipBG}),
                    paper.path('M' + (leftPadding + xUsed + (elem * xScalar / 2)) + ',' + (yPos+5) + 'l-8,-10l16,0Z').attr({'fill': colors.tooltipBG, stroke: 'none'}),
                    paper.text(leftPadding + xUsed + (elem * xScalar / 2), yPos - 15, vals[index]).attr({'fill': colors.tooltipFont, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'middle'})
                  );
                } else if (scope.mode ==='GROUPED') {
                  tooltip.push(
                    paper.rect(leftPadding + (elem * xScalar / 2) - tooltipWidth/2, yPos - altBarHeight - (tooltipHeight+10), tooltipWidth, tooltipHeight).attr({'fill': colors.tooltipBG}),
                    paper.path('M' + (leftPadding + elem * xScalar / 2) + ',' + (yPos - altBarHeight) + 'l-8,-10l16,0Z').attr({'fill': colors.tooltipBG, stroke: 'none'}),
                    paper.text(leftPadding + (elem * xScalar / 2), yPos - (tooltipHeight + 5), vals[index]).attr({'fill': colors.tooltipFont, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'middle'})
                  );
                }
                tooltip.hide();
                Graph[key].tooltips.push(tooltip);

                //hover event box
                if (scope.mode === 'STACKED') {
                  var hoverRect  = paper.rect(leftPadding + xUsed, yPos - 5, elem * xScalar, barHeight + 10);
                } else if (scope.mode ==='GROUPED') {
                  var hoverRect  = paper.rect(leftPadding, yPos - altBarHeight - groupBarPadding - 1, elem * xScalar, altBarHeight * 2);
                }
                hoverRect.attr({fill: 'white', 'fill-opacity': 0, 'stroke': 'transparent'})
                hoverRect.hover(function() {
                  this.prev.show();
                  this.prev.prev.show();
                  this.prev.prev.prev.show();
                }, function() {
                  this.prev.hide();
                  this.prev.prev.hide();
                  this.prev.prev.prev.hide()
                })
                Graph[key].hoverRects.push(hoverRect);
                hoverRects.push(hoverRect)

                // increment
                xUsed += elem * xScalar;
                if (scope.mode === 'GROUPED') {
                  // increment
                yPos += (altBarHeight + groupBarPadding);
                }
              });  //  /forEach

              // labels
              if (scope.mode === 'STACKED') {
                Graph[key].lLabel = paper.text(0, yPos+5, key).attr({'font-family': 'ralewayLight', 'font-size': 12, 'text-anchor': 'start', 'fill': colors.font});
                Graph[key].rLabel = paper.text(Math.floor(sumVals * xScalar)+leftPadding+rightLabelOffset, yPos+(barHeight/2), sumVals).attr({'fill': colors.font, 'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'start'})
                labelSetR.push(Graph[key].rLabel);
              } else if (scope.mode === 'GROUPED') {
                Graph[key].lLabel = paper.text(0, yPos - groupSpacing - (numBars / 2 * (altBarHeight + groupBarPadding)) , key).attr({'font-family': 'ralewayLight', 'font-size': 12, 'text-anchor': 'start', 'fill': colors.font});
              }

              //increment
              if (scope.mode === 'STACKED') {
                yPos += (barYSpacing + barHeight);
              } else if (scope.mode === 'GROUPED') {
                yPos += (groupSpacing + altBarHeight);
              }

            }  // end if
          }  // end for

          //fade in labels
          labelSetR.forEach(function(el){
            setTimeout(function(){
              el.animate({'fill-opacity': 1}, labelFadeInTime, animationType)
            }, barAnimateTime);
          });
        }

          //necessary to $digest on window resize,
          //so element[0].parentNode.offsetWidth can be $watch-ed
          angular.element($window).bind('resize', function() {
            return scope.$digest();
          });
          // resize debounce
          var timeout = null;
          scope.$watch(function() {
            return element[0].parentNode.offsetWidth;
          }, function(newVal, oldVal) {
            if (newVal !== oldVal) {
              if (timeout) {
                $timeout.cancel(timeout)
              }
              timeout = $timeout(animToNewVals.bind(null, 'resize'), 250);
            }
          })

          // also $watch for model + mode changes
          scope.$watch('model.data', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              animToNewVals();
            }
          })
          scope.$watch('mode', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              animToNewVals();
            }
          })


          // behaves like paper.animate('height', h) would
          var paperResize = function(h) {
            if (Math.abs(height - h) <= 4) {
              height = h;
              paper.setSize(width, height);
              return;
            } else if (height < h) {
              height += 4;
              paper.setSize(width, height);
              setTimeout(function(){
                paperResize(h);
              }, 15);
            } else if (height > h) {
              height -= 4;
              paper.setSize(width, height);
              setTimeout(function(){
                paperResize(h);
              }, 15);
            } else {
              return;
            }
          }
          // handles animating to new paths/locations for window resize,
          //   model data change, and graph mode change
          var animToNewVals = function(flag) {
            var newChans = 0, oldChans = 0, key;
              for (key in scope.model.data) {
                if (scope.model.data.hasOwnProperty(key)) {
                  oldChans += 1;
                }
              }
              for (key in Graph) {
                if (Graph.hasOwnProperty(key)) {
                  newChans += 1;
                }
              }
            if (newChans !== oldChans) {
              barAnimateTime = reAnimateTime;
              if (paper !== undefined) {
                paper.remove()
              }
              Draw();
              return;
            }


            if (flag === 'resize') {
              // animate faster
              var timeStore = reAnimateTime;
              reAnimateTime = 0;
              //set new paper width
              width = element[0].parentNode.offsetWidth;
            }

            
            // graphing vars
            yPos = 0 + topPadding;
            var xUsed = 0;
            // mode specific paper resize and graphing vars
            if (scope.mode === "GROUPED") {
              paperResize(groupHeight);
              localMax = 0;
              for (var key in scope.model.data) {
                if (scope.model.data.hasOwnProperty(key)) {
                  var vals = scope.model.data[key];

                  vals.forEach(function(el){
                    localMax = (el >localMax) ? el : localMax;
                  })
                }
              }
              xScalar = (width - leftPadding - rightPadding) / localMax;
              yPos += 5;
            } else if (scope.mode === "STACKED") {
              paperResize(stackHeight);
              xScalar = (width - leftPadding - rightPadding) / scope.model.maxVal;
            }
            // hide right labels and hoverRects
            labelSetR.attr('fill-opacity', '0');
            hoverRects.hide();

            // animate changes
            for (var key in Graph) {
              if (Graph.hasOwnProperty(key)) {
                // grab channel data
                var chan = Graph[key];

                if (scope.mode === "STACKED") {
                  chan.bars.forEach(function(el, index) {
                    var value = scope.model.data[key][index];    
                    if(value == null) {
                        value = 0;
                    }
                    //animate bar
                    if (index == 0) {
                      var newPath = 'M'+(leftPadding+xUsed)+','+yPos+'l'+(value * xScalar)+',0l-'+barAngle+','+barHeight+'l-'+(value * xScalar - barAngle)+',0Z';
                    } else {
                      var newPath = 'M'+(leftPadding+xUsed)+','+yPos+'l'+(value * xScalar)+',0l-'+barAngle+','+barHeight+'l-'+(value * xScalar)+',0Z';
                    }
                    el.animate({path: newPath}, reAnimateTime, animationType)
                    //modify hoverRect
                    chan.hoverRects[index].attr({
                      'x': leftPadding + xUsed - 5,
                      'y': yPos - 5,
                      'width': (scope.model.data[key][index] * xScalar) + 10,
                      'height': barHeight * 2
                    })
                    chan.hoverRects[index].prev.attr({
                    	'text': scope.model.data[key][index]
                    });
                    // transform tooltip
                    var startX = chan.tooltips[index][1].attrs.path[0][1];
                    var startY = chan.tooltips[index][1].attrs.path[0][2];
                    var endX = leftPadding + xUsed + (scope.model.data[key][index] * xScalar / 2);
                    var endY = yPos + altBarHeight;
                    var transX =  endX - startX;
                    var transY =  endY - startY;
                    chan.tooltips[index].transform('t'+ transX + ',' + transY);
                    //increment
                    xUsed += scope.model.data[key][index] * xScalar;
                  });
                  //left label
                  chan.lLabel.animate({'y': yPos + barHeight / 2}, reAnimateTime, animationType)
                  var sumVals = scope.model.data[key].reduce(function(a,b){return a+b});
                  if (chan.rLabel) {
                    chan.rLabel.attr('text', sumVals);
                    chan.rLabel.attr('x', xUsed + leftPadding + rightLabelOffset);
                  } else {
                    chan.rLabel = paper.text(Math.floor(sumVals * xScalar)+leftPadding+rightLabelOffset, yPos+(barHeight/2), sumVals).attr({'fill': colors.font, 'fill-opacity': 0, 'font-family': 'robotoLight', 'font-size': 12, 'text-anchor': 'start'})
                    labelSetR.push(chan.rLabel);
                  }
                  //increment
                  xUsed = 0;
                  yPos += (barYSpacing + barHeight);

                } else if (scope.mode === "GROUPED") {
                  var numBars = 0;
                  chan.bars.forEach(function(el, index) {
                    var value = scope.model.data[key][index];    
                    if(value == null) {
                        value = 0;
                    }
                    numBars += 1;
                    var groupYOffset = -barHeight;
                    // animate bar
                    var newPath = 'M'+(leftPadding)+','+(yPos+groupYOffset)+'l'+(value * xScalar)+',0l-'+barAngle+','+altBarHeight+'l-'+((value * xScalar)-barAngle)+',0Z';
                    el.animate({path: newPath}, reAnimateTime, animationType);
                    //modify hoverRect
                    chan.hoverRects[index].attr({
                      'y': yPos - altBarHeight * 2,
                      'x': leftPadding,
                      'width': scope.model.data[key][index] * xScalar,
                      'height': altBarHeight * 2
                    });
                    chan.hoverRects[index].prev.attr({
                    	'text': scope.model.data[key][index]
                    });
                    //transform tooltip
                    var startX = chan.tooltips[index][1].attrs.path[0][1];
                    var startY = chan.tooltips[index][1].attrs.path[0][2];
                    var endX = leftPadding + xUsed + (value * xScalar / 2);
                    var endY = yPos - (altBarHeight / 2) - 4;
                    var transX =  endX - startX;
                    var transY =  endY - startY;
                    chan.tooltips[index].transform('t'+ transX + ',' + transY);
                    // increment
                    yPos += (altBarHeight + groupBarPadding);
                  }) // end forEach
                  // animate left label
                  chan.lLabel.animate({'y': yPos - groupSpacing - (numBars / 2 * (altBarHeight + groupBarPadding))}, reAnimateTime, animationType);
                  //increment
                  yPos += (groupSpacing + altBarHeight);
                }
              } //end if
            } //end for
            if (scope.mode === "STACKED") {
              setTimeout(function(){
                labelSetR.forEach(function(el) {
                  el.animate({'fill-opacity': 1}, labelFadeInTime, animationType)
                })
              }, reAnimateTime)
            }

            hoverRects.show()
            //reset after resize
            if (flag === 'resize') {
            reAnimateTime = timeStore;
            }            
          } // end animToNewVals fcn
      } // end link fcn
    }  // end returned obj
});