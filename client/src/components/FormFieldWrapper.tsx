import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface FormFieldWrapperProps {
  control: any;
  name: string;
  label: string;
  description?: string;
  type?: string;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function FormFieldWrapper({
  control,
  name,
  label,
  description,
  type = "text",
  placeholder,
  inputProps = {},
}: FormFieldWrapperProps) {
  const [display, setDisplay] = useState<string>(type);
  function toggleDispalay() {
    if (display === "text") setDisplay("password");
    if (display === "password") setDisplay("text");
  }
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex ">
            {/* <FormControl> */}
            <Input
              type={display}
              placeholder={placeholder}
              {...field}
              {...inputProps}
              className={fieldState.error ? "border-red-500 bg-red-50" : ""}
            />
            {/* </FormControl> */}
            {(name === "password" || name === "confirmPassword") && (
              <Button type="button" onClick={() => toggleDispalay()}>
                show password
              </Button>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}
