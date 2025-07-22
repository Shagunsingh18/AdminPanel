import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from '@/api/axios.jsx';
import UserForm from './UserForm.jsx';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


/* ---------- Data helpers ---------- */
const fetchUsers = () => axios.get('/users').then((r) => r.data);
const createUser = (payload) => axios.post('/users', payload).then((r) => r.data);
const updateUser = ({ id, ...payload }) => axios.put(`/users/${id}`, payload).then((r) => r.data);
const deleteUser = (id) => axios.delete(`/users/${id}`);

/* ---------- Main component ---------- */
export default function Users() {
  const qc = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [form, setForm] = useState(null); // null = closed

  const {
    data: users = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ['users'] }).then(() => setForm(null));

  const addMut = useMutation({ mutationFn: createUser, onSuccess: invalidate });
  const editMut = useMutation({ mutationFn: updateUser, onSuccess: invalidate });
  const delMut = useMutation({ mutationFn: deleteUser, onSuccess: invalidate });

  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase())
);

  // ✅ Safe UI conditions
  if (isPending) return <p>Loading…</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <div className='h-screen'>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4" >
  <h2 className="text-xl text-gray-800 font-semibold">Users</h2>
  <div className="flex items-center gap-2 w-full md:w-auto">
    <input
      type="text"
      className="border border-white px-4 py-2 rounded-md w-full md:w-64 bg-gray-400 text-white placeholder-white"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button
      className="bg-gray-400 border border-white text-white px-4 py-2 rounded-md flex items-center gap-1"
      onClick={() => setForm({})}
    >
      <Plus size={18} /> Add User
    </button>
  </div>
</header>


      <table className="w-full border-2 rounded-xl overflow-hidden">
        <thead>
          <tr className="text-left bg-gradient-to-r from-pink-300 via-amber-100 to-gray-400">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3 w-28">Actions</th>
          </tr>
        </thead>
        <tbody >
          {filteredUsers.map((u) => (
            <tr key={u.id} className="border-b bg-white  hover:bg-gray-100" >
              <td className="p-3 ">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3 flex gap-2">
  <button
    onClick={() => navigate(`/users/${u.id}`)}
    className="text-blue-600 font-medium hover:underline"
    title="View Profile"
  >
    View
  </button>
  <button
    onClick={() => setForm(u)}
    className="text-blue-600 hover:underline"
    title="Edit"
  >
    <Pencil size={16} />
  </button>
  <button
    onClick={() => delMut.mutate(u.id)}
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
        <UserForm
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
