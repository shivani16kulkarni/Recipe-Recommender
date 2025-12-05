import Footer from "@components/Footer";
import Header from "@components/Header";
import styles from "@styles/Layout.module.css";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className={styles["layout-container"]}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
