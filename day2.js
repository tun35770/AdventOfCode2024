const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day2.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    
    let count = 0;

    for(let i = 0; i < input.length; i++){
        const arr = input[i].split(' ').map(n => Number(n));
        
        //decreasing
        if(arr[0] - arr[1] > 0){
            for(let j = 0; j < arr.length-1; j++){
                let diff = arr[j] - arr[j+1];
                if(diff < 0) break;
                if(diff < 1 || diff > 3) break;
                if(j == arr.length - 2) count++;
            }
        }

        //increasing
        else{
            for(let j = 1; j < arr.length; j++){
                let diff = arr[j] - arr[j-1];
                if(diff < 0) break;
                if(diff < 1 || diff > 3) break;
                if(j == arr.length - 1) count++;
            }
        }
    }

    console.log("Part 1: " + count);


    //Part 2
    count = 0;
    let unsafes = [];

    for(let i = 0; i < input.length; i++){
        const arr = input[i].split(' ').map(n => Number(n));
        
        //decreasing
        if(arr[0] - arr[1] > 0){
            for(let j = 0; j < arr.length-1; j++){
                let diff = arr[j] - arr[j+1];
                if(diff < 0 || diff < 1 || diff > 3) {
                    unsafes.push(arr);
                    break;
                }
                if(j == arr.length - 2) count++;
            }
        }

        //increasing
        else{
            for(let j = 1; j < arr.length; j++){
                let diff = arr[j] - arr[j-1];
                if(diff < 0 || diff < 1 || diff > 3) {
                    unsafes.push(arr);
                    break;
                }
                if(j == arr.length - 1) count++;
            }
        }
    }

    //check if problem dampener fixes any unsafes
    for(let i = 0; i < unsafes.length; i++){
        //brute-force testing of each value removed
        let safe = false;

        for(let j = 0; j < unsafes[i].length; j++){
            let newArr = [...unsafes[i]];
            newArr.splice(j, 1);

            //decreasing
            if(newArr[0] - newArr[1] > 0){
                for(let k = 0; k < newArr.length-1; k++){
                    let diff = newArr[k] - newArr[k+1];
                    if(diff < 0 || diff < 1 || diff > 3) {
                        break;
                    }
                    if(k == newArr.length - 2) {
                        safe = true;
                    }
                }
            }

            //increasing
            else{
                for(let k = 1; k < newArr.length; k++){
                    let diff = newArr[k] - newArr[k-1];
                    if(diff < 0 || diff < 1 || diff > 3) {
                        break;
                    }
                    if(k == newArr.length - 1) {
                        safe = true;
                    }
                }
            }

            if(safe) {
                count++;
                break;
            }
        }
    }

    console.log("Part 2: " + count);
}

main();