// 2.Write a function that takes a string as input
//  and returns the same string with the first letter of each word capitalized. 

// For example, if the input is "the quick brown fox", 
// the output should be "The Quick Brown Fox".
function capitalizedLetters(str){
    let numString =str.split(' ');
    for(let i=0; i<numString.length; i++){
        if(numString[i]== numString[0]){
            return numString.toUpperCase();
        }
        else{
            return numString[i];
        }
    }
    const initials= numString.join(' ');
    return initials;
}
let string='the quick brown fox';
const result=capitalizedLetters(string);
