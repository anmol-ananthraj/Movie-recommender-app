function Sidebar() {
  return (
    <aside className="h-full w-64 fixed left-0 top-20 bg-surface-container-low dark:bg-[#1c1c1c] z-40 hidden xl:flex flex-col py-6 gap-2 border-r border-outline-variant/10">
      <div className="px-6 mb-4">
        <h2 className="text-[#E50914] font-headline font-bold text-xs uppercase tracking-widest">For You</h2>
        <p className="text-on-surface/40 text-xs font-medium">Personalized Picks</p>
      </div>

      <nav className="flex flex-col gap-1">
        <a className="flex items-center gap-4 px-6 py-3 bg-[#E50914]/10 text-[#E50914] rounded-r-full font-bold transition-transform hover:translate-x-1 font-body text-sm" href="#">
          <span className="material-symbols-outlined">auto_awesome</span>
          Recommended
        </a>
        <a className="flex items-center gap-4 px-6 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container transition-all hover:translate-x-1 font-body text-sm" href="#">
          <span className="material-symbols-outlined">movie_filter</span>
          Genre Filter
        </a>
        <a className="flex items-center gap-4 px-6 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container transition-all hover:translate-x-1 font-body text-sm" href="#">
          <span className="material-symbols-outlined">calendar_today</span>
          Release Year
        </a>
        <a className="flex items-center gap-4 px-6 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container transition-all hover:translate-x-1 font-body text-sm" href="#">
          <span className="material-symbols-outlined">star_half</span>
          Rating Source
        </a>
        <a className="flex items-center gap-4 px-6 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container transition-all hover:translate-x-1 font-body text-sm" href="#">
          <span className="material-symbols-outlined">bookmark</span>
          Watchlist
        </a>
      </nav>

      <div className="mt-auto px-6 flex flex-col gap-4">
        <div className="p-4 bg-primary-container rounded-xl">
          <p className="text-[10px] font-bold uppercase tracking-tighter text-on-primary-container mb-2">Exclusive Access</p>
          <button className="w-full py-2 bg-on-primary-container text-primary-container text-xs font-bold rounded-md hover:opacity-90 transition-opacity">Upgrade to Premium</button>
        </div>
        
        <div className="flex flex-col gap-1 pb-20">
          <a className="flex items-center gap-4 px-2 py-2 text-on-surface/40 hover:text-on-surface transition-all text-sm font-body" href="#">
            <span className="material-symbols-outlined text-lg">settings</span>
            Settings
          </a>
          <a className="flex items-center gap-4 px-2 py-2 text-on-surface/40 hover:text-on-surface transition-all text-sm font-body" href="#">
            <span className="material-symbols-outlined text-lg">help_outline</span>
            Help
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
