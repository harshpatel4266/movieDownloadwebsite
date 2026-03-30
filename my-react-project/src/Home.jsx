
import Card from 'react-bootstrap/Card';
import './assets/App.css'

export function Cart(props) {
  return (
    <>

    <div className='col'>
         <Card  className='card-zoom'> 
          
          <Card.Img  src={props.Img} height={300} ></Card.Img>
           <Card.Body>
            <Card.Title>{props.Title}</Card.Title>
            <Card.Text>
            
            </Card.Text>
         
          </Card.Body>
        </Card>
          </div>
     
  
        </>
       
    


  );
}
