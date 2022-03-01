import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    /// 1) Load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    /// 2) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    /// get search query
    const query = searchView.getQuery();
    if (!query) return;

    /// Load search results
    await model.loadSearchResults(query);

    /// render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
