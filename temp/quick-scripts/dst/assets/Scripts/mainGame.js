
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHRzL21haW5HYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBZ05DO1FBN01HLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixVQUFJLEdBQVksSUFBSSxDQUFDO1FBR3JCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsa0JBQVksR0FBVyxJQUFJLENBQUM7UUFHNUIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixXQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3ZCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLFlBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsa0JBQVksR0FBVyxHQUFHLENBQUM7O0lBcUsvQixDQUFDO0lBL0pHLHdCQUF3QjtJQUV4Qix5QkFBTSxHQUFOO1FBQ0ksaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENB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QUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ0k7SUF4Q04sUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQWdONUI7SUFBRCxlQUFDO0NBaE5ELEFBZ05DLENBaE5xQyxFQUFFLENBQUMsU0FBUyxHQWdOakQ7a0JBaE5vQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwbGF5ZXJOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2hvd0F0dGVtcHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGF0dGVtcHQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncmV5OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdvbGQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hvaWNlQnRuOiBjYy5Ob2RlID0gbnVsbDtcbiAgICByYW5kb21SZXN1bHQ6IHN0cmluZyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aW5UZXh0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvc2VUZXh0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNwaW5BZ2FpbkJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzcGluRmVhdGhlcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncmV5Q2hlY2s6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ29sZENoZWNrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzY29yZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIHBsYXllclNjb3JlOiBudW1iZXIgPSAwO1xuICAgIGNob2ljZTogc3RyaW5nID0gJyc7XG4gICAgcmFuZG9tQ2hvaWNlOiBzdHJpbmcgPSAnICc7XG4gICAgcmFuZG9tRGVsYXk6IG51bWJlcjtcblxuXG5cblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvL2dldCBwbGF5ZXIgbmFtZVxuICAgICAgICB0aGlzLmdldFBsYXllck5hbWUoKTtcblxuICAgICAgICAvL2hpZGUgd2luIGFuZCBsb3NlLCBzcGluQWdhaW4gXG4gICAgICAgIHRoaXMud2luVGV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb3NlVGV4dC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy9zZXQgdmFsdWUgdG8gYXR0ZW1wdCBhbmQgc2NvcmVcbiAgICAgICAgdGhpcy5hdHRlbXB0ID0gMTA7XG4gICAgICAgIHRoaXMucGxheWVyU2NvcmUgPSAwO1xuXG4gICAgICAgIC8vZ28gYm90dG9uIGNhbid0IGNsaWNrIHVuaXQgdGhlIGdvbGQvZ3JleSBoYXMgYmVlbiBzZWxlY3RlZFxuICAgICAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcblxuICAgIH1cblxuICAgIGdldFBsYXllck5hbWUoKSB7XG4gICAgICAgIC8vZ2V0IHBsYXllciBuYW1lIGZyb20gbG9jYWxzdG9yYWdlIHdoaWNoIHBhc3MgZnJvbSB0aGUgcHJldmlvdXMgc2NlbmVcbiAgICAgICAgdGhpcy5wbGF5ZXJOYW1lLnN0cmluZyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVyJykudG9TdHJpbmcoKTtcbiAgICB9XG5cblxuICAgIGdyZXlCdG4oKSB7XG4gICAgICAgIC8vaWYgY2xpY2sgc2V0IGNob2ljZSB0byBncmV5XG4gICAgICAgIHRoaXMuY2hvaWNlID0gXCJHcmV5XCI7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvbicsIHRoaXMuY2hvaWNlKTtcblxuICAgICAgICAvL2NoZWNrIHJlbWFya1xuICAgICAgICB0aGlzLmdyZXlDaGVjay5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIC8vaW50ZXJhY3RhYmxlIGJ1dHRvblxuICAgICAgICB0aGlzLmdyZXkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaG9pY2VCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnb2xkQnRuKCkge1xuICAgICAgICAvL2lmIGNsaWNrIHNldCBjaG9pY2UgdG8gZ29sZFxuICAgICAgICB0aGlzLmNob2ljZSA9IFwiR29sZFwiO1xuICAgICAgICBjb25zb2xlLmxvZygnb2ZmJywgdGhpcy5jaG9pY2UpO1xuXG4gICAgICAgIC8vY2hlY2sgcmVtYXJrXG4gICAgICAgIHRoaXMuZ29sZENoZWNrLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgLy9pbnRlcmFjdGFibGUgYnV0dG9uXG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ncmV5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGdvQnRuKCkge1xuICAgICAgICAvL29uY2xpY2sgcGxheSBhbmlhbXRpb25cbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKCk7XG4gICAgICAgIC8vIGNoZWNrIGF0dGVtcHRcbiAgICAgICAgaWYgKHRoaXMuYXR0ZW1wdCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlU2NvcmUoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubmV3U2NlbmUoKTsgIFxuICAgICAgICAgICAgfSw2NTAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNob2ljZUJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwbGF5QW5pbWF0aW9uKCkge1xuXG4gICAgICAgIC8vbmV3IGxvZ2ljXG4gICAgICAgIGxldCByZXN1bHQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBpZihyZXN1bHQgPj0gMC41KXtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tQ2hvaWNlID0gXCJHb2xkXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUNob2ljZSA9IFwiR3JleVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wbGF5IGFuaW1hdGlvblxuICAgICAgICB2YXIgYW5pbSA9IHRoaXMuc3BpbkZlYXRoZXIuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIGFuaW0ucGxheSgpO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbUdvbGQgPSAoTWF0aC5yYW5kb20oKSAqICgyNTAgLSAxODApICsgMTgwKTtcbiAgICAgICAgY29uc3QgcmFuZG9tR3JleSA9IE1hdGgucmFuZG9tKCkgKiAoMTIwIC0gNjApICsgNjA7XG5cbiAgICAgICAgXG4gICAgICAgIC8vcGF1c2UgYW5pbWF0aW9uXG4gICAgICAgIGlmKHRoaXMucmFuZG9tQ2hvaWNlID09IFwiR29sZFwiKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb2xkIGFuaW0nKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFuaW0uc3RvcCgpO1xuICAgICAgICAgICAgfSwgcmFuZG9tR29sZCArIDUwMDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dyZXkgYW5pbScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgYW5pbS5zdG9wKClcbiAgICAgICAgICAgIH0sIHJhbmRvbUdyZXkgKyA1MDAwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wYXJlQ2hvaWNlKHRoaXMuY2hvaWNlKTtcbiAgICB9XG5cblxuICAgIGNvbXBhcmVDaG9pY2UoY2hvaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgLy9jb21wYXJlIGNob2ljZSB0byBjb21wdXRlclxuICAgICAgICBpZiAodGhpcy5yYW5kb21DaG9pY2UgPT0gdGhpcy5jaG9pY2UpIHtcbiAgICAgICAgICAgIC8vc2V0IGEgZGVsYXkgdGhlbiBkbyAxICYgMlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8xLiBzaG93IHdpbiBhbmQgc3BpbiBcbiAgICAgICAgICAgICAgICB0aGlzLndpblRleHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGVtcHQgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8yLiBhZGQgc2NvcmVcbiAgICAgICAgICAgICAgICB0aGlzLmdhaW5TY29yZSgpO1xuICAgICAgICAgICAgfSwgNTEwMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9zZVRleHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGVtcHQgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluQWdhaW5CdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZGVjcmVhc2UgdGhlIGF0dGVtcHQgXG4gICAgICAgIHRoaXMuYXR0ZW1wdCAtPSAxO1xuICAgICAgICB0aGlzLnNob3dBdHRlbXB0LnN0cmluZyA9IFwiQXR0ZW1wdDogXCIgKyB0aGlzLmF0dGVtcHQudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvL2FkZCBzY29yZVxuICAgIGdhaW5TY29yZSgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJTY29yZSArPSAxO1xuICAgICAgICB0aGlzLnNjb3JlLnN0cmluZyA9IFwiU2NvcmU6IFwiICsgdGhpcy5wbGF5ZXJTY29yZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHNwaW5BZ2FpbigpIHtcbiAgICAgICAgLy9kaWFibGUgY2hlY2sgcmVtYXJrXG4gICAgICAgIHRoaXMuZ3JleUNoZWNrLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdvbGRDaGVjay5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvL2hpZGUgdGhlIHdpbiwgbG9zZSBhbmQgc3BpbiBidXR0b25cbiAgICAgICAgdGhpcy53aW5UZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvc2VUZXh0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwaW5BZ2FpbkJ0bi5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAvL2VuYWJlbCBidXR0b25cbiAgICAgICAgdGhpcy5ncmV5LmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZ29sZC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vc3RvcmUgc2NvcmVcbiAgICBzdG9yZVNjb3JlKCkge1xuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXllclNjb3JlJywgdGhpcy5wbGF5ZXJTY29yZSk7XG4gICAgfVxuXG4gICAgbmV3U2NlbmUoKXtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdmaW5hbCcpO1xuICAgIH1cbn1cbiJdfQ==