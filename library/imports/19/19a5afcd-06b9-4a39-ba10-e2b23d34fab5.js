"use strict";
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