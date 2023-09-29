import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  return (
    <nav className="navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link className="brand " to="/">
            Hackflix
          </Link>
          {isSearchPage ? null : (
            <Link
              className="nav-link active text-light p-0 btn border rounded py-1 px-2"
              aria-current="page"
              to="/search"
            >
              Search for movies!
            </Link>
          )}
        </div>
        {/* <Link className="home-link " to="/">
          Home
        </Link> */}
      </div>
      <hr className="text-success" />
    </nav>
  );
}

export default Navbar;
