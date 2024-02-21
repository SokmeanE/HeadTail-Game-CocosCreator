
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