import style from "./redes.module.css";
import { LiaLinkedin } from "react-icons/lia";
import { VscGithub } from "react-icons/vsc";
import { AiOutlineInstagram } from "react-icons/ai";
const SocialButton = ({ link, link2, link3 }) => {
  const redirectToSocialMedia = () => {
    window.location.href = link;
  };
  const redirectToSocialMedia1 = () => {
    window.location.href = link2;
  };
  const redirectToSocialMedia2 = () => {
    window.location.href = link3;
  };

  return (
    <div className={style.container}>
      <div className={style.links}>
        <LiaLinkedin
          className={style.link}
          target="_blank"
          onClick={(e) => redirectToSocialMedia1()}
        />
        <AiOutlineInstagram
          className={style.link}
          target="_blank"
          onClick={(e) => redirectToSocialMedia2()}
        />
        <VscGithub
          className={style.link}
          target="_blank"
          onClick={(e) => redirectToSocialMedia()}
        />
      </div>
    </div>
  );
};

export default SocialButton;
