export default function LiveProjectButton() {
  return (
    <a
      href="#"
      className="inline-block px-8 py-3 sm:px-10 sm:py-3.5 rounded-full border-2 text-sm sm:text-base font-medium uppercase tracking-widest transition-colors duration-200"
      style={{ borderColor: '#D7E2EA', color: '#D7E2EA' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(215, 226, 234, 0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      Live Project →
    </a>
  );
}
