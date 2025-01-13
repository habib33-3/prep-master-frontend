import { axiosPublicInstance } from "@/lib/axios/axios-public";

export const saveUser = async (email: string, name: string) => {
  const res = await axiosPublicInstance.post("/user/save-user", {
    email,
    name,
  });

  return res.data;
};
