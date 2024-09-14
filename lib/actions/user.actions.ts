"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

type SignInProps = {
  email: string;
  password: string;
};

const SESSION_NAME = "appwrite-session";

export const signIn = async ({ email, password }: SignInProps) => {
  try {
    // mutation / database query / fetch request / etc...

    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    if (response) {
      cookies().set(SESSION_NAME, response.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
    }
    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  const name = `${firstName} ${lastName}`;

  try {
    // create a user account

    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(SESSION_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete(SESSION_NAME);
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

// ... your initialization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}
