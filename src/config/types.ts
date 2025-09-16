import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type RegisterPrevState = {
  success: boolean;
  message?: string;
  errors?: {
    errors: string[];
    properties?: {
      name?: { errors: string[] };
      email?: { errors: string[] };
      password?: { errors: string[] };
    };
  };
};

export type LoginPrevState = {
  success: boolean;
  message?: string;
  errors?: {
    errors: string[];
    properties?: {
      email?: { errors: string[] };
      password?: { errors: string[] };
    };
  };
};
