/**
 * Created by mlagusker on 5/7/17.
 */
var person = {
    name: 'Vasja',
    age: 25
}

function updatePerson(obj) {
    obj = {
        name: 'Vasja',
        age: 30
    }
}

updatePerson(person);
console.log(person);
var exampleArray = ['first', 'second'];
function updateArray(arr){
    arr = ['firsts', 'seconds'];
}
function updateArrayReal(arr){
    arr[0] = 'firsts';
    arr[1] = 'seconds';
}

updateArray(exampleArray);
console.log(exampleArray);
updateArrayReal(exampleArray);
console.log(exampleArray);
