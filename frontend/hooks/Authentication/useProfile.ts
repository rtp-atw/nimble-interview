import { Cookie } from "@/utils/cookie";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const userJWT = useMemo((): string | undefined => {
    const cookieJWT = Cookie.get(COOKIE_KEY);
    return cookieJWT;
  }, [router]);

  const handleLogout = useCallback(() => {
    router
      .push("/")
      .then(() => Cookie.remove(COOKIE_KEY))
      .catch(() => Cookie.remove(COOKIE_KEY));
  }, [router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setProfile(undefined);
    setLoading(false);
  }, [setProfile, setLoading, userJWT]);

  return { profile, loading, mounted, userJWT, handleLogout };
};

export const useProtectedAuth = () => {
  const { loading, userJWT } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (userJWT) {
      router.push("/");
    }
  }, [loading, router, userJWT]);
};

export const useRequireAuth = () => {
  const { loading, userJWT } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!userJWT) {
      router.push("/");
    }
  }, [loading, router, userJWT]);
};
