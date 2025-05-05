import userModel from '../models/userModel.js';

// Get a single user's data
export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.userId });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      userData: {
        userId: user.userId,
        name: user.fullName,
        nic: user.nic,
        dob: user.dob,
        address: user.address,
        phoneNo: user.phone,
        gender: user.gender,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get all users' data
export const getAllUsersData = async (req, res) => {
  try {
    const users = await userModel.find({});

    if (!users || users.length === 0) {
      return res.json({ success: false, message: 'No users found' });
    }

    const usersData = users.map((user) => ({
      userId: user.userId,
      name: user.fullName,
      nic: user.nic,
      dob: user.dob,
      address: user.address,
      phoneNo: user.phone,
      gender: user.gender,
      email: user.email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
    }));

    res.json({
      success: true,
      usersData: usersData,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Update user data
export const updateUser = async (req, res) => {
  try {
    const { userId, updates } = req.body; // Use req.body instead of req.query

    if (!userId || !updates) {
      return res.json({ success: false, message: "Invalid request parameters" });
    }

    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    // Update user fields
    if (updates.name) user.fullName = updates.name;
    if (updates.email) user.email = updates.email;
    if (updates.role) user.role = updates.role;
    if (updates.status) user.status = updates.status;

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      updatedUser: {
        name: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body; // Use req.query for GET requests

    // Find and delete the user by userId
    const user = await userModel.findOneAndDelete({ userId });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      deletedUser: {
        name: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getAllEmployeeData = async (req, res) => {
  try {
    // Fetch only employees (Doctor, Nurse, Caregiver, Admin)
    const employees = await userModel.find({
      role: { $in: ["Doctor", "Nurse", "Caregiver", "Admin"] },
    });

    if (!employees || employees.length === 0) {
      return res.status(404).json({ success: false, message: "No employees found" });
    }

    const employeeData = employees.map((employee) => ({
      userId: employee.userId,
      name: employee.fullName,
      nic: employee.nic,
      dob: employee.dob,
      address: employee.address,
      phoneNo: employee.phoneNo,
      gender: employee.gender,
      email: employee.email,
      role: employee.role,
      status: employee.status,
      isVerified: employee.isVerified,
      isAdmin: employee.isAdmin,
    }));

    res.status(200).json({
      success: true,
      employees: employeeData,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get users by role/category
export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ success: false, message: "User role is required" });
    }

    const users = await userModel.find({ role });

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: `No users found for role: ${role}` });
    }

    const userData = users.map((user) => ({
      userId: user.userId,
      name: user.fullName,
      nic: user.nic,
      dob: user.dob,
      address: user.address,
      phoneNo: user.phoneNo,
      gender: user.gender,
      email: user.email,
      role: user.role,
      status: user.status,
      isVerified: user.isVerified,
      isAdmin: user.isAdmin,
    }));

    return res.status(200).json({ success: true, users: userData });
  } catch (error) {
    console.error("Error fetching users by role:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
