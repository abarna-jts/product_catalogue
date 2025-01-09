import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import NewCatalogue from "./pages/userPages/NewCatalogue";
import CatalogueList from "./pages/userPages/CatalogueList";
import CategoryList from "./pages/userPages/CategoryList";
import ProductList from "./pages/userPages/ProductList";
import { useState } from "react";
import AllProductList from "./pages/userPages/AllProductList";
import AllCategoryList from "./pages/userPages/AllCategoryList";

const Layout = () => {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(false);
  return (
    <>
      <Navbar />
      <div className="md:flex">
        <SideBar setExpand={setSideMenuIsExpand} />
        <div
          className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
            sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
          }`}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/old_catalogue",
        element: <NewCatalogue />,
      },
      {
        path: "/catalogues",
        element: <CatalogueList />,
      },
      {
        path: "/categories",
        element: <CategoryList />,
      },
      {
        path: "/category_products",
        element: <ProductList />,
      },
      {
        path: "/all_product",
        element: <AllProductList />,
      },
      {
        path: "/all_category",
        element: <AllCategoryList />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
