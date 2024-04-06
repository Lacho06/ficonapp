import { Breadcrumb, Card, CustomFlowbiteTheme, Table } from "flowbite-react"
import { Link, useParams } from "react-router-dom";
import { ROUTE_HOME_URL, ROUTE_OCCUPATIONS_URL, ROUTE_OCCUPATION_DETAILS_PREFIX, ROUTE_WORKER_DETAILS_PREFIX } from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { GET_OCCUPATION_DETAILS } from "../../constants/endpoints/occupation";
import { HiHome } from 'react-icons/hi';
import { OccupationDetails } from "../../constants/types/occupation";
import axios from "axios";

const OccupationDetailsPage = () => {
    const {id} = useParams()
    const [occupation, setOccupation] = useState<OccupationDetails>()

    useEffect(() => {
        // llamada a la api
        axios.get(`${GET_OCCUPATION_DETAILS}/${id}`).then(({data}) => setOccupation(data))
    }, [])

    const customTheme: CustomFlowbiteTheme['table'] = {
        "root": {
            "base": "w-full text-left text-sm text-gray-500 dark:text-gray-400",
            "shadow": "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
            "wrapper": "relative w-full"
        },
        "head": {
            "base": "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
            "cell": {
              "base": "bg-accent-700 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
            }
        }
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
                <Breadcrumb className="mx-4">
                    <Breadcrumb.Item icon={HiHome}>
                        <Link to={ROUTE_HOME_URL}>Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={ROUTE_OCCUPATIONS_URL}>Cargos</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={`${ROUTE_OCCUPATION_DETAILS_PREFIX}/${id}`}>{occupation?.name}</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className="flex justify-between gap-8">
                <div className="w-full">
                    <Card className="flex flex-col">
                        <h5 className="mx-auto text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Datos del cargo</h5>
                        <hr className="mb-4" />
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-xl mx-2">Nombre:</span>
                            <p className="text-gray-800 dark:text-white text-xl">{occupation?.name}</p>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-xl mx-2">Salario base:</span>
                            <p className="text-gray-800 dark:text-white text-xl">{occupation?.salary}</p>
                        </div>                
                    </Card>
                </div>
                <div className="w-full">
                    <Card className="flex flex-col">
                        <h5 className="mx-auto text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trabajadores con ese cargo</h5>
                        <hr className="mb-4" />
                        <div className="mx-auto overflow-x-auto w-full">
                            <Table theme={customTheme}>
                                <Table.Head>
                                    <Table.HeadCell className="text-center">Código</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Nombre</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Categoría</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        (occupation && occupation?.workers.length > 0) ? (occupation?.workers.map((worker, i) => { 
                                            return <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                                                    {worker.code}
                                                </Table.Cell>
                                                <Table.Cell className="text-center">
                                                    {worker.name}
                                                </Table.Cell>
                                                <Table.Cell className="text-center">
                                                    {worker.category}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex justify-center gap-4">
                                                        <Link to={`${ROUTE_WORKER_DETAILS_PREFIX}/${worker.code}`}>
                                                            <button type="button" className="font-medium text-cyan-600 dark:text-cyan-500">
                                                                Ver detalles
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        })) : (
                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="text-center bg-gray-50" colSpan={4}>No hay trabajadores asociados al cargo</Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </Card>
                </div>
            </div>

            
        </div>
    )
}

export default OccupationDetailsPage