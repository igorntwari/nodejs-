// Format any integer provided into a string with "," (commas) in the correct places.
// Example:
// For n = 100000 the function should return '100,000';
// For n = 5678545 the function should return '5,678,545';
// for n = -420902 the function should return '-420,902'.
function formatNumber(number){
var  strNum=nzumber.toString();
for(var i=strNum.length;i>=0;i--){
    let newN =strNum;
    if((i-1)%3 ===0){
       newN.splice(i-1,0,',');
    }
    return newN;
}
 
}

console.log(formatNumber(100000))