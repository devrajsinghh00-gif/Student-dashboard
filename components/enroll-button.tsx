'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { enrollCourse, unenrollCourse } from '@/lib/enrollmentActions';

interface EnrollButtonProps {
  courseId: string;
  isEnrolled: boolean;
  onEnrollChange: () => void;
}

export function EnrollButton({ courseId, isEnrolled, onEnrollChange }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    setLoading(true);
    setError(null);

    const result = isEnrolled
      ? await unenrollCourse(courseId)
      : await enrollCourse(courseId);

    if (result.success) {
      onEnrollChange();
    } else {
      setError(result.error || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <motion.button
      onClick={handleToggle}
      disabled={loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
        isEnrolled
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-brand-500 text-white hover:bg-brand-600'
      } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {isEnrolled ? (
        <>
          <Check className="h-4 w-4" />
          Enrolled
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          Enroll
        </>
      )}
    </motion.button>
  );
}
