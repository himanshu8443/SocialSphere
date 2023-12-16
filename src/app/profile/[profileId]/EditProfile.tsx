import React, { useState } from "react";

const EditProfile = ({
  user,
  setUser,
}: {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-600 rounded-md p-5">
        <div className="flex justify-between items-center mb-5">
          <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
            Edit Profile
          </p>
          <button className=" px-3 py-1" onClick={() => setUser(null)}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
