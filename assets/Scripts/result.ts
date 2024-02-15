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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.player.string = "Player: " + cc.sys.localStorage.getItem('player');
        this.score = cc.sys.localStorage.getItem('playerScore');
        this.playRes();
    }
    
    playRes(){
        this.totalScore.string = "Score: " + this.score.toString();
        if(this.score == 10){
            this.result.string = "Expert";
        } else if (this.score >= 8){
            this.result.string = "Good";
        } else if (this.score >= 5){
            this.result.string = "Normal";
        } else {
            this.result.string = "Failed";
        }
    }

    replayButton() {
        cc.director.loadScene('game');
    }

}
