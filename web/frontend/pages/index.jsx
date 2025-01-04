import { Page, Layout } from "@shopify/polaris";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import "./index.css";
import { useState } from "react";
import { RenderStepsTypes, stepsDictionary } from "./step-routs.jsx";

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(RenderStepsTypes.Welcome);

  return (
    <Page fullWidth={true}>
      <Layout>
        <Layout.Section>
          <div className="app">
            <Sidebar
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
            <div className="content">{stepsDictionary[currentStep]}</div>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
