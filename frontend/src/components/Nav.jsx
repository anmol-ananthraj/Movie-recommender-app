import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Nav() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm("")
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl dark:bg-[#131313]/60">
      <div className="flex justify-between items-center px-8 h-20 w-full">
        <div 
          className="text-2xl font-black tracking-tighter text-[#E50914] font-headline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Reelboxd
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-on-surface font-bold border-b-2 border-[#E50914] pb-1 font-headline">Home</Link>
          <Link to="/movies" className="text-on-surface/70 font-medium hover:text-on-surface transition-colors font-headline">Movies</Link>
          <Link to="/series" className="text-on-surface/70 font-medium hover:text-on-surface transition-colors font-headline">Series</Link>
          <Link to="/trending" className="text-on-surface/70 font-medium hover:text-on-surface transition-colors font-headline">Trending</Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <input 
              className="bg-surface-container-lowest border-none rounded-full px-6 py-2 w-64 text-sm focus:ring-1 focus:ring-primary/30 font-body placeholder:text-on-surface/30 text-on-surface" 
              placeholder="Search films..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/40 text-sm">search</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hover:bg-surface-container-high/50 transition-all duration-300 p-2 rounded-full scale-95 active:scale-90">
              <span className="material-symbols-outlined text-on-surface/70">notifications</span>
            </button>
            <button className="hover:bg-surface-container-high/50 transition-all duration-300 p-2 rounded-full scale-95 active:scale-90">
              <span className="material-symbols-outlined text-on-surface/70">account_circle</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav