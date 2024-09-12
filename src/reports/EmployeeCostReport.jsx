import React, {useState, useEffect} from 'react'
import { 
    Page, 
    Text, 
    View, 
    Document, 
    StyleSheet,
    PDFViewer
  } from '@react-pdf/renderer';
  import { useSelector } from 'react-redux';

const EmployeeCostReport = () => {

  const [employeeReportList,setEmployeeReportList] = useState([])
  const companyDiscount = useSelector((state)=>state.CompanyDiscount.companyDiscount);

  useEffect(()=>{
    //local
    let employeeReports = JSON.parse(localStorage.getItem('employeeReports'));
    let currentUser = localStorage.getItem('currentUser');
    employeeReports = employeeReports.filter(empRep=>empRep.userEmail == currentUser)
    if(employeeReports){
      setEmployeeReportList(employeeReports)
    }

    // employeeReportService.GetEmployeeReport() Backend
    //   .then(res=>{
    //     setEmployeeReportList(res.data)
    //   })
    //   .catch(err=>{
    //     console.log(res)
    //   })
  },[])


  const getTotalHours = () => {
    var totalhours = 0;
    employeeReportList.map(employeeReport=>
      totalhours+= parseInt(employeeReport.hours) 
      )
      return totalhours
  }
  const getRowTotal = (employeeReport) =>{
    var total = 0;

    const material = employeeReport.materials ? parseInt(employeeReport.materials) : 0;
    const parking = employeeReport.parking ? parseInt(employeeReport.parking) : 0;
    const toll = employeeReport.toll ? parseInt(employeeReport.toll) : 0;
    const milla = employeeReport.milla ? parseInt(employeeReport.milla) : 0;
    const others = employeeReport.others ? parseInt(employeeReport.others) : 0;

    
      total+= parseFloat(
          employeeReport.hours*employeeReport.cost*companyDiscount+
          material +
          parking +
          toll +
          milla +
          others
        ) 
      
      return total
  }
  const getTotalUs = () => {
    var totalUs = 0;
    employeeReportList.map(employeeReport=>{

      const material = employeeReport.materials ? parseInt(employeeReport.materials) : 0;
      const parking = employeeReport.parking ? parseInt(employeeReport.parking) : 0;
      const toll = employeeReport.toll ? parseInt(employeeReport.toll) : 0;
      const milla = employeeReport.milla ? parseInt(employeeReport.milla) : 0;
      const others = employeeReport.others ? parseInt(employeeReport.others) : 0;

      totalUs+= parseFloat(
          employeeReport.hours*employeeReport.cost*companyDiscount+
          material +
          parking +
          toll +
          milla +
          others
        ) 
      })
      return totalUs
  }
  return (
    <PDFViewer style={{width: "100%", minHeight: "100vh"}}>
        <Document>
          <Page style={styles.body} orientation='landscape'>
            <View>
              <Text>TIME REPORTING MODULE</Text>
            </View>
            <View style={styles.table}> 
              <View style={styles.tableRow}> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Date</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Order Id</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Cost</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Materials</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Parking</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Toll</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Milla</Text> 
                </View>
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Others</Text> 
                </View>  
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Hours</Text> 
                </View>  
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Total</Text> 
                  <Text style={styles.tableCell}>Value</Text> 
                </View>  
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Company</Text> 
                  <Text style={styles.tableCell}>Discount</Text> 
                </View> 
                <View style={styles.headerCol}> 
                  <Text style={styles.tableCell}>Total</Text> 
                </View>  
              </View>
              {employeeReportList && 
                employeeReportList.map((report, key)=>{
                  return (
                  <View key={key} style={styles.tableRow}> 

                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.reportDate}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.orderId}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>${report.cost}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.materials}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.parking}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.toll}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.milla}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.others}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.hours}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{report.hours*report.cost}</Text> 
                    </View>
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{companyDiscount*100}%</Text> 
                    </View> 
                    <View style={styles.tableCol}> 
                      <Text style={styles.tableCell}>{
                        getRowTotal(report)
                      }</Text> 
                    </View> 
                  </View> 
                  )
                })}
                
                <View style={styles.tableRow}> 
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Total hours</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{getTotalHours()}</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}></Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Total US$</Text> 
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{getTotalUs()}</Text> 
                    </View>
                </View>
            </View>
        </Page>
      </Document>
    </PDFViewer>
    
  )
}

const styles = StyleSheet.create({
  body:{
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0,
    
  }, 
  tableRow: { 
    // margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "8.33%",  
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    height: 20
  }, 
  headerCol: { 
    width: "8.33%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    height: 32
  }, 
  tableCell: { 
    margin: "auto", 
    // marginTop: 5, 
    fontSize: 10 ,
    // flexDirection: ""
  },
  invisibleCol:{
    width: "10%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }
});

export default EmployeeCostReport