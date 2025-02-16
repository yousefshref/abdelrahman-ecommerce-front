import { Button } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { StatesContextProvider } from "../../../Contexts/StatesContext";
import AdminStateComponent from "./AdminStateComponent";

const StatesSettings = () => {
  const statesContext = useContext(StatesContextProvider);

  const states = statesContext?.states;

  const [openCreate, setOpenCreate] = React.useState(false);
  return <></>;
};

export default StatesSettings;
