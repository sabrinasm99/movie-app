import styles from "./styles/index.module.css";
import { useGetAccountDetails } from "../../api";

export default function ProfileData() {
  const { data: account, isLoading, isError } = useGetAccountDetails();

  return (
    <div className="border-2 border-gray-300 rounded-md p-2 h-56 relative">
      <div className={styles["bg-profile"]} />
      <div className="absolute top-5 left-5">
        <div className="flex justify-center">
          <div className="text-7xl flex justify-center items-center rounded-full bg-blue-900 h-32 w-32 text-white uppercase">
            {!isLoading && !isError && account.username.slice(0, 1)}
          </div>
        </div>
        <p className="text-center text-xl">
          {!isLoading && !isError && account.username}
        </p>
      </div>
    </div>
  );
}
