interface StatCardProps {
  number: string;
  label: string;
  gradient: string;
}

const StatCard = ({ number, label, gradient }: StatCardProps) => (
  <div className="text-center p-6 group hover:transform hover:-translate-y-2 transition-all duration-300">
    <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
      {number}
    </div>
    <div className="text-gray-600 dark:text-gray-400 font-medium">{label}</div>
  </div>
);

export default StatCard;
