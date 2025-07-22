import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios.jsx';

export default function UserDetails() {
  const { id } = useParams();
  const { data: user, isPending, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => axios.get(`/users/${id}`).then((res) => res.data),
  });

  if (isPending) return <p>Loading user details…</p>;
  if (isError) return <p className="text-red-500">Failed to load user.</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">User Profile: {user.name}</h2>
      <div className="bg-gray-200  rounded-lg shadow p-6 space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Enrolled Courses:</strong> {user.courses?.length || 0}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Progress</h3>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
          {(user.courses || []).map((c, i) => (
            <li key={i}>
              {c.title} – {c.progress}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
