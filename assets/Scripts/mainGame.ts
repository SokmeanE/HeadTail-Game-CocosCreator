const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    playerName: cc.Label = null;

    @property(cc.Label)
    showAttempt: cc.Label = null;

    @property
    attempt: number = null;

    @property(cc.Node)
    grey: cc.Node = null;

    @property(cc.Node)
    gold: cc.Node = null;

    @property(cc.Node)
    choiceBtn: cc.Node = null;
    randomResult: string = null;

    @property(cc.Node)
    winText: cc.Node = null;

    @property(cc.Node)
    loseText: cc.Node = null;

    @property(cc.Node)
    spinAgainBtn: cc.Node = null;

    @property(cc.Node)
    spinFeather: cc.Node = null;

    @property(cc.Node)
    greyCheck: cc.Node = null;

    @property(cc.Node)
    goldCheck: cc.Node = null;

    @property(cc.Label)
    score: cc.Label = null;
    playerScore: number = 0;
    choice: string = '';
    randomChoice: string = '';
    randomDelay: number;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
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

    }

    getPlayerName() {
        //get player name from localstorage which pass from the previous scene
        this.playerName.string = cc.sys.localStorage.getItem('player').toString();
    }


    greyBtn() {
        //if click set choice to grey
        this.choice = "Grey";
        console.log('on', this.choice);

        //check remark
        this.greyCheck.active = true;

        //interactable button
        this.grey.getComponent(cc.Button).interactable = false;
        this.gold.getComponent(cc.Button).interactable = false;
        this.choiceBtn.getComponent(cc.Button).interactable = true;
    }

    goldBtn() {
        //if click set choice to gold
        this.choice = "Gold";
        console.log('off', this.choice);

        //check remark
        this.goldCheck.active = true;

        //interactable button
        this.gold.getComponent(cc.Button).interactable = false;
        this.grey.getComponent(cc.Button).interactable = false;
        this.choiceBtn.getComponent(cc.Button).interactable = true;
    }

    goBtn() {
        //onclick play aniamtion
        this.playAnimation();
        // check attempt
        if (this.attempt == 0) {
            this.storeScore();
            setTimeout(() => {
                this.newScene();  
            },6500);
        }
        this.choiceBtn.getComponent(cc.Button).interactable = false;
    }

    playAnimation() {

        //new logic
        let result = Math.random();
        if(result >= 0.5){
            this.randomChoice = "Gold";
        } else {
            this.randomChoice = "Grey";
        }

        //play animation
        var anim = this.spinFeather.getComponent(cc.Animation);
        anim.play();

        const randomGold = (Math.random() * (250 - 180) + 180);
        const randomGrey = Math.random() * (120 - 60) + 60;

        
        //pause animation
        if(this.randomChoice == "Gold"){
            setTimeout(() => {
                anim.stop();
            }, randomGold + 5000);
        } else {
            setTimeout(() => {
                anim.stop()
            }, randomGrey + 5000);
        }
        
        this.compareChoice(this.choice);
    }


    compareChoice(choice: string) {
        //compare choice to computer
        if (this.randomChoice == this.choice) {
            //set a delay then do 1 & 2
            setTimeout(() => {
                //1. show win and spin 
                this.winText.active = true;
                if(this.attempt > 0){
                    this.spinAgainBtn.active = true;
                }
                //2. add score
                this.gainScore();
            }, 5100);

        } else {
            setTimeout(() => {
                this.loseText.active = true;
                if(this.attempt > 0){
                    this.spinAgainBtn.active = true;
                }
            }, 5100);
        }

        //decrease the attempt 
        this.attempt -= 1;
        this.showAttempt.string = "Attempt: " + this.attempt.toString();
    }

    //add score
    gainScore() {
        this.playerScore += 1;
        this.score.string = "Score: " + this.playerScore.toString();
    }

    spinAgain() {
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
    }

    //store score
    storeScore() {
        cc.sys.localStorage.setItem('playerScore', this.playerScore);
    }

    newScene(){
        cc.director.loadScene('final');
    }
}
