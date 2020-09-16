var SVG = Snap('#my-svg');

// 최상위 그룹
var Paper = SVG.g();

//이미지
var hidari = Paper.image('img/hidari.png', 0, 0, 21, 23).toDefs();
var migi = Paper.image('img/migi.png', 0, 0, 21, 23).toDefs();
var direction = Paper.image('img/direction.png', 0, 0, 25, 30).toDefs();

var Library = {
  //SVG 외곽선
  drawLayout: function() {
    Paper.rect(0, 0, 360, 640).attr({
      'stroke': 'gray',
      'fill': 'none',
      'rx': 6,
      'ry': 6
    });

    // 상단 바 부분
    var topBox = Paper.g();
    topBox.path('M1 40 L359 40 L359 0 Q358 1 358 1 L1 1').attr({
      'fill': '#E8EBEE'
    });
    topBox.text(180, 27, '덧셈과 뺄셈').attr({
      'font-size': 18,
      'text-anchor': 'middle'
    });

    hidari.use().transform('t10, 9').appendTo(topBox).click(handlerPre).attr({
      'cursor': 'pointer'
    });

    function handlerPre() {
      location.replace('2math00.html');
    }

    migi.use().transform('t325, 9').appendTo(topBox).click(handlerNext).attr({
      'cursor': 'pointer'
    });

    function handlerNext() {
      location.replace('2math02.html');
    }

    direction.use().transform('t12, 55').appendTo(topBox);
    topBox.text(43, 78, '다음과 같은 수가 되도록 두 수를 골라 보세요.').attr({
      'font-size': 17,
    });
  },

  //////////////////////////////////////////////////////////////////////////////////////////////
  generatePairGame: function(params) {
    var condition = params.condition;
    var pairInfo = {};
    var gameData = data.slice();
    var paper = Paper.g();

    gameData = gameData.filter(function(el) {
      if (el.jei_set.indexOf(condition.grade) === -1) return false;
      var setNum = Number(el.jei_set.slice(1, 3));
      if (setNum < condition.setRange[0] || condition.setRange[1] < setNum) return false;
      return true;
    });
    //gameData = shuffle(gameData).slice(0, 2);

    return gameData;

    // function shuffle(arr) {
    //   return arr.sort(function() {
    //     return Math.random() - 0.5;
    //   });
    // }
  },

  drawPairGame: function(params) {
    var paper = params.paper.g();
    var questionInfo = params.questionInfo;

    var gameEl = [];
    for (var i = 0; i < questionInfo.length; i++) {
      gameEl.push({
        text: questionInfo[i].hanja,
        data: i
      });
      gameEl.push({
        text: questionInfo[i].mean,
        data: i
      });
    }
    //gameEl = shuffle(gameEl);
    console.log(gameEl);

    // function shuffle(arr) {
    //   return arr.sort(function() {
    //     return Math.random() - 0.5;
    //   });
    // }
    paper.text(180, 215, '9').attr({
      'font-size': 100,
      'text-anchor': 'middle'
    });

    var questions = [];
    for (var j = 0; j < gameEl.length; j++) {
      questions[j] = paper.g();
      questions[j].attr({
        'cursor': 'pointer'
      });
      questions[j].rect(50 + (j % 2) * 130, 280 + Math.floor(j / 2) * 130, 130, 130).attr({
        'fill': 'white',
        'stroke': '#D7A2AB',
        'stroke-width': 1.5
      });
      var isTooShort = gameEl[j].text.length < 2;
      questions[j].text(115 + (j % 2) * 130, 365 + Math.floor(j / 2) * 130, gameEl[j].text).attr({
        'font-size': (isTooShort ? 55 : 22),
        'text-anchor': 'middle'
      });
      questions[j].data('i', gameEl[j].data);
    }

    Paper.rect(55, 415, 120, 120).attr({
      'fill': 'white',
      'stroke': 'white',
      'cursor': 'pointer'
    });
    Paper.rect(185, 415, 120, 120).attr({
      'fill': 'white',
      'stroke': 'white',
      'cursor': 'pointer'
    });
    Paper.text(115, 495, '6').attr({
      'font-size': 55,
      'text-anchor': 'middle',
      'cursor': 'pointer'
    });
    Paper.text(245, 495, '2').attr({
      'font-size': 55,
      'text-anchor': 'middle',
      'cursor': 'pointer'
    });

    return questions;

  },

  checkPairGame: function(params) {
    var questions = params.questions;
    var pair = [];
    var correctCount = [];
    var callback = params.callback;
    var startTime = new Date().getTime();
    var paper = Paper.g();

    for (var i = 0; i < questions.length; i++) {
      questions[i].click(handler);
    }

    function handler() {
      // this.attr({
      //   'pointer-events': 'none'
      // });
      // this.select('rect').attr({
      //     'fill': '#afdc55',
      //     'opacity' : '0.3'
      // });

      pair.push(this.data('i'));

      setTimeout(function() {
        if (pair.length === 2) { //두 개를 선택
          if (pair[0] === pair[1]) { //정답일 때
            pairRemove(pair[0]);
            var userTime = new Date().getTime() - startTime;
            correctCount.push(userTime);
            if (correctCount.length === 1) { //다 없어졌는지 체크
              //callback(userTime);
              Paper.circle(180, 395, 120).attr({
                'stroke': 'tomato',
                'stroke-width': 35,
                'fill': 'none',
                'opacity': 0.5
              });
              setTimeout(function() {
              location.replace('2math02.html');
            }, 1000);
            }
          } else {
            clearAttr();
          }
          pair = [];
        }
      }, 300);
    }

    function pairRemove(index) {
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].data('i') === index) {
          questions[i].select('rect').attr({
            'fill': '#FEFDE7'
          });

        }
      }
    }

    function clearAttr() {
      for (var i = 0; i < questions.length; i++) {
        questions[i].select('rect').attr({
          'fill': 'white'
        });
        questions[i].attr({
          'pointer-events': 'auto'
        });
      }
    }
  },
};

Library.drawLayout();
