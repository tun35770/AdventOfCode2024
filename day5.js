const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day5.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();
    
    var rules = [];
    var updates = []; 

    for(let i = 0; i < 1176; i++){
        rules.push(input[i]);
    }

    for(let i = 1176; i < input.length; i++){
        updates.push(input[i]);
    }

    let g = {};

    for(let i = 0; i < rules.length; i++){
        let rule = rules[i].split('|').map(n => Number(n));
        if(!g[rule[0]]){
            g[rule[0]] = new Set([rule[1]])
        }
        else{
            g[rule[0]].add(rule[1]);
        }
    }

    let sum = 0;

    for(let i = 0; i < updates.length; i++){
        let pages = updates[i].split(',').map(n => Number(n));
        let inOrder = true;

        for(let j = 1; j < pages.length; j++){
            let page = pages[j];

            for(let k = j-1; k >= 0; k--){
                if(g[page].has(pages[k])){
                    inOrder = false;
                    break;
                }
            }
            
            if(!inOrder) break;

            if(j == pages.length-1){
                //get middle page, add to sum
                sum += pages[Math.floor( (pages.length-1) / 2)];
            }
        }
    }

    console.log("Part 1: " + sum);

    // --- Part 2 ---
    sum = 0;

    for(let i = 0; i < updates.length; i++){
        let pages = updates[i].split(',').map(n => Number(n));
        let inOrder = true;

        for(let j = 1; j < pages.length; j++){
            let page = pages[j];

            for(let k = j-1; k >= 0; k--){
                if(g[page].has(pages[k])){
                    inOrder = false;
                    break;
                }
            }

            if(!inOrder) break;
        }

        function dfs(node, depth, visited){
            if(visited.has(node)) return false;
            visited.add(node);

            //console.log("Update idx: " + i + " | ")
            if(depth == pages.length-1){
                return true;
            }

            for(let i = 0; i < pages.length; i++){
                if(!visited.has(pages[i])){
                    if(!g[node].has(pages[i])){
                        const flag = dfs(pages[i], depth + 1, new Set(visited));
                        if(flag){
                            if(depth == Math.floor( (pages.length-1) / 2)){
                                sum += node;
                                inOrder = true;
                            }

                            return true;
                        }
                    }
                }
            }

            return false;
        }

        if(!inOrder){
            for(let i = 0; i < pages.length; i++){
                dfs(pages[i], 0, new Set());

                if(inOrder) break;
            }
        }
    }


    console.log("Part 2: " + sum);
}

main();