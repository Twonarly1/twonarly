interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({ title, description, children }: Props) => {
  return (
    <section className="space-y-4">
      <div className="space-y-1 px-4">
        <h2 className="font-medium text-base text-foreground">{title}</h2>
        {description && <p className="text-secondary-foreground text-sm">{description}</p>}
      </div>
      {children}
    </section>
  );
};

export default Section;
