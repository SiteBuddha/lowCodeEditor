import { CommonComponent } from "@/store/Editor"


const Page = ({ children, styles }: CommonComponent) => {

    return <div
        style={styles}
        className={`p-[20px] h-[100%] box-border`}
    >
        {children}
    </div >
}

export default Page