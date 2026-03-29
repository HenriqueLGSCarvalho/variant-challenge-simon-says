import Phaser from 'phaser';
import { SpinePlugin } from '@esotericsoftware/spine-phaser-v4';

/** Portrait 9:16 — same aspect as Variant games (e.g. 720×1280). */
const VIEW_W = 720;
const VIEW_H = 1280;

/** Shared Variant man rig — see public/spine/man/animations.json & ANIMATIONS.md */
const DEMO_WALK = 'Walk'; //Walk
const DEMO_JUMP = 'Jump'; //Jump

class HelloScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HelloScene' });
    this.hero = null;
    this.currentAnimation = 'thinking';
    this.walkSpeed = 0; //200 defualt
    this.direction = 1;
  }
  
  preload() {
    this.load.spineJson('man', '/spine/man/skeleton.json');
    this.load.spineAtlas('manAtlas', '/spine/man/skeleton.atlas', true);
  }

  create() {
    const { width, height } = this.scale;
    
    /** Text */
    this.add
      .text(width / 2, 20, 'Hello world — shared man Spine walks (public/spine/man/)', {
        fontSize: '14px',
        color: '#eaeaea',
        fontFamily: 'system-ui, sans-serif'
      })
      .setOrigin(0.5, 0);

    this.add
      .text(width / 2, 44, 'Gray silhouette = CDN placeholder base sheet; npm run copy-spine for real skin', {
        fontSize: '11px',
        color: '#8a9',
        fontFamily: 'system-ui, sans-serif'
      })
      .setOrigin(0.5, 0);

    this.add
      .text(width / 2, height - 36, 'Animations: public/spine/man/animations.json & ANIMATIONS.md', {
        fontSize: '16px',
        color: '#889'
      })
      .setOrigin(0.5, 1);

    this.hero = this.add.spine(width * 0.2, height * 0.72, 'man', 'manAtlas');
    this.hero.setDepth(10);
    this.hero.setScale(0.28);
    this.hero.animationState.data.defaultMix = 0.15;
    this.hero.animationState.setAnimation(0, this.currentAnimation, true);
    this.hero.skeleton.scaleX = Math.abs(this.hero.skeleton.scaleX);

    /** Key Bindings */
    this.input.keyboard?.on('keydown-W', () => {
      this.hero.animationState.setAnimation(0, DEMO_JUMP, false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);
    });

    this.input.keyboard?.on('keydown-S', () => {
      this.hero.animationState.setAnimation(0, 'BlockCrouch', false);
      this.hero.animationState.addAnimation(0, this.currentAnimation, true, 0);
    });

    this.input.keyboard?.on('keydown-A', () => {
      this.hero.skeleton.scaleX = -Math.abs(this.hero.skeleton.scaleX);
      this.direction = -1;
    });

    this.input.keyboard?.on('keydown-D', () => {
      this.hero.skeleton.scaleX = Math.abs(this.hero.skeleton.scaleX);
      this.direction = 1;
    });

    this.input.keyboard?.on('keydown-E', () => {
      if(this.walkSpeed < 5000)  this.walkSpeed += 50;
    });

    this.input.keyboard?.on('keydown-Q', () => {
      if(this.walkSpeed > 0) this.walkSpeed -= 50;
    });

  }
   
  /** Updates the game state every  frame */
  update(_, deltaMs) {
    if (!this.hero) return;
    
    /** deltaMS in seconds, width of playable area, hero's x position*/
    const dt = deltaMs / 1000;
    const w = this.scale.width;
    this.hero.x += this.walkSpeed * this.direction * dt;

    /**
     * Temp Notes for margin
     * = -100: Character walks fully off screen (perfect amount) before switched sides
     * =   72: Character walks the perfect distance before switching sides
     */
    const margin = 72; 

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

/** Game configurations - Keep the same for now*/
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
