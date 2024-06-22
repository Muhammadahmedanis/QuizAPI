var signinbtn = document.getElementById("signinbtn");
var signupbtn = document.getElementById("signupbtn");
var namefield = document.getElementById("namefield");
var title = document.getElementById("title");

var arr = [];

function signup() {
    namefield.style.maxHeight = 0;
    title.innerHTML = "Sign In";
    signupbtn.classList.add("disab");
    signinbtn.classList.remove("disab");



    var getname = document.getElementById("sname");
    var getemail = document.getElementById("semail");
    var getpass = document.getElementById("spass");

    var checkemail = getemail.value;

    if (getname.value.trim().length == 0 || getemail.value.trim().length == 0 || !checkemail.includes("@gmail.com")) {
        signupbtn.classList.remove("disab");
        signinbtn.classList.add("disab");
        namefield.style.maxHeight = "60px";
        alert("Value not found");
    }
if(getname.value.trim().length != 0 && getemail.value.trim().length != 0)
    {

     var obj = {
        email: getemail.value,
        pass: getpass.value,
    }
    arr.push(obj);

    localStorage.setItem("Data", JSON.stringify(arr))
    localStorage.setItem("n", getname.value)

    getname.value  = "";
    getemail.value = "";
    getpass.value  = "";
    
    }
}


function signin() {
    namefield.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupbtn.classList.remove("disab");
    signinbtn.classList.add("disab");

    var getemails = document.getElementById("semail");
    var getpasse = document.getElementById("spass");

    var filters = arr.filter(function (data) {
        return data.email == getemails.value && data.pass == getpasse.value;
    })

    if (filters.length) {
        alert("login");
    }
    else {
        alert("Not login");
    }

    getemails.value = "";
    getpasse.value  = "";
}

var getUser = localStorage.getItem("Data");
if (getUser !== null) {
    arr = JSON.parse(getUser);
}




var timer = document.getElementById("timer");
var sec = 300;
// var time = setInterval(function () {
//     sec --;
//     timer.innerHTML = sec + " s";
//     if(sec == 0)
//         {
//             clearInterval(time);
//         }
    
// }, 1000) 

function logOut() {
    location.href  ="signin.html"    
}

// var questionDiv = document.getElementById("para");
// var score = document.getElementById("score");
// var l;

// fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
// .then((data) => data.json())
// .then((data1) =>{
//     // console.log(data1)   
//     // console.log(data1.results)   
//     data1.results.map((val, i) => {
//         // console.log(val.question);
//         // console.log(val.correct_answer);
//         // console.log(val.incorrect_answers);
//         questionDiv.innerHTML += ` <p><b>Q</b>: ${val.question}</p> `
//         questionDiv.innerHTML += `<input id= ${i}  type="radio" name="inp"> <label>${val.correct_answer}</label> <br/>`
//         for(var key in val.incorrect_answers)
//             {
//                 questionDiv .innerHTML += `<input id=${i} type="radio" name="inp">
//                 <label>${val.incorrect_answers[key]}</label> <br/>`
//                 // console.log(val.incorrect_answers[key]);
//             }

//             l = document.getElementsByName("inp")
//         })
//             console.log(l);
// })




var questionDiv = document.getElementById("para");
var scoreElement = document.getElementById("score");
var score = 0;

fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
  .then((data) => data.json())
  .then((data1) => {
    data1.results.map((val, i) => {
      // Display question
      questionDiv.innerHTML += `<p><b>Q</b>: ${val.question}</p>`;

      // Create an array to hold both correct and incorrect answers
      let answers = val.incorrect_answers;
      console.log(answers);
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, val.correct_answer);
      

      // Display each answer with a radio button
      answers.forEach((answer, index) => {
        questionDiv.innerHTML += `
          <input id="${i}-${index}" type="radio" name="inp-${i}" value="${answer}" data-correct="${answer === val.correct_answer}">
          <label for="${i}-${index}">${answer}</label><br/>
        `;
      });
    });

    // Add event listener to all radio buttons
    questionDiv.addEventListener('change', (event) => {
      if (event.target && event.target.matches("input[type='radio']")) {
        console.log(event.target.value); // Show the selected value in console

        // Check if the selected answer is correct
        if (event.target.dataset.correct === "true") {
          score++;
          scoreElement.innerText = `${score}`;
        }
      }
    });
  });



  //   console.log(`data-correct =  ${answer === val.correct_answer}`);

