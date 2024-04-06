import { Breadcrumb, Card } from "flowbite-react"
import { Link, useParams } from "react-router-dom"
import { ROUTE_HOME_URL, ROUTE_WORKERS_URL } from "../../constants/routes/routes"
import { useEffect, useState } from "react"

import { GET_WORKER_DETAILS } from "../../constants/endpoints/worker"
import { HiHome } from 'react-icons/hi';
import { ROUTE_WORKER_DETAILS_PREFIX } from './../../constants/routes/routes';
import { WorkerDetails } from "../../constants/types/worker"
import axios from "axios"

const WorkerDetailsPage = () => {
    const {code} = useParams()
    const [worker, setWorker] = useState<WorkerDetails>()

    useEffect(() => {
        // llamada a la api
        axios.get(`${GET_WORKER_DETAILS}/${code}`).then(({data}) => setWorker(data))
    }, [])

    return (
        <div className="overflow-x-auto">
            <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
                <Breadcrumb className="mx-4">
                    <Breadcrumb.Item icon={HiHome}>
                        <Link to={ROUTE_HOME_URL}>Inicio</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={ROUTE_WORKERS_URL}>Trabajadores</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={`${ROUTE_WORKER_DETAILS_PREFIX}/${code}`}>{worker?.name}</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Card className="max-w-sm flex flex-col">
                <h5 className="mx-auto text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Datos del trabajador</h5>
                <hr className="mb-4" />
                <div className="flex justify-between items-end">
                    <span className="font-bold text-xl mx-2">Nombre:</span>
                    <p className="text-gray-800 dark:text-white text-xl">{worker?.name}</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className="font-bold text-xl mx-2">Categoría:</span>
                    <p className="text-gray-800 dark:text-white text-xl">{worker?.category}</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className="font-bold text-xl mx-2">CI:</span>
                    <p className="text-gray-800 dark:text-white text-xl">{worker?.ci}</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className="font-bold text-xl mx-2">Cargo:</span>
                    <p className="text-gray-800 dark:text-white text-xl">{worker?.occupation}</p>
                </div>
                <div className="flex justify-between items-end">
                    <span className="font-bold text-xl mx-2">Salario:</span>
                    <p className="text-gray-800 dark:text-white text-xl">${worker?.salary} CUP</p>
                </div>
            </Card>
        </div>
    )
}

export default WorkerDetailsPage