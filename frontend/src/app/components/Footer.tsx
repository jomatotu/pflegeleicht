export function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <h3 className="text-sm font-medium mb-2">PflegeLeicht</h3>
            <p className="text-sm text-teal-100">
              Automatisierte Pflegeleistungen – ein Klick, alles erledigt.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Rechtliches</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#"
                  className="inline-flex min-h-5 items-center text-teal-100 hover:text-white transition-colors"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex min-h-5 items-center text-teal-100 hover:text-white transition-colors"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex min-h-5 items-center text-teal-100 hover:text-white transition-colors"
                >
                  AGB
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex min-h-5 items-center text-teal-100 hover:text-white transition-colors"
                >
                  Barrierefreiheitserklärung
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Kontakt</h3>
            <ul className="space-y-1 text-sm text-teal-100">
              <li className="inline-flex min-h-5">Telefon: 030 123 456 789</li>
              <li className="inline-flex min-h-5">E-Mail: hilfe@pflegeleicht.online</li>
              <li className="inline-flex min-h-5">Mo-Fr: 8:00 - 18:00 Uhr</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-700 pt-3 text-center text-xs text-teal-100">
          <p>&copy; {new Date().getFullYear()} PflegeLeicht. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
