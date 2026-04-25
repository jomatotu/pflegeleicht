export function Footer() {
  return (
    <footer className="bg-teal-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-3">PflegeLeicht</h3>
            <p className="text-sm text-teal-100">
              Automatisierte Pflegeleistungen – ein Klick, alles erledigt.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  AGB
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                  Barrierefreiheitserklärung
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Kontakt</h3>
            <ul className="space-y-2 text-sm text-teal-100">
              <li>Telefon: 030 123 456 789</li>
              <li>E-Mail: hilfe@pflegeleicht.de</li>
              <li>Mo-Fr: 8:00 - 18:00 Uhr</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-700 pt-6 text-center text-sm text-teal-100">
          <p>&copy; {new Date().getFullYear()} PflegeLeicht. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
