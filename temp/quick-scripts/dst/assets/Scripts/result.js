
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