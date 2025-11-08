interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard = ({ icon, title, description, delay }: ValueCardProps) => (
  <div
    className="text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-card border group hover:border-primary/20"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-20 h-20 bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      <span className="text-3xl text-white">{icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-card-foreground mb-4">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default ValueCard;
