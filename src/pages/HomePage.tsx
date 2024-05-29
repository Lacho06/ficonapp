import {
  ROUTE_PAYROLL_URL,
  ROUTE_PRE_PAYROLL_URL,
} from "../constants/routes/routes";

import CardHome from "../components/CardHome";
import { useLogin } from "../hooks/useLogin";

const HomePage = () => {
  const { user } = useLogin();

  return (
    <>
      <div className="flex my-5">
        <main className="grid grid-cols-12 gap-4 mx-auto">
          {user && user.role === "rec. humanos" ? (
            <CardHome
              url={ROUTE_PRE_PAYROLL_URL}
              name="Pren&oacute;mina"
              icon="../../src/assets/icons/payroll-white.svg"
              bgIcon="../../src/assets/icons/payroll.svg"
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
            />
          ) : (
            <CardHome
              url={ROUTE_PAYROLL_URL}
              name="N&oacute;mina"
              icon="../../src/assets/icons/payroll-white.svg"
              bgIcon="../../src/assets/icons/payroll.svg"
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
            />
          )}
          <CardHome
            url={""}
            name="Inventario"
            icon="../../src/assets/icons/inventory-white.svg"
            bgIcon="../../src/assets/icons/inventory.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
          <CardHome
            url={""}
            name="Activo fijo"
            icon="../../src/assets/icons/fixed-asset-white.svg"
            bgIcon="../../src/assets/icons/fixed-asset.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
          <CardHome
            url={""}
            name="Finanza"
            icon="../../src/assets/icons/finance-white.svg"
            bgIcon="../../src/assets/icons/finance.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
          <CardHome
            url={""}
            name="Caja y banco"
            icon="../../src/assets/icons/bank-white.svg"
            bgIcon="../../src/assets/icons/bank.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
          <CardHome
            url={""}
            name="Costo"
            icon="../../src/assets/icons/cost-white.svg"
            bgIcon="../../src/assets/icons/cost.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
          <CardHome
            url={""}
            name="Contabilidad general"
            icon="../../src/assets/icons/accounting-white.svg"
            bgIcon="../../src/assets/icons/accounting.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
          <CardHome
            url={""}
            name="Facturaci&oacute;n"
            icon="../../src/assets/icons/billing-white.svg"
            bgIcon="../../src/assets/icons/billing.svg"
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
          />
        </main>
      </div>
    </>
  );
};

export default HomePage;
