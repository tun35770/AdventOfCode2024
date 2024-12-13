const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day1.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    //console.log(input)
    let left = [], right = []

    for(let i = 0; i < input.length; i++){
        const tuple = input[i].split('   ')
        
        left.push(Number(tuple[0]));
        right.push(Number(tuple[1]));
    }

    left = left.sort((a, b) => a - b);
    right = right.sort((a, b) => a - b);
    let sum = 0;

    for(let i = 0; i < right.length; i++){
        let diff = left[i] - right[i];
        if(diff < 0) diff *= -1;
        sum += diff
    }

    console.log("Part 1: " + sum)


    // ---- Part 2 ----

    let freqMap = new Map();
    
    for(let i = 0; i < right.length; i++){
        if(!freqMap.has(right[i])){
            freqMap.set(right[i], 1)
        }
        else{
            freqMap.set(right[i], freqMap.get(right[i]) + 1)
        }
    }

    let similarity = 0;

    for(let i = 0; i < left.length; i++){
        if(freqMap.has(left[i])){
            similarity += left[i] * freqMap.get(left[i]);
        }
    }

    console.log("Part 2: " + similarity);
}

main();