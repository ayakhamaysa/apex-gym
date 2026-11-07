import { gym } from "../data/gym";
import { ui } from "../data/ui";

export default function Header({ lang, onToggle, onTrial }) {
  const t = ui[lang];
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-night/70 backdrop-blur border-b border-line/60">
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center gap-8">
        <a href="#top" className="font-display text-2xl tracking-[0.2em]" dir="ltr">
          {gym.name}
          <span className="text-volt">.</span>
        </a>
        <div className="hidden md:flex gap-6 text-sm text-ash">
          {Object.entries(t.nav).map(([id, label]) => (
            <a key={id} href={`#${id}`} className="hover:text-bone transition-colors">
              {label}
            </a>
          ))}
        </div>
        <button onClick={onToggle} className="ms-auto text-sm text-ash hover:text-bone">
          {t.switchTo}
        </button>
        <button onClick={onTrial} className="hidden sm:block bg-volt text-night font-semibold text-sm rounded-full px-5 py-2.5 hover:bg-white transition-colors">
          {t.trial}
        </button>
      </nav>
    </header>
  );
}
