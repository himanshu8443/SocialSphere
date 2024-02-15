import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { motion } from "framer-motion";

const Notification = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-5 shadow-sm shadow-gray-300 dark:shadow-gray-700 dark:border-gray-700 border-gray-200  p-2 rounded-lg border bg-gray-100 hover:dark:bg-gray-700 dark:bg-gray-800 hover:bg-slate-200 active:bg-gray-100 dark:active:bg-gray-800"
        title="Notification"
        onClick={() => setOpen(!open)}
      >
        <NotificationsNoneOutlinedIcon className=" text-primary-600  text-4xl" />
      </button>

      {open && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ x: 100, opacity: 0 }}
          className={`absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg p-5 z-10 `}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">Notification</h1>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 dark:text-gray-300"
              title="Close"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <h3 className="text-gray-500 dark:text-gray-400">
              You have no new notification
            </h3>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Notification;
