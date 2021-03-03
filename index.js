import test from './importtest.js'

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
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener("click", getValue);
    generateHTMLRecipesList(recipes);
}, false);

const getValue = () => {
    let inputField = document.getElementById('input');
    let inputValue = inputField.value
    inputField.value = ''
    if (inputValue !== '') addToList({ name: inputValue, quantity: 1 }, 'input field')
};

//Function for adding items to listItems array
const addToList = (item, recipe) => {
    const itemToAdd = {
        name: item.name,
        quantity: item.quantity || 0,
        source: recipe
    };
    let itemAdded = false;
    for (const i of listItems) {
        if (i.name === itemToAdd.name) {
            i.quantityTotal += itemToAdd.quantity;
            i.items.push(itemToAdd)
            itemAdded = true
            updateListItem(i)
            break
        }
    };
    const itemToAddFirstTime = { name: itemToAdd.name, quantityTotal: itemToAdd.quantity || 0, items: [itemToAdd] }
    if (!itemAdded) {
        listItems.push(itemToAddFirstTime);
        createListItem(itemToAddFirstTime)
    }
};

//Create button for recipes list
const createRecipesButton = (recipe) => {
    const recipesButton = document.createElement("button");
    recipesButton.innerText = '+';
    recipesButton.key = recipe.dishName;
    recipesButton.addEventListener("click", () => {
        addListItemsFromRecipe(recipesButton.key)
    });
    return recipesButton
};

const createRecipesP = (recipe) => {
    const recipesP = document.createElement("p");
    recipesP.innerHTML = recipe.dishName;
    recipe.id = recipe.dishName;
    return recipesP
};
const listElement = document.getElementById('list');
const addItemToHTMLList = (item) => {
    listElement.appendChild(item)
}

const updateListItem = ({ name, quantityTotal }) => {
    document.getElementById(name).children[0].innerText = quantityTotal
}

const createListItem = ({ name, quantityTotal }) => {
    const newListItem = document.createElement('div');
    newListItem.innerText = name;
    newListItem.id = name;
    newListItem.className = 'shopping-item'
    const newListItemQuantity = document.createElement('span');
    newListItemQuantity.innerText = quantityTotal;
    newListItemQuantity.className = 'quantityTotal';
    newListItem.appendChild(newListItemQuantity);
    addItemToHTMLList(newListItem)
}

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


//Function for adding all ingridiens for selected recepie
const addListItemsFromRecipe = (btnKey) => {
    let recipe = recipes.filter(r => r.dishName === btnKey);
    const recipeSelect = recipe[0]
    recipeSelect.ingridiens.map(i => addToList(i, recipeSelect._id))

};

/*
- Refactor generateHTMLList
- CSS
- Selected recipes - adding and removing
- Removing ingridiences with removing selected recipes
- unit merging
*/