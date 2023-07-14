import { User } from "@supabase/auth-helpers-nextjs";
import { IconType } from "react-icons";
import Stripe from "stripe";

type ChildrenProp = {
  children: React.ReactNode;
};

interface BoxProps extends ChildrenProp {
  className?: string;
}

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

interface HeaderProps extends BoxProps {}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

interface SupabaseProviderProps extends ChildrenProp {}

// ---------------------------------------------  //

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

interface Products {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  Interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number;
  metadata?: Stripe.Metadata;
  products?: Products;
}

interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

interface ContextHookProps {
  [propName: string]: any;
}

// -------------------------------- //
interface UserProviderProps extends ChildrenProp {}

interface ModalProps extends ChildrenProp {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
}

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface UploadModalStore extends AuthModalStore {}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export {
  ChildrenProp,
  BoxProps,
  SidebarItemProps,
  HeaderProps,
  ButtonProps,
  ListItemProps,
  SupabaseProviderProps,
  UserDetails,
  Products,
  Price,
  Subscription,
  UserContextType,
  ContextHookProps,
  UserProviderProps,
  ModalProps,
  AuthModalStore,
  UploadModalStore,
  InputProps,
};
