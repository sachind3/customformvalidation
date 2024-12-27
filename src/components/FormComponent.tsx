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
import { FormEvent, useState } from "react";

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

const FormComponent = () => {
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

  const isValidEmail = (val: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
  const isValidPhoneNumber = (val: string) => /^\d{10}$/.test(val);
  const isValidPassword = (val: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone Number is required";
    } else if (!isValidPhoneNumber(formData.phone_number)) {
      newErrors.phone_number = "Phone Number must be 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include one symbol, one number, and one letter";
    }

    if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = "Passwords must match";
    }

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (formData.interests.length === 0)
      newErrors.interests = "Select at least one interest";

    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
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
        <Label htmlFor="email">Email Name</Label>
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
          type="number"
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
          <SelectTrigger
            className="w-full"
            id="gender"
            name="gender"
            value={formData.gender}
          >
            <SelectValue placeholder="Select a Gender" />
          </SelectTrigger>
          <SelectContent className="w-full">
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
export default FormComponent;
