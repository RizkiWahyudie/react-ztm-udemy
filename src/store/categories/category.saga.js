import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.type";

export function* fetchCategoriesAsync() {
  try {
    // jika ingin memanggil function dan ingin menyelesaikan proses function tersebut terlebih dahulu
    // harus menggunakan yield call untuk pembungkus func nya
    // seperti await, "hey ini method nya di kiri dan ini params nya dikanan"
    // tidak seperti await yang params nya dibungkus func
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    // untuk menjalankan dispatch untuk memanggil reducer dengan action
    // berbeda dengan redux biasanya baik react redux atau redux thunk
    // melainkan menggunakan yield put sebagai pengganti dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// pada saat dipanggil onFetchCategories memanggil action
// "hey, saya butuh action "start" lalu setelah itu menjalankan function fetchCategoriesAsync
export function* onFetchCategories() {
  // takeLatest berfungsi untuk memastikan bahwa hanya tugas (task) terakhir yang diambil dan dijalankan, dan tugas-tugas sebelumnya yang mungkin masih berjalan akan dibatalkan atau diabaikan.
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// flow nya dari bawah, memanggil function onFetchCategories
export function* categoriesSaga() {
  // all artinya "hey, jalankan semua yang ada didalam sampai selesai"
  yield all([call(onFetchCategories)]);
}
