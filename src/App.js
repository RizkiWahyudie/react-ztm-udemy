import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/auth/auth.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
// import { setCurrentUser } from "./store/user/user.action";
// import {
// onAuthStateChangedListener,
// createUserDocumentFromAuth,
// getCurrentUser,
// } from "./utils/firebase/firebase.utils";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   console.log(user);
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   // ketika halaman diload maka data user di passing ke current user selama user tersebut ga klik signout
    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;

    // Pakai Promise
    // getCurrentUser().then((user) => console.log(user));
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
