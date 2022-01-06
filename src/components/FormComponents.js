import { useState } from "react";

export const Input = ({ callback, placeholder, value, type }) => {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={callback}
      className="w-full md:w-72 bg-transparent border-2 px-3 py-2 outline-none border-black rounded-md"
    />
  );
};

export const PasswordField = ({ callback, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="my-3 border-2 border-black w-full md:w-72 py-2 px-3 text-left rounded-md md:ml-9 flex items-center">
      <input
        required
        aria-label="Password Input Field"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="outline-none w-11/12"
        value={value}
        onChange={callback}
      />
      {showPassword ? (
        <i
          role="button"
          aria-label="Show password"
          onClick={() => setShowPassword(!showPassword)}
          className="fa fa-eye-slash float-right cursor-pointer"
        />
      ) : (
        <i
          role="button"
          aria-label="Hide password"
          onClick={() => setShowPassword(!showPassword)}
          className="fa fa-eye float-right cursor-pointer"
        />
      )}
    </div>
  );
};
