import { useEffect } from "react";
import "./App.css";
import { DataProvider, useData } from "./context/DataContext";
import ProductsList from "./components/ProductsList";
import axios from "axios";
import styles from "./App.module.css";

function Main() {
  const { data, setData } = useData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setData]);

  return (
    <div>
      <div className={styles.appBody}>
        <h1 className={styles.title}>Shop</h1>
      </div>
      <ProductsList data={data} setData={setData} />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Main />
    </DataProvider>
  );
}

export default App;
