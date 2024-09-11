import { Badge, Button, Card, Form, InputGroup, Stack } from "react-bootstrap";
import { useExpensesCalculator } from "../hooks/UseExpsensesCalculator";
import { formatAmount } from "../utils/formatter";
import { useEffect } from "react";

interface ExpensesProps {
  monthlyIncome: number;
  onPotentialSalaryChange: (salary: number) => void;
}

const Expenses: React.FC<ExpensesProps> = ({
  monthlyIncome,
  onPotentialSalaryChange,
}) => {
  const {
    potentialSalary,
    pension,
    vacationDays,
    additionalExpenses,
    savings,
    setPension,
    setSavings,
    setAdditionalExpenses,
    setVacationDays,
  } = useExpensesCalculator(monthlyIncome);

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

  const removeExpense = (id: string) => {
    const updatedExpenses = additionalExpenses.filter(
      (expense) => expense.id !== id
    );
    setAdditionalExpenses(updatedExpenses);
  };

  useEffect(() => {
    if (onPotentialSalaryChange) {
      onPotentialSalaryChange(potentialSalary);
    }
  }, [potentialSalary, onPotentialSalaryChange]);

  return (
    <div>
      <Form>
        <Card>
          <Card.Header as="h5">Tjänstepension</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>
                {`Sparande: ${formatAmount(pension)} kr`}
              </Form.Label>
              <Form.Range
                min={0}
                max={15000}
                step={1000}
                value={pension}
                onChange={(e) => setPension(Number(e.target.value))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Semester</Card.Header>
          <Card.Body>
            <Form.Group>
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
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Sparande</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>
                {`Sparande till kostnadställe: ${formatAmount(savings)} kr`}
              </Form.Label>
              <Form.Range
                min={0}
                max={50000}
                step={1000}
                value={savings}
                onChange={(e) => setSavings(Number(e.target.value))}
              />
              <Form.Label>Kostnadsställets saldo efter:</Form.Label>
            </Form.Group>
            <Stack>
              <b>
                6 månader:{" "}
                <Badge bg="secondary">
                  {formatAmount(savings * 6).toString() + " kr"}
                </Badge>
              </b>
              <b>
                12 månader:{" "}
                <Badge bg="secondary">
                  {formatAmount(savings * 12).toString() + " kr"}
                </Badge>
              </b>
            </Stack>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Övriga utgifter</Card.Header>
          <Card.Body>
            {additionalExpenses.map((expense, index) => (
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
                  variant="outline-danger"
                  id="button-addon2"
                  onClick={() => removeExpense(expense.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </InputGroup>
            ))}
            <div className="d-grid gap-2">
              <Button onClick={() => addExpense()} variant="primary">
                Lägg till utgift
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};
export default Expenses;
