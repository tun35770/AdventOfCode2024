const fs = require('fs');
const readline = require('readline');

var input = [];

async function readInput(){
    
    const rl = readline.createInterface({
        input: fs.createReadStream('./day8.txt'),
        output: process.stdout,
        console: false
    })
    
    for await(const line of rl){
        input.push(line);
    }
}

const main = async () => {

    await readInput();

    const freqMap = new Map();
    let nodeLocations = new Set();
    const uniqueFreqs = [];

    for(let i = 0; i < input.length; i++){
        let row = input[i].split('');

        for(let j = 0; j < row.length; j++){
            const f = row[j];
            if(f !== '.'){
                if(!freqMap.has(f)){
                    freqMap.set(f, [ [i, j] ]);
                    uniqueFreqs.push(f)
                }
                else{
                    freqMap.get(f).push([i, j]);
                }
            }
        }
    }

    for(let i = 0; i < uniqueFreqs.length; i++){
        const f = uniqueFreqs[i];

        const locations = freqMap.get(f);

        for(let j = 1; j < locations.length; j++){
            const b = locations[j];

            for(let k = j-1; k >= 0; k--){
                const a = locations[k];

                //first possible location
                let y_dis = b[0] - a[0];
                let x_dis = b[1] - a[1];
                let nodeLocation = [ a[0] - y_dis, a[1] - x_dis ];

                if(nodeLocation[0] >= 0 && nodeLocation[0] < input.length && nodeLocation[1] >= 0 && nodeLocation[1] < input[0].length){
                    if(!nodeLocations.has(`${nodeLocation[0]} ${nodeLocation[1]}`))
                        nodeLocations.add(`${nodeLocation[0]} ${nodeLocation[1]}`);
                }

                //second possible location
                nodeLocation = [ b[0] + y_dis, b[1] + x_dis ];

                if(nodeLocation[0] >= 0 && nodeLocation[0] < input.length && nodeLocation[1] >= 0 && nodeLocation[1] < input[0].length){
                    if(!nodeLocations.has(`${nodeLocation[0]} ${nodeLocation[1]}`))
                        nodeLocations.add(`${nodeLocation[0]} ${nodeLocation[1]}`);
                }
            }
        }
    }

    console.log("Part 1: " + nodeLocations.size);
    

    // --- Part 2 ---
    for(let i = 0; i < uniqueFreqs.length; i++){
        const f = uniqueFreqs[i];

        const locations = freqMap.get(f);

        if(locations.length > 2){
            if(!nodeLocations.has(`${locations[0][0]} ${locations[0][1]}`))
                nodeLocations.add(`${locations[0][0]} ${locations[0][1]}`);
        }

        for(let j = 1; j < locations.length; j++){
            const b = locations[j];

            for(let k = j-1; k >= 0; k--){
                const a = locations[k];

                //first direction
                let y_dis = b[0] - a[0];
                let x_dis = b[1] - a[1];
                let nodeLocation = [ a[0] - y_dis, a[1] - x_dis ];

                while(nodeLocation[0] >= 0 && nodeLocation[0] < input.length && nodeLocation[1] >= 0 && nodeLocation[1] < input[0].length){
                    if(!nodeLocations.has(`${nodeLocation[0]} ${nodeLocation[1]}`))
                        nodeLocations.add(`${nodeLocation[0]} ${nodeLocation[1]}`);

                    nodeLocation[0] -= y_dis;
                    nodeLocation[1] -= x_dis;
                }

                //second direction
                nodeLocation = [ b[0] + y_dis, b[1] + x_dis ];

                while(nodeLocation[0] >= 0 && nodeLocation[0] < input.length && nodeLocation[1] >= 0 && nodeLocation[1] < input[0].length){
                    if(!nodeLocations.has(`${nodeLocation[0]} ${nodeLocation[1]}`))
                        nodeLocations.add(`${nodeLocation[0]} ${nodeLocation[1]}`);

                    nodeLocation[0] += y_dis;
                    nodeLocation[1] += x_dis;
                }
            }

            if(locations.length > 2){
                if(!nodeLocations.has(`${b[0]} ${b[1]}`))
                    nodeLocations.add(`${b[0]} ${b[1]}`);
            }
        }
    }

    console.log("Part 2: " + nodeLocations.size);
}

main();