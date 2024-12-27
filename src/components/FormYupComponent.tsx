import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import * as Yup from "yup";

interface UserInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  gender: string;
  interests: string[];
  dob: string;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be 10 digits")
    .required("Phone Number is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include one symbol, one number, and one letter"
    )
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  gender: Yup.string().required("Gender is required"),
  interests: Yup.array().min(1, "Select at least one interest"),
  dob: Yup.string().required("Date of Birth is required"),
});

const FormYupComponent = () => {
  const [formData, setFormData] = useState<UserInfo>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    gender: "",
    interests: [],
    dob: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      console.log("Form submitted successfully", formData);
    } else {
      console.log("Form validation failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, id]
        : prev.interests.filter((interest) => interest !== id),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          name="first_name"
          type="text"
          placeholder="eg: John"
          value={formData.first_name}
          onChange={handleChange}
        />
        {errors.first_name && (
          <div className="text-red-600 text-sm">{errors.first_name}</div>
        )}
      </div>
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          name="last_name"
          type="text"
          placeholder="eg: Doe"
          value={formData.last_name}
          onChange={handleChange}
        />
        {errors.last_name && (
          <div className="text-red-600 text-sm">{errors.last_name}</div>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="eg: john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <div className="text-red-600 text-sm">{errors.email}</div>
        )}
      </div>
      <div>
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          name="phone_number"
          type="text"
          placeholder="eg: 8989898989"
          value={formData.phone_number}
          onChange={handleChange}
        />
        {errors.phone_number && (
          <div className="text-red-600 text-sm">{errors.phone_number}</div>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div className="text-red-600 text-sm">{errors.password}</div>
        )}
      </div>
      <div>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
        />
        {errors.confirm_password && (
          <div className="text-red-600 text-sm">{errors.confirm_password}</div>
        )}
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full" id="gender">
            <SelectValue placeholder="Select a Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gender</SelectLabel>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.gender && (
          <div className="text-red-600 text-sm">{errors.gender}</div>
        )}
      </div>
      <div>
        <Label htmlFor="interests">Interests</Label>
        <div className="flex gap-3 flex-wrap">
          {["coding", "sports", "reading"].map((interest) => (
            <Label key={interest} htmlFor={interest}>
              <input
                type="checkbox"
                id={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </Label>
          ))}
        </div>
        {errors.interests && (
          <div className="text-red-600 text-sm">{errors.interests}</div>
        )}
      </div>
      <div>
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <div className="text-red-600 text-sm">{errors.dob}</div>}
      </div>
      <div className="flex gap-3">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant={"secondary"}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default FormYupComponent;
