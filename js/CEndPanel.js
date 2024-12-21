function CEndPanel(aInfos, iLevel){
    
    var _iLevel = iLevel;
    var _iScore = 0;
    var _iPlayerRunner;
    
    var _oScoreMode;
    var _oScoreText;
    
    var _oBg;
    var _oGroup;
    var _oButRestart;
    var _oButRestartPos;
    var _oFade;
    
    var _aInfos = aInfos;
    var _aPlayersArrivals = s_oCityInfos.getPlayersArrivals();
    var _aRunnersInLane = new Array();
    var _aPlacePoints = [100, 50, 25, 10, 9, 8, 7, 6];
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("rgba(0,0,0,0.6)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.on("click",function(){});
        _oGroup.addChild(_oFade);
        
        var oSprite = s_oSpriteLibrary.getSprite('result_panel');
        _oBg = createBitmap(oSprite);
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        _oBg.regX = oSprite.width/2;
        _oBg.regY = oSprite.height/2;
        _oGroup.addChild(_oBg);
                
        _oScoreMode = new CTLText(_oGroup, 
                    500, 145, 200, 20, 
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_DISCIPLINE,
                    true, true, false,
                    false );

                
        _oScoreText = new CTLText(_oGroup, 
                    500, 170, 200, 30, 
                    30, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_RESULT,
                    true, true, false,
                    false );

        
        
        var oSprite = s_oSpriteLibrary.getSprite('but_continue_small');
        _oButRestartPos = {x: (CANVAS_WIDTH/2+340), y: CANVAS_HEIGHT-172};
        _oButRestart = new CGfxButton(_oButRestartPos.x, _oButRestartPos.y, oSprite,_oGroup);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onContinue, this);
                
        this.getRunnerInLane();
        this.addScoreToPlayers();
    };
        
    this.show = function(){
        
        var iX = 450;
        var iY = 210; 
        for(var i=0; i < _aPlayersArrivals[_iLevel].length; i++){ 
            var oSprite = createBitmap(s_oSpriteLibrary.getSprite("flag_"+_aPlayersArrivals[_iLevel][i].player));
            oSprite.x = iX;
            oSprite.y = iY;
            _oGroup.addChild(oSprite);
            
            iX += 110;
            
            var oPosition = new CTLText(_oGroup, 
                    iX - 155, iY, 30, 20, 
                    30, "left", "#fff", FONT, 1,
                    0, 0,
                    i+1,
                    true, true, false,
                    false );

            
            var oTeamText = new CTLText(_oGroup, 
                    iX, iY, 200, 20, 
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    _aInfos[i].name,
                    true, true, false,
                    false );

            
            iX += 305;
            
            var oTimeText = new CTLText(_oGroup, 
                    iX, iY, 100, 20, 
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    _aInfos[i].time,
                    true, true, false,
                    false );

            
            iX = 450;
            iY += 37;
        }
        
        _oGroup.visible = true;
        
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {});
        
        $(s_oMain).trigger("save_score",_iScore);
        
        //LOCAL STORAGE        
        saveItem("100metres_LevelReached", s_iLevelReached);
        saveItem("100metres_Money", s_iPlayerMoney);
        saveItem("100metres_SpeedBought", s_iSpeedBought);
        saveItem("100metres_EnergyBought", s_iEnergyBought);
        saveItem("100metres_SpeedAdder", s_iSpeedAdder);
        saveItem("100metres_EnergyAdder", s_iEnergyAdder);
        saveItem("100metres_TeamSelected", s_iTeamSelected);
        saveItem("100metres_TeamSelectedSprite", s_szTeamSelectedSprite);
        saveItem("100metres_Scores",  JSON.stringify(s_aRunnersScore));
        s_oCityInfos.addCitiesStorage();
    };
    
    this.getRunnerInLane = function(){
        for(var i=0; i < _aPlayersArrivals[0].length; i++){
            _aRunnersInLane.push(PLAYER_NAME_AND_SPRITE[_aPlayersArrivals[_iLevel][i].player].sprite);
            if(_aRunnersInLane[i] === s_iTeamSelected){
                _iPlayerRunner = i;
            }
        }
    };
    
    this.addScoreToPlayers = function(){  
        
        for(var j=0; j < _aPlayersArrivals[_iLevel].length; j++){
            s_aRunnersScore[_aPlayersArrivals[_iLevel][j].player] += _aPlacePoints[_aPlayersArrivals[_iLevel][j].position];
        }
        
        _iScore = s_aRunnersScore[_aPlayersArrivals[_iLevel][_iPlayerRunner].player];
    };
    
    this._onContinue = function(){
        playSound("click",0.5,false);
        s_oStage.removeChild(_oGroup);
        _oButRestart.unload();
        _oFade.off("click",function(){});
        
        s_oGame.onContinue();
    };
    
    this._init();
    
    return this;
}
