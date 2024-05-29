import {
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import {
  DELETE_TAX,
  GET_LIST_TAXS,
  POST_CREATE_TAX,
  PUT_UPDATE_TAX,
} from "../../constants/endpoints/tax";
import { HiHome, HiOutlineExclamationCircle } from "react-icons/hi";
import { NewTax, Tax } from "../../constants/types/tax";
import { ROUTE_HOME_URL, ROUTE_TAX_URL } from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const initialNewTax: NewTax = {
  type: "seguridad social",
  minValue: -1,
  maxValue: -1,
  percentage: -1,
};

type ErrorTaxFields = {
  type: string;
  minValue: string;
  maxValue: string;
  percentage: string;
};

const TaxPage = () => {
  const [ingTaxs, setIngTaxs] = useState<Tax[]>([]);
  const [segTaxs, setSegTaxs] = useState<Tax[]>([]);
  const [taxSelected, setTaxSelected] = useState<Tax>();
  const [newTax, setNewTax] = useState<NewTax>(initialNewTax);
  const [error, setError] = useState<ErrorTaxFields>({
    type: "",
    minValue: "",
    maxValue: "",
    percentage: "",
  });

  useMiddleware("economia");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_TAXS).then(({ data }) => {
      let taxs: Tax[] = data;
      setSegTaxs(
        taxs
          .filter((tax) => tax.type === "seguridad social")
          .sort((a, b) => a.minValue - b.minValue)
      );
      setIngTaxs(
        taxs
          .filter((tax) => tax.type === "ingresos personales")
          .sort((a, b) => a.minValue - b.minValue)
      );
    });
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEdit = (tax: Tax) => {
    setTaxSelected(tax);
    setOpenModalEdit(true);
  };

  const handleDelete = (tax: Tax) => {
    setTaxSelected(tax);
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

  const createNewTax = () => {
    // validar los datos
    let newError = {
      type: "",
      minValue: "",
      maxValue: "",
      percentage: "",
    };

    if (newTax.type.trim() === "") {
      newError = {
        ...newError,
        type: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      newTax.type.trim() !== "ingresos personales" &&
      newTax.type.trim() !== "seguridad social"
    ) {
      newError = {
        ...newError,
        type: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        type: "",
      };
      setError(newError);
    }

    if (Number.parseInt(newTax.minValue.toString()) === -1) {
      newError = {
        ...newError,
        minValue: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (Number.parseInt(newTax.minValue.toString()) < -1) {
      newError = {
        ...newError,
        minValue: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        minValue: "",
      };
      setError(newError);
    }

    if (Number.parseInt(newTax.maxValue.toString()) === -1) {
      newError = {
        ...newError,
        maxValue: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (Number.parseInt(newTax.maxValue.toString()) <= -1) {
      newError = {
        ...newError,
        maxValue: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        maxValue: "",
      };
      setError(newError);
    }

    if (Number.parseInt(newTax.percentage.toString()) === -1) {
      newError = {
        ...newError,
        percentage: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (Number.parseInt(newTax.percentage.toString()) <= -1) {
      newError = {
        ...newError,
        percentage: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        percentage: "",
      };
      setError(newError);
    }

    if (
      newError.type === "" &&
      newError.minValue === "" &&
      newError.maxValue === "" &&
      newError.percentage === ""
    ) {
      if (newTax.type === "ingresos personales") {
        // llamada a la api para obtener un id disponible
        axios.post(POST_CREATE_TAX, newTax).then(({ data }) => {
          const newId = data.id;
          const sorted = [...ingTaxs, { id: newId, ...newTax }].sort(
            (a: Tax, b: Tax) => a.minValue - b.minValue
          );
          setIngTaxs(sorted);
        });
      }

      if (newTax.type === "seguridad social") {
        // llamada a la api para obtener un id disponible
        axios.post(POST_CREATE_TAX, newTax).then(({ data }) => {
          const newId = data.id;
          const sorted = [...segTaxs, { id: newId, ...newTax }].sort(
            (a: Tax, b: Tax) => a.minValue - b.minValue
          );
          setSegTaxs(sorted);
        });
      }

      setNewTax(initialNewTax);
      closeModalAdd();
    }
  };

  const editTax = () => {
    if (!taxSelected) return;
    // validar los datos
    let newError = {
      type: "",
      minValue: "",
      maxValue: "",
      percentage: "",
    };

    if (taxSelected.type.trim() === "") {
      newError = {
        ...newError,
        type: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      taxSelected.type.trim() !== "ingresos personales" &&
      taxSelected.type.trim() !== "seguridad social"
    ) {
      newError = {
        ...newError,
        type: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        type: "",
      };
      setError(newError);
    }

    if (Number.parseInt(taxSelected.minValue.toString()) === -1) {
      newError = {
        ...newError,
        minValue: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (Number.parseInt(taxSelected.minValue.toString()) < -1) {
      newError = {
        ...newError,
        minValue: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        minValue: "",
      };
      setError(newError);
    }

    if (Number.parseInt(taxSelected.maxValue.toString()) === -1) {
      newError = {
        ...newError,
        maxValue: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (Number.parseInt(taxSelected.maxValue.toString()) <= -1) {
      newError = {
        ...newError,
        maxValue: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        maxValue: "",
      };
      setError(newError);
    }

    if (Number.parseInt(taxSelected.percentage.toString()) === -1) {
      newError = {
        ...newError,
        percentage: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (Number.parseInt(taxSelected.percentage.toString()) <= -1) {
      newError = {
        ...newError,
        percentage: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        percentage: "",
      };
      setError(newError);
    }

    if (
      newError.type === "" &&
      newError.minValue === "" &&
      newError.maxValue === "" &&
      newError.percentage === ""
    ) {
      // llamada a la api para modificar los datos
      axios.put(`${PUT_UPDATE_TAX}/${taxSelected.id}`, taxSelected);
      if (taxSelected.type === "ingresos personales") {
        const taxsFiltered = ingTaxs.filter(
          (ingTax) => ingTax.id !== taxSelected.id
        );
        const sortedTaxs = [...taxsFiltered, taxSelected].sort(
          (a: Tax, b: Tax) => a.minValue - b.minValue
        );
        setIngTaxs(sortedTaxs);
      }

      if (taxSelected.type === "seguridad social") {
        const taxsFiltered = segTaxs.filter(
          (segTax) => segTax.id !== taxSelected.id
        );
        const sortedTaxs = [...taxsFiltered, taxSelected].sort(
          (a: Tax, b: Tax) => a.minValue - b.minValue
        );
        setSegTaxs(sortedTaxs);
      }
      setTaxSelected(undefined);
      closeModalEdit();
    }
  };

  const deleteTax = () => {
    if (!taxSelected) return;

    // llamada a la api para eliminar el impuesto
    axios.delete(`${DELETE_TAX}/${taxSelected.id}`);
    if (taxSelected.type === "ingresos personales") {
      const taxsFiltered = ingTaxs.filter(
        (ingTax) => ingTax.id !== taxSelected.id
      );
      setIngTaxs(taxsFiltered);
    }
    if (taxSelected.type === "seguridad social") {
      const taxsFiltered = segTaxs.filter(
        (segTax) => segTax.id !== taxSelected.id
      );
      setSegTaxs(taxsFiltered);
    }

    setTaxSelected(undefined);
    closeModalDelete();
  };

  const customTheme: CustomFlowbiteTheme["table"] = {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      shadow:
        "absolute left-0 top-0 -z-10 w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
      wrapper: "relative w-full",
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
              <Link to={ROUTE_TAX_URL}>Impuestos</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button
            color="success"
            size="xs"
            onClick={() => setOpenModalAdd(true)}
          >
            Agregar impuesto
          </Button>
        </div>
        <div className="flex gap-8 w-full justify-between">
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell colSpan={3} className="text-center">
                Impuestos sobre seguridad social
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell className="text-center">Rango</Table.HeadCell>
              <Table.HeadCell className="text-center">Porciento</Table.HeadCell>
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {segTaxs.length > 0 ? (
                segTaxs.map((segTax, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="text-center font-medium">
                        {segTax.minValue} - {segTax.maxValue}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {segTax.percentage}
                      </Table.Cell>
                      <Table.Cell className="flex justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleEdit(segTax)}
                          className="font-medium text-yellow-300 dark:text-yellow-400"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(segTax)}
                          className="font-medium text-red-600 dark:text-cyan-500"
                        >
                          Eliminar
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center bg-gray-50" colSpan={3}>
                    No hay impuestos disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell colSpan={3} className="text-center">
                Impuestos sobre ingresos personales
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell className="text-center">Rango</Table.HeadCell>
              <Table.HeadCell className="text-center">Porciento</Table.HeadCell>
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {ingTaxs.length > 0 ? (
                ingTaxs.map((ingTax, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="text-center font-medium">
                        {ingTax.minValue} - {ingTax.maxValue}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {ingTax.percentage}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(ingTax)}
                            className="font-medium text-yellow-300 dark:text-yellow-400"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(ingTax)}
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
                  <Table.Cell className="text-center bg-gray-50" colSpan={3}>
                    No hay impuestos disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>

      {/* Modal agregar */}
      <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Agregar nuevo impuesto
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Tipo" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="type"
                name="type"
                required
                value={newTax.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewTax({ ...newTax, [e.target.name]: e.target.value })
                }
              >
                <option value="" disabled>
                  Seleccione un tipo de impuesto
                </option>
                <option value="seguridad social">Seguridad social</option>
                <option value="ingresos personales">Ingresos personales</option>
              </Select>
            </div>
            <div className="flex gap-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="minValue" value="Valor mínimo" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="minValue"
                  name="minValue"
                  type="number"
                  min="0"
                  placeholder="1"
                  value={newTax && newTax.minValue > -1 ? newTax.minValue : 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTax({ ...newTax, [e.target.name]: e.target.value })
                  }
                  color={
                    newTax.minValue <= -1 && error.minValue === ""
                      ? "warning"
                      : error.minValue !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.minValue !== "" && (
                      <>
                        <span className="font-medium">{error.minValue}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="maxValue" value="Valor máximo" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="maxValue"
                  name="maxValue"
                  type="number"
                  placeholder="1"
                  value={newTax && newTax.maxValue > -1 ? newTax.maxValue : 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTax({ ...newTax, [e.target.name]: e.target.value })
                  }
                  color={
                    newTax.maxValue <= -1 && error.maxValue === ""
                      ? "warning"
                      : error.maxValue !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.maxValue !== "" && (
                      <>
                        <span className="font-medium">{error.maxValue}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="percentage" value="Porcentaje" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="percentage"
                name="percentage"
                type="number"
                placeholder="0%"
                value={newTax && newTax.percentage > -1 ? newTax.percentage : 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTax({ ...newTax, [e.target.name]: e.target.value })
                }
                color={
                  newTax.percentage <= -1 && error.percentage === ""
                    ? "warning"
                    : error.percentage !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.percentage !== "" && (
                    <>
                      <span className="font-medium">{error.percentage}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div className="w-full">
              <Button className="px-4" onClick={createNewTax} color="success">
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
            Editar impuesto{" "}
            {taxSelected && `${taxSelected.minValue}-${taxSelected.maxValue}`}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Tipo" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="type"
                name="type"
                required
                value={taxSelected && taxSelected.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  taxSelected &&
                  setTaxSelected({
                    ...taxSelected,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Seleccione un tipo de impuesto
                </option>
                <option value="seguridad social">Seguridad social</option>
                <option value="ingresos personales">Ingresos personales</option>
              </Select>
            </div>
            <div className="flex gap-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="minValue" value="Valor mínimo" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="minValue"
                  name="minValue"
                  type="number"
                  min="0"
                  placeholder="1"
                  value={taxSelected && taxSelected.minValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    taxSelected &&
                    setTaxSelected({
                      ...taxSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    taxSelected &&
                    taxSelected.minValue <= -1 &&
                    error.minValue === ""
                      ? "warning"
                      : error.minValue !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.minValue !== "" && (
                      <>
                        <span className="font-medium">{error.minValue}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="maxValue" value="Valor máximo" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="maxValue"
                  name="maxValue"
                  type="number"
                  placeholder="1"
                  value={taxSelected && taxSelected.maxValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    taxSelected &&
                    setTaxSelected({
                      ...taxSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    taxSelected &&
                    taxSelected.maxValue <= -1 &&
                    error.maxValue === ""
                      ? "warning"
                      : error.maxValue !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.maxValue !== "" && (
                      <>
                        <span className="font-medium">{error.maxValue}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="percentage" value="Porcentaje" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="percentage"
                name="percentage"
                type="number"
                placeholder="0%"
                value={taxSelected && taxSelected.percentage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  taxSelected &&
                  setTaxSelected({
                    ...taxSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  taxSelected &&
                  taxSelected.percentage <= -1 &&
                  error.percentage === ""
                    ? "warning"
                    : error.percentage !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.percentage !== "" && (
                    <>
                      <span className="font-medium">{error.percentage}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div className="w-full">
              <Button className="px-4" color="warning" onClick={editTax}>
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
              ¿Estás seguro de eliminar el impuesto{" "}
              {taxSelected &&
                `${taxSelected.minValue} - ${taxSelected.maxValue}`}
              ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteTax}>
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

export default TaxPage;
