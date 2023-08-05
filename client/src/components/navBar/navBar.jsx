import SearchBar from "../searchBar/searchBar";
import Button from "../Button/button";
const NavBar = ({ setCurrentPage }) => {
  return (
    <div className="navbar relative">
  <div className="flex w-full  justify-center  gap-2">
    <div className="form-control ">
      <SearchBar setCurrentPage={setCurrentPage} type="text" placeholder="Search" />
    </div>
    <div className=" dropdown-end">
        <div className="w-10 absolute right-3 top-4 rounded-full">
          <Button src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
    </div>
  </div>
</div>
  );
};

export default NavBar;
