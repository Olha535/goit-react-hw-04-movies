import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Container from '../Container';
import AppBar from '../AppBar';

import Spinner from '../Loader';
// import NotFoundView from '../../views/NotFoundView';
// import HomePage from '../../views/HomePage';
// import MoviesDetailsPage from '../../views/MoviesDetailsPage';
// import MoviesPage from '../../views/MoviesPage';

// const NotFoundView = lazy(() =>
//   import('../../views/NotFoundView.js' /*webpackChunkName: "not-found-view" */),
// );
const HomePage = lazy(() =>
  import('../../views/HomePage.js' /*webpackChunkName: "home-page" */),
);
const MoviesDetailsPage = lazy(() =>
  import(
    '../../views/MoviesDetailsPage.js' /*webpackChunkName: "movies-details-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('../../views/MoviesPage.js' /*webpackChunkName: "movies-page" */),
);

export default function App() {
  return (
    <Container className="App">
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MoviesDetailsPage />
          </Route>
          {/* <Route>
            <NotFoundView />
          </Route> */}
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}
