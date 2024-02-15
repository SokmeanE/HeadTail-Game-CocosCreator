"use strict";
cc._RF.push(module, '13083GNkidPGKwNyQ7/tHRL', 'mainGame');
// Scripts/mainGame.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerName = null;
        _this.showAttempt = null;
        _this.attempt = null;
        _this.grey = null;
        _this.gold = null;
        _this.choiceBtn = null;
        _this.randomResult = null;
        _this.winText = null;
        _this.loseText = null;
        _this.spinAgainBtn = null;
        _this.spinFeather = null;
        _this.greyCheck = null;
        _this.goldCheck = null;
        _this.score = null;
        _this.playerScore = 0;
        _this.choice = '';
        _this.randomChoice = ' ';
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        //get player name
        this.getPlayerName();
        //hide win and lose, spinAgain 
        this.winText.active = false;
        this.loseText.active = false;
        this.spinAgainBtn.active = false;
        //set value to attempt and score
        this.attempt = 10;
        this.playerScore = 0;
        //go botton can't click unit the gold/grey has been selected
        this.choiceBtn.getComponent(cc.Button).interactable = false;
    };
    NewClass.prototype.getPlayerName = function () {
        //get player name from localstorage which pass from the previous scene
        this.playerName.string = cc.sys.localStorage.getItem('player').toString();
    };
    NewClass.prototype.greyBtn = function () {
        //if click set choice to grey
        this.choice = "Grey";
        console.log('on', this.choice);
        //check remark
        this.greyCheck.active = true;
        //interactable button
        this.grey.getComponent(cc.Button).interactable = false;
        this.gold.getComponent(cc.Button).interactable = false;
        this.choiceBtn.getComponent(cc.Button).interactable = true;
    };
    NewClass.prototype.goldBtn = function () {
        //if click set choice to gold
        this.choice = "Gold";
        console.log('off', this.choice);
        //check remark
        this.goldCheck.active = true;
        //interactable button
        this.gold.getComponent(cc.Button).interactable = false;
        this.grey.getComponent(cc.Button).interactable = false;
        this.choiceBtn.getComponent(cc.Button).interactable = true;
    };
    NewClass.prototype.goBtn = function () {
        var _this = this;
        //onclick play aniamtion
        this.playAnimation();
        // check attempt
        if (this.attempt == 0) {
            this.storeScore();
            setTimeout(function () {
                _this.newScene();
            }, 6500);
        }
        this.choiceBtn.getComponent(cc.Button).interactable = false;
    };
    NewClass.prototype.playAnimation = function () {
        //new logic
        var result = Math.random();
        if (result >= 0.5) {
            this.randomChoice = "Gold";
        }
        else {
            this.randomChoice = "Grey";
        }
        //play animation
        var anim = this.spinFeather.getComponent(cc.Animation);
        anim.play();
        var randomGold = (Math.random() * (250 - 180) + 180);
        var randomGrey = Math.random() * (120 - 60) + 60;
        //pause animation
        if (this.randomChoice == "Gold") {
            console.log('gold anim');
            setTimeout(function () {
                anim.stop();
            }, randomGold + 5000);
        }
        else {
            console.log('grey anim');
            setTimeout(function () {
                anim.stop();
            }, randomGrey + 5000);
        }
        this.compareChoice(this.choice);
    };
    NewClass.prototype.compareChoice = function (choice) {
        var _this = this;
        //compare choice to computer
        if (this.randomChoice == this.choice) {
            //set a delay then do 1 & 2
            setTimeout(function () {
                //1. show win and spin 
                _this.winText.active = true;
                if (_this.attempt > 0) {
                    _this.spinAgainBtn.active = true;
                }
                //2. add score
                _this.gainScore();
            }, 5100);
        }
        else {
            setTimeout(function () {
                _this.loseText.active = true;
                if (_this.attempt > 0) {
                    _this.spinAgainBtn.active = true;
                }
            }, 5100);
        }
        //decrease the attempt 
        this.attempt -= 1;
        this.showAttempt.string = "Attempt: " + this.attempt.toString();
    };
    //add score
    NewClass.prototype.gainScore = function () {
        this.playerScore += 1;
        this.score.string = "Score: " + this.playerScore.toString();
    };
    NewClass.prototype.spinAgain = function () {
        //diable check remark
        this.greyCheck.active = false;
        this.goldCheck.active = false;
        //hide the win, lose and spin button
        this.winText.active = false;
        this.loseText.active = false;
        this.spinAgainBtn.active = false;
        //enabel button
        this.grey.getComponent(cc.Button).interactable = true;
        this.gold.getComponent(cc.Button).interactable = true;
    };
    //store score
    NewClass.prototype.storeScore = function () {
        cc.sys.localStorage.setItem('playerScore', this.playerScore);
    };
    NewClass.prototype.newScene = function () {
        cc.director.loadScene('final');
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "playerName", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "showAttempt", void 0);
    __decorate([
        property
    ], NewClass.prototype, "attempt", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "grey", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gold", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "choiceBtn", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "winText", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "loseText", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "spinAgainBtn", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "spinFeather", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "greyCheck", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "goldCheck", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "score", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();