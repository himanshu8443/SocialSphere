import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { updateUserDetails } from "@/app/api/user";

const EditProfile = ({
  user,
  setUser,
  editProfileModal,
  setEditProfileModal,
}: {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  editProfileModal: boolean;
  setEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const [formError, setFormError] = useState<any>(null);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updatedUser.name.length === 0 || !updateUserDetails.name) {
      setFormError("Name cannot be empty");
      return;
    }
    if (
      updatedUser.name === user.name &&
      updatedUser.location === user.location &&
      updatedUser.about === user.about
    ) {
      setEditProfileModal(false);
      setFormError(null);
      return;
    }
    try {
      const res = await updateUserDetails({
        about: updatedUser.about,
        location: updatedUser.location,
        name: updatedUser.name,
      });
      console.log(res);
      if (res.success) {
        setUser((prev: any) => ({ ...prev, ...updatedUser }));
      }
      setEditProfileModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    editProfileModal && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-gray-700 rounded-md p-3">
          <div className="flex justify-between items-center mb-5">
            <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
              Edit Profile
            </p>
            <button
              className=" px-3 py-1"
              onClick={() => {
                setEditProfileModal(false);
                setFormError(null);
                setUpdatedUser(user);
              }}
            >
              <CloseIcon className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <form className="flex flex-col p-1" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-1 items-center mb-5">
              <img
                src={user?.profileImage}
                alt="avatar"
                className="md:w-40 md:h-40 h-24 w-24 rounded-full"
              />
              <div className="flex flex-col gap-3 ml-5">
                <div className="flex gap-2 flex-col">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="p-1 rounded outline-none bg-gray-600 w-[250px] h-10"
                    autoComplete={"off"}
                    value={updatedUser?.name}
                    onChange={(e) => {
                      setUpdatedUser({ ...updatedUser, name: e.target.value });
                      setFormError(null);
                    }}
                  />
                  {
                    <p className="text-xs text-red-500">
                      {formError && formError}
                    </p>
                  }
                </div>
                <div className="flex gap-2 flex-col">
                  <label className="" htmlFor="location">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="p-1 rounded outline-none bg-gray-600 w-[250px] h-10"
                    autoComplete={"off"}
                    value={updatedUser?.location}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <label className="" htmlFor="about">
              About
            </label>
            <textarea
              name="about"
              id="about"
              className="p-1 rounded outline-none bg-gray-600 min-h-[100px]"
              autoComplete={"off"}
              value={updatedUser?.about}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, about: e.target.value })
              }
            />
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="px-3 py-1 bg-primary-700 rounded-md active:bg-primary-800 active:scale-95 transition duration-150"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProfile;
