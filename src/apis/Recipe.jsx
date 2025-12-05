import { BASE_URL } from '@/apis/Config.jsx';

export async function getRecipeByIngredient(name, options = {}) {
  try {
    const url = `${BASE_URL}/filter.php?i=${encodeURIComponent(name)}`;
    const response = await fetch(url, options);
    if (!response.ok) return { data: null, response: response.status };
    const json = await response.json();
    if (!json.meals) return { data: [], error: null };

    const meals = json.meals.map(meal => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        img: meal.strMealThumb
      };
    });
    return { data: meals, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

export async function getRecipeDetailsById(id, options = {}) {
  try {
    const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      return { data: null, error: response.status };
    }
    const json = await response.json();
    if (!json.meals) return { data: [], error: null };

    const cleanRecipeDetail = json.meals.map(meal => {
      let cleanIngredients = [];
      for (let l = 1; l <= 20; l++) {
        const ingredient = (meal[`strIngredient${l}`] || '').trim();

        const measurement = (meal[`strMeasure${l}`] || '').trim();
        if (!ingredient || ingredient === ' ') continue;
        cleanIngredients.push(`${measurement} ${capitlaiseFirstLetter(ingredient)}`);
      }
      const recipeDetails = {
        id: meal.idMeal,
        title: capitlaiseFirstLetter(meal.strMeal),
        category: capitlaiseFirstLetter(meal.strCategory),
        cuisine: capitlaiseFirstLetter(meal.strArea),
        instructions: enumerateText(meal.strInstructions),
        img: meal.strMealThumb,
        video: meal.strYoutube,
        ingredients: cleanIngredients.filter(Boolean)
      };
      return recipeDetails;
    });
    console.log(cleanRecipeDetail);
    return cleanRecipeDetail;
  } catch (err) {
    return { data: null, error: err.message };
  }
}

export async function getRandomRecipe(options = {}) {
  try {
    const url = `${BASE_URL}/random.php`;
    const response = await fetch(url, options);
    if (!response.ok) {
      return { data: null, error: response.status };
    }
    const json = await response.json();
    if (!json.meals) return { data: [], error: null };

    const meals = json.meals.map(meal => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        img: meal.strMealThumb
      };
    });
    return { data: meals[0], error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

function capitlaiseFirstLetter(ingredient) {
  return ingredient
    .split(' ')
    .map(u => u.charAt(0).toUpperCase() + u.slice(1))
    .join(' ');
}
function enumerateText(text) {
  const lines = text.split(/\r?\n/);
  return lines.filter(t => t.trim() !== '');
}
