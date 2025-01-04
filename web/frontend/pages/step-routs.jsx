import SetupWizard from "../components/SetupWizard/SetupWizard.jsx";
import Welcome from "../components/Welcome/Welcome.jsx";

export const RenderStepsTypes = {
  Welcome: "Welcome",
  SetupWizard: "SetupWizard",
  Insights: "Insights",
};

export const stepsDictionary = {
  [RenderStepsTypes.Welcome]: <Welcome />,
  [RenderStepsTypes.SetupWizard]: <SetupWizard />,
  [RenderStepsTypes.Insights]: <div>Insights Component Placeholder</div>,
};
