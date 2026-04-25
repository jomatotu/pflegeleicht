import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {ConfirmationScreen} from "../components/ConfirmationScreen";
import {Header} from "../components/Header";

export function ConfirmationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const grade = (location.state as { grade?: number | string } | null)?.grade;
    const selectedServices = (location.state as { selectedServices?: any[] } | null)?.selectedServices || [];
    const totalBudget = (location.state as { totalBudget?: number } | null)?.totalBudget || 0;
    const remainingBudget = (location.state as { remainingBudget?: number } | null)?.remainingBudget || 0;
    const pdfFile = (location.state as { pdfFile?: File } | null)?.pdfFile;


    useEffect(() => {
        if (Number.isNaN(grade)) {
            navigate("/");
        }
    }, [grade, navigate]);

    const handleConfirm = () => {
        console.log("Confirmed:", {grade, selectedServices});
        //go to ready page
        navigate("/ready", {state: {grade, selectedServices, totalBudget, remainingBudget}});
    };

    const handleBackToServices = () => {
        navigate("/services", {state: {grade, selectedServices, totalBudget, remainingBudget}});
    }

    return (
        <div className="min-h-screen">
            <Header
                onHomeClick={() => navigate("/")}
                showHomeButton={true}
                showLoginButton={false}
                currentStep={3}
                showStepper={true}
                onLoginClick={() => {
                }}
            />
            <ConfirmationScreen
                pflegegrad={grade}
                selectedServices={selectedServices}
                totalBudget={totalBudget}
                remainingBudget={remainingBudget}
                onConfirm={handleConfirm}
                onBack={handleBackToServices}
                pdfFile={pdfFile}
            />
        </div>
    );
}