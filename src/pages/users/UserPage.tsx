import {
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  FileInput,
  Label,
  Modal,
  Select,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import {
  DELETE_USER,
  GET_LIST_USERS,
  POST_CREATE_USER,
  PUT_UPDATE_USER,
} from "../../constants/endpoints/user";
import { HiHome, HiPlus } from "react-icons/hi";
import { NewUser, User } from "../../constants/types/user";
import { ROUTE_HOME_URL, ROUTE_USERS_URL } from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const initialNewUser: NewUser = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

type ErrorUserFields = {
  name: string;
  email: string;
  password: string;
};

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userSelected, setUserSelected] = useState<User>();
  const [newUser, setNewUser] = useState<NewUser>(initialNewUser);
  const [error, setError] = useState<ErrorUserFields>({
    name: "",
    email: "",
    password: "",
  });

  useMiddleware("admin");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_USERS).then(({ data }) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEdit = (user: User) => {
    setUserSelected(user);
    setOpenModalEdit(true);
  };

  const handleDelete = (user: User) => {
    setUserSelected(user);
    setOpenModalDelete(true);
  };

  const closeModalAdd = () => {
    setOpenModalAdd(false);
  };

  const closeModalEdit = () => {
    setOpenModalEdit(false);
  };

  const closeModalDelete = () => {
    setOpenModalDelete(false);
  };

  const createNewUser = () => {
    // validar los datos
    let newError = {
      name: "",
      email: "",
      password: "",
    };

    if (newUser.name.trim() === "") {
      newError = {
        ...newError,
        name: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        name: "",
      };
      setError(newError);
    }

    if (newUser.email.trim() === "") {
      newError = {
        ...newError,
        email: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      newUser.email.trim() !== "" &&
      (!newUser.email.trim().includes("@") ||
        !newUser.email.trim().includes("."))
    ) {
      newError = {
        ...newError,
        email: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        email: "",
      };
      setError(newError);
    }

    if (newUser.password.trim() === "") {
      newError = {
        ...newError,
        password: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      newUser.password.trim() !== "" &&
      newUser.password.trim().length < 8
    ) {
      newError = {
        ...newError,
        password: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        password: "",
      };
      setError(newError);
    }

    if (
      newError.name === "" &&
      newError.email === "" &&
      newError.password === ""
    ) {
      // llamada a la api para guardar la info
      axios.post(POST_CREATE_USER, newUser).then(({ data }) => {
        const newId = data.id;
        setUsers([...users, { id: newId, ...newUser }]);
        setNewUser(initialNewUser);
      });
      closeModalAdd();
    }
  };

  const editUser = () => {
    if (!userSelected) return;
    // validar los datos
    let newError = {
      name: "",
      email: "",
      password: "",
    };
    if (userSelected.name.trim() === "") {
      newError = {
        ...newError,
        name: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        name: "",
      };
      setError(newError);
    }

    if (userSelected.email.trim() === "") {
      newError = {
        ...newError,
        email: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      userSelected.email.trim() !== "" &&
      (!userSelected.email.trim().includes("@") ||
        !userSelected.email.trim().includes("."))
    ) {
      newError = {
        ...newError,
        email: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        email: "",
      };
      setError(newError);
    }

    if (userSelected.password.trim() === "") {
      newError = {
        ...newError,
        password: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      userSelected.password.trim() !== "" &&
      userSelected.password.trim().length < 8
    ) {
      newError = {
        ...newError,
        password: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        password: "",
      };
      setError(newError);
    }

    if (
      newError.name === "" &&
      newError.email === "" &&
      newError.password === ""
    ) {
      // llamada a la api para modificar los datos
      axios.put(`${PUT_UPDATE_USER}/${userSelected.id}`, userSelected);
      const usersFiltered = users.filter((user) => user.id !== userSelected.id);
      const sortedUsers = [...usersFiltered, userSelected].sort(
        (a: User, b: User) => a.id - b.id
      );
      setUsers(sortedUsers);
      setUserSelected(undefined);
      closeModalEdit();
    }
  };

  const deleteUser = () => {
    if (!userSelected) return;
    // llamada a la api para eliminar el usuario
    axios.delete(`${DELETE_USER}/${userSelected.id}`);
    const usersFiltered = users.filter((user) => user.id !== userSelected.id);
    setUsers(usersFiltered);
    setUserSelected(undefined);
    closeModalDelete();
  };

  const customTheme: CustomFlowbiteTheme["table"] = {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
      wrapper: "relative",
    },
    head: {
      base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
      cell: {
        base: "bg-accent-700 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
      },
    },
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
          <Breadcrumb className="mx-4">
            <Breadcrumb.Item icon={HiHome}>
              <Link to={ROUTE_HOME_URL}>Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTE_USERS_URL}>Usuarios</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hidden md:block">
            <Button
              color="success"
              size="xs"
              onClick={() => setOpenModalAdd(true)}
            >
              Agregar usuario
            </Button>
          </div>
          <div className="md:hidden">
            <HiPlus onClick={() => setOpenModalAdd(true)} />
          </div>
        </div>
        {loading ? (
          <div className="flex w-full justify-center py-5">
            <Spinner color="warning" aria-label="Cargando..." size="lg" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table theme={customTheme}>
              <Table.Head>
                <Table.HeadCell className="text-center">ID</Table.HeadCell>
                <Table.HeadCell className="text-center">Nombre</Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Correo electrónico
                </Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Acciones
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.length > 0 ? (
                  users.map((user, i) => {
                    return (
                      <Table.Row
                        key={i}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                          {user.id}
                        </Table.Cell>
                        <Table.Cell className="text-center font-medium">
                          {user.name}
                        </Table.Cell>
                        <Table.Cell className="text-center">
                          {user.email}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleEdit(user)}
                              className="font-medium text-yellow-300 dark:text-yellow-400"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(user)}
                              className="font-medium text-red-600 dark:text-cyan-500"
                            >
                              Eliminar
                            </button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="text-center bg-gray-50" colSpan={4}>
                      No hay usuarios disponibles
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>

      {/* Modal agregar */}
      <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Agregar nuevo usuario
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="name"
                name="name"
                placeholder="usuario1"
                value={newUser && newUser.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, [e.target.name]: e.target.value })
                }
                color={
                  newUser.name === "" && error.name === ""
                    ? "warning"
                    : error.name !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.name !== "" && (
                    <>
                      <span className="font-medium">{error.name}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Correo electrónico" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="email"
                name="email"
                placeholder="nombre@empresa.com"
                value={newUser && newUser.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, [e.target.name]: e.target.value })
                }
                color={
                  newUser.email === "" && error.email === ""
                    ? "warning"
                    : error.email !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.email !== "" && (
                    <>
                      <span className="font-medium">{error.email}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="password"
                name="password"
                placeholder="********"
                value={newUser && newUser.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, [e.target.name]: e.target.value })
                }
                color={
                  newUser.password === "" && error.password === ""
                    ? "warning"
                    : error.password !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.password !== "" && (
                    <>
                      <span className="font-medium">{error.password}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Rol" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="role"
                name="role"
                value={newUser.role}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewUser({ ...newUser, [e.target.name]: e.target.value })
                }
              >
                <option value="user" defaultChecked>
                  User
                </option>
                <option value="economia">Economía</option>
                <option value="rec. humanos">Rec. Humanos</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="image" value="Foto de perfil" />
              </div>
              <FileInput
                id="image"
                name="image"
                color="info"
                value={(newUser && newUser.image) || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewUser({ ...newUser, [e.target.name]: e.target.value })
                }
                helperText="Inserte una imagen para su perfil"
              />
            </div>
            <div className="w-full">
              <Button className="px-4" onClick={createNewUser} color="success">
                Agregar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal editar */}
      <Modal show={openModalEdit} size="md" onClose={closeModalEdit} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Editar impuesto usuario {userSelected && userSelected.name}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="name"
                name="name"
                placeholder="usuario1"
                value={userSelected && userSelected.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userSelected &&
                  setUserSelected({
                    ...userSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  userSelected && userSelected.name === "" && error.name === ""
                    ? "warning"
                    : error.name !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.name !== "" && (
                    <>
                      <span className="font-medium">{error.name}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Correo electrónico" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="email"
                name="email"
                placeholder="nombre@empresa.com"
                value={userSelected && userSelected.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userSelected &&
                  setUserSelected({
                    ...userSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  userSelected &&
                  userSelected.email === "" &&
                  error.email === ""
                    ? "warning"
                    : error.email !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.email !== "" && (
                    <>
                      <span className="font-medium">{error.email}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={userSelected && userSelected.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userSelected &&
                  setUserSelected({
                    ...userSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  userSelected &&
                  userSelected.password === "" &&
                  error.password === ""
                    ? "warning"
                    : error.password !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.password !== "" && (
                    <>
                      <span className="font-medium">{error.password}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Rol" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="role"
                name="role"
                value={userSelected && userSelected.role}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  userSelected &&
                  setUserSelected({
                    ...userSelected,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="user">User</option>
                <option value="economia">Economía</option>
                <option value="rec. humanos">Rec. Humanos</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="image" value="Foto de perfil" />
              </div>
              <FileInput
                id="image"
                name="image"
                color="info"
                helperText="Inserte una imagen para su perfil"
                value={(userSelected && userSelected.image) || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userSelected &&
                  setUserSelected({
                    ...userSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="w-full">
              <Button className="px-4" color="warning" onClick={editUser}>
                Editar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */}
      <Modal show={openModalDelete} size="md" onClose={closeModalDelete} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro de eliminar al usuario{" "}
              {userSelected && userSelected.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteUser}>
                Sí, estoy seguro
              </Button>
              <Button color="gray" onClick={closeModalDelete}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserPage;
