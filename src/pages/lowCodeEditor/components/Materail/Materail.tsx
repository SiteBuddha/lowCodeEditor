import { useMemo } from "react";

import { useComponentConfigStore } from "@/store/Editor/config"
import { MaterialItem } from "./MaterailItem";

const Materail = () => {

    const { componentConfig } = useComponentConfigStore()

    const components = useMemo(() => {
        return Object.values(componentConfig).filter(item => item.name !== 'Page');
    }, []);

    return <div>
        {
            components.map((item, index) => {
                return <MaterialItem key={index + item.name} name={item.name} />
            })
        }
    </div>
}

export default Materail