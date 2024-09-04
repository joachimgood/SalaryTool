import { Accordion, Form } from "react-bootstrap";
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
    setPension,
    changeVacationdays,
  } = useCostCalculator(monthlyIncome);

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
                onChange={() => changeVacationdays(25)}
                label="25 dagar"
                name="vacation"
              />
            </div>
            <div className="col">
              <Form.Check
                type="radio"
                checked={vacationDays === 30}
                onChange={() => changeVacationdays(30)}
                label="30 dagar"
                name="vacation"
              />
            </div>
          </div>
        </Form.Group>
      </Form>
      <br></br>
      <h3>Möjlig bruttolön: {formatAmount(potentialSalary)} kr/månad</h3>
    </div>
  );
};
export default Expenses;
