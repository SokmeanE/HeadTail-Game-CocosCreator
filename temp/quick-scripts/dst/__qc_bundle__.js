
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
var MainGame = /** @class */ (function (_super) {
    __extends(MainGame, _super);
    function MainGame() {
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
    MainGame.prototype.onLoad = function () {
        //get player name
        this.getPlayerName();
        this.playerScore = 100;
        this.score.string = "Score: " + this.playerScore.toString();
        //hide spinAgain 
        this.spinAgainBtn.active = false;
        //set value to attempt
        this.attempt = 10;
        //instance prefab
        this.checkMark = cc.instantiate(this.checkMarkPrefab);
        //go botton can't click unit the gold/grey has been selected
        this.choiceBtn.getComponent(cc.Button).interactable = false;
    };
    MainGame.prototype.getPlayerName = function () {
        //get player name from localstorage which pass from the previous scene
        this.playerName.string = cc.sys.localStorage.getItem('player').toString();
    };
    MainGame.prototype.greyBtn = function () {
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
    MainGame.prototype.goldBtn = function () {
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
    MainGame.prototype.goBtn = function () {
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
    MainGame.prototype.playAnimation = function () {
        //random the results
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
    MainGame.prototype.compareChoice = function (choice) {
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
    MainGame.prototype.winLose = function () {
        this.winLoseNode = cc.instantiate(this.winLosePrefab);
        this.winLoseNode.setPosition(0, 160, 0);
        this.node.addChild(this.winLoseNode);
    };
    //add score
    MainGame.prototype.gainScore = function () {
        this.playerScore += 20;
        this.score.string = "Score: " + this.playerScore.toString();
    };
    //deduct score 
    MainGame.prototype.deduction = function () {
        this.playerScore -= 10;
        this.score.string = "Score: " + this.playerScore.toString();
    };
    //spinAgain Button
    MainGame.prototype.spinAgain = function () {
        //hide the win, lose and spin button
        this.node.removeChild(this.winLoseNode);
        this.spinAgainBtn.active = false;
        //enabel button
        this.grey.getComponent(cc.Button).interactable = true;
        this.gold.getComponent(cc.Button).interactable = true;
    };
    //store score
    MainGame.prototype.storeRes = function () {
        cc.sys.localStorage.setItem('playerScore', this.playerScore);
    };
    MainGame.prototype.newScene = function () {
        cc.sys.localStorage.setItem('results', JSON.stringify(this.results));
        cc.director.loadScene('final');
    };
    MainGame.prototype.nextScene = function () {
        this.newScene();
    };
    __decorate([
        property(cc.Label)
    ], MainGame.prototype, "playerName", void 0);
    __decorate([
        property(cc.Label)
    ], MainGame.prototype, "showAttempt", void 0);
    __decorate([
        property(cc.Node)
    ], MainGame.prototype, "grey", void 0);
    __decorate([
        property(cc.Node)
    ], MainGame.prototype, "gold", void 0);
    __decorate([
        property(cc.Node)
    ], MainGame.prototype, "choiceBtn", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainGame.prototype, "winLosePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], MainGame.prototype, "spinAgainBtn", void 0);
    __decorate([
        property(cc.Node)
    ], MainGame.prototype, "spinFeather", void 0);
    __decorate([
        property(cc.Toggle)
    ], MainGame.prototype, "isSpeedUp", void 0);
    __decorate([
        property(cc.Label)
    ], MainGame.prototype, "speedText", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainGame.prototype, "checkMarkPrefab", void 0);
    __decorate([
        property(cc.Label)
    ], MainGame.prototype, "score", void 0);
    MainGame = __decorate([
        ccclass
    ], MainGame);
    return MainGame;
}(cc.Component));
exports.default = MainGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL21haW5HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBc1BDO1FBblBHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUNsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsYUFBTyxHQUFXLElBQUksQ0FBQztRQUN2QixZQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGFBQU8sR0FBVSxFQUFFLENBQUM7O0lBeU14QixDQUFDO0lBdk1HLHlCQUFNLEdBQU47UUFDSSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxL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QUFDLElBQUksQ0FBQztrREFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNjO0lBSWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ0k7SUF0Q04sUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXNQNUI7SUFBRCxlQUFDO0NBdFBELEFBc1BDLENBdFBxQyxFQUFFLENBQUMsU0FBUyxHQXNQakQ7a0JBdFBvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5HYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwbGF5ZXJOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2hvd0F0dGVtcHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdyZXk6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ29sZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjaG9pY2VCdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB3aW5Mb3NlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIHdpbkxvc2VOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNwaW5BZ2FpbkJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzcGluRmVhdGhlcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIGlzU3BlZWRVcDogY2MuVG9nZ2xlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzcGVlZFRleHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgY2hlY2tNYXJrUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIGNoZWNrTWFyazogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBwbGF5ZXJTY29yZTogbnVtYmVyID0gbnVsbDtcbiAgICBhdHRlbXB0OiBudW1iZXIgPSBudWxsO1xuICAgIGNob2ljZTogc3RyaW5nID0gJyc7XG4gICAgcmFuZG9tQ2hvaWNlOiBzdHJpbmcgPSAnJztcbiAgICByYW5kb21Hb2xkOiBudW1iZXIgPSAwO1xuICAgIHJhbmRvbUdyZXk6IG51bWJlciA9IDA7XG4gICAgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy9nZXQgcGxheWVyIG5hbWVcbiAgICAgICAgdGhpcy5nZXRQbGF5ZXJOYW1lKCk7XG4gICAgICAgIHRoaXMucGxheWVyU2NvcmUgPSAxMDA7XG4gICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnBsYXllclNjb3JlLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgLy9oaWRlIHNwaW5BZ2FpbiBcbiAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zZXQgdmFsdWUgdG8gYXR0ZW1wdFxuICAgICAgICB0aGlzLmF0dGVtcHQgPSAxMDtcblxuICAgICAgICAvL2luc3RhbmNlIHByZWZhYlxuICAgICAgICB0aGlzLmNoZWNrTWFyayA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2hlY2tNYXJrUHJlZmFiKTtcbiAgICBcbiAgICAgICAgLy9nbyBib3R0b24gY2FuJ3QgY2xpY2sgdW5pdCB0aGUgZ29sZC9ncmV5IGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgICAgIHRoaXMuY2hvaWNlQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZ2V0UGxheWVyTmFtZSgpIHtcbiAgICAgICAgLy9nZXQgcGxheWVyIG5hbWUgZnJvbSBsb2NhbHN0b3JhZ2Ugd2hpY2ggcGFzcyBmcm9tIHRoZSBwcmV2aW91cyBzY2VuZVxuICAgICAgICB0aGlzLnBsYXllck5hbWUuc3RyaW5nID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXInKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGdyZXlCdG4oKSB7XG4gICAgICAgIC8vaWYgY2xpY2sgc2V0IGNob2ljZSB0byBncmV5XG4gICAgICAgIHRoaXMuY2hvaWNlID0gXCJHcmV5XCI7XG5cbiAgICAgICAgLy9jaGVjayByZW1hcmtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuY2hlY2tNYXJrKTtcbiAgICAgICAgdGhpcy5jaGVja01hcmsuc2V0UG9zaXRpb24oLTIyMCwgLTIwMCwgMCk7IFxuXG4gICAgICAgIC8vaW50ZXJhY3RhYmxlIGJ1dHRvblxuICAgICAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb2xkQnRuKCkge1xuICAgICAgICAvL2lmIGNsaWNrIHNldCBjaG9pY2UgdG8gZ29sZFxuICAgICAgICB0aGlzLmNob2ljZSA9IFwiR29sZFwiO1xuXG4gICAgICAgIC8vY2hlY2sgcmVtYXJrXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0aGlzLmNoZWNrTWFyayk7XG4gICAgICAgIHRoaXMuY2hlY2tNYXJrLnNldFBvc2l0aW9uKDM2MCwgLTIxNSwgMCk7IFxuICAgICAgICB0aGlzLmNoZWNrTWFyay5hbmdsZSA9IC0xMDtcblxuICAgICAgICAvL2ludGVyYWN0YWJsZSBidXR0b25cbiAgICAgICAgdGhpcy5nb2xkLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2hvaWNlQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgZ29CdG4oKSB7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLmNoZWNrTWFyayk7XG5cbiAgICAgICAgLy9kZWR1Y3Rpb24gMTAgZm9yIHBsYXlcbiAgICAgICAgdGhpcy5hdHRlbXB0IC09IDE7XG4gICAgICAgIHRoaXMuc2hvd0F0dGVtcHQuc3RyaW5nID0gXCJBdHRlbXB0OiBcIiArIHRoaXMuYXR0ZW1wdC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmRlZHVjdGlvbigpO1xuXG4gICAgICAgIC8vb25jbGljayBwbGF5IGFuaWFtdGlvblxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGNoZWNrIGF0dGVtcHRcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0ZW1wdCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlUmVzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1NjZW5lKCk7ICBcbiAgICAgICAgICAgIH0sICh0aGlzLmlzU3BlZWRVcC5pc0NoZWNrZWQgPT0gdHJ1ZSkgPyAzMDAwIDogNTUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcGxheUFuaW1hdGlvbigpIHtcbiAgICAgICAgLy9yYW5kb20gdGhlIHJlc3VsdHNcbiAgICAgICAgbGV0IHJlc3VsdCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGlmKHJlc3VsdCA+PSAwLjUpe1xuICAgICAgICAgICAgdGhpcy5yYW5kb21DaG9pY2UgPSBcIkdvbGRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tQ2hvaWNlID0gXCJHcmV5XCI7XG4gICAgICAgIH1cblxuICAgICAgICAvL3BsYXkgYW5pbWF0aW9uXG4gICAgICAgIHZhciBhbmltID0gdGhpcy5zcGluRmVhdGhlci5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgYW5pbS5wbGF5KCk7XG4gICAgICAgICBpZiAodGhpcy5pc1NwZWVkVXAuaXNDaGVja2VkID09IGZhbHNlKXtcbiAgICAgICAgICAgICAvL25vcm1hbCBzcGVlZFxuICAgICAgICAgICAgdGhpcy5yYW5kb21Hb2xkID0gKE1hdGgucmFuZG9tKCkgKiAoMjUwIC0gMTgwKSArIDE4MCk7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUdyZXkgPSAoTWF0aC5yYW5kb20oKSAqICgxMjAgLSA2MCkgKyA2MCk7XG4gICAgICAgICAgICBhbmltLmdldEFuaW1hdGlvblN0YXRlKCdmZWF0aGVyQW5pbScpLnNwZWVkID0gMTtcblxuICAgICAgICAgICAgaWYodGhpcy5yYW5kb21DaG9pY2UgPT0gXCJHb2xkXCIpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdvbGQgKyA1MDAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW0uc3RvcCgpXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5yYW5kb21HcmV5ICsgNTAwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3NwZWVkdXBcbiAgICAgICAgICAgIGFuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ2ZlYXRoZXJBbmltJykuc3BlZWQgPSAyO1xuICAgICAgICAgICAgdGhpcy5yYW5kb21Hb2xkID0gKE1hdGgucmFuZG9tKCkgKiAoMTI1IC0gOTApICsgOTApICsgMjUwMDtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tR3JleSA9IChNYXRoLnJhbmRvbSgpICogKDYwIC0gMzApICsgMzApICsgMjUwMDtcblxuICAgICAgICAgICAgaWYodGhpcy5yYW5kb21DaG9pY2UgPT0gXCJHb2xkXCIpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdvbGQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5zdG9wKClcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdyZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29tcGFyZUNob2ljZSh0aGlzLmNob2ljZSk7XG4gICAgfVxuXG5cbiAgICBjb21wYXJlQ2hvaWNlKGNob2ljZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2luTG9zZSgpO1xuICAgICAgICBsZXQgd2luTG9zdExhYmVsID0gdGhpcy53aW5Mb3NlTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAvL2NvbXBhcmUgY2hvaWNlIHRvIGNvbXB1dGVyXG4gICAgICAgIGlmICh0aGlzLnJhbmRvbUNob2ljZSA9PSBjaG9pY2UpIHtcbiAgICAgICAgICAgIC8vcHVzaCByZXN1bHQgdG8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cy5wdXNoKHsgcmVzdWx0OiB0aGlzLnJhbmRvbUNob2ljZSwgcGxheWVyOiB0aGlzLmNob2ljZSwgc2NvcmU6IDEwIH0pO1xuICAgICAgICAgICAgLy9zZXQgYSBkZWxheSB0aGVuIGRvIDEgJiAyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLzEuIHNob3cgd2luIGFuZCBzcGluIFxuICAgICAgICAgICAgICAgIHdpbkxvc3RMYWJlbC5zdHJpbmcgPSBcIllvdSBXaW5cIjtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllclNjb3JlID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbkFnYWluQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vMi4gYWRkIHNjb3JlXG4gICAgICAgICAgICAgICAgdGhpcy5nYWluU2NvcmUoKTtcbiAgICAgICAgICAgIH0sICh0aGlzLmlzU3BlZWRVcC5pc0NoZWNrZWQgPT0gdHJ1ZSkgPyAyNjAwIDogNTEwMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vcmVzdWx0IHRvIGFycmF5XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHMucHVzaCh7IHJlc3VsdDogdGhpcy5yYW5kb21DaG9pY2UsIHBsYXllcjogdGhpcy5jaG9pY2UsIHNjb3JlOiAtMTAgfSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5Mb3N0TGFiZWwuc3RyaW5nID0gXCJZb3UgTG9zZVwiO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheWVyU2NvcmUgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAodGhpcy5pc1NwZWVkVXAuaXNDaGVja2VkID09IHRydWUpID8gMjYwMCA6IDUxMDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vZGlzcGxheSB3aW4gb3IgbG9zdFxuICAgIHdpbkxvc2UoKXtcbiAgICAgICAgdGhpcy53aW5Mb3NlTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMud2luTG9zZVByZWZhYik7XG4gICAgICAgIHRoaXMud2luTG9zZU5vZGUuc2V0UG9zaXRpb24oMCwxNjAsMCk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0aGlzLndpbkxvc2VOb2RlKTtcbiAgICB9XG5cbiAgICAvL2FkZCBzY29yZVxuICAgIGdhaW5TY29yZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZSArPSAyMDtcbiAgICAgICAgdGhpcy5zY29yZS5zdHJpbmcgPSBcIlNjb3JlOiBcIiArIHRoaXMucGxheWVyU2NvcmUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2RlZHVjdCBzY29yZSBcbiAgICBkZWR1Y3Rpb24oKXtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZSAtPSAxMDtcbiAgICAgICAgdGhpcy5zY29yZS5zdHJpbmcgPSBcIlNjb3JlOiBcIiArIHRoaXMucGxheWVyU2NvcmUudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgXG4gICAgLy9zcGluQWdhaW4gQnV0dG9uXG4gICAgc3BpbkFnYWluKCkge1xuICAgICAgICAvL2hpZGUgdGhlIHdpbiwgbG9zZSBhbmQgc3BpbiBidXR0b25cbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMud2luTG9zZU5vZGUpO1xuICAgICAgICB0aGlzLnNwaW5BZ2FpbkJ0bi5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvL2VuYWJlbCBidXR0b25cbiAgICAgICAgdGhpcy5ncmV5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vc3RvcmUgc2NvcmVcbiAgICBzdG9yZVJlcygpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwbGF5ZXJTY29yZScsIHRoaXMucGxheWVyU2NvcmUpO1xuICAgIH1cblxuICAgIG5ld1NjZW5lKCl7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVzdWx0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMucmVzdWx0cykpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2ZpbmFsJyk7XG4gICAgfVxuXG4gICAgbmV4dFNjZW5lKCl7XG4gICAgICAgIHRoaXMubmV3U2NlbmUoKTtcbiAgICB9XG59XG4iXX0=
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
var Result = /** @class */ (function (_super) {
    __extends(Result, _super);
    function Result() {
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
    Result.prototype.onLoad = function () {
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
    Result.prototype.setResult = function (results) {
        var _this = this;
        // Set spacing between items 
        var spacingX = 100;
        var spacingY = 100;
        var col = -1.5;
        results.forEach(function (result, index) {
            // Instantiate the prefab
            var resultItem = cc.instantiate(_this.resultPrefab);
            resultItem.x = 0;
            console.log(resultItem.x, 'x position');
            // updateResult 
            _this.showTable(resultItem, result);
            var row = Math.floor(index / index - 1);
            col += 1;
            // Set the position of the resultItem
            resultItem.setPosition(col * (resultItem.width + spacingX), -row * (resultItem.height + spacingY));
        });
    };
    Result.prototype.showTable = function (resultItem, result) {
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
        //update score value
        labelScore.string = result.score.toString();
        // Add the instantiated item to the summary table
        this.summaryTableNode.removeChild(resultItem);
        this.summaryTableNode.addChild(resultItem);
    };
    Result.prototype.replayButton = function () {
        cc.director.loadScene('game');
    };
    __decorate([
        property(cc.Label)
    ], Result.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], Result.prototype, "totalScore", void 0);
    __decorate([
        property(cc.Label)
    ], Result.prototype, "result", void 0);
    __decorate([
        property(cc.Button)
    ], Result.prototype, "replayBtn", void 0);
    __decorate([
        property(cc.Prefab)
    ], Result.prototype, "resultPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], Result.prototype, "summaryTableNode", void 0);
    Result = __decorate([
        ccclass
    ], Result);
    return Result;
}(cc.Component));
exports.default = Result;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFzR0M7UUFuR0csWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBR3JCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUNuQyxTQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLGlCQUFXLEdBQVUsRUFBRSxDQUFDOztJQStFNUIsQ0FBQztJQTVFRyx1QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4RCxnQ0FBZ0M7UUFDaEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMs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QUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFNUMsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNkJBQVksR0FBWjtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFoR0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswQ0FDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNTO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MENBQ0s7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ2U7SUFuQmhCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FzRzFCO0lBQUQsYUFBQztDQXRHRCxBQXNHQyxDQXRHbUMsRUFBRSxDQUFDLFNBQVMsR0FzRy9DO2tCQXRHb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcmVmYWJGb3JSZXN1bHQgZnJvbSBcIi4vUHJlZmFiRm9yUmVzdWx0XCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwbGF5ZXI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0b3RhbFNjb3JlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgc2NvcmU6IG51bWJlciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcmVzdWx0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHJlcGxheUJ0bjogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcmVzdWx0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3VtbWFyeVRhYmxlTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgc3ByaXRlTm9kZUc6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBzcHJpdGVOb2RlUjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIHJlczogc3RyaW5nID0gbnVsbDtcbiAgICByZXN1bHRGaW5hbDogYW55W10gPSBbXTtcblxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3RyaW5nID0gXCJQbGF5ZXI6IFwiICsgY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXInKTtcbiAgICAgICAgdGhpcy5zY29yZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVyU2NvcmUnKTtcblxuICAgICAgICAvL2dldCByZXN1bHQgYXJyYXkgZnJvbSBtYWluR2FtZVxuICAgICAgICBsZXQgc3RybmdBcnIgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Jlc3VsdHMnKTtcbiAgICAgICAgdGhpcy5yZXN1bHRGaW5hbCA9IEpTT04ucGFyc2Uoc3RybmdBcnIpO1xuXG4gICAgICAgIHRoaXMudG90YWxTY29yZS5zdHJpbmcgPSBcIlNjb3JlOiBcIiArIHRoaXMuc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgaWYodGhpcy5zY29yZSA+PSAyMDApe1xuICAgICAgICAgICAgdGhpcy5yZXN1bHQuc3RyaW5nID0gXCJFeHBlcnRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LnN0cmluZyA9IFwiRmFpbGVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRSZXN1bHQodGhpcy5yZXN1bHRGaW5hbCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNldFJlc3VsdChyZXN1bHRzOiB7IHJlc3VsdDogc3RyaW5nLCBwbGF5ZXI6IHN0cmluZywgc2NvcmU6IG51bWJlciB9W10pIHtcbiAgICAgICAgLy8gU2V0IHNwYWNpbmcgYmV0d2VlbiBpdGVtcyBcbiAgICAgICAgbGV0IHNwYWNpbmdYID0gMTAwO1xuICAgICAgICBsZXQgc3BhY2luZ1kgPSAxMDA7XG4gICAgICAgIGxldCAgY29sID0gLTEuNVxuXG4gICAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgdGhlIHByZWZhYlxuICAgICAgICAgICAgbGV0IHJlc3VsdEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlc3VsdFByZWZhYik7XG4gICAgICAgICAgICByZXN1bHRJdGVtLnggPSAwO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0SXRlbS54LCAneCBwb3NpdGlvbicpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGVSZXN1bHQgXG4gICAgICAgICAgICB0aGlzLnNob3dUYWJsZShyZXN1bHRJdGVtLCByZXN1bHQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihpbmRleCAvIGluZGV4IC0gMSk7ICBcbiAgICAgICAgICAgIGNvbCArPSAxOyBcblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcmVzdWx0SXRlbVxuICAgICAgICAgICAgcmVzdWx0SXRlbS5zZXRQb3NpdGlvbihjb2wgKiAocmVzdWx0SXRlbS53aWR0aCArIHNwYWNpbmdYKSwgLXJvdyAqIChyZXN1bHRJdGVtLmhlaWdodCArIHNwYWNpbmdZKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzaG93VGFibGUocmVzdWx0SXRlbTogY2MuTm9kZSwgcmVzdWx0OiB7IHJlc3VsdDogc3RyaW5nLCBwbGF5ZXI6IHN0cmluZywgc2NvcmU6IG51bWJlciB9KXtcbiAgICAgICAgLy9zZXQgdmFsdWUgb2YgcHJlZmFiIGNoaWxkcmVuXG4gICAgICAgIGxldCBzcHJpdGVSZXN1bHQgPSByZXN1bHRJdGVtLmdldENoaWxkQnlOYW1lKCdSZXN1bHQnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IHNwcml0ZVBsYXllciA9IHJlc3VsdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3BsYXllcicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBsZXQgbGFiZWxTY29yZSA9IHJlc3VsdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ1Njb3JlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcblxuICAgICAgICAvL2dldCBjb21wb25lbnQgZnJvbSBwcmVmYWIgc2NyaXB0XG4gICAgICAgIGxldCBzcHJpdGUgPSByZXN1bHRJdGVtLmdldENvbXBvbmVudChQcmVmYWJGb3JSZXN1bHQpO1xuXG4gICAgICAgIC8vIGNoZWNrIHJlcyBzcHJpdGVcbiAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT0gXCJHb2xkXCIpIHtcbiAgICAgICAgICAgIHNwcml0ZVJlc3VsdC5zcHJpdGVGcmFtZSA9IHNwcml0ZS5nb2xkU3ByaXRlO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5yZXN1bHQgPT0gXCJHcmV5XCIpe1xuICAgICAgICAgICAgc3ByaXRlUmVzdWx0LnNwcml0ZUZyYW1lID0gc3ByaXRlLmdyZXlTcHJpdGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2hlY2sgcGxheWVyIHNwcml0ZVxuICAgICAgICBpZiAocmVzdWx0LnBsYXllciA9PSBcIkdvbGRcIikge1xuICAgICAgICAgICAgc3ByaXRlUGxheWVyLnNwcml0ZUZyYW1lID0gc3ByaXRlLmdvbGRTcHJpdGU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnBsYXllciA9PSBcIkdyZXlcIil7XG4gICAgICAgICAgICBzcHJpdGVQbGF5ZXIuc3ByaXRlRnJhbWUgPSBzcHJpdGUuZ3JleVNwcml0ZTtcbiAgICAgICAgfVxuICAgICAgICAvL3VwZGF0ZSBzY29yZSB2YWx1ZVxuICAgICAgICBsYWJlbFNjb3JlLnN0cmluZyA9IHJlc3VsdC5zY29yZS50b1N0cmluZygpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgaW5zdGFudGlhdGVkIGl0ZW0gdG8gdGhlIHN1bW1hcnkgdGFibGVcbiAgICAgICAgdGhpcy5zdW1tYXJ5VGFibGVOb2RlLnJlbW92ZUNoaWxkKHJlc3VsdEl0ZW0pO1xuICAgICAgICB0aGlzLnN1bW1hcnlUYWJsZU5vZGUuYWRkQ2hpbGQocmVzdWx0SXRlbSk7XG4gICAgfVxuXG4gICAgcmVwbGF5QnV0dG9uKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9XG5cblxufVxuIl19
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
var StartGame = /** @class */ (function (_super) {
    __extends(StartGame, _super);
    function StartGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerName = null;
        _this.player = ' ';
        _this.startBtn = null;
        return _this;
    }
    StartGame.prototype.storePlayerName = function () {
        this.player = this.playerName.string;
        cc.sys.localStorage.setItem('player', this.player);
    };
    StartGame.prototype.startButton = function () {
        if (this.player.length > 0) {
            cc.director.loadScene('game');
            this.storePlayerName();
        }
    };
    __decorate([
        property(cc.EditBox)
    ], StartGame.prototype, "playerName", void 0);
    __decorate([
        property(cc.Button)
    ], StartGame.prototype, "startBtn", void 0);
    StartGame = __decorate([
        ccclass
    ], StartGame);
    return StartGame;
}(cc.Component));
exports.default = StartGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3N0YXJ0R2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXNCQztRQW5CVSxnQkFBVSxHQUFlLElBQUksQ0FBQztRQUM5QixZQUFNLEdBQVcsR0FBRyxDQUFDO1FBSTVCLGNBQVEsR0FBYyxJQUFJLENBQUM7O0lBYy9CLENBQUM7SUFaRyxtQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsK0JBQVcsR0FBWDtRQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUdMLENBQUM7SUFsQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpREFDZ0I7SUFLckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDTztJQVJWLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FzQjdCO0lBQUQsZ0JBQUM7Q0F0QkQsQUFzQkMsQ0F0QnNDLEVBQUUsQ0FBQyxTQUFTLEdBc0JsRDtrQkF0Qm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0R2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwdWJsaWMgcGxheWVyTmFtZTogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgcHVibGljIHBsYXllcjogc3RyaW5nID0gJyAnO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHN0YXJ0QnRuOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgc3RvcmVQbGF5ZXJOYW1lKCl7XG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5wbGF5ZXJOYW1lLnN0cmluZztcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwbGF5ZXInLCB0aGlzLnBsYXllcik7XG4gICAgfVxuICAgIHN0YXJ0QnV0dG9uKCkge1xuICAgICAgICBpZih0aGlzLnBsYXllci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVQbGF5ZXJOYW1lKCk7XG4gICAgICAgIH0gXG4gICAgICAgIFxuXG4gICAgfVxufVxuIl19
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
