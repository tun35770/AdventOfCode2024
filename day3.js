const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day3.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    let str = "";
    for(let i = 0; i < input.length; i++){
        str += input[i];
    }

    let sum = 0;

    for(let i = 0; i < str.length; i++){
        if(str[i] == "m"){
            sum += check(i);
        }
    }
    
    function check(i){
        if(str[i+1] != "u") return 0;
        if(str[i+2] != "l") return 0;
        if(str[i+3] != "(") return 0;

        let arr = "";
        let flag = false;
        for(let j = i+4; j < str.length; j++){
            if(str[j] == ")") break;
            if(str[j] != "," && (str[j] < "0" || str[j] > "9")){
                flag = true;
                break;
            }
            arr += str[j];
        }

        if(flag) return 0;
        let nums = arr.split(',');
        if(nums.length !== 2) return 0;
        if(nums[0] == NaN || nums[1] == NaN) return 0;
        return Number(nums[0]) * Number(nums[1]);
    }

    console.log("Part 1: " + sum)

    // --- Part 2 ---
    str = "";
    for(let i = 0; i < input.length; i++){
        str += input[i];
    }

    sum = 0;
    let enabled = true;

    for(let i = 0; i < str.length; i++){
        if(str[i] == "d"){
            checkDo(i);
        }

        if(str[i] == "m" && enabled){
            sum += check(i);
        }
    }

    function checkDo(i){
        if(str[i+1] != "o") return;
        if(str[i+2] == "(" && str[i+3] == ")"){
            enabled = true;
            return;
        }

        if(str[i+2] == "n" && str[i+3] == "'" && str[i+4] == "t" && str[i+5] == "(" && str[i+6] == ")"){
            enabled = false;
            return;
        }
    }

    console.log("Part 2: " + sum)
}

main();