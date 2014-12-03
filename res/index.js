/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-46121102-7', 'auto');
ga('send', 'pageview');

$(function () {

  var checkMaze = function (maze) {
    return true;
  }
  var maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  var dimension = 20;
  var cD = 50;
  var startPoint = {x: 1, y: 1};
  var endPoint = {x: 19, y: 13};
  var nowPoint = {};
  var column = 0, row = 0;
  var classMap = ['wall', 'road', 'now', 'end']
  if (!checkMaze (maze)) return;
  column = maze[0].length;
  row = maze.length;

  var cW = (column * dimension) * 2;
  var cH = (row * dimension) * 2;
  var $cover = $('<div />').addClass ('cover').css ({'width': cW + 'px', 'height': cH + 'px', 'line-height': cH + 'px'}).append ($('<div />').addClass ('round').css ({'width': cD + 'px', 'height': cD + 'px', 'box-shadow': '0 0 0 ' + (Math.max (cW, cH) * 1.5 - cD) / 2 + 'px rgba(0, 0, 0, 1), inset 0 0 10px 3px rgba(0, 0, 0, 1)'}));
  $('#units').css ({'width': column * dimension + 2 + 'px', 'height': row * dimension + 2 + 'px'});
  $('#units').append (maze.map (function (t) { return t.map (function (u) { return $('<div />').addClass ('unit').css ({'width': dimension + 'px', 'height': dimension + 'px'}).addClass (classMap[u]); }); }).reduce (function (p, n) { return p.concat (n) }))
  $("#units").append ($cover);

  var printR = function () {
    $.each (maze, function (i, t) {
      console.info (t.join (''));
      console.info ();
    });
  }
  var diffMaze = function (n, o) {
    return n.map (function (t, i) {
      return t.map (function (u, j) {
        return o[i][j] != u ? {x: j, y: i, type: u} : null;
      });
    }).reduce (function (p, q) { return p.concat (q) }).filter (function (t) { return t; });
  }
  var fetchMaze = function (diff) {
    $.each (diff, function (i, t) {
      $('#units .unit').eq (t.x + t.y * column).removeClass().addClass ('unit').addClass (classMap [t.type])
    });
  }
  var setCover = function () {
    var x = nowPoint.x * dimension + dimension / 2;
    var y = nowPoint.y * dimension + dimension / 2;
    var t = 0 - (cH / 2);
    var l = 0 - (cW / 2);
    $cover.css ({top: t + y + 'px', left: l + x + 'px'})
  }
  var setStartEnd = function (startPoint, endPoint) {
    var newMaze = maze.map (function (u) { return u.slice (0); })
    newMaze[startPoint.y][startPoint.x] = 2;
    newMaze[endPoint.y][endPoint.x] = 3;
    var diff = diffMaze (newMaze, maze);
    fetchMaze (diff);
    nowPoint = startPoint;
    maze = newMaze;
    setCover ();
  }
  var run = function (s, e) {
    var newMaze = maze.map (function (u) { return u.slice (0); })
    newMaze[s.y][s.x] = s.type;
    newMaze[e.y][e.x] = e.type;
    var diff = diffMaze (newMaze, maze);
    fetchMaze (diff);
    nowPoint = e;
    maze = newMaze;
    setCover ();
  }
  var addRule = (function(style){
      var sheet = document.head.appendChild(style).sheet;
      return function(selector, css){
          var propText = Object.keys(css).map(function(p){
              return p+":"+css[p]
          }).join(";");
          sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
      }
  })(document.createElement("style"));


  setStartEnd (startPoint, endPoint);

  $(window).on ('keydown', function (e) {
    if (e.keyCode == 38) {
      if (maze[nowPoint.y - 1][nowPoint.x] && (maze[nowPoint.y - 1][nowPoint.x] == 1)) {
        run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x, y: nowPoint.y - 1, type: 2});
      } else if (maze[nowPoint.y - 1][nowPoint.x] == 3) {
        alert ('good');
      }
    }
    if (e.keyCode == 40) {
      if (maze[nowPoint.y + 1][nowPoint.x] && (maze[nowPoint.y + 1][nowPoint.x] == 1)) {
        run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x, y: nowPoint.y + 1, type: 2});
      } else if (maze[nowPoint.y - 1][nowPoint.x] == 3) {
        alert ('good');
      }
    }
    if (e.keyCode == 37) {
      if (maze[nowPoint.y][nowPoint.x - 1] && (maze[nowPoint.y][nowPoint.x - 1] == 1)) {
        run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x - 1, y: nowPoint.y, type: 2});
      } else if (maze[nowPoint.y - 1][nowPoint.x] == 3) {
        alert ('good');
      }
    }
    if (e.keyCode == 39) {
      if (maze[nowPoint.y][nowPoint.x + 1] && (maze[nowPoint.y][nowPoint.x + 1] == 1)) {
        run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x + 1, y: nowPoint.y, type: 2});
      } else if (maze[nowPoint.y - 1][nowPoint.x] == 3) {
        alert ('good');
      }
    }
  })


});