const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day7.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();

    let total = 0;

    function isValid(target, nums){
        if(nums.length == 0)
            return target == 0;
        return isValid(target - nums[nums.length-1], [...nums].slice(0, nums.length-1)) || isValid(target / nums[nums.length-1], [...nums].slice(0, nums.length-1))
    }

    for(let i = 0; i < input.length; i++){
        let [val, nums] = input[i].split(':');
        val = Number(val)

        nums = nums.split(' ').map(n => Number(n));

        if(isValid(val, nums)) total += val;
        
    }

    console.log("Part 1: " + total);

    //--- Part 2 ---

    total = 0;

    function isValidTwo(target, nums){
        if(nums.length == 1)
            return nums[0] == target;
        if(isValidTwo(target, [nums[0] + nums[1], ...nums.slice(2, nums.length)] ))
            return true;
        if(isValidTwo(target, [nums[0] * nums[1], ...nums.slice(2, nums.length)] ))
            return true;
        if(isValidTwo(target, [Number(String(nums[0]) + String(nums[1])), ...nums.slice(2, nums.length)] ))
            return true;
        return false;
    }

    for(let i = 0; i < input.length; i++){
        let [val, nums] = input[i].split(':');
        val = Number(val)

        nums = nums.split(' ').map(n => Number(n));

        if(isValidTwo(val, nums)) total += val;
        
    }

    console.log("Part 2: " + total);
}

main();