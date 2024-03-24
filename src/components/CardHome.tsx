import { Link } from "react-router-dom"

const CardHome = ({ className, url, name, icon, bgIcon }: { className?: string, url: string, name: string, icon: string, bgIcon: string }) => {
    return (
        <Link to={url} className={`w-60 h-60 relative overflow-x-hidden overflow-y-hidden rounded-md text-white font-extrabold uppercase text-2xl hover:text-accent-700 hover:scale-95 p-5 from-primary-300 to-light-primary-400 bg-gradient-to-br shadow-md shadow-primary-400 ${className}`}>
            <div className="flex flex-col">
                <div className="w-1/2 mx-auto rounded-full border-4 p-4 border-white">
                    <img src={icon} alt="Imagen de la tarjeta" />
                </div>
                <span className="mx-auto mt-4 font-robotoSlab">{name}</span>
                <img src={bgIcon} className="absolute bottom-0 right-0 m-1 scale-150 opacity-5" width="100" height="100" alt="Icono" />
            </div>
        </Link>
    )
}

export default CardHome
