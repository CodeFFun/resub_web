import Link from "next/link"

interface User {
  _id: string
  email: string
  username: string
  role: string
}

interface UserTableProps {
  users: User[]
}

export default function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link
                  href={`/admin/home/${user._id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Visit Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
