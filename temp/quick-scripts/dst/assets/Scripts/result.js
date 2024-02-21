
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