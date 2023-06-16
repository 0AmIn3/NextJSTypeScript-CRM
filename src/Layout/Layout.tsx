import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { getClientsAPI, getCompanyAPI } from "@/features/thunk";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [chnageLayout, setchnageLayout] = useState<boolean>(false);
  const [bodyStyle, setbodyStyle] = useState<string>(
    "h-[100vh] w-full bg-black"
  );
  const router = useRouter();
  const company = useSelector((state) => state.company.data);
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
  });
  return (
    <div className={bodyStyle}>
      {chnageLayout ? (
        <>
          <Header />
          <Aside />
        </>
      ) : null}
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
