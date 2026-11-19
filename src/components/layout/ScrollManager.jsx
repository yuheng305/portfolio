import useScrollOnNavigate from "../../hooks/useScrollOnNavigate";

// Renders nothing; isolates the location subscription so route changes
// re-render only this component instead of the whole layout shell.
export default function ScrollManager() {
  useScrollOnNavigate();
  return null;
}
