import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import mockCourses from '@/data/mockCourses';
import mockUsers from '@/data/mockUsers';
import CourseForm from './CourseForm';

export default function Courses() {
  const [courses, setCourses] = useState(mockCourses);
  const [users] = useState(mockUsers);
  const [form, setForm] = useState(null);

  const handleDelete = (id) => {
    const filtered = courses.filter(course => course.id !== id);
    setCourses(filtered);
    setForm(null);
  };

  const handleSubmit = (data) => {
    if (form?.id) {
      // Edit mode
      const updated = courses.map(course => course.id === form.id ? { ...form, ...data } : course);
      setCourses(updated);
    } else {
      // Add mode
      const newCourse = { ...data, id: Date.now().toString() };
      setCourses([...courses, newCourse]);
    }
    setForm(null);
  };

  const courseEnrollments = courses.map(course => {
    const count = users.filter(user => user.enrolledCourses?.includes(course.id)).length;
    return { ...course, enrolledUsers: count };
  });

  return (
    <>
      <div className="min-h-screen w-full overflow-x-auto px-4 py-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          <button
            onClick={() => setForm({})}
            className="bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Plus size={18} /> Add Course
          </button>
        </header>

        <table className="w-full border-2 rounded-xl bg-white dark:bg-black overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-pink-300 via-sky-300 to-gray-400 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
              <th className="p-3">Enrolled</th>
              <th className="p-3 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseEnrollments.map(c => (
              <tr key={c.id} className="border-b bg-gray-100 hover:bg-gray-200">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">{c.description}</td>
                <td className="p-3">{c.enrolledUsers}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => setForm(c)} title="Edit">
                    <Pencil size={16} className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} title="Delete">
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form !== null && (
        <CourseForm
          initial={form}
          onCancel={() => setForm(null)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
