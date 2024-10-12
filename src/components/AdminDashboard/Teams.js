import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import Modal from 'react-modal';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

Modal.setAppElement('#root'); // Set root element for accessibility

// Validation schema using Yup
const teamSchema = yup.object().shape({
  name: yup.string().required('Team name is required'),
  employees: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Employee name is required'),
    })
  ),
});

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(teamSchema),
    defaultValues: {
      employees: [{ name: '' }], // Default empty employee array
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees',
  });

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, 'teams'));
      setTeams(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchTeams();
  }, []);

  const openModal = (teamData = null) => {
    if (teamData) {
      setEditId(teamData.id);
      reset({
        name: teamData.name,
        employees: teamData.employees || [{ name: '' }],
      });
    } else {
      reset({
        name: '',
        employees: [{ name: '' }],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const onSubmit = async (data) => {
    if (editId) {
      const teamDoc = doc(db, 'teams', editId);
      await updateDoc(teamDoc, data);
    } else {
      await addDoc(collection(db, 'teams'), data);
    }
    const querySnapshot = await getDocs(collection(db, 'teams'));
    setTeams(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    closeModal();
  };

  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      const teamDoc = doc(db, 'teams', id);
      await deleteDoc(teamDoc);
      const querySnapshot = await getDocs(collection(db, 'teams'));
      setTeams(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Teams</h2>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        Add New Team
      </button>
      <table className="table-auto w-full bg-white shadow-md">
        <thead>
          <tr>
            <th className="border px-4 py-2">Team Name</th>
            <th className="border px-4 py-2">Employees</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td className="border px-4 py-2">{team.name}</td>
              <td className="border px-4 py-2">
                {team.employees.map((emp, index) => (
                  <div key={index}>{emp.name}</div>
                ))}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openModal(team)}
                  className="bg-yellow-500 text-white px-4 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(team.id)}
                  className="bg-red-500 text-white px-4 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Team */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Team Form"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-lg">
          <h2 className="text-xl mb-4">
            {editId ? 'Edit Team' : 'Add New Team'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Team Name</label>
              <input
                {...register('name')}
                className="border p-2 w-full"
                placeholder="Team Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Employees</label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center mb-2">
                  <input
                    {...register(`employees.${index}.name`)}
                    className="border p-2 w-full"
                    placeholder="Employee Name"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white px-2 ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ name: '' })}
                className="bg-green-500 text-white px-4 py-2 mt-2"
              >
                Add Employee
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="bg-gray-300 text-black px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
