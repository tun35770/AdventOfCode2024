const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day9.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    input = input[0];
    
    const occupied = [];
    const free = [];

    for(let i = 0; i < input.length; i++){
        if(i % 2 === 0){
            occupied.push(Number(input[i]));
        }
        else{
            free.push(Number(input[i]));
        }
    }

    let left = 0, right = occupied.length-1;

    let sum = 0;
    let idx = 0;

    while(left < right && free.length > 0){
        //occupied
        while(occupied[left] > 0){
            sum += left * idx;
            idx++;
            occupied[left]--;
        }

        left++;

        //free
        while(free[0] > 0){
            if(occupied[right] <= 0)
                right--;

            sum += idx * right;
            occupied[right]--;
            idx++;
            free[0]--;
        }

        free.shift();
    }

    while(occupied[left] > 0){
        sum += idx * left;
        occupied[left]--;
        idx++;
    }

    console.log("Part 1: " + sum)

    //--- Part 2 ---
    
}

main();