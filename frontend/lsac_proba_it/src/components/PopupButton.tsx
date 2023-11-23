import Button from "react-bootstrap/Button";

// This should be a generic button that displays its name and calls a function onClick
interface Props {
  // we only want to use this button for Login and Register
  name: "Login" | "Register";
  onClick: (value: string) => void;
}

function PopupButton({ name, onClick }: Props) {
  return <Button onClick={() => onClick(name)}>{name}</Button>;
}

export default PopupButton;
