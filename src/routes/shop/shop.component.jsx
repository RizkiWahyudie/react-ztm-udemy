import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoryPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();
  //   mengambil data categories
  useEffect(() => {
    // kenapa dia malah memanggil fetchCategoriesStart?
    // apa nyambungnya ke redux-saga untuk mendapatkan data categories?
    // padahal kan fetchCategoriesStart cuma manggil action reducer START aja
    // gimana connect ke redux-saga nya?
    // pake takeLatest di redux-saga jika action START kepanggil maka saga dijalankan sesuai functionnya
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoryPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
