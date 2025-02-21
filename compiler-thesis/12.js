import fs from 'fs/promises'

async function main(){
    let res = await fs.readFile("./myfile.bin")
    console.log("done reading");
    
}

main()