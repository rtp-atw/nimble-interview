import { LocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Profile = {
  id: number;
  uuid: string;
  email: string;
  token: string;
  exp: number;
};

const defaultProfile: Profile = {
  id: 0,
  uuid: "",
  email: "",
  token: "",
  exp: new Date().getTime(),
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile(undefined);
    setLoading(false);
  }, [setProfile, setLoading]);

  return { profile, loading };
};

export const useProtectedAuth = () => {
  const { profile, loading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (profile) {
      router.push("/");
    }
  }, [profile, loading, router]);
};
