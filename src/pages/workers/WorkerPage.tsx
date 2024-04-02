import { Breadcrumb, Button, CustomFlowbiteTheme, Label, Modal, Select, Table, TextInput } from "flowbite-react"
import { NewWorker, Worker } from "../../constants/types/worker";
import { ROUTE_HOME_URL, ROUTE_WORKERS_URL, ROUTE_WORKER_DETAILS_PREFIX } from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { GET_LIST_WORKERS } from "../../constants/endpoints/worker";
import { HiHome } from 'react-icons/hi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from "react-router-dom";
import axios from "axios";

const initialNewWorker: NewWorker = {
    name: '',
    ci: 0,
    category: 'ingeniero',
}

type ErrorWorkerFields = {
    name: string,
    ci: string,
    category: string,
}

const WorkerPage = () => {
    const [workers, setWorkers] = useState<Worker[]>([])
    const [workerSelected, setWorkerSelected] = useState<Worker>()
    const [newWorker, setNewWorker] = useState<NewWorker>(initialNewWorker)
    const [error, setError] = useState<ErrorWorkerFields>({
        name: '',
        ci: '',
        category: '',
    })

    useEffect(() => {
        // llamada a la api
        axios.get(GET_LIST_WORKERS).then(({data}) => setWorkers(data))
    }, [])

    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const handleEdit = (worker: Worker) => {
        setWorkerSelected(worker)
        setOpenModalEdit(true)
    }

    const handleDelete = (worker: Worker) => {
        setWorkerSelected(worker)
        setOpenModalDelete(true)
    }

    const closeModalAdd = () => {
        setOpenModalAdd(false);
    }

    const closeModalEdit = () => {
        setOpenModalEdit(false);
    }

    const closeModalDelete = () => {
        setOpenModalDelete(false)
    }


    const createNewWorker = () => {
        // validar los datos
        let newError = {
            name: '',
            ci: '',
            category: ''
        }

        if(newWorker.name.trim() === ''){
            newError = {
                ...newError,
                name: ERROR_MESSAGES.EMPTY_FIELD
            }
            setError(newError)
        }else{
            newError = {
                ...newError,
                name: ''
            }
            setError(newError)
        }

        if(newWorker.ci === 0){
            newError = {
                ...newError,
                ci: ERROR_MESSAGES.EMPTY_FIELD
            }
            setError(newError)
        }else if(newWorker.ci.toString().length !== 11 || Number.parseInt(newWorker.ci.toString()).toString().length !== 11){
            newError = {
                ...newError,
                ci: ERROR_MESSAGES.INCORRECT_FIELD
            }
            setError(newError)
        }else{
            newError = {
                ...newError,
                ci: ''
            }
            setError(newError)
        }

        if(newWorker.category.trim() === ''){
            newError = {
                ...newError,
                category: ERROR_MESSAGES.EMPTY_FIELD
            }
            setError(newError)
        }else if(newWorker.category.trim() !== 'ingeniero' && newWorker.category.trim() !== 'master' && newWorker.category.trim() !== 'doctor'){
            newError = {
                ...newError,
                category: ERROR_MESSAGES.INCORRECT_FIELD
            }
            setError(newError)
        }else{
            newError = {
                ...newError,
                category: ''
            }
            setError(newError)
        }


        if(newError.name === '' && newError.ci === '' && newError.category === ''){
            // todo llamada a la api para obtener un id disponible
            const newCode = 100
            setWorkers([...workers, { code: newCode, ...newWorker }])
            setNewWorker(initialNewWorker)
            closeModalAdd()
        }
    }

    const editWorker = () => {
        if(!workerSelected)return
        // validar los datos
        let newError = {
            name: '',
            ci: '',
            category: '',
        }

        if(workerSelected.name.trim() === ''){
            newError = {
                ...newError,
                name: ERROR_MESSAGES.EMPTY_FIELD
            }
            setError(newError)
        }else{
            newError = {
                ...newError,
                name: ''
            }
            setError(newError)
        }
        
        if(workerSelected.ci === 0){
            newError = {
                ...newError,
                ci: ERROR_MESSAGES.EMPTY_FIELD
            }
            setError(newError)
        }else if(workerSelected.ci.toString().length !== 11 || Number.parseInt(workerSelected.ci.toString()).toString().length !== 11){
            newError = {
                ...newError,
                ci: ERROR_MESSAGES.INCORRECT_FIELD
            }
            setError(newError)
        }else{
            newError = {
                ...newError,
                ci: ''
            }
            setError(newError)
        }

        if(workerSelected.category.trim() === ''){
            newError = {
                ...newError,
                category: ERROR_MESSAGES.EMPTY_FIELD
            }
            setError(newError)
        }else if(workerSelected.category.trim() !== 'ingeniero' && workerSelected.category.trim() !== 'master' && workerSelected.category.trim() !== 'doctor'){
            newError = {
                ...newError,
                category: ERROR_MESSAGES.INCORRECT_FIELD
            }
            setError(newError)
        }else{
            newError = {
                ...newError,
                category: ''
            }
            setError(newError)
        }

        if(newError.name === '' && newError.ci === '' && newError.category === ''){
            // todo llamada a la api para modificar los datos
            const workersFiltered = workers.filter(worker => worker.code !== workerSelected.code)
            const sortedWorkers = [...workersFiltered, workerSelected].sort((a: Worker, b: Worker) => a.code - b.code)
            setWorkers(sortedWorkers)
            setWorkerSelected(undefined)
            closeModalEdit()
        }
    }

    const deleteWorker = () => {
        if(!workerSelected)return
        // todo llamada a la api para eliminar el trabajador
        const workerFiltered = workers.filter(worker => worker.code !== workerSelected.code)
        setWorkers(workerFiltered)
        setWorkerSelected(undefined)
        closeModalDelete()
    }

    const customTheme: CustomFlowbiteTheme['table'] = {
        "root": {
            "base": "w-full text-left text-sm text-gray-500 dark:text-gray-400",
            "shadow": "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
            "wrapper": "relative"
        },
        "head": {
            "base": "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
            "cell": {
              "base": "bg-accent-700 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
            }
        }
    }

    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
                    <Breadcrumb className="mx-4">
                        <Breadcrumb.Item icon={HiHome}>
                            <Link to={ROUTE_HOME_URL}>Inicio</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={ROUTE_WORKERS_URL}>Trabajadores</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Button color="success" size='xs' onClick={() => setOpenModalAdd(true)}>Agregar trabajador</Button>
                </div>
                <Table theme={customTheme}>
                    <Table.Head>
                        <Table.HeadCell>Código</Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Categoría</Table.HeadCell>
                        <Table.HeadCell>Acciones</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            (workers.length > 0) ? (workers.map((worker, i) => { 
                                return <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {worker.code}
                                    </Table.Cell>
                                    <Table.Cell className="flex items-center gap-2">
                                        {worker.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {worker.category}
                                    </Table.Cell>
                                    <Table.Cell className="flex gap-4">
                                        <Link to={`${ROUTE_WORKER_DETAILS_PREFIX}/${worker.code}`}>
                                            <button type="button" className="font-medium text-cyan-600 dark:text-cyan-500">
                                                Ver detalles
                                            </button>
                                        </Link>
                                        <button type="button" onClick={() => handleEdit(worker)} className="font-medium text-yellow-300 dark:text-yellow-400">
                                            Editar
                                        </button>
                                        <button type="button" onClick={() => handleDelete(worker)} className="font-medium text-red-600 dark:text-cyan-500">
                                            Eliminar
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            })) : (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="text-center bg-gray-50" colSpan={4}>No hay trabajadores disponibles</Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
            </div>

            {/* Modal agregar */}
            <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Agregar nuevo trabajador</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Nombre" />
                                <span className="text-red-800 mx-1 font-bold">*</span>
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="trabajador1"
                                value={newWorker && newWorker.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWorker({ ...newWorker, [e.target.name]: e.target.value })}
                                color={(newWorker.name === '' && error.name === '') ? 'warning' : (error.name !== '') ? 'failure' : 'gray'}
                                helperText={
                                    error.name !== '' && (
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
                                <Label htmlFor="ci" value="Carnet de identidad" />
                                <span className="text-red-800 mx-1 font-bold">*</span>
                            </div>
                            <TextInput
                                id="ci"
                                type="number"
                                name="ci"
                                placeholder="12345678912"
                                value={(newWorker && newWorker.ci !== 0) ? newWorker.ci : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewWorker({ ...newWorker, [e.target.name]: e.target.value })}
                                color={(newWorker.ci === 0 && error.ci === '') ? 'warning' : (error.ci !== '') ? 'failure' : 'gray'}
                                helperText={
                                    error.ci !== '' && (
                                        <>
                                            <span className="font-medium">{error.ci}</span>
                                        </>
                                    )
                                }
                                required
                                />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Categoría" />
                                <span className="text-red-800 mx-1 font-bold">*</span>
                            </div>
                            <Select id="category" name="category" required onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewWorker({ ...newWorker, [e.target.name]: e.target.value })}>
                                <option value="ingeniero" defaultChecked>Ingeniero</option>
                                <option value="master">Máster</option>
                                <option value="doctor">Doctor</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Button className="px-4" onClick={createNewWorker} color="success">Agregar</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Modal editar */}
            <Modal show={openModalEdit} size="md" onClose={closeModalEdit} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editar trabajador { workerSelected && workerSelected.name }</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Nombre" />
                                <span className="text-red-800 mx-1 font-bold">*</span>
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="trabajador1"
                                value={workerSelected && workerSelected.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => workerSelected && setWorkerSelected({...workerSelected, [e.target.name]: e.target.value})}
                                color={(workerSelected && workerSelected.name === '' && error.name === '') ? 'warning' : (error.name !== '') ? 'failure' : 'gray'}
                                helperText={
                                    error.name !== '' && (
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
                                <Label htmlFor="ci" value="Carnet de identidad" />
                                <span className="text-red-800 mx-1 font-bold">*</span>
                            </div>
                            <TextInput
                                id="ci"
                                name="ci"
                                type="number"
                                placeholder="12345678912"
                                value={(workerSelected && workerSelected.ci !== 0) ? workerSelected.ci : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => workerSelected && setWorkerSelected({...workerSelected, [e.target.name]: e.target.value})}
                                color={(workerSelected && workerSelected.ci === 0 && error.ci === '') ? 'warning' : (error.ci !== '') ? 'failure' : 'gray'}
                                helperText={
                                    error.ci !== '' && (
                                        <>
                                            <span className="font-medium">{error.ci}</span>
                                        </>
                                    )
                                }
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Categoría" />
                                <span className="text-red-800 mx-1 font-bold">*</span>
                            </div>
                            <Select id="category" name="category" required onChange={(e: React.ChangeEvent<HTMLSelectElement>) => workerSelected && setWorkerSelected({ ...workerSelected, [e.target.name]: e.target.value })}>
                                <option value="ingeniero" defaultChecked={workerSelected && workerSelected.category === 'ingeniero'}>Ingeniero</option>
                                <option value="master" defaultChecked={workerSelected && workerSelected.category === 'master'}>Máster</option>
                                <option value="doctor" defaultChecked={workerSelected && workerSelected.category === 'doctor'}>Doctor</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Button className="px-4" color="warning" onClick={editWorker}>Editar</Button>
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
                        ¿Estás seguro de eliminar al usuario {workerSelected && workerSelected.name}?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={deleteWorker}>
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
    )
}

export default WorkerPage