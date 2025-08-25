import React, {useState, useEffect} from 'react'
import Styles from '../../styles/General.module.css'
import Header from '../../components/Header'
import UserGrid from '../../components/Grids/UserGrid'
import UserService from '../../services/UserService'
import Loading from '../../components/loading';
import errorAlert from '../../components/Alerts/ErrorAlert';

const TechnicianList = () => {
    const userService = UserService()
    const [technicianList, setTechnicianList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(()=>{
        setShowLoading(true)
        userService.GetUsersByRole("5")
        .then(res=>{
            setShowLoading(false)
            setTechnicianList(res.data)
        })
        .catch(err=>{
            errorAlert(err)
            setShowLoading(false)
            console.log(err)
        })
    },[])

  return (
    <div className={Styles.screenBody}>
        <div
            style={{
                width:"73%",
                margin: "auto",
            }}
        >
            <Header name="Technician Report"/>  
            <div
                style={{
                    width: "65%",
                    margin: "auto"
                }}
            >
                <UserGrid users={technicianList}/>
            </div>
                

        </div>

        <Loading show={showLoading}/>
    </div>
  )
}

export default TechnicianList