// utils/auth.ts

import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export const getAccessToken = async (req: GetServerSidePropsContext["req"]) => {
  await getSession({ req });
};
