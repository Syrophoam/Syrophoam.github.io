class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
};

class ASCIIText {
    constructor(ASCII, url, x, y) {
        this.ASCII = ASCII;
        this.url = url;
        this.x = x; this.y = y;
    }
}

function isClickInBox(cx, cy, x, y, w, h) {
    if ((cx >= x) && (cy >= y)) {
        if ((cx <= (x + w)) && (cy <= (y + h))) {
            return 1;
        }
    }
    return 0;
}

const para = document.getElementById("PARA");
para.style.userSelect = 'none';
para.style.cursor = 'none';
para.style.color = "#00FF00"
document.body.style.backgroundColor = "#000000";

document.body.style.overflow = 'hidden';
document.body.style.position = 'fixed';

async function loadCustomFont() {
    const font = new FontFace('Menlo', 'url(MEDIA/Menlo.ttc)');
    await font.load();
    
    document.fonts.add(font);
    
    para.style.fontFamily = 'Menlo, sans-serif';
}

loadCustomFont().catch(err => console.error(err));


const header = document.getElementById("header");
header.style.color = "#00FF00";
header.textContent = "welcome! use W and S to scroll, press space to start ambiance";
//TODO: uncomment this when you add things below the first "page"
//TODO: add option to make text selectable


let width = Math.floor((window.innerWidth / 12 * 1.65) + 1);
let height = Math.floor((window.innerHeight / 12) - 2);

let verticalScroll = 0;
let clicked = 0;
let released = 0;

window.addEventListener('resize',function(event){

    let newWidth = Math.floor((window.innerWidth / 12 * 1.65) + 1);
    width = newWidth;
    let changeRatio = newWidth / width;
    // para.style.fontSize = (12 * changeRatio) + "px";
    // this works but it makes space between lines aswell FUCKTHIISISSSS
});

document.addEventListener('keypress', function (event) {
    if (event.key == 's') {
        verticalScroll += 5;
        // new Audio("MEDIA/DOWN.wav").play();  
        // make only play so often
    }
    if (event.key == 'w') {
        verticalScroll = ((verticalScroll -= 5) <= 0) ? 0 : verticalScroll;
        // new Audio("MEDIA/UP.wav").play();
    }

    if (event.key == " ") {
        if (!backgroundPlaying) {
            backgroundPlaying = 1;
        }else{
            backgroundPlaying = 0;
        }

        let randIndex = Math.floor(Math.random() * backGround.length);
            new Audio("MEDIA/background/" + backGround[randIndex]).play();
        const backgroundMusicLoop = setInterval(() => {
            if(!backgroundPlaying){
                return;
            }

            let randIndex = Math.floor(Math.random() * backGround.length);
            new Audio("MEDIA/background/" + backGround[randIndex]).play();

        }, (3000)); // ms


    }

});


let mousePosX = 1;
let mousePosY = 1;

document.addEventListener('mouseleave', function(event){
    mousePosX = 0;
    mousePosY = 0;
})

let Clicks = [
"BATTING1.WAV",		"DRIP3.WAV",		"IMPACT07.WAV",		"POP04.WAV",
"BOOM2.WAV",		"GLASS18.WAV",		"IMPACT25.WAV",		"PRISON03.WAV",
"CARWNDOW.WAV",		"IMPACT03.WAV",		"IMPACT36.WAV",		"SLAP03.WAV",
"CLANG01.WAV",		"IMPACT04.WAV",		"METAL14.WAV",		"SPLASH12.WAV",
"CRASH1.WAV",		"IMPACT05.WAV",		"METALSPR-44k.WAV",	"SPLASH14.WAV"
];

let backGround = [
    "CREVASSE.WAV",	"SPACLORE.WAV",	"WARMWIND.WAV",	"WHALELP.WAV"
];
let backgroundPlaying = 0;





document.addEventListener('mousedown', function (event) {
    clicked = 1;

    const paraRect = para.getBoundingClientRect();

    const relativeX = event.clientX - paraRect.left + 8;
    const relativeY = event.clientY - paraRect.top - 2;

    const charWidth = window.innerWidth / width;
    const charHeight = window.innerHeight / height;

    mousePosX = relativeX / charWidth;
    mousePosY = relativeY / charHeight;

    let randIndex = Math.floor(Math.random() * Clicks.length);

    new Audio("MEDIA/clicks/" + Clicks[randIndex]).play();

});
document.addEventListener('mouseup', function (event) {
    clicked = 0;
    released = 1;
});

document.addEventListener('mousemove', function (event) {
    const paraRect = para.getBoundingClientRect();

    const relativeX = event.clientX - paraRect.left + 8;
    const relativeY = event.clientY - paraRect.top - 2;

    const charWidth = window.innerWidth / width;
    const charHeight = window.innerHeight / height;

    mousePosX = relativeX / charWidth;
    mousePosY = relativeY / charHeight;

})



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

let soundcloud = [
"▄▖       ▌  ▜      ▌",
"▚ ▛▌▌▌▛▌▛▌▛▘▐ ▛▌▌▌▛▌",
"▄▌▙▌▙▌▌▌▙▌▙▖▐▖▙▌▙▌▙▌"
];

let musics = [
    new ASCIIText(LPFDF, "https://syrophoam.bandcamp.com/album/large-properly-formatted-data-file", 5, 10),
    new ASCIIText(soundcloud, "https://soundcloud.com/ketarix-joe", 30, 22)
];

// 🬀	🬁	🬂	🬃	🬄	🬅	🬆	🬇	🬈	🬉	🬊	🬋	🬌	🬍	🬎	🬏
// 🬐	🬑	🬒	🬓	🬔	🬕	🬖	🬗	🬘	🬙	🬚	🬛	🬜	🬝	🬞	🬟
// 🬠	🬡	🬢	🬣	🬤	🬥	🬦	🬧	🬨	🬩	🬪	🬫	🬬	🬭	🬮	🬯
// 🬰	🬱	🬲	🬳	🬴	🬵	🬶	🬷	🬸	🬹	🬺	🬻

let init = 0;
let piece = -1;
let peiceY = -1;
let peiceX = 4;
let speed = 4;

let peiceChar = [
    ["🬛", "🬍🬃", "🬵🬏", "🬫", "🬊🬀", "🬩🬃" ]

];

function peiceDropped(w){
    peiceY = 0;
    peiceX = Math.floor(Math.random() * w);
}
//67 x 60
function drawTetris(x, y, w, h, chars) {

    if(!init){
        init = 1;
        peiceDropped(h);
    }

    if(!(count % speed)){
        peiceY++;
        if(peiceY == h){
            peiceDropped(w);
        }
    }
    // console.log(peiceX);

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            let index = ((i + y) * (width + 1)) + (j + x);
            if (index < chars.length) {
                chars[index] = " ";


                if((i == peiceY) && (j == peiceX)){
                    chars[index] = "🬛"; 
                }



            }
        }
    }
    return chars.join("");

}

function drawBox(x, y, w, h, currentContent, title, items) {

    if((x + w) > width){

        title = [" "];
        while(((x + w) + 3)  > width){
            
            x--;
            w--;
        }
    }

    let chars = Array.from(currentContent);
    let titleLines = title.length;
    let titleLineLen = title[0].length;
    let titleStart = (w / 2) - (titleLineLen / 2);
    let titleTxt = title.join('');
    const contentLen = currentContent.length;

    for (let i = 0; i < h; i++) {
        let offset = Math.floor(Math.random() * 1.01);
        for (let j = 0; j < w; j++) {
            let index = ((i + y) * (width + 1)) + j + x;

            if (index < chars.length) {
                let char = " ";
                if (i == 0) { char = "🬂"; }
                if (i == (h - 2)) { char = "🬭"; }

                if (j == 0) { char = "▌"; }
                if (j == (w - 2)) { char = "▐"; }

                if ((i == 0) && (j == 0)) { char = "🬕"; }
                if ((i == 0) && (j == (w - 2))) { char = "🬨"; }
                if ((i == (h - 2) && (j == 0))) { char = "🬲"; }
                if ((i == (h - 2) && (j == (w - 2)))) { char = "🬷"; }

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

                if (shadow) {
                    char = shadowChar;
                }

                let emptyChar = (lineIndex < 3) ? " " : "█";

                if ((i == 0) && (j == (w - 1))) { char = emptyChar; }
                if ((j == 0) && (i == (h - 1))) { char = emptyChar; }

                if ((i >= 1) && (i <= titleLines)) {
                    if ((j >= titleStart) && (j < (titleStart + titleLineLen))) {
                        let titleLineIndex = i - 1;
                        let titleIndex = j - titleStart;
                        char = titleTxt[(titleLineIndex * (titleLineLen)) + titleIndex];
                    }
                }


                for (let k = 0; k < items.length; k++) {
                    if ((i >= items[k].y) && (i < (items[k].y + items[k].ASCII.length))) {
                        if ((j >= items[k].x) && (j < (items[k].x + items[k].ASCII[0].length))) {
                            char = items[k].ASCII[i - items[k].y].at(j - items[k].x);
                        }
                    }
                }



                chars[index] = char;
            }
        }
    }

    if (items === "tetris") {
        return drawTetris(x + 1, y + titleLines + 2, w - 3, h - titleLines - 4, chars);
    }

    return chars.join("");
}



let ASCII_LINES = [
    "                                                                                                                                                                      ",
    "      *******          ***** *    **        ***** ***        * ***            ***** **         *****    **          * ***            **             *****   **    **  ",
    "    *       ***     ******  *  *****     ******  * **      *  ****         ******  ****     ******  *  **** *     *  ****         *****          ******  ***** *****  ",
    "   *         **    **   *  *     *****  **   *  *  **     *  *  ***       **   *  *  ***   **   *  *   *****     *  *  ***       *  ***         **   *  *  ***** *****",
    "   **        *    *    *  **     * **  *    *  *   **    *  **   ***     *    *  *    *** *    *  *    * *      *  **   ***         ***        *    *  *   * **  * ** ",
    "    ***               *  ***     *         *  *    *    *  ***    ***        *  *      **     *  *     *       *  ***    ***       *  **           *  *    *     *    ",
    "   ** ***            **   **     *        ** **   *    **   **     **       ** **      **    ** **     *      **   **     **       *  **          ** **    *     *    ",
    "    *** ***          **   **     *        ** **  *     **   **     **       ** **      **    ** **     *      **   **     **      *    **         ** **    *     *    ",
    "      *** ***        **   **     *        ** ****      **   **     **     **** **      *     ** ********      **   **     **      *    **         ** **    *     *    ",
    "        *** ***      **   **     *        ** **  ***   **   **     **    * *** **     *      ** **     *      **   **     **     *      **        ** **    *     *    ",
    "          ** ***     **   **     *        ** **    **  **   **     **       ** *******       ** **     **     **   **     **     *********        ** **    *     **   ",
    "           ** **      **  **     *        *  **    **   **  **     **       ** ******        *  **     **      **  **     **    *        **       *  **    *     **   ",
    "            * *        ** *      *           *     **    ** *      *        ** **               *       **      ** *      *     *        **          *     *      **  ",
    "  ***        *          ***      *       ****      ***    ***     *         ** **           ****        **       ***     *     *****      **     ****      *      **  ",
    " *  *********            *********      *  ****    **      *******          ** **          *  *****      **       *******     *   ****    ** *  *  *****           ** ",
    "*     *****                **** ***    *    **     *         ***       **   ** **         *     **                  ***      *     **      **  *     **               ",
    "*                                ***   *                              ***   *  *          *                                  *                 *                      ",
    " **                  ********     ***   **                             ***    *            **                                 **                **                    ",
    "                   *************  **                                    ******                                                                                        ",
    "                  *           ****                                        ***                                                                                         ",
    "                                                                                                                                                                      ",
];

// font ANSI Shadow
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

let TETRIS = [
    '████████╗███████╗████████╗██████╗ ██╗███████╗',
    '╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██║██╔════╝',
    '   ██║   █████╗     ██║   ██████╔╝██║███████╗',
    '   ██║   ██╔══╝     ██║   ██╔══██╗██║╚════██║',
    '   ██║   ███████╗   ██║   ██║  ██║██║███████║',
    '   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝'
];
let TEST = [
'████████╗',
'╚══██╔══╝',
'   ██║   ',
'   ██║   ',
'   ██║   ',
'   ╚═╝   '
];

let dance = ["🯅", "🯆", "🯇", "🯈"];
let stars = ["✦", "✧", "✩", "✫", "✬", "✭", "✮", "✯", "✰"];
let invStars = ["🬟", "🬴", "🮖", "🮕", "🮗", "🮘", "🮙", "🮚", "🮛"];

let count = 0;
let clickedRamp = 0;
const intervalId = setInterval(() => {

    count++;


    para.textContent = "";
    if (clicked) {
        clickedRamp += 0.075;
        if (clickedRamp >= .1) { clickedRamp = 0.1; }
    } else {
        clickedRamp *= 0.5;
        if (clickedRamp <= 0.) { clickedRamp = 0; }
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

            let mouseCenterUV = new Vec2((noiseX - (mousePosX / width)),
                                         noiseY - (mousePosY / height));
            let burst = mouseCenterUV.length();

            let nameX = (ASCII_LINES[0].length / 2) - (width / 2) + x;

            if ((yScrolled < ASCII_LINES.length) &&
                (nameX < ASCII_LINES[yScrolled].length) &&
                (ASCII_LINES[yScrolled].at(x - (ASCII_LINES[0].length / 2) - (width / 2)) != " ") &&
                (x >= -((ASCII_LINES[0].length / 2) - (width / 2)))) {

                para.textContent += val[Math.floor(Math.abs(value - 1) * 7)][Math.floor(Math.random() * 4)];

            } else if ((burst < (clickedRamp * 1.)) && (Math.random() > 0.3)) {

                if (value < 0.5) {
                    para.textContent += stars[Math.floor(Math.random() * stars.length)];
                } else {
                    para.textContent += invStars[Math.floor(Math.random() * invStars.length)];
                }

            } else {
                para.textContent += val[Math.floor(value * 7)][Math.floor(Math.random() * 4)];
            }
        }
        para.textContent += "\n";
    }



    para.textContent = drawBox(Math.floor(0.04 * width), 25 - verticalScroll, 76, 22, para.textContent, SOFTWARE, softwares);
    para.textContent = drawBox(Math.floor(0.5 * width), 37 - verticalScroll, 61, 29, para.textContent, MUSIC, musics);
    para.textContent = drawBox(Math.floor(0.25 * width), 70 - verticalScroll, 67, 60, para.textContent, TETRIS, "tetris");

    const mouseX = Math.floor(mousePosX);
    const mouseY = Math.floor(mousePosY);

    let index = (mouseY * (width + 1)) + mouseX;
    let mouseLine = mouseY * (width + 1);

    let chars = Array.from(para.textContent);
    let clickInfo = " ";

    

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

            if (released) {
                window.location.href = softwares[clickedIndex].url;
            }
            if (clicked) {
                clickInfo = "🯀";
            } else {
                clickInfo = "🮮";
            }
        }

    }


    let musicBoxClicked = isClickInBox(mouseX, mouseY, 120, 37 - verticalScroll, 61, 29);
    if (musicBoxClicked) {
        let clickedIndex = -1;
        for (let i = 0; i < musics.length; i++) {
            if (isClickInBox(mouseX, mouseY, 120 + musics[i].x, 37 - verticalScroll + musics[i].y, musics[i].ASCII[0].length, musics[i].ASCII.length)) {
                clickedIndex = i;
                break;
            }
        }
        if (clickedIndex > -1) {

            if (released) {
                window.location.href = musics[clickedIndex].url;
            }
            if (clicked) {

                clickInfo = "🯀";
            } else {
                clickInfo = "🮮";
            }
        }
    }



    for (let i = 0; i < mouseX; i++) {
        let mouseLineIndex = mouseLine + i;

        chars[mouseLineIndex] = ((mouseLineIndex + clicked) % 2) ? "█" : " ";
    }

    if (clicked) {
        chars[index - 3] = "🯁";
        chars[index - 2] = "🯂";
        chars[index - 1] = "🯃";
        chars[index - 0] = clickInfo;
    } else {
        chars[index - 4] = "🯁";
        chars[index - 3] = "🯂";
        chars[index - 2] = "🯃";
        chars[index - 1] = clickInfo;
    }



    chars[chars.length - 2] = dance[(Math.floor(count / 10) % 4)];

    para.textContent = chars.join("");
    para.innerHTML = para.textContent;

    if (released) {
        released = 0;
    }


}, (1000. / 24.)); // 12 fps