const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-closeBtn');
const img_bcg = document.querySelector('.img-bcg');
const headerContent = document.querySelector('.header-content');
const main = document.querySelector('.main');
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    reset();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal you want to search in the search box</h2>`
        return;
    }
    fetchRecipes(searchInput);
});

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${i} - ${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions: </h3>
        <p>${meal.strInstructions}</p>
    </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

//func for recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>"
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipePopup(meal);
            });
            recipeContainer.appendChild(recipeDiv);
        });
    } 
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching recipes...</h2>"
    }


    // console.log(response.meals[0]);
}
const reset = () => {
    main.style.display = "block";
    img_bcg.style.display = "none";
    headerContent.style.position = 'static';
    headerContent.style.top = 'auto';
    headerContent.style.left = 'auto';
    headerContent.style.transform = 'none';

}