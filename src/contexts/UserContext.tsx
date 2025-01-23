import { FC, useState, useEffect, createContext, useMemo } from 'react';
import { User } from '../models/user';
import { createUser, getAllUsers, updateUser, deleteUser, generatePdf } from '../utils/http';
import { generatePassword } from '../utils';
type UserContext = {
  users: User[];
  userId?: number;
  setUserId: (userId: number) => void;
  selectedUser?: User;
  modalOpened: boolean;
  setModalOpened: (open: boolean) => void;
  deleteModalOpened: boolean;
  setDeleteModalOpened: (open: boolean) => void;
  viewModalOpened: boolean;
  setViewModalOpened: (open: boolean) => void;
  handleSubmit: (user: Partial<User>) => void;
  handleDelete: () => void;
  fetchPdf: (userId: number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserContext = createContext<UserContext>(
  {} as UserContext
);

export const UserProvider: FC = ({ children }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState<User[]>([]);
  const selectedUser = useMemo(() => {
    if (!userId) return null;
    return users?.find((user) => user.id === userId);
  }, [users, userId]);
  const refreshUsers = () => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.data.items);
      } catch (err) {
        console.error('fetching users error', err.response.data);
      }
    };
    fetchData().then();
  }
  useEffect(() => {
    refreshUsers();
    return () => {
      setUsers([]);
    }
  }, []);
  const handleDelete = async () => {
    try {
      if (userId) {
        await deleteUser(userId);
        refreshUsers();
        setDeleteModalOpened(false);
        setUserId(null);
      }
    } catch (err) {
      console.error('delete', err.response.data);
    }
    setUserId(null);
  };
  const handleSubmit = async (user: User) => {
    try {
      if (userId) {
        const updatedUser = { ...user };
        await updateUser(userId, updatedUser);
      } else {
        const newUser = { ...user, password: generatePassword() };
        await createUser(newUser);
      }
      refreshUsers();
      setModalOpened(false);
      setUserId(null);
    } catch (err) {
      console.error('create/update user error', err.response.data);
    }
  };

  const savePdf = (pdfBytes) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf'; // Specify the filename for the download
    link.click();
    URL.revokeObjectURL(url);
  };

  const fetchPdf = async (userId: number) => {
    try {
      const pdfBytes = await generatePdf(userId);
      savePdf(new Uint8Array(pdfBytes));
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const value = {
    users,
    userId,
    setUserId,
    selectedUser,
    modalOpened,
    setModalOpened,
    deleteModalOpened,
    setDeleteModalOpened,
    viewModalOpened,
    setViewModalOpened,
    handleSubmit,
    handleDelete,
    fetchPdf,
  };

  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
};
