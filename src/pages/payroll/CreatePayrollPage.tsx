import {
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  Label,
  Select,
  Table,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {
  ROUTE_HOME_URL,
  ROUTE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { GET_LIST_PRE_PAYROLLS } from "../../constants/endpoints/prepayroll";
import { HiHome } from "react-icons/hi";
import { Payroll } from "../../constants/types/payroll";
import { PrePayroll } from "../../constants/types/prepayroll";
import axios from "axios";

const CreatePayrollPage = () => {
  const navigate = useNavigate();
  const [prePayrollSelected, setPrePayrollSelected] = useState<PrePayroll>();
  const [prePayrolls, setPrePayrolls] = useState<PrePayroll[]>();
  const [payroll, setPayroll] = useState<Payroll>();
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    axios.get(GET_LIST_PRE_PAYROLLS).then(({ data }) => {
      setPrePayrolls(data);
    });
  }, []);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const closeModalEdit = () => {
    setOpenModalEdit(false);
  };

  const savePayroll = () => {
    // llamar a la api para guardar los datos
    navigate(ROUTE_PAYROLL_URL);
  };

  const checkPrePayroll = () => {
    // validar los datos
    let newError = {};
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
      <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
        <Breadcrumb className="mx-4">
          <Breadcrumb.Item icon={HiHome}>
            <Link to={ROUTE_HOME_URL}>Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTE_PAYROLL_URL}>Nóminas</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button color="success" size="xs" onClick={savePayroll}>
          Guardar nómina
        </Button>
      </div>
      {showTable ? (
        <div className="overflow-x-auto">
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell colSpan={14} className="text-center">
                Prenómina
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell className="text-center">Código</Table.HeadCell>
              <Table.HeadCell className="text-center">
                CI - Nombres
              </Table.HeadCell>
              <Table.HeadCell className="text-center">H. Trab</Table.HeadCell>
              <Table.HeadCell className="text-center">H.N. Trab</Table.HeadCell>
              <Table.HeadCell className="text-center">Impunt.</Table.HeadCell>
              <Table.HeadCell className="text-center">Días Vac.</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Horas Certif.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Lic.Matern.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Resol.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Interr.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Otro Tpo a Pagar
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Extras
              </Table.HeadCell>
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {payroll && payroll.workers.length > 0 ? (
                payroll.workers.map((payrollWorker, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                        {payrollWorker.worker.code}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.worker.name}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.worker.ci}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.worker.category}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.salaryRate}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.hours}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.toCollect}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.bonus}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.pat}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.earnedSalary}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.salaryTax}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {payrollWorker.withHoldings}
                      </Table.Cell>
                      <Table.Cell className="text-center font-bold">
                        {payrollWorker.paid}
                      </Table.Cell>
                      <Table.Cell>
                        {/* <div className="flex justify-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleEdit(payrollWorker)}
                              className="font-medium text-yellow-300 dark:text-yellow-400"
                            >
                              Editar
                            </button>
                          </div> */}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center bg-gray-50" colSpan={14}>
                    No hay nóminas disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <form className="flex gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="prePayrollId" value="Seleccione la prenómina" />
            </div>
            <Select
              id="prePayrollId"
              name="prePayrollId"
              value={prePayrollSelected && prePayrollSelected.id}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                prePayrollSelected &&
                setPrePayrollSelected({
                  ...prePayrollSelected,
                  month: e.target.value,
                })
              }
              color={errorPrePayroll.month !== "" ? "failure" : "gray"}
              helperText={
                errorPrePayroll.month !== "" && (
                  <>
                    <span className="font-medium">{errorPrePayroll.month}</span>
                  </>
                )
              }
              required
            >
              <option value="">Seleccione un mes</option>
              {prePayrolls &&
                prePayrolls.map((prePayroll, i) => {
                  return (
                    <option key={i} value={prePayroll.id}>
                      {`${prePayroll.month.toUpperCase()} de ${
                        prePayroll.year
                      }`}
                    </option>
                  );
                })}
            </Select>
          </div>
          <Button
            type="submit"
            color="success"
            className="mt-auto"
            disabled={prePayrolls && prePayrolls.length === 0}
            onClick={checkPrePayroll}
          >
            Aceptar
          </Button>
        </form>
      )}
    </>
  );
};

export default CreatePayrollPage;
