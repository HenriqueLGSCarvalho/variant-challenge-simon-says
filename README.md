# Variant Game Challenge — Simon Says Remake

## Overview
This project is a remake of the popular kid's game Simon Says using primarily the Spine and Phaser Libraries. I named it Henrique Says for a little personal touch. The rules are essentially identical to Simon Says; if a prompt includes "Henrique Says" you want to follow its instructions, if it doesn't, you don't want to follow it. 

## Features
This project was coded to be compatible with PC, and you will only need a keyboard in order to get the full experience. 

After starting the game, and after each prompt, there will be a 2-4 second delay before the next prompt appears. The user must correctly react to each prompt, or the game will end, showing you your final score for that round and allowing you to start a new game.

## Controls

#### Cosmetical Keybinds :
- E - Speed Up; increases the player's speed (fully cosmetical)
- Q - Speed Down; decreases the player's speed (fully cosmetical)
- A - Turn Left; turns the player's body to the left side (fully cosmetical)
- D - Turn Right; turns the player's body to the Right side (fully cosmetical)
#### Simon Says Gameplay Keybinds :
- W - Jump; the player jumps upwards
- S - Crouch; the player crouches downwards
- V - Send Kiss; the player sends out a kiss onto the panel
- B - Call; the player calls their mom
- J - Dance; the player breaks out in a little dance
- K - Backflip; the player performs a backflip
- L - Play Dead; the player falls to the ground and plays dead

The "Cosmetical Keybinds" are purely for extra customization on how a user's game appears to them, and provides no gameplay consequences. 

The "Gameplay Keybinds" are all directly related to possible prompts that the Simon could ask the user, and will all likely be needed in any given playthrough.

## How to Run the Project
1. Clone the GitHub Repository:
    ```bash
   git clone https://github.com/HenriqueLGSCarvalho/variant-challenge-simon-says.git
   ```
2. Move to Project Folder 
    ```bash 
   cd variant-challenge-simon-says
   ```
3. Install Dependencies
    ```bash 
    npm install
    ```
4. Start the Server
   ```bash 
   npm start
   ```
5. If the server is not automatically opened, go to: 
   ```bash
   http://localhost:5175
   ```
6. The game should now be opened and ready to play.

## Technical Challenges 
I had a lot of fun creating this project, but there were a few moments where I had to battle with some challenges.

Notably, I had to get accustomed to both the Spine and Phaser libraries, as I had no experience with either. Going over the documentation and experimenting with changes in my code helped me overcome my unfamiliarity, and successfully persevere in creating this project. 

A specific example of me struggling with the Spine library was specificially the distinction between setAnimation() and addAnimation(). I was originally using setAnimation() for all of my instances of animations, which was causing severe issues with the fluidity of movements, and continuity of previous animations. After realizing this issue, I was able to make the necessary changes, and fixed most of the fluidity issues within this project. 

## What I Would Add with More Time
If I had another 48 hours to work on this project, I would:

- Add more **complex prompts**; instead of simply asking the user to "dance" or to "jump", I would add prompts that would give combinations of multiple other prompts. An example of this could be "Henrique Says Jump and then Dance".
- Add **more details** to the frame/sandbox; potentially adding boxes, platforms, and/or other obstacles that the player could jump onto or crouch under, which would likely lead the game to feel more engaging and alive. This could also be tied into the more complex prompts, allowing for interesting interactions between the player and the environment.
- Add a **session high score** section to the leaderboard; although a minor detail, this could be an addition that users appreciate and would allow them to better compare their current score with their record score. Definitely would be a bonus for competitive players like me.