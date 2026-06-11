import Link from 'next/link';
import type { Club } from '@/data/clubs';

const categoryColors: Record<Club['category'], string> = {
  스포츠: 'bg-blue-100 text-blue-700',
  문화: 'bg-purple-100 text-purple-700',
  사회공헌: 'bg-green-100 text-green-700',
};

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link
      href={`/clubs/${club.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all overflow-hidden"
    >
      <div className="h-1 bg-primary" />

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-start justify-between gap-3">
          <span className="text-4xl leading-none">{club.icon}</span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[club.category]}`}
          >
            {club.category}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
            {club.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
            {club.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>👥 {club.member_count}명</span>
          <span className="text-primary font-medium group-hover:underline">자세히 보기 →</span>
        </div>
      </div>
    </Link>
  );
}
