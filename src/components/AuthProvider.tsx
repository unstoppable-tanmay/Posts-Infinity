/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authAtom, userAtom } from "../atom/atom";
import { toast } from "react-toastify";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isLoading, error, data } = useQuery({
    queryKey: ["userData"],
    initialData: user,
    queryFn: async () => {
      try {
        if (!auth) {
          const data = await axios.get(
            import.meta.env.VITE_SERVER_URL! + "/user",
            { withCredentials: true }
          );
          if (!data.data.status) {
            setAuth(false);
            // toast(data.data.msg);
          }
          return data.data.data;
        } else {
          return user;
        }
      } catch (error: any) {
        toast(error);
      }
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data)
      setUser(data);
      setAuth(true);
    }
  }, [data, setUser, setAuth]);

  if (isLoading) return "Loading...";

  // if(error) {
  //   setAuth(false)
  // }

  // if (error) return "An error has occurred: " + error.message;

  return <>{children}</>;
};

export default AuthProvider;
