interface TagChipProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

const TagChip = ({ tag, active, onClick }: TagChipProps) => {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-muted/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
      } ${onClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary" : ""}`}
    >
      #{tag}
    </Comp>
  );
};

export default TagChip;
