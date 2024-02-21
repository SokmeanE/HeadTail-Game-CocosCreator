
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL21haW5HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBc1BDO1FBblBDLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUNsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsYUFBTyxHQUFXLElBQUksQ0FBQztRQUN2QixZQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGFBQU8sR0FBVSxFQUFFLENBQUM7O0lBeU10QixDQUFDO0lBdk1DLHlCQUFNLEdBQU47UUFDRSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxL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Q0FBQyxJQUFJLENBQUM7a0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDYztJQUlsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNJO0lBdENKLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FzUDVCO0lBQUQsZUFBQztDQXRQRCxBQXNQQyxDQXRQcUMsRUFBRSxDQUFDLFNBQVMsR0FzUGpEO2tCQXRQb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBwbGF5ZXJOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBzaG93QXR0ZW1wdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBncmV5OiBjYy5Ob2RlID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgZ29sZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLk5vZGUpXG4gIGNob2ljZUJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgd2luTG9zZVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgd2luTG9zZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBzcGluQWdhaW5CdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBzcGluRmVhdGhlcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlRvZ2dsZSlcbiAgaXNTcGVlZFVwOiBjYy5Ub2dnbGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgc3BlZWRUZXh0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgY2hlY2tNYXJrUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuICBjaGVja01hcms6IGNjLk5vZGUgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgc2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcbiAgcGxheWVyU2NvcmU6IG51bWJlciA9IG51bGw7XG4gIGF0dGVtcHQ6IG51bWJlciA9IG51bGw7XG4gIGNob2ljZTogc3RyaW5nID0gJyc7XG4gIHJhbmRvbUNob2ljZTogc3RyaW5nID0gJyc7XG4gIHJhbmRvbUdvbGQ6IG51bWJlciA9IDA7XG4gIHJhbmRvbUdyZXk6IG51bWJlciA9IDA7XG4gIHJlc3VsdHM6IGFueVtdID0gW107XG5cbiAgb25Mb2FkKCkge1xuICAgIC8vZ2V0IHBsYXllciBuYW1lXG4gICAgdGhpcy5nZXRQbGF5ZXJOYW1lKCk7XG4gICAgdGhpcy5wbGF5ZXJTY29yZSA9IDEwMDtcbiAgICB0aGlzLnNjb3JlLnN0cmluZyA9IFwiU2NvcmU6IFwiICsgdGhpcy5wbGF5ZXJTY29yZS50b1N0cmluZygpO1xuXG4gICAgLy9oaWRlIHNwaW5BZ2FpbiBcbiAgICB0aGlzLnNwaW5BZ2FpbkJ0bi5hY3RpdmUgPSBmYWxzZTtcblxuICAgIC8vc2V0IHZhbHVlIHRvIGF0dGVtcHRcbiAgICB0aGlzLmF0dGVtcHQgPSAxMDtcblxuICAgIC8vaW5zdGFuY2UgcHJlZmFiXG4gICAgdGhpcy5jaGVja01hcmsgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNoZWNrTWFya1ByZWZhYik7XG5cbiAgICAvL2dvIGJvdHRvbiBjYW4ndCBjbGljayB1bml0IHRoZSBnb2xkL2dyZXkgaGFzIGJlZW4gc2VsZWN0ZWRcbiAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcblxuICB9XG5cbiAgZ2V0UGxheWVyTmFtZSgpIHtcbiAgICAvL2dldCBwbGF5ZXIgbmFtZSBmcm9tIGxvY2Fsc3RvcmFnZSB3aGljaCBwYXNzIGZyb20gdGhlIHByZXZpb3VzIHNjZW5lXG4gICAgdGhpcy5wbGF5ZXJOYW1lLnN0cmluZyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVyJykudG9TdHJpbmcoKTtcbn1cblxuICBncmV5QnRuKCkge1xuICAgIC8vaWYgY2xpY2sgc2V0IGNob2ljZSB0byBncmV5XG4gICAgdGhpcy5jaG9pY2UgPSBcIkdyZXlcIjtcblxuICAgIC8vY2hlY2sgcmVtYXJrXG4gICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuY2hlY2tNYXJrKTtcbiAgICB0aGlzLmNoZWNrTWFyay5zZXRQb3NpdGlvbigtMjIwLCAtMjAwLCAwKTsgXG5cbiAgICAvL2ludGVyYWN0YWJsZSBidXR0b25cbiAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5nb2xkLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuY2hvaWNlQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gIH1cblxuICBnb2xkQnRuKCkge1xuICAgIC8vaWYgY2xpY2sgc2V0IGNob2ljZSB0byBnb2xkXG4gICAgdGhpcy5jaG9pY2UgPSBcIkdvbGRcIjtcblxuICAgIC8vY2hlY2sgcmVtYXJrXG4gICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuY2hlY2tNYXJrKTtcbiAgICB0aGlzLmNoZWNrTWFyay5zZXRQb3NpdGlvbigzNjAsIC0yMTUsIDApOyBcbiAgICB0aGlzLmNoZWNrTWFyay5hbmdsZSA9IC0xMDtcblxuICAgIC8vaW50ZXJhY3RhYmxlIGJ1dHRvblxuICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIGdvQnRuKCkge1xuICAgIHRoaXMubm9kZS5yZW1vdmVDaGlsZCh0aGlzLmNoZWNrTWFyayk7XG5cbiAgICAvL2RlZHVjdGlvbiAxMCBmb3IgcGxheVxuICAgIHRoaXMuYXR0ZW1wdCAtPSAxO1xuICAgIHRoaXMuc2hvd0F0dGVtcHQuc3RyaW5nID0gXCJBdHRlbXB0OiBcIiArIHRoaXMuYXR0ZW1wdC50b1N0cmluZygpO1xuICAgIHRoaXMuZGVkdWN0aW9uKCk7XG5cbiAgICAvL29uY2xpY2sgcGxheSBhbmlhbXRpb25cbiAgICB0aGlzLnBsYXlBbmltYXRpb24oKTtcbiAgICBcbiAgICAvLyBjaGVjayBhdHRlbXB0XG4gICAgICAgIGlmKHRoaXMuYXR0ZW1wdCA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMuc3RvcmVSZXMoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5ld1NjZW5lKCk7ICBcbiAgICAgICAgfSwgKHRoaXMuaXNTcGVlZFVwLmlzQ2hlY2tlZCA9PSB0cnVlKSA/IDMwMDAgOiA1NTAwKTtcbiAgICB9XG4gICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gIH1cblxuICBwbGF5QW5pbWF0aW9uKCkge1xuICAgIC8vcmFuZG9tIHRoZSByZXN1bHRzXG4gICAgbGV0IHJlc3VsdCA9IE1hdGgucmFuZG9tKCk7XG4gICAgaWYocmVzdWx0ID49IDAuNSl7XG4gICAgICAgIHRoaXMucmFuZG9tQ2hvaWNlID0gXCJHb2xkXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yYW5kb21DaG9pY2UgPSBcIkdyZXlcIjtcbiAgICB9XG5cbiAgICAvL3BsYXkgYW5pbWF0aW9uXG4gICAgdmFyIGFuaW0gPSB0aGlzLnNwaW5GZWF0aGVyLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIGFuaW0ucGxheSgpO1xuICAgICAgaWYgKHRoaXMuaXNTcGVlZFVwLmlzQ2hlY2tlZCA9PSBmYWxzZSl7XG4gICAgICAgICAgLy9ub3JtYWwgc3BlZWRcbiAgICAgICAgdGhpcy5yYW5kb21Hb2xkID0gKE1hdGgucmFuZG9tKCkgKiAoMjUwIC0gMTgwKSArIDE4MCk7XG4gICAgICAgIHRoaXMucmFuZG9tR3JleSA9IChNYXRoLnJhbmRvbSgpICogKDEyMCAtIDYwKSArIDYwKTtcbiAgICAgICAgYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnZmVhdGhlckFuaW0nKS5zcGVlZCA9IDE7XG5cbiAgICAgICAgaWYodGhpcy5yYW5kb21DaG9pY2UgPT0gXCJHb2xkXCIpe1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYW5pbS5zdG9wKCk7XG4gICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdvbGQgKyA1MDAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFuaW0uc3RvcCgpXG4gICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdyZXkgKyA1MDAwKTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL3NwZWVkdXBcbiAgICAgICAgYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnZmVhdGhlckFuaW0nKS5zcGVlZCA9IDI7XG4gICAgICAgIHRoaXMucmFuZG9tR29sZCA9IChNYXRoLnJhbmRvbSgpICogKDEyNSAtIDkwKSArIDkwKSArIDI1MDA7XG4gICAgICAgIHRoaXMucmFuZG9tR3JleSA9IChNYXRoLnJhbmRvbSgpICogKDYwIC0gMzApICsgMzApICsgMjUwMDtcblxuICAgICAgICBpZih0aGlzLnJhbmRvbUNob2ljZSA9PSBcIkdvbGRcIil7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBhbmltLnN0b3AoKTtcbiAgICAgICAgICAgIH0sIHRoaXMucmFuZG9tR29sZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBhbmltLnN0b3AoKVxuICAgICAgICAgICAgfSwgdGhpcy5yYW5kb21HcmV5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIFxuICAgIFxuICAgIHRoaXMuY29tcGFyZUNob2ljZSh0aGlzLmNob2ljZSk7XG4gIH1cblxuXG4gIGNvbXBhcmVDaG9pY2UoY2hvaWNlOiBzdHJpbmcpIHtcbiAgICB0aGlzLndpbkxvc2UoKTtcbiAgICBsZXQgd2luTG9zdExhYmVsID0gdGhpcy53aW5Mb3NlTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgIC8vY29tcGFyZSBjaG9pY2UgdG8gY29tcHV0ZXJcbiAgICBpZiAodGhpcy5yYW5kb21DaG9pY2UgPT0gY2hvaWNlKSB7XG4gICAgICAgIC8vcHVzaCByZXN1bHQgdG8gYXJyYXlcbiAgICAgICAgdGhpcy5yZXN1bHRzLnB1c2goeyByZXN1bHQ6IHRoaXMucmFuZG9tQ2hvaWNlLCBwbGF5ZXI6IHRoaXMuY2hvaWNlLCBzY29yZTogMTAgfSk7XG4gICAgICAgIC8vc2V0IGEgZGVsYXkgdGhlbiBkbyAxICYgMlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vMS4gc2hvdyB3aW4gYW5kIHNwaW4gXG4gICAgICAgICAgICB3aW5Mb3N0TGFiZWwuc3RyaW5nID0gXCJZb3UgV2luXCI7XG4gICAgICAgICAgICBpZih0aGlzLnBsYXllclNjb3JlID4gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vMi4gYWRkIHNjb3JlXG4gICAgICAgICAgICB0aGlzLmdhaW5TY29yZSgpO1xuICAgICAgICB9LCAodGhpcy5pc1NwZWVkVXAuaXNDaGVja2VkID09IHRydWUpID8gMjYwMCA6IDUxMDApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy9yZXN1bHQgdG8gYXJyYXlcbiAgICAgICAgdGhpcy5yZXN1bHRzLnB1c2goeyByZXN1bHQ6IHRoaXMucmFuZG9tQ2hvaWNlLCBwbGF5ZXI6IHRoaXMuY2hvaWNlLCBzY29yZTogLTEwIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdpbkxvc3RMYWJlbC5zdHJpbmcgPSBcIllvdSBMb3NlXCI7XG4gICAgICAgICAgICBpZih0aGlzLnBsYXllclNjb3JlID4gMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKHRoaXMuaXNTcGVlZFVwLmlzQ2hlY2tlZCA9PSB0cnVlKSA/IDI2MDAgOiA1MTAwKTtcbiAgICB9XG4gICAgICBcbiAgfVxuXG4gIC8vZGlzcGxheSB3aW4gb3IgbG9zdFxuICB3aW5Mb3NlKCl7XG4gICAgdGhpcy53aW5Mb3NlTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMud2luTG9zZVByZWZhYik7XG4gICAgdGhpcy53aW5Mb3NlTm9kZS5zZXRQb3NpdGlvbigwLDE2MCwwKTtcbiAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy53aW5Mb3NlTm9kZSk7XG4gIH1cblxuICAvL2FkZCBzY29yZVxuICBnYWluU2NvcmUoKSB7XG4gICAgdGhpcy5wbGF5ZXJTY29yZSArPSAyMDtcbiAgICB0aGlzLnNjb3JlLnN0cmluZyA9IFwiU2NvcmU6IFwiICsgdGhpcy5wbGF5ZXJTY29yZS50b1N0cmluZygpO1xuICB9XG5cbiAgLy9kZWR1Y3Qgc2NvcmUgXG4gIGRlZHVjdGlvbigpe1xuICAgICAgdGhpcy5wbGF5ZXJTY29yZSAtPSAxMDtcbiAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnBsYXllclNjb3JlLnRvU3RyaW5nKCk7XG4gIH1cbiAgXG4gIC8vc3BpbkFnYWluIEJ1dHRvblxuICBzcGluQWdhaW4oKSB7XG4gICAgLy9oaWRlIHRoZSB3aW4sIGxvc2UgYW5kIHNwaW4gYnV0dG9uXG4gICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMud2luTG9zZU5vZGUpO1xuICAgIHRoaXMuc3BpbkFnYWluQnRuLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgLy9lbmFiZWwgYnV0dG9uXG4gICAgdGhpcy5ncmV5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgdGhpcy5nb2xkLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gIH1cblxuICAvL3N0b3JlIHNjb3JlXG4gIHN0b3JlUmVzKCkge1xuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxheWVyU2NvcmUnLCB0aGlzLnBsYXllclNjb3JlKTtcbiAgfVxuXG4gIG5ld1NjZW5lKCl7XG4gICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXN1bHRzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5yZXN1bHRzKSk7XG4gICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdmaW5hbCcpO1xuICB9XG5cbiAgbmV4dFNjZW5lKCl7XG4gICAgdGhpcy5uZXdTY2VuZSgpO1xuICB9XG59XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFxR0M7UUFsR0MsWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBR3JCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUNuQyxTQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLGlCQUFXLEdBQVUsRUFBRSxDQUFDOztJQThFMUIsQ0FBQztJQTNFQyx1QkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4RCxnQ0FBZ0M7UUFDaEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMs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REFBaUQ7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2QkFBWSxHQUFaO1FBQ0UsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQS9GRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBDQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7OENBQ1M7SUFJNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswQ0FDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDZTtJQW5CZCxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBcUcxQjtJQUFELGFBQUM7Q0FyR0QsQUFxR0MsQ0FyR21DLEVBQUUsQ0FBQyxTQUFTLEdBcUcvQztrQkFyR29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJlZmFiRm9yUmVzdWx0IGZyb20gXCIuL1ByZWZhYkZvclJlc3VsdFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBwbGF5ZXI6IGNjLkxhYmVsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIHRvdGFsU2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcbiAgc2NvcmU6IG51bWJlciA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICByZXN1bHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICByZXBsYXlCdG46IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgcmVzdWx0UHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBzdW1tYXJ5VGFibGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgc3ByaXRlTm9kZUc6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgc3ByaXRlTm9kZVI6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgcmVzOiBzdHJpbmcgPSBudWxsO1xuICByZXN1bHRGaW5hbDogYW55W10gPSBbXTtcblxuXG4gIG9uTG9hZCAoKSB7XG4gICAgdGhpcy5wbGF5ZXIuc3RyaW5nID0gXCJQbGF5ZXI6IFwiICsgY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXInKTtcbiAgICB0aGlzLnNjb3JlID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXJTY29yZScpO1xuXG4gICAgLy9nZXQgcmVzdWx0IGFycmF5IGZyb20gbWFpbkdhbWVcbiAgICBsZXQgc3RybmdBcnIgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Jlc3VsdHMnKTtcbiAgICB0aGlzLnJlc3VsdEZpbmFsID0gSlNPTi5wYXJzZShzdHJuZ0Fycik7XG5cbiAgICB0aGlzLnRvdGFsU2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgaWYodGhpcy5zY29yZSA+PSAyMDApe1xuICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIkV4cGVydFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0cmluZyA9IFwiRmFpbGVkXCI7XG4gICAgfVxuICAgIHRoaXMuc2V0UmVzdWx0KHRoaXMucmVzdWx0RmluYWwpO1xuICAgICAgXG4gIH1cblxuICBzZXRSZXN1bHQocmVzdWx0czogeyByZXN1bHQ6IHN0cmluZywgcGxheWVyOiBzdHJpbmcsIHNjb3JlOiBudW1iZXIgfVtdKSB7XG4gICAgLy8gU2V0IHNwYWNpbmcgYmV0d2VlbiBpdGVtcyBcbiAgICBsZXQgc3BhY2luZ1ggPSAxMDA7XG4gICAgbGV0IHNwYWNpbmdZID0gMTAwO1xuICAgIGxldCAgY29sID0gLTEuNVxuXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSBwcmVmYWJcbiAgICAgICAgbGV0IHJlc3VsdEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlc3VsdFByZWZhYik7XG4gICAgICAgIHJlc3VsdEl0ZW0ueCA9IDA7XG5cbiAgICAgICAgLy8gdXBkYXRlUmVzdWx0IFxuICAgICAgICB0aGlzLnNob3dUYWJsZShyZXN1bHRJdGVtLCByZXN1bHQpO1xuICAgICAgICBcbiAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoaW5kZXggLyBpbmRleCAtIDEpOyAgXG4gICAgICAgIGNvbCArPSAxOyBcblxuICAgICAgICAvLyBTZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSByZXN1bHRJdGVtXG4gICAgICAgIHJlc3VsdEl0ZW0uc2V0UG9zaXRpb24oY29sICogKHJlc3VsdEl0ZW0ud2lkdGggKyBzcGFjaW5nWCksIC1yb3cgKiAocmVzdWx0SXRlbS5oZWlnaHQgKyBzcGFjaW5nWSkpO1xuICAgIH0pO1xuICAgICAgXG4gIH1cblxuICBzaG93VGFibGUocmVzdWx0SXRlbTogY2MuTm9kZSwgcmVzdWx0OiB7IHJlc3VsdDogc3RyaW5nLCBwbGF5ZXI6IHN0cmluZywgc2NvcmU6IG51bWJlciB9KXtcbiAgICAvL3NldCB2YWx1ZSBvZiBwcmVmYWIgY2hpbGRyZW5cbiAgICBsZXQgc3ByaXRlUmVzdWx0ID0gcmVzdWx0SXRlbS5nZXRDaGlsZEJ5TmFtZSgnUmVzdWx0JykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgbGV0IHNwcml0ZVBsYXllciA9IHJlc3VsdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3BsYXllcicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgIGxldCBsYWJlbFNjb3JlID0gcmVzdWx0SXRlbS5nZXRDaGlsZEJ5TmFtZSgnU2NvcmUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuXG4gICAgLy9nZXQgY29tcG9uZW50IGZyb20gcHJlZmFiIHNjcmlwdFxuICAgIGxldCBzcHJpdGUgPSByZXN1bHRJdGVtLmdldENvbXBvbmVudChQcmVmYWJGb3JSZXN1bHQpO1xuXG4gICAgLy8gY2hlY2sgcmVzIHNwcml0ZVxuICAgIGlmIChyZXN1bHQucmVzdWx0ID09IFwiR29sZFwiKSB7XG4gICAgICAgIHNwcml0ZVJlc3VsdC5zcHJpdGVGcmFtZSA9IHNwcml0ZS5nb2xkU3ByaXRlO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LnJlc3VsdCA9PSBcIkdyZXlcIil7XG4gICAgICAgIHNwcml0ZVJlc3VsdC5zcHJpdGVGcmFtZSA9IHNwcml0ZS5ncmV5U3ByaXRlO1xuICAgIH1cbiAgICAvLyBjaGVjayBwbGF5ZXIgc3ByaXRlXG4gICAgaWYgKHJlc3VsdC5wbGF5ZXIgPT0gXCJHb2xkXCIpIHtcbiAgICAgICAgc3ByaXRlUGxheWVyLnNwcml0ZUZyYW1lID0gc3ByaXRlLmdvbGRTcHJpdGU7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQucGxheWVyID09IFwiR3JleVwiKXtcbiAgICAgICAgc3ByaXRlUGxheWVyLnNwcml0ZUZyYW1lID0gc3ByaXRlLmdyZXlTcHJpdGU7XG4gICAgfVxuICAgIC8vdXBkYXRlIHNjb3JlIHZhbHVlXG4gICAgbGFiZWxTY29yZS5zdHJpbmcgPSByZXN1bHQuc2NvcmUudG9TdHJpbmcoKTtcblxuICAgIC8vIEFkZCB0aGUgaW5zdGFudGlhdGVkIGl0ZW0gdG8gdGhlIHN1bW1hcnkgdGFibGVcbiAgICB0aGlzLnN1bW1hcnlUYWJsZU5vZGUucmVtb3ZlQ2hpbGQocmVzdWx0SXRlbSk7XG4gICAgdGhpcy5zdW1tYXJ5VGFibGVOb2RlLmFkZENoaWxkKHJlc3VsdEl0ZW0pO1xuICB9XG5cbiAgcmVwbGF5QnV0dG9uKCkge1xuICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICB9XG5cblxufVxuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3N0YXJ0R2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQW1CQztRQWhCUSxnQkFBVSxHQUFlLElBQUksQ0FBQztRQUM5QixZQUFNLEdBQVcsR0FBRyxDQUFDO1FBRzVCLGNBQVEsR0FBYyxJQUFJLENBQUM7O0lBWTdCLENBQUM7SUFWQyxtQ0FBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsK0JBQVcsR0FBWDtRQUNFLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFmRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2lEQUNnQjtJQUlyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNPO0lBUFIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW1CN0I7SUFBRCxnQkFBQztDQW5CRCxBQW1CQyxDQW5Cc0MsRUFBRSxDQUFDLFNBQVMsR0FtQmxEO2tCQW5Cb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRHYW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgcHVibGljIHBsYXllck5hbWU6IGNjLkVkaXRCb3ggPSBudWxsO1xuICBwdWJsaWMgcGxheWVyOiBzdHJpbmcgPSAnICc7XG5cbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgc3RhcnRCdG46IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgc3RvcmVQbGF5ZXJOYW1lKCl7XG4gICAgdGhpcy5wbGF5ZXIgPSB0aGlzLnBsYXllck5hbWUuc3RyaW5nO1xuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxheWVyJywgdGhpcy5wbGF5ZXIpO1xuICB9XG4gIHN0YXJ0QnV0dG9uKCkge1xuICAgIGlmKHRoaXMucGxheWVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJyk7XG4gICAgICAgIHRoaXMuc3RvcmVQbGF5ZXJOYW1lKCk7XG4gICAgfSBcbiAgfVxufVxuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL1ByZWZhYkZvclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQVdDO1FBUkMsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFHbEMsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDOztJQUVwQyxDQUFDO0lBUkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3VEQUNTO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7dURBQ1M7SUFUZixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBV25DO0lBQUQsc0JBQUM7Q0FYRCxBQVdDLENBWDRDLEVBQUUsQ0FBQyxTQUFTLEdBV3hEO2tCQVhvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVmYWJGb3JSZXN1bHQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gIFNwcml0ZVJlczogY2MuU3ByaXRlID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gIGdvbGRTcHJpdGU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gIGdyZXlTcHJpdGU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxufVxuIl19
//------QC-SOURCE-SPLIT------
