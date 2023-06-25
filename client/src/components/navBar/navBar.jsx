import SearchBar from "../searchBar/searchBar";
import Button from "../Button/button";
import SocialButton from "../redes/redes";
const NavBar = ({ setCurrentPage }) => {
  return (
    <div>
      <SearchBar setCurrentPage={setCurrentPage} />
      <Button />
      <SocialButton
        link="https://github.com/MatiasGigena"
        link2="https://www.linkedin.com/in/matias-gigena/"
        link3="https://www.instagram.com/matiasgigena_/"
      />
    </div>
  );
};

export default NavBar;
