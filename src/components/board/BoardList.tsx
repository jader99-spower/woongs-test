'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Post, PostCategory } from '@/data/posts';

const categoryStyle: Record<PostCategory, string> = {
  자유: 'bg-gray-100 text-gray-600',
  질문: 'bg-purple-100 text-purple-700',
  후기: 'bg-green-100 text-green-700',
  모집: 'bg-blue-100 text-blue-700',
};

export default function BoardList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-light min-h-full">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
            <p className="text-gray-500 mt-2">동아리 활동 이야기를 자유롭게 나눠보세요.</p>
          </div>
          <Link
            href="/board/write"
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-dark transition-colors shrink-0"
          >
            글쓰기
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-sm">불러오는 중...</p>
            </div>
          ) : posts.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {posts.map((post, index) => (
                <li key={post.id}>
                  <Link
                    href={`/board/${post.id}`}
                    className="flex items-center gap-4 px-6 py-5 hover:bg-gray-light transition-colors group"
                  >
                    <span className="text-gray-300 text-sm w-8 shrink-0 text-center">
                      {posts.length - index}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${categoryStyle[post.category]}`}
                        >
                          {post.category}
                        </span>
                        <span className="font-medium text-gray-900 group-hover:text-primary transition-colors truncate">
                          {post.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {post.author} · {post.date}
                      </p>
                    </div>
                    <span className="text-gray-300 text-sm shrink-0">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">✏️</p>
              <p className="font-medium">아직 게시글이 없습니다.</p>
              <p className="text-sm mt-1">첫 번째 글을 작성해 보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
