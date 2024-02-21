import PrefabForResult from "./PrefabForResult";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    player: cc.Label = null;

    @property(cc.Label)
    totalScore: cc.Label = null;
    score: number = null;

    @property(cc.Label)
    result: cc.Label = null;

    @property(cc.Button)
    replayBtn: cc.Button = null;

    @property(cc.Prefab)
    resultPrefab: cc.Prefab = null;

    @property(cc.Node)
    summaryTableNode: cc.Node = null;
    spriteNodeG: cc.SpriteFrame = null;
    spriteNodeR: cc.SpriteFrame = null;
    res: string = null;
    resultFinal: any[] = [];


    onLoad () {
        this.player.string = "Player: " + cc.sys.localStorage.getItem('player');
        this.score = cc.sys.localStorage.getItem('playerScore');

        //get result array from mainGame
        let strngArr = cc.sys.localStorage.getItem('results');
        this.resultFinal = JSON.parse(strngArr);

        this.totalScore.string = "Score: " + this.score.toString();
        if(this.score >= 200){
            this.result.string = "Expert";
        } else {
            this.result.string = "Failed";
        }

        this.setResult(this.resultFinal);
        
    }

    setResult(results: { result: string, player: string, score: number }[]) {
        // Set spacing between items 
        let spacingX = 100;
        let spacingY = 100;
        let  col = -1.5

        results.forEach((result, index) => {
            // Instantiate the prefab
            let resultItem = cc.instantiate(this.resultPrefab);
            resultItem.x = 0;
            console.log(resultItem.x, 'x position');

            // updateResult 
            this.showTable(resultItem, result);
            
            let row = Math.floor(index / index - 1);  
            col += 1; 

            // Set the position of the resultItem
            resultItem.setPosition(col * (resultItem.width + spacingX), -row * (resultItem.height + spacingY));
        });
        
    }

    showTable(resultItem: cc.Node, result: { result: string, player: string, score: number }){
        
        //set value of prefab children
        let spriteResult = resultItem.getChildByName('Result').getComponent(cc.Sprite);
        let spritePlayer = resultItem.getChildByName('player').getComponent(cc.Sprite);
        let labelScore = resultItem.getChildByName('Score').getComponent(cc.Label);

        //get component from prefab script
        let sprite = resultItem.getComponent(PrefabForResult);
            
        // check res sprite
        if (result.result == "Gold") {
            spriteResult.spriteFrame = sprite.goldSprite;
        } else if (result.result == "Grey"){
            spriteResult.spriteFrame = sprite.greySprite;
        }

        // check player sprite
        if (result.player == "Gold") {
            spritePlayer.spriteFrame = sprite.goldSprite;
        } else if (result.player == "Grey"){
            spritePlayer.spriteFrame = sprite.greySprite;
        }

        
        labelScore.string = result.score.toString();

        // Add the instantiated item to the summary table
        this.summaryTableNode.removeChild(resultItem);
        this.summaryTableNode.addChild(resultItem);
}
    

    replayButton() {
        cc.director.loadScene('game');
    }


}
