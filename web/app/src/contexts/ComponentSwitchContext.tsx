import { createContext, useContext, useState } from "react";
import { COMPONENT_LIST } from "../constants/component";

type ComponentSwitchContextType = {
  currentContent: number;
  switchComponent: (targetComponent: number) => void;
};

const ComponentSwitchContext = createContext<ComponentSwitchContextType>({
  currentContent: COMPONENT_LIST.INDEX,
  switchComponent: () => {},
});

export const ComponentSwitchProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentContent, setCurrentContent] = useState<number>(
    COMPONENT_LIST.INDEX
  );

  const switchComponent = (targetComponent: number) => {
    setCurrentContent(targetComponent);
  };

  return (
    <ComponentSwitchContext.Provider
      value={{ currentContent, switchComponent }}
    >
      {children}
    </ComponentSwitchContext.Provider>
  );
};

export const useComponentSwitch = () => {
  const context = useContext(ComponentSwitchContext);
  if (!context) {
    throw new Error("ComponentSwitchContextが見つかりません");
  }
  return context;
};
