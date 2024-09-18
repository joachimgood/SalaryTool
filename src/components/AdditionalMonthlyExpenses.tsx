import { InputGroup, Form, Button } from "react-bootstrap";
import { IAdditionalMonthlyExpense } from "../hooks/UseExpsensesCalculator";

interface AdditionalMonthlyExpensesProps {
  additionalMonthlyExpenses: IAdditionalMonthlyExpense[];
  onChange: (expenses: IAdditionalMonthlyExpense[]) => void;
}

const AdditionalMonthlyExpenses: React.FC<AdditionalMonthlyExpensesProps> = ({
  additionalMonthlyExpenses,
  onChange,
}) => {
  const addExpense = () => {
    const newExpense = {
      id: additionalMonthlyExpenses.length.toString(),
      name: "",
      cost: 0,
    };
    onChange([...additionalMonthlyExpenses, newExpense]);
  };

  const editExpense = (id: string, name: string, cost: number) => {
    const updatedExpenses = additionalMonthlyExpenses.map((expense) => {
      if (expense.id === id) {
        return { ...expense, cost: cost, name: name };
      }
      return expense;
    });

    onChange(updatedExpenses);
  };

  const removeExpense = (id: string) => {
    const updatedExpenses = additionalMonthlyExpenses.filter(
      (expense) => expense.id !== id
    );
    onChange(updatedExpenses);
  };
  return (
    <>
      {additionalMonthlyExpenses && (
        <>
          {additionalMonthlyExpenses.map((expense, index) => (
            <InputGroup key={index} className="mb-3">
              <InputGroup.Text>Namn:</InputGroup.Text>
              <Form.Control
                placeholder={index === 0 ? "t.ex. telefonabonnemang" : ""}
                value={expense.name}
                onChange={(e) =>
                  editExpense(expense.id, e.target.value, expense.cost)
                }
              />
              <InputGroup.Text>Pris:</InputGroup.Text>
              <Form.Control
                min={0}
                max={20000}
                value={expense.cost}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (!isNaN(newValue)) {
                    editExpense(expense.id, expense.name, newValue);
                  }
                }}
              />
              <InputGroup.Text> kr</InputGroup.Text>
              <Button
                variant="outline-light"
                id="button-addon2"
                onClick={() => removeExpense(expense.id)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </InputGroup>
          ))}
        </>
      )}
      <div className="d-grid gap-2">
        <Button onClick={() => addExpense()} variant="primary">
          Lägg till utgift
        </Button>
      </div>
    </>
  );
};
export default AdditionalMonthlyExpenses;
