//important array METHODS   ---->  {spice} and {sort} will mutate the array
                    // ----> everybody can take callback functions

                    //forEach
                    //map
                    //filter
                    //reduce
                    //sort
                    //find
                    //every
                    //fill
                    //splice

const numbers = [1,4,5,6,76,5];
function myNum(number, index){
    console.log(`index is ${index}`)
    console.log(`${number}*2 = ${number*2}`)
   
}
// for(let i=0; i<numbers.length;i++){
//     myNum(numbers[i],i)
// }

numbers.forEach(myNum);        //will pass the first element and its index and go on
                               //call back function (function as input)  --> no need of ()

console.log("")
console.log("")

numbers.forEach(function(number, index){
    console.log(`index is ${index}, number is ${number}`)
})

console.log("")
console.log("")

//---------------------------------------------------------------------------------------
const users =[
    {userID :1, firstName: "vishika" , password: 1234},
    {userID :2, firstName: "akshat" , password: 58678},
    {userID :3, firstName: "hanzala" , password: 124, gender: "male"},
]

users.forEach((user) => {
    console.log(user.userID);
})

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
// MAP METHOD    --->  callback functions (function as input)
//               --->  will make new array and return it 
//              ---->  that's why always use {return} not console.log
//               --->  always have two parameter an array and its index

const square = function(number){
    // console.log(number*number)
    return number * number;         //very impt to return otherwise if console.log will give undefined
}
const squareNum = numbers.map(square)         //will return it store in variable
console.log("map array method returns array : ",squareNum)

//--------------------------------------------------------
const squareNum1 = numbers.map((number, index) => {
    return `index[${index}] : ${number*number}`;
})
console.log(squareNum1)
console.log("")
//---------------------------------------------------------

const newArray = users.map(function(user){
    return user.userID
})
console.log("array of usernames : ",newArray)
console.log("")

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

//FILTER method   ---->  here call back functions will return booleon values (true/ false)
//                ---->  only return in array if true

const isOdd = function(number){
    return number%2!==0;
}

const oddNum = numbers.filter(isOdd)
console.log("filter method return array of all trues : ",oddNum)
console.log("")

//-------------------------------------

console.log(arr.filter((val)=>{
    return val > 3;
}))

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

//  REDUCE METHOD    --->  give a value
const sum = numbers.reduce((accumulator , currentValue) => {
    return accumulator + currentValue
}, 0)        // 0 is initial value

console.log(sum)

//accumulator              currentValue      return
//  0(intial value)        1 + 4               5
//    5                      5                  10
//    10                     6                 16
//    16                     76                   92
//    92                      5                    97

//---------------------------------------------------------------------------

let arrHell = [1,40,5, 7];

const output = arrHell.reduce((prev, curr) => {
    return  (prev > curr) ? prev : curr;
})

console.log(output);


  
//---------------------------------------------------------------------------

const userCart = [
    {productID: 1, productName: "mobile", price: 12000},
    {productID: 2, productName: "mobile", price: 65040},
    {productID: 3, productName: "mobile", price: 7000}
]

const total = userCart.reduce((Total_Price, currentProduct) => {
    return  Total_Price + currentProduct.price
}, 0)

console.log("total price of products : ", total)

//   Total_Price            currentProduct         return
//    0(initial)              12000               12000
//    12000                    65040                77040
//  77040                     7000               84040


//-------------------------------------------------------------------------------------------------
// sum and product till user prompted number.

let n = +prompt("Enter Number : ")
let arr = []

for(let i =1; i<=n; i++){
    arr[i-1]= i
}

let newAArr = arr.reduce((val1, val2)=>{
    return val1 + val2
}, 0)

console.log(newAArr);

let prod = (val1, val2) => {
    return val1*val2
}

let newAArr1 = arr.reduce(prod, 1);
console.log(newAArr1);


//-------------------------------------------------------------------------------------------------
// SORT METHOD   ----> as a string sort even if numbers ( ASCII)

const num = [5, 9, 1200, 401, 4000]        // 0 to 9 ( 48 to 57) ascii representation
//          ["5"(53), "9"(57), "1200"(49), "401"(52), "3000"(51)]  
num.sort();            //acc to ascii strings
console.log(num)


num.sort((a,b) => {return a-b });        // a-b for ascending
console.log(num)                         //b-a  for descending

//----------------------------------------------
const lowToHigh = userCart.slice(0).sort((a, b) => {return a.price- b.price})      //cloned array using slice
console.log("sorted price list : ",lowToHigh)                  //prices is sorted in ascending order
                
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

// FIND method
const myArray = ["hello", "cat", "dog", "lion"]

function isLength(string){
    return string.length===3;        //only till first occurance
}

const ans = myArray.find(isLength)    //return the string(only string not num.) which is true
console.log(ans)

//--------------------------------------

const ans2 = users.find((user) =>  user.userID==2)
console.log(ans2)



//-------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
// EVERY method   ----> if every element in array is true then return true otherwise false
const dogs = numbers.every((number) =>number%2===0);    
console.log("everyone has to return true: ",dogs)

//----------------------------
console.log(userCart.every((num) =>num.price<90000))
console.log("")




//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
// SOME method   ---> Atleast one element in array is true then overall return true
const newPy = numbers.some((number) =>number%2===0)
console.log("atleast one number returns true : ",newPy)


//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
// FILL METHOD 

const myArr = new Array(10).fill(8);
console.log(myArr)

//--------------------
//value(which value to fill with)   |  start(index from which to start)    |  end(index till end +1){LAST NOT INCLUDED THAT'S WHY +1}
const newArr = [1,2,3,4,5,6,7,8]
newArr.fill(0, 4, 7)            //(value, start, end)
console.log(newArr)

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
// SPLICE METHODS    ---->   to delete or insert inbetween arrays
//                   ---->    original array change
// start(index)     delete(how many elements to delete)      insert

const newArr1 = ["item1", "item2", "item3", "item4","item5"]
const deletedItem = newArr1.splice(1,2,"lala1");
console.log(deletedItem)         //also return deleted items in an ARRAY
console.log(newArr1)

newArr1.splice(1,1,"inserted item1", "inserted item2")       //will also return deleted items
console.log(newArr1)





   

