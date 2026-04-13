import { useEffect, useState } from "react"
import GenreRow from "../components/GenreRow"
import Hero from "../components/Hero"
import { getTrendingMovies,getMovieDetails } from "../api/tmdb"

function Home() {
  const [movies, setMovies] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null)

  useEffect(() => {
    async function loadMovies() {
      const data = await getTrendingMovies()
      const formattedMovies = data.map(m => ({
        id: m.id,
        title: m.title,
        rating: m.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        year: m.release_date?.slice(0, 4),
        genre: m.genre_ids,
        overview: m.overview
      }))
      
      setMovies(formattedMovies)
      if (formattedMovies.length > 0) {
        setFeaturedMovie(formattedMovies[0])
      }
    }
    loadMovies()
  }, [])

  return (
    <div className="space-y-16 py-0 pb-20 px-0">
      <Hero movie={featuredMovie} />
      
      <div className="space-y-16 py-0 px-8 md:px-16">
        <GenreRow title="Trending Content" movies={movies} />
        
        {/* Curated Collection */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative aspect-[21/9] rounded-2xl overflow-hidden bg-surface-container-high group cursor-pointer">
            <img 
              className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbO9vX1Fpbrf7tgCmlYoNTDdk23JNgI5WwT1eMXbcDf_TXXu2uS8po03eSzH16f9hkH97DCn2tixCJCs4lAlgeA9Q0sg9ughhJMHpYVPP8PSYo8NZL7r4OGoiHxWmVjzFJYQ-DV_VHiPIVOI3-RhXXgVbocVY0OZ4gRXg6BaOX3thkZsfjNpMGylHHnjerInlu_ugv4UPHUcal8cKopH-S4YkSrjgqDzLHKUo7wqdZmtc3D7gQqviA5N2CIzyNLRtnvNw1mqeffDE" 
              alt="Architectural Silence"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
            <div className="absolute bottom-8 left-8">
              <span className="label-md font-bold text-primary uppercase tracking-[0.3em] mb-2 block">Curation #42</span>
              <h2 className="text-4xl font-black font-headline tracking-tighter text-on-surface">Architectural Silence</h2>
              <p className="text-on-surface/60 font-body text-sm mt-2 max-w-md">Explore films that use geometry and negative space to tell haunting stories.</p>
            </div>
          </div>
          
          <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-center border border-outline-variant/10">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-4">Daily Spotlight</h3>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-24 rounded bg-surface-container-highest overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoUcNg1_RvLOBqq9YKj_7DZRvAXF7eqBXHHYbtJHzVGqQsOb4k_88zo5gX7mwUex9aXb5CTVSrWK-Y2SARS7x_AyaRxprjY7If8UDKFerEqTFwEKrsFD0iNtUY8ileTSZUh2UOgq64IQbbuO5MBI4mgd5Jo2f73-52_3pcwYOecLadF5DMeKOjqM2Qryi_aXSm8mGS_42YOpO03P8Tl05h8X2j-_6kDGomdKFmEI4LPmHUgxG1TndeiHsiuVEU3hC2PlQ36OKtBB8" 
                  alt="Daily Spotlight"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Director's Cut</p>
                <h4 className="font-headline font-bold text-lg leading-tight mt-1">The Kinetic Theory</h4>
                <div className="flex gap-2 mt-2">
                  <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded font-black">IMDb 9.0</span>
                </div>
              </div>
            </div>
            <button className="mt-8 py-3 w-full border border-outline-variant/30 text-on-surface text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors">Read Editorial</button>
          </div>
        </section>

        <GenreRow title="New Releases" movies={movies.slice(10)} />
      </div>

      <footer className="w-full py-12 border-t border-outline-variant/15 bg-surface dark:bg-[#131313]">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 px-8">
          <div className="text-lg font-black text-on-surface/20 font-headline uppercase tracking-widest">CINESPOTLIGHT</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">About Us</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">Privacy Policy</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">Terms of Service</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">Contact</a>
            <a className="font-['Manrope'] text-xs uppercase tracking-widest text-on-surface/40 hover:text-on-surface transition-opacity" href="#">API Docs</a>
          </div>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-on-surface/20 cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-on-surface/20 cursor-pointer hover:text-primary transition-colors">share</span>
            <span className="material-symbols-outlined text-on-surface/20 cursor-pointer hover:text-primary transition-colors">movie</span>
          </div>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-widest text-on-surface/30">© 2024 CineSpotlight. The Digital Projectionist.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home