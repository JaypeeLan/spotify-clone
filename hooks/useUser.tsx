import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupabaseUser,
} from "@supabase/auth-helpers-react";
import {
  ContextHookProps,
  Subscription,
  UserContextType,
  UserDetails,
} from "@/types";


// Creating a UserContext with an initial value of undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Creating a MyUserContextProvider component that wraps its children with the UserContext.Provider
export const MyUserContextProvider = (props: ContextHookProps) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  // Getting the user object from the useSupabaseUser hook
  const user = useSupabaseUser();
  // Getting the access token from the session object or setting it to null if it doesn't exist
  const accessToken = session?.access_token ?? null;
  // Initializing isLoadingData state with an initial value of false
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  // Initializing userDetails state with an initial value of null
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  // Initializing subscription state with an initial value of null
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  // Get user details from the "users" table in Supabase
  const getUserDetails = () => supabase.from("users").select("*").single();

  // Get subscription details from the "subscriptions" table in Supabase where status is "trialing" or "active"
  const getSubscription = () =>
    supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  //  fetch user details and subscription data when user is logged in and data is not already loaded
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  // Creating a value object to pass to the UserContext.Provider
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

// Creating a custom useUser hook that returns the context value from UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserCOntextProvider");
  }

  return context;
};
