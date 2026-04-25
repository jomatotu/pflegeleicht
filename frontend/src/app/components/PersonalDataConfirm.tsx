import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PersonalDataConfirmProps {
  grade: number;
  onConfirm: (data: { name: string; address: string }) => void;
}

export function PersonalDataConfirm({ grade, onConfirm }: PersonalDataConfirmProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Max Mustermann");
  const [address, setAddress] = useState("Musterstraße 123, 12345 Berlin");

  const handleConfirm = () => {
    onConfirm({ name, address });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-3xl md:text-4xl text-center text-blue-900">
          So haben wir dich verstanden:
        </h2>

        <div className="bg-blue-50 rounded-2xl p-8 space-y-6">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-xl text-gray-900">{name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="text-xl text-gray-900">{address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pflegegrad</p>
                  <p className="text-xl text-green-700">Stufe {grade}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  Korrektur
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                >
                  Bestätigen
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button
                onClick={() => setIsEditing(false)}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                Speichern
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
