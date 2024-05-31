const Nav = () => {
  return (
    <nav className="w-[80vw] flex items-center justify-between rounded-2xl bg-black/30 backdrop-blur-xl py-5 px-4">
      <div className="logo font-thin text-3xl tracking-wider">MelodyVerse</div>
      <div className="menu flex gap-4 text-white/50">
        <div className="item text-lg font-semibold hover:text-white duration-200 cursor-pointer">
          Home
        </div>
        <div className="item text-lg font-semibold hover:text-white duration-200 cursor-pointer">
          Home
        </div>
      </div>
    </nav>
  );
};

export default Nav;
