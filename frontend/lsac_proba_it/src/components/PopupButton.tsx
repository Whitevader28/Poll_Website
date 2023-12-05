// This should be a generic button that displays its name and calls a function onClick
interface Props {
  // we only want to use this button for Login and Register
  name: "Login" | "Register" | "Create Poll" | "Logout";
  onClick: (value: string) => void;
  children?: any; // why should i put this here?
}

function PopupButton({ name, onClick }: Props) {
  return <div onClick={() => onClick(name)}>{name}</div>;
}

export default PopupButton;
