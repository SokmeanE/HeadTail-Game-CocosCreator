const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    public playerName: cc.EditBox = null;
    public player: string = ' ';


    @property(cc.Button)
    startBtn: cc.Button = null;


    // LIFE-CYCLE CALLBACKS:

    storePlayerName(){
        this.player = this.playerName.string;
        cc.sys.localStorage.setItem('player', this.player);
    }
    startButton() {
        if(this.player.length > 0) {
            cc.director.loadScene('game');
            this.storePlayerName();
        } 
        

    }
}
