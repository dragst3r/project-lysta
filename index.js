const recipes = [
    {
        dishName: 'Szakszuka z bazylią',
        cookingTime: 20,
        difficulty: 'Łatwe',
        portions: 2,
        _id: 'hy1ia8e311',
        ingridiens: [
            {
                name: 'jajko',
                quantity: 2,
                unit: 'x'
            },
            {
                name: 'pomidory w puszce',
                quantity: 2,
                unit: 'x'
            },
            {
                name: 'bazylia',
            }
        ]
    },
    {
        dishName: 'Pizza z mozzarellą',
        cookingTime: 40,
        difficulty: 'Łatwe',
        portions: 2,
        _id: 'djvo11icls',
        ingridiens: [
            {
                name: 'drożdże',
                quantity: 20,
                unit: 'gram'
            },
            {
                name: 'ser żółty',
                quantity: 200,
                unit: 'gram'
            },
            {
                name: 'oregano',
            },
            {
                name: 'ser mozzarella',
                quantity: 1,
                unit: 'x'
            }
        ]
    }
];
var listItems = [];

const load = () => {
    let btn = document.getElementById('btn');
    generateHTMLRecipesList(recipes);
    btn.addEventListener("click", getValue)
};

const getValue = () => {
    let inputField = document.getElementById('input');
    let inputValue = inputField.value
    inputField.value = ''
    if (inputValue !== '') addToList({ name: inputValue, quantity: 1 },'input field'); generateHTMLList();
};

//Function for adding items to listItems array
const addToList = (item, recipe) => {
    const itemToAdd = {
        name: item.name,
        quantity: item.quantity || 0,
        source: recipe
    };
    let itemAdded = false;
    for (i of listItems) {
        if (i.name === itemToAdd.name) {
            i.quantityTotal += itemToAdd.quantity;
            i.items.push(itemToAdd)
            itemAdded = true
            break
        }
    };
    const itemToAddFirstTime = { name: itemToAdd.name, quantityTotal: itemToAdd.quantity || 0, items: [itemToAdd] }
    if (!itemAdded) listItems.push(itemToAddFirstTime)
};

//Create button for recipes list
const createRecipesButton = (recipe) => {
    const recipesButton = document.createElement("button");
    recipesButton.innerText = '+';
    recipesButton.key = recipe.dishName;
    recipesButton.addEventListener("click", () => {
        massAddToList(recipesButton.key)
    });
    return recipesButton
};

const createRecipesP = (recipe) => {
    const recipesP = document.createElement("p");
    recipesP.innerHTML = recipe.dishName;
    recipe.id = recipe.dishName;
    return recipesP
};

const generateHTMLRecipesList = (recipes) => {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';
    recipes.map(recipe => {
        let newP = createRecipesP(recipe);
        let newButton = createRecipesButton(recipe);
        newP.appendChild(newButton);
        recipesDiv.appendChild(newP)
    });
    document.getElementById("recipes-container").appendChild(recipesDiv)
};

const generateHTMLList = () => {
    document.getElementById('list').innerHTML = listItems.map(e => `<p key=${e.name} style="border: 1px solid red; width: 250px">${e.name} - quantity: ${e.quantityTotal}</p>`).join('')
};
//Function for adding all ingridiens for selected recepie
const massAddToList = (btnKey) => {
    let recipe = recipes.filter(r => r.dishName === btnKey);
    const recipeSelect = recipe[0]
    recipeSelect.ingridiens.map(i => addToList(i, recipeSelect._id))
    generateHTMLList()
};

/*
- Refactor generateHTMLList
- CSS
- Selected recipes - adding and removing
- Removing ingridiences with removing selected recipes
- unit merging
*/