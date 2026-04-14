import { useNavigate } from "react-router-dom"

function MovieCard({ movie }) {
  const navigate = useNavigate()

  return (
    <div className="flex-none w-[280px] group cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-4 bg-surface-container shadow-2xl">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={movie.poster} 
          alt={movie.title} 
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="glass-card px-2 py-1 rounded text-[10px] font-bold text-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">star</span> {movie.rating?.toFixed(1)}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-primary p-3 rounded-full shadow-lg">
            <span className="material-symbols-outlined text-on-primary">play_arrow</span>
          </div>
        </div>
      </div>
      <h3 className="font-headline font-bold text-lg text-on-surface truncate">{movie.title}</h3>
      <p className="text-xs font-body text-on-surface/40 uppercase tracking-widest mt-1">
       {movie.year|| "2024"}
      </p>
    </div>
  )
}

export default MovieCard