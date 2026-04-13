import Nav from "./Nav"

function Layout({ children }) {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <Nav />
      <main className="pt-0 transition-all duration-300">
        {children}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <button className="primary-gradient w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-on-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
        </button>
      </div>
    </div>
  )
}

export default Layout
