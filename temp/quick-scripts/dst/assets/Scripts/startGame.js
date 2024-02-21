
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