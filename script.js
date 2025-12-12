class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  length(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
};

class ASCIIText {
    constructor(ASCII, url, x, y){
        this.ASCII = ASCII;
        this.url = url;
        this.x = x; this.y = y;
    }
}

function isClickInBox(cx, cy, x, y, w, h){
    if((cx >= x) && (cy >= y)){
        if((cx <= (x + w)) && (cy <= (y + h))){
            return 1;
        }
    }
    return 0;
}

const para = document.getElementById("PARA");
para.style.userSelect = 'none';
para.style.cursor = 'none';

document.body.style.overflow = 'hidden';
document.body.style.position = 'fixed';


const header = document.getElementById("header");
// header.textContent = "welcome! use W and S to scroll";
//TODO: uncomment this when you add things below the first "page"
//TODO: add option to make text selectable


const width = (window.outerWidth / 12 * 1.65) + 1;
const height = (window.innerHeight / 12) - 1;

let verticalScroll = 0;
let clicked = 0;

document.addEventListener('keypress', function(event) {
    if(event.key == 's'){
        verticalScroll += 5;
    }
    if(event.key == 'w'){
        verticalScroll = ((verticalScroll -= 5) <= 0) ? 0 : verticalScroll;
    }
});
document.addEventListener('mousedown', function(event){
    clicked = 1;

    const paraRect = para.getBoundingClientRect();
    
    const relativeX = event.clientX - paraRect.left + 8;
    const relativeY = event.clientY - paraRect.top - 2;

    const charWidth = window.innerWidth / width;
    const charHeight = window.innerHeight / height;

    mousePosX = relativeX / charWidth;
    mousePosY = relativeY / charHeight;
});
document.addEventListener('mouseup', function(event){
    clicked = 0;
});

document.addEventListener('mousemove', function(event){
    const paraRect = para.getBoundingClientRect();
    
    const relativeX = event.clientX - paraRect.left + 8;
    const relativeY = event.clientY - paraRect.top - 2;

    const charWidth = window.innerWidth / width;
    const charHeight = window.innerHeight / height;

    mousePosX = relativeX / charWidth;
    mousePosY = relativeY / charHeight;

})

let mousePosX = 1;
let mousePosY = 1;

let val = [
    [" ", " ", " ", " "],
    [".", ",", "'", "`"],
    ["▖", "▗", "▘", "▝"],
    ["▚", "▞", "▚", "▞"],
    ["▙", "▛", "▜", "▒"],
    ["▊", "▓", "▉", "▟"],
    ["█", "█", "█", "█"]
];

// miniwi font
let barkhausen = [
"▄ ▄▖▄▖▖▖▖▖▄▖▖▖▄ ▄▖▖ ▖",
"▙▘▌▌▙▘▙▘▙▌▌▌▌▌▚ ▙▖▛▖▌",
"▙▘▛▌▌▌▌▌▌▌▛▌▙▌▄▌▙ ▌▝▌"
];

let mineSweeper = [
"▄▖      ▌ ▌          ▘                   ",
"▐ ▛▌▌▌▛▘▛▌▛▌▀▌▛▘  ▛▛▌▌▛▌█▌▛▘▌▌▌█▌█▌▛▌█▌▛▘",
"▐ ▙▌▙▌▙▖▌▌▙▌█▌▌   ▌▌▌▌▌▌▙▖▄▌▚▚▘▙▖▙▖▙▌▙▖▌ ",
"                                   ▌     "
];

let lampProgrammer = [
"▖          ▄▖                    ",
"▌ ▀▌▛▛▌▛▌  ▙▌▛▘▛▌▛▌▛▘▀▌▛▛▌▛▛▌█▌▛▘",
"▙▖█▌▌▌▌▙▌  ▌ ▌ ▙▌▙▌▌ █▌▌▌▌▌▌▌▙▖▌ ",
"       ▌         ▄▌              "
];

let softwares = [
    new ASCIIText(barkhausen, "BARKHAUSEN.html", 5, 10),
    new ASCIIText(mineSweeper, "https://github.com/Syrophoam/MineSweeperForTouchBar", 10, 16),
    new ASCIIText(lampProgrammer, "https://github.com/Syrophoam/lampProgrammer", 35, 9)
];

let LPFDF = [
"▜                       ▜    ",
"▐ ▀▌▛▘▛▌█▌  ▛▌▛▘▛▌▛▌█▌▛▘▐ ▌▌ ",
"▐▖█▌▌ ▙▌▙▖  ▙▌▌ ▙▌▙▌▙▖▌ ▐▖▙▌ ",
"      ▄▌    ▌     ▌       ▄▌ ",
"▐▘         ▗ ▗    ▌   ▌  ▗   ",
"▜▘▛▌▛▘▛▛▌▀▌▜▘▜▘█▌▛▌  ▛▌▀▌▜▘▀▌",
"▐ ▙▌▌ ▌▌▌█▌▐▖▐▖▙▖▙▌  ▙▌█▌▐▖█▌",
"                             ",
"▐▘▘▜                         ",
"▜▘▌▐ █▌                      ",
"▐ ▌▐▖▙▖                      "
];

let musics = [
    new ASCIIText(LPFDF, "https://syrophoam.bandcamp.com/album/large-properly-formatted-data-file", 5, 10)
];

function drawBox(x, y, w, h, currentContent, title, items){
    let chars = Array.from(currentContent);
    let titleLines = title.length;
    let titleLineLen = title[0].length;
    let titleStart = (w / 2) - (titleLineLen / 2);
    let titleTxt = title.join('');
    const contentLen = currentContent.length;


    for(let i = 0; i < h; i++){
        let offset = Math.floor(Math.random() * 1.01);
        for(let j = 0; j < w; j++){
            let index = ((i + y) * (width + 1)) + j + x;

            if (index < chars.length) {
                let char = " ";
                if(i == 0)          { char = "🬂"; }
                if(i == (h - 2))    { char = "🬭"; }
                
                if(j == 0)          { char = "▌"; }
                if(j == (w - 2))    { char = "▐"; }
                
                if((i == 0) && (j == 0))        { char = "🬕" ;}
                if((i == 0) && (j == (w - 2)))  { char = "🬨"; }
                if((i == (h - 2) && (j == 0)))  { char = "🬲"; }
                if((i == (h - 2) && (j == (w - 2)))) { char = "🬷"; }

                let charT = currentContent[index];
                let lineIndex = -1;

                for (let i = 0; i < val.length; i++) {
                    if (val[i].includes(charT)) {
                        lineIndex = i; 
                        break;
                    }
                }

                let shadow = (i >= 1 && i <= h - 2) && (j === w - 1);
                shadow += (i === h - 1) && (j >= 1 && j <= w - 2);
                shadow += (i === h - 1) && (j === w - 1);

                let shadowVal = (lineIndex < 3) ? 2 : 4;

                let shadowChar = val[shadowVal][Math.floor(Math.random() * 4)];

                if(shadow){
                    char = shadowChar;
                }
                
                let emptyChar = (lineIndex < 3) ? " " : "█";

                if((i == 0) && (j == (w - 1))) { char = emptyChar; }
                if((j == 0) && (i == (h - 1))) { char = emptyChar; }
                
                if((i >= 1) && (i <= titleLines)){
                    if((j >= titleStart) && (j <  (titleStart + titleLineLen))){
                        let titleLineIndex = i - 1;
                        let titleIndex = j - titleStart;
                        char = titleTxt[(titleLineIndex * (titleLineLen )) + titleIndex];
                    }
                }


                for(let k = 0; k < items.length; k++){
                    if((i >= items[k].y) && (i < (items[k].y + items[k].ASCII.length))){
                        if((j >= items[k].x) && (j < (items[k].x + items[k].ASCII[0].length))){
                            // char = `${'<a href="' + items[k].url + '">' + items[k].ASCII[i - items[k].y].at(j - items[k].x) + '</a>'}`;
                            char = items[k].ASCII[i - items[k].y].at(j - items[k].x);
                        }
                    }
                }
                
                

                chars[index] = char;
            }
        }
    }
    return chars.join("");
}


let ASCII_LINES = [
"                                                                                                                                                                                                            ",
"                                           *******          ***** *    **        ***** ***        * ***            ***** **         *****    **          * ***            **             *****   **    **   ",
"                                         *       ***     ******  *  *****     ******  * **      *  ****         ******  ****     ******  *  **** *     *  ****         *****          ******  ***** *****   ",
"                                        *         **    **   *  *     *****  **   *  *  **     *  *  ***       **   *  *  ***   **   *  *   *****     *  *  ***       *  ***         **   *  *  ***** ***** ",
"                                        **        *    *    *  **     * **  *    *  *   **    *  **   ***     *    *  *    *** *    *  *    * *      *  **   ***         ***        *    *  *   * **  * **  ",
"                                         ***               *  ***     *         *  *    *    *  ***    ***        *  *      **     *  *     *       *  ***    ***       *  **           *  *    *     *     ",
"                                        ** ***            **   **     *        ** **   *    **   **     **       ** **      **    ** **     *      **   **     **       *  **          ** **    *     *     ",
"                                         *** ***          **   **     *        ** **  *     **   **     **       ** **      **    ** **     *      **   **     **      *    **         ** **    *     *     ",
"                                           *** ***        **   **     *        ** ****      **   **     **     **** **      *     ** ********      **   **     **      *    **         ** **    *     *     ",
"                                             *** ***      **   **     *        ** **  ***   **   **     **    * *** **     *      ** **     *      **   **     **     *      **        ** **    *     *     ",
"                                               ** ***     **   **     *        ** **    **  **   **     **       ** *******       ** **     **     **   **     **     *********        ** **    *     **    ",
"                                                ** **      **  **     *        *  **    **   **  **     **       ** ******        *  **     **      **  **     **    *        **       *  **    *     **    ",
"                                                 * *        ** *      *           *     **    ** *      *        ** **               *       **      ** *      *     *        **          *     *      **   ",
"                                       ***        *          ***      *       ****      ***    ***     *         ** **           ****        **       ***     *     *****      **     ****      *      **   ",
"                                      *  *********            *********      *  ****    **      *******          ** **          *  *****      **       *******     *   ****    ** *  *  *****           **  ",
"                                     *     *****                **** ***    *    **     *         ***       **   ** **         *     **                  ***      *     **      **  *     **                ",
"                                     *                                ***   *                              ***   *  *          *                                  *                 *                       ",
"                                      **                  ********     ***   **                             ***    *            **                                 **                **                     ",
"                                                        *************  **                                    ******                                                                                         ",
"                                                       *           ****                                        ***                                                                                          ",
"                                                                                                                                                                                                            ",
];
const name = ASCII_LINES.join('\n');

// 
let SOFTWARE = [
'███████╗ ██████╗ ███████╗████████╗██╗    ██╗ █████╗ ██████╗ ███████╗',
'██╔════╝██╔═══██╗██╔════╝╚══██╔══╝██║    ██║██╔══██╗██╔══██╗██╔════╝',
'███████╗██║   ██║█████╗     ██║   ██║ █╗ ██║███████║██████╔╝█████╗  ',
'╚════██║██║   ██║██╔══╝     ██║   ██║███╗██║██╔══██║██╔══██╗██╔══╝  ',
'███████║╚██████╔╝██║        ██║   ╚███╔███╔╝██║  ██║██║  ██║███████╗',
'╚══════╝ ╚═════╝ ╚═╝        ╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝'
 ];

 let MUSIC = [
'███╗   ███╗██╗   ██╗███████╗██╗ ██████╗',
'████╗ ████║██║   ██║██╔════╝██║██╔════╝',
'██╔████╔██║██║   ██║███████╗██║██║     ',
'██║╚██╔╝██║██║   ██║╚════██║██║██║     ',
'██║ ╚═╝ ██║╚██████╔╝███████║██║╚██████╗',
'╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝'
 ];

let dance = [ "🯅", "🯆", "🯇", "🯈" ];
let stars = ["✦", "✧", "✩","✫", "✬", "✭", "✮", "✯", "✰"];
let invStars = ["🬟", "🬴", "🮖", "🮕", "🮗", "🮘", "🮙", "🮚",	"🮛"];

let count = 0;
let clickedRamp = 0;
const intervalId = setInterval(() => {

    count++;
    para.textContent = "";
    if(clicked){
        clickedRamp += 0.05;
        if(clickedRamp >= 1.){ clickedRamp = 1; }
    }else{
        clickedRamp *= 0.6;
        if(clickedRamp <= 0.){ clickedRamp = 0; }
    }
    

    for (let y = 0; y < height; y++) {

        let yScrolled = y + verticalScroll;

        for (let x = 0; x < width; x++) {

            let noiseAmt = (((verticalScroll / 20) + 1) * 10);
            let noiseX = (x + (((Math.random() * 2) - 1) * noiseAmt)) / width;
            let noiseY = (yScrolled + (((Math.random() * 2) - 1) * noiseAmt)) / height;
            let uv = new Vec2(noiseX, noiseY);

            uv.x -= 0.5;
            uv.y -= 0.1;
            let value = uv.length();
            value *= (2 * Math.PI) / 2;
            value = (Math.sin(value + (-count / 20)) * 0.5) + 0.5;

            let mouseCenterUV = new Vec2((noiseX - (mousePosX / width)) / (height / width * 1.65),
                                         noiseY - (mousePosY / height));
            let burst = mouseCenterUV.length();

            if ((yScrolled < ASCII_LINES.length) && (x < ASCII_LINES[yScrolled].length) && (ASCII_LINES[yScrolled].at(x) != " ")) {
                para.textContent += val[Math.floor( Math.abs(value - 1) * 7)][Math.floor(Math.random() * 4)];
            } else if((burst < (clickedRamp * 1.)) && (Math.random() > 0.7)){
                if(value < 0.5){
                    para.textContent += stars[Math.floor(Math.random() * stars.length)];
                }else{
                    para.textContent += invStars[Math.floor(Math.random() * invStars.length)];
                }
                
            } else {
                para.textContent += val[Math.floor(value * 7)][Math.floor(Math.random() * 4)];
            }
        }
        para.textContent += "\n";
    }

    

    para.textContent = drawBox(10, 25 - verticalScroll, 76, 22, para.textContent, SOFTWARE, softwares);
    para.textContent = drawBox(120, 37 - verticalScroll, 61, 24, para.textContent, MUSIC, musics); 

    const mouseX = Math.floor(mousePosX);
    const mouseY = Math.floor(mousePosY);

    let index = (mouseY * (width + 1)) + mouseX;
    let mouseLine = mouseY * (width + 1);

    let chars = Array.from(para.textContent);
    for(let i = 0; i < mouseX; i++){
        let mouseLineIndex = mouseLine + i;
        chars[mouseLineIndex] = (mouseLineIndex % 2) ? "█" : " ";
    }

    let clickInfo = " ";

    if (clicked) {
        let softBoxClicked = isClickInBox(mouseX, mouseY, 10, 25 - verticalScroll, 76, 22);
        if (softBoxClicked) {
            let clickedIndex = -1;
            for (let i = 0; i < softwares.length; i++) {
                if (isClickInBox(mouseX, mouseY, 10 + softwares[i].x, 25 - verticalScroll + softwares[i].y, softwares[i].ASCII[0].length, softwares[i].ASCII.length)) {
                    clickedIndex = i;
                    break;
                }
            }
            if (clickedIndex > -1) {
                window.location.href = softwares[clickedIndex].url;
                clickInfo = "🮴";
            }

        }

        let musicBoxClicked = isClickInBox(mouseX, mouseY, 120, 37 - verticalScroll, 61, 24,);
        if (musicBoxClicked) {
            let clickedIndex = -1;
            for (let i = 0; i < musics.length; i++) {
                if (isClickInBox(mouseX, mouseY, 120 + musics[i].x, 37 - verticalScroll + musics[i].y, musics[i].ASCII[0].length, musics[i].ASCII.length)) {
                    clickedIndex = i;
                    break;
                }
            }
            if (clickedIndex > -1) {
                window.location.href = musics[clickedIndex].url;
                clickInfo = "🮴";
            }
        }
    }

    
    chars[index - 4] = "🯁";
    chars[index - 3] = "🯂";
    chars[index - 2] = "🯃";
    chars[index - 1] = clickInfo;
    
    chars[chars.length - 2] = dance[(Math.floor(count / 10) % 4)];

    para.textContent = chars.join("");
    para.innerHTML = para.textContent;

    const links = para.querySelectorAll('a'); 

    links.forEach(link => {
        link.style.textDecoration = 'none';
        link.style.color = 'blue';
    });
     

}, (1000. / 24.)); // 12 fps