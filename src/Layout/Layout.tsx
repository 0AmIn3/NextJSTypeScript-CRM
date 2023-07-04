import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { getClientsAPI, getCompanyAPI } from "@/features/thunk";
import i18n from "@/utils/i18n";
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
    if (router.query.userid) {
      if (!localStorage.getItem(`${router.query.userid}/blogView`)) {
        localStorage.setItem(`${router.query.userid}/blogView`, "0");
      }
      if (
        Object.keys(company).length > 0 &&
        company[`${router.query.userid}`].blogs
      ) {
        localStorage.setItem(
          `blogs`,
          company[`${router.query.userid}`].blogs.length
        );
      } else if (
        Object.keys(company).length > 0 &&
        !company[`${router.query.userid}`].blogs
      ) {
        localStorage.setItem(
          `blogs`,
          '0'
        );
      }
    }

    if (!localStorage.getItem("locale")) {
      localStorage.setItem("locale", "ru");
    }
    // router.push({pathname: router.pathname, query: router.query}, router.asPath, {locale});

// console.log(router);

    if (router.pathname !== "/" && Object.keys(company).length > 0) {
      let token = `${router.query.userid}/${
        company[`${router.query.userid}`].email
      }`;
      if (localStorage.getItem("user") !== token) {
        router.push("/");
      }
    }
  });

  useEffect(() => {
    console.log(company);

    i18n.changeLanguage(localStorage.getItem("locale")?.toString());
    if (!company.length) {
      dispatch(getCompanyAPI());
    }

    if (!clients.length) {
      dispatch(getClientsAPI());
    }
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
      {loading ? (
        <Loading />
      ) : (
        <div className={bodyStyle}>
          {chnageLayout ? (
            <>
              <Header ChangeAnim={ChangeAnim} setChangeAnim={setChangeAnim} />
              <Aside ChangeAnim={ChangeAnim} setChangeAnim={setChangeAnim} />
            </>
          ) : null}

          <main className={ChangeAnim ? "mainState1" : "mainState2"}>
            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
