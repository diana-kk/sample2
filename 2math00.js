var SVG = Snap('#my-svg');

// 최상위 그룹
var Paper = SVG.g();

//이미지
var start = Paper.image('img/start.png', 0, 0, 250, 280).toDefs();

//SVG 외곽선
Paper.rect(0, 0, 360, 640).attr({
  'stroke': 'gray',
  'fill': 'none',
  'rx': 6,
  'ry': 6
});

// 메뉴 박스
var topBox = Paper.g();

start.use().transform('t55, 170').appendTo(topBox);

topBox.text(180, 130, '더 해 봐요!').attr({
  'font-size': 45,
  'text-anchor': 'middle'

});
var r1 = topBox.rect(50, 490, 260, 50, 5).attr({
  'fill': '#F7E9E4'
});
var t1 = topBox.text(180, 525, '시 작').attr({
  'font-size': 25,
  'text-anchor': 'middle',
  'font-weight': 'bold'
});

var rt1 = topBox.g(r1, t1).click(handler01).attr({
  'cursor': 'pointer'
});

function handler01() {
  location.replace('2math01.html');
}
