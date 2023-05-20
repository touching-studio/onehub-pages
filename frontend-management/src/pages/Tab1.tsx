import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

interface Data {
  name: string;
  template: string;
  components: Component[];
}

interface Component 
  {
    type: string;
    content: string;
    value?:string;
  }


const fetchSomething = async (
  setFun1: (any: any) => void,
  setFun2: (any: any) => void
) => {
  const ax = await fetch("http://localhost:3000/page/1", {
    method: "GET",
  });

  setFun1(await ax.json());
  setFun2(false);
};

const renderByType = (input: Component) => {
  switch (input?.type) {
    case "BUTTON": 
      return <IonButton>{input.content}</IonButton>;
    case "INPUT": 
      return <IonInput value={input.value}>{input.content}</IonInput>;
    default: 
      return  <IonLabel>{input.content}</IonLabel>
  }
};

const Tab1: React.FC = () => {
  const [response, setResponse] = useState<Data>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("called", loading);
    if (loading) {
      console.log("called");
      fetchSomething(setResponse, setLoading);
    }
  }, [loading]);

  console.log("render", response, loading);
  if (loading || !response) {
    return <IonLoading />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer
          name={JSON.stringify(response)}
        /> */}
        <IonHeader>
          Page: {response.name} - template {response.template}
        </IonHeader>
        <IonList>
          {response.components.map((c, index) => (
            <IonItem key={index}>
              {renderByType(c)}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
