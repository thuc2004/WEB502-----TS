interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string; // Prop tùy chọn
}

const Button: React.FC<ButtonProps> = ({ label, onClick, color = "blue" }) => {
  return (
    <button style={{ color }} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
