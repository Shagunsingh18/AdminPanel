import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from '@/api/axios.jsx';
import { Pencil, Trash2, Plus } from 'lucide-react';
import CourseForm from './CourseForm.jsx';

const fetchCourses = () => axios.get('/courses').then((r) => r.data);
const fetchUsers = () => axios.get('/users').then((r) => r.data);
const createCourse = (data) => axios.post('/courses', data).then((r) => r.data);
const updateCourse = ({ id, ...data }) => axios.put(`/courses/${id}`, data).then((r) => r.data);
const deleteCourse = (id) => axios.delete(`/courses/${id}`);

export default function Courses() {
  const qc = useQueryClient();
  const [form, setForm] = useState(null);

  const { data: courses = [], isPending, isError, error } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ['courses'] }).then(() => setForm(null));

  const addMut = useMutation({ mutationFn: createCourse, onSuccess: invalidate });
  const editMut = useMutation({ mutationFn: updateCourse, onSuccess: invalidate });
  const delMut = useMutation({ mutationFn: deleteCourse, onSuccess: invalidate });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  // Add enrollment count from users' enrolledCourses
  const courseEnrollments = courses.map((course) => {
    const count = users.filter((user) =>
      user.enrolledCourses?.includes(course.id)
    ).length;

    return { ...course, enrolledUsers: count };
  });

  return (
    <>
      <div className='h-screen'>
        <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-800 font-semibold">Courses</h2>
        <button
          className="bg-gray-500 border border-black-500 text-white px-4 py-2 rounded-md flex items-center gap-1"
          onClick={() => setForm({})}
        >
          <Plus size={18} /> Add Course
        </button>
      </header>

      <table className="w-full bg-white border-2 dark:bg-black rounded-xl overflow-hidden">
        <thead>
          <tr className="text-left  bg-gradient-to-r from-pink-300 via-sky-300 to-gray-400">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3">Enrolled</th>
            <th className="p-3 w-28">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseEnrollments.map((c) => (
            <tr key={c.id} className="border-b bg-gray-300 border-gray-100 dark:border-gray-700">
              <td className="p-3">{c.title}</td>
              <td className="p-3">{c.category}</td>
              <td className="p-3">{c.description}</td>
              <td className="p-3">{c.enrolledUsers}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => setForm(c)}
                  className="text-blue-600 hover:underline"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => delMut.mutate(c.id)}
                  className="text-red-600 hover:underline"
                  title="Delete"
                >
                  <Trash2 size={16} />
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
          onSubmit={(data) =>
            form.id
              ? editMut.mutate({ id: form.id, ...data })
              : addMut.mutate(data)
          }
        />
      )}
    </>
  );
}
