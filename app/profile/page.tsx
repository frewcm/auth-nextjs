"use client";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function () {
  const [data, setData] = useState("Nothing");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/sign-out");
      toast.success("Logged out successfully");
      router.push("/sign-in");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
      console.log(error.message);
    }
  };
  const getUserData = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data.data._id);
    console.log(response.data.data._id);
  };
  return (
    <div>
      <h1>profile page</h1>
      <div>
        <h2 className="bg-orange-500 px-2 py-1 rounded  text-white">
          {data === "Nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>

        <Button onClick={getUserData}>User</Button>
      </div>

      <div>
        {!loading ? (
          <Button onClick={onLogout}>Logout</Button>
        ) : (
          <ButtonLoading />
        )}
      </div>
    </div>
  );
}
