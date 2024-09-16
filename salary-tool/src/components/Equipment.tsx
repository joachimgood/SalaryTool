import { InputGroup, Form } from "react-bootstrap";
import { IEquipment } from "../hooks/UseExpsensesCalculator";

interface EquipmentProps {
  equipment: IEquipment[];
  onChange: (expenses: IEquipment[]) => void;
}

const Equipment: React.FC<EquipmentProps> = ({ equipment, onChange }) => {
  const editEquiment = (id: string, selected: boolean) => {
    const updatedEquipments = equipment.map((eq) => {
      if (eq.id === id) {
        return {
          ...eq,
          selected: selected,
        };
      }
      return eq;
    });

    onChange(updatedEquipments);
  };

  return (
    <>
      {equipment.map((eq, index) => (
        <InputGroup key={index} className="mb-3">
          <Form.Check
            id={eq.id}
            name={eq.name}
            checked={eq.selected}
            label={eq.name}
            onClick={() => editEquiment(eq.id, !eq.selected)}
          />
        </InputGroup>
      ))}
    </>
  );
};
export default Equipment;
