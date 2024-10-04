import PrivateRoute from "@/src/utils/privateRoute";


const AdminDashboard = () => {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div>
        <h1>Admin Dashboard</h1>
        {/* Admin dashboard content */}
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboard;
