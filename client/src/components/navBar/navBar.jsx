import SearchBar from "../searchBar/searchBar";
import Button from "../Button/button";
import SocialButton from "../redes/redes";
const NavBar = () => {
  return (
    <div>
      <SearchBar />
      <Button />
      <SocialButton
        socialMedia="Github"
        link="https://github.com/MatiasGigena"
      />
    </div>
  );
};

export default NavBar;
