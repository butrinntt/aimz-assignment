import type { iUserCreateDto, iUserEditDto } from "../types";


export interface iValidation {
  hasError: boolean;
  errorMessages: {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  };
}

export default function validateUser(
  user: iUserCreateDto | iUserEditDto
): iValidation {
  const errors: iValidation["errorMessages"] = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    ip_address: "",
  };
  if (!user.first_name?.trim()) {
    errors.first_name = "First name must not be empty!";
  }
  if (!user.last_name?.trim()) {
    errors.last_name = "Last name must not be empty!";
  }
  const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!user.email?.trim()) {
    errors.email = "Email must not be empty!";
  } else if (!emailRegex.test(user.email)) {
    errors.email = "Email format is invalid!";
  }
  if (!user.ip_address?.trim()) {
    errors.ip_address = "IP address must not be empty!";
  }
  if (!user.gender?.trim()) {
    errors.gender = "Gender must not be empty!";
  }

  const hasError = Object.values(errors).some((msg) => msg.length > 0);

  return { hasError, errorMessages: errors };
}
