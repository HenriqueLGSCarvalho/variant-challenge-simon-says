import Phaser from 'phaser';
import { SpinePlugin } from '@esotericsoftware/spine-phaser-v4';

/** Portrait 9:16 — same aspect as Variant games (e.g. 720×1280). */
const VIEW_W = 720;
const VIEW_H = 1280;

/** Shared Variant man rig — see public/spine/man/animations.json & ANIMATIONS.md */
const DEMO_WALK = 'Walk';
const DEMO_JUMP = 'Jump';

const SIMON = 'Henrique';

class HelloScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HelloScene' });
    this.hero = null;
    this.currentAnimation = 'thinking';
    this.walkSpeed = 0;
    this.direction = 1;
    
    // additional game start logic for simon says
    this.started = false;
    this.currentPromptKey = 'none';
    this.currentPrompt = 'none';
    this.currentAction = 'none';
    this.score = 0;
  }
  
  preload() {
    this.load.spineJson('man', '/spine/man/skeleton.json');
    this.load.spineAtlas('manAtlas', '/spine/man/skeleton.atlas', true);
  }

  create() {
    const { width, height } = this.scale;
    
    // Beginning Prompt for Users
    const introduction = SIMON + 'Says — Press SPACE to begin!';
    const gameMessage = this.add
      .text(width / 2, 20, introduction, {
        fontSize: '25px',
        color: 'rgb(139, 185, 137)',
        fontFamily: 'system-ui, sans-serif'
      })
      .setOrigin(0.5, 0);
    
    // Scoreboard that keeps track of player's score for that round
    const scoreboard = this.add
      .text(width / 2, height - 36, `Score: ${this.score}`, {
        fontSize: '25px',
        color: 'rgb(139, 185, 137)'
      })
      .setOrigin(0.5, 1);

    this.hero = this.add.spine(width * 0.2, height * 0.72, 'man', 'manAtlas');
    this.hero.setDepth(10);
    this.hero.setScale(0.28);
    this.hero.animationState.data.defaultMix = 0.15;
    this.hero.animationState.setAnimation(0, this.currentAnimation, true);
    this.hero.skeleton.scaleX = Math.abs(this.hero.skeleton.scaleX);

    /** Game Logic */

    const prompts = {
      jump         : SIMON + ' Says Jump',
      no_Jump      : 'Jump',
      crouch       : SIMON + ' Says Crouch',
      no_Crouch    : 'Crouch',
      dance        : SIMON + ' Says Dance',
      no_dance     : 'Dance',
      backflip     : SIMON + ' Says Backflip',
      no_backflip  : 'Backflip',
      play_dead    : SIMON + ' Says Play Dead',
      no_play_dead : 'Play Dead',
      call_mom     : SIMON + ' Says Call Your Mom',
      no_call_mom  : 'Call Your Mom',
      send_kiss    : SIMON + ' Says Send Kiss',
      no_send_kiss : 'Send Kiss'
    };
    
    // Resets game state and prompts player that the game is over
    const gameOver = () => {
      gameMessage.setText('Incorrect Action! ' + SIMON + ' is sad :(');
      gameMessage.setFontSize('25px')

      this.hero.animationState.setAnimation(0, 'CryingEffect', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);

      this.promptTimer.remove();
      this.currentAction = 'none';
      this.currentPromptKey = 'none'
      this.currentPrompt = 'none';

      this.time.delayedCall(5000, () => {
        gameMessage.setText(introduction);
        gameMessage.setFontSize('25px')
        this.started = false;
        this.walkSpeed = 0;
        this.direction = 1;
        this.score = -1;
      });
    };

    /** Key Bindings */

    // Send Kiss
    this.input.keyboard?.on('keydown-V', () => {
      this.hero.animationState.setAnimation(0, 'FlyingKiss', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);

      
      if(this.currentPrompt !== prompts.send_kiss && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to send kiss");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'send_kiss'
      } 
    });

    // Calling
    this.input.keyboard?.on('keydown-B', () => {
      this.hero.animationState.setAnimation(0, 'CallingGesture', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);

      
      if(this.currentPrompt !== prompts.call_mom && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to call mom");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'call_mom'
      } 
    });

    // Play dead
    this.input.keyboard?.on('keydown-L', () => {
      this.hero.animationState.setAnimation(0, 'Faint', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);

      
      if(this.currentPrompt !== prompts.play_dead && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to play dead");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'play_dead'
      } 
    });

    // Backflip
    this.input.keyboard?.on('keydown-K', () => {
      this.hero.animationState.setAnimation(0, 'Backflip', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);
      
      
      if(this.currentPrompt !== prompts.backflip && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to backflip");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'backflip'
      } 
    });

    // Dance
    this.input.keyboard?.on('keydown-J', () => {
      this.hero.animationState.setAnimation(0, 'Dance', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);
      
      
      if(this.currentPrompt !== prompts.dance && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to dance");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'dance'
      } 
    });

    // Crouch
    this.input.keyboard?.on('keydown-S', () => {
      this.hero.animationState.setAnimation(0, 'BlockCrouch', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);

      if(this.currentPrompt !== prompts.crouch && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to crouch");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'crouch'
      }
    });

    // Jump
    this.input.keyboard?.on('keydown-W', () => {
      this.hero.animationState.setAnimation(0, DEMO_JUMP, false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);
      
      if(this.currentPrompt !== prompts.jump && this.currentPrompt !== 'none') {
        console.log("Wrong Key Pressed! Simon did not say to jump");
        gameOver();
      } else if(this.started) {
        this.currentAction = 'jump'
      }
    });
    
    // Turn Left
    this.input.keyboard?.on('keydown-A', () => {
      this.hero.skeleton.scaleX = -Math.abs(this.hero.skeleton.scaleX);
      this.direction = -1;
    });
    
    // Turn Right
    this.input.keyboard?.on('keydown-D', () => {
      this.hero.skeleton.scaleX = Math.abs(this.hero.skeleton.scaleX);
      this.direction = 1;
    });
    
    // Increase Speed (up to speedLimit)
    this.input.keyboard?.on('keydown-E', () => {
      const speedLimit = 5000
      if(this.walkSpeed < speedLimit)  this.walkSpeed += 50;
    });

    // Decrease Speed (down to zero)
    this.input.keyboard?.on('keydown-Q', () => {
      if(this.walkSpeed > 0) this.walkSpeed -= 50;
    });
    
    // Start and Run Game
    this.input.keyboard?.on('keydown-SPACE', () => {
      if(this.started === false) {
        this.started = true;
        const delay = 1000; // 1 second
        const timer = ['1', '2', '3', "START!", ""];

        timer.forEach((t, i) => {
          this.time.delayedCall(delay * (i + 1), () => {
            gameMessage.setText(t);
            gameMessage.setFontSize('100px')
          })
        })
        
        // Runs until game is over; controller sending prompts to user every *delay* seconds
        this.time.delayedCall(delay * timer.length, () => {
          this.currentAction = 'none' // in case players make an action during the timer stage
          this.promptTimer = this.time.addEvent({
            delay: 2000 + Math.random() * 2000,
            loop: true,
            callback: () => {
              if(!this.currentPromptKey.includes("no_") && this.currentPromptKey != this.currentAction) {
                console.log("Did not press a key! Must respond to simon");
                gameOver();
                return;
              }
              this.score++;
              scoreboard.setText(`Score: ${this.score}`)

              this.currentPromptKey = Phaser.Utils.Array.GetRandom(Object.keys(prompts));
              this.currentPrompt    = prompts[this.currentPromptKey];

              gameMessage.setText(this.currentPrompt);
              gameMessage.setFontSize('50px')
            }
          })
        })
     }
    })

  }
   
  /** Updates the game state every frame */
  update(_, deltaMs) {
    if (!this.hero) return;
    
    const dt = deltaMs / 1000;
    const w = this.scale.width;
    this.hero.x += this.walkSpeed * this.direction * dt;
    const margin = 72; 
    
    /** Changes if the hero is standing still, walking, or running depending on its speed */
    if(this.walkSpeed >= 800 && this.currentAnimation !== 'Run') {
      this.hero.animationState.setAnimation(0, 'Run', true);
      this.currentAnimation = 'Run';
    } else if (this.walkSpeed > 0 && this.walkSpeed < 800 && this.currentAnimation !== DEMO_WALK) {
      this.hero.animationState.setAnimation(0, DEMO_WALK, true);
      this.currentAnimation = DEMO_WALK;
    } else if (this.walkSpeed == 0 && this.currentAnimation !== 'thinking') {
      this.hero.animationState.setAnimation(0, 'thinking', true);
      this.currentAnimation = 'thinking';
    }
      
    //** flips hero's direction once they have passed the (w - margin) border */
    if (this.hero.x > w - margin) {
      this.hero.x = w - margin;
      this.direction = -1;
      this.hero.skeleton.scaleX = -Math.abs(this.hero.skeleton.scaleX);
    } else if (this.hero.x < margin) {
      this.hero.x = margin;
      this.direction = 1;
      this.hero.skeleton.scaleX = Math.abs(this.hero.skeleton.scaleX);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  parent: 'app',
  width: VIEW_W,
  height: VIEW_H,
  backgroundColor: '#2d2d44',
  scene: [HelloScene],
  plugins: {
    scene: [{ key: 'SpinePlugin', plugin: SpinePlugin, mapping: 'spine' }]
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);
