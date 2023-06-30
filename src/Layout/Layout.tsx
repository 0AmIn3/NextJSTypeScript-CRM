import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { getClientsAPI, getCompanyAPI } from "@/features/thunk";
import i18n from "@/pages/i18n";
import dynamic from "next/dynamic";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface LayoutProps {
  children: any;
  Company: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [chnageLayout, setchnageLayout] = useState<boolean>(false);
  const [bodyStyle, setbodyStyle] = useState<string>(
    "h-[100vh] w-full bg-black"
  );
  const [ChangeAnim, setChangeAnim] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false); // Добавьте состояние загрузки

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  const router = useRouter();
  const company = useSelector((state: any) => state.company.userKey);
  const companyStatus = useSelector((state: any) => state.company.status);
  const clients = useSelector((state: any) => state.clients.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!company.length) {
      dispatch(getCompanyAPI());
    }

    if (!clients.length) {
      dispatch(getClientsAPI());
    }

    i18n.changeLanguage(localStorage.getItem("locale")?.toString());

    if (router.pathname == "/") {
      setchnageLayout(false);
      setbodyStyle("h-[100vh] w-full bg-black");
    } else {
      setchnageLayout(true);
      setbodyStyle("h-[100vh] w-full bg-white");
    }
  }, [router.pathname]);

  return (
    <>
      {loading ? <Loading/> : (
        <div className={bodyStyle}>
          {chnageLayout ? (
            <>
              <Header ChangeAnim={ChangeAnim} setChangeAnim={setChangeAnim} />
              <Aside ChangeAnim={ChangeAnim} setChangeAnim={setChangeAnim} />
            </>
          ) : null}

          {/* {loading ? ( 
        <div className=" bg-black w-full h-full" >Loading...</div> 
      ) : ( */}
          <main className={ChangeAnim ? "mainState1" : "mainState2"}>
            {children}
          </main>
          {/* // )} */}
        </div>
      )}
    </>
  );
};

export default Layout;
