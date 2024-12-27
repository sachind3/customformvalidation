import FormContainer from "./containers/FormContainer";
import FormYupContainer from "./containers/FormYupContainer";

const App = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormContainer />
      <FormYupContainer />
    </div>
  );
};
export default App;
