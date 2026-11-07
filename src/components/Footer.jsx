import { gym } from "../data/gym";
import { ui } from "../data/ui";

export default function Footer({ lang }) {
  return (
    <footer className="border-t border-line">
      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row gap-3 justify-between text-sm text-ash">
        <p className="font-display text-bone text-xl tracking-[0.2em]" dir="ltr">
          {gym.name}
          <span className="text-volt">.</span>
        </p>
        <p>
          {ui[lang].madeBy}{" "}
          <a href="https://www.instagram.com/oneclick.ps" target="_blank" className="font-semibold text-bone">
            One Click
          </a>
        </p>
      </div>
    </footer>
  );
}
