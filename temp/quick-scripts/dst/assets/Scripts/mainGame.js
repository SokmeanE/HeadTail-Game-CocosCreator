
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