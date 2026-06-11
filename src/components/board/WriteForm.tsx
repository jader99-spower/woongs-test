'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { PostCategory } from '@/data/posts';

const CATEGORIES: PostCategory[] = ['자유', '질문', '후기', '모집'];

export default function WriteForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    category: '자유' as PostCategory,
    author: '',
    content: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) return;

    setSubmitting(true);
    setError('');

    const today = new Date().toISOString().split('T')[0];
    const { error: dbError } = await supabase.from('posts').insert({
      title: form.title.trim(),
      category: form.category,
      author: form.author.trim(),
      content: form.content.trim(),
      date: today,
    });

    if (dbError) {
      setError('등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
      setSubmitting(false);
      return;
    }

    router.push('/board');
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
          <h1 className="text-3xl font-bold text-gray-900">글쓰기</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="title">
                제목 <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="category">
                카테고리
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="author">
                작성자 <span className="text-red-400">*</span>
              </label>
              <input
                id="author"
                name="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                placeholder="이름 (부서)"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="content">
                내용 <span className="text-red-400">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="내용을 입력하세요"
                required
                rows={10}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/board"
              className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-full hover:border-gray-400 transition-colors"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {submitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
