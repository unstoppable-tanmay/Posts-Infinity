import { Button } from "@nextui-org/react";
import Signin from "./modals/Signin";
import Signup from "./modals/Signup";

const Nav = () => {
  return (
    <nav className="w-full sticky top-0 py-5 flex items-center justify-center text-white">
      <div className="wrap w-[100%] md:w-[80vw] flex items-center justify-between rounded-2xl bg-black/10 backdrop-blur-lg py-3.5 px-4">
        <div className="logo font-thin text-xl md:text-3xl tracking-wider">
          MelodyVerse
        </div>
        <div className="menu flex gap-4 text-white/50">
          <Signup />
          <Signin />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
