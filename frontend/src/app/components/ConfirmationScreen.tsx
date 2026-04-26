import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CheckCircle, Phone, Mail } from "lucide-react";
import logo from "../../imports/image.png";
import { Footer } from "./Footer";
import {supabase} from "../../lib/supabaseClient";

interface Service {
  id: string;
  title: string;
  description: string;
  cost: number;
  monthlyPrice: number;
  pricePerHour: number;
  hours: number;
}

interface ConfirmationScreenProps {
  pflegegrad: number | string;
  selectedServices: Service[];
  totalBudget: number;
  remainingBudget: number;
  onConfirm: (submitted: boolean) => void;
  onBack: () => void;
  isConfirmed?: boolean;
  pdfFile?: File;
  extractedData?: Record<string, string | number>;
}

export function ConfirmationScreen({
  pflegegrad,
  selectedServices,
  totalBudget,
  remainingBudget,
  onConfirm,
  onBack,
  isConfirmed = false,
  pdfFile,
  extractedData,
}: ConfirmationScreenProps) {
  const s = (key: string) => String(extractedData?.[key] ?? "");
  const [firstname, setFirstname] = useState(s("firstname"));
  const [lastname, setLastname] = useState(s("lastname"));
  const [street, setStreet] = useState(s("street"));
  const [city, setCity] = useState(s("city"));
  const [postalCode, setPostalCode] = useState(s("postalCode"));
  const [email, setEmail] = useState(s("contact_person_email"));
  const [phone, setPhone] = useState(s("contact_person_phone"));
  const [versichertennummer, setVersichertennummer] = useState(s("insurance_number"));
  const [auftragsnummer, setAuftragsnummer] = useState(s("order_number_md"));
  const [geburtsdatum, setGeburtsdatum] = useState(s("date_of_birth"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const usedBudget = totalBudget - remainingBudget;
  const isOverBudget = remainingBudget < 0;
  const selfPayAmount = isOverBudget ? Math.abs(remainingBudget) : 0;

  const handleSubmit = async () => {
    setSubmitError(null);

    const missingFields: string[] = [];
    if (!firstname.trim()) missingFields.push("Vorname");
    if (!lastname.trim()) missingFields.push("Nachname");
    if (!street.trim()) missingFields.push("Straße");
    if (!postalCode.trim()) missingFields.push("PLZ");
    if (!city.trim()) missingFields.push("Ort");
    if (!geburtsdatum.trim()) missingFields.push("Geburtsdatum");
    if (!email.trim()) missingFields.push("E-Mail");
    if (!phone.trim()) missingFields.push("Telefon");

    if (missingFields.length > 0) {
      setSubmitError(`Bitte füllen Sie alle Pflichtfelder aus: ${missingFields.join(", ")}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstname,
        lastname,
        street,
        city,
        postalCode,
        date_of_birth: geburtsdatum,
        pflegegrad,
        contact_person_phone: phone,
        contact_person_email: email,
        insurance_number: versichertennummer,
        order_number_md: auftragsnummer,
        services: selectedServices.map((s) => parseInt(s.id)),
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      if (pdfFile) {
        formData.append("file", pdfFile);
      } else {
        const emptyFile = new File([""], "placeholder.pdf", { type: "application/pdf" });
        formData.append("file", emptyFile);
      }

      const res = await supabase.functions.invoke("process-antrag", { body: formData });

      if (res.error != null) {
        throw new Error(res.error);
      }

      onConfirm(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-2xl w-full text-center space-y-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="PflegeLeicht Logo" className="w-32 h-32" />
          </div>
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl text-teal-700">Fertig!</h2>
            <p className="text-2xl text-gray-700">
              Wir melden uns innerhalb von 48 Stunden bei Ihnen.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-teal-200 p-8 space-y-6 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Ihre gewählten Leistungen:</p>
                {selectedServices.map((service) => (
                  <div key={service.id} className="mt-2 border-b pb-2">
                    <p className="text-lg text-gray-900">{service.title}</p>
                    <p className="text-sm text-gray-600">
                      {service.hours} Stunden × {service.pricePerHour} € = {service.monthlyPrice.toFixed(2)} € / Monat
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Ihr verbleibendes Budget:</p>
                <p className="text-3xl text-teal-700">{remainingBudget.toFixed(2)} €</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl p-6 space-y-4">
            <p className="text-xl text-gray-700">Fragen?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+4930123456789"
                className="flex items-center gap-2 text-lg text-teal-600 hover:text-teal-700"
              >
                <Phone className="w-5 h-5" />
                030 123 456 789
              </a>
              <a
                href="mailto:hilfe@pflegeleicht.online"
                className="flex items-center gap-2 text-lg text-teal-600 hover:text-teal-700"
              >
                <Mail className="w-5 h-5" />
                hilfe@pflegeleicht.online
              </a>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl text-teal-900">Zusammenfassung</h2>
          <p className="text-lg text-gray-600">
            Bitte überprüfen Sie Ihre Daten und bestätigen Sie Ihre Auswahl
          </p>
        </div>

        {/* Persönliche Daten */}
        <div className="bg-white rounded-xl border-2 border-teal-200 p-6 space-y-6">
          <h3 className="text-xl text-gray-900 border-b pb-2">Ihre persönlichen Daten</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstname">Vorname</Label>
              <Input
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Nachname</Label>
              <Input
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Straße & Hausnummer</Label>
              <Input
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">PLZ</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ort</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="geburtsdatum">Geburtsdatum</Label>
              <Input
                id="geburtsdatum"
                type="date"
                value={geburtsdatum}
                onChange={(e) => setGeburtsdatum(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="versichertennummer">Versichertennummer</Label>
              <Input
                id="versichertennummer"
                value={versichertennummer}
                onChange={(e) => setVersichertennummer(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auftragsnummer">Auftragsnummer medizinischer Dienst</Label>
              <Input
                id="auftragsnummer"
                value={auftragsnummer}
                onChange={(e) => setAuftragsnummer(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
          <div className="bg-teal-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Pflegegrad:</span> Stufe {pflegegrad}
            </p>
          </div>
        </div>

        {/* Gewählte Leistungen */}
        <div className="bg-white rounded-xl border-2 border-teal-200 p-6 space-y-6">
          <h3 className="text-xl text-gray-900 border-b pb-2">Ihre gewählten Leistungen</h3>
          <div className="space-y-4">
            {selectedServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex-1">
                  <p className="text-lg text-gray-900">{service.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl text-green-700">{service.monthlyPrice.toFixed(2)} € / Monat</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gesamtkosten pro Monat:</p>
                  <p className="text-2xl text-gray-900">{usedBudget.toFixed(2)} €</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {isOverBudget ? "Überschreitung:" : "Verbleibendes Budget:"}
                  </p>
                  <p className={`text-2xl ${isOverBudget ? "text-orange-700" : "text-teal-700"}`}>
                    {Math.abs(remainingBudget).toFixed(2)} €
                  </p>
                </div>
              </div>
            </div>
            {isOverBudget && (
              <div className="p-4 bg-orange-100 rounded-lg border border-orange-300">
                <p className="text-sm text-orange-900 font-medium mb-1">
                  ⚠️ Budget überschritten
                </p>
                <p className="text-sm text-orange-800">
                  Sie haben Leistungen im Wert von <span className="font-bold">{usedBudget.toFixed(2)} €</span> ausgewählt.
                  Ihr Pflegebudget beträgt <span className="font-bold">{totalBudget.toFixed(2)} €</span> pro Monat.
                </p>
                <p className="text-sm text-orange-900 font-bold mt-2">
                  Sie müssen monatlich <span className="text-lg">{selfPayAmount.toFixed(2)} €</span> selbst bezahlen.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {submitError && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-300">
            <p className="text-sm text-red-800"><span className="font-medium">Fehler:</span> {submitError}</p>
          </div>
        )}
        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline" size="lg" className="flex-1 h-14" disabled={isSubmitting}>
            Zurück zur Auswahl
          </Button>
          <Button
            onClick={handleSubmit}
            size="lg"
            className="flex-1 h-14 bg-teal-600 hover:bg-teal-700 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wird gesendet..." : "Jetzt verbindlich bestätigen"}
          </Button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
