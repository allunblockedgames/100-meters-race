function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oSelectTeam;
    var _oSelectLevel;
    var _oPlayerProgress;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }else{
            s_iScale = 2;
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
        
    };
    
    this.preloaderReady = function(){
        this._loadImages();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './sounds/',filename:'crowd_cheers',loop:false,volume:1, ingamename: 'crowd_cheers'});
        s_aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './sounds/',filename:'crowd',loop:false,volume:1, ingamename: 'crowd'});
        s_aSoundsInfo.push({path: './sounds/',filename:'start_race',loop:false,volume:1, ingamename: 'start_race'});
        s_aSoundsInfo.push({path: './sounds/',filename:'prepare_runner',loop:false,volume:1, ingamename: 'prepare_runner'});
        s_aSoundsInfo.push({path: './sounds/',filename:'crowd_arrival',loop:false,volume:1, ingamename: 'crowd_arrival'});
        s_aSoundsInfo.push({path: './sounds/',filename:'upgrade',loop:false,volume:1, ingamename: 'upgrade'});
        s_aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        
        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
        
        
    };  
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
        
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                                                            src: [oSoundInfo.path+oSoundInfo.filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: oSoundInfo.loop, 
                                                            volume: oSoundInfo.volume,
                                                            onload: s_oMain.soundLoaded,
                                                            onloaderror: function(szId,szMsg){
                                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                         s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                         break;
                                                                                     }
                                                                                }
                                                                        },
                                                            onplayerror: function(szId) {
                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                          s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                                                                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                                                                            if(s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null){
                                                                                                setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
                                                                                            }

                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
        
        
    };

    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_continue","./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_continue_small","./sprites/but_continue_small.png");
        
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_info","./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        
        s_oSpriteLibrary.addSprite("left_button","./sprites/left_button.png");
        s_oSpriteLibrary.addSprite("right_button","./sprites/right_button.png");
        
        s_oSpriteLibrary.addSprite("but_skip","./sprites/but_skip.png");
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_select_team","./sprites/bg_select_team.jpg");
        s_oSpriteLibrary.addSprite("bg_podium","./sprites/bg_podium.jpg");
        s_oSpriteLibrary.addSprite("bg_select_challenge","./sprites/bg_select_challenge.jpg");
        s_oSpriteLibrary.addSprite("result_panel","./sprites/result_panel.png");
        s_oSpriteLibrary.addSprite("upgrade_panel","./sprites/upgrade_panel.png");
        s_oSpriteLibrary.addSprite("select_challenge","./sprites/select_challenge.png");
        s_oSpriteLibrary.addSprite("are_you_sure_panel","./sprites/are_you_sure_panel.png");
        s_oSpriteLibrary.addSprite("final_score","./sprites/final_score.png");
        s_oSpriteLibrary.addSprite("help_panel","./sprites/help_panel.png");
        
        s_oSpriteLibrary.addSprite("logo_credits","./sprites/logo_credits.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        
        s_oSpriteLibrary.addSprite("level_sprite","./sprites/level_sprite.png");
        
        s_oSpriteLibrary.addSprite("energy_bar","./sprites/energy_bar.png");
        s_oSpriteLibrary.addSprite("health","./sprites/health.png");
        s_oSpriteLibrary.addSprite("horizontal_bar","./sprites/horizontal_bar.png");
        
        s_oSpriteLibrary.addSprite("arrival_panel","./sprites/arrival_panel.png");
        s_oSpriteLibrary.addSprite("select_character","./sprites/select_character.png");
                
        s_oSpriteLibrary.addSprite("bar-1","./sprites/bar-1.png");
        s_oSpriteLibrary.addSprite("bar-2","./sprites/bar-2.png");
                
        s_oSpriteLibrary.addSprite("gold_medal","./sprites/gold_medal.png");
        s_oSpriteLibrary.addSprite("silver_medal","./sprites/silver_medal.png");
        s_oSpriteLibrary.addSprite("bronze_medal","./sprites/bronze_medal.png");
        
        s_oSpriteLibrary.addSprite("arrow_bar","./sprites/arrow_bar.png");
        s_oSpriteLibrary.addSprite("but_yes","./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("bg_credits","./sprites/bg_credits.png");
        s_oSpriteLibrary.addSprite("left_directional_arrows","./sprites/left_directional_arrows.png");
        s_oSpriteLibrary.addSprite("right_directional_arrows","./sprites/right_directional_arrows.png");
        s_oSpriteLibrary.addSprite("time_panel","./sprites/time_panel.png");
        s_oSpriteLibrary.addSprite("podium","./sprites/podium.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        
        for(var i = 0; i < NUM_RUNNERS; i++){
            s_oSpriteLibrary.addSprite("flag_runner_"+i,"./sprites/flag_runner_"+i+".png");
            s_oSpriteLibrary.addSprite("flag_runner_"+i+"_game","./sprites/flag_runner_"+i+"_game.png");
            s_oSpriteLibrary.addSprite("flag_"+i,"./sprites/flag_"+i+".jpg");
            s_oSpriteLibrary.addSprite("runner_"+i,"./sprites/runners/runner_"+i+".png");
            s_oSpriteLibrary.addSprite("runner_"+i+"_pose","./sprites/runners/poses/runner_"+i+"_pose.png");
        }

        
        if(s_bMobile){
            for(var k=0;k<18;k++){
                s_oSpriteLibrary.addSprite("track_"+k,"./sprites/track/redux/track_"+k+".jpg");
            }
        }else{
            for(var k=0;k<18;k++){
                s_oSpriteLibrary.addSprite("track_"+k,"./sprites/track/track_"+k+".jpg");
            }
        }
        

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this._onRemovePreloader = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();
        
        s_oSoundtrack = playSound("soundtrack", 1, true);
        
        this.gotoMenu();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoTeamSelect = function(){
        _oSelectTeam = new CSelectTeam();
        _iState = STATE_MENU;
    };
    
    this.gotoSelectLevel = function(){
        _oSelectLevel = new CLevelMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function( iLevel){
        _oGame = new CGame(_oData, iLevel);   						
        _iState = STATE_GAME;
    };
    
    this.gotoPlayerProgress = function(){
        _oPlayerProgress = new CPlayerProgress();   						
        _iState = STATE_MENU;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }
        
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    s_bAudioActive = oData.audio_enable_on_startup;

    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_bIsIphone = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iLevelReached = 1;
var s_iPlayerMoney = 0;
var s_iSpeedBought = 0;
var s_iEnergyBought = 0;
var s_iSpeedAdder = 0;
var s_iEnergyAdder = 0;
var s_iTeamSelected = 0;
var s_szTeamSelectedSprite = "runner_0";
var s_aRunnersScore = [0, 0, 0, 0, 0, 0, 0, 0];

var s_iScale = 1;
var s_oCityInfos = null;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack = null;
var s_oCanvas;
var s_bFullscreen = false;
var s_bStorageAvailable = true;
var s_aSounds;