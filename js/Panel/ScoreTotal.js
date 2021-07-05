function ScoreTotal () {
    var _aCbCompleted;
    
    var _iStartY;
    var _oListener;
    var _oFade;
    var _oPanelContainer;

    var _ButtonNextGame;
    var _ButtonHome;

    var _TextScore;
    var _TextTime;
    var _Text1;
    var _Text2;
    var _oThis;

    this._init = function () {

        _aCbCompleted = new Array();

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("mousedown",function(){});
        s_oStage.addChild(_oFade);

        _oPanelContainer = new createjs.Container();   
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('panel_bg');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);

        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = _iStartY = - oSprite.height/2;

        new CText(0, -280, null, 'TỔNG KẾT!!', "showcard", "#fffec9", 100, _oPanelContainer);

        _TextScore = new CText(0, -100, null, '90', "MontserratBlack", "#ffdf80", 140, _oPanelContainer, "#59173e");

        _TextTime = new CText(0, -50, null, 'Thời gian hoàn thành: 50s', "MontserratBlack", "#FFF", 18, _oPanelContainer);
        _Text1 = new CText(0, 0, null, 'CHÚC MỪNG BẠN ĐÃ VƯỢT QUA TẤT CẢ THỬ', "MontserratBlack", "#FFF", 20, _oPanelContainer);
        _Text2 = new CText(0, 30, null, 'THÁCH. CÙNG XEM BẢNG XẾP HẠNG NHÉ!!', "MontserratBlack", "#FFF", 20, _oPanelContainer);

        _ButtonHome = new CGfxButton( -175 , 190, s_oSpriteLibrary.getSprite('home_button'), _oPanelContainer);
        _ButtonHome.addEventListener(ON_MOUSE_UP, this.onGoHome, this, 0);

        _ButtonNextGame = new CTextButton( 45, 190,s_oSpriteLibrary.getSprite('panel_button_bg'), 'BẢNG XẾP HẠNG', "showcard", "#61230b", 35, _oPanelContainer);
        _ButtonNextGame.addEventListener(ON_MOUSE_UP, this._onButtonNextGame, this, 0);

    }

    this._onButtonNextGame = function () {
        _oThis.hide();
        this.onGoHome()
        console.log('BXH')
    };

    this.onGoChooseGame = function () {
        _oThis.hide();
        this.unload()
        _iState = 'CHOOSE_GAME'
        _ScreenChooseGame = new ScreenChooseGame();
    }

    this.onGoHome = function () {
        _oThis.hide();
        this.unload()
        _iState = 'HOME'
        _ScreenHome = new ScreenHome();
    }

    this.unload = function(){
        _ButtonNextGame.unload();
        _ButtonHome.unload();
        _oFade.off("click",_oListener);
        
        s_oStage.removeAllChildren();

        if (ScreenGame_1) {
            ScreenGame_1.unload()
        }
        if (ScreenGame_2) {
            ScreenGame_2.unload()
        }
        if (ScreenGame_3) {
            ScreenGame_3.unload()
        }
        if (ScreenGame_4) {
            ScreenGame_4.unload()
        }

        s_oMain.startUpdateNoBlock();
    };

    this.show = function(){
        GAME_TOTAL_TIME = GAME_1_TIME + GAME_2_TIME + GAME_3_TIME + GAME_4_TIME
        GAME_TOTAL_SCORE = GAME_1_SCORE + GAME_2_SCORE + GAME_3_SCORE + GAME_4_SCORE

        _TextScore.changeText(GAME_TOTAL_SCORE)
        _TextTime.changeText('Thời gian hoàn thành: ' + formatTime(GAME_TOTAL_TIME) + ' phút')
        _oGroup.visible = true;
        // _oFade.alpha = 0;
        _oPanelContainer.y = _iStartY;
        createjs.Tween.get(_oFade).to({alpha:0.7},500);
        createjs.Tween.get(_oPanelContainer).to({y:CANVAS_HEIGHT/2},1000, createjs.Ease.bounceOut).call(function(){s_oMain.stopUpdateNoBlock();});
    };

    this.hide = function(){
        s_oMain.startUpdateNoBlock();
        createjs.Tween.get(_oFade).to({alpha:0},300);
        createjs.Tween.get(_oPanelContainer).to({y:_iStartY},200, createjs.Ease.bounceIn).call(function(){ _oGroup.visible = false;});
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this._onButtonReGame = function () {
        _oThis.hide();
        
        if (_iState === 'GAME1') {
            if (ScreenGame_1) {
                ScreenGame_1.init()
            }
        }

        if (_iState === 'GAME2') {
            if (ScreenGame_2) {
                ScreenGame_2.init()
            }
        }
        
        if (_iState === 'GAME3') {
            if (ScreenGame_3) {
                ScreenGame_3.init()
            }
        }

        if (_iState === 'GAME4') {
            if (ScreenGame_4) {
                ScreenGame_4.init()
            }
        }
    };
    
    _oThis = this;
    this._init();
}