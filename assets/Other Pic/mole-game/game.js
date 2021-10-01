let score = 0;

function getSadInterval() {
    return Date.now() + 800;
}

function getGoneInterval() {
    return Date.now() + Math.floor(Math.random()* 18000) + 2000;
}

function getHungryInterval() {
    return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}
//create an object that represents each one  of the molos

//make it 10% is king
function getKingStatus() {
    return Math.random() >.9;
}

const moles = [
    {
        status: "sad",
        next: getSadInterval(), //sad for 1s
        king: false,
        node: document.querySelector('#hole-0')//or either// node: document.getElementById('hole-0')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-1')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-2')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-3')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-4')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-5')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-6')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-7')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-8')
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.querySelector('#hole-9')
    },
];

function getNextStatus (mole) {
    switch (mole.status) {
        case "sad":
        case "fed":
            mole.next = getSadInterval(),
            mole.status = 'leaving';
            if(mole.king) {
                mole.node.children [0]. src = './king-mole-leaving.png';
            }else{
            mole.node.children[0]. src= './mole-leaving.png';
            }
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = 'gone';
            mole.node.children[0].classList.add("gone"); //we want the image :(src="./king-mole-hungry.png" alt="happy mole" class="mole">)
            break;
        case "gone":
            mole.status = 'hungry';
            mole.king = getKingStatus();
            mole.next = getHungryInterval();
            mole.node.children [0]. classList.add("hungry");
            mole.node.children [0]. classList.remove("gone");
            if(mole.king) {
                mole.node.children [0]. src = './king-mole-hungry.png';
            }else{
            mole.node.children [0]. src = './mole-hungry.png';
            }
            break;
        case "hungry":
            mole.status = 'sad';
            mole.next = getSadInterval ();
            mole.node.children [0]. classList.remove("hungry")
            if(mole.king) {
                mole.node.children [0]. src = './king-mole-sad.png';
            } else {
            mole.node.children [0]. src = './mole-sad.png';
            }
            break;
    }
}

function feed (event) { //to make sure someone clicks on the event,make sure they're actually gonna click on an image.
    if (event.target.tagName !== 'IMG' || !event.target.classList.contains ("hungry")) {  //!== not equal to/.
        return;
    }

    // console.log(parseInt(event.target.dataset.index))
    const mole = moles[parseInt(event.target.dataset.index)]

    mole.status = 'fed';
    mole.next = getSadInterval();
    if(mole.king) {
        score += 2;
        mole.node.children [0]. src = './king-mole-fed.png';
    }else{
        score++;
        mole.node.children[0].src = './mole-fed.png';
    }
    mole.node.children[0].classList.remove('hungry'); //bug** classList

 
    if(score >= 10) {
      win();  
    }

    document.querySelector('.worm-container').style.width = `${10*score}%`;
}

function win() {
    document.querySelector('.bg').classList.add("hide");
    document.querySelector('.win').classList.remove("hide");

}

//runing continuosly
//we're capturing date.now in the runAgainAt
let runAgainAt = Date.now() + 100;
function nextFrame() { //1*.
    const  now = Date.now();
    // console.log(now, runAgainAt);
    if(runAgainAt <= now) {    //'>=' is faster
        // console.log('now');
        for(let i=0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus (moles[i]);
            }
        }
    runAgainAt =  now + 100;
    }
    requestAnimationFrame(nextFrame); //giving a function to the browser and saying,when you're not doing anything, next time you have an idle second,run this function. So you're more or less guaranteeing that you're not interrupting something else, that's the point of requestAnimationFrame versus setInterval.//3*. make sure the request AnimationFrame is here otherwise it's gonna run once and never run again.
}


//Feed Event
document.querySelector('.bg').addEventListener('click',feed);

nextFrame(); //2*..call it onces


