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

export default function PostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setPost(data ?? null));
  }, [id]);

  if (post === undefined) {
    return (
      <div className="bg-gray-light min-h-full flex items-center justify-center">
        <div className="text-gray-400">불러오는 중...</div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="bg-gray-light min-h-full">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 font-medium">게시글을 찾을 수 없습니다.</p>
          <Link
            href="/board"
            className="inline-block mt-6 text-primary text-sm hover:underline"
          >
            ← 게시판으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-light min-h-full">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Link
            href="/board"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors mb-6"
          >
            ← 게시판으로
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryStyle[post.category]}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400">
            {post.author} · {post.date}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/board"
            className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
