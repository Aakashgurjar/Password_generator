const url = "https://cat-fact.herokuapp.com/facts";
const factpara = document.querySelector("#fact");
const btn = document.querySelector( "#btn");

// how to write a fetch syntx 
// let variable = fetch (url , [options] ) 

//  with the help of promise to  ->  async func. uses 
// kisi bhi api ko call krke data lena asyncronous work h --> kyuki ho sakta h api ko time lage data lane me --> so use the keyword await 

const getFacts = async ( ) => {
console.log( "getting data ");

// let response =  await fetch (  url ) ; 
// console.log( response.status );   // 200 ans

//  fatch return 1st Promise 
let response =  await fetch (  url ) ; 
console.log( response  );

//   json return 2st Promise and  .json is asyncronous  that can be use await keyword 
let data = await response.json();
// console.log( data );  // arr return 
// console.log( data[0]);
// console.log( data[0]._id );
// console.log( data[0].text );
// console.log( data[0].type );


// print document window 

factpara.innerHTML = data[0].text;
// factpara.innerHTML = data[0]._id;
}
btn.addEventListener( "click" , getFacts );











