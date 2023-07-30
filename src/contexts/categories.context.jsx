import { createContext, useState, useEffect } from "react";

// import SHOP_DATA from '../shop-data.js';
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // menambah table categories dan datanya kedalam firestore
  // useEffect(() => {
  //     addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  //   mengambil data categories
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  console.log(categoriesMap);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
