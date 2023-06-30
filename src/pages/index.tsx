import Image from "next/image";
import { Inter } from "next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });



export default function Home({ contacts }: { contacts: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<onSubmitProps>();
  interface onSubmitProps {
    email: string;
    password: string;
  }
  const onSubmit: SubmitHandler<onSubmitProps> = ({ email, password }) => {
    setLoading(true);
    const user = [
      ...Object.values(contacts).filter((i: any) => i.email == email),
    ];
    const CompanyKey =
      Object.keys(contacts)[Object.values(contacts).indexOf(user[0])];

    if (user.length > 0) {
      setLoading(false);
      setError(false);
      localStorage.setItem("user", `${CompanyKey}/${email}`);
      router.push(CompanyKey + "/clients");
    } else {
      let newUser = {
        id: uuidv4(),
        email,
        password,
      };
      axios
        .post(
          "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json",
          newUser
        )
        .then((res) => {
          setLoading(false);
          setError(false);
          localStorage.setItem("user", `${CompanyKey}/${email}`);
          router.push(CompanyKey + "/clients");
        });
    }
  };

  return (
    <>
      <div className="login fixed top-1/2 left-1/2 overflow-hidden flex -translate-x-1/2 -translate-y-1/2  w-[780px] h-[580px] bg-white">
        <div className="w-1/2 h-full bg-login-pattern"></div>
        <div className="w-1/2 h-full  px-7 py-9">
          <center>
            <img src="/img/logo.svg" width="125px" alt="" />
          </center>
          <center className=" mt-4">
            <h1 className=" text-2xl font-semibold">Log In to Admin Panel</h1>
            <p className=" text-[#9FA2B4] text-sm font-normal mt-3">
              Enter your phone number and password below
            </p>
          </center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className=" mt-6" htmlFor="email">
              <h1 className=" text-xs font-semibold text-[#101010]">
                PHONE NUMBER
              </h1>
              <input
                id="email"
                className=""
                placeholder="Enter your email"
                {...register("email")}
              />
            </label>

            <label className=" mt-6" htmlFor="password">
              <h1 className=" text-xs font-semibold text-[#101010]">
                PHONE NUMBER
              </h1>
              <input
                id="password"
                className=""
                placeholder="Enter your password"
                {...register("password")}
              />
            </label>

            {errors.password && <span>This field is required</span>}

            {error ? (
              <p className=" text-red-600 text-center">
                Неверные пароль или почта
              </p>
            ) : null}
            <button
              className=" mt-6 rounded-lg w-full py-4 flex item-center justify-center text-center bg-black text-white gap-4"
              type="submit"
            >
              {loading ? <div className="spinner"></div> : null}
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className="fixed top-0 left-0 h-full w-full bg-black -z-10"></div>
    </>
  );
}
export const getStaticProps = async () => {
  const response = await fetch(
    "https://srm-nextjs-default-rtdb.europe-west1.firebasedatabase.app/Admin.json"
  );
  const data = await response.json();

  return {
    props: { contacts: data },
  };
};
