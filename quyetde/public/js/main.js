let el;                                                    

el = document.getElementById('textcontent');                   
el.addEventListener('keyup', ()=>{
    let maxWord = 300;
    let countRemaining;
    let counter;
    counter = document.getElementById('countWord');
    countRemaining = (maxWord - el.value.length);
    if(countRemaining <= 0){
        el.value = el.value.substring(0,maxWord);
    }
    counter.innerHTML = el.value.length + "/" + maxWord;
    
});
let ignore = () =>{
    let counter;
    counter = document.getElementById('textcontent').value.length;
    if(counter == 0){
        document.getElementById("validate").innerHTML = "You must enter the question!";
    }else{
        document.getElementById("validate").innerHTML = "";
    }
}

// document.getElementById();
// document.getElementsByClassName();
// document.querySelector();
// document.querySelectorAll();

// elementObject.addEventListener();