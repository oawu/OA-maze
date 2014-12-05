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
  var dimension = 15, column = 0, row = 0, which = 0;
  var $units = $('#units'), $dumps = $('#dumps');

  var mousedown = function (e) {
    if (e.which == 1 || e.which == 3) {
      which = e.which;
      mouseenter.bind ($(this)).apply ();
    }
  }
  var mouseup = function (e) {
    which = 0;
    var temp = $.makeArray ($units.children ('.unit').map (function () { return $(this).hasClass ('wall') ? 0 : 1; }));
    var maze = [];
    for (var i = 0; i < row; i++) maze.push (temp.slice (i == 0 ? 0 : i * column, i * column + column));
    localStorage.setItem ('maze', JSON.stringify (maze));
  }
  var mouseenter = function () {
    if (which == 1 && $(this).hasClass ('wall') && !$(this).hasClass ('road')) {
      $(this).addClass ('road').removeClass ('wall');
    }
    if (which == 3 && $(this).hasClass ('road') && !$(this).hasClass ('wall')) {
      $(this).addClass ('wall').removeClass ('road');
    }
  }
  var printR = function (maze) {
    $.each (maze, function (i, t) {
      console.info (t.join (''));
      console.info ();
    });
  }

  if (localStorage.getItem ('maze')) {
    var maze = JSON.parse (localStorage.getItem ("maze"));

    column = maze[0].length;
    row = maze.length

    $units.empty ().css ({'width': column * dimension + 'px', 'height': row * dimension + 'px'})
                   .append (
                      maze.map (function (t) {
                        return t.map (function (u) {
                          return $('<div />').css ({'width': dimension + 'px', 'height': dimension + 'px'})
                                             .addClass ('unit')
                                             .addClass (u ? 'road' : 'wall')
                                             .mousedown (mousedown)
                                             .mouseup (mouseup)
                                             .mouseenter (mouseenter)
                                              ;
                        });
                      }).reduce (function (p, n) { return p.concat (n) })
                    );
  }

  $('#create').click (function () {
    column = parseInt ($('#column').val ());
    row = parseInt ($('#row').val ());
    $units.empty ().css ({'width': dimension * column + 'px', 'height': dimension * row + 'px'})

    for (var i = 0; i < column * row; i++)
      $('<div />').addClass ('unit').addClass ('wall')
                  .css ({'width': dimension + 'px', 'height': dimension + 'px'})
                  .mousedown (mousedown)
                  .mouseup (mouseup)
                  .mouseenter (mouseenter)
                  .appendTo ($units);
  });
  $('#dump').click (function () {
    var temp = $.makeArray ($units.children ('.unit').map (function () { return $(this).hasClass ('wall') ? 0 : 1; }));
    var maze = [];
    for (var i = 0; i < row; i++) maze.push (temp.slice (i == 0 ? 0 : i * column, i * column + column));

    if (maze.length && !$dumps.is (':visible') && $units.is (':visible')) {
      $dumps.empty ().append ('var maze = [<br/>');
      $.each (maze, function (i, t) {
        $dumps.append ('&nbsp;&nbsp;&nbsp;&nbsp;[' + t.join (', ') + '],').append ('<br />')
      });
      $dumps.append ('];<br/>').css ({'display': 'inline-block'}).show ();
      $units.hide ();
      $(this).val ('maze');
    } else {
      $units.show ();
      $dumps.hide ();
      $(this).val ('dump');
    }
  });
  $('#clean').click (function () {
    if (localStorage.getItem ('maze'))
      localStorage.removeItem ('maze');
    $units.empty ();
    column = 0;
    row = 0;

    $units.show ();
    $dumps.hide ();
    $('#dump').val ('dump');
  });
});