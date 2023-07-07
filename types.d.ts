import { IconType } from "react-icons";

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

export { ChildrenProp, BoxProps, SidebarItemProps };
