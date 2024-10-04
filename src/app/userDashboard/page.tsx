import PrivateRoute from "@/src/utils/privateRoute";

const UserDashboard = () => {
  return (
    <PrivateRoute allowedRoles={['user']}>
      <div>
        <h1>User Dashboard</h1>
        {/* Your user dashboard content */}
      </div>
    </PrivateRoute>
  );
};

export default UserDashboard;
