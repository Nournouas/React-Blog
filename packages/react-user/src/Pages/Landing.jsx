import { Link } from "react-router";
import { CTA, CTA_Secondary, card } from '../assets/styles'
import Header from "../Components/Header";

export default function Landing() {
  return (

    <div className="h-screen flex flex-col items-center justify-center bg-secondary">
      <Header title="Weclome to the" highlight="Blog" />
      <div className="flex flex-col gap-3">
        <Link className={CTA} to="/signup">Signup</Link>
        <Link className={CTA_Secondary} to="/login">Login</Link>
      </div>
    </div>
  )
}