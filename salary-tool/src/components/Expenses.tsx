import { Button, Form, InputGroup } from "react-bootstrap";
import { useCostCalculator } from "../hooks/UseCostCalculator";
import { formatAmount } from "../utils/formatter";

interface ExpensesProps {
  monthlyIncome: number;
}

const Expenses: React.FC<ExpensesProps> = ({ monthlyIncome }) => {
  const {
    amountToDistribute,
    potentialSalary,
    pension,
    vacationDays,
    additionalExpenses,
    setPension,
    setAdditionalExpenses,
    setVacationDays,
  } = useCostCalculator(monthlyIncome);

  const addExpense = () => {
    const newExpense = {
      id: additionalExpenses.length.toString(),
      name: "",
      cost: 0,
    };
    setAdditionalExpenses([...additionalExpenses, newExpense]);
  };

  const editExpense = (id: string, name: string, cost: number) => {
    const updatedExpenses = additionalExpenses.map((expense) => {
      if (expense.id === id) {
        return { ...expense, cost: cost, name: name };
      }
      return expense;
    });

    setAdditionalExpenses(updatedExpenses);
  };
  return (
    <div>
      <h3>Egen intäkt att fördela: {formatAmount(amountToDistribute)} kr</h3>
      <Form>
        <Form.Group>
          <Form.Label>Tjänstepension: {pension.toString() + " kr"}</Form.Label>
          <Form.Range
            min={0}
            max={15000}
            step={1000}
            value={pension}
            onChange={(e) => setPension(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Semester</Form.Label>
          <div className="row">
            <div className="col">
              <Form.Check
                type="radio"
                checked={vacationDays === 25}
                onChange={() => setVacationDays(25)}
                label="25 dagar"
                name="vacation"
              />
            </div>
            <div className="col">
              <Form.Check
                type="radio"
                checked={vacationDays === 30}
                onChange={() => setVacationDays(30)}
                label="30 dagar"
                name="vacation"
              />
            </div>
          </div>
        </Form.Group>
      </Form>
      <br></br>
      {additionalExpenses.map((expense, index) => (
        <InputGroup key={index} className="mb-3">
          <InputGroup.Text>Namn:</InputGroup.Text>
          <Form.Control
            value={expense.name}
            onChange={(e) =>
              editExpense(expense.id, e.target.value, expense.cost)
            }
          />
          <InputGroup.Text>Summa:</InputGroup.Text>
          <Form.Control
            type="number"
            min={0}
            max={20000}
            value={expense.cost}
            onChange={(e) =>
              editExpense(expense.id, expense.name, Number(e.target.value))
            }
          />
        </InputGroup>
      ))}
      <div className="d-grid gap-2">
        <Button onClick={() => addExpense()} variant="secondary">
          Lägg till utgift
        </Button>
      </div>

      <h3>Möjlig bruttolön: {formatAmount(potentialSalary)} kr/månad</h3>
    </div>
  );
};
export default Expenses;
