function CArrivalPanel(iX,iY,oParentContainer){
    var _pStartPos;
    var _oPositionText;
    var _oNameText;
    var _oLaneText;
    var _oTimeText;
    
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(){
        _pStartPos = {x:iX,y:iY};
        
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('arrival_panel'));
        _oContainer.addChild(oBg);
        
        
        _oPositionText = new CTLText(_oContainer, 
                    10, 6, 50, 15, 
                    15, "left", "#fff", FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );

        
        _oNameText = new CTLText(_oContainer, 
                    10, 24, 120, 12, 
                    12, "left", "#fff", FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );
                    

        
        _oLaneText = new CTLText(_oContainer, 
                    150, 6, 80, 15, 
                    15, "right", "#fff", FONT, 1,
                    0, 0,
                    TEXT_LANE+": ",
                    true, true, false,
                    false );
                    

        
        _oTimeText = new CTLText(_oContainer, 
                    150, 24, 80, 15, 
                    15, "right", "#fff", FONT, 1,
                    0, 0,
                    " ",
                    true, true, false,
                    false );


    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(_oContainer.visible){
            _oContainer.x = _pStartPos.x-iNewX;
            _oContainer.y = _pStartPos.y+iNewY;
        }
    };
    
    this.show = function(iXToArrive,oInfos,iPosition){
        var szPosition = "";
        switch(iPosition){
            case 1:
                szPosition = iPosition+"st";
                break;
            case 2:
                szPosition = iPosition+"nd";
                break;
            case 3:
                szPosition = iPosition+"rd";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                szPosition = iPosition+"th";
                break;
                
        }
        
        var iLane = oInfos.lane+1;
        var szName = oInfos.name;
        var iArrivalTime = oInfos.time;

        _oPositionText.refreshText(szPosition);
        _oLaneText.refreshText(TEXT_LANE+": "+iLane);
        _oNameText.refreshText(szName);
        _oTimeText.refreshText(iArrivalTime);
        
        _oContainer.visible = true;
        createjs.Tween.get(_oContainer).to({x: iXToArrive }, 100, createjs.Ease.quadInOut).call(function(){_pStartPos = {x:_oContainer.x,y:_oContainer.y};});
    };
    
    this.hide = function(iX){
        createjs.Tween.get(_oContainer).to({x: iX }, 300, createjs.Ease.quadInOut).call(function() {_oContainer.visible = false;});
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    _oParentContainer = oParentContainer;
    
    this._init();
}