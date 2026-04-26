import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {CheckCircle, Mail, Phone} from "lucide-react";
import {Footer} from "../components/Footer";
import logo from "../../imports/image.png";
import {Header} from "../components/Header";

export function ReadyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const grade = (location.state as { grade?: number | string } | null)?.grade;
    const selectedServices = (location.state as { selectedServices?: any[] } | null)?.selectedServices || [];
    const remainingBudget = (location.state as { remainingBudget?: number } | null)?.remainingBudget || 0;

    useEffect(() => {
        if (Number.isNaN(grade)) {
            navigate("/");
        }
    }, [grade, navigate]);

    return (
        <div className="min-h-screen">
            <Header
                onHomeClick={() => navigate("/")}
                showHomeButton={true}
                showLoginButton={false}
                currentStep={5}
                showStepper={true}
                onLoginClick={() => {
                }}
            />

            <main className="flex flex-col min-h-screen bg-gradient-to-b from-teal-50 to-white">
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="max-w-2xl w-full text-center space-y-8">
                        <div className="flex justify-center mb-6">
                            <img src={logo} alt="PflegeLeicht Logo" className="w-32 h-32"/>
                        </div>
                        <CheckCircle className="w-24 h-24 text-green-500 mx-auto"/>

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
                                                {service.hours} Stunden × {service.pricePerHour} €
                                                = {service.monthlyPrice.toFixed(2)} € / Monat
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
                                    <Phone className="w-5 h-5"/>
                                    030 123 456 789
                                </a>
                                <a
                                    href="mailto:hilfe@pflegeleicht.online"
                                    className="flex items-center gap-2 text-lg text-teal-600 hover:text-teal-700"
                                >
                                    <Mail className="w-5 h-5"/>
                                    hilfe@pflegeleicht.online
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    )
}