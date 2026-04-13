import { useNavigate } from "react-router-dom"

function Logo() {
  const navigate = useNavigate()
  
  return (
    <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
      <span style={{ 
        fontFamily: "'Sora', sans-serif", 
        fontSize: "22px", 
        fontWeight: "800", 
        letterSpacing: "-0.5px" 
      }}>
        Reel<span style={{ color: "var(--primary-red)" }}>boxd</span>
      </span>
    </div>
  )
}

export default Logo