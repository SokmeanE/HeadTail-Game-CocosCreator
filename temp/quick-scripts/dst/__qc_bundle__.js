
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Scripts/PrefabForResult');
require('./assets/Scripts/mainGame');
require('./assets/Scripts/result');
require('./assets/Scripts/startGame');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/mainGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        _this.grey = null;
        _this.gold = null;
        _this.choiceBtn = null;
        _this.winLosePrefab = null;
        _this.winLoseNode = null;
        _this.spinAgainBtn = null;
        _this.spinFeather = null;
        _this.isSpeedUp = null;
        _this.speedText = null;
        _this.checkMarkPrefab = null;
        _this.checkMark = null;
        _this.score = null;
        _this.playerScore = null;
        _this.attempt = null;
        _this.choice = '';
        _this.randomChoice = '';
        _this.randomGold = 0;
        _this.randomGrey = 0;
        _this.results = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        //get player name
        this.getPlayerName();
        this.playerScore = 100;
        this.score.string = "Score: " + this.playerScore.toString();
        //hide spinAgain 
        this.spinAgainBtn.active = false;
        //set value to attempt
        this.attempt = 7;
        //instance prefab
        this.checkMark = cc.instantiate(this.checkMarkPrefab);
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
        //check remark
        this.node.addChild(this.checkMark);
        this.checkMark.setPosition(-220, -200, 0);
        //interactable button
        this.grey.getComponent(cc.Button).interactable = false;
        this.gold.getComponent(cc.Button).interactable = false;
        this.choiceBtn.getComponent(cc.Button).interactable = true;
    };
    NewClass.prototype.goldBtn = function () {
        //if click set choice to gold
        this.choice = "Gold";
        //check remark
        this.node.addChild(this.checkMark);
        this.checkMark.setPosition(360, -215, 0);
        this.checkMark.angle = -10;
        //interactable button
        this.gold.getComponent(cc.Button).interactable = false;
        this.grey.getComponent(cc.Button).interactable = false;
        this.choiceBtn.getComponent(cc.Button).interactable = true;
    };
    NewClass.prototype.goBtn = function () {
        var _this = this;
        this.node.removeChild(this.checkMark);
        //deduction 10 for play
        this.attempt -= 1;
        this.showAttempt.string = "Attempt: " + this.attempt.toString();
        this.deduction();
        //onclick play aniamtion
        this.playAnimation();
        // check attempt
        if (this.attempt == 0) {
            this.storeRes();
            setTimeout(function () {
                _this.newScene();
            }, (this.isSpeedUp.isChecked == true) ? 3000 : 5500);
        }
        this.choiceBtn.getComponent(cc.Button).interactable = false;
    };
    NewClass.prototype.playAnimation = function () {
        //new logic
        console.log('play animation');
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
        if (this.isSpeedUp.isChecked == false) {
            //normal speed
            this.randomGold = (Math.random() * (250 - 180) + 180);
            this.randomGrey = (Math.random() * (120 - 60) + 60);
            anim.getAnimationState('featherAnim').speed = 1;
            if (this.randomChoice == "Gold") {
                setTimeout(function () {
                    anim.stop();
                }, this.randomGold + 5000);
            }
            else {
                setTimeout(function () {
                    anim.stop();
                }, this.randomGrey + 5000);
            }
        }
        else {
            //speedup
            anim.getAnimationState('featherAnim').speed = 2;
            this.randomGold = (Math.random() * (125 - 90) + 90) + 2500;
            this.randomGrey = (Math.random() * (60 - 30) + 30) + 2500;
            if (this.randomChoice == "Gold") {
                setTimeout(function () {
                    anim.stop();
                }, this.randomGold);
            }
            else {
                setTimeout(function () {
                    anim.stop();
                }, this.randomGrey);
            }
        }
        this.compareChoice(this.choice);
    };
    NewClass.prototype.compareChoice = function (choice) {
        var _this = this;
        this.winLose();
        var winLostLabel = this.winLoseNode.getComponent(cc.Label);
        //compare choice to computer
        if (this.randomChoice == choice) {
            //push result to array
            this.results.push({ result: this.randomChoice, player: this.choice, score: 10 });
            //set a delay then do 1 & 2
            setTimeout(function () {
                //1. show win and spin 
                winLostLabel.string = "You Win";
                if (_this.playerScore > 0) {
                    _this.spinAgainBtn.active = true;
                }
                //2. add score
                _this.gainScore();
            }, (this.isSpeedUp.isChecked == true) ? 2600 : 5100);
        }
        else {
            //result to array
            this.results.push({ result: this.randomChoice, player: this.choice, score: -10 });
            setTimeout(function () {
                winLostLabel.string = "You Lose";
                if (_this.playerScore > 0) {
                    _this.spinAgainBtn.active = true;
                }
            }, (this.isSpeedUp.isChecked == true) ? 2600 : 5100);
        }
    };
    //display win or lost
    NewClass.prototype.winLose = function () {
        this.winLoseNode = cc.instantiate(this.winLosePrefab);
        this.winLoseNode.setPosition(0, 160, -1);
        this.node.addChild(this.winLoseNode);
    };
    //add score
    NewClass.prototype.gainScore = function () {
        this.playerScore += 20;
        this.score.string = "Score: " + this.playerScore.toString();
    };
    //deduct score 
    NewClass.prototype.deduction = function () {
        this.playerScore -= 10;
        this.score.string = "Score: " + this.playerScore.toString();
    };
    //spinAgain Button
    NewClass.prototype.spinAgain = function () {
        //hide the win, lose and spin button
        this.node.removeChild(this.winLoseNode);
        this.spinAgainBtn.active = false;
        //enabel button
        this.grey.getComponent(cc.Button).interactable = true;
        this.gold.getComponent(cc.Button).interactable = true;
    };
    //store score
    NewClass.prototype.storeRes = function () {
        cc.sys.localStorage.setItem('playerScore', this.playerScore);
        console.log('com arrrr: ', this.playerScore);
    };
    NewClass.prototype.newScene = function () {
        var _this = this;
        cc.sys.localStorage.setItem('results', JSON.stringify(this.results));
        cc.director.loadScene('final'), function () {
            return cc.game.emit('resultData', _this.results);
        };
        console.log('emit final', this.results);
    };
    NewClass.prototype.nextScene = function () {
        this.newScene();
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "playerName", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "showAttempt", void 0);
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
        property(cc.Prefab)
    ], NewClass.prototype, "winLosePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "spinAgainBtn", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "spinFeather", void 0);
    __decorate([
        property(cc.Toggle)
    ], NewClass.prototype, "isSpeedUp", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "speedText", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "checkMarkPrefab", void 0);
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL21haW5HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBbVFDO1FBaFFHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUNsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsYUFBTyxHQUFXLElBQUksQ0FBQztRQUN2QixZQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGFBQU8sR0FBVSxFQUFFLENBQUM7O0lBc054QixDQUFDO0lBbk5HLHdCQUF3QjtJQUV4Qix5QkFBTSxHQUFOO1FBQ0ksaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1RCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWpDLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUVqQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUd0RCw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFFaEUsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFRCwwQkFBTyxHQUFQO1FBQ0ksNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFMUMscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQy9ELENBQUM7SUFFRCwwQkFBTyxHQUFQO1FBQ0ksNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLGNBQWM7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBRzNCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMvRCxDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUFBLGlCQW9CQztRQW5CRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBR3JCLGdCQUFnQjtRQUNaLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNoRSxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUVJLFdBQVc7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsV0FBVztRQUNYLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFHLE1BQU0sSUFBSSxHQUFHLEVBQUM7WUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztTQUM5QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7U0FDOUI7UUFFRCxnQkFBZ0I7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksS0FBSyxFQUFDO1lBQ2xDLGNBQWM7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFaEQsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sRUFBQztnQkFDM0IsVUFBVSxDQUFDO29CQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDO29CQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUM5QjtTQUVIO2FBQU07WUFDSixTQUFTO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFFMUQsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sRUFBQztnQkFDM0IsVUFBVSxDQUFDO29CQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxVQUFVLENBQUM7b0JBQ1AsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUNmLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkI7U0FDSDtRQUdGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFHRCxnQ0FBYSxHQUFiLFVBQWMsTUFBYztRQUE1QixpQkE2QkM7UUE1QkcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNELDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksTUFBTSxFQUFFO1lBQzdCLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLDJCQUEyQjtZQUMzQixVQUFVLENBQUM7Z0JBQ1AsdUJBQXVCO2dCQUN2QixZQUFZLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDaEMsSUFBRyxLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBQztvQkFDcEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUNuQztnQkFDRCxjQUFjO2dCQUNkLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUV4RDthQUFNO1lBQ0gsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRixVQUFVLENBQUM7Z0JBQ1AsWUFBWSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7Z0JBQ2pDLElBQUcsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUM7b0JBQ3BCLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztpQkFDbkM7WUFDTCxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4RDtJQUVMLENBQUM7SUFFRCxxQkFBcUI7SUFDckIsMEJBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsV0FBVztJQUNYLDRCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZUFBZTtJQUNmLDRCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRUQsa0JBQWtCO0lBQ2xCLDRCQUFTLEdBQVQ7UUFDSSxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVqQyxlQUFlO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDMUQsQ0FBQztJQUVELGFBQWE7SUFDYiwyQkFBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCwyQkFBUSxHQUFSO1FBQUEsaUJBTUM7UUFMRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsT0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQztRQUF4QyxDQUF3QyxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoRCxDQUFDO0lBRUQsNEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBL1BEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNZO0lBSWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDYztJQUlsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNJO0lBdENOLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FtUTVCO0lBQUQsZUFBQztDQW5RRCxBQW1RQyxDQW5RcUMsRUFBRSxDQUFDLFNBQVMsR0FtUWpEO2tCQW5Rb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGxheWVyTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNob3dBdHRlbXB0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncmV5OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdvbGQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hvaWNlQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgd2luTG9zZVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICB3aW5Mb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzcGluQWdhaW5CdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3BpbkZlYXRoZXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZSlcbiAgICBpc1NwZWVkVXA6IGNjLlRvZ2dsZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3BlZWRUZXh0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGNoZWNrTWFya1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBjaGVja01hcms6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNjb3JlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgcGxheWVyU2NvcmU6IG51bWJlciA9IG51bGw7XG4gICAgYXR0ZW1wdDogbnVtYmVyID0gbnVsbDtcbiAgICBjaG9pY2U6IHN0cmluZyA9ICcnO1xuICAgIHJhbmRvbUNob2ljZTogc3RyaW5nID0gJyc7XG4gICAgcmFuZG9tR29sZDogbnVtYmVyID0gMDtcbiAgICByYW5kb21HcmV5OiBudW1iZXIgPSAwO1xuICAgIHJlc3VsdHM6IGFueVtdID0gW107XG4gICAgXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy9nZXQgcGxheWVyIG5hbWVcbiAgICAgICAgdGhpcy5nZXRQbGF5ZXJOYW1lKCk7XG4gICAgICAgIHRoaXMucGxheWVyU2NvcmUgPSAxMDA7XG4gICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnBsYXllclNjb3JlLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgLy9oaWRlIHNwaW5BZ2FpbiBcbiAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zZXQgdmFsdWUgdG8gYXR0ZW1wdFxuICAgICAgICB0aGlzLmF0dGVtcHQgPSA3O1xuXG4gICAgICAgIC8vaW5zdGFuY2UgcHJlZmFiXG4gICAgICAgIHRoaXMuY2hlY2tNYXJrID0gY2MuaW5zdGFudGlhdGUodGhpcy5jaGVja01hcmtQcmVmYWIpO1xuICAgICAgICBcblxuICAgICAgICAvL2dvIGJvdHRvbiBjYW4ndCBjbGljayB1bml0IHRoZSBnb2xkL2dyZXkgaGFzIGJlZW4gc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBnZXRQbGF5ZXJOYW1lKCkge1xuICAgICAgICAvL2dldCBwbGF5ZXIgbmFtZSBmcm9tIGxvY2Fsc3RvcmFnZSB3aGljaCBwYXNzIGZyb20gdGhlIHByZXZpb3VzIHNjZW5lXG4gICAgICAgIHRoaXMucGxheWVyTmFtZS5zdHJpbmcgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXllcicpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgZ3JleUJ0bigpIHtcbiAgICAgICAgLy9pZiBjbGljayBzZXQgY2hvaWNlIHRvIGdyZXlcbiAgICAgICAgdGhpcy5jaG9pY2UgPSBcIkdyZXlcIjtcblxuICAgICAgICAvL2NoZWNrIHJlbWFya1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5jaGVja01hcmspO1xuICAgICAgICB0aGlzLmNoZWNrTWFyay5zZXRQb3NpdGlvbigtMjIwLCAtMjAwLCAwKTsgXG5cbiAgICAgICAgLy9pbnRlcmFjdGFibGUgYnV0dG9uXG4gICAgICAgIHRoaXMuZ3JleS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nb2xkLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGdvbGRCdG4oKSB7XG4gICAgICAgIC8vaWYgY2xpY2sgc2V0IGNob2ljZSB0byBnb2xkXG4gICAgICAgIHRoaXMuY2hvaWNlID0gXCJHb2xkXCI7XG5cbiAgICAgICAgLy9jaGVjayByZW1hcmtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuY2hlY2tNYXJrKTtcbiAgICAgICAgdGhpcy5jaGVja01hcmsuc2V0UG9zaXRpb24oMzYwLCAtMjE1LCAwKTsgXG4gICAgICAgIHRoaXMuY2hlY2tNYXJrLmFuZ2xlID0gLTEwO1xuXG5cbiAgICAgICAgLy9pbnRlcmFjdGFibGUgYnV0dG9uXG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmV5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGdvQnRuKCkge1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jaGVja01hcmspO1xuXG4gICAgICAgIC8vZGVkdWN0aW9uIDEwIGZvciBwbGF5XG4gICAgICAgIHRoaXMuYXR0ZW1wdCAtPSAxO1xuICAgICAgICB0aGlzLnNob3dBdHRlbXB0LnN0cmluZyA9IFwiQXR0ZW1wdDogXCIgKyB0aGlzLmF0dGVtcHQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5kZWR1Y3Rpb24oKTtcblxuICAgICAgICAvL29uY2xpY2sgcGxheSBhbmlhbXRpb25cbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy8gY2hlY2sgYXR0ZW1wdFxuICAgICAgICAgICAgaWYodGhpcy5hdHRlbXB0ID09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVSZXMoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubmV3U2NlbmUoKTsgIFxuICAgICAgICAgICAgfSwgKHRoaXMuaXNTcGVlZFVwLmlzQ2hlY2tlZCA9PSB0cnVlKSA/IDMwMDAgOiA1NTAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwbGF5QW5pbWF0aW9uKCkge1xuXG4gICAgICAgIC8vbmV3IGxvZ2ljXG4gICAgICAgIGNvbnNvbGUubG9nKCdwbGF5IGFuaW1hdGlvbicpO1xuICAgICAgICAvL25ldyBsb2dpY1xuICAgICAgICBsZXQgcmVzdWx0ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgaWYocmVzdWx0ID49IDAuNSl7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUNob2ljZSA9IFwiR29sZFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yYW5kb21DaG9pY2UgPSBcIkdyZXlcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcGxheSBhbmltYXRpb25cbiAgICAgICAgdmFyIGFuaW0gPSB0aGlzLnNwaW5GZWF0aGVyLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICBhbmltLnBsYXkoKTtcbiAgICAgICAgIGlmICh0aGlzLmlzU3BlZWRVcC5pc0NoZWNrZWQgPT0gZmFsc2Upe1xuICAgICAgICAgICAgIC8vbm9ybWFsIHNwZWVkXG4gICAgICAgICAgICB0aGlzLnJhbmRvbUdvbGQgPSAoTWF0aC5yYW5kb20oKSAqICgyNTAgLSAxODApICsgMTgwKTtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tR3JleSA9IChNYXRoLnJhbmRvbSgpICogKDEyMCAtIDYwKSArIDYwKTtcbiAgICAgICAgICAgIGFuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ2ZlYXRoZXJBbmltJykuc3BlZWQgPSAxO1xuXG4gICAgICAgICAgICBpZih0aGlzLnJhbmRvbUNob2ljZSA9PSBcIkdvbGRcIil7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW0uc3RvcCgpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMucmFuZG9tR29sZCArIDUwMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5zdG9wKClcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdyZXkgKyA1MDAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vc3BlZWR1cFxuICAgICAgICAgICAgYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnZmVhdGhlckFuaW0nKS5zcGVlZCA9IDI7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUdvbGQgPSAoTWF0aC5yYW5kb20oKSAqICgxMjUgLSA5MCkgKyA5MCkgKyAyNTAwO1xuICAgICAgICAgICAgdGhpcy5yYW5kb21HcmV5ID0gKE1hdGgucmFuZG9tKCkgKiAoNjAgLSAzMCkgKyAzMCkgKyAyNTAwO1xuXG4gICAgICAgICAgICBpZih0aGlzLnJhbmRvbUNob2ljZSA9PSBcIkdvbGRcIil7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW0uc3RvcCgpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMucmFuZG9tR29sZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltLnN0b3AoKVxuICAgICAgICAgICAgICAgIH0sIHRoaXMucmFuZG9tR3JleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wYXJlQ2hvaWNlKHRoaXMuY2hvaWNlKTtcbiAgICB9XG5cblxuICAgIGNvbXBhcmVDaG9pY2UoY2hvaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy53aW5Mb3NlKCk7XG4gICAgICAgIGxldCB3aW5Mb3N0TGFiZWwgPSB0aGlzLndpbkxvc2VOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIC8vY29tcGFyZSBjaG9pY2UgdG8gY29tcHV0ZXJcbiAgICAgICAgaWYgKHRoaXMucmFuZG9tQ2hvaWNlID09IGNob2ljZSkge1xuICAgICAgICAgICAgLy9wdXNoIHJlc3VsdCB0byBhcnJheVxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzLnB1c2goeyByZXN1bHQ6IHRoaXMucmFuZG9tQ2hvaWNlLCBwbGF5ZXI6IHRoaXMuY2hvaWNlLCBzY29yZTogMTAgfSk7XG4gICAgICAgICAgICAvL3NldCBhIGRlbGF5IHRoZW4gZG8gMSAmIDJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vMS4gc2hvdyB3aW4gYW5kIHNwaW4gXG4gICAgICAgICAgICAgICAgd2luTG9zdExhYmVsLnN0cmluZyA9IFwiWW91IFdpblwiO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheWVyU2NvcmUgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8yLiBhZGQgc2NvcmVcbiAgICAgICAgICAgICAgICB0aGlzLmdhaW5TY29yZSgpO1xuICAgICAgICAgICAgfSwgKHRoaXMuaXNTcGVlZFVwLmlzQ2hlY2tlZCA9PSB0cnVlKSA/IDI2MDAgOiA1MTAwKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9yZXN1bHQgdG8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cy5wdXNoKHsgcmVzdWx0OiB0aGlzLnJhbmRvbUNob2ljZSwgcGxheWVyOiB0aGlzLmNob2ljZSwgc2NvcmU6IC0xMCB9KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdpbkxvc3RMYWJlbC5zdHJpbmcgPSBcIllvdSBMb3NlXCI7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXJTY29yZSA+IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5BZ2FpbkJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICh0aGlzLmlzU3BlZWRVcC5pc0NoZWNrZWQgPT0gdHJ1ZSkgPyAyNjAwIDogNTEwMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy9kaXNwbGF5IHdpbiBvciBsb3N0XG4gICAgd2luTG9zZSgpe1xuICAgICAgICB0aGlzLndpbkxvc2VOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy53aW5Mb3NlUHJlZmFiKTtcbiAgICAgICAgdGhpcy53aW5Mb3NlTm9kZS5zZXRQb3NpdGlvbigwLDE2MCwtMSk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0aGlzLndpbkxvc2VOb2RlKTtcbiAgICB9XG5cbiAgICAvL2FkZCBzY29yZVxuICAgIGdhaW5TY29yZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZSArPSAyMDtcbiAgICAgICAgdGhpcy5zY29yZS5zdHJpbmcgPSBcIlNjb3JlOiBcIiArIHRoaXMucGxheWVyU2NvcmUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2RlZHVjdCBzY29yZSBcbiAgICBkZWR1Y3Rpb24oKXtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZSAtPSAxMDtcbiAgICAgICAgdGhpcy5zY29yZS5zdHJpbmcgPSBcIlNjb3JlOiBcIiArIHRoaXMucGxheWVyU2NvcmUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL3NwaW5BZ2FpbiBCdXR0b25cbiAgICBzcGluQWdhaW4oKSB7XG4gICAgICAgIC8vaGlkZSB0aGUgd2luLCBsb3NlIGFuZCBzcGluIGJ1dHRvblxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy53aW5Mb3NlTm9kZSk7XG4gICAgICAgIHRoaXMuc3BpbkFnYWluQnRuLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vZW5hYmVsIGJ1dHRvblxuICAgICAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5nb2xkLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9zdG9yZSBzY29yZVxuICAgIHN0b3JlUmVzKCkge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXllclNjb3JlJywgdGhpcy5wbGF5ZXJTY29yZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb20gYXJycnI6ICcsIHRoaXMucGxheWVyU2NvcmUpO1xuICAgIH1cblxuICAgIG5ld1NjZW5lKCl7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVzdWx0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMucmVzdWx0cykpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2ZpbmFsJyksICgpID0+IFxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KCdyZXN1bHREYXRhJywgdGhpcy5yZXN1bHRzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlbWl0IGZpbmFsJywgdGhpcy5yZXN1bHRzKTtcblxuICAgIH1cblxuICAgIG5leHRTY2VuZSgpe1xuICAgICAgICB0aGlzLm5ld1NjZW5lKCk7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/result.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f987fJaJihPdoIYPCYMt/yc', 'result');
// Scripts/result.ts

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
var PrefabForResult_1 = require("./PrefabForResult");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.totalScore = null;
        _this.score = null;
        _this.result = null;
        _this.replayBtn = null;
        _this.resultPrefab = null;
        _this.summaryTableNode = null;
        _this.spriteNodeG = null;
        _this.spriteNodeR = null;
        _this.res = null;
        _this.resultFinal = [];
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.player.string = "Player: " + cc.sys.localStorage.getItem('player');
        this.score = cc.sys.localStorage.getItem('playerScore');
        //get result array from mainGame
        var strngArr = cc.sys.localStorage.getItem('results');
        this.resultFinal = JSON.parse(strngArr);
        this.totalScore.string = "Score: " + this.score.toString();
        if (this.score >= 200) {
            this.result.string = "Expert";
        }
        else {
            this.result.string = "Failed";
        }
        this.setResult(this.resultFinal);
    };
    NewClass.prototype.setResult = function (results) {
        var _this = this;
        // Clear existing items in the summary table
        console.log(results, 'table');
        //to show last 5 index
        var totalResults = results.length;
        var startIndex = totalResults >= 5 ? totalResults - 5 : 0;
        // Set spacing between items (adjust as needed)
        var spacingX = 100;
        var spacingY = 100;
        var col = -2.5;
        results.slice(startIndex).forEach(function (result, index) {
            // Instantiate the prefab
            var resultItem = cc.instantiate(_this.resultPrefab);
            resultItem.x = 0;
            console.log(resultItem.x, 'x position');
            // Call the updateResult method to set the result details
            _this.showTable(resultItem, result);
            // this.getComponent('result').showTable(resultItem, result);
            var row = Math.floor(index / 5);
            col += 1;
            // Set the position of the resultItem
            resultItem.setPosition(col * (resultItem.width + spacingX), -row * (resultItem.height + spacingY));
        });
    };
    NewClass.prototype.showTable = function (resultItem, result) {
        //set value of prefab children
        var spriteResult = resultItem.getChildByName('Result').getComponent(cc.Sprite);
        var spritePlayer = resultItem.getChildByName('player').getComponent(cc.Sprite);
        var labelScore = resultItem.getChildByName('Score').getComponent(cc.Label);
        //get component from prefab script
        var sprite = resultItem.getComponent(PrefabForResult_1.default);
        // check res sprite
        if (result.result == "Gold") {
            spriteResult.spriteFrame = sprite.goldSprite;
        }
        else if (result.result == "Grey") {
            spriteResult.spriteFrame = sprite.greySprite;
        }
        // check player sprite
        if (result.player == "Gold") {
            spritePlayer.spriteFrame = sprite.goldSprite;
        }
        else if (result.player == "Grey") {
            spritePlayer.spriteFrame = sprite.greySprite;
        }
        labelScore.string = result.score.toString();
        // Add the instantiated item to the summary table
        this.summaryTableNode.removeChild(resultItem);
        this.summaryTableNode.addChild(resultItem);
    };
    NewClass.prototype.replayButton = function () {
        cc.director.loadScene('game');
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "totalScore", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "result", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "replayBtn", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "resultPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "summaryTableNode", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUFrSEM7UUEvR0csWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBR3JCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUNuQyxTQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLGlCQUFXLEdBQVUsRUFBRSxDQUFDOztJQTJGNUIsQ0FBQztJQXhGRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4RCxnQ0FBZ0M7UUFDaEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMs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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZWZhYkZvclJlc3VsdCBmcm9tIFwiLi9QcmVmYWJGb3JSZXN1bHRcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGxheWVyOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdG90YWxTY29yZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIHNjb3JlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHJlc3VsdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICByZXBsYXlCdG46IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHJlc3VsdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN1bW1hcnlUYWJsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHNwcml0ZU5vZGVHOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgc3ByaXRlTm9kZVI6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICByZXM6IHN0cmluZyA9IG51bGw7XG4gICAgcmVzdWx0RmluYWw6IGFueVtdID0gW107XG5cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnN0cmluZyA9IFwiUGxheWVyOiBcIiArIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVyJyk7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXllclNjb3JlJyk7XG5cbiAgICAgICAgLy9nZXQgcmVzdWx0IGFycmF5IGZyb20gbWFpbkdhbWVcbiAgICAgICAgbGV0IHN0cm5nQXJyID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXN1bHRzJyk7XG4gICAgICAgIHRoaXMucmVzdWx0RmluYWwgPSBKU09OLnBhcnNlKHN0cm5nQXJyKTtcblxuICAgICAgICB0aGlzLnRvdGFsU2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKHRoaXMuc2NvcmUgPj0gMjAwKXtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LnN0cmluZyA9IFwiRXhwZXJ0XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIkZhaWxlZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRSZXN1bHQodGhpcy5yZXN1bHRGaW5hbCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNldFJlc3VsdChyZXN1bHRzOiB7IHJlc3VsdDogc3RyaW5nLCBwbGF5ZXI6IHN0cmluZywgc2NvcmU6IG51bWJlciB9W10pIHtcbiAgICAgICAgLy8gQ2xlYXIgZXhpc3RpbmcgaXRlbXMgaW4gdGhlIHN1bW1hcnkgdGFibGVcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0cywgJ3RhYmxlJyk7XG4gICAgICAgIFxuICAgICAgICAvL3RvIHNob3cgbGFzdCA1IGluZGV4XG4gICAgICAgIGxldCB0b3RhbFJlc3VsdHMgPSByZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSB0b3RhbFJlc3VsdHMgPj0gNSA/IHRvdGFsUmVzdWx0cyAtIDUgOiAwO1xuXG4gICAgICAgIC8vIFNldCBzcGFjaW5nIGJldHdlZW4gaXRlbXMgKGFkanVzdCBhcyBuZWVkZWQpXG4gICAgICAgIGxldCBzcGFjaW5nWCA9IDEwMDtcbiAgICAgICAgbGV0IHNwYWNpbmdZID0gMTAwO1xuICAgICAgICBsZXQgIGNvbCA9IC0yLjVcbiAgICAgICAgcmVzdWx0cy5zbGljZShzdGFydEluZGV4KS5mb3JFYWNoKChyZXN1bHQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyBJbnN0YW50aWF0ZSB0aGUgcHJlZmFiXG4gICAgICAgICAgICBsZXQgcmVzdWx0SXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucmVzdWx0UHJlZmFiKTtcbiAgICAgICAgICAgIHJlc3VsdEl0ZW0ueCA9IDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRJdGVtLngsICd4IHBvc2l0aW9uJyk7XG4gICAgICAgICAgICAvLyBDYWxsIHRoZSB1cGRhdGVSZXN1bHQgbWV0aG9kIHRvIHNldCB0aGUgcmVzdWx0IGRldGFpbHNcblxuICAgICAgICAgICAgdGhpcy5zaG93VGFibGUocmVzdWx0SXRlbSwgcmVzdWx0KTtcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0Q29tcG9uZW50KCdyZXN1bHQnKS5zaG93VGFibGUocmVzdWx0SXRlbSwgcmVzdWx0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoaW5kZXggLyA1KTsgIFxuICAgICAgICAgICAgY29sICs9IDE7IFxuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZXN1bHRJdGVtXG4gICAgICAgICAgICByZXN1bHRJdGVtLnNldFBvc2l0aW9uKGNvbCAqIChyZXN1bHRJdGVtLndpZHRoICsgc3BhY2luZ1gpLCAtcm93ICogKHJlc3VsdEl0ZW0uaGVpZ2h0ICsgc3BhY2luZ1kpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNob3dUYWJsZShyZXN1bHRJdGVtOiBjYy5Ob2RlLCByZXN1bHQ6IHsgcmVzdWx0OiBzdHJpbmcsIHBsYXllcjogc3RyaW5nLCBzY29yZTogbnVtYmVyIH0pe1xuICAgICAgICBcbiAgICAgICAgLy9zZXQgdmFsdWUgb2YgcHJlZmFiIGNoaWxkcmVuXG4gICAgICAgIGxldCBzcHJpdGVSZXN1bHQgPSByZXN1bHRJdGVtLmdldENoaWxkQnlOYW1lKCdSZXN1bHQnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHNwcml0ZVBsYXllciA9IHJlc3VsdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3BsYXllcicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgbGFiZWxTY29yZSA9IHJlc3VsdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ1Njb3JlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcblxuICAgICAgICAvL2dldCBjb21wb25lbnQgZnJvbSBwcmVmYWIgc2NyaXB0XG4gICAgICAgIGxldCBzcHJpdGUgPSByZXN1bHRJdGVtLmdldENvbXBvbmVudChQcmVmYWJGb3JSZXN1bHQpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIGNoZWNrIHJlcyBzcHJpdGVcbiAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT0gXCJHb2xkXCIpIHtcbiAgICAgICAgICAgIHNwcml0ZVJlc3VsdC5zcHJpdGVGcmFtZSA9IHNwcml0ZS5nb2xkU3ByaXRlO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT0gXCJHcmV5XCIpe1xuICAgICAgICAgICAgc3ByaXRlUmVzdWx0LnNwcml0ZUZyYW1lID0gc3ByaXRlLmdyZXlTcHJpdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBwbGF5ZXIgc3ByaXRlXG4gICAgICAgIGlmIChyZXN1bHQucGxheWVyID09IFwiR29sZFwiKSB7XG4gICAgICAgICAgICBzcHJpdGVQbGF5ZXIuc3ByaXRlRnJhbWUgPSBzcHJpdGUuZ29sZFNwcml0ZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucGxheWVyID09IFwiR3JleVwiKXtcbiAgICAgICAgICAgIHNwcml0ZVBsYXllci5zcHJpdGVGcmFtZSA9IHNwcml0ZS5ncmV5U3ByaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIGxhYmVsU2NvcmUuc3RyaW5nID0gcmVzdWx0LnNjb3JlLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgLy8gQWRkIHRoZSBpbnN0YW50aWF0ZWQgaXRlbSB0byB0aGUgc3VtbWFyeSB0YWJsZVxuICAgICAgICB0aGlzLnN1bW1hcnlUYWJsZU5vZGUucmVtb3ZlQ2hpbGQocmVzdWx0SXRlbSk7XG4gICAgICAgIHRoaXMuc3VtbWFyeVRhYmxlTm9kZS5hZGRDaGlsZChyZXN1bHRJdGVtKTtcbn1cbiAgICBcblxuICAgIHJlcGxheUJ1dHRvbigpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgfVxuXG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/startGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19a5a/NBrlKOboQ4rI9NPq1', 'startGame');
// Scripts/startGame.ts

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
        _this.player = ' ';
        _this.startBtn = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.storePlayerName = function () {
        this.player = this.playerName.string;
        cc.sys.localStorage.setItem('player', this.player);
    };
    NewClass.prototype.startButton = function () {
        if (this.player.length > 0) {
            cc.director.loadScene('game');
            this.storePlayerName();
        }
    };
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "playerName", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "startBtn", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3N0YXJ0R2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlCQztRQXRCVSxnQkFBVSxHQUFlLElBQUksQ0FBQztRQUM5QixZQUFNLEdBQVcsR0FBRyxDQUFDO1FBSTVCLGNBQVEsR0FBYyxJQUFJLENBQUM7O0lBaUIvQixDQUFDO0lBZEcsd0JBQXdCO0lBRXhCLGtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCw4QkFBVyxHQUFYO1FBQ0ksSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBR0wsQ0FBQztJQXJCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2dEQUNnQjtJQUtyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNPO0lBUlYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXlCNUI7SUFBRCxlQUFDO0NBekJELEFBeUJDLENBekJxQyxFQUFFLENBQUMsU0FBUyxHQXlCakQ7a0JBekJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwdWJsaWMgcGxheWVyTmFtZTogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgcHVibGljIHBsYXllcjogc3RyaW5nID0gJyAnO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHN0YXJ0QnRuOiBjYy5CdXR0b24gPSBudWxsO1xuXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIHN0b3JlUGxheWVyTmFtZSgpe1xuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMucGxheWVyTmFtZS5zdHJpbmc7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxheWVyJywgdGhpcy5wbGF5ZXIpO1xuICAgIH1cbiAgICBzdGFydEJ1dHRvbigpIHtcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlUGxheWVyTmFtZSgpO1xuICAgICAgICB9IFxuICAgICAgICBcblxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/PrefabForResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2d72wpy5RBza5jBzBKf9ZM', 'PrefabForResult');
// Scripts/PrefabForResult.ts

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
var PrefabForResult = /** @class */ (function (_super) {
    __extends(PrefabForResult, _super);
    function PrefabForResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SpriteRes = null;
        _this.goldSprite = null;
        _this.greySprite = null;
        return _this;
    }
    __decorate([
        property(cc.Sprite)
    ], PrefabForResult.prototype, "SpriteRes", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PrefabForResult.prototype, "goldSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PrefabForResult.prototype, "greySprite", void 0);
    PrefabForResult = __decorate([
        ccclass
    ], PrefabForResult);
    return PrefabForResult;
}(cc.Component));
exports.default = PrefabForResult;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1ByZWZhYkZvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQVdDO1FBUkcsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFHbEMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDOztJQUV0QyxDQUFDO0lBUkc7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3VEQUNTO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7dURBQ1M7SUFUakIsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQVduQztJQUFELHNCQUFDO0NBWEQsQUFXQyxDQVg0QyxFQUFFLENBQUMsU0FBUyxHQVd4RDtrQkFYb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFiRm9yUmVzdWx0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgU3ByaXRlUmVzOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIGdvbGRTcHJpdGU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBncmV5U3ByaXRlOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------
