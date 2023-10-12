import { reactive } from "vue";
import { io } from "socket.io-client";
import jsPDF from "jspdf";
export const state = reactive({
    queries:'',
    searchRes:'',
    customerRes:''
  });

export const socket= io("http://localhost:8081")


socket.on("queries", (rows)=>{
    state.queries=rows
})

socket.on("movieRes", (rows)=>{
  state.searchRes=rows
})

socket.on("customerRes", (rows)=>{
  state.customerRes=rows
})

socket.on("pdfRes",(rows)=>{
  let doc = new jsPDF();
  let pageHeight= doc.internal.pageSize.height

  doc.text("Name", 10, 10);
  doc.text("Email", 80, 10);
  // doc.text("Main Store", 150, 10);
  doc.line(0, 13, doc.internal.pageSize.width, 13)
  let y=20
  for(let i in rows){
    let currRow=rows[i]
    if (y+15>=pageHeight){
      doc.addPage();
      y=10
    }
    doc.text(currRow.first_name+" "+currRow.last_name, 10, y);
    doc.text(currRow.email,80,y);
    y+=15
    doc.text("Currently rented movies:",10,y)
    for(let j in currRow.rented.split(",")){
      y+=7
      if (y>=pageHeight){
        doc.addPage();
        y=10
      }
      let currMov=currRow.rented.split(",")[j]
      doc.text(currMov,10,y)
    }
    // doc.text(currRow.store_id.toString(),150,y);
    doc.line(0, y+3, doc.internal.pageSize.width, y+3)
    y+=10

  }
  doc.save('Report.pdf');
})