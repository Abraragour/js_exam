let rowData=document.getElementById("rowData")
let searchContainer=document.getElementById("searchContainer")
let submitBtn;
$(window).ready(function(){
    $('#loading').fadeOut(1000,function(){
       $('body').css('overflow','visible')
    $('.inner-loadingScrean').fadeOut(500)
})
});




let openBtn = $('.fa-bars');
let closeBtn = $('.fa-xmark');
let Animate=$('ul li');

openBtn.click(function(){
    $("#sidebar").animate({left:0},500)
    closeBtn.removeClass('d-none')
    openBtn.addClass('d-none')
    Animate.addClass('animate__animated animate__backInUp')
    Animate.addClass('animate__backInUp')
    Animate.removeClass('animate__backOutDown')

})
function closeSide(){
    let sidebarInnerWidth=$(".sidebar_inner").innerWidth();
    $("#sidebar").animate({left:-sidebarInnerWidth},500)
    openBtn.removeClass('d-none')
    closeBtn.addClass('d-none')

    Animate.addClass('animate__animated')
    Animate.addClass('animate__backOutDown')
    Animate.removeClass('animate__backInUp')

}
closeBtn.click(function(){
  closeSide()
})


async function getData(key){

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
       response = await response.json()

       displayMeals(response.meals)
    }

function displayMeals(arr){
let cartoona ="";
for(let i=0; i<arr.length;i++)
{
    cartoona +=`
    <div class="col-md-3">
    <div onclick="getMealDetails('${arr[i].idMeal}')"     class="meal rounded-2 overflow-hidden position-relative cursor-pointer">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="">
      <div class="meal-layer p-2 d-flex align-items-center position-absolute ">
        <h3>${arr[i].strMeal}</h3>
      </div>

    </div>
  </div>
    `
}
rowData.innerHTML=cartoona;
}
getData("")

async function getCategories(){
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
  searchContainer.innerHTML=``
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response=await response.json()
    displayCategories(response.categories)
    $('.inner-loadingScrean').fadeOut(500)

}

function displayCategories(arr){
    let cartoona ="";
    for(let i=0; i<arr.length;i++)
    {
        cartoona +=`
        <div class="col-md-3">
        <div onclick="filterCategories('${arr[i].strCategory}')" class="meal rounded-2 overflow-hidden position-relative  cursor-pointer">
          <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
          <div class="meal-layer p-2 text-center position-absolute ">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
    
        </div>
      </div>
        `
    }
    rowData.innerHTML=cartoona;
    }

async function getArea(){
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
      searchContainer.innerHTML=``
        let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        response=await response.json()
        console.log(response.meals)
        displayArea(response.meals)
        $('.inner-loadingScrean').fadeOut(500)
    }
    
function displayArea(arr){
        let cartoona ="";
        for(let i=0; i < arr.length ;i++)
        {
            cartoona +=`
            <div class="col-md-3">
            <div onclick="filterAreaMeals('${arr[i].strArea}')"   class= rounded-2 text-center  cursor-pointer">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
          </div>
            `
        }
        rowData.innerHTML=cartoona;
        }

async function getIngredients(){
  // rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
          searchContainer.innerHTML=``
            let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list
            `)
            response=await response.json()
            displayIngredients(response.meals.slice(0,20))
            $('.inner-loadingScrean').fadeOut(500)
}
        
function displayIngredients(arr){
            let cartoona ="";
            for(let i=0; i < arr.length ;i++)
            {
                cartoona +=`
                <div class="col-md-3">
                <div onclick="filterIngreadientMeals('${arr[i].strIngredient}')" class=" rounded-2 text-center cursor-pointer">
                  <i class="fa-solid fa-drumstick-bite  fa-4x"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
              </div>
                `
            }
            rowData.innerHTML=cartoona;
            }

async function filterCategories(key){
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`)
    response=await response.json()

    console.log(response)
    displayMeals(response.meals)
    $('.inner-loadingScrean').fadeOut(500)
    
}

async function filterAreaMeals(key){
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`)
    response=await response.json()
    displayMeals(response.meals)
    $('.inner-loadingScrean').fadeOut(500)
}

async function filterIngreadientMeals(key){
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`)
    response=await response.json()
    displayMeals(response.meals)
    $('.inner-loadingScrean').fadeOut(500)
}


async function getMealDetails (key){
  rowData.innerHTML=''
  $('.inner-loadingScrean').fadeIn(500)
  searchContainer.innerHTML=``
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`)
    response=await response.json()
    console.log(response.meals[0])
    displayMealDetails(response.meals[0])
    $('.inner-loadingScrean').fadeOut(500)
}



function displayMealDetails(meal){
  searchContainer.innerHTML=''
let ingredients= ``;
for(let i =1;i<20;i++)
{
  if(meal[`strIngredient${i}`])
  {
    ingredients+=`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]}   ${meal[`strIngredient${i}`]}  </li>`
  }
}
 let tags= meal.strTags?.split(",");
 console.log(tags)
 if(!tags)
 {tags=[]}
 let tagsStr=''
 for(let i =0;i<tags.length;i++)
{
 
tagsStr+=`<li class="alert alert-danger m-2 p-1">${tags[i]}</li>
`
}





    let cartoona=`<div class="col-md-4">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
       </div>
     <div class="col-md-8">
    <h2>instructions</h2>
    <p>${meal.strInstructions}</p>
   <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
       ${ingredients}
    </ul>

    <h3>Tags :</h3>

    <ul class="list-unstyled d-flex g-3 flex-wrap">
        
${tagsStr}    
</ul>

    <a target="_blank" href="${meal.strYoutube}" class="btn btn-success">Source</a>
    <a target="_blank" href="${meal.strSource}" class="btn btn-danger">Youtube</a>
</div>`
rowData.innerHTML=cartoona;

}

function showSearchInputs(){
  searchContainer.innerHTML=`<div class="row serch py-4">
  <div class="col-md-6">
    <input onKeyup="searchByName(this.value)"  class="input-color form-control bg-transparent text-white" type="text" placeholder="Search by Name">
  </div>
  <div class="col-md-6">
    <input onKeyup="searchByLetter(this.value)" maxlength="1"  class="form-control bg-transparent text-white" type="text" placeholder="Search by First Letter">
  </div>
  </div>
  `
  rowData.innerHTML=''
}
async function searchByName(key){
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
  response = await response.json()
  if(response.meals){
  displayMeals(response.meals)

  }
  else
  {
    displayMeals([])
  }
  $('.inner-loadingScrean').fadeOut(500)
}

async function searchByLetter(key){
  // if(key=="")
  // {
  //   key="a";
  // }
  // else{
  //   key=""
  // }
  rowData.innerHTML=``
  $('.inner-loadingScrean').fadeIn(500)

  key== ""? key="a":"";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`)
  response = await response.json()
  console.log(response)
  if(response.meals){
    displayMeals(response.meals)
    }
    else
    {
      displayMeals([])
    }
     $('.inner-loadingScrean').fadeOut(500)
}

function showContacts(){
rowData.innerHTML=` <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
    <div class="row g-4">
        <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div>
        </div>
        <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
            </div>
        </div>
        <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </div>
        </div>
        <div class="col-md-6">
            <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
        </div>
        <div class="col-md-6">
            <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword 
            </div>
        </div>
    </div>
    <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div>`
 submitBtn=document.getElementById("submitBtn")
 
 document.getElementById("nameInput").addEventListener("focus",()=>{
  nameInputTouched=true;
})

document.getElementById("emailInput").addEventListener("focus",()=>{
  emailnputTouched=true;
})

document.getElementById("phoneInput").addEventListener("focus",()=>{
  phonenputTouched=true;
})
document.getElementById("ageInput").addEventListener("focus",()=>{
  ageInputTouched=true;
})
document.getElementById("passwordInput").addEventListener("focus",()=>{
  passwordInputTouched=true;
})
document.getElementById("repasswordInput").addEventListener("focus",()=>{
  repasswordInputTouched=true;
})


}
let nameInputTouched=false;
let emailnputTouched=false;
let phonenputTouched=false;
let ageInputTouched=false;
let passwordInputTouched=false;
let repasswordInputTouched=false;



function inputsValidation(){

if(nameInputTouched){
  if(nameValidation()){
    document.getElementById("nameAlert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("nameAlert").classList.replace("d-none","d-block")
  
  }
}

if(emailnputTouched){
  if(emailValidation()){
    document.getElementById("emailAlert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("emailAlert").classList.replace("d-none","d-block")
  
  }
}

if(phonenputTouched){
  if(phoneValidation()){
    document.getElementById("phoneAlert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("phoneAlert").classList.replace("d-none","d-block")
  
  }
  
}

if(ageInputTouched){
  
if(ageValidation()){
  document.getElementById("ageAlert").classList.replace("d-block","d-none")
}
else{
  document.getElementById("ageAlert").classList.replace("d-none","d-block")

}

}

if(passwordInputTouched){
  if(passwordValidation()){
    document.getElementById("passwordAlert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("passwordAlert").classList.replace("d-none","d-block")
  
  }
}

if(repasswordInputTouched){
  if(repasswordValidation()){
    document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
  }
  else{
    document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
  
  }
}


  if(nameValidation()&&
  phoneValidation()&&
  emailValidation()&&
  ageValidation()&&
  passwordValidation()&&
  repasswordValidation())
  {
    submitBtn.removeAttribute("disabled")

  }
  else{
    submitBtn.setAttribute("disabled",true)

  }
}
function nameValidation(){
  return( /^[a-zA-Z ]+$/.test (document.getElementById("nameInput").value))
}
function emailValidation(){
  return(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (document.getElementById("emailInput").value))
}
function phoneValidation(){
  return(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test (document.getElementById("phoneInput").value))
}
function ageValidation(){
  return(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test (document.getElementById("ageInput").value))
}
function passwordValidation(){
  return(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test (document.getElementById("passwordInput").value))
}
function repasswordValidation(){
  return document.getElementById("repasswordInput").value==document.getElementById("passwordInput").value
}