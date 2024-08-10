const searchBarContainer = document.querySelector(".search-bar-container");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recipesContainer = document.getElementById("recipesContainer");
const recipeDetailsModal = document.getElementById("recipeDetailsModal");
const recipeTitle = document.getElementById("recipeTitle");
const recipeImage = document.getElementById("recipeImage");
const recipeIngredients = document.getElementById("recipeIngredients");
const recipeInstructions = document.getElementById("recipeInstructions");
const closeButton = document.getElementById("closeButton");
const loader = document.getElementById("loader");
const notification = document.getElementById("notification");
const saveListButton = document.getElementById("saveListButton");

let recipes = [];
const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

// Event listener for the form submit in recipe search
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        await searchRecipes(searchTerm);
    }
});

// Function for searching recipes using TheMealDB API
async function searchRecipes(searchTerm) {
    try {
        loader.classList.remove('hidden');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        recipes = data.meals || [];
        renderRecipes(recipes);
    } catch (error) {
        console.warn("Some error occurred", error);
    } finally {
        loader.classList.add('hidden');
    }
}

// Function to render recipes
function renderRecipes(recipes) {
    recipesContainer.innerHTML = "";
    if (recipes.length > 0) {
        searchBarContainer.classList.replace("search-bar-center", "search-bar-top");
        recipes.forEach(recipe => {
            const isSaved = savedRecipes.some(saved => saved.idMeal === recipe.idMeal);
            const saveIconClass = isSaved ? 'save-icon saved' : 'save-icon';

            const recipeCard = `
            <div class="recipe-card bg-gray-800 rounded shadow p-4 cursor-pointer" data-recipe-id="${recipe.idMeal}">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-48 object-cover mb-4 rounded">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold">${recipe.strMeal}</h2>
                    <button class="${saveIconClass}" data-recipe-id="${recipe.idMeal}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            </div>
            `;
            recipesContainer.innerHTML += recipeCard;
        });
        notification.classList.add('hidden');
    } else {
        searchBarContainer.classList.replace("search-bar-top", "search-bar-center");
        notification.classList.remove('hidden');
    }
}

// Function to save a recipe
function saveRecipe(recipe) {
    if (!savedRecipes.some(saved => saved.idMeal === recipe.idMeal)) {
        savedRecipes.push(recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
}

// Function to unsave a recipe
function unsaveRecipe(recipeId) {
    const index = savedRecipes.findIndex(recipe => recipe.idMeal === recipeId);
    if (index > -1) {
        savedRecipes.splice(index, 1);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    }
}

// Function to toggle the save status of a recipe
function toggleSaveStatus(recipeId) {
    const recipeCard = document.querySelector(`.recipe-card[data-recipe-id="${recipeId}"]`);
    const saveButton = recipeCard.querySelector('.save-icon');

    if (saveButton.classList.contains('saved')) {
        saveButton.classList.remove('saved');
    } else {
        saveButton.classList.add('saved');
    }
}

// Event listener for recipe card click to open modal or save/unsave recipe
recipesContainer.addEventListener("click", event => {
    const recipeCard = event.target.closest(".recipe-card");
    const saveIcon = event.target.closest(".save-icon");

    if (recipeCard && !saveIcon) {
        const recipeId = recipeCard.dataset.recipeId;
        const recipe = recipes.find(recipe => recipe.idMeal === recipeId);
        openRecipeDetailsModal(recipe);
    } else if (saveIcon) {
        const recipeId = saveIcon.dataset.recipeId;
        const recipe = recipes.find(recipe => recipe.idMeal === recipeId);
        if (saveIcon.classList.contains('saved')) {
            unsaveRecipe(recipeId);
        } else {
            saveRecipe(recipe);
        }
        toggleSaveStatus(recipeId);
    }
});

// Event listener for the save list button
saveListButton.addEventListener('click', () => {
    if (savedRecipes.length > 0) {
        renderRecipes(savedRecipes);
    } else {
        alert("No saved recipes found.");
    }
});

// Function to open the recipe details modal
function openRecipeDetailsModal(recipe) {
    recipeTitle.textContent = recipe.strMeal;
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;

    recipeIngredients.innerHTML = "";
    recipeInstructions.textContent = "";

    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient} - ${measure}`;
            recipeIngredients.appendChild(listItem);
        }
    }

    recipeInstructions.innerHTML = recipe.strInstructions.replace(/[\r\n]+/g, '<br><br>');
    recipeDetailsModal.classList.remove('hidden');
}

closeButton.addEventListener('click', () => {
    recipeDetailsModal.classList.add('hidden');
});

// Load saved recipes on page load and update the save icon status
window.addEventListener('load', () => {
    savedRecipes.forEach(recipe => toggleSaveStatus(recipe.idMeal));
});
