
// console.log( " 1 ");
// console.log( " 2");
 
// // function hello(){
// //     console.log( " hello world ");
// // }
// // in setTimeout hello is callback leta h 
// // setTimeout( hello , 3000 );

//  or

// //setTimeout( () => {
// //    console.log( " hello ");
// //}, 3000 );

// console.log( " 3 ");
// console.log( " 4 ");





// async-await function

function getdata( dataId ){
    return new Promise(( resolve, reject ) => {
        setTimeout(() => {
            console.log("d ", dataId );
            resolve( "success" );
        }, 1000 );
    });
}

//  work
async function getalldata() {

    console.log("data1... " ); 
    await getdata(1);

    console.log("data2... " ); 
    await getdata(2);

    console.log("data3... " ); 
    await getdata(3);
};
// call function. in console first 
getalldata() 



// IIfe function syntx --> there are 3 syntx
// 1 normal func. , aero function, & async function 
// work
// ( async function () {

//     console.log("data1... " ); 
//     await getdata(1);

//     console.log("data2... " ); 
//     await getdata(2);

//     console.log("data3... " ); 
//     await getdata(3);


// }) ();


