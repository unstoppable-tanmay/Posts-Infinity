function App() {
  return (
    <div className="w-screen min-h-max text-white px-4 md:px-10">
      <div className="heading tracking-widest text-[clamp(50px,8vw,130px)] font-medium text-white/50 w-full text-center h-max flex items-center justify-center selection:text-blue-300">
        {`POSTS`.split("").map((e) => {
          return (
            <span
              className="hover:translate-y-2 hover:text-white/40 duration-200"
              key={e}
            >
              {e}
            </span>
          );
        })}
      </div>
      <div className="desc text-lg tracking-widest flex items-center justify-center gap-1 text-white/40 selection:text-blue-100">
        Just Test The <div className="text-5xl leading-none">∞</div> Scroll After Signin...
      </div>
    </div>
  );
}

export default App;
