const history = document.getElementById('history');
const input = document.getElementById('input');
const cursor = document.getElementById('cursor');
let commands = new Map();
commands.set("help", "Available Commands: 'help', 'abilities', 'progress', 'decrypt {data}'")
commands.set("progress", "You do not have sufficent privileges to this command.")

let ProperCommands = new Map();
ProperCommands.set("abilities", function abilities() {
    const line = document.createElement('DIV');
    line.innerHTML = `<div>
ALL CONTENT SHOWED IS SUBJECT TO CHANGE. BE WARNED.
<br>
<h2> RUNNING </h2>
The player is able to run by holding [Left Shift]. This will increase their movement speed, but drains stamina.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/run.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br>
<h2> CROUCHING </h2>
The player is able to crouch by pressing [Q]. This will slow them down, however they will be able to crawl<br>under gaps they couldn't walk under.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/crouch.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br>
<h2> SLIDING </h2>
The player is able to slide by pressing [Q] while RUNNING.<br>This will give the player a temporary boost in speed towards their movement direction<br>but they will slow down and eventually stop after time.<br>Sliding will drain 100% of your stamina.<br>If the player is in a gap where they would not be able to crouch<br>they will continue sliding until they can either stand or crouch.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/slide.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br>
<h2> AIR DIVING </h2>
The player is able to air dive by pressing [Q] while airborne.<br>This will set the player's upwards velocity to straight down immediately.<br>This will also cancel any momentum the player has.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/dive.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br>
<h2> MOMENTUM </h2>
Moving platforms will transfer their velocity to the player, keeping platforming relative to the floor the player is on.<br>Momentum is preserved when jumping.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/momentum.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br>
<h2> OMNIDIRECTIONAL CLIMBING </h2>
The player is able to move in any direction while on a truss. This is fully detached from Roblox's systems.<br>Due to being able to move in any direction on trusses, movement will be slightly different than normal Roblox climbing.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/climb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<br>
<h2> SLIDE JUMPING </h2>
If player jumps on the very edge or while in coyote time while sliding, they will gain a speed boost and jump very far.
<br>
<video width="640" height="480" autoplay muted loop>
  <source src="js/slidejump.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</div>`;
    line.scrollTop = line.scrollHeight;
    history.appendChild(line);
})

//ProperCommands.set("progress", function progress() {
//    const line = document.createElement('DIV');
////    line.innerHTML = `<div>
////MAIN GAME LOOP PROGRESS: 82%<br>GAME ROOMS PROGRESS: 6.5%<br>LOBBY PROGRESS: 85%<br>UI PROGRESS: 60%
////</div>`;
//    line.scrollTop = line.scrollHeight;
//    history.appendChild(line);
//})

function focusAndMoveCursorToTheEnd(e) {  
  input.focus();
  
  const range = document.createRange();
  const selection = window.getSelection();
  const { childNodes } = input;
  const lastChildNode = childNodes && childNodes.length - 1;
  
  range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}

function handleCommand(command) {
    const line = document.createElement('DIV');
    line.textContent = `> ${command}`;
    line.scrollTop = line.scrollHeight;
    history.appendChild(line);
    if (commands.get(command)) {
        const line2 = document.createElement('DIV');
        line2.style.cssText = 'style="white-space: pre-wrap"';
        line2.textContent += `${commands.get(command)}`;
        line2.scrollTop = line2.scrollHeight;
        history.appendChild(line2);
    }

    if (command.split(" ")[0] == "decrypt") {
        const line2 = document.createElement('DIV');
        line2.style.cssText = 'style="white-space: pre-wrap"';
        line2.textContent += "unable to decrypt";
        line2.scrollTop = line2.scrollHeight;
        history.appendChild(line2);
    }

    if (ProperCommands.get(command)) {
        ProperCommands.get(command)();
    }
}

// Every time the selection changes, add or remove the .noCursor
// class to show or hide, respectively, the bug square cursor.
// Note this function could also be used to enforce showing always
// a big square cursor by always selecting 1 chracter from the current
// cursor position, unless it's already at the end, in which case the
// #cursor element should be displayed instead.
document.addEventListener('selectionchange', () => {
  if (document.activeElement.id !== 'input') return;
  
  const range = window.getSelection().getRangeAt(0);
  const start = range.startOffset;
  const end = range.endOffset;
  const length = input.textContent.length;
  
  if (end < length) {
    input.classList.add('noCaret');
  } else {
    input.classList.remove('noCaret');
  }
});

input.addEventListener('input', () => {    
  // If we paste HTML, format it as plain text and break it up
  // input individual lines/commands:
  if (input.childElementCount > 0) {
    const lines = input.innerText.replace(/\n$/, '').split('\n');
    const lastLine = lines[lines.length - 1];
    
    for (let i = 0; i <= lines.length - 2; ++i) {
      handleCommand(lines[i]);
    }
  
    input.textContent = lastLine;
    
    focusAndMoveCursorToTheEnd();
  }
  
  // If we delete everything, display the square caret again:
  if (input.innerText.length === 0) {
    input.classList.remove('noCaret');  
  }  
});

document.addEventListener('keydown', (e) => {   
  // If some key is pressed outside the input, focus it and move the cursor
  // to the end:
  if (e.target !== input) focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', (e) => {    
  if (e.key === 'Enter') {
    e.preventDefault();
        
    handleCommand(input.textContent);    
    input.textContent = '';
    focusAndMoveCursorToTheEnd();
  }
});

// Set the focus to the input so that you can start typing straigh away:
input.focus();