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
  var startPoint = {x: 1, y: 2, type: 2};
  var endPoint = {x: 27, y: 27, type: 3};

  var maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

  var checkMaze = function (maze) {
    return true;
  }

  if (!checkMaze ()) return;


  var classMap = ['wall', 'road', 'now', 'end'];

  var dimension = 30, column = maze[0].length, row = maze.length;
  var $view = $('#view');
  var $units = $('#units').css ({'width': column * dimension + 'px', 'height': row * dimension + 'px'})
                          .append (
                            maze.map (function (t) {
                              return t.map (function (u) {
                                return $('<div />').css ({'width': dimension + 'px', 'height': dimension + 'px'})
                                                   .addClass ('unit')
                                                   .addClass (classMap[u]);
                              });
                            }).reduce (function (p, n) { return p.concat (n) })
                          );

  var cW = parseFloat ($view.width ()) * 2;
  var cH = parseFloat ($view.height ()) * 2;
  var cD = dimension * 3;
  var $cover = $('<div />').css ({'top': 0 - ($view.height () / 2) + 'px','left': 0 - ($view.width () / 2) + 'px', 'width': cW + 'px', 'height': cH + 'px', 'line-height': cH + 'px'})
                           .addClass ('cover')
                           .append (
                              $('<div />').css ({'width': cD + 'px', 'height': cD + 'px', 'box-shadow': '0 0 0 ' + (Math.max (cW, cH) * 1.5 - cD) / 2 + 'px rgba(0, 0, 0, 1), inset 0 0 10px 3px rgba(0, 0, 0, 1)'})
                                          .addClass ('round')
                            )
                           .appendTo ($view);

  var nowPoint = {};

  var fetchMaze = function (diff) {
    $.each (diff, function (i, t) {
      $('#units .unit').eq (t.x + t.y * column).removeClass().addClass ('unit').addClass (classMap [t.type])
    });
  }
  var diffMaze = function (n, o) {
    return n.map (function (t, i) {
      return t.map (function (u, j) {
        return o[i][j] != u ? {x: j, y: i, type: u} : null;
      });
    }).reduce (function (p, q) { return p.concat (q) }).filter (function (t) { return t; });
  }
  var moveMaze = function () {
    cW = parseFloat ($view.width ()) * 2;
    cH = parseFloat ($view.height ()) * 2;
    $units.css ({'top': ($view.height () / 2) - ((nowPoint.y + 0.5) * dimension) + 'px', 'left': ($view.width () / 2) - ((nowPoint.x + 0.5) * dimension) + 'px'});
    $cover.css ({'top': 0 - ($view.height () / 2) + 'px','left': 0 - ($view.width () / 2) + 'px', 'width': cW + 'px', 'height': cH + 'px', 'line-height': cH + 'px'});
  }
  var run = function (s, e, n) {
    var newMaze = maze.map (function (u) { return u.slice (0); })
    newMaze[s.y][s.x] = s.type;
    newMaze[e.y][e.x] = e.type;
    var diff = diffMaze (newMaze, maze);
    fetchMaze (diff);
    nowPoint = n ? s : e;
    moveMaze ();
    maze = newMaze;
  }
  var timer = null;
  var enable = true;

  run (startPoint, endPoint, 1);
  var ok = function () {
    enable = false;
    alert ('太棒了！你成功囉！！');
    window.location.assign ('https://github.com/comdan66/OA-maze');
  }
  var up = function () {
    if (!enable) return;
    if (maze[nowPoint.y - 1][nowPoint.x] && (maze[nowPoint.y - 1][nowPoint.x] == 1)) {
      run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x, y: nowPoint.y - 1, type: 2});
    } else if (maze[nowPoint.y - 1][nowPoint.x] == 3) {
      ok ();
    }
    clearTimeout (timer)
  }
  var down = function () {
    if (!enable) return;
    if (maze[nowPoint.y + 1][nowPoint.x] && (maze[nowPoint.y + 1][nowPoint.x] == 1)) {
      run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x, y: nowPoint.y + 1, type: 2});
    } else if (maze[nowPoint.y + 1][nowPoint.x] == 3) {
      ok ();
    }
    clearTimeout (timer)
  }
  var left = function () {
    if (!enable) return;
    if (maze[nowPoint.y][nowPoint.x - 1] && (maze[nowPoint.y][nowPoint.x - 1] == 1)) {
      run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x - 1, y: nowPoint.y, type: 2});
    } else if (maze[nowPoint.y][nowPoint.x - 1] == 3) {
      ok ();
    }
    clearTimeout (timer)
  }
  var right = function () {
    if (!enable) return;
    if (maze[nowPoint.y][nowPoint.x + 1] && (maze[nowPoint.y][nowPoint.x + 1] == 1)) {
      run ({x: nowPoint.x, y: nowPoint.y, type: 1}, {x: nowPoint.x + 1, y: nowPoint.y, type: 2});
    } else if (maze[nowPoint.y][nowPoint.x + 1] == 3) {
      ok ();
    }
    clearTimeout (timer)
  }
  $(window).on ('keydown', function (e) {
    if (e.keyCode == 38) up ();
    if (e.keyCode == 40) down ();
    if (e.keyCode == 37) left ();
    if (e.keyCode == 39) right ();
  })

  window.addEventListener ('deviceorientation', function (event) {
    if (Math.abs (event.beta) > Math.abs (event.gamma)) {
      if (event.beta < -10) {
        setTimeout (up, 100);
      } else if (event.beta > 10) {
        setTimeout (down, 100);
      }
    } else {
      if (event.gamma < -10) {
        setTimeout (left, 100);
      } else if (event.gamma > 10) {
        setTimeout (right, 100);
      }
    }
  });
});