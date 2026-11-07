// Section title: small number, big title, and an optional line of text
export default function Title({ number, title, text }) {
  return (
    <div className="mb-12">
      <p className="text-volt font-display text-xl" dir="ltr">
        {number}
      </p>
      <h2 className="font-display uppercase text-6xl md:text-8xl leading-none mt-2">{title}</h2>
      {text && <p className="text-ash text-lg mt-4 max-w-xl">{text}</p>}
    </div>
  );
}
