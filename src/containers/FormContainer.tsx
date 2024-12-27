import FormComponent from "@/components/FormComponent";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const FormContainer = () => {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold text-lg">Custom Form Validation</h1>
      </CardHeader>
      <CardContent>
        <FormComponent />
      </CardContent>
    </Card>
  );
};
export default FormContainer;
