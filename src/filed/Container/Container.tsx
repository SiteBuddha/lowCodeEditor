import { CommonComponent } from "@/store/Editor"

const Container = ({ children, styles }: CommonComponent) => {

    return <div
        className={`p-[20px]`}
        style={styles}
    >
        {children}
    </div>
}

export default Container