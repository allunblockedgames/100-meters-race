function CVariousHelp(szText, iHelpType){
    
    var _iHelpType = iHelpType;
    var _iTextY = -100;

    
    var _oBg;
    var _oContainer;
    var _oContainerPos = {x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2};

    var _szText = szText;
    var _oMsgText;
    
    var _oShape;
    
    var _oButNo;
    var _oButYes;
    
    var _pHealthBarContainerPos = {x: 100, y: 150};
    var _pHealthBarPos = {x: 100, y: 154};
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.x = _oContainerPos.x;
        _oContainer.y = _oContainerPos.y;
        _oContainer.alpha = 0;
        
        _oShape = new createjs.Shape();
        _oShape.graphics.beginFill("#000000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oShape.alpha = 0.7;
        _oShape.on("mousedown", this._onClick);
        s_oStage.addChild(_oShape);
        
        if(_iHelpType === WAIT_FOR_GAME_START){
        
            var oSpriteBg = s_oSpriteLibrary.getSprite('help_panel');
            _oBg = createBitmap(oSpriteBg);
            _oBg.regX = oSpriteBg.width/2;
            _oBg.regY = oSpriteBg.height/2;
            _oContainer.addChild(_oBg);
            
            var oTitleText = new CTLText(_oContainer, 
                    -190,-210, 400, 24, 
                    24, "left", "#fff", FONT, 1,
                    0, 0,
                    TEXT_HELP,
                    true, true, false,
                    false );

            
            _oMsgText = new CTLText(_oContainer, 
                    -140,_iTextY, 280, 80, 
                    24, "center", "#fff", FONT, 1,
                    0, 0,
                    _szText,
                    true, true, true,
                    false );

            
            if(!s_bMobile){
                var oSpriteLeft = createBitmap(s_oSpriteLibrary.getSprite('left_directional_arrows'));
                oSpriteLeft.x = -267;
                oSpriteLeft.y = -121;
                _oContainer.addChild(oSpriteLeft);

                var oSpriteRight = createBitmap(s_oSpriteLibrary.getSprite('right_directional_arrows'));
                oSpriteRight.x = 143;
                oSpriteRight.y = -121;
                _oContainer.addChild(oSpriteRight);
            }else{
                _oMsgText.refreshText(TEXT_START_MOVEMENT_MOBILE);
                
                var oSprite = createBitmap(s_oSpriteLibrary.getSprite('left_button'));
                oSprite.x = -267;
                oSprite.y = -121;
                _oContainer.addChild(oSprite);
                
                var oSprite = createBitmap(s_oSpriteLibrary.getSprite('right_button'));
                oSprite.x = 143;
                oSprite.y = -121;
                _oContainer.addChild(oSprite);
            }

            
            var oSpriteHorizontalBar = createBitmap(s_oSpriteLibrary.getSprite('horizontal_bar'));
            oSpriteHorizontalBar.x = -140;
            oSpriteHorizontalBar.y = 20;
            oSpriteHorizontalBar.scaleX = 0.5;
            oSpriteHorizontalBar.scaleY = 0.5;
            _oContainer.addChild(oSpriteHorizontalBar);

            var oMsgText = new CTLText(_oContainer, 
                    -125, _iTextY+225, 250, 54, 
                    18, "center", "#fff", FONT, 1,
                    0, 0,
                    HELP_ENERGY,
                    true, false, true,
                    false );


            var oHealthSprite = s_oSpriteLibrary.getSprite('health');
            var oHealthBar  = createBitmap(oHealthSprite);
            oHealthBar.x = _pHealthBarPos.x - 4;
            oHealthBar.y = _pHealthBarPos.y-70;
            oHealthBar.regX = oHealthSprite.width;
            oHealthBar.scaleX = 0.59;
            oHealthBar.scaleY = 0.5;
            oHealthBar.alpha = 0.9;
            _oContainer.addChild(oHealthBar);

            var oHealthSprite = s_oSpriteLibrary.getSprite('energy_bar');
            var oHealth  = createBitmap(oHealthSprite);
            oHealth.x = _pHealthBarContainerPos.x;
            oHealth.y = _pHealthBarContainerPos.y-85;
            oHealth.scaleX = 0.6;
            oHealth.scaleY = 0.6;
            oHealth.regX = oHealthSprite.width;
            _oContainer.addChild(oHealth);
            
        }else if(_iHelpType === CONFIRMATION_ON_EXIT){
            
            var oSpriteBg = s_oSpriteLibrary.getSprite('are_you_sure_panel');
            _oBg = createBitmap(oSpriteBg);
            _oBg.regX = oSpriteBg.width/2;
            _oBg.regY = oSpriteBg.height/2;
            _oContainer.addChild(_oBg);
            
            _oMsgText = new CTLText(_oContainer, 
                    -180,_iTextY, 360, 100, 
                    26, "center", "#fff", FONT, 1,
                    0, 0,
                    _szText,
                    true, true, true,
                    false );



            _oButNo = new CGfxButton(-160,80,s_oSpriteLibrary.getSprite('but_exit'),_oContainer);
            _oButNo.addEventListener(ON_MOUSE_UP, this._onNo, this);
            
            _oButYes = new CGfxButton(160,80,s_oSpriteLibrary.getSprite('but_yes'),_oContainer);
            _oButYes.addEventListener(ON_MOUSE_UP, this._onYes, this);

        }else if(_iHelpType === CONFIRMATION_ON_CAREER_RESET){
            
            var oSpriteBg = s_oSpriteLibrary.getSprite('are_you_sure_panel');
            _oBg = createBitmap(oSpriteBg);
            _oBg.regX = oSpriteBg.width/2;
            _oBg.regY = oSpriteBg.height/2;
            _oContainer.addChild(_oBg);
            
            _oMsgText = new CTLText(_oContainer, 
                    -180,_iTextY, 360, 100, 
                    26, "center", "#fff", FONT, 1,
                    0, 0,
                    _szText,
                    true, true, true,
                    false );

            
            _oButNo = new CGfxButton(-160,80,s_oSpriteLibrary.getSprite('but_exit'),_oContainer);
            _oButNo.addEventListener(ON_MOUSE_UP, this._onNoCareerReset, this);
            
            _oButYes = new CGfxButton(160,80,s_oSpriteLibrary.getSprite('but_yes'),_oContainer);
            _oButYes.addEventListener(ON_MOUSE_UP, this._onYesCareerReset, this);
        }
        
        s_oStage.addChild(_oContainer);
       
        this.show();
    };

    
    this.show = function(){    
        createjs.Tween.get(_oContainer).to({alpha:1 }, 500);
    };
    
    this._onNo = function(){
        s_oGame.unloadVariousHelp(_iHelpType);
    };
    
    this._onYes = function(){
        s_oGame.onExit();
    };
    
    this._onNoCareerReset = function(){
        s_oMenu.unloadVariousHelp();
    };
    
    this._onYesCareerReset = function(){
        s_oMenu.onContinue();
    };
    
    this._onClick = function(){
        if(_iHelpType === WAIT_FOR_GAME_START){
            s_oGame.unloadVariousHelp(_iHelpType);
            s_oGame.startGame();
        }
    };
    
    
    this.unload = function(){        
        createjs.Tween.get(_oContainer).to({alpha:0 }, 500).call(function() {
            s_oStage.removeChild(_oContainer);
        });

        if(_iHelpType === CONFIRMATION_ON_EXIT || _iHelpType === CONFIRMATION_ON_CAREER_RESET){
            _oButNo.unload();
            _oButYes.unload();
        }
        
        _oShape.off("mousedown", this._onClick);
        
        s_oStage.removeChild(_oShape);
        
    };
    
    this._init();
    
    s_oVariousHelp = this;
            
    return this;
}

var s_oVariousHelp = null;