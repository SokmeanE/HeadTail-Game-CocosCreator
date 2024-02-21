const { ccclass, property } = cc._decorator;

@ccclass
export default class MainGame extends cc.Component {

  @property(cc.Label)
  playerName: cc.Label = null;

  @property(cc.Label)
  showAttempt: cc.Label = null;

  @property(cc.Node)
  grey: cc.Node = null;

  @property(cc.Node)
  gold: cc.Node = null;

  @property(cc.Node)
  choiceBtn: cc.Node = null;

  @property(cc.Prefab)
  winLosePrefab: cc.Prefab = null;
  winLoseNode: cc.Node = null;

  @property(cc.Node)
  spinAgainBtn: cc.Node = null;

  @property(cc.Node)
  spinFeather: cc.Node = null;

  @property(cc.Toggle)
  isSpeedUp: cc.Toggle = null;

  @property(cc.Label)
  speedText: cc.Label = null;

  @property(cc.Prefab)
  checkMarkPrefab: cc.Prefab = null;
  checkMark: cc.Node = null;

  @property(cc.Label)
  score: cc.Label = null;
  playerScore: number = null;
  attempt: number = null;
  choice: string = '';
  randomChoice: string = '';
  randomGold: number = 0;
  randomGrey: number = 0;
  results: any[] = [];

  onLoad() {
    //get player name
    this.getPlayerName();
    this.playerScore = 100;
    this.score.string = "Score: " + this.playerScore.toString();

    //hide spinAgain 
    this.spinAgainBtn.active = false;

    //set value to attempt
    this.attempt = 10;

    //instance prefab
    this.checkMark = cc.instantiate(this.checkMarkPrefab);

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

    //check remark
    this.node.addChild(this.checkMark);
    this.checkMark.setPosition(-220, -200, 0); 

    //interactable button
    this.grey.getComponent(cc.Button).interactable = false;
    this.gold.getComponent(cc.Button).interactable = false;
    this.choiceBtn.getComponent(cc.Button).interactable = true;
  }

  goldBtn() {
    //if click set choice to gold
    this.choice = "Gold";

    //check remark
    this.node.addChild(this.checkMark);
    this.checkMark.setPosition(360, -215, 0); 
    this.checkMark.angle = -10;

    //interactable button
    this.gold.getComponent(cc.Button).interactable = false;
    this.grey.getComponent(cc.Button).interactable = false;
    this.choiceBtn.getComponent(cc.Button).interactable = true;
  }

  goBtn() {
    this.node.removeChild(this.checkMark);

    //deduction 10 for play
    this.attempt -= 1;
    this.showAttempt.string = "Attempt: " + this.attempt.toString();
    this.deduction();

    //onclick play aniamtion
    this.playAnimation();
    
    // check attempt
        if(this.attempt == 0){
            this.storeRes();
        setTimeout(() => {
            this.newScene();  
        }, (this.isSpeedUp.isChecked == true) ? 3000 : 5500);
    }
    this.choiceBtn.getComponent(cc.Button).interactable = false;
  }

  playAnimation() {
    //random the results
    let result = Math.random();
    if(result >= 0.5){
        this.randomChoice = "Gold";
    } else {
        this.randomChoice = "Grey";
    }

    //play animation
    var anim = this.spinFeather.getComponent(cc.Animation);
    anim.play();
      if (this.isSpeedUp.isChecked == false){
          //normal speed
        this.randomGold = (Math.random() * (250 - 180) + 180);
        this.randomGrey = (Math.random() * (120 - 60) + 60);
        anim.getAnimationState('featherAnim').speed = 1;

        if(this.randomChoice == "Gold"){
            setTimeout(() => {
                anim.stop();
            }, this.randomGold + 5000);
        } else {
            setTimeout(() => {
                anim.stop()
            }, this.randomGrey + 5000);
        }

      } else {
        //speedup
        anim.getAnimationState('featherAnim').speed = 2;
        this.randomGold = (Math.random() * (125 - 90) + 90) + 2500;
        this.randomGrey = (Math.random() * (60 - 30) + 30) + 2500;

        if(this.randomChoice == "Gold"){
            setTimeout(() => {
                anim.stop();
            }, this.randomGold);
        } else {
            setTimeout(() => {
                anim.stop()
            }, this.randomGrey);
        }
      }
    
    
    this.compareChoice(this.choice);
  }


  compareChoice(choice: string) {
    this.winLose();
    let winLostLabel = this.winLoseNode.getComponent(cc.Label);
    //compare choice to computer
    if (this.randomChoice == choice) {
        //push result to array
        this.results.push({ result: this.randomChoice, player: this.choice, score: 10 });
        //set a delay then do 1 & 2
        setTimeout(() => {
            //1. show win and spin 
            winLostLabel.string = "You Win";
            if(this.playerScore > 0){
                this.spinAgainBtn.active = true;
            }
            //2. add score
            this.gainScore();
        }, (this.isSpeedUp.isChecked == true) ? 2600 : 5100);

    } else {
        //result to array
        this.results.push({ result: this.randomChoice, player: this.choice, score: -10 });
        setTimeout(() => {
            winLostLabel.string = "You Lose";
            if(this.playerScore > 0){
                this.spinAgainBtn.active = true;
            }
        }, (this.isSpeedUp.isChecked == true) ? 2600 : 5100);
    }
      
  }

  //display win or lost
  winLose(){
    this.winLoseNode = cc.instantiate(this.winLosePrefab);
    this.winLoseNode.setPosition(0,160,0);
    this.node.addChild(this.winLoseNode);
  }

  //add score
  gainScore() {
    this.playerScore += 20;
    this.score.string = "Score: " + this.playerScore.toString();
  }

  //deduct score 
  deduction(){
      this.playerScore -= 10;
      this.score.string = "Score: " + this.playerScore.toString();
  }
  
  //spinAgain Button
  spinAgain() {
    //hide the win, lose and spin button
    this.node.removeChild(this.winLoseNode);
    this.spinAgainBtn.active = false;

    //enabel button
    this.grey.getComponent(cc.Button).interactable = true;
    this.gold.getComponent(cc.Button).interactable = true;
  }

  //store score
  storeRes() {
    cc.sys.localStorage.setItem('playerScore', this.playerScore);
  }

  newScene(){
    cc.sys.localStorage.setItem('results', JSON.stringify(this.results));
    cc.director.loadScene('final');
  }

  nextScene(){
    this.newScene();
  }
}
