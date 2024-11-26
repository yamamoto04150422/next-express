import { Button } from "primereact/button";

type ActionButtonProps = {
  onClick?: () => void;
};

const ActionButton = ({ onClick }: ActionButtonProps) => {
  return <Button label="test" onClick={onClick} />;
};

export default ActionButton;
