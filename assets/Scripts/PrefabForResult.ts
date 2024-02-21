const {ccclass, property} = cc._decorator;

@ccclass
export default class PrefabForResult extends cc.Component {

  @property(cc.Sprite)
  SpriteRes: cc.Sprite = null;

  @property(cc.SpriteFrame)
  goldSprite: cc.SpriteFrame = null;

  @property(cc.SpriteFrame)
  greySprite: cc.SpriteFrame = null;

}
