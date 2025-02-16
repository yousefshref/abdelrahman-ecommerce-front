import React, { useContext, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { AuthContextProvider } from "../../../Contexts/AuthContext";
import { UsersContextProvider } from "../../../Contexts/UsersContext";
import { useToast } from "@chakra-ui/react";
import StatesSettings from "../../../Components/AdminSettings/StatesSettings/StatesSettings";
import HomePageImage from "../../../Components/HomePageImage";

const AdminSettings = () => {
  const userContext = useContext(UsersContextProvider);
  const authContext = useContext(AuthContextProvider);

  const user = authContext?.user;

  const [username, setUsername] = React.useState(user?.username);
  const [email, setEmail] = React.useState(user?.email);
  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
  }, [user]);

  const handleUpdateUser = async () => {
    await userContext
      ?.updateUser(user?.id, { username, email })
      .then(() => authContext?.getUser());
  };

  const toast = useToast();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleUpdateUserPassword = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "كلمة المرور غير متطابقة",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      await userContext
        ?.updateUserPassword(user?.id, { password })
        .then(() => authContext?.getUser());
    }
  };
  return (
    <AdminLayout>
      {/* top (basic)*/}
      <div className="bg-black p-5 rounded-2xl text-white">
        {/* Header Section */}
        <div className="flex justify-between flex-wrap items-center mb-6">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-1 bg-green-500"></div>
            <p className="underline text-2xl font-bold">التفاصيل الشخصية</p>
          </div>
          <div className="flex gap-2 items-center mt-3 sm:mt-0">
            <button className="bg-green-700 py-1 px-4 rounded text-sm sm:text-base">
              حفظ التغييرات
            </button>
            <button className="bg-white text-black py-1 px-2 rounded text-sm sm:text-base">
              الغاء
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-around items-center gap-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://www.pngall.com/wp-content/uploads/5/User-Profile-Transparent.png"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-green-700"
              alt="Profile"
            />
            <input type="file" id="profile_picture" hidden />
            <label
              htmlFor="profile_picture"
              className="border-2 cursor-pointer border-green-700 py-1 px-10 rounded-full text-center w-fit mt-4 text-sm sm:text-base"
            >
              صورة
            </label>
          </div>

          {/* User Details Section */}
          <div className="w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row justify-around items-center">
                <p className="text-lg sm:text-2xl font-bold">الاسم :</p>
                <input
                  type="text"
                  className="rounded-full w-full sm:w-2/4 px-4 py-1 bg-[#1f1f1f] border-none text-white text-center"
                  value={"Admin"}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-around items-center">
                <p className="text-lg sm:text-2xl font-bold">كلمة المرور :</p>
                <div className="flex flex-col gap-2 w-full sm:w-1/2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <p className="text-sm sm:text-xl font-light">الحالي:</p>
                      <input
                        type="password"
                        className="rounded-full w-full px-4 py-1 bg-[#1f1f1f] border-none text-white text-center"
                        value={""}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-around mt-10 items-center">
              <p className="text-lg sm:text-2xl font-bold">
                البريد الالكتروني :
              </p>
              <input
                type="text"
                className="rounded-full w-full sm:w-1/2 px-4 py-1 bg-[#1f1f1f] border-none text-white text-center"
                value={"Example@gmail.com"}
              />
            </div>
          </div>
        </div>
      </div>

      {user?.is_superuser ? (
        <>
          {/* bottom */}
          <HomePageImage />
        </>
      ) : null}
    </AdminLayout>
  );
};

export default AdminSettings;
