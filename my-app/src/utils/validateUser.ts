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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email?.trim()) {
    errors.email = "Email must not be empty!";
  } else if (!emailRegex.test(user.email)) {
    errors.email = "Email format is invalid!";
  }
  if (!user.ip_address?.trim()) {
    errors.ip_address = "IP address must not be empty!";
  } else {
    const ipAddress = user.ip_address.trim();
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ipAddress)) {
      errors.ip_address =
        "IP address must be in valid IPv4 format (e.g., 192.168.1.1)!";
    } else {
      const octets = ipAddress.split(".");
      const invalidOctet = octets.find((octet) => {
        const num = parseInt(octet, 10);
        return (
          num < 0 ||
          num > 255 ||
          isNaN(num) ||
          (octet.length > 1 && octet.startsWith("0"))
        );
      });
      if (invalidOctet !== undefined) {
        errors.ip_address =
          "Each IP address segment must be between 0 and 255 and cannot have leading zeros!";
      }
    }
  }
  if (!user.gender?.trim()) {
    errors.gender = "Gender must not be empty!";
  }

  const hasError = Object.values(errors).some((msg) => msg.length > 0);

  return { hasError, errorMessages: errors };
}
