import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Login";

import { Register } from "./Register";
// import Hero from "./Hero";
import Slider from "./Slider";
import { NavScrollExample } from "./Navbar";
import Wishlist from "./Wishlist";
// import TopRatedcarsds from "./TopRatedMovies";
import MovieFooter from "./Moviefooter";
import ContactPage from "./ContactUs";
import MovieDetails from "./MovieDetails";
import Genres from "./Genres";
import TopRatedMovies from "./TopRatedMovies";
import MaybeYouLike from "./MaybeYouLike";
import GenreMovies from "./GenreMovies";
import CommentPage from "./CommentPage";

import Movies from "./movies";
// import AdminLayout from "../admin/AdminLayout";
// import Dashboard from "../admin/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavScrollExample />
          <Slider />
          <Genres />
          <TopRatedMovies />
          <MaybeYouLike />
          <MovieFooter />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <div>
          <Login />
        </div>
      ),
    },
    {
      path: "/Register",
      element: (
        <div>
          <Register />
        </div>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <div>
          <NavScrollExample />
          <Wishlist />
          <MovieFooter />
        </div>
      ),
    },
    {
      path: "/movies",
      element: (
        <div>
          <NavScrollExample />
          <Movies />
          <MovieFooter />
        </div>
      ),
    },
    {
      path: "/Contactus",
      element: (
        <div>
          <NavScrollExample />
          <ContactPage />
          <MovieFooter />
        </div>
      ),
    },
    {
      path: "/MovieDetails/:id",
      element: (
        <div>
          <NavScrollExample />
          <MovieDetails />
          <CommentPage />
          <MovieFooter />
        </div>
      ),
    },
    {
      path: "/genre/:id",
      element: (
        <div>
          <NavScrollExample />
          <GenreMovies />
          <MovieFooter />
        </div>
      ),
    },
    // // admin routes
    // {
    //   path: "/dashboard",
    //   element: (
    //     <AdminLayout>
    //       <Dashboard />
    //     </AdminLayout>
    //   ),
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
