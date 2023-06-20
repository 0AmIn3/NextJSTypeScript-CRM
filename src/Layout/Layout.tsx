import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { getClientsAPI, getCompanyAPI } from "@/features/thunk";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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
  const [ChangeAnim, setChangeAnim] = useState<boolean>(true);

  // const [loading, setLoading] = useState<boolean>(true); // Добавьте состояние загрузки

  const router = useRouter();
  const company = useSelector((state) => state.company.userKey);
  const companyStatus = useSelector((state) => state.company.status);
  const clients = useSelector((state) => state.clients.data);

  const dispatch = useDispatch();

  useEffect(() => {
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
  // useEffect(() => {
  //   setLoading(false); // Установите состояние загрузки в false после получения данных
  // }, []);
  return (
    <div className={bodyStyle}>
      {chnageLayout ? (
        <>
          <Header ChangeAnim={ChangeAnim} setChangeAnim={setChangeAnim} />
          <Aside ChangeAnim={ChangeAnim} setChangeAnim={setChangeAnim}/>
        </>
      ) : null}

      {/* {loading ? ( 
        <div className=" bg-black w-full h-full" >Loading...</div> 
      ) : ( */}
        <main  className={ChangeAnim? 'mainState1' : 'mainState2'}>{children}</main> 
      {/* // )} */}
    </div>
  );
};

export default Layout;
