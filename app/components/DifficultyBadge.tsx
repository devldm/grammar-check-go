export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: string;
}) {
  const getBadgeClass = () => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "badge-success";
      case "intermediate":
        return "badge-warning";
      case "advanced":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className={`badge badge-soft ${getBadgeClass()}`}>{difficulty}</div>
  );
}
