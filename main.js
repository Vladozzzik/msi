const radio = document.querySelector(".radio");
const input = document.querySelector(".input_search");
const content = document.querySelector(".content");
const categories = document.querySelector(".categ_caterogies");
const favoriteContent = document.querySelector(".right_favorites_content");
const radio1 = document.getElementById("random");
const radio2 = document.getElementById("caterogies");
const radio3 = document.getElementById("Search");
const radioAnimal = document.getElementById("animal");
const radio2Career = document.getElementById("career");
const radio3Celebrity = document.getElementById("celebrity");
const radio4Dev = document.getElementById("dev");
const getButton = document.querySelector(".get");

getButton.addEventListener("click", getJoke);
radio.addEventListener("click", exam);
let allLikeArray = JSON.parse(localStorage.getItem('storedUsers'));
renderLike(allLikeArray)
async function getinf(adress) {
  let response = await fetch(adress);
  let commits = await response.json();
  if(allLikeArray == null){
    allLikeArray = [];
  }
  if(commits.error){
    alert("Потрібно ввести від 3 символів.")
    return
  }
  if (commits.result) {
    if(commits.result.length == 0 ){
      alert("За вашим запросом нічого не знайдено, спробуйте щось інше")
      return
    }
    content.innerHTML = `${commits.result.map((item) => {
      return `<div class="joke" >
          <img src="./img/speech-bubble.png" alt="">
          <div class="joke_content"><p class="joke_header"><span>ID:<a href=""> ${item.id}</a></span></p>
          <p class="joke_content_p">${item.value}</p>
        <div class="joke_foother"><span class="spanLeft">Last update: ${item.updated_at}</span><span class="spanRight">${item.categories}</span></div>
      </div>
      <svg class="toLike" id="${item.id}"  xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"> <path  fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>
        </div>         `;
    }).join('')}`;
  } else {
    content.innerHTML = `${`          <div class="joke">
    <img src="./img/speech-bubble.png" alt="">
    <div class="joke_content"><p class="joke_header"><span>ID:<a href=""> ${commits.id}</a></span></p>
    <p class="joke_content_p">${commits.value}</p>
  <div class="joke_foother"><span class="spanLeft">Last update: ${commits.updated_at}</span><span class="spanRight">${commits.categories}</span></div>
</div>
<svg class="toLike" id="${commits.id}" xmlns="http://www.w3.org/2000/svg" width="50" height="50"  fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"> <path  fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>
  </div>`}`;
  }
  const allToLike = document.querySelectorAll(".toLike");
  allToLike.forEach((item) => {
    item.addEventListener("click", function (e) {
      let is = false;
      if (commits.categories) {
        for (let i = 0; i < allLikeArray.length; i++) {
          if (allLikeArray[i].id == this.id) {
            is = true;
          }
        }
        if (is == false) {
          allLikeArray.push(commits);
        }
        if (is == true) {
          alert("Ви це вже вподобайкали");
        }
        renderLike(allLikeArray);
        localStorage.setItem('storedUsers', JSON.stringify(allLikeArray));
      }
      if (commits.result) {
        for (let i = 0; i < allLikeArray.length; i++) {
          if (allLikeArray[i].id == this.id) {
            is = true;
          }
        }
        if (is == false) {
          allLikeArray.push(
            commits.result.filter((word) => word.id == this.id)[0]
          );
        }
        if (is == true) {
          alert("Ви це вже вподобайкали");
        }
        renderLike(allLikeArray);
        localStorage.setItem('storedUsers', JSON.stringify(allLikeArray));
      }
    });
  });
}

async function getJoke() {
  if (radio1.checked) {
    getinf("https://api.chucknorris.io/jokes/random");
  }
  if (radio2.checked) {
    if (radioAnimal.checked) {
      getinf("https://api.chucknorris.io/jokes/random?category=animal");
    }
    if (radio2Career.checked) {
      getinf("https://api.chucknorris.io/jokes/random?category=career");
    }
    if (radio3Celebrity.checked) {
      getinf("https://api.chucknorris.io/jokes/random?category=celebrity");
    }
    if (radio4Dev.checked) {
      getinf("https://api.chucknorris.io/jokes/random?category=dev");
    }
  }
  if (radio3.checked) {
    let adress = "https://api.chucknorris.io/jokes/search?query=" + input.value;
    getinf(adress);
  }
}

function exam() {
  if (radio1.checked) {
    categories.classList.add("display");
    input.classList.add("display");
  }
  if (radio2.checked) {
    categories.classList.remove("display");
    input.classList.add("display");
  }
  if (radio3.checked) {
    categories.classList.add("display");
    input.classList.remove("display");
  }
}

function renderLike(array) {
  favoriteContent.innerHTML = `${array.map((item) => {
    return `<div class="jokeLike" >
        <img src="./img/speech-bubble.png" alt="">
        <div class="joke_content"><p class="joke_header"><span>ID:<a href=""> ${item.id}</a></span></p>
        <p class="joke_content_p">${item.value}</p>
      <div class="joke_foother"><span class="spanLeft">Last update: ${item.updated_at}</span><span class="spanRight">${item.categories}</span></div>
    </div>
    <svg class="dislike" id="${item.id}"xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>
      </div>         `;
  })}`;
  const allDislike = document.querySelectorAll(".dislike");
  allDislike.forEach((item) => {
    item.addEventListener("click", function (e) {
      array.forEach((value, key) => {
        if(value.id === this.id){
          array.splice(key, 1)

      }
    })
    localStorage.setItem('storedUsers', JSON.stringify(allLikeArray));
    renderLike(array)
    });
  }
  );
  
}
