const inputSlider = document.querySelector("[data-lengthSlider]");            // is ke andr pass karte h id , class , tag , custom attribute  -- > when we use custom attribute just follow the syntex [] 
const  lengthDisplay = document.querySelector("[data-lengthNumber]" );

const  passwordDisplay = document.querySelector("[data-passwordDisplay]" );
const  copyBtn = document.querySelector("[data-copy]" );
const  copyMsg = document.querySelector("[data-copyMsg]" );


const  uppercaseCheck = document.querySelector("#uppercase" );
const  lowercaseCheck = document.querySelector("#lowercase" );

const  numberCheck = document.querySelector("#numbers" );
const  symbolsCheck = document.querySelector("#symbols" );

const  indicator = document.querySelector("[data-indicator]" );
const  generateBtn = document.querySelector(".generateBtn" );

const  allCheckBox = document.querySelectorAll("input[type=checkBox]" );   // all check box permitted 
const  symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'; // divide is remaining

let password = "";
let passwordLength = 10;
let checkcount = 1;

// set strength circle color to grey
handleSlider();

// set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}


// set the color strength and set the showdow of the strength
function setIndicator(color ){
    indicator.style.backgroundColor = color;
    // indicator.style. = 
    // hw shadow
}


 function getRndinteger(min , max ){

   return  Math.floor( Math.random() * ( max - min ) ) + min;
    //  console.log(   Math.floor( Math.random() * ( max - min ) ) + min  );
}

   function generateRandomNumber(){
    return getRndinteger( 0 , 9 );
   }

   function generateLowerCase() {
    return String.fromCharCode( getRndinteger( 97 , 123 ));   // get lower character 
   }

   function generateUpperCase() {
    return String.fromCharCode ( getRndinteger( 65 , 91 ));   //  get upper character 
   }

    // generate symbol
   function generateSymbol() {
     const randNum = getRndinteger( 0 , symbols.length ) ;
     return symbols.charAt( randNum );
   }

   function calcStrength() {
    let hasupper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false;

    if( uppercaseCheck.checked ){
       hasupper = true;
    }
    if( lowercaseCheck.checked ){
      haslower = true;
    }
    if( numberCheck.checked ){
      hasNum = true;
    }
    if( symbolsCheck.checked ){
      hasSym = true;
    }

    if( hasupper && hasNum && ( hasNum || hasSym ) && passwordLength >= 8 ){
      setIndicator(" #0f0 ");
    }
    else if ( ( haslower || hasupper ) &&  ( hasNum || hasSym ) && passwordLength >= 6 ){
      setIndicator ( "#ff0" );
    }  else {
      setIndicator ( "#f00" );
    }
  }

  async function copyContent() {
      try{
        await navigator.clipboard.writeText( passwordDisplay.value );
        copyMsg.innerText = "copied";
      }
      catch(e){
        copyMsg.innerText = "failed";
      }
      // to make copy wala span visible
      copyMsg.classList.add(" active ");

      setTimeout(() => {
        copyMsg.classList.remove( "active" );
      }, 2000 );
  }

  function shufflePassword( array ){
    // shuffle/rearrange the passwrd krne k liye       using Fisher yates method algorithm

    for( let i = array.length - 1 ; i>0; i-- ){
      const j = Math.floor( Math.random() * ( i+1 ) );
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    
    //  1st way 
    let str = "";
    array.forEach( (el)  => (
    str += el          ));
      
 
    //  2nd way 
    // for( let i=0; i<array.length; i++ ){
    //   str += array[i];
    // }
     
    console.log( str );
    return str ;

  }


  function handleCheckBoxChange(){
      checkcount = 0;
      allCheckBox.forEach( (checkbox) => {
          if( checkbox.checked )
              checkcount++;
        
      } );

      // special condition 
      if( passwordLength < checkcount ){
         passwordLength = checkcount ;
         handleSlider();
      }
      
  }
  // document.write( checkcount );
  //  console.log( checkcount );

  allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change' , handleCheckBoxChange );
    
  })


  inputSlider.addEventListener('input',(e) => {
      passwordLength = e.target.value;
      handleSlider();
  })

  copyBtn.addEventListener('click',(e) => {
   if( passwordDisplay.value ) //1   if it is not empty value in the password than copy function call or 2 if password.length is greater then 0 so copy then otherwise not copy  
    copyContent();
  
  })



generateBtn.addEventListener('click', () => {
      // none of the checked are selected 
       if( checkcount <= 0 )
       return ;

       if( passwordLength < checkcount ){
        passwordLength = checkcount;
        handleSlider();
       }


      //  lets start the journey to find the new passwrd 
      console.log(" starting the journey ");
      // remove old password
      password = "";

      // add the passwrd string  generator 
        // if( uppercaseCheck.checked ){
        //   password += generateUpperCase();
        // }
        // if( lowercaseCheck.checked ){
        //   password += generatelowerCase();
        // }
        // if( numberCheck.checked ){
        //   password += generateRandomNumber();
        // }
        // if( symbol.checked ){
        //   password += generateSymbol();
        // }

        let funcArr = [];

        if( uppercaseCheck.checked ){
          funcArr.push( generateUpperCase );
        }
        if( lowercaseCheck.checked ){
          funcArr.push( generateLowerCase );
        }
        if( numberCheck.checked ){
          funcArr.push( generateRandomNumber );
        }
        if( symbolsCheck.checked ){
          funcArr.push( generateSymbol );
        }
      //  eg is 10 length of the password 
      // compulsory addition  ->  first we selected all 4 checkbox  ( 4 is compulsory and 6 is remaining addition)
        for( let i=0; i<funcArr.length; i++){
          password += funcArr[i]();
        }

        console.log("compulsory addition done ");

         // remaining addition
        for( let i=0; i<passwordLength  - funcArr.length; i++ ){
           let randindex = getRndinteger( 0 , funcArr.length );
           console.log(" randindex ");

           password += funcArr[randindex]();            
        }
        console.log(" remaining addition done ");

        // console.log( password );
        // shuffle the password  --> means  change the current places 
        password = shufflePassword( Array.from( password ) ); // fisher yates method algo
        console.log("shuffle done ");

        // show the UI
        passwordDisplay.value = password ;
        console.log(" UI done ");

        // calculate strength
         calcStrength();

});

