import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  // TODO: consider making this a hook. it's used in a few places
  const loggedIn = await getLoggedInUser();
  const accounts = loggedIn ? await getAccounts({ userId: loggedIn?.$id }) : [];

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities"
        />
        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
        </div>
        <div className="flex flex-wrap gap-6">
          {accounts &&
            accounts.data.map((account: Account) => {
              return (
                <BankCard
                  key={account.id}
                  account={account}
                  userName={loggedIn?.firstName}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
