import { useEffect, useState } from 'react';
import preState from './prevState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function App() {
  const [term,setTerm]=useState("");
  const [list,setList]=useState([]);
 const preveTerm=preState(term);
  useEffect(()=>{
const searchAPI=async()=>{
  const response= await axios.get("https://en.wikipedia.org/w/api.php",{params :{
    action: "query",
    list: "search",
    srsearch: term,
    format: "json",
    origin: "*"

}
});

 setList(response.data.query.search);
};
if(!list.lenth && term){
searchAPI();}
else if (preveTerm!==term) {
const depoinsSerach=setTimeout(()=>{
if(term){
searchAPI();}
},1000);
return ()=>{
clearTimeout(depoinsSerach);
};
}
  },[term,list.lenth,preveTerm]);
  const shoelist=list.map((el,index)=>{
    return(
      <tr key={el.pageid} style={{border:'1px solid black'} } >
        <td>{index}</td>
        <td>{el.title}</td>
        <td>
        <span dangerouslySetInnerHTML={{__html: el.snippet}}/>
        </td>
        
      </tr>
    )
  });;
  return (
  
    <Container>
    <Row>
      <Col>
      <Form>
    <Form.Group className="mb-6" controlId="formBasicEmail">
      <Form.Label>Search for wiki </Form.Label>
      <Form.Control type="text" placeholder='Search input'
      on onChange={(e)=>setTerm(e.target.value)}
      value={term} />
    </Form.Group>
  
  </Form>
      </Col>
    </Row>
    <Row>
    <Col>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Descrption</th>
         
        </tr>
        </thead>
        <tbody>
{shoelist}
        </tbody>
      </table>
      </Col>
    </Row>
  </Container>
  );
}

export default App;
