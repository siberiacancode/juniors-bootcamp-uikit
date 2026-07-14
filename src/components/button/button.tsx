import type { ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cn } from "@siberiacancode/reactuse";

import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={cn(styles.button, styles[variant], styles[size], className)}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      {...props}
    />
  );
};
