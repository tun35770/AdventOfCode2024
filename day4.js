const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day4.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    
    let grid = [];
    for(let i = 0; i < input.length; i++){
        grid.push([]);
        for(let j = 0; j < input[i].length; j++){
            grid[i].push(input[i][j])
        }
    }

    let total = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] == "X")
                total += check(i, j);
        }
    }

    function check(i, j){

        let count = 0;
        //up
        if(i >= 3 && grid[i-1][j] == "M" && grid[i-2][j] == "A" && grid[i-3][j] == "S")
            count++;
        //up-right
        if(i >= 3 && j <= grid[i].length-4 && grid[i-1][j+1] == "M" && grid[i-2][j+2] == "A" && grid[i-3][j+3] == "S")
            count++;
        //right
        if(j <= grid[i].length-4 && grid[i][j+1] == "M" && grid[i][j+2] == "A" && grid[i][j+3] == "S")
            count++;
        //down-right
        if(i <= grid.length-4 && j <= grid[i].length-4 && grid[i+1][j+1] == "M" && grid[i+2][j+2] == "A" && grid[i+3][j+3] == "S")
            count++;
        //down
        if(i <= grid.length-4 && grid[i+1][j] == "M" && grid[i+2][j] == "A" && grid[i+3][j] == "S")
            count++;
        //down-left
        if(i <= grid.length-4 && j >= 3 && grid[i+1][j-1] == "M" && grid[i+2][j-2] == "A" && grid[i+3][j-3] == "S")
            count++;
        //left
        if(j >= 3 && grid[i][j-1] == "M" && grid[i][j-2] == "A" && grid[i][j-3] == "S")
            count++;
        //up-left
        if(i >= 3 && j >= 3 && grid[i-1][j-1]== "M" && grid[i-2][j-2] == "A" && grid[i-3][j-3] == "S")
            count++;

        return count;
    }

    console.log("Part 1: " + total)

    // --- Part 2 ---
    total = 0;
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] == "M")
                total += checkMas(i, j);
        }
    }

    function checkMas(i, j){
        //down-right
        let count = 0;
        if(i <= grid.length-3 && j <= grid[i].length-3 && grid[i+1][j+1] == "A" && grid[i+2][j+2] == "S"){
            if(grid[i+2][j] == "M" && grid[i+1][j+1] == "A" && grid[i][j+2] == "S"){
                count++;
            }

            else if(grid[i][j+2] == "M" && grid[i+1][j+1] == "A" && grid[i+2][j] == "S"){
                count++;
            }
        }
    
        //up-left
        if(i >= 2 && j >= 2 && grid[i-1][j-1] == "A" && grid[i-2][j-2] == "S"){
            if(grid[i-2][j] == "M" && grid[i-1][j-1] == "A" && grid[i][j-2] == "S"){
                count++;
            }

            else if(grid[i][j-2] == "M" && grid[i-1][j-1] == "A" && grid[i-2][j] == "S"){
                count++;
            }
        }

        return count;
    }

    console.log("Part 2: " + total)
}

main();