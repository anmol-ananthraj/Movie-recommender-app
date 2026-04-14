import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMovieDetails, getMovieCredits, getOmdbDetails } from "../api/tmdb"

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState("")
  const [omdbmovie, setOmdbMovie] = useState(null)
  useEffect(() => {
    async function loadMovie() {
      const details = await getMovieDetails(id)
      const credits = await getMovieCredits(id)
      const omdbDetails = await getOmdbDetails(details.imdb_id)
      console.log(omdbDetails)
      console.log(details)
      setMovie(details)
      setOmdbMovie(omdbDetails)
      setCast(credits.cast.slice(0, 3))
      const d = credits.crew.find(p => p.job === "Director")
      if (d) setDirector(d.name)
    }
    loadMovie()
  }, [id])

  function formatVoteCount(votes) {
  if (votes < 1000) return votes.toString();

  return (votes / 1000)
    .toFixed(1)      
    .replace('.0', '') + 'k'; 
  }

  if (!movie) return <div className="h-screen flex items-center justify-center font-headline font-bold text-2xl">Loading...</div>

  return (
    <div className="pt-0 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[850px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover scale-105 blur-sm opacity-50"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
          />
          <div className="absolute inset-0 hero-gradient-detail"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-center px-8 md:px-20 max-w-screen-2xl mx-auto w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-center w-full">
            {/* Poster Column */}
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all duration-700"></div>
              <img
                className="relative w-full aspect-[2/3] object-cover rounded-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 transition-transform duration-700 group-hover:scale-[1.02]"
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            {/* Content Column */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-4 py-1.5 bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">FEATURED RELEASE</span>
                <span className="px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 text-on-surface rounded-full text-xs font-bold">{movie.genres?.[0]?.name || "Sci-Fi"}</span>
                <span className="px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 text-on-surface rounded-full text-xs font-bold">{movie.runtime} MINUTES</span>
                <span className="px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 text-on-surface rounded-full text-xs font-bold">{movie.release_date?.slice(0, 4)}</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9] text-on-surface uppercase max-w-3xl">
                {movie.title}
              </h1>

              <p className="text-xl text-on-surface/70 font-medium leading-relaxed max-w-2xl font-body">
                {movie.overview}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                <button className="primary-cta-gradient text-on-primary px-10 py-5 rounded-full font-headline font-black text-xs tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(229,9,20,0.4)] active:scale-95 group">
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  WATCH NOW
                </button>
                <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-on-surface px-10 py-5 rounded-full font-headline font-black text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-white/10 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-xl">add</span>
                  MY LIST
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aggregated Scores Section */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-[0.4em] text-primary font-black">CRITICAL ANALYSIS</h2>
            <p className="text-4xl md:text-5xl font-headline font-black tracking-tight">The Verdict</p>
            <div className="h-1.5 w-24 bg-primary/20 rounded-full mt-4">
              <div className="h-full w-12 bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* IMDb Score */}
            <div className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl flex flex-col gap-8 border border-white/5 hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl">star</span>
              </div>
              <div className="flex justify-between items-start relative">
                <div className="bg-secondary/10 p-4 rounded-xl text-secondary">
                  <span className="material-symbols-outlined text-3xl">star</span>
                </div>
                <span className="text-[11px] font-black tracking-[0.3em] text-on-surface/30 uppercase">TMDb SCORE</span>
              </div>
              <div className="relative">
                <div className="text-6xl font-headline font-black text-secondary flex items-baseline gap-1">
                  {movie.vote_average?.toFixed(1)}
                  <span className="text-xl text-on-surface/20 uppercase tracking-widest font-black">/10</span>
                </div>
                <p className="text-on-surface/40 text-xs mt-3 font-bold tracking-wide">Based on {formatVoteCount(movie.vote_count)} audience reviews</p>
              </div>
            </div>

            {/* Tomatometer */}
            <div className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl flex flex-col gap-8 border border-white/5 hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
              </div>
              <div className="flex justify-between items-start relative">
                <div className="bg-primary/10 p-4 rounded-xl text-primary">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
                </div>
                <span className="text-[11px] font-black tracking-[0.3em] text-on-surface/30 uppercase">CRITICS HUB</span>
              </div>
              <div className="relative">
                <div className="text-6xl font-headline font-black text-primary flex items-baseline gap-1">
                  {omdbmovie?.Ratings?.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A"}<span className="text-xl text-on-surface/20 uppercase tracking-widest font-black">%</span>
                </div>
                <p className="text-on-surface/40 text-xs mt-3 font-bold tracking-wide">Certified Fresh by Top Critics</p>
              </div>
            </div>

            {/* Audience */}
            <div className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl flex flex-col gap-8 border border-white/5 hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              </div>
              <div className="flex justify-between items-start relative">
                <div className="bg-primary/10 p-4 rounded-xl text-primary">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                </div>
                <span className="text-[11px] font-black tracking-[0.3em] text-on-surface/30 uppercase">AUDIENCE HUB</span>
              </div>
              <div className="relative">
                <div className="text-6xl font-headline font-black text-primary flex items-baseline gap-1">
                  {omdbmovie?.tomatoUserMeter || "N/A"}<span className="text-xl text-on-surface/20 uppercase tracking-widest font-black">%</span>
                </div>
                <p className="text-on-surface/40 text-xs mt-3 font-bold tracking-wide">Verified Ticket Buyers</p>
              </div>
            </div>

            {/* Reddit */}
            <div className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl flex flex-col gap-8 border border-white/5 hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl">forum</span>
              </div>
              <div className="flex justify-between items-start relative">
                <div className="bg-tertiary/10 p-4 rounded-xl text-tertiary">
                  <span className="material-symbols-outlined text-3xl">forum</span>
                </div>
                <span className="text-[11px] font-black tracking-[0.3em] text-on-surface/30 uppercase">SOCIAL PULSE</span>
              </div>
              <div className="relative">
                <div className="text-6xl font-headline font-black text-tertiary flex items-baseline gap-1">
                  91<span className="text-xl text-on-surface/20 uppercase tracking-widest font-black">%</span>
                </div>
                <p className="text-on-surface/40 text-xs mt-3 font-bold tracking-wide">Reddit Community Sentiment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reddit Discussion Highlights */}
      <section className="py-32 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <div className="flex flex-col gap-3">
              <h2 className="text-xs uppercase tracking-[0.4em] text-tertiary font-black">COMMUNITY VOICE</h2>
              <p className="text-4xl md:text-5xl font-headline font-black tracking-tight">Social Discussion</p>
            </div>
            <a className="text-on-surface/40 text-[10px] font-black tracking-[0.2em] border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 hover:text-on-surface hover:bg-white/5 transition-all cursor-pointer">
              GOTO SUBREDDIT <span className="material-symbols-outlined text-base">arrow_outward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Discussion Card 1 */}
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col gap-6 border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">chat_bubble</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tertiary to-on-tertiary-fixed-variant flex items-center justify-center font-black text-on-tertiary text-xs">U/</div>
                <div>
                  <h4 className="text-on-surface font-bold text-sm">u/cinephile_99</h4>
                  <p className="text-on-surface/40 text-xs">r/movies • 12h ago</p>
                </div>
              </div>
              <p className="text-xl font-headline font-medium italic">"The cinematography in the second act is genuinely some of the best I've seen in the last decade. The use of practical lighting creates this claustrophobic atmosphere that just works."</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-on-surface/60">
                  <span className="material-symbols-outlined text-lg">thumb_up</span>
                  <span className="text-sm font-bold">2.4k</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface/60">
                  <span className="material-symbols-outlined text-lg">comment</span>
                  <span className="text-sm font-bold">184</span>
                </div>
              </div>
            </div>
            {/* Discussion Card 2 */}
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col gap-6 border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-[120px]">chat_bubble</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-on-secondary-fixed-variant flex items-center justify-center font-black text-on-secondary text-xs">U/</div>
                <div>
                  <h4 className="text-on-surface font-bold text-sm">u/theory_crafter</h4>
                  <p className="text-on-surface/40 text-xs">r/NocturnalEchoes • 5h ago</p>
                </div>
              </div>
              <p className="text-xl font-headline font-medium italic">"Can we talk about the ending? I've watched it twice now and I'm still picking up on the subtle clues left in the background of the detective's office. Masterclass in show-don't-tell."</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-on-surface/60">
                  <span className="material-symbols-outlined text-lg">thumb_up</span>
                  <span className="text-sm font-bold">1.8k</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface/60">
                  <span className="material-symbols-outlined text-lg">comment</span>
                  <span className="text-sm font-bold">412</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-white/5 pt-24">
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface/30">THE VISIONARY</h3>
            <p className="text-2xl font-headline font-bold text-on-surface">{director || "Not Listed"}</p>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface/30">KEY ENSEMBLE</h3>
            <ul className="flex flex-col gap-2 text-xl font-headline font-bold text-on-surface/80">
              {cast.map((c, i) => <li key={i} className="hover:text-primary transition-colors cursor-default">{c.name}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface/30">PRODUCTION</h3>
            <p className="text-2xl font-headline font-bold text-on-surface">Prismatics Pictures</p>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-on-surface/30">PRESENTATION</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-black tracking-widest border border-white/5 uppercase">Native 4K</span>
              <span className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-black tracking-widest border border-white/5 uppercase">Vision</span>
              <span className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-black tracking-widest border border-white/5 uppercase">Atmos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-24 border-t border-white/5 bg-surface dark:bg-[#131313]">
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-12 px-8">
          <div className="text-2xl font-black text-on-surface/10 font-headline uppercase tracking-[0.5em]">REELBOXD</div>
          <div className="flex flex-wrap justify-center gap-12">
            <a className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all" href="#">About</a>
            <a className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all" href="#">Privacy</a>
            <a className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all" href="#">Terms</a>
            <a className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all" href="#">Contact</a>
            <a className="font-headline text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/40 hover:text-primary transition-all" href="#">API</a>
          </div>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface/20 text-center">
            © 2026 Reelboxd. The Digital Projectionist.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MovieDetail