function CLevelBut(iXPos,iYPos,oSprite,bActive, Level, oCityName, oCityReward){
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _aButton = new Array();
    var _aParams = [];
    var _oButton;
    
    var _oRewardText1;
    var _oRewardText2;
    var _oRewardText3;
    var _oTextContainer;
    this._init = function(iXPos,iYPos,oSprite,bActive){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        
        _oTextContainer = new createjs.Container();
        _oTextContainer.x = iXPos;
        _oTextContainer.y = iYPos;
        s_oStage.addChild(_oTextContainer);
        
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX: (oSprite.width/2)/2, regY: oSprite.height/2}, 
                        animations: {state_true:[0],state_false:[1]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
         
        _bActive = bActive;
        _oButton = createSprite(oSpriteSheet, "state_"+_bActive,(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);
         
        _oButton.mouseEnabled = bActive;
        _oButton.x = 0;
        _oButton.y = 0; 
        _oButton.cursor = "pointer";
        _oButton.stop();
        
        _oTextContainer.addChild(_oButton);
        _aButton.push(_oButton);
        
        var oLevelText = new CTLText(s_oStage, 
                    iXPos-50,iYPos-82, 100, 14, 
                    14, "center", "#fff", FONT, 1,
                    0, 0,
                    oCityName,
                    true, true, false,
                    false );

        
        _oRewardText1 = new CTLText(_oTextContainer, 
                    -10,-46, 45, 20, 
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    oCityReward.first+TEXT_CURRENCY,
                    true, true, false,
                    false );
                    

        
        _oRewardText2 = new CTLText(_oTextContainer, 
                    -10,_oRewardText1.getY()+37, 45, 20, 
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    oCityReward.second+TEXT_CURRENCY,
                    true, true, false,
                    false );

        
        _oRewardText3 = new CTLText(_oTextContainer, 
                    -10,_oRewardText1.getY()+73, 45, 20, 
                    20, "left", "#fff", FONT, 1,
                    0, 0,
                    oCityReward.third+TEXT_CURRENCY,
                    true, true, false,
                    false );

        
        this._initListener();
    };
    
    this.scaleText = function(){
        _oTextContainer.scaleY = 0.9;
    };
    
    this.unload = function(){
       _oButton.off("mousedown", this.buttonDown);
       _oButton.off("pressup" , this.buttonRelease);
	   
       s_oStage.removeChild(_oButton);
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.viewBut = function(oButton){
        s_oStage.addChild(oButton);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.ifClickable = function(){
        if(_oButton.mouseEnabled === true){
            return 1;
        }
        return 0;
    };
    
    this.setActive = function(iLevel, bActive){
        _bActive = bActive;
        _aButton[iLevel].gotoAndStop("state_"+_bActive);
        _aButton[iLevel].mouseEnabled = true;
    };
    
    this.buttonRelease = function(){
        _oTextContainer.scaleX = 1;
        _oTextContainer.scaleY = 1;

        playSound("click",1,false);
        
        
        _bActive = !_bActive;
        _oButton.gotoAndStop("state_"+_bActive);

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.buttonDown = function(){
        _oTextContainer.scaleX = 0.9;
        _oTextContainer.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._init(iXPos,iYPos,oSprite,bActive);
}