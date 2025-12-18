import Link from 'next/link';
import { topics } from '@/data/mockData';

export default function FeaturesSection() {
  // Map categories กับ topics ที่มีใน mockData
  const categoryMapping = {
    'books': topics.find(t => t.id === 'books' || t.name.includes('สื่อ'))?.id,
    'ebook': topics.find(t => t.id === 'ebook' || t.name.includes('eBook'))?.id,
    'elearning': topics.find(t => t.id === 'elearning' || t.name.includes('Learning'))?.id,
    'shop': topics.find(t => t.id === 'shop' || t.name.includes('Shop'))?.id,
    'forms': topics.find(t => t.id === 'forms' || t.name.includes('ฟอร์ม'))?.id,
  };

  const categories = [
    {
      id: categoryMapping.books || 'books',
      name: 'สื่อความสาขา',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-pink-500/40 to-pink-600/40'
    },
    {
      id: categoryMapping.ebook || 'ebook',
      name: 'eBook Center',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-purple-500/40 to-purple-600/40'
    },
    {
      id: categoryMapping.elearning || 'elearning',
      name: 'e - Learning',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-indigo-500/40 to-indigo-600/40'
    },
    {
      id: categoryMapping.shop || 'shop',
      name: 'Turbo Shop',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-blue-500/40 to-blue-600/40'
    },
    {
      id: categoryMapping.forms || 'forms',
      name: 'แบบฟอร์มต่างๆ',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-cyan-500/40 to-cyan-600/40'
    }
  ];

  return (
    <div className="mt-20">
      
      <div className="grid md:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/25 hover:border-white/40 transition-all duration-300 group hover:shadow-2xl transform hover:scale-105 cursor-pointer"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              {category.icon}
            </div>
            <h3 className="text-white noto-sans-thai-semibold text-2xl mb-4 group-hover:text-pink-300 transition-colors">
              {category.name}
            </h3>
            <div className="mt-4 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}