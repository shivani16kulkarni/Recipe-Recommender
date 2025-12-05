import Home from '@/pages/Home';
import RecipeList from '@/pages/RecipeList';
import Favorites from '@pages/Favorites';
import Layout from '@pages/Layout';
import RecipeDetails from '@pages/RecipeDetails';
import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/recipe-list',
        element: <RecipeList />
      },
      {
        path: '/recipe-details',
        element: <RecipeDetails />
      }
    ]
  }
]);

export default router;
