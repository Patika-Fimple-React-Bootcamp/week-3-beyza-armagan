import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

const DataContext = createContext({});

// Create a provider component to wrap your app
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);
