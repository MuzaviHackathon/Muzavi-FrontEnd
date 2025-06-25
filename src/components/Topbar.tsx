const Topbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[5rem] w-full items-center bg-sejongred px-6 sm:px-12">
      <div className="flex items-center space-x-3">
        <img src="/assets/logo.png" alt="로고" className="h-8 w-8" />
        <span className="text-lg font-bold text-white">무자비</span>
      </div>
    </header>
  );
};

export default Topbar;
