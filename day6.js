const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day6.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    
    let g = [];
    let pos = [0,0];

    for(let i = 0; i < input.length; i++){
        g.push([]);

        for(let j = 0; j < input[i].length; j++){
            if(input[i][j] == '^'){
                pos = [i, j];
                g[i].push('.')
            }
            else
                g[i].push(input[i][j]);
        }
    }

    let visited = new Set();
    let count = 0;
    let dir = [-1,0];
    let initialPos = [...pos];

    while(pos[0] < g.length && pos[0] >= 0 && pos[1] < g[0].length && pos[1] >= 0){

        if(!visited.has(`${pos[0]} ${pos[1]}`)){
            visited.add(`${pos[0]} ${pos[1]}`);
            count++;
        }

        let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
        if(newPos[0] < g.length && newPos[0] >= 0 && newPos[1] < g[0].length && newPos[1] >= 0 && g[newPos[0]][newPos[1]] == '#'){

            if(dir[0] == -1 && dir[1] == 0){
                dir = [0, 1];
            }

            else if(dir[0] == 0 && dir[1] == 1){
                dir = [1, 0];
            }

            else if(dir[0] == 1 && dir[1] == 0){
                dir = [0, -1];
            }

            else{
                dir = [-1, 0];
            }

        }

        pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }

    console.log("Part 1: " + count);

    // --- Part 2 ---

    count = 0;
    g[initialPos[0]][initialPos[1]] = '^';

    for(let i = 0; i < g.length; i++){
        for(let j = 0; j < g[0].length; j++){
            if(g[i][j] == '#' || g[i][j] == '^') continue;
            //console.log(i + ' ' + j)
            let map = new Map();
            dir = [-1, 0];
            pos = [...initialPos];
            
            g[i][j] = '#';

            while(pos[0] < g.length && pos[0] >= 0 && pos[1] < g[0].length && pos[1] >= 0){

                let flag = false;
                while(true){
                    if(!map.has(`${pos[0]} ${pos[1]}`)){
                        map.set(`${pos[0]} ${pos[1]}`, [`${dir[0]} ${dir[1]}`])
                    }
                    else{
                        let arr = map.get(`${pos[0]} ${pos[1]}`);
                        if(arr.includes(`${dir[0]} ${dir[1]}`)){
                            count++;
                            flag = true;
                            break;
                        }
            
                        //add this direction
                        arr.push(`${dir[0]} ${dir[1]}`);
                    }

                    let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
                    if(newPos[0] < g.length && newPos[0] >= 0 && newPos[1] < g[0].length && newPos[1] >= 0 && g[newPos[0]][newPos[1]] == '#'){

                        if(dir[0] == -1 && dir[1] == 0){
                            dir = [0, 1];
                        }
            
                        else if(dir[0] == 0 && dir[1] == 1){
                            dir = [1, 0];
                        }
            
                        else if(dir[0] == 1 && dir[1] == 0){
                            dir = [0, -1];
                        }
            
                        else{
                            dir = [-1, 0];
                        }
            
                    }

                    newPos = [pos[0] + dir[0], pos[1] + dir[1]];
                    if(newPos[0] >= g.length || newPos[0] < 0 || newPos[1] >= g[0].length || newPos[1] < 0)
                        break;
                    if(g[newPos[0]][newPos[1]] == '.' || g[newPos[0]][newPos[1]] == '^')
                        break;
                }
                
                if(flag) break;
                pos = [pos[0] + dir[0], pos[1] + dir[1]];
            }

            g[i][j] = '.';
        }
    }

/*
    //map every spot that gets revisited and the direction the guard is facing
    while(pos[0] < g.length && pos[0] >= 0 && pos[1] < g[0].length && pos[1] >= 0){

        if(!visited.has(`${pos[0]} ${pos[1]}`)){
            visited.add(`${pos[0]} ${pos[1]}`);
        }

        if(!map.has(`${pos[0]} ${pos[1]}`)){
            map.set(`${pos[0]} ${pos[1]}`, [`${dir[0]} ${dir[1]}`])
        }
        else{
            let arr = map.get(`${pos[0]} ${pos[1]}`);
            //check if an obstacle can be placed
            if(dir[0] == -1 && dir[1] == 0 && arr.includes(`0 1`) && !obstacles.has(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`)){
                obstacles.add(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`);
            }

            else if(dir[0] == 0 && dir[1] == 1 && arr.includes('1 0') && !obstacles.has(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`)){
                obstacles.add(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`);
            }

            else if(dir[0] == 1 && dir[1] == 0 && arr.includes(`0 -1`) && !obstacles.has(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`)){
                obstacles.add(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`);
            }

            else if(dir[0] == 1 && dir[1] == 0 && arr.includes(`-1 0`) && !obstacles.has(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`)){
                obstacles.add(`${pos[0] + dir[0]} ${pos[1] + dir[1]}`);
            }

            //add this direction
            arr.push(`${dir[0]} ${dir[1]}`);
        }

        let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
        if(newPos[0] < g.length && newPos[1] < g[0].length && g[newPos[0]][newPos[1]] == '#'){
            
            if(dir[0] == -1 && dir[1] == 0){
                dir = [0, 1];
            }

            else if(dir[0] == 0 && dir[1] == 1){
                dir = [1, 0];
            }

            else if(dir[0] == 1 && dir[1] == 0){
                dir = [0, -1];
            }

            else{
                dir = [-1, 0];
            }

        }

        pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }

    **/
    console.log("Part 2: " + count);

}

main();