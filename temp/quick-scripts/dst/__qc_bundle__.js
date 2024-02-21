
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
        this.attempt = 10;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL21haW5HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBbVFDO1FBaFFHLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUNsQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsYUFBTyxHQUFXLElBQUksQ0FBQztRQUN2QixZQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLGtCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGFBQU8sR0FBVSxFQUFFLENBQUM7O0lBc054QixDQUFDO0lBbk5HLHdCQUF3QjtJQUV4Qix5QkFBTSxHQUFOO1FBQ0ksaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2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LEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MENBQ0c7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNZO0lBSWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDYztJQUlsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNJO0lBdENOLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FtUTVCO0lBQUQsZUFBQztDQW5RRCxBQW1RQyxDQW5RcUMsRUFBRSxDQUFDLFNBQVMsR0FtUWpEO2tCQW5Rb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGxheWVyTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNob3dBdHRlbXB0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncmV5OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdvbGQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hvaWNlQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgd2luTG9zZVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICB3aW5Mb3NlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzcGluQWdhaW5CdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3BpbkZlYXRoZXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZSlcbiAgICBpc1NwZWVkVXA6IGNjLlRvZ2dsZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3BlZWRUZXh0OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGNoZWNrTWFya1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBjaGVja01hcms6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNjb3JlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgcGxheWVyU2NvcmU6IG51bWJlciA9IG51bGw7XG4gICAgYXR0ZW1wdDogbnVtYmVyID0gbnVsbDtcbiAgICBjaG9pY2U6IHN0cmluZyA9ICcnO1xuICAgIHJhbmRvbUNob2ljZTogc3RyaW5nID0gJyc7XG4gICAgcmFuZG9tR29sZDogbnVtYmVyID0gMDtcbiAgICByYW5kb21HcmV5OiBudW1iZXIgPSAwO1xuICAgIHJlc3VsdHM6IGFueVtdID0gW107XG4gICAgXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy9nZXQgcGxheWVyIG5hbWVcbiAgICAgICAgdGhpcy5nZXRQbGF5ZXJOYW1lKCk7XG4gICAgICAgIHRoaXMucGxheWVyU2NvcmUgPSAxMDA7XG4gICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnBsYXllclNjb3JlLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgLy9oaWRlIHNwaW5BZ2FpbiBcbiAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zZXQgdmFsdWUgdG8gYXR0ZW1wdFxuICAgICAgICB0aGlzLmF0dGVtcHQgPSAxMDtcblxuICAgICAgICAvL2luc3RhbmNlIHByZWZhYlxuICAgICAgICB0aGlzLmNoZWNrTWFyayA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2hlY2tNYXJrUHJlZmFiKTtcbiAgICAgICAgXG5cbiAgICAgICAgLy9nbyBib3R0b24gY2FuJ3QgY2xpY2sgdW5pdCB0aGUgZ29sZC9ncmV5IGhhcyBiZWVuIHNlbGVjdGVkXG4gICAgICAgIHRoaXMuY2hvaWNlQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZ2V0UGxheWVyTmFtZSgpIHtcbiAgICAgICAgLy9nZXQgcGxheWVyIG5hbWUgZnJvbSBsb2NhbHN0b3JhZ2Ugd2hpY2ggcGFzcyBmcm9tIHRoZSBwcmV2aW91cyBzY2VuZVxuICAgICAgICB0aGlzLnBsYXllck5hbWUuc3RyaW5nID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXInKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGdyZXlCdG4oKSB7XG4gICAgICAgIC8vaWYgY2xpY2sgc2V0IGNob2ljZSB0byBncmV5XG4gICAgICAgIHRoaXMuY2hvaWNlID0gXCJHcmV5XCI7XG5cbiAgICAgICAgLy9jaGVjayByZW1hcmtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuY2hlY2tNYXJrKTtcbiAgICAgICAgdGhpcy5jaGVja01hcmsuc2V0UG9zaXRpb24oLTIyMCwgLTIwMCwgMCk7IFxuXG4gICAgICAgIC8vaW50ZXJhY3RhYmxlIGJ1dHRvblxuICAgICAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb2xkQnRuKCkge1xuICAgICAgICAvL2lmIGNsaWNrIHNldCBjaG9pY2UgdG8gZ29sZFxuICAgICAgICB0aGlzLmNob2ljZSA9IFwiR29sZFwiO1xuXG4gICAgICAgIC8vY2hlY2sgcmVtYXJrXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZCh0aGlzLmNoZWNrTWFyayk7XG4gICAgICAgIHRoaXMuY2hlY2tNYXJrLnNldFBvc2l0aW9uKDM2MCwgLTIxNSwgMCk7IFxuICAgICAgICB0aGlzLmNoZWNrTWFyay5hbmdsZSA9IC0xMDtcblxuXG4gICAgICAgIC8vaW50ZXJhY3RhYmxlIGJ1dHRvblxuICAgICAgICB0aGlzLmdvbGQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JleS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb0J0bigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMuY2hlY2tNYXJrKTtcblxuICAgICAgICAvL2RlZHVjdGlvbiAxMCBmb3IgcGxheVxuICAgICAgICB0aGlzLmF0dGVtcHQgLT0gMTtcbiAgICAgICAgdGhpcy5zaG93QXR0ZW1wdC5zdHJpbmcgPSBcIkF0dGVtcHQ6IFwiICsgdGhpcy5hdHRlbXB0LnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuZGVkdWN0aW9uKCk7XG5cbiAgICAgICAgLy9vbmNsaWNrIHBsYXkgYW5pYW10aW9uXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbigpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIGNoZWNrIGF0dGVtcHRcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0ZW1wdCA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlUmVzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1NjZW5lKCk7ICBcbiAgICAgICAgICAgIH0sICh0aGlzLmlzU3BlZWRVcC5pc0NoZWNrZWQgPT0gdHJ1ZSkgPyAzMDAwIDogNTUwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcGxheUFuaW1hdGlvbigpIHtcblxuICAgICAgICAvL25ldyBsb2dpY1xuICAgICAgICBjb25zb2xlLmxvZygncGxheSBhbmltYXRpb24nKTtcbiAgICAgICAgLy9uZXcgbG9naWNcbiAgICAgICAgbGV0IHJlc3VsdCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGlmKHJlc3VsdCA+PSAwLjUpe1xuICAgICAgICAgICAgdGhpcy5yYW5kb21DaG9pY2UgPSBcIkdvbGRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tQ2hvaWNlID0gXCJHcmV5XCI7XG4gICAgICAgIH1cblxuICAgICAgICAvL3BsYXkgYW5pbWF0aW9uXG4gICAgICAgIHZhciBhbmltID0gdGhpcy5zcGluRmVhdGhlci5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgYW5pbS5wbGF5KCk7XG4gICAgICAgICBpZiAodGhpcy5pc1NwZWVkVXAuaXNDaGVja2VkID09IGZhbHNlKXtcbiAgICAgICAgICAgICAvL25vcm1hbCBzcGVlZFxuICAgICAgICAgICAgdGhpcy5yYW5kb21Hb2xkID0gKE1hdGgucmFuZG9tKCkgKiAoMjUwIC0gMTgwKSArIDE4MCk7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUdyZXkgPSAoTWF0aC5yYW5kb20oKSAqICgxMjAgLSA2MCkgKyA2MCk7XG4gICAgICAgICAgICBhbmltLmdldEFuaW1hdGlvblN0YXRlKCdmZWF0aGVyQW5pbScpLnNwZWVkID0gMTtcblxuICAgICAgICAgICAgaWYodGhpcy5yYW5kb21DaG9pY2UgPT0gXCJHb2xkXCIpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdvbGQgKyA1MDAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW0uc3RvcCgpXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5yYW5kb21HcmV5ICsgNTAwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3NwZWVkdXBcbiAgICAgICAgICAgIGFuaW0uZ2V0QW5pbWF0aW9uU3RhdGUoJ2ZlYXRoZXJBbmltJykuc3BlZWQgPSAyO1xuICAgICAgICAgICAgdGhpcy5yYW5kb21Hb2xkID0gKE1hdGgucmFuZG9tKCkgKiAoMTI1IC0gOTApICsgOTApICsgMjUwMDtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tR3JleSA9IChNYXRoLnJhbmRvbSgpICogKDYwIC0gMzApICsgMzApICsgMjUwMDtcblxuICAgICAgICAgICAgaWYodGhpcy5yYW5kb21DaG9pY2UgPT0gXCJHb2xkXCIpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdvbGQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5zdG9wKClcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnJhbmRvbUdyZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29tcGFyZUNob2ljZSh0aGlzLmNob2ljZSk7XG4gICAgfVxuXG5cbiAgICBjb21wYXJlQ2hvaWNlKGNob2ljZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2luTG9zZSgpO1xuICAgICAgICBsZXQgd2luTG9zdExhYmVsID0gdGhpcy53aW5Mb3NlTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAvL2NvbXBhcmUgY2hvaWNlIHRvIGNvbXB1dGVyXG4gICAgICAgIGlmICh0aGlzLnJhbmRvbUNob2ljZSA9PSBjaG9pY2UpIHtcbiAgICAgICAgICAgIC8vcHVzaCByZXN1bHQgdG8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cy5wdXNoKHsgcmVzdWx0OiB0aGlzLnJhbmRvbUNob2ljZSwgcGxheWVyOiB0aGlzLmNob2ljZSwgc2NvcmU6IDEwIH0pO1xuICAgICAgICAgICAgLy9zZXQgYSBkZWxheSB0aGVuIGRvIDEgJiAyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLzEuIHNob3cgd2luIGFuZCBzcGluIFxuICAgICAgICAgICAgICAgIHdpbkxvc3RMYWJlbC5zdHJpbmcgPSBcIllvdSBXaW5cIjtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllclNjb3JlID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbkFnYWluQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vMi4gYWRkIHNjb3JlXG4gICAgICAgICAgICAgICAgdGhpcy5nYWluU2NvcmUoKTtcbiAgICAgICAgICAgIH0sICh0aGlzLmlzU3BlZWRVcC5pc0NoZWNrZWQgPT0gdHJ1ZSkgPyAyNjAwIDogNTEwMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vcmVzdWx0IHRvIGFycmF5XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHMucHVzaCh7IHJlc3VsdDogdGhpcy5yYW5kb21DaG9pY2UsIHBsYXllcjogdGhpcy5jaG9pY2UsIHNjb3JlOiAtMTAgfSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5Mb3N0TGFiZWwuc3RyaW5nID0gXCJZb3UgTG9zZVwiO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheWVyU2NvcmUgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAodGhpcy5pc1NwZWVkVXAuaXNDaGVja2VkID09IHRydWUpID8gMjYwMCA6IDUxMDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vZGlzcGxheSB3aW4gb3IgbG9zdFxuICAgIHdpbkxvc2UoKXtcbiAgICAgICAgdGhpcy53aW5Mb3NlTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMud2luTG9zZVByZWZhYik7XG4gICAgICAgIHRoaXMud2luTG9zZU5vZGUuc2V0UG9zaXRpb24oMCwxNjAsLTEpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy53aW5Mb3NlTm9kZSk7XG4gICAgfVxuXG4gICAgLy9hZGQgc2NvcmVcbiAgICBnYWluU2NvcmUoKSB7XG4gICAgICAgIHRoaXMucGxheWVyU2NvcmUgKz0gMjA7XG4gICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnBsYXllclNjb3JlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9kZWR1Y3Qgc2NvcmUgXG4gICAgZGVkdWN0aW9uKCl7XG4gICAgICAgIHRoaXMucGxheWVyU2NvcmUgLT0gMTA7XG4gICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnBsYXllclNjb3JlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLy9zcGluQWdhaW4gQnV0dG9uXG4gICAgc3BpbkFnYWluKCkge1xuICAgICAgICAvL2hpZGUgdGhlIHdpbiwgbG9zZSBhbmQgc3BpbiBidXR0b25cbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKHRoaXMud2luTG9zZU5vZGUpO1xuICAgICAgICB0aGlzLnNwaW5BZ2FpbkJ0bi5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvL2VuYWJlbCBidXR0b25cbiAgICAgICAgdGhpcy5ncmV5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vc3RvcmUgc2NvcmVcbiAgICBzdG9yZVJlcygpIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwbGF5ZXJTY29yZScsIHRoaXMucGxheWVyU2NvcmUpO1xuICAgICAgICBjb25zb2xlLmxvZygnY29tIGFycnJyOiAnLCB0aGlzLnBsYXllclNjb3JlKTtcbiAgICB9XG5cbiAgICBuZXdTY2VuZSgpe1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jlc3VsdHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnJlc3VsdHMpKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdmaW5hbCcpLCAoKSA9PiBcbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdCgncmVzdWx0RGF0YScsIHRoaXMucmVzdWx0cyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZW1pdCBmaW5hbCcsIHRoaXMucmVzdWx0cyk7XG5cbiAgICB9XG5cbiAgICBuZXh0U2NlbmUoKXtcbiAgICAgICAgdGhpcy5uZXdTY2VuZSgpO1xuICAgIH1cbn1cbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL3Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEyR0M7UUF4R0csWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBR3JCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixzQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLGlCQUFXLEdBQW1CLElBQUksQ0FBQztRQUNuQyxTQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLGlCQUFXLEdBQVUsRUFBRSxDQUFDOztJQW9GNUIsQ0FBQztJQWpGRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4RCxnQ0FBZ0M7UUFDaEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMs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LEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1QyxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHRywrQkFBWSxHQUFaO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQXJHRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzRDQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1M7SUFJNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0Q0FDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDZTtJQW5CaEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTJHNUI7SUFBRCxlQUFDO0NBM0dELEFBMkdDLENBM0dxQyxFQUFFLENBQUMsU0FBUyxHQTJHakQ7a0JBM0dvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByZWZhYkZvclJlc3VsdCBmcm9tIFwiLi9QcmVmYWJGb3JSZXN1bHRcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcGxheWVyOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdG90YWxTY29yZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIHNjb3JlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHJlc3VsdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICByZXBsYXlCdG46IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHJlc3VsdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN1bW1hcnlUYWJsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHNwcml0ZU5vZGVHOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgc3ByaXRlTm9kZVI6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICByZXM6IHN0cmluZyA9IG51bGw7XG4gICAgcmVzdWx0RmluYWw6IGFueVtdID0gW107XG5cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyLnN0cmluZyA9IFwiUGxheWVyOiBcIiArIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVyJyk7XG4gICAgICAgIHRoaXMuc2NvcmUgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXllclNjb3JlJyk7XG5cbiAgICAgICAgLy9nZXQgcmVzdWx0IGFycmF5IGZyb20gbWFpbkdhbWVcbiAgICAgICAgbGV0IHN0cm5nQXJyID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZXN1bHRzJyk7XG4gICAgICAgIHRoaXMucmVzdWx0RmluYWwgPSBKU09OLnBhcnNlKHN0cm5nQXJyKTtcblxuICAgICAgICB0aGlzLnRvdGFsU2NvcmUuc3RyaW5nID0gXCJTY29yZTogXCIgKyB0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKHRoaXMuc2NvcmUgPj0gMjAwKXtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0LnN0cmluZyA9IFwiRXhwZXJ0XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdC5zdHJpbmcgPSBcIkZhaWxlZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRSZXN1bHQodGhpcy5yZXN1bHRGaW5hbCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHNldFJlc3VsdChyZXN1bHRzOiB7IHJlc3VsdDogc3RyaW5nLCBwbGF5ZXI6IHN0cmluZywgc2NvcmU6IG51bWJlciB9W10pIHtcbiAgICAgICAgLy8gU2V0IHNwYWNpbmcgYmV0d2VlbiBpdGVtcyBcbiAgICAgICAgbGV0IHNwYWNpbmdYID0gMTAwO1xuICAgICAgICBsZXQgc3BhY2luZ1kgPSAxMDA7XG4gICAgICAgIGxldCAgY29sID0gLTEuNVxuXG4gICAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gSW5zdGFudGlhdGUgdGhlIHByZWZhYlxuICAgICAgICAgICAgbGV0IHJlc3VsdEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnJlc3VsdFByZWZhYik7XG4gICAgICAgICAgICByZXN1bHRJdGVtLnggPSAwO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0SXRlbS54LCAneCBwb3NpdGlvbicpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGVSZXN1bHQgXG4gICAgICAgICAgICB0aGlzLnNob3dUYWJsZShyZXN1bHRJdGVtLCByZXN1bHQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihpbmRleCAvIGluZGV4IC0gMSk7ICBcbiAgICAgICAgICAgIGNvbCArPSAxOyBcblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcmVzdWx0SXRlbVxuICAgICAgICAgICAgcmVzdWx0SXRlbS5zZXRQb3NpdGlvbihjb2wgKiAocmVzdWx0SXRlbS53aWR0aCArIHNwYWNpbmdYKSwgLXJvdyAqIChyZXN1bHRJdGVtLmhlaWdodCArIHNwYWNpbmdZKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzaG93VGFibGUocmVzdWx0SXRlbTogY2MuTm9kZSwgcmVzdWx0OiB7IHJlc3VsdDogc3RyaW5nLCBwbGF5ZXI6IHN0cmluZywgc2NvcmU6IG51bWJlciB9KXtcbiAgICAgICAgXG4gICAgICAgIC8vc2V0IHZhbHVlIG9mIHByZWZhYiBjaGlsZHJlblxuICAgICAgICBsZXQgc3ByaXRlUmVzdWx0ID0gcmVzdWx0SXRlbS5nZXRDaGlsZEJ5TmFtZSgnUmVzdWx0JykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGxldCBzcHJpdGVQbGF5ZXIgPSByZXN1bHRJdGVtLmdldENoaWxkQnlOYW1lKCdwbGF5ZXInKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgbGV0IGxhYmVsU2NvcmUgPSByZXN1bHRJdGVtLmdldENoaWxkQnlOYW1lKCdTY29yZScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG5cbiAgICAgICAgLy9nZXQgY29tcG9uZW50IGZyb20gcHJlZmFiIHNjcmlwdFxuICAgICAgICBsZXQgc3ByaXRlID0gcmVzdWx0SXRlbS5nZXRDb21wb25lbnQoUHJlZmFiRm9yUmVzdWx0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBjaGVjayByZXMgc3ByaXRlXG4gICAgICAgIGlmIChyZXN1bHQucmVzdWx0ID09IFwiR29sZFwiKSB7XG4gICAgICAgICAgICBzcHJpdGVSZXN1bHQuc3ByaXRlRnJhbWUgPSBzcHJpdGUuZ29sZFNwcml0ZTtcbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQucmVzdWx0ID09IFwiR3JleVwiKXtcbiAgICAgICAgICAgIHNwcml0ZVJlc3VsdC5zcHJpdGVGcmFtZSA9IHNwcml0ZS5ncmV5U3ByaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgcGxheWVyIHNwcml0ZVxuICAgICAgICBpZiAocmVzdWx0LnBsYXllciA9PSBcIkdvbGRcIikge1xuICAgICAgICAgICAgc3ByaXRlUGxheWVyLnNwcml0ZUZyYW1lID0gc3ByaXRlLmdvbGRTcHJpdGU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnBsYXllciA9PSBcIkdyZXlcIil7XG4gICAgICAgICAgICBzcHJpdGVQbGF5ZXIuc3ByaXRlRnJhbWUgPSBzcHJpdGUuZ3JleVNwcml0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBsYWJlbFNjb3JlLnN0cmluZyA9IHJlc3VsdC5zY29yZS50b1N0cmluZygpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgaW5zdGFudGlhdGVkIGl0ZW0gdG8gdGhlIHN1bW1hcnkgdGFibGVcbiAgICAgICAgdGhpcy5zdW1tYXJ5VGFibGVOb2RlLnJlbW92ZUNoaWxkKHJlc3VsdEl0ZW0pO1xuICAgICAgICB0aGlzLnN1bW1hcnlUYWJsZU5vZGUuYWRkQ2hpbGQocmVzdWx0SXRlbSk7XG59XG4gICAgXG5cbiAgICByZXBsYXlCdXR0b24oKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgIH1cblxuXG59XG4iXX0=
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
