const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var grid_size = 20
var grid = [...Array(grid_size+2)].map(e => Array(grid_size+2));
var dir = 1;
var facing = 2;
var n = 0;
var set = 0;
var start, end, startPos, lastDir;
var arr = new Array();
var currentPos = new Array();
  

//generates the frame and decides first direction
function preGen() {

    start = Math.ceil(Math.random()*grid_size);
    end = Math.ceil(Math.random()*grid_size);
    console.debug(start, end);
    for (let i = 0; i < grid_size+2; i++) {
        for (let j = 0; j < grid_size+2; j++) {
            if(i == 0 || i == grid_size+1 || j == 0 || j == grid_size+1){
                grid[j][i]=1;
                if(i == end && j == 0){
                    grid[j][i] = 0;
                }
                if(i == start && j == grid_size+1) {
                    grid[j][i] = 0;
                }
            } 
        }
    }
    grid[grid_size+1][start] = 3
    grid[0][end] = 2
    currentPos = [grid_size, start]
    
    while(true){
        do{
            for (let i = 0; i < 2; i++) {
                if(Math.random() < 0.95){arr[i] = 1;}
                else{arr[i] = 0;}
            }
        }while(arr.indexOf(1) == -1 || arr.indexOf(0) == -1 || arr[1] == 1);
        break;
    }
    if(grid[currentPos[0]-1][currentPos[1]] == 0){
        grid[currentPos[0]-1][currentPos[1]] = arr[2];
    }
    if(grid[currentPos[0]][currentPos[1]+1] == 0) {
        grid[currentPos[0]][currentPos[1]+1] = arr[2];
    }
}

function generate() {
    while(true) {
        dir = Math.floor(Math.random()*3) //* 0 = left turn, 1 = straight, 2 = turn right
        if(dir == 0 && start == 1 || (dir == 2 && start == grid_size)){
            continue;
        } else {break;}
    }

    for (let i = 0; i < 2; i++) {
        if(Math.random() < 0.95){arr[i] = 1;}
        else{arr[i] = 0;}
        }
    switch (dir) {
        case 0:
            if(facing !== 0){facing--}else{facing=3} //* facing: 0 = down, 1 = left, 2 = up, 3 = right
            break;
        case 1:
            break;
        case 2:
            if(facing !== 3){facing++}else{facing=0} //* facing: 0 = down, 1 = left, 2 = up, 3 = right
            break;
        default:
            console.error("invalid dir")
            break;
    }
    switch (facing) {
        case 0:
            if(grid[currentPos[0]][currentPos[1]+1] == 0 && grid[currentPos[0]+1] !== 1 ){
                grid[currentPos[0]][currentPos[1]+1] = arr[0];
            }
            if(grid[currentPos[0]][currentPos[1]-1] == 0 && grid[currentPos[0]+1] !== 1){
                grid[currentPos[0]][currentPos[1]-1] = arr[1];
            }
            if(currentPos[0]<grid_size && grid[currentPos[0]+1] !== 1){
                currentPos[0]++;
                grid[currentPos[0]][currentPos[1]] = 4;
                grid[currentPos[0]-1][currentPos[1]] = 0;
            };
            break;
        case 1:
            if(grid[currentPos[0]][currentPos[1]-1] == 0 && grid[currentPos[1]-1] !== 1){
                grid[currentPos[0]][currentPos[1]-1] = arr[0];
            }
            if(grid[currentPos[0]-1][currentPos[1]] == 0 && grid[currentPos[1]-1] !== 1){
                grid[currentPos[0]-1][currentPos[1]] = arr[1];
            }
            if(currentPos[1]>1 && grid[currentPos[1]-1] !== 1){
                currentPos[1]--;
                grid[currentPos[0]][currentPos[1]] = 4;
                grid[currentPos[0]][currentPos[1]+1] = 0;
            };
            break;
        case 2:
            if(grid[currentPos[0]-1][currentPos[1]] == 0 && grid[currentPos[0]-1] !== 1){
                grid[currentPos[0]-1][currentPos[1]] = arr[0];
            }
            if(grid[currentPos[0]][currentPos[1]+1] == 0 && grid[currentPos[0]-1] !== 1) {
                grid[currentPos[0]][currentPos[1]+1] = arr[1];
            }
            if(currentPos[0]>1 && grid[currentPos[0]-1] !== 1){
                lastPos = currentPos;}
            if(currentPos[0]>1 && grid[currentPos[0]-1] !== 1){
                currentPos[0]--;
                grid[currentPos[0]][currentPos[1]] = 4;
                grid[currentPos[0]+1][currentPos[1]] = 0;
            };
            break;
        case 3:
            if(grid[currentPos[0]][currentPos[1]+1] == 0  && grid[currentPos[1]+1] !== 1) {
                grid[currentPos[0]][currentPos[1]+1] = arr[0];
            }
            if(grid[currentPos[0]]+1[currentPos[1]] == 0 && grid[currentPos[1]+1] !== 1){
                grid[currentPos[0]+1][currentPos[1]] = arr[1];
            }
            if(currentPos[1]<grid_size && grid[currentPos[1]+1] !== 1){
                currentPos[1]++;
                grid[currentPos[0]][currentPos[1]] = 4;
                grid[currentPos[0]][currentPos[1]-1] = 0;
            };
            break;
    }
}

function stopGen()  {
    n++
    if(n<1000){
        generate();
    }
}

//setup function
function setup() {
    preGen();
}

setup();

//frame
function frame() {
    ctx.clearRect(0, 0, canvas.clientHeight, canvas.clientHeight);
    stopGen();
    //console.debug(arr, dir, facing);
    for (let i = 0; i < 10; ++i) { }

    //drawing all rects
    for (let i = 0; i < grid[0].length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[j][i] == 1) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(i*canvas.clientHeight/grid.length, j*canvas.clientHeight/grid.length, canvas.clientHeight/grid.length, canvas.clientHeight/grid.length);
            } else if (grid[j][i] == 2) {
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(i*canvas.clientHeight/grid.length, j*canvas.clientHeight/grid.length, canvas.clientHeight/grid.length, canvas.clientHeight/grid.length);
            }
            else if (grid[j][i] == 3) {
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(i*canvas.clientHeight/grid.length, j*canvas.clientHeight/grid.length, canvas.clientHeight/grid.length, canvas.clientHeight/grid.length);
            }
            else if (grid[j][i] == 4) {
                ctx.fillStyle = '#0000ff';
                ctx.fillRect(i*canvas.clientHeight/grid.length, j*canvas.clientHeight/grid.length, canvas.clientHeight/grid.length, canvas.clientHeight/grid.length);
            }
        }   
    }
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);