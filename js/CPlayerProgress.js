function CPlayerProgress(){
    
    var _aSpeedPrices = [100, 150, 200, 250];
    var _oSpeedPricesText;
    var _aEnergyPrices = [50, 75, 100, 125];
    var _oEnergyPricesText;
    
    var _oBarSpeedShape;
    var _aBarSpeedOff  = new Array();
    var _aBarSpeedOn   = new Array();
    var _oBarSpeedPosStart = {x: CANVAS_WIDTH/2-135, y: 175};
            
    var _oBarEnergyShape;
    var _aBarEnergyOff = new Array();
    var _aBarEnergyOn  = new Array();
    var _oBarEnergyPosStart = {x: CANVAS_WIDTH/2+165, y: 175};
    
    var _iPlayerMoney = s_iPlayerMoney;
    
    var _szCityName;
    var _iTime;
    var _iReward; 
   
    
    var _oMoneyText;
    
    var _oMedalPos = {x: CANVAS_WIDTH/2-200, y: 222};
    
    var _oCityTextPos = {x: CANVAS_WIDTH/2-120, y: 222};
    var _oCityText;
    
    var _oRewardTextPos = {x: CANVAS_WIDTH/2-280, y: 220};
    var _oRewardText;
    
    var _oTimerTextPos = {x: CANVAS_WIDTH/2+180, y: 224};
    var _oTimerText;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    var _pStartPosContinue;
    var _oButContinue;
    var _oButExit;
    var _oAudioToggle;
    var _oButFullscreen;

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(){
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_select_team'));
        s_oStage.addChild(oBg);      
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.6)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(oFade);
        
        var oSprite = s_oSpriteLibrary.getSprite('upgrade_panel');
        var oBox = createBitmap(oSprite);
        oBox.x = CANVAS_WIDTH/2;
        oBox.y = CANVAS_HEIGHT/2;
        oBox.regX = oSprite.width/2;
        oBox.regY = oSprite.height/2;
        s_oStage.addChild(oBox);
        
        var oUpgradeText = new CTLText(s_oStage, 
                    CANVAS_WIDTH/2-190,58, 300, 24,  
                    24, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_UPGRADE,
                    true, true, false,
                    false );



        
        _oBarSpeedShape = new createjs.Shape();
        _oBarSpeedShape.graphics.beginFill("#000000").drawRect(_oBarSpeedPosStart.x-165, _oBarSpeedPosStart.y-60, 285, 90);
        _oBarSpeedShape.alpha = 0.01;
        _oBarSpeedShape.on("mousedown", this.tryingToBuySpeed);
        _oBarSpeedShape.cursor = "pointer";
        s_oStage.addChild(_oBarSpeedShape);
            
        _oBarEnergyShape = new createjs.Shape();
        _oBarEnergyShape.graphics.beginFill("#000000").drawRect(_oBarEnergyPosStart.x-160, _oBarEnergyPosStart.y-60, 285, 90);
        _oBarEnergyShape.alpha = 0.01;
        _oBarEnergyShape.on("mousedown", this.tryingToBuyEnergy);
        _oBarEnergyShape.cursor = "pointer";
        s_oStage.addChild(_oBarEnergyShape);
        
        var oBuyText = new CTLText(s_oStage, 
                    CANVAS_WIDTH/2-290,145, 70, 40,  
                    20, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_BUY,
                    true, true, true,
                    false );
                    
        
        oBuyText = new CTLText(s_oStage, 
                    CANVAS_WIDTH/2+15,145, 70, 40,  
                    20, "center", "#fff", FONT, 1,
                    0, 0,
                    TEXT_BUY,
                    true, true, true,
                    false );
        
        for(var i=0; i < NUM_POWER_UP_AVAILABLE; i++){
            _aBarSpeedOff.push(createBitmap(s_oSpriteLibrary.getSprite('bar-1')));
            _aBarSpeedOff[i].x = _oBarSpeedPosStart.x;
            _aBarSpeedOff[i].y = _oBarSpeedPosStart.y;
            s_oStage.addChild(_aBarSpeedOff[i]);
            
            _aBarSpeedOn.push(createBitmap(s_oSpriteLibrary.getSprite('bar-2')));
            _aBarSpeedOn[i].x = _oBarSpeedPosStart.x;
            _aBarSpeedOn[i].y = _oBarSpeedPosStart.y;
            _aBarSpeedOn[i].visible = false;
            s_oStage.addChild(_aBarSpeedOn[i]);
            
            _oSpeedPricesText = new CTLText(s_oStage, 
                    _oBarSpeedPosStart.x+1,_oBarSpeedPosStart.y+2, 100, 12,  
                    12, "center", "#fff", FONT, 1,
                    0, 0,
                    _aSpeedPrices[i]+TEXT_CURRENCY,
                    true, true, false,
                    false );


            _aBarEnergyOff.push(createBitmap(s_oSpriteLibrary.getSprite('bar-1')));
            _aBarEnergyOff[i].x = _oBarEnergyPosStart.x;
            _aBarEnergyOff[i].y = _oBarEnergyPosStart.y;
            s_oStage.addChild(_aBarEnergyOff[i]);
            
            _aBarEnergyOn.push(createBitmap(s_oSpriteLibrary.getSprite('bar-2')));
            _aBarEnergyOn[i].x = _oBarEnergyPosStart.x;
            _aBarEnergyOn[i].y = _oBarEnergyPosStart.y;
            _aBarEnergyOn[i].visible = false;
            s_oStage.addChild(_aBarEnergyOn[i]);
            
            _oEnergyPricesText = new CTLText(s_oStage, 
                    _oBarEnergyPosStart.x+1,_oBarEnergyPosStart.y+2, 100, 12,  
                    12, "center", "#fff", FONT, 1,
                    0, 0,
                    _aEnergyPrices[i] + TEXT_CURRENCY,
                    true, true, false,
                    false );
                    

            
            _oBarSpeedPosStart.y -= 15;
            _oBarEnergyPosStart.y -= 15;
        }
        
        for(var i = 0; i < s_iSpeedBought; i++){
            this.makeVisibleSpeedBought(i);
        }
        
        for(var i = 0; i < s_iEnergyBought; i++){
            this.makeVisibleEnergyBought(i);
        }
        
        _oMoneyText =  new CTLText(s_oStage, 
                    CANVAS_WIDTH/2-190,90, 200, 20,  
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_MONEY+": "+_iPlayerMoney+TEXT_CURRENCY,
                    true, true, false,
                    false );
                    

        
        for( var i=0; i < s_oCityInfos.getNumLevels(); i++){
            _szCityName = s_oCityInfos.getCityName(i);
            _iTime = formatTime(s_oCityInfos.getTimeSpent(i));
            _iReward = s_oCityInfos.getRewardTaken(i);
            var szMedal = s_oCityInfos.getMedal(i);
            
            _oRewardText = new CTLText(s_oStage, 
                    _oRewardTextPos.x,_oRewardTextPos.y, 30, 20,  
                    20, "center", "#fff", FONT, 1,
                    0, 0,
                    _iReward+TEXT_CURRENCY,
                    true, true, false,
                    false );
                    

            
            if(szMedal){
                var oSprite = createBitmap(s_oSpriteLibrary.getSprite(szMedal+'_medal'));
                oSprite.x = _oMedalPos.x;
                oSprite.y = _oMedalPos.y;
                oSprite.scaleX = 0.6;
                oSprite.scaleY = 0.6;
                s_oStage.addChild(oSprite);
            }
            
            _oCityText = new CTLText(s_oStage, 
                    _oCityTextPos.x,_oCityTextPos.y, 250, 18,  
                    18, "left", "#fff", FONT, 1,
                    0, 0,
                    _szCityName,
                    true, true, false,
                    false );
                    

            _oTimerText = new CTLText(s_oStage, 
                    _oTimerTextPos.x,_oTimerTextPos.y, 100, 16,  
                    16, "right", "#fff", FONT, 1,
                    0, 0,
                    _iTime,
                    true, true, false,
                    false );
                    

            
            _oCityTextPos.y += 37;
            _oMedalPos.y += 37;
            _oRewardTextPos.y += 37;
            _oTimerTextPos.y += 37;
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_continue_small');
        _pStartPosContinue = {x: (CANVAS_WIDTH/2+340), y: CANVAS_HEIGHT-91};
        _oButContinue = new CGfxButton( _pStartPosContinue.x, _pStartPosContinue.y, oSprite, s_oStage );
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButNextRelease, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oExitX = CANVAS_WIDTH - (oSprite.width/2)- 90;
            _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 10};
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:oSprite.height/2 + 10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreen,this);
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        } 
        if (_fRequestFullScreen && screenfull.enabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
    };
    
    this.makeVisibleSpeedBought = function(i){
        _aBarSpeedOff[i].visible = false;
        _aBarSpeedOn[i].visible = true;
    };
    
    this.makeVisibleEnergyBought = function(i){
        _aBarEnergyOff[i].visible = false;
        _aBarEnergyOn[i].visible = true;
    };
    
    this.tryingToBuySpeed = function(){
        if(s_iSpeedBought < NUM_POWER_UP_AVAILABLE){
            if(s_iPlayerMoney >= _aSpeedPrices[s_iSpeedBought]){
                s_oPlayerProgress.makeVisibleSpeedBought(s_iSpeedBought);
                s_iSpeedAdder += PLAYER_MAX_SPEED_ADDER;
                s_iPlayerMoney -= _aSpeedPrices[s_iSpeedBought];
                s_oPlayerProgress.refreshMoneyCurrency();
                s_iSpeedBought++;
                
                saveItem("100metres_Money", s_iPlayerMoney);
                saveItem("100metres_SpeedBought", s_iSpeedBought);
                saveItem("100metres_SpeedAdder", s_iSpeedAdder);
                if(s_iSpeedBought < NUM_POWER_UP_AVAILABLE){
                    playSound("click",0.5,false);
                }
            }
        }
    };
    
    this.tryingToBuyEnergy = function(){
        if(s_iEnergyBought < NUM_POWER_UP_AVAILABLE){
            if(s_iPlayerMoney >= _aEnergyPrices[s_iEnergyBought]){
                s_oPlayerProgress.makeVisibleEnergyBought(s_iEnergyBought);
                s_iEnergyAdder += PLAYER_ENERGY_ADDER;
                s_iPlayerMoney -= _aEnergyPrices[s_iEnergyBought];
                s_oPlayerProgress.refreshMoneyCurrency();
                s_iEnergyBought++;
                
                saveItem("100metres_Money", s_iPlayerMoney);
                saveItem("100metres_EnergyBought", s_iEnergyBought);
                saveItem("100metres_EnergyAdder", s_iEnergyAdder);
                
                if(s_iEnergyBought < NUM_POWER_UP_AVAILABLE){
                    playSound("upgrade",1,false);
                }
            }
        }
    };
    
    this.refreshMoneyCurrency = function(){
        _oMoneyText.refreshText("Money: "+s_iPlayerMoney + TEXT_CURRENCY);
    };
        
    this._onButNextRelease = function(){
        this.unload();
        s_oMain.gotoSelectLevel(_iPlayerMoney);
    };
    
    this._onExit = function(){
        s_oMain.gotoMenu();  
        $(s_oMain).trigger("end_session");
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.unload = function(){
        if (_fRequestFullScreen && screenfull.enabled) {
            _oButFullscreen.unload();
        } 
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
        _oButContinue.unload();
        s_oPlayerProgress = null;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };


    this._onFullscreen = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();

    };
    
    s_oPlayerProgress = this;
    
    this._init();
}

var s_oPlayerProgress = null;
