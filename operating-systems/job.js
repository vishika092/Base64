function performHeavyTask(){
    let counter = 0;
    for(let i = 0; i < 1e9; i++){
        counter +=1
    }
    return counter
}

export default performHeavyTask
// console.time("OG");

// console.log(performHeavyTask());
// console.timeEnd("OG");
