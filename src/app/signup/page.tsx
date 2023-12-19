"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import SignUpImg from "../../assets/signup.svg";
import Image from "next/image";
import { signUp } from "../api/auth";
import { useAppDispatch } from "@/lib/hook";
import { setProgress } from "@/redux/slices/TopLoadingBar";

export default function Signup() {
  const dispatch = useAppDispatch();
  type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(setProgress(70));
    const res = await signUp(data);
    dispatch(setProgress(100));
    if (res.success === true) {
      console.log("data", res?.data);
    }
  };

  return (
    <div className=" dark:bg-gray-700 text-white h-full flex justify-center items-center min-h-screen p-6 ">
      <div className=" flex justify-between gap-20 items-center w-[70%] ">
        <div className="flex flex-col gap-10 mb-32 space-y-4">
          <h1 className="text-primary-600 text-7xl font-bold">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <div className="w-72">
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-gray-500 dark:border-gray-100 dark:border-t-transparent border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 dark:text-gray-100 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 dark:placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-600 dark:placeholder-shown:border-t-gray-100 focus:border-2 focus:border-primary-600 dark:focus:border-primary-600 focus:border-t-transparent dark:focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-500"
                    placeholder=" "
                    type="text"
                    {...register("name", { required: true })}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 dark:text-gray-100 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 dark:before:border-gray-100 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 dark:after:border-gray-100 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-100 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-600 dark:peer-focus:text-primary-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-600 dark:peer-focus:before:border-primary-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-600 dark:peer-focus:after:border-primary-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                    Username
                  </label>
                </div>
              </div>
              <div className="w-72">
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-gray-500 dark:border-gray-100 dark:border-t-transparent border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 dark:text-gray-100 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 dark:placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-600 dark:placeholder-shown:border-t-gray-100 focus:border-2 focus:border-primary-600 dark:focus:border-primary-600 focus:border-t-transparent dark:focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-500"
                    placeholder=" "
                    type="email"
                    {...register("email", { required: true })}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 dark:text-gray-100 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 dark:before:border-gray-100 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 dark:after:border-gray-100 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-100 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-600 dark:peer-focus:text-primary-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-600 dark:peer-focus:before:border-primary-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-600 dark:peer-focus:after:border-primary-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                    Email
                  </label>
                </div>
              </div>
              <div className="w-72">
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-gray-500 dark:border-gray-100 border-t-transparent dark:border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 dark:text-gray-100 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 dark:placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-600 dark:placeholder-shown:border-t-gray-100 focus:border-2 focus:border-primary-600 dark:focus:border-primary-600 focus:border-t-transparent dark:focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-500"
                    placeholder=" "
                    autoComplete="off"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 dark:text-gray-100 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 dark:before:border-gray-100 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 dark:after:border-gray-100 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-100 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-600 dark:peer-focus:text-primary-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-600 dark:peer-focus:before:border-primary-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-600 dark:peer-focus:after:border-primary-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                    Password
                  </label>
                </div>
              </div>
              <div className="w-72">
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-gray-500 dark:border-gray-100 dark:border-t-transparent border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 dark:text-gray-100 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-500 dark:placeholder-shown:border-gray-100 placeholder-shown:border-t-gray-600 dark:placeholder-shown:border-t-gray-100 focus:border-2 focus:border-primary-600 dark:focus:border-primary-600 focus:border-t-transparent dark:focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-gray-500"
                    placeholder=" "
                    type="password"
                    autoComplete="off"
                    {...register("confirmPassword", { required: true })}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 dark:text-gray-100 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 dark:before:border-gray-100 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 dark:after:border-gray-100 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-100 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-600 dark:peer-focus:text-primary-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary-600 dark:peer-focus:before:border-primary-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary-600 dark:peer-focus:after:border-primary-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                    Confirm Password
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-bold rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 mt-5 "
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
        <Image
          loading="lazy"
          src={SignUpImg}
          alt="Sign Up"
          className=" w-[600px] h-[600px] object-cover"
        />
      </div>
    </div>
  );
}
