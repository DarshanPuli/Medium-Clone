import Quote from "../components/Quote"
import Auth from "../components/Auth"

export default function Signin(){
    return (
        <div className="grid grid-cols-1 tablet:grid-cols-2">
            <div><Auth type={"signin"}></Auth></div>
            <div className="invisible tablet:visible"><Quote></Quote></div>
        </div>
    )
}