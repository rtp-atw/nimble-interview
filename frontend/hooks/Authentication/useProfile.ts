import { Cookie } from "@/utils/cookie";
import { Router, useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { COOKIE_KEY } from ".";

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

  const router = useRouter();

  const userJWT = useMemo((): string | undefined => {
    const cookieJWT = Cookie.get(COOKIE_KEY);
    return cookieJWT;
  }, [router]);

  useEffect(() => {
    console.log("userJWT", userJWT);
    setProfile(undefined);

    setLoading(false);
  }, [setProfile, setLoading, userJWT]);

  return { profile, loading, userJWT };
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
