import { Badge, Button, Card, Form, InputGroup, Stack } from "react-bootstrap";
import { useExpensesCalculator } from "../hooks/UseExpsensesCalculator";
import { formatAmount } from "../utils/formatter";
import { useEffect } from "react";
import AdditionalMonthlyExpenses from "./AdditionalMonthlyExpenses";
import Equipment from "./Equipment";

interface ExpensesProps {
  vacationDays: number;
  onVacationChange: (vacationDays: number) => void;
  onExpensesChange: (expenses: number) => void;
}

const Expenses: React.FC<ExpensesProps> = ({
  vacationDays,
  onVacationChange,
  onExpensesChange,
}) => {
  const {
    monthlyPension,
    additionalMotnhlyExpenses,
    monthlySavings,
    expenses,
    equipment,
    setMonthlyPension,
    setMonthlySavings,
    setAdditionalMonthlyExpense,
    setEquipment,
  } = useExpensesCalculator();

  useEffect(() => {
    onExpensesChange(expenses);
  }, [expenses]);

  return (
    <div>
      <Form>
        <Card>
          <Card.Header as="h5">Tjänstepension</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>
                {`Sparande: ${formatAmount(monthlyPension)} kr`}
              </Form.Label>
              <Form.Range
                min={0}
                max={15000}
                step={1000}
                value={monthlyPension}
                onChange={(e) => setMonthlyPension(Number(e.target.value))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Semester</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>{`Semesterdagar per år: ${vacationDays}`}</Form.Label>
              <Form.Range
                min={15}
                max={50}
                step={1}
                value={vacationDays}
                onChange={(e) => onVacationChange(Number(e.target.value))}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Sparande</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>
                {`Sparande till kostnadställe: ${formatAmount(
                  monthlySavings
                )} kr`}
              </Form.Label>
              <Form.Range
                min={0}
                max={50000}
                step={1000}
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
              />
              <Form.Label>Kostnadsställets saldo efter:</Form.Label>
            </Form.Group>
            <Stack>
              <b>
                6 månader:{" "}
                <Badge bg="secondary">
                  {formatAmount(monthlySavings * 6).toString() + " kr"}
                </Badge>
              </b>
              <b>
                12 månader:{" "}
                <Badge bg="secondary">
                  {formatAmount(monthlySavings * 12).toString() + " kr"}
                </Badge>
              </b>
            </Stack>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Utrustning</Card.Header>
          <Card.Body>
            <Equipment
              equipment={equipment}
              onChange={setEquipment}
            ></Equipment>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header as="h5">Övriga månatliga utgifter</Card.Header>
          <Card.Body>
            <AdditionalMonthlyExpenses
              additionalMonthlyExpenses={additionalMotnhlyExpenses}
              onChange={setAdditionalMonthlyExpense}
            />
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};
export default Expenses;
