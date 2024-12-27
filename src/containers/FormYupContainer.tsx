import FormYupComponent from "@/components/FormYupComponent";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const FormYupContainer = () => {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-lg">Yup Form Validation</h1>
      </CardHeader>
      <CardContent>
        <FormYupComponent />
      </CardContent>
    </Card>
  );
};
export default FormYupContainer;
