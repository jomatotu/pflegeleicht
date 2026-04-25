import { useState } from "react";
import { Button } from "./ui/button";
import { Upload, CheckCircle } from "lucide-react";

interface PflegegradUploadProps {
  onContinue: (grade: number) => void;
}

export function PflegegradUpload({ onContinue }: PflegegradUploadProps) {
  const [uploaded, setUploaded] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);

  const handleFileUpload = () => {
    // Simulate document scan
    setTimeout(() => {
      const mockGrade = 2; // Simulate detected grade
      setGrade(mockGrade);
      setUploaded(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-3xl md:text-4xl text-center text-blue-900">
          Hast du einen Pflegegrad?
        </h2>

        <div className="bg-blue-50 rounded-2xl p-8 space-y-6">
          {!uploaded ? (
            <>
              <p className="text-xl text-center text-gray-700">
                Lade dein Pflegegrad-Dokument hoch (Foto/PDF)
              </p>
              <label className="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                <Upload className="w-16 h-16 text-blue-500 mb-4" />
                <span className="text-lg text-blue-600">Dokument hochladen</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </>
          ) : (
            <div className="text-center space-y-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
              <div className="space-y-2">
                <p className="text-xl text-gray-700">Dein Pflegegrad:</p>
                <p className="text-5xl text-green-700">Stufe {grade}</p>
              </div>
              <Button
                onClick={() => grade && onContinue(grade)}
                size="lg"
                className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Weiter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
