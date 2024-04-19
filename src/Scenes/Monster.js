class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.LeftLegX = 350;
        this.RightLegX = 250;
        this.LegY = 455;

        this.RightArm1X = 220;
        this.LeftArm1X = 380;
        this.Arm1Y = 400;

        this.eyeX = 300;
        this.eyeY = 300;

        this.mouthX = 300;
        this.mouthY = 350;
        
        this.Akey = null;
        this.Dkey = null;

        this.Sprite_list = [];
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'

        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        my.sprite.leftLeg = this.add.sprite(this.LeftLegX, this.LegY, "monsterParts", "leg_whiteC.png");
        my.sprite.rightLeg = this.add.sprite(this.RightLegX , this.LegY, "monsterParts", "leg_whiteC.png");
        my.sprite.rightLeg.flipX = true;

        my.sprite.leftArm1 = this.add.sprite(this.LeftArm1X, this.Arm1Y, "monsterParts", "arm_whiteA.png");
        my.sprite.rightArm1 = this.add.sprite(this.RightArm1X, this.Arm1Y, "monsterParts", "arm_whiteA.png");
        my.sprite.rightArm1.flipX = true;

        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_whiteC.png");

        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_red.png");
        my.sprite.mouthClosed = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouthSmile = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthA.png");
        my.sprite.mouthSmile.visible = false;

        this.Sprite_list = [my.sprite.leftLeg, my.sprite.rightLeg, my.sprite.leftArm1, 
                            my.sprite.rightArm1, my.sprite.body, my.sprite.eye, 
                            my.sprite.mouthClosed, my.sprite.mouthSmile];

        this.input.keyboard.on("keydown", function(event){
            switch(event.code){
                case "KeyS":
                    console.log("smile");
                    my.sprite.mouthClosed.visible = false;
                    my.sprite.mouthSmile.visible = true;
                    break;
                case "KeyF":
                    console.log("fangs");
                    my.sprite.mouthClosed.visible = true;
                    my.sprite.mouthSmile.visible = false;
                    break;
                case "KeyA":
                    console.log("Moving left")
                    break;
                case "KeyD":
                    console.log("moving right")
                    break;
            }
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        if(this.Akey.isDown){
            for(let i = 0; i<this.Sprite_list.length; i++){
                this.Sprite_list[i].x -= 1;
            }
        }

        if(this.Dkey.isDown){
            for(let i = 0; i<this.Sprite_list.length; i++){
                this.Sprite_list[i].x += 1;
            }
        }
       
    }

}